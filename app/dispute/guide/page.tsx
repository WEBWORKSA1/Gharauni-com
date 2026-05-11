'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Download, BookOpen, CheckCircle2, Loader2, Scale, FileDown } from 'lucide-react';
import { Shell } from '@/components/shell';

const PDF_URL = '/gharauni-dispute-guide-v1.pdf';

export default function DisputeGuidePage() {
  const [name, setName] = useState('');
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
        body: JSON.stringify({
          source: 'dispute-guide',
          payload: { name, email },
          submittedAt: new Date().toISOString(),
        }),
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
    { num: 5, title: 'Double-claim and forged-document cases', body: 'When someone else claims your plot. Documentation checklist and escalation path.' },
    { num: 6, title: 'Going to the panchayat', body: 'How to prepare, what to say, what to bring. Includes a printable mediation request format.' },
    { num: 7, title: 'Tehsildar and court process', body: 'Mutation applications, formal hearings, what to expect, typical timelines.' },
    { num: 8, title: 'Free legal aid in India', body: 'DLSA application, Lok Adalat, when each is appropriate. With the official NALSA portal link.' },
  ];

  return (
    <Shell>
      <section className="border-b border-ink/10 bg-paper">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-paper to-paper pointer-events-none" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 py-14">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-700/30 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800 mb-4">
              <BookOpen className="w-3.5 h-3.5" /> Free · 19-page bilingual PDF · Hindi + English
            </div>
            <h1 className="font-serif text-4xl lg:text-5xl text-ink leading-tight">
              The Gharauni Dispute Guide
            </h1>
            <p className="mt-2 font-serif text-lg text-ink/70 italic">A clear, step-by-step playbook for the most common land disputes.</p>
            <p className="mt-5 text-ink/80 max-w-2xl">
              एक मुफ्त गाइड, साफ़ हिंदी और अंग्रेज़ी में। 80% से ज़्यादा घरौनी विवाद कोर्ट तक नहीं जाने चाहिए। यह गाइड बताती है कैसे। Drop your email below — the PDF will be in your inbox in under a minute.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-12 grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-14">
          <div>
            <div className="rounded-lg border border-ink/10 bg-paper p-7 lg:p-9 mb-8">
              {submitted ? (
                <div className="text-center py-2">
                  <CheckCircle2 className="w-12 h-12 text-green-700 mx-auto mb-3" />
                  <div className="font-serif text-lg text-ink/70 mb-1">गाइड भेजी जा रही है</div>
                  <h3 className="font-serif text-2xl text-ink mb-3">Check your email</h3>
                  <p className="text-ink/70 max-w-md mx-auto mb-6">
                    The PDF is on its way to <span className="font-medium text-ink">{email}</span>. It usually arrives within a minute. If you do not see it, check spam.
                  </p>
                  <div className="border-t border-ink/10 pt-5 max-w-md mx-auto">
                    <p className="text-sm text-ink/60 mb-3">Do not want to wait? Download it directly:</p>
                    <a
                      href={PDF_URL}
                      download="gharauni-dispute-guide-v1.pdf"
                      className="inline-flex items-center gap-2 rounded-md bg-terracotta px-5 py-2.5 text-white font-medium hover:bg-terracotta-dark transition-colors"
                    >
                      <FileDown className="w-4 h-4" /> Download PDF now (146 KB)
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={onSubmit}>
                  <h2 className="font-serif text-2xl text-ink mb-1">Get the guide by email</h2>
                  <p className="text-sm text-ink/60 mb-6">Free. No spam. Sent in under a minute.</p>
                  <div className="grid sm:grid-cols-2 gap-3 mb-3">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name (optional)"
                      className="rounded-md border border-ink/15 bg-paper px-4 py-3 text-ink placeholder:text-ink/35 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 outline-none"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="your@email.com"
                      className="rounded-md border border-ink/15 bg-paper px-4 py-3 text-ink placeholder:text-ink/35 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-terracotta px-6 py-3.5 text-white font-medium hover:bg-terracotta-dark transition-colors disabled:opacity-60"
                  >
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                    {submitting ? 'Sending…' : 'Email me the guide'}
                  </button>
                  {error && <p className="mt-3 text-sm text-red-700">{error}. <Link href="/contact" className="underline">Contact us instead</Link>.</p>}
                  <p className="mt-3 text-xs text-ink/50">
                    By submitting you agree to our <Link href="/privacy" className="underline">privacy policy</Link>. We may follow up once with related Gharauni resources. Unsubscribe anytime.
                  </p>
                  <p className="mt-4 pt-4 border-t border-ink/10 text-xs text-ink/55">
                    Prefer to skip the form? <a href={PDF_URL} download="gharauni-dispute-guide-v1.pdf" className="text-terracotta underline">Download the PDF directly</a> (146 KB).
                  </p>
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
              <p className="mt-6 text-xs text-ink/55">
                Plus: a printable mediation request template in both Hindi and English, ready to file with your gram panchayat.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border border-ink/10 bg-ink/[0.015] p-6">
              <div className="text-[11px] uppercase tracking-widest text-terracotta/80 font-medium mb-3">Already in a dispute?</div>
              <p className="text-sm text-ink/75 mb-4">
                If you are past the reading-and-planning stage and need a real lawyer, our verified network with fixed pricing launches Q3 2026.
              </p>
              <Link href="/dispute/lawyer" className="inline-flex items-center gap-2 rounded-md bg-ink text-paper px-4 py-2 text-sm font-medium hover:bg-terracotta transition-colors">
                <Scale className="w-3.5 h-3.5" /> Reserve a consultation
              </Link>
            </div>

            <div className="rounded-md bg-amber-50 border border-amber-200 p-4 text-xs text-amber-900">
              <p className="font-medium mb-1">Informational only, not legal advice.</p>
              <p>
                This guide is general procedural information. Indian property law is state-specific; for your specific case, consult a property lawyer in your state. The guide is compiled from publicly available government procedural information (Ministry of Panchayati Raj, state Bhulekh portals, DLSA guidelines).
              </p>
            </div>
          </div>
        </div>
      </section>
    </Shell>
  );
}
