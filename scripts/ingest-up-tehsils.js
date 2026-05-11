#!/usr/bin/env node
/**
 * Gharauni.com — Phase 6 LGD Ingest Script (v2)
 *
 * Ingests authoritative tehsil + block data for all 75 UP districts from the
 * Local Government Directory (LGD) via the ramseraph.github.io daily CSV mirror.
 *
 * Source authority chain:
 *   Ministry of Panchayati Raj → LGD (lgdirectory.gov.in) → daily scrape
 *   → ramseraph.github.io/opendata/lgd/ (mirror) → THIS SCRIPT → our repo
 *
 * Why this mirror: LGD's own download endpoint requires browser session +
 * captcha. The ramseraph mirror is a daily cron-scraped CSV dump of the SAME
 * underlying data, served as static files (which CDNs and CI can fetch cleanly).
 *
 * Usage:
 *   node scripts/ingest-up-tehsils.js
 *
 * Optional env vars:
 *   LGD_BASE_URL  override mirror base (default: https://ramseraph.github.io/opendata/lgd)
 *   SUBDISTRICTS_CSV override subdistricts URL
 *   BLOCKS_CSV    override blocks URL
 *   DRY_RUN=1     parse but don't write files
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const LGD_BASE = process.env.LGD_BASE_URL || 'https://ramseraph.github.io/opendata/lgd';
const CANDIDATE_SUBDISTRICT_URLS = [
  process.env.SUBDISTRICTS_CSV,
  `${LGD_BASE}/subdistricts.csv`,
  `${LGD_BASE}/data/subdistricts.csv`,
  `${LGD_BASE}/latest/subdistricts.csv`,
].filter(Boolean);
const CANDIDATE_BLOCK_URLS = [
  process.env.BLOCKS_CSV,
  `${LGD_BASE}/blocks.csv`,
  `${LGD_BASE}/data/blocks.csv`,
  `${LGD_BASE}/latest/blocks.csv`,
].filter(Boolean);

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

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Gharauni-Ingest/1.0' } }, (res) => {
      if ([301, 302, 307, 308].includes(res.statusCode)) {
        return fetchUrl(res.headers.location).then(resolve, reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      let body = '';
      res.setEncoding('utf-8');
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => resolve(body));
    }).on('error', reject);
  });
}

async function fetchFirstAvailable(urls, label) {
  for (const url of urls) {
    try {
      console.log(`  → ${label}: trying ${url}`);
      const body = await fetchUrl(url);
      console.log(`  ✓ ${label}: ${body.length.toLocaleString()} bytes from ${url}`);
      return { body, url };
    } catch (e) {
      console.log(`  ✗ ${label}: ${e.message}`);
    }
  }
  throw new Error(`Could not fetch ${label} from any candidate URL.`);
}

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

(async () => {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  Gharauni.com Phase 6 LGD Ingest v2');
  console.log('  Source: Ministry of Panchayati Raj LGD');
  console.log('  Mirror: ramseraph.github.io/opendata/lgd');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  const sub = await fetchFirstAvailable(CANDIDATE_SUBDISTRICT_URLS, 'subdistricts.csv');
  const blk = await fetchFirstAvailable(CANDIDATE_BLOCK_URLS, 'blocks.csv');

  console.log('\n  Parsing CSVs…');
  const subObjs = rowsToObjects(parseCsv(sub.body));
  const blkObjs = rowsToObjects(parseCsv(blk.body));
  console.log(`  subdistricts.csv rows: ${subObjs.length.toLocaleString()}`);
  console.log(`  blocks.csv rows:       ${blkObjs.length.toLocaleString()}`);

  const detectCol = (obj, candidates) => {
    const keys = Object.keys(obj);
    for (const cand of candidates) {
      const found = keys.find(k => k.toLowerCase().replace(/[\s_()-]/g, '') === cand.toLowerCase().replace(/[\s_()-]/g, ''));
      if (found) return found;
    }
    return null;
  };

  if (!subObjs.length) {
    console.error('✗ subdistricts CSV had no rows after parsing.');
    process.exit(1);
  }

  const cols = {
    stateCode: detectCol(subObjs[0], ['StateCode', 'State Code']),
    stateName: detectCol(subObjs[0], ['StateName', 'State Name', 'State Name (In English)']),
    districtCode: detectCol(subObjs[0], ['DistrictCode', 'District Code']),
    districtName: detectCol(subObjs[0], ['DistrictName', 'District Name', 'District Name (In English)']),
    subDistCode: detectCol(subObjs[0], ['SubDistrictCode', 'Sub-District Code', 'Sub District Code']),
    subDistName: detectCol(subObjs[0], ['SubDistrictName', 'Sub-District Name', 'Sub District Name', 'Sub-District Name (In English)']),
    subDistLocal: detectCol(subObjs[0], ['SubDistrictNameLocal', 'Sub-District Name(In Local)', 'Sub-District Name (In Local)', 'Local Name']),
  };
  console.log('  Subdistrict columns detected:', cols);

  const upSubs = subObjs.filter(o => {
    if (cols.stateCode && o[cols.stateCode] === UP_STATE_CODE) return true;
    if (cols.stateName && o[cols.stateName].toUpperCase().includes('UTTAR PRADESH')) return true;
    return false;
  });
  console.log(`\n  UP subdistricts (tehsils): ${upSubs.length}`);

  const districtsArr = JSON.parse(fs.readFileSync(DISTRICTS_PATH, 'utf-8'));
  const districtBySlug = Object.fromEntries(districtsArr.map(d => [d.slug, d]));

  const tehsilsOut = [];
  const unmapped = new Set();
  for (const o of upSubs) {
    const districtName = (o[cols.districtName] || '').toUpperCase().trim();
    const slug = DISTRICT_NAME_TO_SLUG[districtName];
    if (!slug || !districtBySlug[slug]) {
      unmapped.add(districtName);
      continue;
    }
    const meta = districtBySlug[slug];
    tehsilsOut.push({
      name: (o[cols.subDistName] || '').trim(),
      nameHi: (o[cols.subDistLocal] || '').trim() || '',
      districtSlug: slug,
      district: meta.name,
      districtCode: meta.code,
    });
  }
  console.log(`  Mapped UP tehsils: ${tehsilsOut.length}`);
  if (unmapped.size) {
    console.log(`  Unmapped district names (review):`);
    for (const u of unmapped) console.log(`    - ${u}`);
  }

  const blkCols = {
    stateCode: detectCol(blkObjs[0], ['StateCode', 'State Code']),
    stateName: detectCol(blkObjs[0], ['StateName', 'State Name', 'State Name (In English)']),
    districtName: detectCol(blkObjs[0], ['DistrictName', 'District Name', 'District Name (In English)']),
    blockCode: detectCol(blkObjs[0], ['BlockCode', 'Block Code']),
    blockName: detectCol(blkObjs[0], ['BlockName', 'Block Name', 'Block Name (In English)']),
    blockLocal: detectCol(blkObjs[0], ['BlockNameLocal', 'Block Name(In Local)', 'Block Name (In Local)']),
    subDistName: detectCol(blkObjs[0], ['SubDistrictName', 'Sub-District Name', 'Sub District Name']),
  };
  console.log('\n  Block columns detected:', blkCols);

  const upBlocks = blkObjs.filter(o => {
    if (blkCols.stateCode && o[blkCols.stateCode] === UP_STATE_CODE) return true;
    if (blkCols.stateName && o[blkCols.stateName].toUpperCase().includes('UTTAR PRADESH')) return true;
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
  console.log(`  Mapped UP blocks: ${blocksOut.length}`);

  const slugsWithData = new Set(tehsilsOut.map(t => t.districtSlug));
  for (const d of districtsArr) {
    if (slugsWithData.has(d.slug)) d.hasDetailedData = true;
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
  console.log('\nNext: git add lib/data/up/ && git commit -m "Phase 6: full UP LGD ingest" && git push');
})().catch(err => {
  console.error('\n✗ INGEST FAILED:', err.message);
  console.error('\nFallback options:');
  console.error('  1. Browse https://ramseraph.github.io/opendata/lgd/ for actual file paths,');
  console.error('     then set: LGD_BASE_URL or SUBDISTRICTS_CSV + BLOCKS_CSV env vars.');
  console.error('  2. Or download manually from https://lgdirectory.gov.in/downloadDirectory.do');
  console.error('     (filter State=Uttar Pradesh, entity=Sub-District + Block), save CSVs,');
  console.error('     then point env vars at file:// or local served URLs.');
  process.exit(1);
});
