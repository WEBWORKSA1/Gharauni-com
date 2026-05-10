'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { LENDERS, STATES } from '@/lib/mock-data';
import { submitLead } from '@/lib/api';
import { validatePhone, formatINR } from '@/lib/utils';
import { ROUTES } from '@/lib/constants';

export default function ApplyPage() {
  const params = useParams();
  const router = useRouter();
  const lender = LENDERS.find(l => l.id === params.lender);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    state: '',
    village: '',
    cardId: '',
    loanAmount: 500000
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!lender) {
    return (
      <>
        <Nav />
        <section className="py-24 px-6 text-center min-h-[60vh]">
          <h1 className="display text-4xl mb-4">Lender not found</h1>
          <Link href={ROUTES.loan} className="btn-ghost">Back to loan comparison</Link>
        </section>
        <Footer />
      </>
    );
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validatePhone(form.phone)) {
      setError('सही 10-अंक का मोबाइल नंबर डालें।');
      return;
    }

    setLoading(true);
    try {
      const res = await submitLead({
        intent: 'loan',
        preferredLender: lender.id,
        ...form,
        source: `loan/apply/${lender.id}`,
        createdAt: new Date().toISOString()
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(res.error || 'Submission failed');
      }
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <>
        <Nav />
        <section className="py-24 px-6 min-h-[70vh]">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 bg-accent-green/10 rounded-full mx-auto flex items-center justify-center mb-6">
              <CheckCircle2 size={48} className="text-accent-green" />
            </div>
            <h1 className="display text-4xl mb-4">आवेदन जमा!</h1>
            <p className="text-lg text-ink-700 mb-2">
              {lender.name} की टीम 24 घंटों में आपसे संपर्क करेगी।
            </p>
            <p className="mono text-sm text-ink-500 mb-8">Lead ID: lead_{Date.now()}</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link href={ROUTES.home} className="btn-ghost">Home</Link>
              <Link href={ROUTES.loan} className="btn-primary">अन्य ऑफ़र देखें</Link>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  const eligibleAmt = Math.min(form.loanAmount, lender.maxAmtNum);

  return (
    <>
      <Nav />
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href={ROUTES.loan} className="inline-flex items-center gap-1.5 text-terracotta-600 text-sm mb-6 hover:underline">
            <ArrowLeft size={16} /> Back to all lenders
          </Link>

          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10">
            {/* LENDER SUMMARY */}
            <div className="bg-ink-900 text-ivory-50 p-6 h-fit">
              <div
                className="w-20 h-20 flex items-center justify-center mono text-2xl font-bold text-ivory-50 mb-4"
                style={{ background: lender.color }}
              >
                {lender.logo}
              </div>
              <div className="display text-2xl mb-1">{lender.name}</div>
              {lender.badge && (
                <div className="inline-block bg-amber-300 text-ink-900 px-2 py-0.5 text-[11px] font-semibold mono uppercase mb-4">
                  {lender.badge}
                </div>
              )}
              <div className="mt-6 space-y-3 text-sm">
                <Row k="Interest Rate" v={lender.rate} highlight />
                <Row k="Max Amount" v={lender.maxAmt} />
                <Row k="Tenure" v={`up to ${lender.tenure}`} />
                <Row k="Processing" v={lender.processing} />
                <Row k="Rating" v={`${lender.rating} ★`} />
              </div>
              <div className="mt-6 pt-6 border-t border-ink-800">
                <div className="text-[13px] text-ink-400 mb-1">You qualify for up to:</div>
                <div className="display text-2xl text-amber-300">{formatINR(eligibleAmt, true)}</div>
              </div>
            </div>

            {/* APPLICATION FORM */}
            <form onSubmit={onSubmit} className="bg-ivory-50 p-7 border-[1.5px] border-ivory-200">
              <h2 className="display text-2xl mb-1">आवेदन फ़ॉर्म</h2>
              <p className="text-sm text-ink-500 mb-6">
                60 सेकंड में पूरा करें। कोई दस्तावेज़ अभी अपलोड नहीं।
              </p>

              <div className="grid gap-4">
                <Field label="नाम *" required value={form.name} onChange={v => setForm({ ...form, name: v })} placeholder="राम कुमार सिंह" />
                <Field label="मोबाइल *" required value={form.phone} onChange={v => setForm({ ...form, phone: v })} placeholder="98765 43210" type="tel" />
                <Field label="ईमेल (वैकल्पिक)" value={form.email} onChange={v => setForm({ ...form, email: v })} placeholder="name@example.com" type="email" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="mono text-[11px] text-ink-500 tracking-wider block mb-1.5">राज्य *</label>
                    <select required value={form.state} onChange={e => setForm({ ...form, state: e.target.value })} className="input-base">
                      <option value="">— चुनें —</option>
                      {STATES.map(s => <option key={s.code} value={s.name}>{s.nameHi}</option>)}
                    </select>
                  </div>
                  <Field label="गाँव *" required value={form.village} onChange={v => setForm({ ...form, village: v })} placeholder="भरतपुर" />
                </div>

                <Field label="घरौनी ID (अगर याद हो)" value={form.cardId} onChange={v => setForm({ ...form, cardId: v })} placeholder="274612-04567-08" mono />

                <div>
                  <label className="mono text-[11px] text-ink-500 tracking-wider block mb-1.5">
                    लोन राशि: <span className="text-terracotta-600 display text-base">{formatINR(form.loanAmount, true)}</span>
                  </label>
                  <input
                    type="range"
                    min={100000}
                    max={lender.maxAmtNum}
                    step={50000}
                    value={form.loanAmount}
                    onChange={e => setForm({ ...form, loanAmount: +e.target.value })}
                    className="w-full accent-terracotta-600"
                  />
                  <div className="flex justify-between mono text-[10px] text-ink-500 mt-1">
                    <span>₹1L</span><span>{lender.maxAmt}</span>
                  </div>
                </div>

                {error && (
                  <div className="flex items-start gap-2.5 p-3 bg-red-50 border border-red-200 text-red-800 text-sm">
                    <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                <button type="submit" disabled={loading} className="btn-primary inline-flex items-center justify-center gap-2 disabled:opacity-60 mt-2">
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> जमा हो रहा है...
                    </>
                  ) : (
                    <>आवेदन जमा करें</>
                  )}
                </button>

                <p className="text-xs text-ink-500 leading-relaxed">
                  जमा करने से आप {lender.name} और Gharauni.com को संपर्क करने की अनुमति देते हैं। हम आपकी जानकारी किसी तीसरे पक्ष को नहीं बेचते।
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

function Row({ k, v, highlight }: { k: string; v: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-ink-400">{k}</span>
      <span className={highlight ? 'display text-amber-300 text-base' : 'font-semibold'}>{v}</span>
    </div>
  );
}

function Field({
  label, value, onChange, placeholder, required, type = 'text', mono
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string;
  required?: boolean; type?: string; mono?: boolean;
}) {
  return (
    <div>
      <label className="mono text-[11px] text-ink-500 tracking-wider block mb-1.5">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={`input-base ${mono ? 'mono' : ''}`}
      />
    </div>
  );
}
