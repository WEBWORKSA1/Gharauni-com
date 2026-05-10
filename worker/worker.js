// ───────────────────────────────────────────────────
// GHARAUNI SCRAPER WORKER
// Deploy this SEPARATELY from the Vercel app.
// Recommended hosts: Hetzner CX22 (€4.5/mo), DigitalOcean Basic Droplet ($6/mo),
//                    Railway, Fly.io, or any VPS with persistent IP.
//
// DO NOT deploy to Vercel — serverless will fail on:
//   - persistent browser sessions
//   - long-running scraping jobs (10s timeout)
//   - IP reuse (proxies rotate)
//
// Run: npm install && node worker.js
// ───────────────────────────────────────────────────

import { chromium } from 'playwright-extra';
import stealth from 'puppeteer-extra-plugin-stealth';
import { solveCaptcha } from './captcha.js';
import { upBhulekhAdapter } from './adapters/up.js';
import { mpBhulekhAdapter } from './adapters/mp.js';
import { mhBhulekhAdapter } from './adapters/mh.js';

chromium.use(stealth());

const CONFIG = {
  apiUrl: process.env.GHARAUNI_API_URL || 'https://gharauni-com.vercel.app',
  workerSecret: process.env.WORKER_SECRET,
  workerId: process.env.WORKER_ID || `worker_${Math.random().toString(36).slice(2, 8)}`,
  proxyUrl: process.env.PROXY_URL,
  captchaApiKey: process.env.CAPTCHA_API_KEY,
  pollIntervalMs: 5000,
  heartbeatIntervalMs: 30000,
  maxConcurrent: parseInt(process.env.MAX_CONCURRENT || '2')
};

if (!CONFIG.workerSecret) {
  console.error('FATAL: WORKER_SECRET env var required');
  process.exit(1);
}

const ADAPTERS = {
  up_bhulekh: upBhulekhAdapter,
  mp_bhuabhilekh: mpBhulekhAdapter,
  mh_bhumi: mhBhulekhAdapter
};

let jobsInProgress = 0;
let jobsCompleted = 0;
let jobsFailed = 0;
let running = true;

async function api(action, body = {}) {
  const res = await fetch(`${CONFIG.apiUrl}/api/scrape/worker`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${CONFIG.workerSecret}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ action, workerId: CONFIG.workerId, ...body })
  });
  return res.json();
}

async function heartbeat() {
  await api('heartbeat', {
    heartbeat: {
      workerId: CONFIG.workerId,
      lastSeen: new Date().toISOString(),
      jobsInProgress,
      jobsCompleted,
      jobsFailed,
      proxyStatus: CONFIG.proxyUrl ? 'healthy' : 'down',
      version: '0.1.0'
    }
  });
}

async function processJob(job) {
  jobsInProgress++;
  console.log(`[${CONFIG.workerId}] processing job ${job.id} (${job.state}/${job.village})`);

  const adapter = ADAPTERS[job.source];
  if (!adapter) {
    await api('fail', { jobId: job.id, error: `no adapter for ${job.source}` });
    jobsInProgress--; jobsFailed++;
    return;
  }

  const browser = await chromium.launch({
    headless: true,
    proxy: CONFIG.proxyUrl ? { server: CONFIG.proxyUrl } : undefined
  });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    locale: 'hi-IN',
    timezoneId: 'Asia/Kolkata'
  });
  const page = await context.newPage();

  try {
    const result = await adapter.scrape({
      page,
      input: job,
      solveCaptcha: (img) => solveCaptcha(img, CONFIG.captchaApiKey)
    });
    await api('complete', { jobId: job.id, result });
    jobsCompleted++;
    console.log(`[${CONFIG.workerId}] ✅ success ${job.id}`);
  } catch (err) {
    if (err.code === 'CAPTCHA_BUDGET_EXHAUSTED') {
      await api('captcha', { jobId: job.id });
    } else {
      await api('fail', { jobId: job.id, error: err.message });
    }
    jobsFailed++;
    console.error(`[${CONFIG.workerId}] ❌ failed ${job.id}: ${err.message}`);
  } finally {
    await browser.close();
    jobsInProgress--;
  }
}

async function pollLoop() {
  while (running) {
    try {
      if (jobsInProgress >= CONFIG.maxConcurrent) {
        await sleep(CONFIG.pollIntervalMs);
        continue;
      }
      const { job } = await api('claim');
      if (job) {
        processJob(job); // fire-and-forget for concurrency
      } else {
        await sleep(CONFIG.pollIntervalMs);
      }
    } catch (err) {
      console.error('poll error:', err.message);
      await sleep(CONFIG.pollIntervalMs * 2);
    }
  }
}

async function heartbeatLoop() {
  while (running) {
    try { await heartbeat(); }
    catch (err) { console.error('heartbeat error:', err.message); }
    await sleep(CONFIG.heartbeatIntervalMs);
  }
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// Graceful shutdown
process.on('SIGTERM', () => { running = false; });
process.on('SIGINT', () => { running = false; });

console.log(`[Gharauni Worker ${CONFIG.workerId}] starting...`);
console.log(`  API: ${CONFIG.apiUrl}`);
console.log(`  Proxy: ${CONFIG.proxyUrl ? 'configured' : 'NONE (will be detected fast)'}`);
console.log(`  CAPTCHA: ${CONFIG.captchaApiKey ? 'configured' : 'NONE (captcha-protected states will fail)'}`);
console.log(`  Max concurrent: ${CONFIG.maxConcurrent}`);

Promise.all([pollLoop(), heartbeatLoop()]).catch(err => {
  console.error('FATAL:', err);
  process.exit(1);
});
