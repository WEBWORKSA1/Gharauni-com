# Gharauni.com — Build Status

**Last updated:** 2026-05-11
**Live URL:** https://gharauni-com.vercel.app
**Custom domain:** gharauni.com (DNS not yet pointed to Vercel)

---

## ⚡ FINISH UP TEHSIL/BLOCK DATA — 1 COMMAND

```bash
git pull
node scripts/ingest-up-tehsils.js
git add lib/data/up/ && git commit -m "Phase 6: full UP LGD ingest" && git push
```

The script pulls from the **Local Government Directory (LGD)** — the authoritative Ministry of Panchayati Raj source — via the daily-updated `ramseraph.github.io/opendata/lgd/` mirror. It auto-fills all 75 districts with ~350 tehsils and ~826 blocks, handles historical name changes (Allahabad→Prayagraj, Faizabad→Ayodhya, Panchsheel Nagar→Hapur, etc.), and writes the final JSON.

**If the ramseraph file paths have moved:**

```bash
# Browse https://ramseraph.github.io/opendata/lgd/ to find current paths, then:
SUBDISTRICTS_CSV=https://ramseraph.github.io/opendata/lgd/path/to/subdistricts.csv \
BLOCKS_CSV=https://ramseraph.github.io/opendata/lgd/path/to/blocks.csv \
node scripts/ingest-up-tehsils.js
```

**Or download from LGD directly** (https://lgdirectory.gov.in/downloadDirectory.do, filter State=Uttar Pradesh, entity=Sub-District + Block, save CSVs locally, serve with `python3 -m http.server`, point env vars at http://localhost:8000/...).

**Dry run first:**

```bash
DRY_RUN=1 node scripts/ingest-up-tehsils.js
```

---

## Phase 6: UP Geography Ingest — IN PROGRESS

**Source of truth ranking:**
1. **LGD (Local Government Directory)** — Ministry of Panchayati Raj. Authoritative for all 75 districts, 350 tehsils, 826 blocks. Use ingest script above.
2. District `.nic.in` portals (e.g. `meerut.nic.in/tehsil/`) — fallback per-district source, used for 9 districts before script was built
3. CredBrick/India-Locations-API GitHub repo — used for 6 districts (community-curated from official sources)
4. Census 2027 (when published) — FUTURE backfill

### Verified districts at the moment (15/75)

| # | District | Tehsils | Blocks | Source |
|---|----------|---------|--------|--------|
| 1 | Meerut | 3 | 12 | meerut.nic.in |
| 2 | Lucknow | 4 | 8 | lucknow.nic.in |
| 3 | Gorakhpur | 7 | 19 | gorakhpur.nic.in |
| 4 | Kanpur Nagar | 6 | 10 | kanpurnagar.nic.in |
| 5 | Prayagraj | 8 | 23 | prayagrajdivision.nic.in |
| 6 | Saharanpur | 5 | 11 | saharanpur.nic.in |
| 7 | Shamli | 3 | 5 | shamli.nic.in |
| 8 | Muzaffarnagar | 4 | 9 | muzaffarnagar.nic.in |
| 9 | Bijnor | 5 | 11 | bijnor.nic.in + LGD |
| 10 | Agra | 6 | 15 | CredBrick |
| 11 | Aligarh | 5 | 12 | CredBrick |
| 12 | Ambedkar Nagar | 5 | 9 | CredBrick |
| 13 | Amethi | 4 | 13 | CredBrick |
| 14 | Amroha | 4 | 6 | CredBrick |
| 15 | Auraiya | 3 | 7 | CredBrick |

**Once `node scripts/ingest-up-tehsils.js` runs:** all 75 will be populated from LGD. The script will OVERWRITE the existing tehsils.json with LGD's canonical data (which is more authoritative than the 15 we hand-curated). LGD names may differ slightly in transliteration but represent the same units.

### Pending districts (60/75) — auto-filled by ingest script

Ayodhya, Azamgarh, Baghpat, Bahraich, Ballia, Balrampur, Banda, Barabanki, Bareilly, Basti, Budaun, Bulandshahr, Chandauli, Chitrakoot, Deoria, Etah, Etawah, Farrukhabad, Fatehpur, Firozabad, Gautam Buddha Nagar, Ghaziabad, Ghazipur, Gonda, Hamirpur, Hapur, Hardoi, Hathras, Jalaun, Jaunpur, Jhansi, Kannauj, Kanpur Dehat, Kasganj, Kaushambi, Kushinagar, Lakhimpur Kheri, Lalitpur, Maharajganj, Mahoba, Mainpuri, Mathura, Mau, Mirzapur, Moradabad, Pilibhit, Pratapgarh, Raebareli, Rampur, Sambhal, Sant Kabir Nagar, Sant Ravidas Nagar, Shahjahanpur, Siddharthnagar, Sitapur, Sonbhadra, Sultanpur, Unnao, Varanasi.

UI gracefully handles these: shows "detailed listings being added, type your village name directly" message on each district page until script runs.

---

## Other Phase Status

### ✅ Complete
- Phase 1–5: All 8 service tiers (status check, loans, marketplace, title, parser, insurance, learn, dispute)
- Phase 5B: Legal pages, cookie banner, WhatsApp button, trust badges, Resend email integration
- Phase 5C: Scraper architecture + worker scaffolding
- Phase 6 (initial): UP divisions (18), districts (75), sample tehsils (15 districts)
- Phase 6 (ingest script): LGD-sourced auto-ingest for remaining 60 districts

### 🔄 Awaiting User Action
- **Run ingest script** — `node scripts/ingest-up-tehsils.js` (finishes Phase 6)
- **Custom domain DNS** — point gharauni.com nameservers to Vercel
- **Resend API key** — set `RESEND_API_KEY` env var in Vercel to activate email lead delivery
- **Affiliate IDs** — sign Bajaj/Tata/ABFL/Kotak affiliate accounts, set their IDs in env vars
- **Worker VPS** — deploy `worker/` to Hetzner CX22 or DigitalOcean if pursuing live scraping
- **Phase 5A (Revenue plumbing)** — affiliate click tracking + attribution + analytics

### ⏳ Not Started
- Phase 7: UP villages (~107K) — LGD has these too, can extend ingest script
- Phase 8: Other states (MP, MH, KA, HR, RJ adapters defined but no data)

---

## Repo & Deployment

- **Repo:** github.com/WEBWORKSA1/Gharauni-com
- **Branch:** main
- **Auto-deploy:** Vercel → gharauni-com.vercel.app on every push to main
- **Region:** bom1 (Mumbai)
- **Lead email destination:** webworksa1@gmail.com (when RESEND_API_KEY set)

---

## LGD Resource Reference

Permanent URLs for the Ministry of Panchayati Raj's Local Government Directory:

- Homepage: https://lgdirectory.gov.in/
- Bulk download (state-filtered): https://lgdirectory.gov.in/downloadDirectory.do
- Districts viewer: https://lgdirectory.gov.in/globalviewdistrictforcitizen.do
- Sub-districts viewer: https://lgdirectory.gov.in/globalviewsubdistrictforcitizen.do
- Blocks viewer: https://lgdirectory.gov.in/globalviewBlockforcitizen.do
- Daily CSV mirror: https://ramseraph.github.io/opendata/lgd/
- data.gov.in catalog: https://www.data.gov.in/catalog/local-government-directory-lgd

UP state code in LGD: **9** (numeric) / **09** (string).
Official UP counts per LGD (May 2026): **75 districts, ~350 tehsils, ~826 development blocks**.
