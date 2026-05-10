'use client';

import { useState } from 'react';
import { AlertTriangle, CheckCircle2, Loader2, Scale, FileText } from 'lucide-react';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { submitLead } from '@/lib/api';
import { validatePhone, validateGharauniId } from '@/lib/utils';

export default function DisputePage() {
  const [form, setForm] = useState({
    name: '', phone: '', cardId: '', disputeType: '', description: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!validatePhone(form.phone)) { setError('सही मोबाइल नंबर डालें'); return; }
    if (!validateGharauniId(form.cardId)) { setError('घरौनी ID सही डालें (274612-04567-08)'); return; }
    setLoading(true);
    await submitLead({
      intent: 'dispute',
      name: form.name,
      phone: form.phone,
      cardId: form.cardId,
      message: `Type: ${form.disputeType} | ${form.description}`,
      source: 'dispute',
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
          <div className="mono text-xs text-terracotta-600 tracking-widest mb-3">SERVICE · DISPUTE TRACKING</div>
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-start mb-4">
            <h1 className="display text-4xl sm:text-5xl m-0 leading-tight">Gharauni Dispute Resolution Tracker</h1>
            <AlertTriangle size={56} className="text-terracotta-600 hidden lg:block" />
          </div>
          <p className="text-lg text-ink-700 mb-12 leading-relaxed max-w-3xl">
            विवादित कार्ड ट्रैक करें, ऑब्जेक्शन दायर करें, कानूनी मदद पाएँ। 6 महीने के अंदर दायर किए गए अधिकांश विवाद बिना अदालत जाए सुलझ जाते हैं।
          </p>

          <div className="grid lg:grid-cols-[1fr_1.3fr] gap-10">
            {/* STATS + INFO */}
            <div>
              <div className="bg-ivory-50 p-6 border-[1.5px] border-ivory-200 mb-5">
                <Scale size={32} className="text-terracotta-600 mb-3" />
                <div className="display text-2xl mb-4">By the numbers</div>
                <div className="space-y-3">
                  <KV k="Active dispute cases" v="4,200+" />
                  <KV k="Avg resolution time" v="43 days" />
                  <KV k="Resolved without court" v="78%" />
                  <KV k="Empaneled lawyers" v="180+" />
                </div>
              </div>
              <div className="bg-ink-900 text-ivory-50 p-6">
                <FileText size={28} className="text-amber-300 mb-3" />
                <div className="display text-xl mb-2">How it works</div>
                <ol className="text-sm space-y-2 text-ink-200">
                  <li>1. File objection with documents</li>
                  <li>2. Auto-match with local Tehsildar / Patwari</li>
                  <li>3. Track hearing status in app</li>
                  <li>4. Optional: empanel a lawyer</li>
                  <li>5. Resolution + updated card</li>
                </ol>
              </div>
              <div className="mt-5 text-sm text-ink-500">
                First 30 days free · ₹499/mo thereafter
              </div>
            </div>

            {/* DISPUTE FORM */}
            {!submitted ? (
              <form onSubmit={onSubmit} className="bg-ivory-50 p-7 border-[1.5px] border-ivory-200">
                <h2 className="display text-2xl mb-1">विवाद दर्ज करें</h2>
                <p className="text-sm text-ink-700 mb-5">पहले 30 दिन मुफ़्त।</p>
                <div className="space-y-4">
                  <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="आपका नाम" className="input-base" />
                  <input required type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="मोबाइल" className="input-base" />
                  <input required value={form.cardId} onChange={e => setForm({ ...form, cardId: e.target.value })} placeholder="घरौनी ID (274612-04567-08)" className="input-base mono" />
                  <select required value={form.disputeType} onChange={e => setForm({ ...form, disputeType: e.target.value })} className="input-base">
                    <option value="">विवाद का प्रकार</option>
                    <option value="Overlapping plots">Overlapping plot boundaries</option>
                    <option value="Wrong owner name">Wrong owner name on card</option>
                    <option value="Family dispute">Family ownership dispute</option>
                    <option value="Encumbrance">Hidden mortgage / encumbrance</option>
                    <option value="Area mismatch">Area / measurement mismatch</option>
                    <option value="Other">Other</option>
                  </select>
                  <textarea required value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="संक्षिप्त विवरण दें..." className="input-base resize-y" rows={4} />
                  {error && (
                    <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 text-red-800 text-sm">
                      <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
                      <span>{error}</span>
                    </div>
                  )}
                  <button type="submit" disabled={loading} className="btn-primary w-full inline-flex items-center justify-center gap-2 disabled:opacity-60">
                    {loading ? <><Loader2 size={16} className="animate-spin" /> दर्ज हो रहा है...</> : <>विवाद दर्ज करें</>}
                  </button>
                </div>
              </form>
            ) : (
              <div className="bg-ivory-50 p-10 border-[1.5px] border-ivory-200 text-center">
                <CheckCircle2 size={48} className="text-accent-green mx-auto mb-3" />
                <div className="display text-2xl mb-2">विवाद दर्ज हो गया</div>
                <p className="text-ink-700 mb-3">Case ID: <span className="mono text-terracotta-600">DSP-{Date.now()}</span></p>
                <p className="text-sm text-ink-500">हमारी टीम 48 घंटों में संपर्क करेगी और स्थानीय तहसीलदार के साथ मैच करेगी।</p>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

function KV({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between items-baseline border-b border-ivory-200 pb-2 last:border-0 last:pb-0">
      <span className="text-sm text-ink-700">{k}</span>
      <span className="display text-xl text-terracotta-600">{v}</span>
    </div>
  );
}
