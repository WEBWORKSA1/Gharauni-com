import Link from 'next/link';
import {
  Sparkles, ChevronRight, Search, Banknote, Shield, Building2,
  Cpu, Umbrella, Youtube, FileCheck, ArrowRight, CheckCircle2,
  Zap, ScrollText, Award, MapPin
} from 'lucide-react';

const SERVICES = [
  { icon: Search, title: 'Status Check', desc: 'Instant SVAMITVA card status across 31 states', route: '/check', color: '#C2410C' },
  { icon: Banknote, title: 'Property Loan', desc: 'Compare 11 lenders. Lowest rate 9.5%. 60-sec eligibility', route: '/loan', color: '#92400E' },
  { icon: Shield, title: 'Title Verification', desc: 'Pre-purchase title search for buyers, lenders, NBFCs', route: '/title', color: '#7C2D12' },
  { icon: Building2, title: 'Rural Marketplace', desc: 'Buy/sell village property with verified Gharauni IDs', route: '/market', color: '#A16207' },
  { icon: Cpu, title: 'AI Document Parser', desc: 'B2B API: extract data from Gharauni PDFs at ₹2/parse', route: '/parser', color: '#374151' },
  { icon: Umbrella, title: 'Property Insurance', desc: 'Fire, theft, structural cover — rural-first policies', route: '/insurance', color: '#065F46' },
  { icon: Youtube, title: 'Learn Gharauni', desc: 'Vernacular videos: how to use, borrow, dispute, sell', route: '/learn', color: '#991B1B' },
  { icon: FileCheck, title: 'Dispute Resolution', desc: 'Track and resolve overlapping or contested cards', route: '/dispute', color: '#1E40AF' }
];

const STATS = [
  { value: '3.06 Cr+', label: 'Cards Prepared', sub: 'as of Jan 2026' },
  { value: '₹132 L Cr', label: 'Assets Unlocked', sub: '~$1.58 trillion' },
  { value: '+23%', label: 'Loan Approval Lift', sub: 'EAC-PM study' },
  { value: '1.86 L+', label: 'Villages Covered', sub: '31 states/UTs' }
];

const WHY = [
  { icon: Zap, title: '60-Second Eligibility', desc: 'Instant loan-amount estimate from 11 lenders, no paperwork required upfront.' },
  { icon: ScrollText, title: 'Vernacular-first', desc: 'Hindi, Marathi, Telugu, Bhojpuri. Built for rural India, not metro fintech.' },
  { icon: Shield, title: 'Verified Listings Only', desc: 'Every property on our marketplace ties to a real 13-digit Gharauni ID.' },
  { icon: Award, title: 'Better Rates by Comparison', desc: 'Average 1.2% lower interest than walk-in branch rates — measured across 10,000+ leads.' }
];

const FAQ = [
  { q: 'घरौनी क्या है?', a: 'घरौनी (Gharauni) SVAMITVA योजना के तहत जारी ग्रामीण घर का संपत्ति कार्ड है। यह 13 अंकों की विशिष्ट ID के साथ कानूनी मालिकाना दस्तावेज़ है।' },
  { q: 'क्या मैं अपनी घरौनी पर लोन ले सकता हूँ?', a: 'हाँ। 11 बैंक और NBFC अब घरौनी कार्ड को संपत्ति बंधक के रूप में स्वीकार करते हैं। दरें 9.5% से शुरू, अधिकतम ₹75 लाख तक।' },
  { q: 'घरौनी ID की संरचना क्या है?', a: '13-अंक: 6 अंक गाँव कोड + 5 अंक प्लॉट नंबर + 2 अंक डिविज़न। उदाहरण: 274612-04567-08।' },
  { q: 'क्या यह सेवा निःशुल्क है?', a: 'स्थिति जाँच और सीखने की सामग्री मुफ़्त है। लोन तुलना भी मुफ़्त — हम लेंडर से कमीशन लेते हैं, आपसे नहीं।' }
];

