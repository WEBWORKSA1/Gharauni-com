#!/usr/bin/env node
/**
 * Gharauni.com — Phase 6 LGD Ingest Script (v3)
 *
 * Ingests authoritative tehsil + block data for all 75 UP districts from the
 * Local Government Directory (LGD) via the ramSeraph/opendata GitHub Releases dump.
 *
 * Source authority chain:
 *   Ministry of Panchayati Raj → LGD (lgdirectory.gov.in) → daily scrape
 *   → github.com/ramSeraph/opendata releases (mirror) → THIS SCRIPT → our repo
 *
 * Data format:
 *   Each day a fresh `subdistricts.DDMonYYYY.csv.7z` is published to the
 *   `lgd-latest` release tag. Same for `blocks.DDMonYYYY.csv.7z`. The release
 *   asset URL with no date is also valid (GitHub redirects to the latest file).
 *
 * Requirements at runtime:
 *   - node 18+ (uses native fetch)
 *   - `7z` CLI available on PATH (apt-get install p7zip-full)
 *
 * Usage:
 *   node scripts/ingest-up-tehsils.js
 *   DRY_RUN=1 node scripts/ingest-up-tehsils.js   # parse but don't write
 *
 * Optional env vars:
 *   SUBDISTRICTS_7Z_URL  override subdistricts 7z URL
 *   BLOCKS_7Z_URL        override blocks 7z URL
 *   LGD_DATE             specific date string e.g. "01Mar2026" (default: auto-pick latest)
 */

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');

const RELEASE_BASE = 'https://github.com/ramSeraph/opendata/releases/download/lgd-latest';
const LISTING_URL = `${RELEASE_BASE}/listing_files.csv`;

const UP_STATE_CODE = '9';
const DATA_DIR = path.join(__dirname, '..', 'lib', 'data', 'up');
const TEHSILS_PATH = path.join(DATA_DIR, 'tehsils.json');
const BLOCKS_PATH = path.join(DATA_DIR, 'blocks.json');
const DISTRICTS_PATH = path.join(DATA_DIR, 'districts.json');

const DISTRICT_NAME_TO_SLUG = {
  'AGRA': 'agra',
  'ALIGARH': 'aligarh',
  'ALLAHABAD': 'prayagraj',
  'PRAYAGRAJ': 'prayagraj',
  'AMBEDKAR NAGAR': 'ambedkar-nagar',
  'AMETHI': 'amethi',
  'CHHATRAPATI SAHUJI MAHARAJ NAGAR': 'amethi',
  'AMROHA': 'amroha',
  'JYOTIBA PHULE NAGAR': 'amroha',
  'AURAIYA': 'auraiya',
  'AYODHYA': 'ayodhya',
  'FAIZABAD': 'ayodhya',
  'AZAMGARH': 'azamgarh',
  'BAGHPAT': 'baghpat',
  'BAGPAT': 'baghpat',
  'BAHRAICH': 'bahraich',
  'BALLIA': 'ballia',
  'BALRAMPUR': 'balrampur',
  'BANDA': 'banda',
  'BARABANKI': 'barabanki',
  'BAREILLY': 'bareilly',
  'BASTI': 'basti',
  'BHADOHI': 'sant-ravidas-nagar',
  'SANT RAVIDAS NAGAR': 'sant-ravidas-nagar',
  'SANT RAVIDAS NAGAR (BHADOHI)': 'sant-ravidas-nagar',
  'BIJNOR': 'bijnor',
  'BUDAUN': 'budaun',
  'BADAUN': 'budaun',
  'BULANDSHAHR': 'bulandshahr',
  'CHANDAULI': 'chandauli',
  'CHITRAKOOT': 'chitrakoot',
  'DEORIA': 'deoria',
  'ETAH': 'etah',
  'ETAWAH': 'etawah',
  'FARRUKHABAD': 'farrukhabad',
  'FATEHPUR': 'fatehpur',
  'FIROZABAD': 'firozabad',
  'GAUTAM BUDDHA NAGAR': 'gautam-buddha-nagar',
  'GAUTAM BUDDH NAGAR': 'gautam-buddha-nagar',
  'GHAZIABAD': 'ghaziabad',
  'GHAZIPUR': 'ghazipur',
  'GONDA': 'gonda',
  'GORAKHPUR': 'gorakhpur',
  'HAMIRPUR': 'hamirpur',
  'HAPUR': 'hapur',
  'PANCHSHEEL NAGAR': 'hapur',
  'HARDOI': 'hardoi',
  'HATHRAS': 'hathras',
  'MAHAMAYA NAGAR': 'hathras',
  'JALAUN': 'jalaun',
  'JAUNPUR': 'jaunpur',
  'JHANSI': 'jhansi',
  'KANNAUJ': 'kannauj',
  'KANPUR DEHAT': 'kanpur-dehat',
  'RAMABAI NAGAR': 'kanpur-dehat',
  'KANPUR NAGAR': 'kanpur-nagar',
  'KASGANJ': 'kasganj',
  'KANSHIRAM NAGAR': 'kasganj',
  'KAUSHAMBI': 'kaushambi',
  'KUSHINAGAR': 'kushinagar',
  'LAKHIMPUR KHERI': 'lakhimpur-kheri',
  'KHERI': 'lakhimpur-kheri',
  'LALITPUR': 'lalitpur',
  'LUCKNOW': 'lucknow',
  'MAHARAJGANJ': 'maharajganj',
  'MAHRAJGANJ': 'maharajganj',
  'MAHOBA': 'mahoba',
  'MAINPURI': 'mainpuri',
  'MATHURA': 'mathura',
  'MAU': 'mau',
  'MEERUT': 'meerut',
  'MIRZAPUR': 'mirzapur',
  'MORADABAD': 'moradabad',
  'MUZAFFARNAGAR': 'muzaffarnagar',
  'PILIBHIT': 'pilibhit',
  'PRATAPGARH': 'pratapgarh',
  'RAEBARELI': 'raebareli',
  'RAE BARELI': 'raebareli',
  'RAMPUR': 'rampur',
  'SAHARANPUR': 'saharanpur',
  'SAMBHAL': 'sambhal',
  'BHIM NAGAR': 'sambhal',
  'SANT KABIR NAGAR': 'sant-kabir-nagar',
  'SHAHJAHANPUR': 'shahjahanpur',
  'SHAMLI': 'shamli',
  'PRABUDDH NAGAR': 'shamli',
  'SHRAVASTI': 'shrawasti',
  'SHRAWASTI': 'shrawasti',
  'SIDDHARTHNAGAR': 'siddharthnagar',
  'SIDDHARTH NAGAR': 'siddharthnagar',
  'SITAPUR': 'sitapur',
  'SONBHADRA': 'sonbhadra',
  'SULTANPUR': 'sultanpur',
  'UNNAO': 'unnao',
  'VARANASI': 'varanasi',
};

