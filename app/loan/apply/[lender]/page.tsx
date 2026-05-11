import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CheckCircle2, Clock, IndianRupee, Percent, Shield, AlertCircle } from 'lucide-react';
import { Shell } from '@/components/shell';
import { LeadForm, LeadField } from '@/components/lead-form';
import { LENDERS } from '@/lib/mock-data';

type Params = { lender: string };
type Search = { amount?: string; tenure?: string };

function calcEMI(rate: number, principal: number, months: number): number {
  const r = rate / 12 / 100;
  if (r === 0) return Math.round(principal / months);
  return Math.round((principal * r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1));
}

const inrFmt = (n: number) => `\u20b9${n.toLocaleString('en-IN')}`;

export function generateStaticParams() {
  return LENDERS.map((l) => ({ lender: l.slug }));
}

export default function LoanApplyPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: Search;
}) {
  const lender = LENDERS.find((l) => l.slug === params.lender);
  if (!lender) return notFound();

  const amount = Math.max(200000, Math.min(5000000, Number(searchParams.amount) || 500000));
  const tenure = Math.max(12, Math.min(240, Number(searchParams.tenure) || 60));
  const emi = calcEMI(lender.rate, amount, tenure);
  const totalPayable = emi * tenure;
  const totalInterest = totalPayable - amount;
  const processingFeeAmount = Math.round((amount * lender.processingFee) / 100);

  const fields: LeadField[] = [
    { name: 'name', label: 'Full name (as on Gharauni)', labelHi: 'नाम', required: true, gridCols: 1 },
    { name: 'phone', label: 'Mobile (WhatsApp preferred)', labelHi: 'मोबाइल', type: 'tel', required: true, gridCols: 1, placeholder: '+91 XXXXX XXXXX' },
    { name: 'email', label: 'Email', type: 'email', required: true, gridCols: 1 },
    { name: 'gharauniId', label: 'Gharauni Card ID', labelHi: 'घरौनी आईडी', required: true, gridCols: 1, placeholder: 'e.g. 091434-78921-04' },
    { name: 'employmentType', label: 'Employment type', labelHi: 'रोजगार प्रकार', type: 'select', required: true, gridCols: 1, options: [
      { value: 'salaried', label: 'Salaried · नौकरी' },
      { value: 'self-employed', label: 'Self-employed business' },
      { value: 'farmer', label: 'Farmer / agricultural income' },
      { value: 'professional', label: 'Doctor / lawyer / professional' },
      { value: 'other', label: 'Other' },
    ] },
    { name: 'monthlyIncome', label: 'Approx monthly income (₹)', labelHi: 'मासिक आय', type: 'number', required: true, gridCols: 1, placeholder: 'e.g. 25000' },
    { name: 'purpose', label: 'Loan purpose', labelHi: 'उद्देश्य', type: 'select', required: true, options: [
      { value: 'home-improvement', label: 'Home construction / improvement' },
      { value: 'business', label: 'Business expansion / working capital' },
      { value: 'education', label: 'Education for children' },
      { value: 'medical', label: 'Medical expenses' },
      { value: 'wedding', label: 'Wedding / family event' },
      { value: 'debt-consolidation', label: 'Debt consolidation' },
      { value: 'other', label: 'Other' },
    ] },
    { name: 'notes', label: 'Anything else?', type: 'textarea', placeholder: 'Optional. Co-applicant, existing loans, etc.' },
  ];

  const lenderUnderwriting = lender.name + "'s underwriting";

  return (
    <Shell>
      <section className="border-b border-ink/10 bg-paper">
        <div className="absolute inset-0 bg-gradient-to-br from-terracotta/8 via-paper to-paper pointer-events-none" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 py-8">
          <Link href="/loan" className="text-sm text-ink/60 hover:text-terracotta inline-flex items-center gap-1 mb-3">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to all lenders
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="text-[11px] uppercase tracking-widest text-terracotta/80 font-medium mb-1">Apply to</div>
              <h1 className="font-serif text-3xl lg:text-4xl text-ink">{lender.name}</h1>
              {lender.bestFor && <p className="text-ink/65 mt-1">Best for: {lender.bestFor}</p>}
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-ink/5 text-ink/70 px-3 py-1 text-xs">{lender.type}</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-terracotta/10 text-terracotta px-3 py-1 text-xs font-medium">RBI-registered</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-10 grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-14">
          <div className="rounded-lg border border-ink/10 bg-paper p-7 lg:p-9">
            <h2 className="font-serif text-2xl text-ink mb-1">Your application</h2>
            <p className="text-sm text-ink/60 mb-7">We forward your details to {lender.name} and follow up within 24 hours.</p>
            <LeadForm
              source={`loan-apply:${lender.slug}`}
              fields={fields}
              submitLabel={`Submit application to ${lender.name}`}
              successHeadline="Application received"
              successHeadlineHi="आवेदन मिला"
              successBody={`Our team will forward your details to ${lender.name} and call you within 24 hours. Approval typically takes 48-72 hours from there.`}
              preSubmit={
                <div className="rounded-md bg-ink/[0.03] border border-ink/10 p-4 text-sm text-ink/75 flex items-start gap-3">
                  <Shield className="w-4 h-4 mt-0.5 text-terracotta flex-shrink-0" />
                  <div>
                    <div className="font-medium text-ink">Free service. No fee from you.</div>
                    <p className="text-xs text-ink/60 mt-1">We earn a referral commission from {lender.name} only if your loan is approved. It does not increase your interest rate.</p>
                  </div>
                </div>
              }
            />
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border-2 border-terracotta bg-paper p-6">
              <div className="text-[11px] uppercase tracking-widest text-terracotta/80 font-medium mb-3">Your quote</div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-ink/65">Loan amount</span><span className="text-ink font-medium">{inrFmt(amount)}</span></div>
                <div className="flex justify-between"><span className="text-ink/65">Tenure</span><span className="text-ink font-medium">{tenure} months · {(tenure / 12).toFixed(1)} years</span></div>
                <div className="flex justify-between"><span className="text-ink/65">Interest rate</span><span className="text-ink font-medium">{lender.rate}% p.a.</span></div>
                <div className="flex justify-between"><span className="text-ink/65">Processing fee</span><span className="text-ink font-medium">{lender.processingFee}% · {inrFmt(processingFeeAmount)}</span></div>
              </div>
              <div className="mt-4 pt-4 border-t border-terracotta/15 space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-ink/65 text-sm">Monthly EMI</span>
                  <span className="font-serif text-2xl text-terracotta">{inrFmt(emi)}</span>
                </div>
                <div className="flex justify-between text-xs"><span className="text-ink/55">Total interest</span><span className="text-ink/70">{inrFmt(totalInterest)}</span></div>
                <div className="flex justify-between text-xs"><span className="text-ink/55">Total payable</span><span className="text-ink/70">{inrFmt(totalPayable)}</span></div>
              </div>
              <p className="mt-4 pt-4 border-t border-terracotta/15 text-[11px] text-ink/50 leading-relaxed">
                Indicative. Final rate depends on credit score, property valuation, and {lenderUnderwriting}. Rate range: {lender.rate}–{lender.rateMax}%.
              </p>
            </div>

            <div className="rounded-lg border border-ink/10 bg-ink/[0.015] p-5">
              <h3 className="font-serif text-base text-ink mb-3 flex items-center gap-2"><Clock className="w-4 h-4 text-terracotta" /> Timeline</h3>
              <ol className="space-y-2 text-sm text-ink/75">
                <li><strong className="text-ink">Today:</strong> Submit application here</li>
                <li><strong className="text-ink">Within 24 hr:</strong> {lender.name} representative calls you</li>
                <li><strong className="text-ink">Day 2-3:</strong> Document verification and property valuation</li>
                <li><strong className="text-ink">Day 4-5:</strong> Sanction letter and disbursal</li>
              </ol>
            </div>

            <div className="text-xs text-ink/50 leading-relaxed">
              <p>Want to compare other lenders? <Link href="/loan" className="underline hover:text-terracotta">Back to comparison →</Link></p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-ink/10 bg-ink/[0.015]">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="grid sm:grid-cols-3 gap-4 text-sm text-ink/65">
            <div className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-700 mt-0.5" /><span>No upfront fees. Free service.</span></div>
            <div className="flex items-start gap-2"><Shield className="w-4 h-4 text-green-700 mt-0.5" /><span>DPDP Act 2023 compliant. Data encrypted.</span></div>
            <div className="flex items-start gap-2"><AlertCircle className="w-4 h-4 text-amber-700 mt-0.5" /><span>We never ask for OTP or Aadhaar number.</span></div>
          </div>
        </div>
      </section>
    </Shell>
  );
}