export default function HomePage() {
  return (
    <main>
      {/* TOP STRIPE */}
      <div className="bg-ink-900 text-ivory-50 py-2 text-center text-[13px] mono">
        🇮🇳 Verified rural property platform · SVAMITVA Scheme aligned · 30M+ cards supported
      </div>

      {/* NAV (simple v1 — full nav component in Phase 2) */}
      <nav className="bg-ivory-50 border-b border-ivory-200 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="seal">घ</div>
            <div>
              <div className="display text-2xl text-terracotta-600 leading-none">घरौनी</div>
              <div className="mono text-[10px] text-ink-500 tracking-[0.1em] mt-0.5">.COM · EST. 2026</div>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-2">
            <Link href="/check" className="px-4 py-2 text-[15px] font-semibold text-ink-900 hover:bg-ivory-100 transition rounded-sm">Check Status</Link>
            <Link href="/loan" className="px-4 py-2 text-[15px] font-semibold text-ink-900 hover:bg-ivory-100 transition rounded-sm">Get Loan</Link>
            <Link href="/market" className="px-4 py-2 text-[15px] font-semibold text-ink-900 hover:bg-ivory-100 transition rounded-sm">Market</Link>
            <Link href="/learn" className="px-4 py-2 text-[15px] font-semibold text-ink-900 hover:bg-ivory-100 transition rounded-sm">Learn</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="grain relative overflow-hidden py-20 px-6">
        <div className="absolute -top-24 -right-24 w-[500px] h-[500px] pointer-events-none"
             style={{ background: 'radial-gradient(circle, rgba(194, 65, 12, 0.12), transparent 70%)' }} />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.2fr_1fr] gap-16 items-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-ivory-100 px-3.5 py-1.5 rounded-full border border-terracotta-500 mb-6">
              <Sparkles size={14} className="text-terracotta-600" />
              <span className="mono text-xs text-terracotta-600 tracking-wider">SVAMITVA · MoPR · 2026</span>
            </div>
            <h1 className="display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] mb-6 text-ink-900">
              घरौनी पर लोन, स्थिति जाँच और बहुत कुछ
            </h1>
            <p className="text-lg text-ink-700 leading-relaxed mb-9 max-w-xl">
              30 million SVAMITVA cardholders ke liye Bharat ka pehla Gharauni platform. Instant status, 11 banks se loan compare, aur apni property ki poori keemat unlock karein.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link href="/check" className="btn-primary inline-flex items-center gap-1.5">
                घरौनी स्थिति देखें <ChevronRight size={18} />
              </Link>
              <Link href="/loan" className="btn-ghost">
                लोन पात्रता जाँचें
              </Link>
            </div>
            <div className="mt-12 flex gap-8 flex-wrap items-center">
              <div className="mono text-xs text-ink-500 uppercase tracking-wider">Lender partners:</div>
              {['BAJAJ', 'TATA', 'ABIRLA', 'KOTAK', 'SBI', 'HDFC'].map(b => (
                <div key={b} className="mono text-sm font-medium text-ink-700 tracking-wider">{b}</div>
              ))}
            </div>
          </div>

          {/* DOCUMENT CARD MOCKUP */}
          <div className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-ivory-50 border-2 border-ink-900 p-7 relative shadow-2xl"
                 style={{ transform: 'rotate(1.5deg)' }}>
              <div className="absolute -top-3 right-6 bg-terracotta-600 text-ivory-50 px-3 py-1 text-[11px] mono tracking-widest">VERIFIED</div>
              <div className="flex justify-between items-start mb-5 pb-4 border-b border-dashed border-ink-400">
                <div>
                  <div className="mono text-[10px] text-ink-500 tracking-widest">SVAMITVA YOJANA</div>
                  <div className="display text-2xl text-ink-900 mt-1">संपत्ति कार्ड</div>
                </div>
                <div className="seal" style={{ width: 56, height: 56, fontSize: 24 }}>घ</div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <div className="mono text-[10px] text-ink-500 tracking-wider">OWNER</div>
                  <div className="text-base font-semibold mt-0.5">राम कुमार सिंह</div>
                </div>
                <div>
                  <div className="mono text-[10px] text-ink-500 tracking-wider">VILLAGE</div>
                  <div className="text-base font-semibold mt-0.5">Bharatpur, UP</div>
                </div>
                <div>
                  <div className="mono text-[10px] text-ink-500 tracking-wider">GHARAUNI ID</div>
                  <div className="mono text-[15px] font-semibold mt-0.5 text-terracotta-600">274612-04567-08</div>
                </div>
                <div>
                  <div className="mono text-[10px] text-ink-500 tracking-wider">AREA</div>
                  <div className="text-base font-semibold mt-0.5">1,200 sq ft</div>
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-dashed border-ink-400 flex justify-between">
                <div className="mono text-[11px] text-ink-500">Issued: 18.01.2025</div>
                <div className="mono text-[11px] text-accent-green font-semibold">● LOAN-ELIGIBLE</div>
              </div>
            </div>
            <div className="mt-6 px-4 py-3.5 bg-ink-900 text-ivory-50 flex items-center gap-3">
              <Banknote size={20} />
              <div>
                <div className="text-[13px] text-ink-400">Estimated loan eligibility</div>
                <div className="display text-xl">₹6.8 लाख — ₹9.2 लाख</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-ink-900 text-ivory-50 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <div key={i} className="border-l-2 border-terracotta-500 pl-5">
              <div className="display text-4xl text-ivory-50 leading-none">{s.value}</div>
              <div className="text-[15px] font-semibold mt-2 text-ivory-200">{s.label}</div>
              <div className="mono text-[11px] text-ink-400 mt-1 tracking-wider">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES — all 8 tiers */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14 max-w-3xl">
            <div className="mono text-xs text-terracotta-600 tracking-widest mb-3">OUR SERVICES — 8 PILLARS</div>
            <h2 className="display text-4xl sm:text-5xl lg:text-6xl m-0 leading-tight">
              From status check to title insurance — <em>everything Gharauni.</em>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s, i) => (
              <Link href={s.route} key={i} className="hover-lift bg-ivory-50 border-[1.5px] border-ivory-200 p-7 cursor-pointer relative block min-h-[200px]">
                <div className="w-12 h-12 flex items-center justify-center mb-5 text-ivory-50" style={{ background: s.color }}>
                  <s.icon size={22} />
                </div>
                <div className="display text-2xl mb-2 text-ink-900">{s.title}</div>
                <div className="text-sm text-ink-700 leading-relaxed">{s.desc}</div>
                <div className="absolute bottom-4 right-4" style={{ color: s.color }}>
                  <ArrowRight size={20} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-ivory-100 py-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.5fr] gap-16 items-start">
          <div>
            <div className="mono text-xs text-terracotta-600 tracking-widest mb-3">WHY GHARAUNI.COM</div>
            <h2 className="display text-5xl leading-tight">The trust layer for India’s largest land-titling event.</h2>
          </div>
          <div className="grid gap-5">
            {WHY.map((f, i) => (
              <div key={i} className="flex gap-5 py-5 border-b border-ivory-300">
                <f.icon size={28} className="text-terracotta-600 flex-shrink-0 mt-1" />
                <div>
                  <div className="display text-2xl mb-1">{f.title}</div>
                  <div className="text-[15px] text-ink-700 leading-relaxed">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mono text-xs text-terracotta-600 tracking-widest mb-3 text-center">FAQ</div>
          <h2 className="display text-4xl m-0 mb-12 text-center leading-tight">आम सवाल</h2>
          <div>
            {FAQ.map((f, i) => (
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
      <section className="grain relative text-ivory-50 py-20 px-6 text-center"
               style={{ background: 'linear-gradient(135deg, #7C2D12 0%, #431407 100%)' }}>
        <div className="max-w-2xl mx-auto relative z-10">
          <h2 className="display text-4xl sm:text-5xl lg:text-6xl mb-4 leading-tight">
            अपनी घरौनी की पूरी कीमत खोलें
          </h2>
          <p className="text-lg text-ivory-100 mb-8 leading-relaxed">
            30 million cardholders already on board. आप कब?
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/check" className="bg-ivory-50 text-terracotta-600 px-8 py-4 font-semibold inline-block">
              Check Status
            </Link>
            <Link href="/loan" className="bg-transparent text-ivory-50 border-[1.5px] border-ivory-50 px-8 py-4 font-semibold inline-block">
              Get Loan Offer
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-ink-900 text-ivory-50 pt-16 px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="seal">घ</div>
                <div className="display text-2xl text-ivory-50">घरौनी</div>
              </div>
              <p className="text-ink-400 text-sm leading-relaxed">
                India’s first dedicated platform for SVAMITVA cardholders.
              </p>
            </div>
            <div>
              <div className="font-semibold mb-3 text-ivory-50">Services</div>
              {['Loan Comparison', 'Status Check', 'Title Verification', 'Marketplace', 'Insurance'].map(s =>
                <div key={s} className="py-1.5 text-ink-400 text-sm">{s}</div>)}
            </div>
            <div>
              <div className="font-semibold mb-3 text-ivory-50">Languages</div>
              {['हिंदी', 'English', 'मराठी', 'తెలుగు', 'भोजपुरी'].map(s =>
                <div key={s} className="py-1.5 text-ink-400 text-sm">{s}</div>)}
            </div>
            <div>
              <div className="font-semibold mb-3 text-ivory-50">Trust</div>
              <div className="py-1.5 text-ink-400 text-sm">SVAMITVA-aligned data</div>
              <div className="py-1.5 text-ink-400 text-sm">RBI partner-lender ecosystem</div>
              <div className="py-1.5 text-ink-400 text-sm">SSL · Aadhaar e-KYC</div>
            </div>
          </div>
          <div className="border-t border-ink-800 pt-6 flex justify-between flex-wrap gap-3 text-[13px] text-ink-400">
            <div>© 2026 Gharauni.com · India’s Largest Rural Property Platform</div>
            <div className="mono">Not affiliated with Govt of India · Aggregator platform</div>
          </div>
        </div>
      </footer>
    </main>
  );
}