/* ─── Fetch helpers ─────────────────────────────────────────────────────── */

async function fetchBuffer(url) {
  const res = await fetch(url, { redirect: 'follow', headers: { 'User-Agent': 'Gharauni-Ingest/3.0' } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const ab = await res.arrayBuffer();
  return Buffer.from(ab);
}

async function fetchText(url) {
  const res = await fetch(url, { redirect: 'follow', headers: { 'User-Agent': 'Gharauni-Ingest/3.0' } });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

/* ─── Resolve which dated file to grab ──────────────────────────────────── */

async function resolveLatestFilename(prefix) {
  // listing_files.csv has rows like: filename,sha256,size,date
  // We grep for the prefix and pick the latest by date.
  const fallback = `${prefix}.csv.7z`;
  if (process.env.LGD_DATE) {
    return `${prefix}.${process.env.LGD_DATE}.csv.7z`;
  }
  try {
    const text = await fetchText(LISTING_URL);
    const rows = text.split(/\r?\n/).filter(Boolean);
    const matches = rows
      .map(r => r.split(','))
      .filter(r => r[0] && r[0].startsWith(`${prefix}.`) && r[0].endsWith('.csv.7z'))
      .map(r => ({ name: r[0], date: r[3] || '' }))
      .sort((a, b) => b.date.localeCompare(a.date));
    if (matches.length === 0) {
      console.log(`  ! listing did not contain ${prefix}.*.csv.7z — falling back to ${fallback}`);
      return fallback;
    }
    console.log(`  → latest ${prefix}: ${matches[0].name} (${matches[0].date})`);
    return matches[0].name;
  } catch (e) {
    console.log(`  ! could not read listing_files.csv (${e.message}) — falling back to ${fallback}`);
    return fallback;
  }
}

/* ─── 7z decompress ─────────────────────────────────────────────────────── */

function decompress7z(buf, suggestedName) {
  // Write to tmp file, decompress with 7z CLI, read the resulting CSV
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'lgd-'));
  const archivePath = path.join(tmpDir, suggestedName);
  fs.writeFileSync(archivePath, buf);
  try {
    execSync(`7z x -y -o"${tmpDir}" "${archivePath}"`, { stdio: 'pipe' });
  } catch (e) {
    throw new Error(`7z extraction failed (is p7zip-full installed?): ${e.message}`);
  }
  // Find the .csv inside the tmpDir
  const csvFile = fs.readdirSync(tmpDir).find(f => f.toLowerCase().endsWith('.csv'));
  if (!csvFile) throw new Error(`No .csv found after 7z extract in ${tmpDir}`);
  const csvBody = fs.readFileSync(path.join(tmpDir, csvFile), 'utf-8');
  // Clean up
  for (const f of fs.readdirSync(tmpDir)) fs.unlinkSync(path.join(tmpDir, f));
  fs.rmdirSync(tmpDir);
  return csvBody;
}

/* ─── CSV ───────────────────────────────────────────────────────────────── */

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (ch === '"') { inQuotes = false; }
      else { cell += ch; }
    } else {
      if (ch === '"') { inQuotes = true; }
      else if (ch === ',') { row.push(cell); cell = ''; }
      else if (ch === '\n') { row.push(cell); rows.push(row); row = []; cell = ''; }
      else if (ch === '\r') { /* skip */ }
      else { cell += ch; }
    }
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

