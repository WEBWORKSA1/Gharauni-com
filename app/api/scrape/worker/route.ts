// ───────────────────────────────────────────────────
// Worker-facing endpoints for the external scraper service
// Authenticated via WORKER_SECRET env var.
// ───────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server';
import { claimNextJob, updateJob, recordHeartbeat } from '@/lib/job-store';

export const runtime = 'edge';

function authed(req: NextRequest): boolean {
  const secret = process.env.WORKER_SECRET;
  if (!secret) return false;
  const auth = req.headers.get('authorization') || '';
  return auth === `Bearer ${secret}`;
}

// Worker claims a job to start scraping
export async function POST(req: NextRequest) {
  if (!authed(req)) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }
  const body = await req.json();
  const { action, workerId, jobId, result, error, heartbeat } = body;

  if (action === 'heartbeat' && heartbeat) {
    recordHeartbeat(heartbeat);
    return NextResponse.json({ ok: true });
  }

  if (action === 'claim' && workerId) {
    const job = claimNextJob(workerId);
    if (!job) return NextResponse.json({ ok: true, job: null });
    return NextResponse.json({ ok: true, job });
  }

  if (action === 'complete' && jobId && result) {
    const updated = updateJob(jobId, {
      status: 'success',
      completedAt: new Date().toISOString(),
      result
    });
    return NextResponse.json({ ok: true, job: updated });
  }

  if (action === 'fail' && jobId) {
    const updated = updateJob(jobId, {
      status: 'failed',
      completedAt: new Date().toISOString(),
      error: error || 'unknown'
    });
    return NextResponse.json({ ok: true, job: updated });
  }

  if (action === 'captcha' && jobId) {
    const updated = updateJob(jobId, { status: 'captcha_required' });
    return NextResponse.json({ ok: true, job: updated });
  }

  return NextResponse.json({ ok: false, error: 'unknown action' }, { status: 400 });
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: 'Gharauni worker bridge',
    method: 'POST',
    auth: 'Bearer WORKER_SECRET',
    actions: ['claim', 'complete', 'fail', 'captcha', 'heartbeat']
  });
}
