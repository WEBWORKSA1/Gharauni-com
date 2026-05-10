'use client';

import { useState } from 'react';
import { Umbrella, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { submitLead } from '@/lib/api';
import { validatePhone } from '@/lib/utils';

const PLANS = [
  { name: 'Basic', cover: '₹5L', premium: '₹120/mo', desc: 'Fire + theft only', color: '#65A30D' },
  { name: 'Standard', cover: '₹15L', premium: '₹295/mo', desc: 'Fire + theft + flood + structural', color: '#7C2D12', badge: 'Most chosen' },
  { name: 'Premium', cover: '₹50L', premium: '₹899/mo', desc: 'All risks + crop + livestock', color: '#1E3A8A' }
];

export default function InsurancePage() {
  const [plan, setPlan] = useState('Standard');
  const [form, setForm] = useState({ name: '', phone: '', village: '' });
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
      intent: 'insurance',
      ...form,
      message: `Plan: ${plan}`,
      source: 'insurance',
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
          <div className="mono text-xs text-terracotta-600 tracking-widest mb-3">TIER 3 · INSURANCE</div>
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-start mb-4">
            <h1 className="display text-4xl sm:text-5xl m-0 leading-tight">ग्रामीण संपत्ति बीमा · Rural Property Insurance</h1>
            <Umbrella size={56} className="text-terracotta-600 hidden lg:block" />
          </div>
          <p className="text-lg text-ink-700 mb-10 leading-relaxed max-w-3xl">
            आग, चोरी, बाढ़, संरचनात्मक क्षति। घर + फ़सल + पशुधन का संयुक्त कवर। गाँवों के लिए बना, गाँवों की कीमत पर।
          </p>

          {/* PLAN GRID */}
          <div className="grid sm:grid-cols-3 gap-5 mb-10">
            {PLANS.map(p => (
              <button
                key={p.name}
                onClick={() => setPlan(p.name)}
                className={`text-left p-6 border-[1.5px] transition relative ${
                  plan === p.name
                    ? 'border-terracotta-600 bg-ivory-50 shadow-lg'
                    : 'border-ivory-200 bg-ivory-50 hover:border-terracotta-500'
                }`}
              >
                {p.badge && (
                  <div className="absolute -top-3 left-6 bg-amber-300 text-ink-900 px-2.5 py-0.5 text-[11px] mono uppercase tracking-wider font-semibold">
                    {p.badge}
                  </div>
                )}
                <div className="w-10 h-10 rounded-full mb-4" style={{ background: p.color }} />
                <div className="display text-2xl mb-1">{p.name}</div>
                <div className="text-[13px] text-ink-700 mb-4">{p.desc}</div>
                <div className="display text-3xl text-terracotta-600">{p.premium}</div>
                <div className="mono text-xs text-ink-500 mt-1">Cover {p.cover}</div>
              </button>
            ))}
          </div>

          {/* QUOTE FORM */}
          {!submitted ? (
            <form onSubmit={onSubmit} className="bg-ink-900 text-ivory-50 p-8 grid lg:grid-cols-[1fr_1fr_auto] gap-4 items-end">
              <div>
                <label className="mono text-[11px] text-ink-400 tracking-wider block mb-1.5">Name</label>
                <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="input-base !bg-ink-800 !border-ink-700 !text-ivory-50" />
              </div>
              <div>
                <label className="mono text-[11px] text-ink-400 tracking-wider block mb-1.5">Mobile</label>
                <input required type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="input-base !bg-ink-800 !border-ink-700 !text-ivory-50" />
              </div>
              <button type="submit" disabled={loading} className="bg-amber-300 text-ink-900 px-6 py-3.5 font-semibold inline-flex items-center justify-center gap-2 disabled:opacity-60 whitespace-nowrap">
                {loading ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : <>Get Quote (60s) <ArrowRight size={16} /></>}
              </button>
            </form>
          ) : (
            <div className="bg-ivory-100 p-8 text-center">
              <CheckCircle2 size={48} className="text-accent-green mx-auto mb-3" />
              <div className="display text-2xl mb-2">Quote being prepared</div>
              <p className="text-ink-700">We’ll SMS you the exact premium for {plan} plan within 60 seconds.</p>
            </div>
          )}

          <div className="mt-10 grid sm:grid-cols-4 gap-4 text-center">
            {[
              { v: '₹120', l: 'starting premium/mo' },
              { v: '14 days', l: 'avg claim settlement' },
              { v: '4', l: 'partner insurers' },
              { v: '99.2%', l: 'claim approval rate' }
            ].map((s, i) => (
              <div key={i} className="p-4 bg-ivory-50 border border-ivory-200">
                <div className="display text-2xl text-terracotta-600">{s.v}</div>
                <div className="text-xs text-ink-500 mt-1">{s.l}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-sm text-ink-500">
            Partner network: ICICI Lombard · HDFC Ergo · SBI General · Bajaj Allianz
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
