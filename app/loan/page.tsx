'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Calculator, Filter, IndianRupee, Clock, Percent, Award } from 'lucide-react';
import { Shell } from '@/components/shell';
import { LENDERS } from '@/lib/mock-data';

type SortKey = 'rate' | 'processing' | 'amount';

export default function LoanPage() {
  const [amount, setAmount] = useState(500000);    // ₹5L default
  const [tenure, setTenure] = useState(60);         // 60 months default
  const [sortBy, setSortBy] = useState<SortKey>('rate');

  // EMI = P × r × (1+r)^n / ((1+r)^n - 1) where r is monthly rate
  const calcEMI = (rate: number, principal: number, months: number) => {
    const r = rate / 12 / 100;
    const n = months;
    const emi = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  };

  const sortedLenders = useMemo(() => {
    const enriched = LENDERS.map((l) => ({
      ...l,
      emi: calcEMI(l.rate, amount, tenure),
      totalPayable: calcEMI(l.rate, amount, tenure) * tenure,
      interestPayable: calcEMI(l.rate, amount, tenure) * tenure - amount,
    }));
    return enriched.sort((a, b) => {
      if (sortBy === 'rate') return a.rate - b.rate;
      if (sortBy === 'processing') return a.processingFee - b.processingFee;
      return b.maxAmount - a.maxAmount;
    });
  }, [amount, tenure, sortBy]);

  const cheapest = sortedLenders[0];
  const inrFmt = (n: number) => `₹${n.toLocaleString('en-IN')}`;

  return (
    <Shell>
      {/* Hero */}
      <section className="border-b border-ink/10 bg-paper">
        <div className="absolute inset-0 bg-gradient-to-br from-terracotta/8 via-paper to-paper pointer-events-none" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 py-14 lg:py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-terracotta/30 bg-terracotta/5 px-3 py-1 text-xs font-medium text-terracotta mb-5">
              <Award className="w-3.5 h-3.5" />
              <span>11 RBI-registered lenders · Compare in 30 seconds</span>
            </div>
            <h1 className="font-serif text-4xl lg:text-5xl text-ink leading-tight">
              घरौनी पर लोन। <span className="text-terracotta">सबसे कम ब्याज।</span>
            </h1>
            <p className="mt-2 font-serif text-lg text-ink/70 italic">Loan against your Gharauni. Lowest rate available.</p>
            <p className="mt-4 text-ink/75 max-w-2xl">
              अपनी SVAMITVA संपत्ति कार्ड के खिलाफ ₹2 लाख से ₹50 लाख तक का लोन लें। चुनें वह बैंक जो आपके लिए सबसे सस्ता है। कोई शुल्क नहीं, कोई OTP नहीं।
            </p>
          </div>
        </div>
      </section>

      {/* EMI Calculator */}
      <section className="border-b border-ink/10 bg-ink/[0.015]">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-14">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Calculator className="w-4 h-4 text-terracotta" />
                <span className="text-[11px] uppercase tracking-widest text-terracotta/80 font-medium">EMI Calculator</span>
              </div>
              <h2 className="font-serif text-2xl lg:text-3xl text-ink">कितनी EMI होगी? Calculate your monthly payment.</h2>
              <p className="mt-2 text-sm text-ink/60">Move the sliders. Rates update in real time below.</p>

              {/* Amount slider */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-ink">राशि · Loan Amount</label>
                  <span className="font-serif text-lg text-terracotta">{inrFmt(amount)}</span>
                </div>
                <input
                  type="range"
                  min={200000}
                  max={5000000}
                  step={50000}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full accent-terracotta"
                  aria-label="Loan amount"
                />
                <div className="flex justify-between text-xs text-ink/50 mt-1">
                  <span>₹2 L</span><span>₹50 L</span>
                </div>
              </div>

              {/* Tenure slider */}
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-ink">अवधि · Tenure</label>
                  <span className="font-serif text-lg text-terracotta">{tenure} months · {(tenure / 12).toFixed(1)} years</span>
                </div>
                <input
                  type="range"
                  min={12}
                  max={240}
                  step={6}
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full accent-terracotta"
                  aria-label="Tenure in months"
                />
                <div className="flex justify-between text-xs text-ink/50 mt-1">
                  <span>1 year</span><span>20 years</span>
                </div>
              </div>
            </div>

            {/* Best offer card */}
            <div className="relative">
              <div className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-green-700 text-white px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider">
                <CheckCircle className="w-3 h-3" /> Best Offer
              </div>
              <div className="rounded-lg border-2 border-terracotta bg-paper p-6">
                <div className="text-xs text-ink/50 mb-1">Lowest EMI from</div>
                <div className="font-serif text-xl text-ink mb-1">{cheapest.name}</div>
                <div className="text-xs text-ink/60 mb-5">{cheapest.rate}% interest · {cheapest.tenure}</div>

                <div className="grid grid-cols-3 gap-3 mb-5 text-center">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-ink/50 mb-1">Monthly EMI</div>
                    <div className="font-serif text-xl text-terracotta">{inrFmt(cheapest.emi)}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-ink/50 mb-1">Total Interest</div>
                    <div className="font-serif text-xl text-ink">{inrFmt(cheapest.interestPayable)}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-ink/50 mb-1">Total Payable</div>
                    <div className="font-serif text-xl text-ink">{inrFmt(cheapest.totalPayable)}</div>
                  </div>
                </div>

                <Link
                  href={`/loan/apply/${cheapest.slug}?amount=${amount}&tenure=${tenure}`}
                  className="flex items-center justify-center gap-2 w-full rounded-md bg-terracotta px-5 py-3 text-white font-medium hover:bg-terracotta-dark transition-colors"
                >
                  Apply to {cheapest.name} <ArrowRight className="w-4 h-4" />
                </Link>
                <p className="mt-3 text-[11px] text-ink/50 text-center">
                  Free check · No commitment · Approval typically in 48–72 hours after lender review
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lender list */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="font-serif text-2xl lg:text-3xl text-ink">All 11 lenders · Compare side by side</h2>
              <p className="text-sm text-ink/60 mt-1">Rates shown for {inrFmt(amount)} over {tenure} months.</p>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-ink/50" />
              <span className="text-xs uppercase tracking-wider text-ink/50 mr-1">Sort by</span>
              <button
                onClick={() => setSortBy('rate')}
                className={`px-3 py-1.5 rounded-md text-sm transition-colors ${sortBy === 'rate' ? 'bg-ink text-paper' : 'bg-ink/5 text-ink/70 hover:bg-ink/10'}`}
              >
                Lowest rate
              </button>
              <button
                onClick={() => setSortBy('processing')}
                className={`px-3 py-1.5 rounded-md text-sm transition-colors ${sortBy === 'processing' ? 'bg-ink text-paper' : 'bg-ink/5 text-ink/70 hover:bg-ink/10'}`}
              >
                Lowest fees
              </button>
              <button
                onClick={() => setSortBy('amount')}
                className={`px-3 py-1.5 rounded-md text-sm transition-colors ${sortBy === 'amount' ? 'bg-ink text-paper' : 'bg-ink/5 text-ink/70 hover:bg-ink/10'}`}
              >
                Highest limit
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {sortedLenders.map((lender, idx) => (
              <div
                key={lender.slug}
                className={`grid grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 lg:gap-6 items-center rounded-lg border bg-paper p-5 transition-colors ${idx === 0 ? 'border-terracotta/40 bg-terracotta/[0.02]' : 'border-ink/10 hover:border-ink/20'}`}
              >
                <div className="col-span-2 lg:col-span-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-serif text-lg text-ink">{lender.name}</h3>
                    {idx === 0 && (
                      <span className="inline-flex items-center gap-0.5 rounded-full bg-green-700 text-white px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider">
                        <CheckCircle className="w-2.5 h-2.5" /> Cheapest
                      </span>
                    )}
                    {lender.bestFor && (
                      <span className="text-xs text-ink/60">Best for: {lender.bestFor}</span>
                    )}
                  </div>
                  <div className="text-xs text-ink/50 mt-1">{lender.type} · {lender.tenure}</div>
                </div>

                <div className="flex flex-col">
                  <div className="text-[10px] uppercase tracking-wider text-ink/50 mb-0.5 flex items-center gap-1"><Percent className="w-2.5 h-2.5" /> Rate</div>
                  <div className="font-serif text-lg text-ink">{lender.rate}%</div>
                </div>

                <div className="flex flex-col">
                  <div className="text-[10px] uppercase tracking-wider text-ink/50 mb-0.5 flex items-center gap-1"><IndianRupee className="w-2.5 h-2.5" /> Monthly EMI</div>
                  <div className="font-serif text-lg text-terracotta">{inrFmt(lender.emi)}</div>
                </div>

                <div className="flex flex-col">
                  <div className="text-[10px] uppercase tracking-wider text-ink/50 mb-0.5 flex items-center gap-1"><Clock className="w-2.5 h-2.5" /> Processing</div>
                  <div className="text-sm text-ink">{lender.processingFee}% fee</div>
                </div>

                <Link
                  href={`/loan/apply/${lender.slug}?amount=${amount}&tenure=${tenure}`}
                  className="inline-flex items-center justify-center gap-1.5 rounded-md bg-ink text-paper px-4 py-2.5 text-sm font-medium hover:bg-terracotta transition-colors col-span-2 lg:col-span-1"
                >
                  Apply <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs text-ink/50">
            Disclaimer: Rates indicative, sourced from each lender&apos;s published Gharauni/SVAMITVA loan product pages where available. Final rate depends on credit score, property valuation, and tenure. Approval and disbursal are decided by the lender. Last updated May 2026.
          </p>
        </div>
      </section>

      {/* Trust + FAQ pointer */}
      <section className="border-t border-ink/10 bg-ink/[0.015]">
        <div className="mx-auto max-w-5xl px-6 py-12 text-center">
          <h2 className="font-serif text-2xl text-ink mb-3">अभी ज़्यादा सोच रहे हैं?</h2>
          <p className="text-ink/70 mb-6 max-w-xl mx-auto">Not sure if your Gharauni qualifies? Check your card status first — takes 30 seconds, totally free.</p>
          <Link href="/check" className="inline-flex items-center gap-2 rounded-md border border-ink/20 bg-paper px-5 py-3 text-ink font-medium hover:bg-ink/5 transition-colors">
            Check My Gharauni Status →
          </Link>
        </div>
      </section>
    </Shell>
  );
}
