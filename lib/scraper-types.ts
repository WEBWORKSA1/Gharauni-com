// ───────────────────────────────────────────────────
// Scraper job types — shared between Vercel API + external worker
// ───────────────────────────────────────────────────

export type JobStatus = 'queued' | 'running' | 'success' | 'failed' | 'captcha_required' | 'cancelled';

export interface ScraperJob {
  id: string;
  state: string;
  district?: string;
  village: string;
  cardId?: string;
  ownerName?: string;
  fatherName?: string;
  source: 'up_bhulekh' | 'mp_bhuabhilekh' | 'mh_bhumi' | 'ka_landrecords' | 'manual';
  status: JobStatus;
  attempts: number;
  maxAttempts: number;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  result?: ScraperResult;
  error?: string;
  workerId?: string;
  cost?: number; // in INR paise (1 INR = 100 paise) — for tracking proxy/CAPTCHA spend
}

export interface ScraperResult {
  cardId: string;
  owner: string;
  village: string;
  district: string;
  state: string;
  area: string;
  areaSqft: number;
  khataNumber?: string;
  khasraNumber?: string;
  issued?: string;
  coordinates?: { lat: number; lng: number };
  rawSource?: string; // base64 PDF or HTML snapshot
  capturedAt: string;
  confidence: number; // 0-1, parsed-data confidence
}

export interface WorkerHeartbeat {
  workerId: string;
  lastSeen: string;
  jobsInProgress: number;
  jobsCompleted: number;
  jobsFailed: number;
  proxyStatus: 'healthy' | 'degraded' | 'down';
  captchaCredits?: number;
  version: string;
}

export interface StateAdapter {
  code: string;
  name: string;
  portalUrl: string;
  requiresCaptcha: boolean;
  requiresProxy: boolean;
  avgLatencyMs: number;
  successRate: number; // 0-1
  costPerCall: number; // in INR paise
  enabled: boolean;
  notes?: string;
}

// Adapter registry — mirrors state Bhulekh portals
export const STATE_ADAPTERS: StateAdapter[] = [
  { code: 'up', name: 'Uttar Pradesh', portalUrl: 'https://upbhulekh.gov.in', requiresCaptcha: true, requiresProxy: true, avgLatencyMs: 8500, successRate: 0.82, costPerCall: 350, enabled: true, notes: 'CAPTCHA via 2Captcha. Session-stickiness required.' },
  { code: 'mp', name: 'Madhya Pradesh', portalUrl: 'https://mpbhuabhilekh.nic.in', requiresCaptcha: true, requiresProxy: true, avgLatencyMs: 11200, successRate: 0.74, costPerCall: 420, enabled: true, notes: 'Two-stage CAPTCHA. Slower portal.' },
  { code: 'mh', name: 'Maharashtra', portalUrl: 'https://bhulekh.mahabhumi.gov.in', requiresCaptcha: false, requiresProxy: true, avgLatencyMs: 4200, successRate: 0.91, costPerCall: 180, enabled: true, notes: 'No CAPTCHA — cheapest state to scrape.' },
  { code: 'ka', name: 'Karnataka', portalUrl: 'https://landrecords.karnataka.gov.in', requiresCaptcha: true, requiresProxy: true, avgLatencyMs: 7800, successRate: 0.78, costPerCall: 380, enabled: false, notes: 'Cloudflare-protected. Needs residential proxies.' },
  { code: 'hr', name: 'Haryana', portalUrl: 'https://jamabandi.nic.in', requiresCaptcha: true, requiresProxy: true, avgLatencyMs: 9300, successRate: 0.85, costPerCall: 340, enabled: false, notes: 'Pending integration.' },
  { code: 'rj', name: 'Rajasthan', portalUrl: 'https://apnakhata.rajasthan.gov.in', requiresCaptcha: false, requiresProxy: true, avgLatencyMs: 5600, successRate: 0.88, costPerCall: 200, enabled: false, notes: 'No CAPTCHA on read-only views.' }
];

export function getEnabledAdapters(): StateAdapter[] {
  return STATE_ADAPTERS.filter(a => a.enabled);
}

export function getAdapter(stateCode: string): StateAdapter | undefined {
  return STATE_ADAPTERS.find(a => a.code === stateCode.toLowerCase());
}
