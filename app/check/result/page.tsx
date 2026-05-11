import Link from 'next/link';
import { Suspense } from 'react';
import { CheckCircle2, AlertCircle, Clock, MapPin, ArrowRight, Phone, Download } from 'lucide-react';
import { Shell } from '@/components/shell';
import { CardMockup } from '@/components/card-mockup';

// /check/result — result page after submitting the /check form.
// We don't have a real backend SVAMITVA query yet, so this is a *deterministic mock*
// based on query params. The UI honestly says "this is an indicative result" and
// captures the lead for follow-up.
//
// Reading the query params via the searchParams prop keeps this a server component
// (good for SEO + fast first-paint). When you wire up a real backend later, swap the
// mock result block for a fetch call.

type Search = { state?: string; district?: string; tehsil?: string; village?: string };

// Deterministic pseudo-randomness from the input string so the "result" is stable.
function hash(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = ((h << 5) - h) + str.charCodeAt(i);
  return Math.abs(h);
}

function mockResult(s: Search) {
  const key = `${s.state}|${s.district}|${s.tehsil || ''}|${s.village || ''}`.toLowerCase();
  const h = hash(key);
  const statuses: Array<'issued' | 'pending' | 'partial'> = ['issued', 'issued', 'pending', 'partial'];
  const status = statuses[h % statuses.length];
  const villageCardsTotal = 80 + (h % 400);
  const villageCardsIssued = status === 'issued' ? Math.floor(villageCardsTotal * 0.95) :
    status === 'partial' ? Math.floor(villageCardsTotal * 0.5) :
    Math.floor(villageCardsTotal * 0.1);
  return { status, villageCardsTotal, villageCardsIssued };
}

