'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Home, MapPin, IndianRupee, Maximize2, Shield, Filter, Plus, Eye, Phone, Search } from 'lucide-react';
import { Shell } from '@/components/shell';

// Mock listings until real ones come in. All marked "verified by Gharauni"
// since that's our moat — Magicbricks has volume, we have title-verified rural inventory.
type Listing = {
  id: string;
  title: string;
  titleHi: string;
  village: string;
  district: string;
  state: string;
  price: number;
  priceLabel: string;
  areaSqYd: number;
  bedrooms: number;
  type: 'house' | 'plot' | 'agricultural';
  verified: boolean;
  cardId: string;
  views: number;
  postedDays: number;
};

const MOCK_LISTINGS: Listing[] = [
  {
    id: 'gh-mr-001',
    title: '3-bed pucca house with courtyard',
    titleHi: '3 कमरे का पक्का घर साथ आंगन',
    village: 'Sikandrabad',
    district: 'Bulandshahr',
    state: 'Uttar Pradesh',
    price: 1850000,
    priceLabel: '₹18.5 L',
    areaSqYd: 220,
    bedrooms: 3,
    type: 'house',
    verified: true,
    cardId: '091434-78921-04',
    views: 142,
    postedDays: 4,
  },
  {
    id: 'gh-mr-002',
    title: 'Residential plot near main road',
    titleHi: 'मुख्य सड़क के पास आवासीय ज़मीन',
    village: 'Mawana',
    district: 'Meerut',
    state: 'Uttar Pradesh',
    price: 950000,
    priceLabel: '₹9.5 L',
    areaSqYd: 180,
    bedrooms: 0,
    type: 'plot',
    verified: true,
    cardId: '090909-12483-02',
    views: 89,
    postedDays: 7,
  },
  {
    id: 'gh-mr-003',
    title: '2-bed brick house with tubewell',
    titleHi: '2 कमरों का ईंट का घर, ट्यूबवेल साथ',
    village: 'Phulpur',
    district: 'Prayagraj',
    state: 'Uttar Pradesh',
    price: 1350000,
    priceLabel: '₹13.5 L',
    areaSqYd: 175,
    bedrooms: 2,
    type: 'house',
    verified: true,
    cardId: '096565-45112-08',
    views: 67,
    postedDays: 2,
  },
  {
    id: 'gh-mr-004',
    title: 'Agricultural plot, 1 bigha',
    titleHi: 'कृषि भूमि, 1 बीघा',
    village: 'Gauriganj',
    district: 'Amethi',
    state: 'Uttar Pradesh',
    price: 750000,
    priceLabel: '₹7.5 L',
    areaSqYd: 605,
    bedrooms: 0,
    type: 'agricultural',
    verified: true,
    cardId: '094343-92107-15',
    views: 121,
    postedDays: 11,
  },
  {
    id: 'gh-mr-005',
    title: 'Family home, 4 bedrooms',
    titleHi: '4 बेडरूम का पारिवारिक घर',
    village: 'Sardhana',
    district: 'Meerut',
    state: 'Uttar Pradesh',
    price: 2750000,
    priceLabel: '₹27.5 L',
    areaSqYd: 340,
    bedrooms: 4,
    type: 'house',
    verified: true,
    cardId: '090909-67845-11',
    views: 203,
    postedDays: 1,
  },
  {
    id: 'gh-mr-006',
    title: 'Corner plot, ready for construction',
    titleHi: 'कोने का प्लॉट, निर्माण के लिए तैयार',
    village: 'Kairana',
    district: 'Shamli',
    state: 'Uttar Pradesh',
    price: 680000,
    priceLabel: '₹6.8 L',
    areaSqYd: 200,
    bedrooms: 0,
    type: 'plot',
    verified: true,
    cardId: '090202-18934-01',
    views: 54,
    postedDays: 9,
  },
];

type TypeFilter = 'all' | 'house' | 'plot' | 'agricultural';

