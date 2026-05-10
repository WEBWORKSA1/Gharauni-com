// ───────────────────────────────────────────────────
// SEO LONG-TAIL: /[state] dynamic pages
// Generates SSG pages for each state: /uttar-pradesh, /madhya-pradesh, etc.
// These pages target "Gharauni <state>" search queries.
// ───────────────────────────────────────────────────

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, ExternalLink, MapPin, Users } from 'lucide-react';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { STATES } from '@/lib/mock-data';
import { ROUTES } from '@/lib/constants';
import { slugify } from '@/lib/utils';

interface Props {
  params: { state: string };
}

// Sample districts per state (in production, this comes from DB)
const DISTRICTS: Record<string, string[]> = {
  up: ['Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Meerut', 'Allahabad', 'Bareilly', 'Aligarh', 'Moradabad', 'Saharanpur'],
  mp: ['Bhopal', 'Indore', 'Gwalior', 'Jabalpur', 'Ujjain', 'Sagar', 'Dewas', 'Satna', 'Ratlam', 'Rewa'],
  mh: ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Solapur', 'Kolhapur', 'Thane', 'Sangli', 'Amravati'],
  ka: ['Bangalore', 'Mysore', 'Hubli', 'Mangalore', 'Belgaum', 'Davangere', 'Bellary', 'Tumkur', 'Shimoga', 'Raichur'],
  hr: ['Faridabad', 'Gurugram', 'Panipat', 'Hisar', 'Rohtak', 'Karnal', 'Sonipat', 'Yamunanagar', 'Panchkula', 'Ambala'],
  pb: ['Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Mohali', 'Hoshiarpur', 'Pathankot', 'Moga', 'Firozpur'],
  uk: ['Dehradun', 'Haridwar', 'Roorkee', 'Haldwani', 'Rudrapur', 'Kashipur', 'Rishikesh', 'Pithoragarh', 'Almora', 'Nainital'],
  cg: ['Raipur', 'Bhilai', 'Bilaspur', 'Korba', 'Durg', 'Rajnandgaon', 'Jagdalpur', 'Raigarh', 'Ambikapur', 'Dhamtari'],
  rj: ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Bikaner', 'Ajmer', 'Bhilwara', 'Alwar', 'Sikar', 'Pali'],
  br: ['Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Darbhanga', 'Purnia', 'Arrah', 'Begusarai', 'Katihar', 'Munger']
};

function findState(slug: string) {
  return STATES.find(s => slugify(s.name) === slug || s.code === slug);
}

