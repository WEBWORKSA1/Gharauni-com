import { Zap, Key, BookOpen, Github } from 'lucide-react';
import { Shell } from '@/components/shell';
import { LeadForm, LeadField } from '@/components/lead-form';
import Link from 'next/link';

const fields: LeadField[] = [
  { name: 'email', label: 'Work email', type: 'email', required: true, placeholder: 'you@company.com', helpText: 'API key will be sent here.' },
  { name: 'name', label: 'Your name', required: true, gridCols: 1 },
  { name: 'company', label: 'Company', required: true, gridCols: 1, placeholder: 'Optional if independent' },
  { name: 'useCase', label: 'What will you use the parser for?', type: 'select', required: true, options: [
    { value: 'rural-lending', label: 'Rural lending / LOS integration' },
    { value: 'kyc', label: 'KYC / onboarding for fintech' },
    { value: 'insurance', label: 'Insurance underwriting' },
    { value: 'legal-tech', label: 'Legal-tech / dispute analytics' },
    { value: 'research', label: 'Academic / research' },
    { value: 'other', label: 'Other' },
  ] },
  { name: 'volume', label: 'Expected monthly volume', type: 'select', required: true, gridCols: 1, options: [
    { value: 'trial', label: 'Trial only (free 50/month)' },
    { value: 'starter', label: '50–5,000/month (Starter)' },
    { value: 'growth', label: '5k–50k/month (Growth)' },
    { value: 'enterprise', label: '50k+/month (Enterprise)' },
  ] },
];

export default function ParserSignupPage() {
  return (
    <Shell>
      <section className="border-b border-ink/10 bg-paper">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-paper to-paper pointer-events-none" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 py-14">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-700/30 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-800 mb-4">
              <Zap className="w-3.5 h-3.5" /> Free trial · 50 parses · No credit card
            </div>
            <h1 className="font-serif text-4xl lg:text-5xl text-ink leading-tight">
              Get your Gharauni Parser API key.
            </h1>
            <p className="mt-5 text-ink/80 max-w-2xl">
              Sign up, get an API key in your inbox, start parsing PDFs in under 5 minutes. Free tier: 50 parses/month forever. Upgrade anytime.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-12 grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-14">
          <div className="rounded-lg border border-ink/10 bg-paper p-7 lg:p-9">
            <h2 className="font-serif text-2xl text-ink mb-1">Sign up for the trial</h2>
            <p className="text-sm text-ink/60 mb-7">We\'ll email your API key within 10 minutes.</p>
            <LeadForm
              source="parser-signup"
              fields={fields}
              submitLabel="Get API key"
              successHeadline="Check your inbox"
              successHeadlineHi="ईमेल चेक करें"
              successBody="We\'ve sent your API key and a 5-minute quickstart guide. If you don\'t see it within 15 minutes, check spam or email hello@gharauni.com."
            />
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border border-ink/10 bg-ink/[0.015] p-6">
              <div className="text-[11px] uppercase tracking-widest text-terracotta/80 font-medium mb-3">Free tier includes</div>
              <ul className="space-y-3 text-sm text-ink/75">
                <li className="flex items-start gap-2"><Key className="w-4 h-4 text-terracotta mt-0.5 flex-shrink-0" /><span><strong className="text-ink">50 parses/month</strong> · renewed monthly, never expires</span></li>
                <li className="flex items-start gap-2"><Zap className="w-4 h-4 text-terracotta mt-0.5 flex-shrink-0" /><span><strong className="text-ink">Full feature access</strong> · same accuracy as paid tier</span></li>
                <li className="flex items-start gap-2"><BookOpen className="w-4 h-4 text-terracotta mt-0.5 flex-shrink-0" /><span><strong className="text-ink">Quickstart guide</strong> · Python + Node.js SDK examples</span></li>
              </ul>
              <div className="mt-4 pt-4 border-t border-ink/10">
                <Link href="/parser/docs" className="inline-flex items-center gap-1 text-sm text-terracotta hover:underline">
                  <BookOpen className="w-3.5 h-3.5" /> Read the API docs first
                </Link>
              </div>
            </div>
            <p className="text-xs text-ink/55 leading-relaxed">
              By signing up you agree to our <Link href="/terms" className="underline">Terms</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>. We never train our models on your customer data.
            </p>
          </div>
        </div>
      </section>
    </Shell>
  );
}
