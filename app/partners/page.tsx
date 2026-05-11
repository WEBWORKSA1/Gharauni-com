import type { Metadata } from 'next';
import { Building2, TrendingUp, Shield, Users, IndianRupee, ArrowRight } from 'lucide-react';
import { Shell } from '@/components/shell';
import { LeadForm, LeadField } from '@/components/lead-form';

export const metadata: Metadata = {
  title: 'Partnerships · Gharauni',
  description: 'Partner with Gharauni to reach 30M+ rural property cardholders. Lenders, NBFCs, insurers, fintechs.'
};

const fields: LeadField[] = [
  { name: 'name', label: 'Your name', required: true, gridCols: 1 },
  { name: 'role', label: 'Your role', required: true, gridCols: 1, placeholder: 'e.g. Head of Rural Credit' },
  { name: 'organization', label: 'Organization', required: true, gridCols: 1, placeholder: 'Bank / NBFC / Insurer / Fintech' },
  { name: 'partnerType', label: 'Partnership type', type: 'select', required: true, gridCols: 1, options: [
    { value: 'lender', label: 'Lender (bank, NBFC, HFC) - rural loans' },
    { value: 'insurer', label: 'Insurer - rural property cover' },
    { value: 'enterprise-api', label: 'Enterprise API (title verification or parser)' },
    { value: 'distribution', label: 'Distribution channel (agents, BCs, CSCs)' },
    { value: 'media', label: 'Media / content partner' },
    { value: 'other', label: 'Other' },
  ] },
  { name: 'email', label: 'Work email', type: 'email', required: true, gridCols: 1 },
  { name: 'phone', label: 'Phone', type: 'tel', required: true, gridCols: 1, placeholder: '+91 XXXXX XXXXX' },
  { name: 'goals', label: 'What are you hoping to achieve?', type: 'textarea', required: true, placeholder: 'For example: We want to acquire 5,000 SVAMITVA-backed loan customers per month across UP and Bihar at sub-Rs 500 CAC.' },
  { name: 'timeline', label: 'Timeline', type: 'select', required: false, gridCols: 1, options: [
    { value: 'now', label: 'Ready to launch within 30 days' },
    { value: 'quarter', label: 'Within this quarter' },
    { value: 'exploring', label: 'Exploring - 3-6 months out' },
  ] },
];

