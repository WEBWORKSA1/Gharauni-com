'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle2, ChevronRight, Filter, MapPin } from 'lucide-react';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { STATES } from '@/lib/mock-data';
import { getListings } from '@/lib/api';
import { ROUTES } from '@/lib/constants';
import type { Listing } from '@/lib/types';

export default function MarketPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [stateFilter, setStateFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000000]);

  useEffect(() => {
    getListings().then(data => {
      setListings(data);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(() => {
    return listings.filter(l => {
      if (stateFilter && l.state !== stateFilter) return false;
      if (typeFilter && l.type !== typeFilter) return false;
      if (l.priceNum < priceRange[0] || l.priceNum > priceRange[1]) return false;
      return true;
    });
  }, [listings, stateFilter, typeFilter, priceRange]);

  return (
    <>
      <Nav />
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mono text-xs text-terracotta-600 tracking-widest mb-3">SERVICE · MARKETPLACE</div>
          <h1 className="display text-4xl sm:text-5xl m-0 mb-3 leading-tight">ग्रामीण संपत्ति बाज़ार</h1>
          <p className="text-lg text-ink-700 mb-10 leading-relaxed max-w-2xl">
            हर संपत्ति में वेरिफाइड 13-अंक की घरौनी ID। कोई फ़र्ज़ी शीर्षक नहीं, कोई विवाद छिपा हुआ नहीं।
          </p>

          <div className="grid lg:grid-cols-[280px_1fr] gap-8">
            {/* FILTERS */}
            <aside className="bg-ivory-50 p-6 border-[1.5px] border-ivory-200 h-fit lg:sticky lg:top-24">
              <div className="flex items-center gap-2 mb-5">
                <Filter size={16} className="text-terracotta-600" />
                <span className="mono text-xs tracking-wider text-terracotta-600">FILTERS</span>
              </div>
              <div className="space-y-5">
                <div>
                  <label className="mono text-[11px] text-ink-500 tracking-wider block mb-1.5">राज्य</label>
                  <select value={stateFilter} onChange={e => setStateFilter(e.target.value)} className="input-base">
                    <option value="">सभी राज्य</option>
                    {STATES.map(s => <option key={s.code} value={s.name}>{s.nameHi}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mono text-[11px] text-ink-500 tracking-wider block mb-1.5">प्रकार</label>
                  <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="input-base">
                    <option value="">सभी</option>
                    <option value="Residential">Residential</option>
                    <option value="Residential + Plot">Residential + Plot</option>
                    <option value="Residential + Shop">Residential + Shop</option>
                    <option value="Commercial">Commercial</option>
                  </select>
                </div>
                <div>
                  <label className="mono text-[11px] text-ink-500 tracking-wider block mb-1.5">
                    अधिकतम कीमत: ₹{(priceRange[1] / 100000).toFixed(1)}L
                  </label>
                  <input
                    type="range"
                    min={100000}
                    max={5000000}
                    step={100000}
                    value={priceRange[1]}
                    onChange={e => setPriceRange([0, +e.target.value])}
                    className="w-full accent-terracotta-600"
                  />
                </div>
                <button
                  onClick={() => { setStateFilter(''); setTypeFilter(''); setPriceRange([0, 5000000]); }}
                  className="text-sm text-terracotta-600 hover:underline"
                >
                  सभी फ़िल्टर हटाएँ
                </button>
              </div>
            </aside>

            {/* LISTINGS */}
            <div>
              <div className="mb-5 text-sm text-ink-500">
                {loading ? 'लोड हो रहा है...' : `${filtered.length} listings · all verified`}
              </div>
              {!loading && filtered.length === 0 && (
                <div className="bg-ivory-100 p-12 text-center text-ink-700">
                  कोई listing नहीं मिली। फ़िल्टर बदलें।
                </div>
              )}
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((l, i) => (
                  <Link
                    key={l.id}
                    href={`${ROUTES.market}/${l.id}`}
                    className="hover-lift bg-ivory-50 border-[1.5px] border-ivory-200 overflow-hidden block"
                  >
                    <div
                      className="h-44 relative flex items-end p-4"
                      style={{ background: `linear-gradient(135deg, #C2410C ${i * 12}%, #7C2D12 100%)` }}
                    >
                      {l.verified && (
                        <div className="absolute top-3 right-3 bg-ivory-50 text-accent-green px-2.5 py-1 text-[11px] font-semibold flex items-center gap-1">
                          <CheckCircle2 size={12} /> VERIFIED
                        </div>
                      )}
                      <div className="mono text-[13px] text-ivory-100">{l.id}</div>
                    </div>
                    <div className="p-5">
                      <div className="display text-xl mb-1">{l.village}</div>
                      <div className="text-[12px] text-ink-500 mb-3 flex items-center gap-1">
                        <MapPin size={11} /> {l.state}
                      </div>
                      <div className="text-[13px] text-ink-700 mb-4">{l.type} · {l.area}</div>
                      <div className="flex justify-between items-center">
                        <div className="display text-2xl text-terracotta-600">{l.price}</div>
                        <ChevronRight size={18} className="text-terracotta-600" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
