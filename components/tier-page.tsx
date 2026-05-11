import Link from 'next/link';
import { ArrowRight, CheckCircle2, LucideIcon } from 'lucide-react';
import { Shell } from '@/components/shell';

// Shared layout for the 5 tier pages: /learn, /title, /parser, /insurance, /dispute.
// Keeps visual quality consistent across all of them; future tier pages take minutes, not hours.

export type TierFAQ = {
  q: string;
  qHi?: string;
  a: string;
};

export type TierFeature = {
  icon: LucideIcon;
  title: string;
  titleHi?: string;
  body: string;
};

export type TierStep = {
  title: string;
  titleHi?: string;
  body: string;
};

export type TierConfig = {
  // Hero
  badge: string;                  // e.g. "For banks & NBFCs"
  badgeColor?: 'terracotta' | 'green' | 'blue' | 'amber';
  headlineHi: string;             // घरौनी सीखें
  headline: string;               // Learn about Gharauni
  subheadline: string;            // English italic subhead
  description: string;            // Hindi+English mixed lead paragraph
  primaryCTA: { label: string; href: string };
  secondaryCTA?: { label: string; href: string };

  // Problem/Solution panel — the "why this exists"
  problemTitle: string;
  problemTitleHi?: string;
  problemBody: string;
  solutionTitle: string;
  solutionTitleHi?: string;
  solutionBody: string;
  outcome: string;                // "Result: ..." single line

  // Features (3 cards)
  featuresHeading: string;
  featuresHeadingHi?: string;
  features: TierFeature[];

  // How it works (3 steps)
  stepsHeading: string;
  stepsHeadingHi?: string;
  steps: TierStep[];

  // FAQ
  faq: TierFAQ[];

  // Final CTA
  finalHeadline: string;
  finalHeadlineHi?: string;
  finalBody: string;
  finalCTA: { label: string; href: string };
};

const badgeClasses: Record<NonNullable<TierConfig['badgeColor']>, string> = {
  terracotta: 'border-terracotta/30 bg-terracotta/5 text-terracotta',
  green: 'border-green-700/30 bg-green-50 text-green-800',
  blue: 'border-blue-700/30 bg-blue-50 text-blue-800',
  amber: 'border-amber-700/30 bg-amber-50 text-amber-800',
};