export async function generateStaticParams() {
  return STATES.map(s => ({ state: slugify(s.name) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const state = findState(params.state);
  if (!state) return { title: 'State not found' };
  return {
    title: `Gharauni in ${state.name} · घरौनी ${state.nameHi} — Status, Loan, Bhulekh`,
    description: `Check Gharauni / SVAMITVA card status, get loans, and browse property in ${state.name}. ${state.cardsIssued.toLocaleString('en-IN')}+ cards issued across ${state.villagesCovered.toLocaleString('en-IN')} villages.`,
    alternates: { canonical: `/${slugify(state.name)}` }
  };
}

export default function StatePage({ params }: Props) {
  const state = findState(params.state);
  if (!state) notFound();

  const districts = DISTRICTS[state.code] || [];
  const stateSlug = slugify(state.name);

  return (
    <>
      <Nav />
      <section className="py-20 px-6 bg-ivory-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-ink-500 mb-4">
            <Link href="/" className="hover:text-terracotta-600">Home</Link>
            <span>/</span>
            <span className="text-terracotta-600">{state.name}</span>
          </div>
          <div className="mono text-xs text-terracotta-600 tracking-widest mb-3">STATE · SVAMITVA</div>
          <h1 className="display text-4xl sm:text-5xl lg:text-6xl m-0 leading-tight mb-4">
            Gharauni in {state.name} • घरौनी {state.nameHi}
          </h1>
          <p className="text-lg text-ink-700 max-w-3xl leading-relaxed">
            {state.cardsIssued.toLocaleString('en-IN')}+ SVAMITVA property cards issued across {state.villagesCovered.toLocaleString('en-IN')} villages in {state.nameHi}. Check status, compare loans from 11 lenders, or list your verified property below.
          </p>
        </div>
      </section>

      {/* STAT STRIP */}
      <section className="bg-ink-900 text-ivory-50 py-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCell value={`${(state.cardsIssued / 100000).toFixed(1)}L+`} label="Cards Issued" />
          <StatCell value={`${(state.villagesCovered / 1000).toFixed(1)}K+`} label="Villages" />
          <StatCell value="11" label="Active Lenders" />
          <StatCell value="9.5%" label="Min Loan Rate" />
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="display text-3xl mb-8">{state.nameHi} में क्या करना चाहते हैं?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <ActionCard href={ROUTES.check} title="घरौनी स्थिति जाँचें" desc={`${state.name} में अपनी SVAMITVA card status देखें`} />
            <ActionCard href={ROUTES.loan} title="लोन लें" desc={`9.5% से शुरू। 11 lenders compare करें`} />
            <ActionCard href={ROUTES.market} title="संपत्ति देखें" desc={`${state.nameHi} में verified listings`} />
          </div>
        </div>
      </section>

      {/* DISTRICT GRID — the SEO long-tail */}
      <section className="bg-ivory-100 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <MapPin size={18} className="text-terracotta-600" />
            <span className="mono text-xs tracking-wider text-terracotta-600">BY DISTRICT</span>
          </div>
          <h2 className="display text-3xl mb-8">{state.name} के ज़िले</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {districts.map(d => (
              <Link
                key={d}
                href={`/${stateSlug}/${slugify(d)}`}
                className="hover-lift bg-ivory-50 border-[1.5px] border-ivory-200 p-4 text-center hover:border-terracotta-500 transition"
              >
                <div className="display text-lg">{d}</div>
                <div className="text-[11px] text-ink-500 mt-1 mono">View Gharauni →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BHULEKH LINK */}
      {state.bhulekhUrl && (
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto bg-ink-900 text-ivory-50 p-8 grid md:grid-cols-[1fr_auto] gap-4 items-center">
            <div>
              <div className="display text-xl mb-1">Official {state.name} Bhulekh Portal</div>
              <p className="text-ink-400 text-sm">For raw government records, visit the state’s official land records portal.</p>
            </div>
            <a
              href={state.bhulekhUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-300 text-ink-900 px-5 py-2.5 font-semibold inline-flex items-center gap-1.5 whitespace-nowrap"
            >
              Visit Bhulekh <ExternalLink size={14} />
            </a>
          </div>
        </section>
      )}

      {/* FAQ SCHEMA-FRIENDLY */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="display text-3xl mb-8">FAQs — {state.name}</h2>
          <details className="border-t border-ivory-300 py-5 cursor-pointer">
            <summary className="display text-lg font-normal list-none flex justify-between">
              {state.name} में घरौनी कैसे देखें? <span className="text-terracotta-600">+</span>
            </summary>
            <div className="mt-3 text-ink-700 leading-relaxed">
              घरौनी कार्ड देखने के लिए, <Link href={ROUTES.check} className="text-terracotta-600 underline">हमारे status check tool</Link> पर जाएँ, राज्य में {state.nameHi} चुनें, गाँव का नाम डालें।
            </div>
          </details>
          <details className="border-t border-ivory-300 py-5 cursor-pointer">
            <summary className="display text-lg font-normal list-none flex justify-between">
              {state.name} में घरौनी पर कितना लोन मिल सकता है? <span className="text-terracotta-600">+</span>
            </summary>
            <div className="mt-3 text-ink-700 leading-relaxed">
              ₹75 लाख तक, संपत्ति के मूल्य पर निर्भर। दरें 9.5% से शुरू। <Link href={ROUTES.loan} className="text-terracotta-600 underline">लोन जाँचें</Link>।
            </div>
          </details>
          <details className="border-t border-b border-ivory-300 py-5 cursor-pointer">
            <summary className="display text-lg font-normal list-none flex justify-between">
              क्या यह सरकारी साइट है? <span className="text-terracotta-600">+</span>
            </summary>
            <div className="mt-3 text-ink-700 leading-relaxed">
              नहीं। Gharauni.com एक independent aggregator platform है जो SVAMITVA cardholders की मदद करता है। सरकारी स्रोत के लिए Bhulekh portal देखें।
            </div>
          </details>
        </div>
      </section>

      <Footer />
    </>
  );
}

function StatCell({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-l-2 border-terracotta-500 pl-4">
      <div className="display text-3xl">{value}</div>
      <div className="text-sm text-ink-400 mt-1">{label}</div>
    </div>
  );
}

function ActionCard({ href, title, desc }: { href: string; title: string; desc: string }) {
  return (
    <Link href={href} className="hover-lift bg-ivory-50 border-[1.5px] border-ivory-200 p-6 block">
      <div className="display text-xl mb-1">{title}</div>
      <div className="text-sm text-ink-700 mb-3">{desc}</div>
      <div className="text-terracotta-600 text-sm inline-flex items-center gap-1 font-semibold">
        शुरू करें <ArrowRight size={14} />
      </div>
    </Link>
  );
}
