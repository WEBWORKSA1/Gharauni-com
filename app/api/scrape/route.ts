import { NextRequest, NextResponse } from 'next/server';
import { createJob } from '@/lib/job-store';
import { getAdapter } from '@/lib/scraper-types';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { state, district, village, cardId, ownerName, fatherName } = body;

    if (!state) {
      return NextResponse.json({ ok: false, error: 'state required' }, { status: 400 });
    }
    if (!village && !cardId) {
      return NextResponse.json({ ok: false, error: 'village or cardId required' }, { status: 400 });
    }

    const adapter = getAdapter(state);
    if (!adapter) {
      return NextResponse.json({ ok: false, error: 'state not supported' }, { status: 400 });
    }
    if (!adapter.enabled) {
      return NextResponse.json({
        ok: false,
        error: `${adapter.name} integration not yet enabled`,
        eta: 'Phase 6 — Q3 2026'
      }, { status: 503 });
    }

    const job = createJob({
      state,
      district,
      village,
      cardId,
      ownerName,
      fatherName,
      source: `${adapter.code}_bhulekh` as any
    });

    return NextResponse.json({
      ok: true,
      jobId: job.id,
      status: job.status,
      estimatedSeconds: Math.ceil(adapter.avgLatencyMs / 1000) + 10,
      pollUrl: `/api/scrape/${job.id}`
    });
  } catch (err) {
    return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: 'Gharauni scraper queue',
    method: 'POST',
    schema: {
      state: 'string (required) — e.g. up, mp, mh',
      village: 'string (required if cardId not given)',
      cardId: 'string (required if village not given) — 13-digit format',
      district: 'string (optional)',
      ownerName: 'string (optional)',
      fatherName: 'string (optional)'
    }
  });
}
