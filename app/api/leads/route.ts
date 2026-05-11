import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/leads
 *
 * Accepts lead submissions from every form on the site (LeadForm component +
 * the custom forms in /check, /dispute/guide). Writes to server log, optionally
 * forwards to a webhook (LEADS_WEBHOOK_URL), and emails the destination address
 * via Resend (RESEND_API_KEY).
 *
 * The destination email is hardcoded server-side. It is NEVER sent to the
 * browser, never rendered in any client component, never in any HTML response.
 * Search the repo for this constant — it only appears in this file.
 */

// Server-only constant. Not exported. Not visible to clients.
const LEAD_DESTINATION_EMAIL = 'webworksa1@gmail.com';
const LEAD_FROM_EMAIL = 'leads@gharauni.com';
const LEAD_FROM_NAME = 'Gharauni Leads';

type LeadPayload = {
  source: string;
  payload: Record<string, string>;
  submittedAt?: string;
};

// Pretty subject line per source
function subjectFor(source: string, payload: Record<string, string>): string {
  const tag = `[Gharauni · ${source}]`;
  const who = payload.name || payload.email || payload.phone || 'New lead';
  return `${tag} ${who}`;
}

// Human-readable text email body
function textBodyFor(lead: LeadPayload): string {
  const lines: string[] = [];
  lines.push(`New lead from gharauni.com`);
  lines.push(``);
  lines.push(`Source:        ${lead.source}`);
  lines.push(`Submitted at:  ${lead.submittedAt || new Date().toISOString()}`);
  lines.push(``);
  lines.push(`Fields:`);
  for (const [k, v] of Object.entries(lead.payload || {})) {
    const value = typeof v === 'string' ? v.replace(/\n/g, ' / ') : String(v);
    lines.push(`  ${k.padEnd(18)} ${value}`);
  }
  lines.push(``);
  lines.push(`---`);
  lines.push(`Reply directly to this email if the lead included a valid email address.`);
  return lines.join('\n');
}

// HTML version with light styling
function htmlBodyFor(lead: LeadPayload): string {
  const rows = Object.entries(lead.payload || {})
    .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#666;font-weight:500;vertical-align:top;white-space:nowrap">${escapeHtml(k)}</td><td style="padding:6px 0;color:#111">${escapeHtml(String(v))}</td></tr>`)
    .join('');
  return `<!doctype html>
<html><body style="font-family:system-ui,-apple-system,sans-serif;background:#f7f4ee;padding:24px;color:#111">
  <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e7e2d8;border-radius:8px;overflow:hidden">
    <div style="background:#c54a1f;color:#fff;padding:14px 20px;font-family:Georgia,serif;font-size:18px">New lead · ${escapeHtml(lead.source)}</div>
    <div style="padding:20px">
      <div style="font-size:12px;color:#888;margin-bottom:12px">Submitted ${escapeHtml(lead.submittedAt || new Date().toISOString())}</div>
      <table style="border-collapse:collapse;font-size:14px">${rows}</table>
    </div>
    <div style="padding:12px 20px;background:#fafafa;border-top:1px solid #eee;font-size:11px;color:#888">
      Reply to this email if the lead included a valid email address.
    </div>
  </div>
</body></html>`;
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));
}

// Send via Resend API (https://resend.com/docs/api-reference/emails/send-email)
async function sendViaResend(lead: LeadPayload): Promise<{ ok: boolean; error?: string }> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return { ok: false, error: 'RESEND_API_KEY not set' };
  }

  const replyTo = lead.payload?.email && typeof lead.payload.email === 'string' && lead.payload.email.includes('@')
    ? lead.payload.email
    : undefined;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `${LEAD_FROM_NAME} <${LEAD_FROM_EMAIL}>`,
        to: [LEAD_DESTINATION_EMAIL],
        reply_to: replyTo,
        subject: subjectFor(lead.source, lead.payload),
        text: textBodyFor(lead),
        html: htmlBodyFor(lead),
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      return { ok: false, error: `Resend HTTP ${res.status}: ${body.slice(0, 200)}` };
    }
    return { ok: true };
  } catch (err: unknown) {
    return { ok: false, error: err instanceof Error ? err.message : 'Unknown Resend error' };
  }
}

// Optional: forward to a webhook (Slack, Zapier, n8n, Discord)
async function forwardToWebhook(lead: LeadPayload): Promise<{ ok: boolean; error?: string }> {
  const url = process.env.LEADS_WEBHOOK_URL;
  if (!url) return { ok: true }; // not configured = silent skip
  try {
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: subjectFor(lead.source, lead.payload),
        lead,
      }),
    });
    return { ok: true };
  } catch (err: unknown) {
    return { ok: false, error: err instanceof Error ? err.message : 'Webhook error' };
  }
}

export async function POST(req: NextRequest) {
  let body: LeadPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  if (!body.source || typeof body.source !== 'string') {
    return NextResponse.json({ ok: false, error: 'Missing source' }, { status: 400 });
  }
  if (!body.payload || typeof body.payload !== 'object') {
    return NextResponse.json({ ok: false, error: 'Missing payload' }, { status: 400 });
  }

  // Spam guards (basic)
  const payloadStr = JSON.stringify(body.payload);
  if (payloadStr.length > 8000) {
    return NextResponse.json({ ok: false, error: 'Payload too large' }, { status: 413 });
  }
  // Honeypot field — if present and non-empty, silently accept and discard
  if (typeof body.payload._hp === 'string' && body.payload._hp.length > 0) {
    return NextResponse.json({ ok: true, spam: true });
  }

  // Always log server-side so leads aren't lost even if Resend fails
  console.log(`[lead] source=${body.source} fields=${Object.keys(body.payload).join(',')}`);

  const lead: LeadPayload = {
    source: body.source,
    payload: body.payload,
    submittedAt: body.submittedAt || new Date().toISOString(),
  };

  // Fire email + webhook in parallel. Don't block the response on either.
  const [emailRes, webhookRes] = await Promise.all([
    sendViaResend(lead),
    forwardToWebhook(lead),
  ]);

  // Even if email fails (e.g. key not set yet), accept the lead and log the
  // failure server-side. Returning 500 here would discourage real users
  // because of an ops misconfig — bad UX.
  if (!emailRes.ok) {
    console.error(`[lead:email-failed] ${emailRes.error}`);
  }
  if (!webhookRes.ok) {
    console.error(`[lead:webhook-failed] ${webhookRes.error}`);
  }

  return NextResponse.json({ ok: true });
}

// GET is intentionally unsupported — leads are write-only from public.
export async function GET() {
  return NextResponse.json({ ok: false, error: 'Method not allowed' }, { status: 405 });
}
