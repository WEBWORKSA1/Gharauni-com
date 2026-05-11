# Uttar Pradesh Administrative Data

> Authoritative source of UP's administrative geography for Gharauni.com.

## What's here

| File | Contents | Records (after ingest) |
|------|----------|------------------------|
| `divisions.json` | 18 administrative divisions | 18 |
| `districts.json` | All 75 districts with division, HQ, tehsil/block counts | 75 |
| `tehsils.json` | Tehsils for all UP districts | ~360 |
| `blocks.json` | Community-development blocks | ~822 |

Initial seed covers 15 districts. The rest are filled by the LGD ingest script — see below.

## Status

- **Divisions:** Complete (18/18) ✅
- **Districts:** Complete (75/75) ✅
- **Tehsils + blocks:** Currently seeded for 15 districts. Run the ingest to fill the rest.

The `hasDetailedData` flag on each district reflects whether tehsils/blocks are present after the latest ingest.

## Refresh workflow

Two ways to refresh the data from the Local Government Directory (LGD):

### Option A: GitHub Action (recommended)

The workflow at `.github/workflows/lgd-refresh.yml` runs on the 1st of every
month and can also be triggered manually from the Actions tab.

It opens a PR with the diff. Review the diff, merge, done.

**Manual trigger:** Actions tab → "LGD UP Tehsil/Block Refresh" → "Run workflow".

### Option B: Run locally

Requires Node 18+ and the `7z` CLI (`apt-get install p7zip-full` on Linux,
`brew install p7zip` on macOS).

```bash
node scripts/ingest-up-tehsils.js
git add lib/data/up/
git commit -m "chore(data): refresh UP LGD ingest"
git push
```

Use `DRY_RUN=1` to parse without writing:

```bash
DRY_RUN=1 node scripts/ingest-up-tehsils.js
```

## Source authority chain

Ministry of Panchayati Raj → `lgdirectory.gov.in` → daily scrape by
[ramSeraph/opendata](https://github.com/ramSeraph/opendata) → `lgd-latest`
release tag → this script → our repo.

The mirror is one or two days behind LGD. For our use case (rural property
geography) that is acceptable — administrative geography changes monthly at
most.

## Code mapping

District codes: `09-NN` where `09` is the UP state code and `NN` is a 2-digit
district sequence (matches LGD). Division codes are 3-letter abbreviations.

## Totals (canonical)

- 75 districts in 18 divisions
- ~360 tehsils (sub-districts)
- ~829 community-development blocks
- ~107,000 villages (Census 2011) — not yet in this repo

## Validation rules for the ingest

- A tehsil count delta of more than ±5% between runs should be reviewed manually
- A district moving from `hasDetailedData: true` → `false` means the script
  failed to map the district name — check `DISTRICT_NAME_TO_SLUG` in the script
- Hindi names must round-trip as proper Devanagari (no `???` placeholders)
