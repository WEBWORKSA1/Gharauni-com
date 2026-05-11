# Gharauni.com — Build Status

**Last updated:** 2026-05-11
**Live URL:** https://gharauni-com.vercel.app
**Custom domain:** gharauni.com (DNS not yet pointed to Vercel)

---

## Phase 6: UP Geography Ingest — IN PROGRESS

**Source of truth ranking:**
1. District `.nic.in` portals (e.g. `meerut.nic.in/tehsil/`) — PRIMARY, used for 9 districts
2. CredBrick/India-Locations-API GitHub repo — SECONDARY, used for 6 districts (community-curated from official sources)
3. Census 2027 (when published) — FUTURE backfill

### Verified districts (15/75)

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

### Pending districts (60/75) — aggregate counts only, named tehsils TBD

Ayodhya, Azamgarh, Baghpat, Bahraich, Ballia, Balrampur, Banda, Barabanki, Bareilly, Basti, Budaun, Bulandshahr, Chandauli, Chitrakoot, Deoria, Etah, Etawah, Farrukhabad, Fatehpur, Firozabad, Gautam Buddha Nagar, Ghaziabad, Ghazipur, Gonda, Hamirpur, Hapur, Hardoi, Hathras, Jalaun, Jaunpur, Jhansi, Kannauj, Kanpur Dehat, Kasganj, Kaushambi, Kushinagar, Lakhimpur Kheri, Lalitpur, Maharajganj, Mahoba, Mainpuri, Mathura, Mau, Mirzapur, Moradabad, Pilibhit, Pratapgarh, Raebareli, Rampur, Sambhal, Sant Kabir Nagar, Sant Ravidas Nagar, Shahjahanpur, Siddharthnagar, Sitapur, Sonbhadra, Sultanpur, Unnao, Varanasi.

For these, the **aggregate `tehsilCount` and `blockCount` fields are populated** (sourced from district NIC portals' summary pages) but the named tehsil/block lists are not yet ingested. UI gracefully handles this via `hasDetailedData: false` flag — user sees "detailed listings being added, you can type your village name directly" message.

### How to finish the remaining 60 districts (TWO PATHS)

**Path A — Run the ingest script locally (15 min, recommended)**

```bash
git clone https://github.com/WEBWORKSA1/Gharauni-com
cd Gharauni-com
node scripts/ingest-up-tehsils.js
git add lib/data/up/tehsils.json lib/data/up/districts.json
git commit -m "Phase 6: complete UP tehsils via CredBrick ingest"
git push
```

Script is at `scripts/ingest-up-tehsils.js`. Pulls from `CredBrick/India-Locations-API/data/`, reconciles transliterations, generates the final JSON.

**Path B — Hire a data entry contractor**

On Truelancer / Upwork India, post: "Compile UP tehsil + block list from district NIC portals into Google Sheet, 60 districts, ₹3000." 24-48hr turnaround, 100% verified.

---

## Other Phase Status

### ✅ Complete
- Phase 1–5: All 8 service tiers (status check, loans, marketplace, title, parser, insurance, learn, dispute)
- Phase 5B: Legal pages, cookie banner, WhatsApp button, trust badges, Resend email integration
- Phase 5C: Scraper architecture + worker scaffolding
- Phase 6 (initial): UP divisions, districts, sample tehsils

### 🔄 Partial / Awaiting User Action
- **Custom domain DNS** — point gharauni.com nameservers to Vercel
- **Resend API key** — set `RESEND_API_KEY` env var in Vercel to activate email lead delivery
- **Affiliate IDs** — sign Bajaj/Tata/ABFL/Kotak affiliate accounts, set their IDs in env vars
- **Worker VPS** — deploy `worker/` to Hetzner CX22 or DigitalOcean if pursuing live scraping
- **Phase 5A (Revenue plumbing)** — affiliate click tracking + attribution + analytics
- **Phase 6 (Tehsil ingest)** — 60 districts pending, see above

### ⏳ Not Started
- Phase 7: UP villages (~107K) — chunked structure planned for `/villages/[district-code].json`
- Phase 8: Other states (MP, MH, KA, HR, RJ adapters defined but no data)

---

## Repo & Deployment

- **Repo:** github.com/WEBWORKSA1/Gharauni-com
- **Branch:** main
- **Auto-deploy:** Vercel → gharauni-com.vercel.app on every push to main
- **Region:** bom1 (Mumbai)
- **Lead email destination:** webworksa1@gmail.com (when RESEND_API_KEY set)
