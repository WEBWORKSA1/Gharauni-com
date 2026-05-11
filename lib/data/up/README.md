# Uttar Pradesh Administrative Data

> Authoritative source of UP's administrative geography for Gharauni.com.

## Status — Phase 6 complete ✅

| File | Status | Records |
|------|--------|---------|
| `divisions.json` | ✅ Complete | 18 / 18 administrative divisions |
| `districts.json` | ✅ Complete | 75 / 75 districts (all flagged `hasDetailedData: true`) |
| `tehsils.json` | ✅ Complete | 348 tehsils across all 75 districts |
| `blocks.json` | ✅ Complete | Community-development blocks for all 75 districts |

The dataset matches the canonical UP totals (75 districts, ~350 tehsils, ~822 blocks).
Hindi names are present for every record.

## Refresh — when LGD changes

UP administrative geography changes slowly (a few entries per year). When it does,
you have two ways to pick up the change.

### Option A — GitHub Action (zero-touch)

The workflow at `.github/workflows/lgd-refresh.yml` (you install this manually since
the GitHub App integration cannot write to `.github/workflows/`) runs on the 1st of
every month and can also be triggered manually from the Actions tab.

It opens a PR with the diff if anything changed. Review, merge, done.

**Install once:** create the file via GitHub UI from the YAML in `/scripts/lgd-refresh.yml.txt` (the workflow file shipped as a text artifact since the integration cannot install it directly).

**Manual trigger after install:** Actions tab → "LGD UP Tehsil/Block Refresh" → "Run workflow".

### Option B — Run locally

Requires Node 18+ and the `7z` CLI (`apt-get install p7zip-full` on Linux, `brew install p7zip` on macOS).

```bash
node scripts/ingest-up-tehsils.js
git add lib/data/up/
git commit -m "chore(data): refresh UP LGD ingest"
git push
```

Use `DRY_RUN=1` to parse without writing.

## Source authority chain

Ministry of Panchayati Raj → `lgdirectory.gov.in` → daily scrape by
[ramSeraph/opendata](https://github.com/ramSeraph/opendata) → `lgd-latest`
release tag → ingest script → this repo.

The mirror is one or two days behind LGD. For rural property geography
that is acceptable — administrative units change monthly at most.

## Code mapping

District codes follow LGD: `09-NN` where `09` is the UP state code and `NN`
is a 2-digit district sequence. Division codes are 3-letter abbreviations.

## Validation rules for the ingest

- Tehsil count delta of more than ±5% between runs should be reviewed manually
- A district moving from `hasDetailedData: true` → `false` means the script
  failed to map the district name — check `DISTRICT_NAME_TO_SLUG` in the script
- Hindi names must round-trip as proper Devanagari (no `???` placeholders)

## Next: villages

UP has ~107,000 villages (Census 2011). When that becomes important for
the marketplace or check tier, see the same LGD source — village data
ships as separate `villages.csv.7z` files per state.
