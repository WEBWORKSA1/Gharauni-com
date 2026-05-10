// ───────────────────────────────────────────────────
// /api/check — status check proxy
// MOCK in current build. In Phase 5, proxy to state Bhulekh / SVAMITVA registry.
// ───────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server';
import { SAMPLE_CARD } from '@/lib/mock-data';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const { state, district, village, cardId } = await req.json();

    if (!village && !cardId) {
      return NextResponse.json({ ok: false, error: 'village or cardId required' }, { status: 400 });
    }

    // PROD HOOK: route to appropriate state Bhulekh API
    // const stateApi = process.env[`${state.toUpperCase()}_BHULEKH_API_URL`];
    // if (stateApi) return fetch(stateApi, { ... });

    // Mock response
    return NextResponse.json({
      ok: true,
      card: {
        ...SAMPLE_CARD,
        state: state || SAMPLE_CARD.state,
        district: district || SAMPLE_CARD.district,
        village: village || SAMPLE_CARD.village,
        cardId: cardId || SAMPLE_CARD.cardId
      },
      source: 'mock'
    });
  } catch (err) {
    return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 });
  }
}
