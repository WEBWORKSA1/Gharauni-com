import Link from 'next/link';
import { ArrowRight, CheckCircle, Shield, Users, TrendingUp, Award, Sparkles, MapPin } from 'lucide-react';
import { Seal } from '@/components/seal';
import { ServiceGrid } from '@/components/service-grid';
import { StatBand } from '@/components/stat-band';
import { CardMockup } from '@/components/card-mockup';
import { Testimonials } from '@/components/testimonials';
import { TrustBadges } from '@/components/trust-badges';
import { Shell } from '@/components/shell';

export default function HomePage() {
  return (
    <Shell>
      {/* HERO — Hindi-first, problem-anchored, single sharp CTA */}
      <section className="relative overflow-hidden border-b border-ink/10 bg-paper">
        {/* faint terracotta wash */}
        <div className="absolute inset-0 bg-gradient-to-br from-terracotta/8 via-paper to-paper pointer-events-none" aria-hidden />
        {/* subtle dotted texture */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, var(--ink) 1px, transparent 1px)', backgroundSize: '24px 24px' }} aria-hidden />

        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28 grid gap-12 lg:grid-cols-2 lg:items-center relative">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-terracotta/30 bg-terracotta/5 px-3 py-1 text-xs font-medium text-terracotta mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>केंद्र सरकार की SVAMITVA योजना के तहत · 3.06 करोड़ कार्ड जारी</span>
            </div>

            <h1 className="font-serif text-5xl lg:text-6xl leading-[1.05] tracking-tight text-ink">
              आपकी <span className="text-terracotta">घरौनी</span> अब <br className="hidden lg:block" />
              एक चाबी है।
            </h1>
            <p className="mt-3 font-serif text-xl text-ink/70 italic">Your Gharauni is now a key. Unlock loans, sell with confidence, plan your future.</p>

            <p className="mt-6 text-lg text-ink/80 leading-relaxed max-w-xl">
              SVAMITVA योजना के तहत मिला आपका Property Card अब सिर्फ कागज़ नहीं है — यह बैंक लोन, बीमा, और सुरक्षित बिक्री का ज़रिया है। हम आपकी मदद करते हैं, बिल्कुल मुफ्त।
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/check" className="group inline-flex items-center justify-center gap-2 rounded-md bg-terracotta px-6 py-3.5 text-white font-medium hover:bg-terracotta-dark transition-colors shadow-sm">
                अपनी घरौनी देखें · Check My Gharauni
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link href="/loan" className="inline-flex items-center justify-center gap-2 rounded-md border border-ink/20 bg-paper px-6 py-3.5 text-ink font-medium hover:bg-ink/5 transition-colors">
                Compare 11 Lenders →
              </Link>
            </div>

            <div className="mt-6 flex items-center gap-4 text-xs text-ink/60">
              <span className="inline-flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-green-700" /> 100% Free</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-green-700" /> No Aadhaar OTP</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle className="w-3.5 h-3.5 text-green-700" /> Hindi · Bhojpuri · English</span>
            </div>
          </div>

          {/* Right column: card mockup + lender bar */}
          <div className="relative flex flex-col items-center">
            <CardMockup />
            <div className="mt-8 w-full max-w-md">
              <div className="text-[10px] uppercase tracking-widest text-ink/40 text-center mb-3">Partner Lenders</div>
              <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-ink/60 font-medium">
                <span>Bajaj Finserv</span>
                <span className="text-ink/20">·</span>
                <span>Tata Capital</span>
                <span className="text-ink/20">·</span>
                <span>Aditya Birla</span>
                <span className="text-ink/20">·</span>
                <span>Kotak Mahindra</span>
                <span className="text-ink/20">·</span>
                <span>HDFC</span>
                <span className="text-ink/20">·</span>
                <span>+6 more</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STAT BAND — anchored with context, not just floating numbers */}
      <StatBand />

      {/* WHO IS THIS FOR — adds emotional anchor */}
      <section className="border-b border-ink/10 bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl text-ink">यह सेवा किसके लिए है?</h2>
            <p className="mt-2 text-ink/60">Built for the 30 crore Indians whose homes finally have a legal title.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="rounded-lg border border-ink/10 bg-paper p-7 hover:border-terracotta/30 transition-colors">
              <div className="w-10 h-10 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl text-ink mb-2">घर के मालिक</h3>
              <p className="text-sm text-ink/70 leading-relaxed">Just received your Gharauni card and unsure what to do with it. Check your status, understand what it means, and plan next steps.</p>
            </div>

            <div className="rounded-lg border border-ink/10 bg-paper p-7 hover:border-terracotta/30 transition-colors">
              <div className="w-10 h-10 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center mb-4">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl text-ink mb-2">लोन चाहने वाले</h3>
              <p className="text-sm text-ink/70 leading-relaxed">Need ₹2-50 lakh against your village home. We compare 11 lenders — Bajaj, Tata, ABFL and more — to find the lowest rate for your card.</p>
            </div>

            <div className="rounded-lg border border-ink/10 bg-paper p-7 hover:border-terracotta/30 transition-colors">
              <div className="w-10 h-10 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl text-ink mb-2">खरीदार और विक्रेता</h3>
              <p className="text-sm text-ink/70 leading-relaxed">Buying or selling rural property. Verify the seller's title is clean, check for disputes, ensure your transaction is on solid legal ground.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE GRID — the 8 tiers */}
      <section className="border-b border-ink/10 bg-ink/[0.015]">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl text-ink">Eight ways we help</h2>
            <p className="mt-2 text-ink/60">Every service is free for cardholders. We earn only when banks approve your loan.</p>
          </div>
          <ServiceGrid />
        </div>
      </section>

      {/* TESTIMONIALS — real-feeling with district, village, photo */}
      <Testimonials />

      {/* HOW IT WORKS — 3-step explainer */}
      <section className="border-b border-ink/10 bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl text-ink">तीन कदम। बस इतना ही।</h2>
            <p className="mt-2 text-ink/60">Three steps. That's all it takes.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-10 relative">
            {/* connector line for desktop */}
            <div className="hidden md:block absolute top-[34px] left-[16.66%] right-[16.66%] h-px bg-ink/10" aria-hidden />

            <div className="relative text-center">
              <div className="relative inline-flex items-center justify-center w-[68px] h-[68px] rounded-full bg-terracotta text-white font-serif text-2xl mb-4 shadow-sm">1</div>
              <h3 className="font-serif text-xl text-ink mb-2">अपना गाँव खोजें</h3>
              <p className="text-sm text-ink/70 max-w-[240px] mx-auto">Pick your state → district → tehsil → village from our directory.</p>
            </div>

            <div className="relative text-center">
              <div className="relative inline-flex items-center justify-center w-[68px] h-[68px] rounded-full bg-terracotta text-white font-serif text-2xl mb-4 shadow-sm">2</div>
              <h3 className="font-serif text-xl text-ink mb-2">अपना कार्ड देखें</h3>
              <p className="text-sm text-ink/70 max-w-[240px] mx-auto">See if your Gharauni is ready, download the PDF, verify details.</p>
            </div>

            <div className="relative text-center">
              <div className="relative inline-flex items-center justify-center w-[68px] h-[68px] rounded-full bg-terracotta text-white font-serif text-2xl mb-4 shadow-sm">3</div>
              <h3 className="font-serif text-xl text-ink mb-2">अगला कदम चुनें</h3>
              <p className="text-sm text-ink/70 max-w-[240px] mx-auto">Get a loan, verify a title, list for sale, or just learn what you own.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAND — RBI/Aadhaar/DPDP + specific lenders */}
      <TrustBadges />

      {/* FINAL CTA — bold, action-anchored */}
      <section className="border-b border-ink/10 bg-terracotta text-white">
        <div className="mx-auto max-w-5xl px-6 py-16 text-center">
          <Award className="w-10 h-10 mx-auto mb-4 opacity-80" />
          <h2 className="font-serif text-3xl lg:text-4xl mb-3">देर मत कीजिए। आपकी घरौनी अभी काम कर सकती है।</h2>
          <p className="text-white/85 mb-8 max-w-xl mx-auto">Don't wait. Your Gharauni can work for you today. Check your status in 30 seconds — no signup required.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/check" className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-6 py-3.5 text-terracotta font-medium hover:bg-paper transition-colors">
              अभी देखें · Check Now <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/uttar-pradesh" className="inline-flex items-center justify-center gap-2 rounded-md border border-white/30 bg-transparent px-6 py-3.5 text-white font-medium hover:bg-white/10 transition-colors">
              <MapPin className="w-4 h-4" /> Browse by District
            </Link>
          </div>
        </div>
      </section>
    </Shell>
  );
}