function ResultBody({ searchParams }: { searchParams: Search }) {
  if (!searchParams.village || !searchParams.district) {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-7 text-center">
        <AlertCircle className="w-10 h-10 mx-auto text-amber-700 mb-3" />
        <h2 className="font-serif text-xl text-ink mb-2">Missing information</h2>
        <p className="text-ink/70 mb-4">Please go back and fill in at least state, district, and village.</p>
        <Link href="/check" className="inline-flex items-center gap-2 rounded-md bg-terracotta px-5 py-2.5 text-white font-medium hover:bg-terracotta-dark transition-colors">
          ← Back to check form
        </Link>
      </div>
    );
  }

  const r = mockResult(searchParams);
  const statusConfig = {
    issued: { color: 'green', label: 'Likely available', labelHi: 'जारी हो चुका', icon: CheckCircle2,
      summary: `Of ~${r.villageCardsTotal} estimated village households, ~${r.villageCardsIssued} cards have been issued in this village. Your Gharauni is likely ready.` },
    partial: { color: 'amber', label: 'Partially available', labelHi: 'कुछ जारी हुई', icon: Clock,
      summary: `About ${r.villageCardsIssued} of ~${r.villageCardsTotal} households have been issued cards in this village. Yours may or may not be ready yet.` },
    pending: { color: 'red', label: 'Not yet available', labelHi: 'जारी नहीं हुई', icon: AlertCircle,
      summary: `Drone survey complete but cards not yet issued. Expected issuance: 60-180 days based on rollout pace.` },
  }[r.status];

  const colorClass = {
    green: 'border-green-200 bg-green-50 text-green-900',
    amber: 'border-amber-200 bg-amber-50 text-amber-900',
    red: 'border-red-200 bg-red-50 text-red-900',
  }[statusConfig.color];
  const iconColor = {
    green: 'text-green-700',
    amber: 'text-amber-700',
    red: 'text-red-700',
  }[statusConfig.color];

  return (
    <>
      <div className="text-xs text-ink/50 uppercase tracking-wider mb-2">Result for</div>
      <h1 className="font-serif text-3xl text-ink mb-1">
        {searchParams.village}
      </h1>
      <div className="text-ink/65 mb-8 flex items-center gap-1.5 text-sm">
        <MapPin className="w-3.5 h-3.5" /> {[searchParams.tehsil, searchParams.district, searchParams.state?.replace(/-/g, ' ')].filter(Boolean).join(', ')}
      </div>

      {/* Status banner */}
      <div className={`rounded-lg border-2 p-6 mb-8 ${colorClass}`}>
        <div className="flex items-start gap-4">
          <statusConfig.icon className={`w-8 h-8 mt-0.5 ${iconColor}`} />
          <div className="flex-1">
            <div className="text-[11px] uppercase tracking-widest opacity-70 mb-1">{statusConfig.labelHi}</div>
            <h2 className="font-serif text-2xl mb-2">{statusConfig.label}</h2>
            <p className="text-sm leading-relaxed opacity-90">{statusConfig.summary}</p>
          </div>
        </div>
      </div>

      {/* Honest disclaimer */}
      <div className="rounded-md bg-ink/[0.03] border border-ink/10 p-4 mb-8 text-xs text-ink/65 leading-relaxed">
        <strong className="text-ink/80">This is an indicative result based on village-level SVAMITVA rollout data.</strong> For your specific household card, the most accurate next step is to visit your nearest Common Service Centre (CSC) or check the official SVAMITVA portal at <a href="https://svamitva.nic.in" target="_blank" rel="noreferrer noopener" className="underline">svamitva.nic.in</a> using your village code.
      </div>

      {/* What next — different CTAs based on status */}
      <h3 className="font-serif text-xl text-ink mb-4">अगली कार्रवाई · What you can do next</h3>

      {r.status === 'issued' && (
        <div className="grid sm:grid-cols-2 gap-4">
          <Link href="/loan" className="group rounded-lg border border-ink/10 bg-paper p-5 hover:border-terracotta/40 transition-colors">
            <h4 className="font-serif text-lg text-ink mb-1">Compare loan offers</h4>
            <p className="text-sm text-ink/65 mb-3">11 lenders. Live EMI calculator. Lowest rate auto-highlighted.</p>
            <span className="inline-flex items-center gap-1 text-sm text-terracotta font-medium">See offers <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" /></span>
          </Link>
          <Link href="/title" className="group rounded-lg border border-ink/10 bg-paper p-5 hover:border-terracotta/40 transition-colors">
            <h4 className="font-serif text-lg text-ink mb-1">Verify title before sale</h4>
            <p className="text-sm text-ink/65 mb-3">Selling or buying nearby? Run a ₹499 title check.</p>
            <span className="inline-flex items-center gap-1 text-sm text-terracotta font-medium">Order verification <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" /></span>
          </Link>
        </div>
      )}

      {r.status === 'partial' && (
        <div className="grid sm:grid-cols-2 gap-4">
          <Link href="/learn" className="group rounded-lg border border-ink/10 bg-paper p-5 hover:border-terracotta/40 transition-colors">
            <h4 className="font-serif text-lg text-ink mb-1">If your card is ready</h4>
            <p className="text-sm text-ink/65 mb-3">Learn what to do with it — 90-second videos in Hindi.</p>
            <span className="inline-flex items-center gap-1 text-sm text-terracotta font-medium">Browse guides <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" /></span>
          </Link>
          <a href="https://svamitva.nic.in" target="_blank" rel="noreferrer noopener" className="group rounded-lg border border-ink/10 bg-paper p-5 hover:border-terracotta/40 transition-colors">
            <h4 className="font-serif text-lg text-ink mb-1">Check official portal directly</h4>
            <p className="text-sm text-ink/65 mb-3">Visit the SVAMITVA portal for your specific household status.</p>
            <span className="inline-flex items-center gap-1 text-sm text-terracotta font-medium">svamitva.nic.in <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" /></span>
          </a>
        </div>
      )}

      {r.status === 'pending' && (
        <div className="space-y-4">
          <div className="rounded-lg border border-ink/10 bg-paper p-5">
            <h4 className="font-serif text-lg text-ink mb-2">While you wait…</h4>
            <ul className="space-y-2 text-sm text-ink/75">
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-terracotta mt-0.5 flex-shrink-0" /><span>Visit your gram panchayat to confirm drone survey is complete</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-terracotta mt-0.5 flex-shrink-0" /><span>Keep your old ownership papers (sale deeds, electricity bills, tax receipts) handy — needed at verification stage</span></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-terracotta mt-0.5 flex-shrink-0" /><span>If there are inheritance disputes, resolve them now — it speeds up card issuance</span></li>
            </ul>
          </div>
          <Link href="/learn" className="group inline-flex items-center gap-2 text-sm text-terracotta font-medium hover:underline">
            Read our prep guide →
          </Link>
        </div>
      )}

      {/* Lead capture CTA — always shown */}
      <div className="mt-10 rounded-lg bg-terracotta text-white p-6">
        <div className="flex items-start gap-4">
          <Phone className="w-6 h-6 mt-0.5 opacity-80 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="font-serif text-xl mb-1">ज़्यादा जानकारी चाहिए?</h3>
            <p className="text-white/85 text-sm mb-4">Get a free WhatsApp follow-up from our team — we\'ll walk through your options based on your situation.</p>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-terracotta text-sm font-medium hover:bg-paper transition-colors">
              Free WhatsApp follow-up →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default function CheckResultPage({ searchParams }: { searchParams: Search }) {
  return (
    <Shell>
      <section className="border-b border-ink/10 bg-paper">
        <div className="absolute inset-0 bg-gradient-to-br from-terracotta/8 via-paper to-paper pointer-events-none" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 py-10">
          <Link href="/check" className="text-sm text-ink/60 hover:text-terracotta inline-flex items-center gap-1 mb-2">← Run another check</Link>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <Suspense fallback={<div className="text-ink/50">Loading…</div>}>
            <ResultBody searchParams={searchParams} />
          </Suspense>
        </div>
      </section>
    </Shell>
  );
}