export default function MarketPage() {
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [districtQuery, setDistrictQuery] = useState('');
  const [maxBudget, setMaxBudget] = useState(5000000);

  const filtered = useMemo(() => {
    return MOCK_LISTINGS.filter((l) => {
      if (typeFilter !== 'all' && l.type !== typeFilter) return false;
      if (districtQuery && !l.district.toLowerCase().includes(districtQuery.toLowerCase())) return false;
      if (l.price > maxBudget) return false;
      return true;
    });
  }, [typeFilter, districtQuery, maxBudget]);

  const inrFmt = (n: number) => `₹${n.toLocaleString('en-IN')}`;

  return (
    <Shell>
      {/* Hero */}
      <section className="border-b border-ink/10 bg-paper">
        <div className="absolute inset-0 bg-gradient-to-br from-terracotta/8 via-paper to-paper pointer-events-none" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 py-14">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-green-700/30 bg-green-50 px-3 py-1 text-xs font-medium text-green-800 mb-4">
                <Shield className="w-3.5 h-3.5" />
                <span>Every listing verified by Gharauni · Title-clean only</span>
              </div>
              <h1 className="font-serif text-4xl lg:text-5xl text-ink leading-tight">
                गाँव की संपत्ति · <span className="text-terracotta">सुरक्षित खरीदारी।</span>
              </h1>
              <p className="mt-2 font-serif text-lg text-ink/70 italic">Village property. Safe transactions.</p>
              <p className="mt-4 text-ink/75">
                केवल SVAMITVA-वेरिफाइड प्रॉपर्टी। हर लिस्टिंग पर यूनिक घरौनी आईडी। कोई चोरी का कागज नहीं, कोई विवाद नहीं।
              </p>
            </div>
            <Link href="/market/list" className="inline-flex items-center justify-center gap-2 rounded-md bg-terracotta px-5 py-3.5 text-white font-medium hover:bg-terracotta-dark transition-colors flex-shrink-0">
              <Plus className="w-4 h-4" /> List your property
            </Link>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-ink/10 bg-ink/[0.015] sticky top-0 z-10 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Filter className="w-4 h-4 text-ink/50" />
              <span className="text-xs uppercase tracking-wider text-ink/50">Type</span>
            </div>
            <div className="flex gap-2 flex-wrap">
              {(['all', 'house', 'plot', 'agricultural'] as TypeFilter[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`px-3 py-1.5 rounded-md text-sm capitalize transition-colors ${typeFilter === t ? 'bg-ink text-paper' : 'bg-paper border border-ink/15 text-ink/70 hover:border-ink/30'}`}
                >
                  {t === 'all' ? 'All listings' : t}
                </button>
              ))}
            </div>

            <div className="hidden lg:block w-px h-6 bg-ink/15" />

            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ink/40" />
              <input
                type="text"
                value={districtQuery}
                onChange={(e) => setDistrictQuery(e.target.value)}
                placeholder="Filter by district…"
                className="w-full pl-9 pr-3 py-1.5 rounded-md border border-ink/15 bg-paper text-sm text-ink placeholder:text-ink/35 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider text-ink/50">Max</span>
              <select
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="rounded-md border border-ink/15 bg-paper px-2.5 py-1.5 text-sm text-ink focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 outline-none"
              >
                <option value={500000}>₹5 L</option>
                <option value={1000000}>₹10 L</option>
                <option value={2000000}>₹20 L</option>
                <option value={5000000}>₹50 L</option>
                <option value={100000000}>No limit</option>
              </select>
            </div>

            <div className="ml-auto text-sm text-ink/60">
              <span className="font-medium text-ink">{filtered.length}</span> listing{filtered.length === 1 ? '' : 's'}
            </div>
          </div>
        </div>
      </section>

      {/* Listings grid */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-10">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <Home className="w-12 h-12 mx-auto text-ink/20 mb-4" />
              <h3 className="font-serif text-xl text-ink">No listings match your filters</h3>
              <p className="text-ink/60 mt-1">Try widening your budget or removing the district filter.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((l) => (
                <article key={l.id} className="group rounded-lg border border-ink/10 bg-paper overflow-hidden hover:border-terracotta/40 transition-colors">
                  {/* Image placeholder — terracotta-tinted with property type icon */}
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-terracotta/15 to-terracotta/5 flex items-center justify-center overflow-hidden">
                    <Home className="w-12 h-12 text-terracotta/30" strokeWidth={1.5} />
                    {l.verified && (
                      <div className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/95 backdrop-blur px-2.5 py-1 text-[10px] font-medium text-green-800 shadow-sm">
                        <Shield className="w-2.5 h-2.5" /> Verified by Gharauni
                      </div>
                    )}
                    <div className="absolute top-3 right-3 text-[10px] font-medium text-ink/60 bg-white/90 backdrop-blur px-2 py-1 rounded-md">
                      ID: {l.cardId}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <h3 className="font-serif text-lg text-ink leading-snug line-clamp-2">{l.title}</h3>
                    </div>
                    <p className="text-xs text-ink/55 italic line-clamp-1">{l.titleHi}</p>

                    <div className="mt-3 flex items-baseline gap-2">
                      <div className="font-serif text-2xl text-terracotta">{l.priceLabel}</div>
                      <div className="text-xs text-ink/50">({inrFmt(l.price)})</div>
                    </div>

                    <div className="mt-3 flex items-center gap-4 text-xs text-ink/60">
                      <span className="inline-flex items-center gap-1"><Maximize2 className="w-3 h-3" /> {l.areaSqYd} sq yd</span>
                      {l.bedrooms > 0 && <span>• {l.bedrooms} bed</span>}
                      <span className="capitalize">• {l.type}</span>
                    </div>

                    <div className="mt-4 pt-4 border-t border-ink/10 flex items-center justify-between text-xs">
                      <span className="inline-flex items-center gap-1 text-ink/60">
                        <MapPin className="w-3 h-3" /> {l.village}, {l.district}
                      </span>
                      <span className="inline-flex items-center gap-1 text-ink/40">
                        <Eye className="w-3 h-3" /> {l.views}
                      </span>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <Link
                        href={`/market/${l.id}`}
                        className="inline-flex items-center justify-center gap-1 rounded-md border border-ink/15 bg-paper px-3 py-2 text-sm font-medium text-ink hover:bg-ink/5 transition-colors"
                      >
                        View details
                      </Link>
                      <Link
                        href={`/market/${l.id}/contact`}
                        className="inline-flex items-center justify-center gap-1 rounded-md bg-terracotta px-3 py-2 text-sm font-medium text-white hover:bg-terracotta-dark transition-colors"
                      >
                        <Phone className="w-3 h-3" /> Contact
                      </Link>
                    </div>

                    <div className="mt-2 text-[10px] text-ink/40 text-center">
                      Posted {l.postedDays} day{l.postedDays === 1 ? '' : 's'} ago
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why verified matters — our moat narrative */}
      <section className="border-t border-ink/10 bg-ink/[0.015]">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="text-[11px] uppercase tracking-widest text-terracotta/80 font-medium mb-2">Why "Verified by Gharauni" matters</div>
            <h2 className="font-serif text-3xl text-ink">ज़मीन के धोखे से बचना।</h2>
            <p className="text-ink/60 mt-2">Don't get cheated on land deals.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-lg bg-paper border border-ink/10 p-6">
              <div className="text-xs text-ink/50 mb-1">Problem</div>
              <h3 className="font-serif text-lg text-ink">Fake or contested papers</h3>
              <p className="text-sm text-ink/65 mt-2 leading-relaxed">Rural property fraud is rampant. Multiple sellers claim the same plot. Old patwari records get forged.</p>
            </div>
            <div className="rounded-lg bg-paper border border-ink/10 p-6">
              <div className="text-xs text-ink/50 mb-1">Our solution</div>
              <h3 className="font-serif text-lg text-ink">SVAMITVA-only inventory</h3>
              <p className="text-sm text-ink/65 mt-2 leading-relaxed">Every listing has a verified 13-digit Gharauni ID. We confirm with the public SVAMITVA portal before publishing.</p>
            </div>
            <div className="rounded-lg bg-paper border border-ink/10 p-6">
              <div className="text-xs text-ink/50 mb-1">Your benefit</div>
              <h3 className="font-serif text-lg text-ink">Bank-loanable property</h3>
              <p className="text-sm text-ink/65 mt-2 leading-relaxed">Verified titles are mortgageable. Banks lend up to 60% of value against Gharauni-backed property within 48 hours.</p>
            </div>
          </div>
        </div>
      </section>
    </Shell>
  );
}
