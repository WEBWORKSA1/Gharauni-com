# Gharauni Scraper Worker

> External Node.js worker that pulls real Gharauni / SVAMITVA data from state Bhulekh portals.

## Why this isn't in Vercel

- Vercel serverless functions: 10s timeout (too short)
- No persistent IP (proxies fail)
- No headless browser support without bloat
- No long-running connections

Deploy this **separately** to a VPS or container host.

## Recommended hosts

| Host | Cost/mo | Why |
|------|---------|-----|
| Hetzner CX22 | €4.50 | Cheapest, EU IP (less suspicious than US Vercel IPs) |
| DigitalOcean Basic Droplet | $6 | Reliable, India region available |
| Railway | $5+ usage | Easiest deploy, autoscale |
| Fly.io | $5+ | Edge regions, good for India proximity |

## Required services

1. **Proxy provider** — residential, Indian IPs preferred. Recommendations:
   - **Bright Data** — $500/mo minimum, premium quality
   - **Smartproxy** — $75/mo for 5GB, decent
   - **IPRoyal** — $7/GB pay-as-you-go, budget option

2. **CAPTCHA solver** — needed for UP, MP, KA, HR:
   - **2Captcha** — ~$2 per 1,000 image CAPTCHAs
   - **Anti-Captcha** — ~$2 per 1,000

## Setup

```bash
cd worker
npm install
npx playwright install chromium
cp .env.example .env
# Edit .env with your secrets
npm start
```

## Environment variables

```env
GHARAUNI_API_URL=https://gharauni-com.vercel.app
WORKER_SECRET=<same value as on Vercel>
WORKER_ID=worker-vps-mumbai-01
PROXY_URL=http://user:pass@proxy.host:port
CAPTCHA_API_KEY=<from 2captcha.com>
MAX_CONCURRENT=2
```

## How it works

```
  Worker polls every 5s     Vercel API queue
   │                              │
   ├─ POST /worker { claim }   ─→  │
   │  ←───────────────── { job }    │
   │                              │
   ├─ Launch headless Chrome     │
   ├─ Open state Bhulekh portal  │
   ├─ Fill form + solve CAPTCHA  │
   ├─ Parse result HTML/PDF      │
   │                              │
   ├─ POST /worker { complete } ─→ │ saves result
   │  ←───────────────── { ok }     │
```

## State adapters

Each state portal has its own adapter in `adapters/`. Currently scaffolded:

| State | Code | Status | CAPTCHA | Notes |
|-------|------|--------|---------|-------|
| Uttar Pradesh | up | scaffold | yes | Most users — build first |
| Madhya Pradesh | mp | scaffold | yes (2-stage) | Slower portal |
| Maharashtra | mh | scaffold | **no** | Cheapest — build second |
| Karnataka | ka | not started | yes | Cloudflare — hard |
| Haryana | hr | not started | yes | Pending |
| Rajasthan | rj | not started | no | Easy |

## Operational checklist before going live

- [ ] Confirm selectors on each live portal (they change roughly twice/year)
- [ ] Set up monitoring (Healthchecks.io, UptimeRobot)
- [ ] Set up proxy budget alerts
- [ ] Set up CAPTCHA credit alerts
- [ ] Test rate-limit detection per state
- [ ] Add result caching (don’t re-scrape same card within 24h)
- [ ] Add abusive-pattern detection (block users submitting 100+ requests)
- [ ] Talk to a lawyer about state portal ToS before scaling past 100 req/day

## Cost model

Assume 1,000 status checks/day, 80% via UP/MP (CAPTCHA states):

```
Proxy bandwidth:    ₹7,000/mo  (~5GB Smartproxy)
CAPTCHA solving:    ₹4,000/mo  (~2,000 solves)
VPS:                ₹500/mo
Total:              ~₹11,500/mo  (~₹11.5/check)
```

Charge users ₹29 per priority status check and you have margin. Free tier 1/day per IP keeps growth.
