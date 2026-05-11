import Link from 'next/link';
import type { Metadata } from 'next';
import { Sparkles, Users, Target, Globe, Award } from 'lucide-react';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { Seal } from '@/components/seal';

export const metadata: Metadata = {
  title: 'About · हमारे बारे में · Why Gharauni.com exists',
  description: 'Gharauni.com is being built as a dedicated platform for the 30M+ SVAMITVA cardholders. Built to make rural property bankable, sellable, insurable.'
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <section className="py-20 px-6 bg-ivory-100">
        <div className="max-w-4xl mx-auto">
          <Seal size="lg" className="mb-6" />
          <div className="mono text-xs text-terracotta-600 tracking-widest mb-3">ABOUT · OUR MISSION</div>
          <h1 className="display text-4xl sm:text-5xl lg:text-6xl m-0 mb-6 leading-[1.1]">
            Making rural property bankable, sellable, insurable.
          </h1>
          <p className="text-lg text-ink-700 leading-relaxed max-w-3xl">
            For decades, ~600 million rural Indians owned their homes but could not use them — not as loan collateral, not for easy sale, not for clean inheritance. The Government of India’s SVAMITVA Scheme changed that with 30+ million property cards. We are building the consumer layer on top.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-amber-700/30 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800">
            <Sparkles className="w-3.5 h-3.5" /> Early launch · v1 services rolling out 2026
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="display text-3xl mb-8">The dead capital problem</h2>
          <p className="text-lg text-ink-700 leading-relaxed mb-4">
            Economist Hernando de Soto called it the “dead capital” problem: the poor are not capital-deficient, they are title-deficient. Their homes exist, but without legal proof of ownership, they cannot be pledged, sold, or inherited cleanly.
          </p>
          <p className="text-lg text-ink-700 leading-relaxed mb-4">
            India’s SVAMITVA Scheme is the most aggressive real-world solution ever attempted. Drone-survey every village, issue a 13-digit property card per home, link it to Aadhaar and Bhulekh. <strong>30M+ cards issued. ~$1.58 trillion of dead capital potentially unlocked.</strong>
          </p>
          <p className="text-lg text-ink-700 leading-relaxed">
            But a card alone is not enough. Cardholders need a way to actually <em>use</em> it. That is where we come in.
          </p>
        </div>
      </section>

      <section className="bg-ink-900 text-ivory-50 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="display text-3xl mb-8">What we are building</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <Pillar icon={Target} t="Eight services" d="From status check to loan comparison to title verification — every Gharauni use-case in one place. Two live today, six in waitlist mode." />
            <Pillar icon={Globe} t="Bilingual today, multilingual tomorrow" d="Hindi and English at launch. Marathi, Telugu, Bhojpuri planned as cardholder volume in those regions grows." />
            <Pillar icon={Users} t="Free for cardholders" d="Status checks, loan comparisons, learning content — all free. We earn from partner commissions on completed deals, never from you." />
            <Pillar icon={Award} t="Verified-only marketplace" d="When the marketplace goes live, every listing will tie to a real 13-digit Gharauni ID. No fakes, no disputes hidden." />
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="display text-3xl mb-8">The opportunity, in numbers</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Stat v="30M+" l="SVAMITVA cards issued nationally" />
            <Stat v="600M" l="addressable rural population" />
            <Stat v="₹132 L cr" l="asset value potentially unlocked" />
            <Stat v="+23%" l="loan-sanction lift in covered districts" />
          </div>
          <p className="mt-4 text-xs text-ink-500">Source: Ministry of Panchayati Raj official statistics (Jan 2026), EAC-PM working paper (2024).</p>
        </div>
      </section>

      <section className="bg-ivory-100 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Sparkles size={32} className="text-terracotta-600 mx-auto mb-4" />
          <h2 className="display text-3xl mb-4">Built by WebWorks</h2>
          <p className="text-ink-700 leading-relaxed mb-6">
            Gharauni.com is a project of WebWorks — an independent venture studio building consumer-facing internet businesses in emerging markets.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/contact" className="btn-primary">Get in Touch</Link>
            <Link href="/" className="btn-ghost">Back to Home</Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

function Pillar({ icon: Icon, t, d }: { icon: any; t: string; d: string }) {
  return (
    <div>
      <Icon size={28} className="text-amber-300 mb-3" />
      <div className="display text-2xl mb-2">{t}</div>
      <p className="text-ink-300 leading-relaxed">{d}</p>
    </div>
  );
}

function Stat({ v, l }: { v: string; l: string }) {
  return (
    <div className="border-l-2 border-terracotta-500 pl-4">
      <div className="display text-3xl text-terracotta-600">{v}</div>
      <div className="text-sm text-ink-500 mt-1">{l}</div>
    </div>
  );
}
