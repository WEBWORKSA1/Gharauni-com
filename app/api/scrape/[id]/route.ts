import { NextRequest, NextResponse } from 'next/server';
import { getJob } from '@/lib/job-store';

export const runtime = 'edge';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const job = getJob(params.id);
  if (!job) {
    return NextResponse.json({ ok: false, error: 'job not found' }, { status: 404 });
  }
  return NextResponse.json({ ok: true, job });
}
