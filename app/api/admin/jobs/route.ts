import { NextRequest, NextResponse } from 'next/server';
import { listJobs, listWorkers, getStats } from '@/lib/job-store';

export const runtime = 'edge';

function authed(req: NextRequest): boolean {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  const url = new URL(req.url);
  const key = url.searchParams.get('key') || req.headers.get('x-admin-key');
  return key === secret;
}

export async function GET(req: NextRequest) {
  if (!authed(req)) {
    return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  }
  return NextResponse.json({
    ok: true,
    stats: getStats(),
    workers: listWorkers(),
    recentJobs: listJobs({ limit: 50 })
  });
}
