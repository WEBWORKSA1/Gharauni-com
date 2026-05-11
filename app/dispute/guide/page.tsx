'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Download, BookOpen, CheckCircle2, Loader2, FileText, Scale } from 'lucide-react';
import { Shell } from '@/components/shell';

export default function DisputeGuidePage() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source: 'dispute-guide', payload: { email }, submittedAt: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Submission failed';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const chapters = [
    { num: 1, title: 'Understanding your Gharauni card', body: 'What the card means legally, what it does not cover, and why it matters in a dispute.' },
    { num: 2, title: 'The 4-stage resolution path', body: 'Document, talk, mediate, escalate. The right sequence saves time and money.' },
    { num: 3, title: 'Inheritance disputes', body: 'Step-by-step for sibling conflicts under Hindu Succession Act and Muslim personal law.' },
    { num: 4, title: 'Boundary disagreements', body: 'Joint Tehsildar correction requests, GPS reconciliation, neighbor agreements.' },
    { num: 5, title: 'Double-claim and forged-document cases', body: 'When someone else claims your plot. Documentation checklist and lawyer escalation path.' },
    { num: 6, title: 'Going to the panchayat', body: 'How to prepare, what to say, what to bring. Includes a printable mediation request format.' },
    { num: 7, title: 'Tehsildar and court process', body: 'Mutation applications, formal hearings, what to expect, typical timelines.' },
    { num: 8, title: 'Free legal aid in India', body: 'DLSA application, Lok Adalat, when each is appropriate. With contact numbers per state.' },
  ];

  return (
    <Shell>
      <section className="border-b border-ink/10 bg-paper">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-paper to-paper pointer-events-none" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 py-14">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-700/30 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800 mb-4">
              <BookOpen className="w-3.5 h-3.5" /> Free · 14 pages · Hindi + English
            </div>
            <h1 className="font-serif text-4xl lg:text-5xl text-ink leading-tight">
              The Gharauni Dispute Guide
            </h1>
            <p className="mt-2 font-serif text-lg text-ink/70 italic">A clear, step-by-step playbook for the most common land disputes.</p>
            <p className="mt-5 text-ink/80 max-w-2xl">
              एक छोटी-सी गाइड, साफ़ हिंदी में। 80% से ज़्यादा घरौनी विवाद कोर्ट तक नहीं जाने चाहिए। इस गाइड में वह सब कुछ है जो हमने 23 वकीलों और 100+ केसों से सीखा है। Drop your email below and we will WhatsApp you the PDF immediately.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-12 grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-14">
          <div>
            <div className="rounded-lg border border-ink/10 bg-paper p-7 lg:p-9 mb-8">
              {submitted ? (
                <div className="text-center py-4">
                  <CheckCircle2 className="w-12 h-12 text-green-700 mx-auto mb-3" />
                  <div className="font-serif text-lg text-ink/70 mb-1">गाइड भेजी जा रही है</div>
                  <h3 className="font-serif text-2xl text-ink mb-2">Check your email</h3>
                  <p className="text-ink/70 max-w-md mx-auto">The PDF guide is on its way to <span className="font-medium text-ink">{email}</span>. It usually arrives within 5 minutes. Check spam if you do not see it.</p>
                </div>
              ) : (
                <form onSubmit={onSubmit}>
                  <h2 className="font-serif text-2xl text-ink mb-1">Download the guide</h2>
                  <p className="text-sm text-ink/60 mb-6">Free, no spam. Sent immediately by email.</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="your@email.com"
                      className="flex-1 rounded-md border border-ink/15 bg-paper px-4 py-3 text-ink placeholder:text-ink/35 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 outline-none"
                    />
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex items-center justify-center gap-2 rounded-md bg-terracotta px-6 py-3 text-white font-medium hover:bg-terracotta-dark transition-colors disabled:opacity-60"
                    >
                      {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                      {submitting ? 'Sending…' : 'Get the guide'}
                    </button>
                  </div>
                  {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
                  <p className="mt-3 text-xs text-ink/50">By submitting you agree to our <Link href="/privacy" className="underline">privacy policy</Link>. We may follow up once with related Gharauni resources. Unsubscribe anytime.</p>
                </form>
              )}
            </div>

            <div>
              <h2 className="font-serif text-2xl text-ink mb-5">What is inside</h2>
              <ol className="space-y-3">
                {chapters.map((c) => (
                  <li key={c.num} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center flex-shrink-0 font-serif text-sm">
                      {c.num}
                    </div>
                    <div>
                      <h3 className="font-medium text-ink leading-tight">{c.title}</h3>
                      <p className="text-sm text-ink/65 mt-0.5">{c.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border border-ink/10 bg-ink/[0.015] p-6">
              <div className="text-[11px] uppercase tracking-widest text-terracotta/80 font-medium mb-3">Already in a dispute?</div>
              <p className="text-sm text-ink/75 mb-4">If you are past the reading-and-planning stage and need a real lawyer, we have a verified network with fixed pricing.</p>
              <Link href="/dispute/lawyer" className="inline-flex items-center gap-2 rounded-md bg-ink text-paper px-4 py-2 text-sm font-medium hover:bg-terracotta transition-colors">
                <Scale className="w-3.5 h-3.5" /> Talk to a lawyer · ₹999
              </Link>
            </div>
            <div className="text-xs text-ink/55 leading-relaxed">
              <p className="mb-2"><strong className="text-ink/70">Important:</strong> This guide is informational, not legal advice. For your specific situation, consult a property lawyer. We list verified ones at <Link href="/dispute/lawyer" className="underline">/dispute/lawyer</Link>.</p>
              <p>The guide is reviewed annually by practicing property lawyers in UP, MH, and HR.</p>
            </div>
          </div>
        </div>
      </section>
    </Shell>
  );
}
