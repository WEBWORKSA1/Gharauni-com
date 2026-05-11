import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

/**
 * POST /api/leads
 *
 * Accepts lead submissions from every form on the site. Writes to server log,
 * optionally forwards to a webhook (LEADS_WEBHOOK_URL), and emails the destination
 * address via Resend (RESEND_API_KEY).
 *
 * Special-case for source='dispute-guide':
 *   - Emails the PDF to the user as an attachment (the deliverable they signed up for)
 *   - Notifies the destination email of the lead
 *
 * The destination email is hardcoded server-side. It is NEVER sent to the
 * browser, never rendered in any client component, never in any HTML response.
 */

// Server-only constant. Not exported. Not visible to clients.
const LEAD_DESTINATION_EMAIL = 'webworksa1@gmail.com';
const LEAD_FROM_EMAIL = 'leads@gharauni.com';
const LEAD_FROM_NAME = 'Gharauni Leads';

// For dispute-guide deliveries we send from a friendlier address
const DELIVERY_FROM_EMAIL = 'guide@gharauni.com';
const DELIVERY_FROM_NAME = 'Gharauni Guide';

// Filename for the dispute guide as stored in /public
const DISPUTE_GUIDE_FILENAME = 'gharauni-dispute-guide-v1.pdf';

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

// Human-readable text email body for the internal lead notification
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

// Email body for the dispute-guide PDF delivery to the user
function disputeGuideUserHtml(name: string): string {
  const greeting = name ? `नमस्ते ${escapeHtml(name)},` : 'नमस्ते,';
  return `<!doctype html>
<html><body style="font-family:Georgia,serif;background:#f7f4ee;padding:24px;color:#1c1917;max-width:600px;margin:0 auto">
  <div style="background:#c54a1f;color:#fff;padding:20px;text-align:center">
    <div style="font-size:24px;font-weight:bold">घरौनी विवाद गाइड</div>
    <div style="font-size:14px;margin-top:4px;opacity:0.95">The Gharauni Dispute Guide · v1.0</div>
  </div>
  <div style="background:#fff;padding:24px;border:1px solid #e7e2d8;border-top:0">
    <p style="font-size:16px;margin:0 0 16px">${greeting}</p>
    <p style="margin:0 0 16px">आपकी अनुरोधित घरौनी विवाद गाइड संलग्न है। यह 19-पृष्ठ की बायलिंगुअल PDF है जो ग्रामीण ज़मीन-विवादों के 8 सबसे आम प्रकारों को कवर करती है।</p>
    <p style="margin:0 0 16px">Your requested Gharauni Dispute Guide is attached. This 19-page bilingual PDF covers the 8 most common types of rural land disputes — inheritance, boundary, double-claim, forgery — with a step-by-step 4-stage resolution path.</p>
    <div style="background:#fef3c7;border:1px solid #d97706;padding:14px;border-radius:4px;font-size:13px;margin:20px 0">
      <strong>Reminder:</strong> This guide is informational only. It is not legal advice. For your specific case, consult a property lawyer in your state.<br/>
      <span style="font-family:'Noto Sans Devanagari',sans-serif">यह गाइड केवल जानकारी के लिए है। यह कानूनी सलाह नहीं है।</span>
    </div>
    <p style="margin:0 0 8px">Have a question we should answer in v2? Reply to this email — every message is read.</p>
    <p style="margin:24px 0 0;color:#78716c;font-size:13px">— Team Gharauni<br/><a href="https://gharauni.com" style="color:#c54a1f;text-decoration:none">gharauni.com</a></p>
  </div>
</body></html>`;
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c] as string));
}

// Send via Resend API (https://resend.com/docs/api-reference/emails/send-email)
async function sendViaResend(opts: {
  to: string[];
  from: string;
  replyTo?: string;
  subject: string;
  text?: string;
  html: string;
  attachments?: { filename: string; content: string }[]; // content as base64
}): Promise<{ ok: boolean; error?: string }> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    return { ok: false, error: 'RESEND_API_KEY not set' };
  }
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: opts.from,
        to: opts.to,
        reply_to: opts.replyTo,
        subject: opts.subject,
        text: opts.text,
        html: opts.html,
        attachments: opts.attachments,
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
  if (!url) return { ok: true };
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

// Load the dispute guide PDF from disk and return as base64.
// Cached at module level since the file never changes between deploys.
let disputeGuideBase64Cache: string | null = null;
async function getDisputeGuideBase64(): Promise<string | null> {
  if (disputeGuideBase64Cache) return disputeGuideBase64Cache;
  try {
    const filePath = path.join(process.cwd(), 'public', DISPUTE_GUIDE_FILENAME);
    const buf = await fs.readFile(filePath);
    disputeGuideBase64Cache = buf.toString('base64');
    return disputeGuideBase64Cache;
  } catch (err) {
    console.error('[dispute-guide] failed to read PDF:', err);
    return null;
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
  // Honeypot field
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

  const replyTo = lead.payload?.email && typeof lead.payload.email === 'string' && lead.payload.email.includes('@')
    ? lead.payload.email
    : undefined;

  // ── Internal notification email to the destination address ────────────────
  const internalEmail = sendViaResend({
    to: [LEAD_DESTINATION_EMAIL],
    from: `${LEAD_FROM_NAME} <${LEAD_FROM_EMAIL}>`,
    replyTo,
    subject: subjectFor(lead.source, lead.payload),
    text: textBodyFor(lead),
    html: htmlBodyFor(lead),
  });

  // ── If this is a dispute-guide signup AND we have a user email, send the PDF ─
  let userDelivery: Promise<{ ok: boolean; error?: string }> = Promise.resolve({ ok: true });
  if (lead.source === 'dispute-guide' && replyTo) {
    const pdfBase64 = await getDisputeGuideBase64();
    if (pdfBase64) {
      userDelivery = sendViaResend({
        to: [replyTo],
        from: `${DELIVERY_FROM_NAME} <${DELIVERY_FROM_EMAIL}>`,
        subject: 'Your Gharauni Dispute Guide (PDF attached)',
        text: 'Your requested Gharauni Dispute Guide is attached as a PDF. Reply to this email with any questions.',
        html: disputeGuideUserHtml(lead.payload.name || ''),
        attachments: [{ filename: DISPUTE_GUIDE_FILENAME, content: pdfBase64 }],
      });
    } else {
      console.error('[lead:dispute-guide] PDF unavailable - user did not receive attachment');
    }
  }

  const webhook = forwardToWebhook(lead);

  // Run in parallel. Don't block the response on any of them.
  const [emailRes, deliveryRes, webhookRes] = await Promise.all([
    internalEmail,
    userDelivery,
    webhook,
  ]);

  // Even if email fails (e.g. key not set yet), accept the lead and log the
  // failure server-side. Returning 500 here would discourage real users
  // because of an ops misconfig — bad UX.
  if (!emailRes.ok) {
    console.error(`[lead:email-failed] ${emailRes.error}`);
  }
  if (!deliveryRes.ok) {
    console.error(`[lead:delivery-failed] ${deliveryRes.error}`);
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
