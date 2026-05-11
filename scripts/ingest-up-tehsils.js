#!/usr/bin/env node
/**
 * Gharauni.com — Phase 6 Ingest Script
 * 
 * One-shot tool to complete the remaining 60 UP districts' tehsil data.
 * Run locally (Vercel/.nic.in fetches are blocked from external scrapers):
 *   node scripts/ingest-up-tehsils.js
 * 
 * Strategy:
 * 1. Fetch CredBrick/India-Locations-API UP JSON (community-curated from official .nic.in)
 * 2. Reconcile transliteration variants against our slug list (e.g. "Aligrah" → "aligarh")
 * 3. Merge into our existing lib/data/up/tehsils.json (preserves the 15 already verified)
 * 4. Flip hasDetailedData: true in districts.json where data is now present
 * 5. Output a diff report so you can review before commit
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// ---------- Config ----------
const CREDBRICK_REPO_RAW = 'https://raw.githubusercontent.com/CredBrick/India-Locations-API/main/data';
const CANDIDATE_FILES = ['UttarPradesh.json', 'UP.json', 'uttar-pradesh.json', 'uttarpradesh.json'];

const DATA_DIR = path.join(__dirname, '..', 'lib', 'data', 'up');
const TEHSILS_PATH = path.join(DATA_DIR, 'tehsils.json');
const DISTRICTS_PATH = path.join(DATA_DIR, 'districts.json');

// Manual slug map for transliteration mismatches
const SLUG_OVERRIDES = {
  'Aligrah': 'aligarh',
  'Ambedkarnagar': 'ambedkar-nagar',
  'Auraya': 'auraiya',
  'Gautam Buddh Nagar': 'gautam-buddha-nagar',
  'Mahrajganj': 'maharajganj',
  'Sant Ravi Das Nagar': 'sant-ravidas-nagar',
  'Siddharth Nagar': 'siddharthnagar',
  'Shrawasti': 'shrawasti',
  'Sant Kabeer Nagar': 'sant-kabir-nagar',
  'Kheri': 'lakhimpur-kheri',
  'Bhadohi': 'sant-ravidas-nagar',
};

const slugify = (name) => {
  if (SLUG_OVERRIDES[name]) return SLUG_OVERRIDES[name];
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};

// ---------- HTTP helper ----------
const fetch = (url) => new Promise((resolve, reject) => {
  https.get(url, (res) => {
    if (res.statusCode === 302 || res.statusCode === 301) {
      return fetch(res.headers.location).then(resolve, reject);
    }
    if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => resolve(body));
  }).on('error', reject);
});

// ---------- Main ----------
(async () => {
  console.log('→ Gharauni Phase 6 Ingest — starting');

  // 1. Try to fetch CredBrick UP JSON
  let credbrickData = null;
  for (const filename of CANDIDATE_FILES) {
    const url = `${CREDBRICK_REPO_RAW}/${filename}`;
    try {
      console.log(`  Trying ${url}`);
      const body = await fetch(url);
      credbrickData = JSON.parse(body);
      console.log(`  ✓ Loaded ${filename} (${body.length} bytes)`);
      break;
    } catch (e) {
      console.log(`  ✗ ${filename}: ${e.message}`);
    }
  }

  if (!credbrickData) {
    console.error('\n✗ Could not fetch CredBrick UP JSON from any candidate filename.');
    console.error('   Manually download from https://github.com/CredBrick/India-Locations-API/tree/main/data');
    console.error('   Save to /tmp/up.json, then run: CREDBRICK_FILE=/tmp/up.json node scripts/ingest-up-tehsils.js');
    if (process.env.CREDBRICK_FILE) {
      console.log(`\n  → Falling back to ${process.env.CREDBRICK_FILE}`);
      credbrickData = JSON.parse(fs.readFileSync(process.env.CREDBRICK_FILE, 'utf-8'));
    } else {
      process.exit(1);
    }
  }

  // 2. Load existing data
  const existingTehsils = JSON.parse(fs.readFileSync(TEHSILS_PATH, 'utf-8'));
  const districts = JSON.parse(fs.readFileSync(DISTRICTS_PATH, 'utf-8'));
  const verifiedSlugs = new Set(existingTehsils.map(t => t.districtSlug));
  console.log(`\n  Current verified districts: ${verifiedSlugs.size}`);

  // 3. Extract CredBrick districts list (handle both schema shapes)
  const cbDistricts = credbrickData.data?.districts || credbrickData.districts || credbrickData;
  if (!Array.isArray(cbDistricts)) {
    console.error('✗ Unexpected JSON shape — expected array of districts');
    console.error('  Sample:', JSON.stringify(credbrickData).slice(0, 500));
    process.exit(1);
  }
  console.log(`  CredBrick districts found: ${cbDistricts.length}`);

  // 4. Merge new districts in
  const newTehsils = [...existingTehsils];
  const newlyAdded = [];
  for (const cb of cbDistricts) {
    const slug = slugify(cb.district);
    if (verifiedSlugs.has(slug)) continue;
    const districtMeta = districts.find(d => d.slug === slug);
    if (!districtMeta) {
      console.warn(`  ⚠ Unknown district slug "${slug}" from CredBrick name "${cb.district}" — SKIPPED`);
      continue;
    }
    const tehsils = (cb.tehsils || []).filter(t => t && t.trim());
    for (const tehsilName of tehsils) {
      newTehsils.push({
        name: tehsilName.trim(),
        nameHi: '', // user can fill in later
        districtSlug: slug,
        district: districtMeta.name,
        districtCode: districtMeta.code
      });
    }
    newlyAdded.push({ slug, count: tehsils.length });
    districtMeta.hasDetailedData = true;
  }

  // 5. Write back
  fs.writeFileSync(TEHSILS_PATH, JSON.stringify(newTehsils, null, 2) + '\n');
  fs.writeFileSync(DISTRICTS_PATH, JSON.stringify(districts, null, 2) + '\n');

  // 6. Report
  console.log(`\n✓ Ingest complete.`);
  console.log(`  Districts added this run: ${newlyAdded.length}`);
  for (const a of newlyAdded) console.log(`    - ${a.slug}: ${a.count} tehsils`);
  const totalWithData = districts.filter(d => d.hasDetailedData).length;
  console.log(`  Total districts with detailed data: ${totalWithData}/75`);
  console.log(`\n  Next: review the diff, then commit:`);
  console.log(`    git diff lib/data/up/`);
  console.log(`    git add lib/data/up/ && git commit -m "Phase 6: complete UP tehsil ingest" && git push`);
})();
