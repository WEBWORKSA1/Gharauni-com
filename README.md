# Gharauni.com

> India's first dedicated platform for SVAMITVA cardholders — loans, status check, marketplace, title verification.

## What this is

Gharauni.com is a multi-service consumer + B2B platform built on top of India's SVAMITVA Scheme (Survey of Villages Abadi and Mapping with Improvised Technology), which has issued **30M+ rural property cards** as of January 2026 and is on track to cover **~600M rural Indians** by FY 2025-26.

The platform offers **8 service pillars**:

| # | Service | Tier | Revenue Model |
|---|---------|------|---------------|
| 1 | Gharauni Status Check | 1b | AdSense + Loan Affiliate |
| 2 | Loan Comparison | 1a | Affiliate CPA (₹500–₹3,000/lead) |
| 3 | Title Verification | 2c | B2B SaaS (₹500–₹5,000/check) |
| 4 | Rural Marketplace | 2d | Listing fees + lead capture |
| 5 | AI Document Parser API | 3f | ₹2–₹10/parse, dev tier |
| 6 | Property Insurance | 3g | Insurance affiliate |
| 7 | Vernacular Learn Hub | 3h | AdSense + affiliate |
| 8 | Dispute Tracker | 2c+ | SaaS subscription |

## Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + custom CSS for grain/textures
- **Icons**: Lucide React
- **Fonts**: Tiro Devanagari Hindi (display) + Crimson Pro (body) + DM Mono
- **Deploy**: Vercel (region: bom1 / Mumbai)
- **i18n**: hi, en, mr, te, bho (Phase 2)

## Quick Start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000

## Deploy to Vercel

1. Push to GitHub (already done)
2. Import at https://vercel.com/new
3. Select `WEBWORKSA1/Gharauni-com`
4. Framework auto-detects as Next.js
5. Add env vars from `.env.example` (most can be empty for v1)
6. Deploy

First deploy: ~2 minutes. Subsequent deploys: ~30 seconds.

## Repo Structure

```
Gharauni-com/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Global styles
│   ├── check/              # Phase 3: Status check
│   ├── loan/               # Phase 3: Loan comparison
│   ├── market/             # Phase 3: Marketplace
│   ├── [state]/            # Phase 4: SEO long-tail
│   └── api/                # Phase 4: API routes
├── components/             # Phase 2: Shared UI
├── lib/                    # Phase 2: i18n, types, data
└── public/                 # Static assets
```

## Build Phases

- [x] **Phase 1**: Repo skeleton + homepage (deployable)
- [ ] **Phase 2**: Shared components + i18n + mock data
- [ ] **Phase 3**: Core consumer routes (check, loan, market, learn)
- [ ] **Phase 4**: B2B routes + SEO long-tail + API endpoints
- [ ] **Phase 5** (post-launch): Auth, real API integrations, lead CRM

## License

Proprietary — © 2026 Gharauni.com. All rights reserved.

Not affiliated with the Government of India or the Ministry of Panchayati Raj. Gharauni.com is an independent aggregator platform serving SVAMITVA cardholders.
