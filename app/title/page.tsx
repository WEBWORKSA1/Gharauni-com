'use client';

import { useState } from 'react';
import { Shield, CheckCircle2, ArrowRight, Loader2, Building2 } from 'lucide-react';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { submitLead } from '@/lib/api';
import { validatePhone } from '@/lib/utils';

export default function TitlePage() {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', volume: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePhone(form.phone)) {
      alert('सही मोबाइल नंबर डालें');
      return;
    }
    setLoading(true);
    await submitLead({
      intent: 'title',
      name: form.name,
      email: form.email,
      phone: form.phone,
      message: `Company: ${form.company} | Volume: ${form.volume}`,
      source: 'title',
      createdAt: new Date().toISOString()
    });
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <>
      <Nav />
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mono text-xs text-terracotta-600 tracking-widest mb-3">TIER 2 · B2B SAAS</div>
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-start mb-4">
            <h1 className="display text-4xl sm:text-5xl m-0 leading-tight">Title Verification & Pre-Purchase Search</h1>
            <Shield size={56} className="text-terracotta-600 hidden lg:block" />
          </div>
          <p className="text-lg text-ink-700 mb-12 leading-relaxed max-w-3xl">
            Used by banks, NBFCs, and buyers before any rural property transaction. <strong>₹500–₹5,000 per check.</strong> Volume discounts for 100+ titles/month.
          </p>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* WHAT YOU GET */}
            <div className="bg-ivory-50 p-8 border-[1.5px] border-ivory-200">
              <div className="display text-2xl mb-5">What you get</div>
              {[
                'Cross-reference 13-digit Gharauni ID against state Bhulekh records',
                'Surface overlapping plots, family-disputed cards, mortgage encumbrances',
                'ML anomaly detection on ownership inconsistencies',
                'API + dashboard for high-volume buyers (banks, lenders)',
                'Average turnaround: 24–48 hours per title',
                'Title insurance backed by ICICI Lombard partnership (in pilot)'
              ].map((b, i) => (
                <div key={i} className="flex gap-3 py-3 border-b border-ivory-200 last:border-0">
                  <CheckCircle2 size={18} className="text-terracotta-600 flex-shrink-0 mt-1" />
                  <div className="text-[15px] leading-relaxed">{b}</div>
                </div>
              ))}
            </div>

            {/* PRICING + LEAD FORM */}
            <div>
              <div className="bg-ink-900 text-ivory-50 p-7 mb-6">
                <Building2 size={32} className="text-amber-300 mb-3" />
                <div className="display text-2xl mb-1">Volume Pricing</div>
                <div className="space-y-3 mt-5 text-sm">
                  <PriceRow label="Pay-as-you-go" sub="1–49 titles/mo" price="₹5,000/title" />
                  <PriceRow label="Growth" sub="50–199 titles/mo" price="₹1,500/title" />
                  <PriceRow label="Enterprise" sub="200+ titles/mo" price="₹500/title" />
                </div>
              </div>

              {!submitted ? (
                <form onSubmit={onSubmit} className="bg-ivory-50 p-7 border-[1.5px] border-ivory-200">
                  <h3 className="display text-2xl mb-4">Request a B2B demo</h3>
                  <div className="space-y-3">
                    <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="input-base" />
                    <input required value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Company / Bank / NBFC" className="input-base" />
                    <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Work email" className="input-base" />
                    <input required type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Mobile" className="input-base" />
                    <select required value={form.volume} onChange={e => setForm({ ...form, volume: e.target.value })} className="input-base">
                      <option value="">Expected monthly volume</option>
                      <option value="1-49">1–49 titles/mo</option>
                      <option value="50-199">50–199 titles/mo</option>
                      <option value="200+">200+ titles/mo</option>
                    </select>
                    <button type="submit" disabled={loading} className="btn-primary w-full inline-flex items-center justify-center gap-2 disabled:opacity-60">
                      {loading ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : <>Request Demo <ArrowRight size={16} /></>}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="bg-ivory-50 p-7 border-[1.5px] border-ivory-200 text-center">
                  <CheckCircle2 size={48} className="text-accent-green mx-auto mb-3" />
                  <div className="display text-xl mb-2">Request received</div>
                  <p className="text-sm text-ink-700">Our B2B team will reach out within 1 business day.</p>
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

function PriceRow({ label, sub, price }: { label: string; sub: string; price: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-ink-800 last:border-0">
      <div>
        <div className="font-semibold">{label}</div>
        <div className="text-xs text-ink-400">{sub}</div>
      </div>
      <div className="display text-xl text-amber-300">{price}</div>
    </div>
  );
}
