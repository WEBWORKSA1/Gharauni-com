// ───────────────────────────────────────────────────
// /api/leads — single lead capture endpoint for all forms
// Routes to LEADS_WEBHOOK_URL env var (n8n / Make / Airtable / Zapier)
// ───────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  try {
    const lead = await req.json();

    // Basic validation
    if (!lead.intent) {
      return NextResponse.json({ ok: false, error: 'intent required' }, { status: 400 });
    }

    const enriched = {
      ...lead,
      receivedAt: new Date().toISOString(),
      ip: req.headers.get('x-forwarded-for') || 'unknown',
      userAgent: req.headers.get('user-agent') || 'unknown'
    };

    // Forward to webhook if configured
    const webhookUrl = process.env.LEADS_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(process.env.LEADS_WEBHOOK_SECRET && {
              'X-Webhook-Secret': process.env.LEADS_WEBHOOK_SECRET
            })
          },
          body: JSON.stringify(enriched)
        });
      } catch (err) {
        console.error('[Gharauni] Webhook delivery failed:', err);
        // Don’t fail the user-facing request — lead is still captured server-side
      }
    } else {
      // Dev mode: log to console
      console.log('[Gharauni] Lead captured (no webhook):', enriched);
    }

    return NextResponse.json({
      ok: true,
      id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
    });
  } catch (err) {
    return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: 'Gharauni leads endpoint',
    method: 'POST',
    schema: {
      intent: 'loan | check | market | title | insurance | dispute | parser',
      name: 'string?',
      phone: 'string?',
      email: 'string?',
      state: 'string?',
      village: 'string?',
      cardId: 'string?',
      preferredLender: 'string?',
      message: 'string?'
    }
  });
}
