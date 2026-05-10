'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, CheckCircle2, AlertCircle, Download, MapPin, ArrowRight, Loader2 } from 'lucide-react';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { Seal } from '@/components/seal';
import { STATES } from '@/lib/mock-data';
import { checkStatus } from '@/lib/api';
import { validateGharauniId, formatINR } from '@/lib/utils';
import { ROUTES } from '@/lib/constants';
import type { GharauniCard } from '@/lib/types';

export default function CheckPage() {
  const [form, setForm] = useState({ state: '', district: '', village: '', cardId: '' });
  const [result, setResult] = useState<GharauniCard | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (form.cardId && !validateGharauniId(form.cardId)) {
      setError('घरौनी ID का सही फॉर्मैट: 274612-04567-08');
      return;
    }

    setLoading(true);
    try {
      const card = await checkStatus(form);
      setResult(card);
    } catch (err) {
      setError('कुछ गलत हुआ। दुबारा कोशिश करें।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Nav />
      <section className="py-20 px-6 min-h-[70vh]">
        <div className="max-w-3xl mx-auto">
          <div className="mono text-xs text-terracotta-600 tracking-widest mb-3">SERVICE · STATUS CHECK</div>
          <h1 className="display text-4xl sm:text-5xl m-0 mb-3 leading-tight">अपनी घरौनी की स्थिति जाँचें</h1>
          <p className="text-lg text-ink-700 mb-10 leading-relaxed">
            13 अंकों की घरौनी ID डालें या गाँव का नाम। जाँच मुफ़्त है।
          </p>

          <form onSubmit={onSubmit} className="bg-ivory-50 p-8 border-[1.5px] border-ivory-200">
            <div className="grid gap-5">
              <div>
                <label className="mono text-[11px] text-ink-500 tracking-wider block mb-1.5">
                  राज्य चुनें *
                </label>
                <select
                  required
                  value={form.state}
                  onChange={e => setForm({ ...form, state: e.target.value })}
                  className="input-base"
                >
                  <option value="">— चुनें —</option>
                  {STATES.map(s => (
                    <option key={s.code} value={s.name}>{s.nameHi} · {s.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="mono text-[11px] text-ink-500 tracking-wider block mb-1.5">ज़िला</label>
                  <input
                    type="text"
                    value={form.district}
                    onChange={e => setForm({ ...form, district: e.target.value })}
                    className="input-base"
                    placeholder="पूर्णिया, कानपुर, भोपाल..."
                  />
                </div>
                <div>
                  <label className="mono text-[11px] text-ink-500 tracking-wider block mb-1.5">गाँव *</label>
                  <input
                    type="text"
                    required
                    value={form.village}
                    onChange={e => setForm({ ...form, village: e.target.value })}
                    className="input-base"
                    placeholder="भरतपुर, वाडगाँव..."
                  />
                </div>
              </div>

              <div>
                <label className="mono text-[11px] text-ink-500 tracking-wider block mb-1.5">
                  घरौनी ID (वैकल्पिक — अगर याद हो)
                </label>
                <input
                  type="text"
                  value={form.cardId}
                  onChange={e => setForm({ ...form, cardId: e.target.value })}
                  className="input-base mono"
                  placeholder="274612-04567-08"
                />
              </div>

              {error && (
                <div className="flex items-start gap-2.5 p-3 bg-red-50 border border-red-200 text-red-800 text-sm">
                  <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn-primary inline-flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    खोज रहे हैं...
                  </>
                ) : (
                  <>
                    <Search size={18} />
                    जाँचें
                  </>
                )}
              </button>
            </div>
          </form>

          {result && (
            <div className="animate-fade-up mt-8 bg-ink-900 text-ivory-50 p-8">
              <div className="flex justify-between items-start mb-6 pb-4 border-b border-dashed border-ink-700">
                <div>
                  <div className="mono text-[11px] text-ink-400 tracking-wider">SVAMITVA STATUS</div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <CheckCircle2 size={20} className="text-accent-green" />
                    <span className="display text-2xl text-accent-green">READY · LOAN-ELIGIBLE</span>
                  </div>
                </div>
                <Seal />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <ResultField label="OWNER" value={result.owner} />
                <ResultField label="VILLAGE" value={result.village} />
                <ResultField label="GHARAUNI ID" value={result.cardId} mono accent />
                <ResultField label="AREA" value={result.area} />
                <ResultField label="STATE" value={result.state} />
                <ResultField label="ISSUED" value={result.issued} mono />
              </div>

              {result.eligibilityMin && result.eligibilityMax && (
                <div className="mt-6 p-4 bg-terracotta-600 flex justify-between items-center flex-wrap gap-3">
                  <div>
                    <div className="text-sm text-ivory-100">आपको इतना लोन मिल सकता है:</div>
                    <div className="display text-3xl mt-1">
                      {formatINR(result.eligibilityMin, true)} — {formatINR(result.eligibilityMax, true)}
                    </div>
                  </div>
                  <Link
                    href={ROUTES.loan}
                    className="bg-ivory-50 text-terracotta-600 px-6 py-3 font-semibold inline-flex items-center gap-1.5 hover:bg-ivory-100 transition"
                  >
                    लोन ऑफ़र देखें <ArrowRight size={16} />
                  </Link>
                </div>
              )}

              <div className="mt-4 flex flex-wrap gap-3">
                <button className="bg-transparent text-ivory-50 px-5 py-2.5 border border-ink-700 hover:border-ivory-50 transition flex items-center gap-1.5 text-sm">
                  <Download size={14} /> Download PDF
                </button>
                <button className="bg-transparent text-ivory-50 px-5 py-2.5 border border-ink-700 hover:border-ivory-50 transition flex items-center gap-1.5 text-sm">
                  <MapPin size={14} /> View on Map
                </button>
              </div>
            </div>
          )}

          <div className="mt-10 p-5 bg-ivory-100 border border-dashed border-terracotta-500 text-sm text-ink-700 leading-relaxed">
            <strong className="text-terracotta-600">नोट:</strong> एपीआई एकीकरण फ़ेज़ 4 में जारी। वर्तमान में mock डाटा। प्रोडक्शन में SVAMITVA केंद्रीय रजिस्ट्री और राज्य भूलेख पोर्टलों के साथ hook किया जाएगा।
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

function ResultField({ label, value, mono, accent }: { label: string; value: string; mono?: boolean; accent?: boolean }) {
  return (
    <div>
      <div className="mono text-[11px] text-ink-400 tracking-wider">{label}</div>
      <div className={`mt-0.5 font-semibold text-[17px] ${mono ? 'mono' : ''} ${accent ? 'text-amber-300' : 'text-ivory-50'}`}>
        {value}
      </div>
    </div>
  );
}
