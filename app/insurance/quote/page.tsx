import { Umbrella, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Shell } from '@/components/shell';
import { LeadForm, LeadField } from '@/components/lead-form';
import { WaitlistBanner } from '@/components/waitlist-banner';

const fields: LeadField[] = [
  { name: 'gharauniId', label: 'Gharauni Card ID', labelHi: 'घरौनी आईडी', required: true, placeholder: 'e.g. 091434-78921-04', helpText: '13-digit ID on the front of your card' },
  { name: 'name', label: 'Your name', labelHi: 'अपना नाम', required: true, gridCols: 1 },
  { name: 'phone', label: 'Mobile', labelHi: 'मोबाइल', type: 'tel', required: true, gridCols: 1, placeholder: '+91 XXXXX XXXXX' },
  { name: 'email', label: 'Email', type: 'email', required: true, gridCols: 1 },
  { name: 'state', label: 'State', labelHi: 'राज्य', type: 'select', required: true, gridCols: 1, options: [
    { value: 'uttar-pradesh', label: 'Uttar Pradesh' },
    { value: 'madhya-pradesh', label: 'Madhya Pradesh' },
    { value: 'maharashtra', label: 'Maharashtra' },
    { value: 'haryana', label: 'Haryana' },
    { value: 'karnataka', label: 'Karnataka' },
    { value: 'rajasthan', label: 'Rajasthan' },
    { value: 'other', label: 'Other' },
  ] },
  { name: 'constructionType', label: 'Construction type', labelHi: 'निर्माण प्रकार', type: 'select', required: true, gridCols: 1, options: [
    { value: 'pucca', label: 'Pucca (brick/concrete) · पक्का' },
    { value: 'mixed', label: 'Mixed (brick walls + thatched roof)' },
    { value: 'kachha', label: 'Kachha (mud/thatched) · कच्चा' },
  ] },
  { name: 'areaSqYd', label: 'Approx area (sq yards)', labelHi: 'क्षेत्रफल', type: 'number', required: true, gridCols: 1, placeholder: 'e.g. 200' },
  { name: 'yearBuilt', label: 'Year built (approx)', labelHi: 'निर्माण वर्ष', type: 'number', gridCols: 1, placeholder: 'e.g. 2010' },
  { name: 'sumInsured', label: 'Desired cover amount', labelHi: 'बीमा राशि', type: 'select', required: true, gridCols: 1, options: [
    { value: '1L', label: '₹1 lakh' },
    { value: '3L', label: '₹3 lakh' },
    { value: '5L', label: '₹5 lakh' },
    { value: '10L', label: '₹10 lakh' },
    { value: '25L+', label: '₹25 lakh or more' },
  ] },
  { name: 'addOns', label: 'Add-on covers needed?', labelHi: 'अतिरिक्त कवर', type: 'select', gridCols: 1, options: [
    { value: 'none', label: 'Standard cover only' },
    { value: 'theft', label: 'Add theft / burglary' },
    { value: 'contents', label: 'Add contents (furniture, electronics)' },
    { value: 'all', label: 'All add-ons' },
  ] },
];

export default function InsuranceQuotePage() {
  return (
    <Shell>
      <WaitlistBanner
        service="Rural home insurance comparison"
        whatHappensNow="Insurer integrations are in progress. Your details secure your spot for first-look quotes."
      />
      <section className="border-b border-ink/10 bg-paper">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-paper to-paper pointer-events-none" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 py-14">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-700/30 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800 mb-4">
              <Umbrella className="w-3.5 h-3.5" /> Quotes when launched · from 6 insurers we are integrating with
            </div>
            <h1 className="font-serif text-4xl lg:text-5xl text-ink leading-tight">
              Get insurance quotes for your home.
            </h1>
            <p className="mt-2 font-serif text-lg text-ink/70 italic">Compare 6 insurers when we launch.</p>
            <p className="mt-5 text-ink/80 max-w-2xl">
              अपने घर की कुछ जानकारी दें। We are integrating with HDFC ERGO, ICICI Lombard, Bajaj Allianz, SBI General, New India Assurance, and United India. Submit your details to be first in line for quotes.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-12 grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-14">
          <div className="rounded-lg border border-ink/10 bg-paper p-7 lg:p-9">
            <h2 className="font-serif text-2xl text-ink mb-1">Property details</h2>
            <p className="text-sm text-ink/60 mb-7">Takes 2 minutes. No payment requested today.</p>
            <LeadForm
              source="insurance-quote-waitlist"
              fields={fields}
              submitLabel="Reserve my quote spot"
              successHeadline="You are on the waitlist"
              successHeadlineHi="आप सूची में हैं"
              successBody="When insurer integrations go live, we will email and WhatsApp you a side-by-side comparison of premiums. No obligation — pick any insurer you want, or skip entirely."
            />
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border border-ink/10 bg-ink/[0.015] p-6">
              <div className="text-[11px] uppercase tracking-widest text-terracotta/80 font-medium mb-3">Expected premium ranges (at launch)</div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-ink/75"><span>200 sq yd pucca · ₹5L cover</span><span className="text-ink font-medium">₹1,200–1,800/yr</span></div>
                <div className="flex justify-between text-ink/75"><span>300 sq yd pucca · ₹10L cover</span><span className="text-ink font-medium">₹2,200–3,500/yr</span></div>
                <div className="flex justify-between text-ink/75"><span>Flood-prone district surcharge</span><span className="text-ink font-medium">+15–30%</span></div>
              </div>
              <p className="text-xs text-ink/50 mt-3 pt-3 border-t border-ink/10">Indicative figures based on published insurer rate cards. Final premiums will be quoted by the insurer.</p>
            </div>
            <div className="rounded-md bg-amber-50 border border-amber-200 p-4 text-xs text-amber-900">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                <p><strong className="font-medium">Kachha houses:</strong> Limited cover (fire + theft only). Flood cover usually not available for fully kachha construction.</p>
              </div>
            </div>
            <div className="text-xs text-ink/55">
              <p className="flex items-start gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 mt-0.5 text-green-700 flex-shrink-0" /> Free comparison service. We will earn commission from the insurer only if you choose to buy.</p>
            </div>
          </div>
        </div>
      </section>
    </Shell>
  );
}
