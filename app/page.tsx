import Link from 'next/link';
import { Sparkles, ChevronRight, Zap, ScrollText, Shield, Award } from 'lucide-react';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { CardMockup } from '@/components/card-mockup';
import { StatBand } from '@/components/stat-band';
import { ServiceGrid } from '@/components/service-grid';
import { ROUTES, SERVICE_TILES, STATS } from '@/lib/constants';
import { STRINGS } from '@/lib/i18n';
import { SAMPLE_CARD } from '@/lib/mock-data';

export default function HomePage() {
  // Server-rendered with Hindi default. Lang switcher in Nav swaps client-side via Shell.
  const t = STRINGS.hi;

  const services = SERVICE_TILES.map(s => ({
    ...s,
    title: t.services[s.key as keyof typeof t.services] && typeof t.services[s.key as keyof typeof t.services] === 'object'
      ? (t.services[s.key as keyof typeof t.services] as any).t
      : s.key,
    desc: t.services[s.key as keyof typeof t.services] && typeof t.services[s.key as keyof typeof t.services] === 'object'
      ? (t.services[s.key as keyof typeof t.services] as any).d
      : ''
  }));

  const statBand = STATS.map(s => ({
    value: s.value,
    label: (t.stats as any)[s.labelKey],
    sub: (t.stats as any)[s.subKey]
  }));

  const whyItems = [
    { icon: Zap, ...t.why.f1 },
    { icon: ScrollText, ...t.why.f2 },
    { icon: Shield, ...t.why.f3 },
    { icon: Award, ...t.why.f4 }
  ];

  return (
    <>
      <Nav lang="hi" />

      {/* HERO */}
      <section className="grain relative overflow-hidden py-20 px-6">
        <div
          className="absolute -top-24 -right-24 w-[500px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(194, 65, 12, 0.12), transparent 70%)' }}
        />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.2fr_1fr] gap-16 items-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-ivory-100 px-3.5 py-1.5 rounded-full border border-terracotta-500 mb-6">
              <Sparkles size={14} className="text-terracotta-600" />
              <span className="mono text-xs text-terracotta-600 tracking-wider">{t.hero.badge}</span>
            </div>
            <h1 className="display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] mb-6 text-ink-900">
              {t.hero.title}
            </h1>
            <p className="text-lg text-ink-700 leading-relaxed mb-9 max-w-xl">
              {t.hero.subtitle}
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link href={ROUTES.check} className="btn-primary inline-flex items-center gap-1.5">
                {t.hero.ctaPrimary} <ChevronRight size={18} />
              </Link>
              <Link href={ROUTES.loan} className="btn-ghost">
                {t.hero.ctaSecondary}
              </Link>
            </div>
            <div className="mt-12 flex gap-8 flex-wrap items-center">
              <div className="mono text-xs text-ink-500 uppercase tracking-wider">
                {t.hero.lenderPartners}
              </div>
              {['BAJAJ', 'TATA', 'ABIRLA', 'KOTAK', 'SBI', 'HDFC'].map(b => (
                <div key={b} className="mono text-sm font-medium text-ink-700 tracking-wider">{b}</div>
              ))}
            </div>
          </div>
          <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <CardMockup card={SAMPLE_CARD} />
          </div>
        </div>
      </section>

      <StatBand stats={statBand} />

      <ServiceGrid heading={t.services.heading} label={t.services.label} services={services as any} />

      {/* WHY US */}
      <section className="bg-ivory-100 py-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
          <div>
            <div className="mono text-xs text-terracotta-600 tracking-widest mb-3">{t.why.label}</div>
            <h2 className="display text-5xl leading-tight">{t.why.title}</h2>
          </div>
          <div className="grid gap-5">
            {whyItems.map((f, i) => (
              <div key={i} className="flex gap-5 py-5 border-b border-ivory-300">
                <f.icon size={28} className="text-terracotta-600 flex-shrink-0 mt-1" />
                <div>
                  <div className="display text-2xl mb-1">{f.t}</div>
                  <div className="text-[15px] text-ink-700 leading-relaxed">{f.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mono text-xs text-terracotta-600 tracking-widest mb-3 text-center">
            {t.faq.label}
          </div>
          <h2 className="display text-4xl m-0 mb-12 text-center leading-tight">
            {t.faq.heading}
          </h2>
          <div>
            {t.faq.items.map((f, i) => (
              <details key={i} className="border-t border-ivory-300 py-6 cursor-pointer">
                <summary className="display text-xl font-normal list-none flex justify-between">
                  {f.q} <span className="text-terracotta-600">+</span>
                </summary>
                <div className="mt-3 text-base text-ink-700 leading-relaxed">{f.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section
        className="grain relative text-ivory-50 py-20 px-6 text-center"
        style={{ background: 'linear-gradient(135deg, #7C2D12 0%, #431407 100%)' }}
      >
        <div className="max-w-2xl mx-auto relative z-10">
          <h2 className="display text-4xl sm:text-5xl lg:text-6xl mb-4 leading-tight">
            {t.cta.title}
          </h2>
          <p className="text-lg text-ivory-100 mb-8 leading-relaxed">
            {t.cta.sub}
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href={ROUTES.check} className="bg-ivory-50 text-terracotta-600 px-8 py-4 font-semibold inline-block">
              {t.cta.primary}
            </Link>
            <Link href={ROUTES.loan} className="bg-transparent text-ivory-50 border-[1.5px] border-ivory-50 px-8 py-4 font-semibold inline-block">
              {t.cta.secondary}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
