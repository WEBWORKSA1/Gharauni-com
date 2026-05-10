'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Star, ArrowRight, Filter } from 'lucide-react';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { LENDERS } from '@/lib/mock-data';
import { calculateEMI, calculateTotalInterest, formatINR } from '@/lib/utils';
import { ROUTES } from '@/lib/constants';

type SortKey = 'rate' | 'amount' | 'rating';

export default function LoanPage() {
  const [amount, setAmount] = useState(500000);
  const [tenure, setTenure] = useState(10);
  const [sortBy, setSortBy] = useState<SortKey>('rate');

  const sorted = useMemo(() => {
    const arr = [...LENDERS];
    if (sortBy === 'rate') arr.sort((a, b) => a.rateNum - b.rateNum);
    if (sortBy === 'amount') arr.sort((a, b) => b.maxAmtNum - a.maxAmtNum);
    if (sortBy === 'rating') arr.sort((a, b) => b.rating - a.rating);
    return arr;
  }, [sortBy]);

  const bestRate = Math.min(...LENDERS.map(l => l.rateNum));
  const bestEMI = calculateEMI(amount, bestRate, tenure);
  const bestInterest = calculateTotalInterest(bestEMI, tenure, amount);

  return (
    <>
      <Nav />
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mono text-xs text-terracotta-600 tracking-widest mb-3">SERVICE · LOAN COMPARISON</div>
          <h1 className="display text-4xl sm:text-5xl m-0 mb-3 leading-tight">घरौनी पर लोन — 11 लेंडरों की तुलना</h1>
          <p className="text-lg text-ink-700 mb-10 leading-relaxed max-w-2xl">
            9.5% से शुरू। 60 सेकंड में मंज़ूरी। अधिकतम ₹75 लाख तक संपत्ति बंधक।
          </p>

          {/* EMI CALCULATOR */}
          <div className="bg-ink-900 text-ivory-50 p-8 mb-8">
            <div className="grid lg:grid-cols-3 gap-8">
              <div>
                <label className="mono text-[11px] text-ink-400 tracking-wider">LOAN AMOUNT</label>
                <div className="display text-4xl mt-1">{formatINR(amount, true)}</div>
                <input
                  type="range"
                  min={100000}
                  max={7500000}
                  step={50000}
                  value={amount}
                  onChange={e => setAmount(+e.target.value)}
                  className="w-full mt-3 accent-terracotta-500"
                />
                <div className="flex justify-between mono text-[10px] text-ink-400 mt-1">
                  <span>₹1L</span><span>₹75L</span>
                </div>
              </div>
              <div>
                <label className="mono text-[11px] text-ink-400 tracking-wider">TENURE</label>
                <div className="display text-4xl mt-1">{tenure} years</div>
                <input
                  type="range"
                  min={1}
                  max={25}
                  step={1}
                  value={tenure}
                  onChange={e => setTenure(+e.target.value)}
                  className="w-full mt-3 accent-terracotta-500"
                />
                <div className="flex justify-between mono text-[10px] text-ink-400 mt-1">
                  <span>1y</span><span>25y</span>
                </div>
              </div>
              <div className="lg:border-l border-ink-800 lg:pl-8">
                <label className="mono text-[11px] text-ink-400 tracking-wider">BEST EMI @ {bestRate}%</label>
                <div className="display text-4xl mt-1 text-amber-300">{formatINR(bestEMI)}</div>
                <div className="text-sm text-ink-400 mt-2">
                  Total interest: {formatINR(bestInterest, true)}
                </div>
                <div className="text-xs text-ink-500 mt-1">
                  Total payable: {formatINR(bestEMI * tenure * 12, true)}
                </div>
              </div>
            </div>
          </div>

          {/* SORT BAR */}
          <div className="flex gap-2 mb-6 flex-wrap items-center">
            <span className="mono text-xs text-ink-500 tracking-wider flex items-center gap-1.5">
              <Filter size={14} /> SORT BY:
            </span>
            {[
              { k: 'rate' as const, l: 'Lowest Rate' },
              { k: 'amount' as const, l: 'Highest Amount' },
              { k: 'rating' as const, l: 'Top Rated' }
            ].map(s => (
              <button
                key={s.k}
                onClick={() => setSortBy(s.k)}
                className={`px-4 py-1.5 text-[13px] font-semibold border transition ${
                  sortBy === s.k
                    ? 'bg-terracotta-600 text-ivory-50 border-terracotta-600'
                    : 'bg-transparent text-terracotta-600 border-terracotta-600 hover:bg-terracotta-600/10'
                }`}
                style={{ borderRadius: 2 }}
              >
                {s.l}
              </button>
            ))}
          </div>

          {/* LENDER CARDS */}
          <div className="grid gap-4">
            {sorted.map(l => {
              const lEMI = calculateEMI(Math.min(amount, l.maxAmtNum), l.rateNum, tenure);
              return (
                <div
                  key={l.id}
                  className="hover-lift bg-ivory-50 border-[1.5px] border-ivory-200 p-6 grid grid-cols-[auto_1fr_auto_auto] gap-6 items-center"
                  style={{ gridTemplateColumns: 'auto 1.5fr 1fr auto' }}
                >
                  <div
                    className="w-16 h-16 flex items-center justify-center mono text-lg font-bold text-ivory-50"
                    style={{ background: l.color }}
                  >
                    {l.logo}
                  </div>
                  <div>
                    <div className="flex gap-2.5 items-center mb-1.5 flex-wrap">
                      <div className="display text-2xl">{l.name}</div>
                      {l.badge && (
                        <span className="bg-amber-300 text-ink-900 px-2.5 py-0.5 text-[11px] font-semibold tracking-wider mono uppercase">
                          {l.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-1.5 items-center text-[13px] text-ink-700 flex-wrap">
                      <Star size={14} fill="#FBBF24" className="text-amber-300" />
                      <span>{l.rating}</span>
                      <span>· Processing {l.processing}</span>
                      <span>· Up to {l.tenure}</span>
                    </div>
                    <div className="text-[13px] text-terracotta-600 mt-2 mono">
                      EMI @ this lender: {formatINR(lEMI)}/mo
                    </div>
                  </div>
                  <div className="hidden md:grid grid-cols-2 gap-4">
                    <div>
                      <div className="mono text-[10px] text-ink-500">RATE</div>
                      <div className="display text-2xl text-terracotta-600">{l.rate}</div>
                    </div>
                    <div>
                      <div className="mono text-[10px] text-ink-500">MAX</div>
                      <div className="display text-2xl">{l.maxAmt}</div>
                    </div>
                  </div>
                  <Link
                    href={`${ROUTES.loan}/apply/${l.id}`}
                    className="btn-primary inline-flex items-center gap-1.5 whitespace-nowrap"
                  >
                    आवेदन <ArrowRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="mt-10 p-5 bg-ivory-100 border border-dashed border-terracotta-500 text-sm text-ink-700 leading-relaxed">
            <strong className="text-terracotta-600">Disclosure:</strong> Gharauni.com is an aggregator. Rates shown are indicative and subject to lender verification. Final rate depends on credit score, property valuation, and lender policy. We earn affiliate commission — you pay nothing.
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
