# Uttar Pradesh Administrative Data

> Authoritative source of UP's administrative geography for Gharauni.com.

## What's here

| File | Contents | Records |
|------|----------|---------|
| `divisions.json` | 18 administrative divisions | 18 |
| `districts.json` | All 75 districts with division, HQ, tehsil/block counts | 75 |
| `tehsils.json` | Tehsils for districts with detailed data | 28 (out of ~360 total in UP) |
| `blocks.json` | Blocks for districts with detailed data | 67 (out of ~822 total in UP) |

## Status

- **Divisions:** Complete (18/18) ✅
- **Districts:** Complete (75/75) with name, name-Hindi, division mapping, headquarters, tehsil count, block count ✅
- **Tehsils:** Sample of 5 representative districts (Meerut, Lucknow, Gorakhpur, Kanpur Nagar, Prayagraj) — covering all 6 UP regions ✅
- **Blocks:** Same 5 districts as above ✅

The `hasDetailedData` flag on each district indicates whether its tehsils/blocks are filled in. **The aggregate `tehsilCount` and `blockCount` are accurate for all 75 districts** (per district NIC portals); the detailed listings are pending Phase 6 ingest.

## Source verification

- **Districts list:** verified against `https://en.wikipedia.org/wiki/List_of_districts_of_Uttar_Pradesh` (May 2026) and `https://lgdirectory.gov.in` (LGD).
- **Tehsil/block counts:** compiled from district NIC portals — e.g. `meerut.nic.in`, `gorakhpur.nic.in`, `prayagrajdivision.nic.in/blocks/`, `lucknow.nic.in`.
- **Hindi names:** native script per state government usage.

## Totals (per source data)

- Total tehsils across UP: **360**
- Total blocks (CD blocks) across UP: **829**
- Total villages (Census 2011): ~106,747 (Phase 7 — out of scope for current build)

## Code mapping

District codes follow the LGD convention: `09-NN` where `09` is the UP state code and `NN` is a 2-digit district sequence. Division codes are 3-letter abbreviations.

## Next steps (Phase 6 backlog)

1. Fill in tehsil/block details for the remaining 70 districts
2. Add population, area, RTO code per district
3. Layer in SVAMITVA-specific data (cards issued per district, etc.) once available
4. Add villages (~107K) in a separate `/villages/[district-code].json` chunked structure