export default function PartnersPage() {
  return (
    <Shell>
      <section className="border-b border-ink/10 bg-paper">
        <div className="absolute inset-0 bg-gradient-to-br from-terracotta/8 via-paper to-paper pointer-events-none" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-terracotta/30 bg-terracotta/5 px-3 py-1 text-xs font-medium text-terracotta mb-4">
              <Building2 className="w-3.5 h-3.5" /> Partnerships
            </div>
            <h1 className="font-serif text-4xl lg:text-5xl text-ink leading-tight">
              Reach 30 crore rural property cardholders.
            </h1>
            <p className="mt-3 font-serif text-lg text-ink/70 italic">India&apos;s only platform dedicated to SVAMITVA cardholders.</p>
            <p className="mt-6 text-ink/80 max-w-2xl">
              We work with banks, NBFCs, insurers, and fintechs to connect their products with the 30M+ Indians who now hold legal title to their village homes. If you serve rural India, talk to us.
            </p>
          </div>
        </div>
      </section>

      {/* Why partner */}
      <section className="border-b border-ink/10 bg-ink/[0.015]">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-serif text-3xl text-ink">Why partner with Gharauni</h2>
            <p className="mt-2 text-ink/60">A new asset class. A defined audience. A clean acquisition channel.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-lg border border-ink/10 bg-paper p-7">
              <Users className="w-6 h-6 text-terracotta mb-4" />
              <h3 className="font-serif text-xl text-ink mb-2">High-intent audience</h3>
              <p className="text-sm text-ink/70 leading-relaxed">Cardholders actively looking for loans, insurance, and verified buyers. Not browsing - transacting.</p>
            </div>
            <div className="rounded-lg border border-ink/10 bg-paper p-7">
              <Shield className="w-6 h-6 text-terracotta mb-4" />
              <h3 className="font-serif text-xl text-ink mb-2">Pre-verified collateral</h3>
              <p className="text-sm text-ink/70 leading-relaxed">Every cardholder has government-issued title. Reduces your underwriting risk by an order of magnitude.</p>
            </div>
            <div className="rounded-lg border border-ink/10 bg-paper p-7">
              <TrendingUp className="w-6 h-6 text-terracotta mb-4" />
              <h3 className="font-serif text-xl text-ink mb-2">Measurable funnel</h3>
              <p className="text-sm text-ink/70 leading-relaxed">Per-source lead tagging, conversion analytics, fixed-CAC pricing options. No vague impression-based deals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who we work with */}
      <section className="border-b border-ink/10 bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="font-serif text-3xl text-ink">Who we work with</h2>
            <p className="mt-2 text-ink/60">Four kinds of partners. Five revenue models.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="rounded-lg border border-ink/10 bg-paper p-6">
              <div className="text-[11px] uppercase tracking-widest text-terracotta/80 font-medium mb-2">Lenders</div>
              <h3 className="font-serif text-lg text-ink mb-2">Banks, NBFCs, HFCs</h3>
              <p className="text-sm text-ink/70 mb-3">Acquire SVAMITVA-backed loan customers. Pay per qualified lead or per disbursed loan. 11 partners already integrated.</p>
              <p className="text-xs text-ink/55"><strong>Typical model:</strong> Rs 500-3000 CPL, or 0.5-1.5% of disbursed amount.</p>
            </div>
            <div className="rounded-lg border border-ink/10 bg-paper p-6">
              <div className="text-[11px] uppercase tracking-widest text-terracotta/80 font-medium mb-2">Insurers</div>
              <h3 className="font-serif text-lg text-ink mb-2">Property insurance</h3>
              <p className="text-sm text-ink/70 mb-3">Rural homes were uninsurable before SVAMITVA. We bring you policyholders who finally have the title to qualify.</p>
              <p className="text-xs text-ink/55"><strong>Typical model:</strong> 12-18% commission on premium.</p>
            </div>
            <div className="rounded-lg border border-ink/10 bg-paper p-6">
              <div className="text-[11px] uppercase tracking-widest text-terracotta/80 font-medium mb-2">Enterprise</div>
              <h3 className="font-serif text-lg text-ink mb-2">B2B API access</h3>
              <p className="text-sm text-ink/70 mb-3">Title verification API for your underwriting team. PDF parser API for your LOS. Volume pricing.</p>
              <p className="text-xs text-ink/55"><strong>Typical model:</strong> Rs 50-500 per API call, contract pricing at scale.</p>
            </div>
            <div className="rounded-lg border border-ink/10 bg-paper p-6">
              <div className="text-[11px] uppercase tracking-widest text-terracotta/80 font-medium mb-2">Distribution</div>
              <h3 className="font-serif text-lg text-ink mb-2">Agents and CSCs</h3>
              <p className="text-sm text-ink/70 mb-3">Common Service Centres, banking correspondents, village-level entrepreneurs. White-label our tools.</p>
              <p className="text-xs text-ink/55"><strong>Typical model:</strong> Revenue share on commissions earned.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-14 grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-14">
          <div className="rounded-lg border border-ink/10 bg-paper p-7 lg:p-9">
            <h2 className="font-serif text-2xl text-ink mb-1">Tell us about your partnership</h2>
            <p className="text-sm text-ink/60 mb-7">We will respond within 2 business days with a custom proposal.</p>
            <LeadForm
              source="partnership"
              fields={fields}
              submitLabel="Start the conversation"
              successHeadline="Partnership inquiry received"
              successHeadlineHi="अनुरोध मिला"
              successBody="Our partnerships team will reach out within 2 business days. For urgent integrations, mention &quot;launching this month&quot; in your message and we will prioritize."
            />
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border border-ink/10 bg-ink/[0.015] p-6">
              <div className="text-[11px] uppercase tracking-widest text-terracotta/80 font-medium mb-3">Already integrated</div>
              <p className="text-sm text-ink/75 mb-3">11 lenders accepting SVAMITVA cards through our platform. Among them:</p>
              <ul className="text-sm text-ink/70 space-y-1">
                <li>Bajaj Finserv, Tata Capital, Aditya Birla</li>
                <li>Kotak, HDFC, ICICI, Axis</li>
                <li>PNB Housing, IIFL, L&amp;T, Cholamandalam</li>
              </ul>
            </div>

            <div className="rounded-lg border border-ink/10 bg-ink/[0.015] p-6">
              <IndianRupee className="w-5 h-5 text-terracotta mb-2" />
              <div className="text-[11px] uppercase tracking-widest text-terracotta/80 font-medium mb-2">The opportunity</div>
              <p className="text-sm text-ink/75">Rs 132 lakh crore in newly bankable rural collateral. 30M+ titled homes. Less than 5% currently served by formal credit. The TAM is enormous and underserved.</p>
            </div>

            <div className="text-xs text-ink/55 leading-relaxed">
              <p>Press, legal, or general support? Use our <a href="/contact" className="underline hover:text-terracotta">contact page</a> instead.</p>
            </div>
          </div>
        </div>
      </section>
    </Shell>
  );
}
