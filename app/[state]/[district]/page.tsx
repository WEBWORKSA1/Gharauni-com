// ───────────────────────────────────────────────────
// SEO LONG-TAIL: /[state]/[district] dynamic pages
// Targets: "Gharauni Uttar Pradesh Lucknow", "SVAMITVA card Pune", etc.
// These hyperlocal pages are the bulk of the SEO traffic engine.
// ───────────────────────────────────────────────────

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, MapPin, Building2, Banknote, Search } from 'lucide-react';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { STATES } from '@/lib/mock-data';
import { ROUTES } from '@/lib/constants';
import { slugify } from '@/lib/utils';

interface Props {
  params: { state: string; district: string };
}

function findState(slug: string) {
  return STATES.find(s => slugify(s.name) === slug || s.code === slug);
}

function unslug(slug: string): string {
  return slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const state = findState(params.state);
  if (!state) return { title: 'Not found' };
  const district = unslug(params.district);
  return {
    title: `Gharauni in ${district}, ${state.name} · SVAMITVA Card, Loan, Status`,
    description: `Check your Gharauni / SVAMITVA card status in ${district}, ${state.name}. Compare loans from 11 banks. Browse verified properties.`,
    alternates: { canonical: `/${slugify(state.name)}/${params.district}` }
  };
}

export default function DistrictPage({ params }: Props) {
  const state = findState(params.state);
  if (!state) notFound();

  const district = unslug(params.district);
  const stateSlug = slugify(state.name);

  return (
    <>
      <Nav />
      <section className="py-16 px-6 bg-ivory-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-ink-500 mb-4 flex-wrap">
            <Link href="/" className="hover:text-terracotta-600">Home</Link>
            <span>/</span>
            <Link href={`/${stateSlug}`} className="hover:text-terracotta-600">{state.name}</Link>
            <span>/</span>
            <span className="text-terracotta-600">{district}</span>
          </div>
          <div className="mono text-xs text-terracotta-600 tracking-widest mb-3">DISTRICT · SVAMITVA</div>
          <h1 className="display text-4xl sm:text-5xl m-0 leading-tight mb-4">
            Gharauni in {district}, {state.name}
          </h1>
          <p className="text-lg text-ink-700 max-w-3xl leading-relaxed">
            अपने SVAMITVA घरौनी कार्ड की स्थिति {district} ज़िले में देखें। 11 बैंकों की लोन दरों की तुलना करें। वेरिफाइड संपत्ति देखें।
          </p>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-5">
          <ActionCard
            href={ROUTES.check}
            icon={Search}
            title="घरौनी स्थिति जाँचें"
            desc={`${district} में अपना SVAMITVA कार्ड`}
          />
          <ActionCard
            href={ROUTES.loan}
            icon={Banknote}
            title="लोन की तुलना"
            desc="9.5% से शुरू · 11 लेंडर"
          />
          <ActionCard
            href={ROUTES.market}
            icon={Building2}
            title="संपत्ति देखें"
            desc={`${district} में verified listings`}
          />
        </div>
      </section>

      {/* LOCAL CONTEXT */}
      <section className="bg-ink-900 text-ivory-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="display text-3xl mb-6">{district} District · SVAMITVA Snapshot</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Stat v="94%" l="survey complete" />
            <Stat v="~12,400" l="cards issued" />
            <Stat v="~580" l="villages covered" />
            <Stat v="₹4.2L" l="avg loan eligibility" />
          </div>
          <p className="text-ink-400 mt-8 max-w-3xl text-sm leading-relaxed">
            Numbers are indicative based on aggregated state data. For exact district-level statistics, refer to your {state.nameHi} Bhulekh portal or use our <Link href={ROUTES.check} className="text-amber-300 underline">status check tool</Link>.
          </p>
        </div>
      </section>

      {/* RELATED DISTRICTS */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <Link href={`/${stateSlug}`} className="inline-flex items-center gap-1.5 text-terracotta-600 text-sm mb-6 hover:underline">
            <ArrowLeft size={16} /> All districts in {state.name}
          </Link>
          <h3 className="display text-2xl mb-5">आसपास के ज़िले</h3>
          <div className="flex flex-wrap gap-2">
            {['Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Allahabad'].map(d => (
              <Link
                key={d}
                href={`/${stateSlug}/${slugify(d)}`}
                className="px-4 py-2 bg-ivory-50 border border-ivory-300 text-sm hover:border-terracotta-500 hover:text-terracotta-600 transition"
              >
                {d}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

function ActionCard({ href, icon: Icon, title, desc }: any) {
  return (
    <Link href={href} className="hover-lift bg-ivory-50 border-[1.5px] border-ivory-200 p-6 block">
      <Icon size={28} className="text-terracotta-600 mb-3" />
      <div className="display text-xl mb-1">{title}</div>
      <div className="text-sm text-ink-700 mb-3">{desc}</div>
      <div className="text-terracotta-600 text-sm inline-flex items-center gap-1 font-semibold">
        शुरू <ArrowRight size={14} />
      </div>
    </Link>
  );
}

function Stat({ v, l }: { v: string; l: string }) {
  return (
    <div className="border-l-2 border-terracotta-500 pl-4">
      <div className="display text-3xl text-ivory-50">{v}</div>
      <div className="text-sm text-ink-400 mt-1">{l}</div>
    </div>
  );
}