export function TierPage({ config }: { config: TierConfig }) {
  const badge = badgeClasses[config.badgeColor || 'terracotta'];

  return (
    <Shell>
      {/* Hero */}
      <section className="relative border-b border-ink/10 bg-paper">
        <div className="absolute inset-0 bg-gradient-to-br from-terracotta/8 via-paper to-paper pointer-events-none" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:py-20">
          <div className="max-w-3xl">
            <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium mb-5 ${badge}`}>
              <span>{config.badge}</span>
            </div>
            <h1 className="font-serif text-4xl lg:text-5xl leading-[1.1] text-ink">
              {config.headlineHi} <br className="hidden sm:block" />
              <span className="text-terracotta">{config.headline}</span>
            </h1>
            <p className="mt-2 font-serif text-lg text-ink/70 italic">{config.subheadline}</p>
            <p className="mt-5 text-ink/80 leading-relaxed max-w-2xl">{config.description}</p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href={config.primaryCTA.href}
                className="group inline-flex items-center justify-center gap-2 rounded-md bg-terracotta px-6 py-3.5 text-white font-medium hover:bg-terracotta-dark transition-colors"
              >
                {config.primaryCTA.label}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              {config.secondaryCTA && (
                <Link
                  href={config.secondaryCTA.href}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-ink/20 bg-paper px-6 py-3.5 text-ink font-medium hover:bg-ink/5 transition-colors"
                >
                  {config.secondaryCTA.label} →
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Problem / Solution panel */}
      <section className="border-b border-ink/10 bg-ink/[0.015]">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
            <div className="rounded-lg border border-ink/10 bg-paper p-7">
              <div className="text-[11px] uppercase tracking-widest text-ink/50 font-medium mb-2">The problem</div>
              <h3 className="font-serif text-xl text-ink mb-1">
                {config.problemTitle}
                {config.problemTitleHi && (
                  <span className="block text-base text-ink/60 font-normal mt-0.5">{config.problemTitleHi}</span>
                )}
              </h3>
              <p className="text-sm text-ink/75 leading-relaxed mt-3">{config.problemBody}</p>
            </div>
            <div className="rounded-lg border border-terracotta/30 bg-terracotta/[0.03] p-7">
              <div className="text-[11px] uppercase tracking-widest text-terracotta/80 font-medium mb-2">Our solution</div>
              <h3 className="font-serif text-xl text-ink mb-1">
                {config.solutionTitle}
                {config.solutionTitleHi && (
                  <span className="block text-base text-ink/60 font-normal mt-0.5">{config.solutionTitleHi}</span>
                )}
              </h3>
              <p className="text-sm text-ink/75 leading-relaxed mt-3">{config.solutionBody}</p>
              <p className="text-sm text-terracotta font-medium mt-4 pt-4 border-t border-terracotta/15">
                Result: <span className="text-ink">{config.outcome}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="border-b border-ink/10 bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            {config.featuresHeadingHi && (
              <div className="font-serif text-2xl text-ink mb-1">{config.featuresHeadingHi}</div>
            )}
            <h2 className="font-serif text-3xl lg:text-4xl text-ink">{config.featuresHeading}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {config.features.map((f) => (
              <div key={f.title} className="rounded-lg border border-ink/10 bg-paper p-7 hover:border-terracotta/30 transition-colors">
                <div className="w-10 h-10 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-xl text-ink mb-1">
                  {f.title}
                  {f.titleHi && <span className="block text-sm text-ink/55 font-normal italic mt-0.5">{f.titleHi}</span>}
                </h3>
                <p className="text-sm text-ink/70 leading-relaxed mt-3">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-ink/10 bg-ink/[0.015]">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            {config.stepsHeadingHi && (
              <div className="font-serif text-xl text-ink/70 mb-1">{config.stepsHeadingHi}</div>
            )}
            <h2 className="font-serif text-3xl lg:text-4xl text-ink">{config.stepsHeading}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-10 relative">
            <div className="hidden md:block absolute top-[34px] left-[16.66%] right-[16.66%] h-px bg-ink/15" aria-hidden />
            {config.steps.map((step, idx) => (
              <div key={step.title} className="relative text-center">
                <div className="relative inline-flex items-center justify-center w-[68px] h-[68px] rounded-full bg-terracotta text-white font-serif text-2xl mb-4 shadow-sm">
                  {idx + 1}
                </div>
                <h3 className="font-serif text-xl text-ink mb-1">{step.title}</h3>
                {step.titleHi && <div className="text-sm text-ink/55 italic mb-2">{step.titleHi}</div>}
                <p className="text-sm text-ink/70 max-w-[260px] mx-auto leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-ink/10 bg-paper">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <h2 className="font-serif text-3xl text-ink mb-10 text-center">Frequently Asked Questions · अक्सर पूछे जाने वाले सवाल</h2>
          <div className="divide-y divide-ink/10 border-y border-ink/10">
            {config.faq.map((item, idx) => (
              <details key={idx} className="group py-5">
                <summary className="flex items-start justify-between cursor-pointer list-none gap-4">
                  <div className="flex-1">
                    <h3 className="font-serif text-lg text-ink leading-snug">
                      {item.q}
                      {item.qHi && <span className="block text-sm text-ink/55 font-normal italic mt-1">{item.qHi}</span>}
                    </h3>
                  </div>
                  <span className="flex-shrink-0 mt-1 text-terracotta text-2xl transition-transform group-open:rotate-45" aria-hidden>+</span>
                </summary>
                <p className="mt-3 text-ink/75 leading-relaxed text-sm pr-8">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-b border-ink/10 bg-terracotta text-white">
        <div className="mx-auto max-w-5xl px-6 py-14 text-center">
          <CheckCircle2 className="w-10 h-10 mx-auto mb-4 opacity-80" />
          <h2 className="font-serif text-3xl lg:text-4xl mb-2">
            {config.finalHeadline}
            {config.finalHeadlineHi && <span className="block text-2xl mt-1 opacity-90">{config.finalHeadlineHi}</span>}
          </h2>
          <p className="text-white/85 mb-7 max-w-xl mx-auto">{config.finalBody}</p>
          <Link
            href={config.finalCTA.href}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-6 py-3.5 text-terracotta font-medium hover:bg-paper transition-colors"
          >
            {config.finalCTA.label}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </Shell>
  );
}
