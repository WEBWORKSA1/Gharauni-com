'use client';

import { useState } from 'react';
import { Cpu, CheckCircle2, Copy, Loader2, ArrowRight } from 'lucide-react';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { submitLead } from '@/lib/api';

const CODE_BLOCK = `POST https://api.gharauni.com/v1/parse
Authorization: Bearer YOUR_API_KEY
Content-Type: multipart/form-data

{
  "file": "gharauni.pdf"
}

→ Response (203ms):
{
  "owner": "Ram Kumar Singh",
  "card_id": "274612-04567-08",
  "village": "Bharatpur",
  "state": "Uttar Pradesh",
  "area_sqft": 1200,
  "coordinates": { "lat": 26.4499, "lng": 80.3319 },
  "issued": "2025-01-18",
  "confidence": 0.987
}`;

export default function ParserPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await submitLead({
      intent: 'parser',
      email,
      source: 'parser',
      createdAt: new Date().toISOString()
    });
    setLoading(false);
    setSubmitted(true);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(CODE_BLOCK);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Nav />
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mono text-xs text-terracotta-600 tracking-widest mb-3">TIER 3 · DEVELOPER API</div>
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-start mb-4">
            <h1 className="display text-4xl sm:text-5xl m-0 leading-tight">Gharauni Document Parser API</h1>
            <Cpu size={56} className="text-terracotta-600 hidden lg:block" />
          </div>
          <p className="text-lg text-ink-700 mb-12 leading-relaxed max-w-3xl">
            Extract structured data from any SVAMITVA card PDF. Built for bank LOS systems. <strong>₹2/parse at scale.</strong> Free tier: 100 parses/month.
          </p>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* WHAT YOU GET */}
            <div>
              <div className="bg-ivory-50 p-7 border-[1.5px] border-ivory-200 mb-6">
                <div className="display text-2xl mb-5">What you get</div>
                {[
                  'RESTful API · JSON output · sub-300ms response',
                  'Extracts: owner, plot ID, area, coordinates, village code, issuance date',
                  'Auto-rotates and OCRs scanned cards',
                  'Webhook support for batch processing',
                  'Currently integrated with 7 NBFC loan origination systems',
                  '99.95% uptime SLA on paid plans'
                ].map((b, i) => (
                  <div key={i} className="flex gap-3 py-3 border-b border-ivory-200 last:border-0">
                    <CheckCircle2 size={18} className="text-terracotta-600 flex-shrink-0 mt-1" />
                    <div className="text-[15px] leading-relaxed">{b}</div>
                  </div>
                ))}
              </div>

              {/* PRICING */}
              <div className="grid grid-cols-3 gap-3">
                <Tier label="Free" price="₹0" detail="100 parses/mo" />
                <Tier label="Growth" price="₹10" detail="per parse" highlight />
                <Tier label="Scale" price="₹2" detail="per parse (volume)" />
              </div>
            </div>

            {/* CODE BLOCK + SIGNUP */}
            <div>
              <div className="bg-ink-900 text-ivory-50 p-6 mono text-[13px] leading-relaxed relative">
                <div className="flex justify-between items-center mb-3">
                  <div className="mono text-[11px] text-ink-400 tracking-wider">SAMPLE REQUEST · RESPONSE</div>
                  <button onClick={copyCode} className="text-ink-400 hover:text-ivory-50 transition flex items-center gap-1 text-xs">
                    <Copy size={12} /> {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>
                <pre className="whitespace-pre-wrap text-amber-300 m-0 overflow-x-auto">{CODE_BLOCK}</pre>
              </div>

              {!submitted ? (
                <form onSubmit={onSubmit} className="mt-6 bg-ivory-50 p-6 border-[1.5px] border-ivory-200">
                  <h3 className="display text-xl mb-3">Get an API key</h3>
                  <p className="text-sm text-ink-700 mb-4">Free tier instantly. No credit card.</p>
                  <div className="flex gap-2">
                    <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="developer@yourcompany.com" className="input-base flex-1" />
                    <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60">
                      {loading ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="mt-6 bg-ivory-50 p-6 border-[1.5px] border-ivory-200 text-center">
                  <CheckCircle2 size={36} className="text-accent-green mx-auto mb-2" />
                  <div className="display text-lg mb-1">API key sent to your inbox</div>
                  <p className="text-sm text-ink-700">Check your email in the next 60 seconds.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

function Tier({ label, price, detail, highlight }: { label: string; price: string; detail: string; highlight?: boolean }) {
  return (
    <div className={`p-4 border-[1.5px] ${highlight ? 'border-terracotta-600 bg-terracotta-600/5' : 'border-ivory-200 bg-ivory-50'}`}>
      <div className="mono text-xs tracking-wider text-ink-500">{label.toUpperCase()}</div>
      <div className="display text-2xl mt-1 text-terracotta-600">{price}</div>
      <div className="text-xs text-ink-700 mt-1">{detail}</div>
    </div>
  );
}
