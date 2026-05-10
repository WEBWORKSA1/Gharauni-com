// ───────────────────────────────────────────────────
// In-memory job store — placeholder for Phase 6 when we move to Upstash Redis
// Edge-runtime compatible. Survives only as long as the function instance.
// For production, swap to Upstash Redis or Vercel KV.
// ───────────────────────────────────────────────────

import type { ScraperJob, JobStatus, ScraperResult, WorkerHeartbeat } from './scraper-types';

// HACK: edge functions are stateless. This is only for the demo/MVP flow.
// Each Vercel function invocation may hit a different region/instance.
// Phase 6 fix: use Upstash Redis or Vercel KV via fetch API.
const _jobs = new Map<string, ScraperJob>();
const _workers = new Map<string, WorkerHeartbeat>();

export function createJob(input: Omit<ScraperJob, 'id' | 'status' | 'attempts' | 'maxAttempts' | 'createdAt'>): ScraperJob {
  const job: ScraperJob = {
    id: `job_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    status: 'queued',
    attempts: 0,
    maxAttempts: 3,
    createdAt: new Date().toISOString(),
    ...input
  };
  _jobs.set(job.id, job);
  return job;
}

export function getJob(id: string): ScraperJob | undefined {
  return _jobs.get(id);
}

export function updateJob(id: string, patch: Partial<ScraperJob>): ScraperJob | undefined {
  const job = _jobs.get(id);
  if (!job) return undefined;
  const updated = { ...job, ...patch };
  _jobs.set(id, updated);
  return updated;
}

export function listJobs(filter?: { status?: JobStatus; limit?: number }): ScraperJob[] {
  let jobs = Array.from(_jobs.values());
  if (filter?.status) jobs = jobs.filter(j => j.status === filter.status);
  jobs.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  if (filter?.limit) jobs = jobs.slice(0, filter.limit);
  return jobs;
}

export function claimNextJob(workerId: string): ScraperJob | undefined {
  for (const job of _jobs.values()) {
    if (job.status === 'queued' && job.attempts < job.maxAttempts) {
      const claimed: ScraperJob = {
        ...job,
        status: 'running',
        attempts: job.attempts + 1,
        startedAt: new Date().toISOString(),
        workerId
      };
      _jobs.set(job.id, claimed);
      return claimed;
    }
  }
  return undefined;
}

export function recordHeartbeat(beat: WorkerHeartbeat): void {
  _workers.set(beat.workerId, beat);
}

export function listWorkers(): WorkerHeartbeat[] {
  return Array.from(_workers.values());
}

export function getStats() {
  const jobs = Array.from(_jobs.values());
  return {
    total: jobs.length,
    queued: jobs.filter(j => j.status === 'queued').length,
    running: jobs.filter(j => j.status === 'running').length,
    success: jobs.filter(j => j.status === 'success').length,
    failed: jobs.filter(j => j.status === 'failed').length,
    captchaRequired: jobs.filter(j => j.status === 'captcha_required').length
  };
}