function rowsToObjects(rows) {
  if (!rows.length) return [];
  const headers = rows[0].map(h => h.trim());
  return rows.slice(1)
    .filter(r => r.length === headers.length && r.some(c => c.trim()))
    .map(r => Object.fromEntries(headers.map((h, i) => [h, r[i].trim()])));
}

const detectCol = (obj, candidates) => {
  const keys = Object.keys(obj);
  for (const cand of candidates) {
    const found = keys.find(k => k.toLowerCase().replace(/[\s_()-]/g, '') === cand.toLowerCase().replace(/[\s_()-]/g, ''));
    if (found) return found;
  }
  return null;
};

/* ─── Main ──────────────────────────────────────────────────────────────── */

(async () => {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  Gharauni.com Phase 6 LGD Ingest v3');
  console.log('  Source: Ministry of Panchayati Raj LGD');
  console.log('  Mirror: github.com/ramSeraph/opendata');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  console.log('Resolving latest filenames…');
  const subName = process.env.SUBDISTRICTS_7Z_URL ? null : await resolveLatestFilename('subdistricts');
  const blkName = process.env.BLOCKS_7Z_URL ? null : await resolveLatestFilename('blocks');

  const subUrl = process.env.SUBDISTRICTS_7Z_URL || `${RELEASE_BASE}/${subName}`;
  const blkUrl = process.env.BLOCKS_7Z_URL || `${RELEASE_BASE}/${blkName}`;

  console.log(`\nDownloading subdistricts: ${subUrl}`);
  const subBuf = await fetchBuffer(subUrl);
  console.log(`  ✓ ${subBuf.length.toLocaleString()} bytes`);

  console.log(`Downloading blocks: ${blkUrl}`);
  const blkBuf = await fetchBuffer(blkUrl);
  console.log(`  ✓ ${blkBuf.length.toLocaleString()} bytes`);

  console.log('\nDecompressing 7z archives…');
  const subCsv = decompress7z(subBuf, subName || 'subdistricts.csv.7z');
  console.log(`  ✓ subdistricts CSV: ${subCsv.length.toLocaleString()} bytes`);
  const blkCsv = decompress7z(blkBuf, blkName || 'blocks.csv.7z');
  console.log(`  ✓ blocks CSV:       ${blkCsv.length.toLocaleString()} bytes`);

  console.log('\nParsing…');
  const subObjs = rowsToObjects(parseCsv(subCsv));
  const blkObjs = rowsToObjects(parseCsv(blkCsv));
  console.log(`  subdistricts rows: ${subObjs.length.toLocaleString()}`);
  console.log(`  blocks rows:       ${blkObjs.length.toLocaleString()}`);

  if (!subObjs.length) { console.error('✗ subdistricts CSV had no rows.'); process.exit(1); }

  /* Subdistricts → tehsils */
  const cols = {
    stateCode: detectCol(subObjs[0], ['StateCode', 'State Code']),
    stateName: detectCol(subObjs[0], ['StateName', 'State Name', 'State Name (In English)']),
    districtCode: detectCol(subObjs[0], ['DistrictCode', 'District Code']),
    districtName: detectCol(subObjs[0], ['DistrictName', 'District Name', 'District Name (In English)']),
    subDistCode: detectCol(subObjs[0], ['SubDistrictCode', 'Sub-District Code', 'Sub District Code']),
    subDistName: detectCol(subObjs[0], ['SubDistrictName', 'Sub-District Name', 'Sub District Name', 'Sub-District Name (In English)']),
    subDistLocal: detectCol(subObjs[0], ['SubDistrictNameLocal', 'Sub-District Name(In Local)', 'Sub-District Name (In Local)', 'Local Name']),
  };
  console.log('  Subdistrict columns:', cols);

  const upSubs = subObjs.filter(o => {
    if (cols.stateCode && o[cols.stateCode] === UP_STATE_CODE) return true;
    if (cols.stateName && (o[cols.stateName] || '').toUpperCase().includes('UTTAR PRADESH')) return true;
    return false;
  });
  console.log(`  UP subdistricts (tehsils): ${upSubs.length}`);

  const districtsArr = JSON.parse(fs.readFileSync(DISTRICTS_PATH, 'utf-8'));
  const districtBySlug = Object.fromEntries(districtsArr.map(d => [d.slug, d]));

  const tehsilsOut = [];
  const unmapped = new Set();
  for (const o of upSubs) {
    const districtName = (o[cols.districtName] || '').toUpperCase().trim();
    const slug = DISTRICT_NAME_TO_SLUG[districtName];
    if (!slug || !districtBySlug[slug]) { unmapped.add(districtName); continue; }
    const meta = districtBySlug[slug];
    tehsilsOut.push({
      name: (o[cols.subDistName] || '').trim(),
      nameHi: (o[cols.subDistLocal] || '').trim() || '',
      districtSlug: slug,
      district: meta.name,
      districtCode: meta.code,
    });
  }
  // Sort: by district code, then name
  tehsilsOut.sort((a, b) => (a.districtCode + a.name).localeCompare(b.districtCode + b.name));
  console.log(`  Mapped UP tehsils: ${tehsilsOut.length}`);
  if (unmapped.size) {
    console.log(`  Unmapped district names (review DISTRICT_NAME_TO_SLUG):`);
    for (const u of unmapped) console.log(`    - ${u}`);
  }

  /* Blocks */
  const blkCols = {
    stateCode: detectCol(blkObjs[0], ['StateCode', 'State Code']),
    stateName: detectCol(blkObjs[0], ['StateName', 'State Name', 'State Name (In English)']),
    districtName: detectCol(blkObjs[0], ['DistrictName', 'District Name', 'District Name (In English)']),
    blockCode: detectCol(blkObjs[0], ['BlockCode', 'Block Code']),
    blockName: detectCol(blkObjs[0], ['BlockName', 'Block Name', 'Block Name (In English)']),
    blockLocal: detectCol(blkObjs[0], ['BlockNameLocal', 'Block Name(In Local)', 'Block Name (In Local)']),
    subDistName: detectCol(blkObjs[0], ['SubDistrictName', 'Sub-District Name', 'Sub District Name']),
  };
  console.log('\n  Block columns:', blkCols);

  const upBlocks = blkObjs.filter(o => {
    if (blkCols.stateCode && o[blkCols.stateCode] === UP_STATE_CODE) return true;
    if (blkCols.stateName && (o[blkCols.stateName] || '').toUpperCase().includes('UTTAR PRADESH')) return true;
    return false;
  });
  console.log(`  UP blocks: ${upBlocks.length}`);

  const blocksOut = [];
  for (const o of upBlocks) {
    const districtName = (o[blkCols.districtName] || '').toUpperCase().trim();
    const slug = DISTRICT_NAME_TO_SLUG[districtName];
    if (!slug || !districtBySlug[slug]) continue;
    const meta = districtBySlug[slug];
    blocksOut.push({
      name: (o[blkCols.blockName] || '').trim(),
      nameHi: (o[blkCols.blockLocal] || '').trim() || '',
      tehsil: blkCols.subDistName ? (o[blkCols.subDistName] || '').trim() : '',
      districtSlug: slug,
      district: meta.name,
      districtCode: meta.code,
    });
  }
  blocksOut.sort((a, b) => (a.districtCode + a.name).localeCompare(b.districtCode + b.name));
  console.log(`  Mapped UP blocks: ${blocksOut.length}`);

  /* Mark which districts have detailed data now */
  const slugsWithData = new Set(tehsilsOut.map(t => t.districtSlug));
  for (const d of districtsArr) {
    d.hasDetailedData = slugsWithData.has(d.slug);
  }
  const withData = districtsArr.filter(d => d.hasDetailedData).length;

  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`  Final: ${withData}/75 districts have detailed tehsil data`);
  console.log(`  Tehsils total: ${tehsilsOut.length}`);
  console.log(`  Blocks total:  ${blocksOut.length}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  if (process.env.DRY_RUN) {
    console.log('\n[DRY_RUN=1] Files NOT written. Re-run without DRY_RUN to commit.');
    return;
  }

  fs.writeFileSync(TEHSILS_PATH, JSON.stringify(tehsilsOut, null, 2) + '\n');
  fs.writeFileSync(BLOCKS_PATH, JSON.stringify(blocksOut, null, 2) + '\n');
  fs.writeFileSync(DISTRICTS_PATH, JSON.stringify(districtsArr, null, 2) + '\n');

  console.log('\n✓ Wrote:');
  console.log(`  ${TEHSILS_PATH}`);
  console.log(`  ${BLOCKS_PATH}`);
  console.log(`  ${DISTRICTS_PATH}`);
})().catch(err => {
  console.error('\n✗ INGEST FAILED:', err.message);
  console.error(err.stack);
  process.exit(1);
});
