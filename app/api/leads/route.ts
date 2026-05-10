// ───────────────────────────────────────────────────
// Lead destination — currently EMAIL to webworksa1@gmail.com
// Future: switch to LEADS_WEBHOOK_URL when CRM is set up
// ───────────────────────────────────────────────────

import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

const LEAD_EMAIL = process.env.LEAD_EMAIL || 'webworksa1@gmail.com';
const RESEND_API_KEY = process.env.RESEND_API_KEY; // Phase 5b: add Resend free tier

async function sendLeadEmail(lead: any) {
  // If Resend API key is set, send via Resend (3000 free emails/mo)
  if (RESEND_API_KEY) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'Gharauni Leads <leads@gharauni.com>',
          to: LEAD_EMAIL,
          subject: `🔔 New ${lead.intent} lead · ${lead.name || lead.phone || 'anonymous'}`,
          html: formatLeadHtml(lead),
          reply_to: lead.email || undefined
        })
      });
      return { ok: true };
    } catch (err) {
      console.error('[Gharauni] Resend delivery failed:', err);
      return { ok: false };
    }
  }
  // Otherwise, log + return (Vercel function logs)
  console.log('[Gharauni] LEAD CAPTURED — set RESEND_API_KEY to email:', JSON.stringify(lead, null, 2));
  return { ok: true, mode: 'log-only' };
}

function formatLeadHtml(lead: any): string {
  const rows = Object.entries(lead)
    .filter(([k, v]) => v && k !== 'utm')
    .map(([k, v]) => `<tr><td style="padding:6px 12px;border-bottom:1px solid #eee;color:#666;text-transform:uppercase;font-size:11px;letter-spacing:1px;">${k}</td><td style="padding:6px 12px;border-bottom:1px solid #eee;font-family:monospace;">${String(v).slice(0, 200)}</td></tr>`)
    .join('');
  return `
  <div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;">
    <div style="background:#7C2D12;color:#FDF6E3;padding:24px;text-align:center;">
      <div style="font-size:28px;">घ</div>
      <h1 style="margin:8px 0 0;font-size:22px;">Gharauni.com — New Lead</h1>
    </div>
    <table style="width:100%;border-collapse:collapse;background:#FDF6E3;">
      ${rows}
    </table>
    <div style="padding:16px;background:#1C1917;color:#A8A29E;font-size:12px;text-align:center;">
      Sent from Gharauni.com lead capture system
    </div>
  </div>`;
}

export async function POST(req: NextRequest) {
  try {
    const lead = await req.json();
    if (!lead.intent) {
      return NextResponse.json({ ok: false, error: 'intent required' }, { status: 400 });
    }
    const enriched = {
      ...lead,
      receivedAt: new Date().toISOString(),
      ip: req.headers.get('x-forwarded-for') || 'unknown',
      userAgent: req.headers.get('user-agent') || 'unknown',
      referer: req.headers.get('referer') || 'direct'
    };
    await sendLeadEmail(enriched);
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
    destination: LEAD_EMAIL,
    mode: RESEND_API_KEY ? 'email' : 'log-only',
    method: 'POST'
  });
}
