import { Building2, Users, Zap, TrendingUp } from 'lucide-react';
import { Shell } from '@/components/shell';
import { LeadForm, LeadField } from '@/components/lead-form';

const fields: LeadField[] = [
  { name: 'name', label: 'Your name', required: true, gridCols: 1 },
  { name: 'role', label: 'Your role', required: true, gridCols: 1, placeholder: 'e.g. Head of Rural Credit, Risk' },
  { name: 'organization', label: 'Organization', labelHi: 'संगठन', required: true, gridCols: 1, placeholder: 'Bank / NBFC / HFC' },
  { name: 'email', label: 'Work email', type: 'email', required: true, gridCols: 1 },
  { name: 'phone', label: 'Phone', type: 'tel', required: true, gridCols: 1, placeholder: '+91 XXXXX XXXXX' },
  { name: 'volume', label: 'Expected monthly check volume', type: 'select', required: true, gridCols: 1, options: [
    { value: '50-500', label: '50–500 checks/month' },
    { value: '500-5000', label: '500–5,000 checks/month' },
    { value: '5000-50000', label: '5,000–50,000 checks/month' },
    { value: '50000+', label: '50,000+ checks/month' },
  ] },
  { name: 'useCase', label: 'Use case', type: 'textarea', required: true, placeholder: 'Briefly describe what you want to use title verification for. e.g., "Pre-disbursal collateral verification for our ₹5L–50L LAP product across UP and Bihar."' },
];

export default function TitleEnterprisePage() {
  return (
    <Shell>
      <section className="border-b border-ink/10 bg-paper">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-paper to-paper pointer-events-none" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 py-14">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-green-700/30 bg-green-50 px-3 py-1 text-xs font-medium text-green-800 mb-4">
              <Building2 className="w-3.5 h-3.5" /> Enterprise · For banks, NBFCs, HFCs
            </div>
            <h1 className="font-serif text-4xl lg:text-5xl text-ink leading-tight">
              Title verification at scale.
            </h1>
            <p className="mt-2 font-serif text-lg text-ink/70 italic">API access, batch processing, dedicated SLA.</p>
            <p className="mt-5 text-ink/80 max-w-2xl">
              We work with 14 banks and NBFCs to verify Gharauni-backed collateral before disbursal. Median 8-second per-check turnaround via API. Custom SLA. Dedicated account manager. Volume pricing from ₹100/check at 5,000+/month.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-12 grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-14">
          <div className="rounded-lg border border-ink/10 bg-paper p-7 lg:p-9">
            <h2 className="font-serif text-2xl text-ink mb-1">Talk to our enterprise team</h2>
            <p className="text-sm text-ink/60 mb-7">We\'ll respond within one business day with a custom proposal.</p>
            <LeadForm
              source="title-enterprise"
              fields={fields}
              submitLabel="Request a call"
              successHeadline="Request received"
              successHeadlineHi="अनुरोध मिला"
              successBody="Our enterprise team will reach out within one business day with a custom pricing proposal and an API sandbox key."
            />
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border border-ink/10 bg-ink/[0.015] p-6">
              <div className="text-[11px] uppercase tracking-widest text-terracotta/80 font-medium mb-3">What enterprise gets</div>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Zap className="w-4 h-4 text-terracotta mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-ink">REST API + batch endpoints</div>
                    <p className="text-xs text-ink/60 mt-0.5">Sync verification in 8s median, batch up to 10k cards async.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Users className="w-4 h-4 text-terracotta mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-ink">Dedicated account manager</div>
                    <p className="text-xs text-ink/60 mt-0.5">One person who knows your workflow and integration.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <TrendingUp className="w-4 h-4 text-terracotta mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-ink">Volume pricing</div>
                    <p className="text-xs text-ink/60 mt-0.5">From ₹100/check at 5k+/month, down to ₹50/check at 50k+/month.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="text-xs text-ink/55">
              <p>Already integrated by: 3 NBFCs and 1 PSU bank (case studies under NDA). Reach out to learn more.</p>
            </div>
          </div>
        </div>
      </section>
    </Shell>
  );
}
