import { Scale, MessageSquare, Phone, MapPin } from 'lucide-react';
import { Shell } from '@/components/shell';
import { LeadForm, LeadField } from '@/components/lead-form';
import { WaitlistBanner } from '@/components/waitlist-banner';

const fields: LeadField[] = [
  { name: 'name', label: 'Your name', labelHi: 'अपना नाम', required: true, gridCols: 1 },
  { name: 'phone', label: 'Mobile (WhatsApp preferred)', labelHi: 'मोबाइल', type: 'tel', required: true, gridCols: 1, placeholder: '+91 XXXXX XXXXX' },
  { name: 'state', label: 'State', labelHi: 'राज्य', type: 'select', required: true, gridCols: 1, options: [
    { value: 'uttar-pradesh', label: 'Uttar Pradesh' },
    { value: 'madhya-pradesh', label: 'Madhya Pradesh' },
    { value: 'maharashtra', label: 'Maharashtra' },
    { value: 'haryana', label: 'Haryana' },
    { value: 'rajasthan', label: 'Rajasthan' },
    { value: 'other', label: 'Other' },
  ] },
  { name: 'district', label: 'District', labelHi: 'जिला', required: true, gridCols: 1, placeholder: 'e.g. Meerut, Lucknow' },
  { name: 'disputeType', label: 'Type of dispute', labelHi: 'विवाद का प्रकार', type: 'select', required: true, options: [
    { value: 'inheritance', label: 'Inheritance / family partition · विरासत' },
    { value: 'boundary', label: 'Boundary disagreement · सीमा' },
    { value: 'double-claim', label: 'Two parties claiming same plot' },
    { value: 'fraud', label: 'Suspected fraud / forged papers' },
    { value: 'mutation', label: 'Mutation / record correction issue' },
    { value: 'other', label: 'Other' },
  ] },
  { name: 'situation', label: 'Briefly describe your situation', labelHi: 'समस्या का विवरण', type: 'textarea', required: true, placeholder: 'For example: My uncle is claiming my fathers land based on a 30-year-old document. We have the Gharauni in my name. Need help understanding next steps.' },
  { name: 'urgency', label: 'How urgent is this?', type: 'select', required: true, gridCols: 1, options: [
    { value: 'court-pending', label: 'Court case already filed' },
    { value: 'soon', label: 'Need to act within 30 days' },
    { value: 'planning', label: 'Planning ahead' },
  ] },
  { name: 'budget', label: 'Budget for legal help', type: 'select', required: false, gridCols: 1, options: [
    { value: '999', label: '₹999 first consult only' },
    { value: '5k', label: 'Up to ₹5,000' },
    { value: '25k', label: 'Up to ₹25,000' },
    { value: 'open', label: 'Open - depends on case' },
  ] },
];

export default function DisputeLawyerPage() {
  return (
    <Shell>
      <WaitlistBanner
        service="Property lawyer network"
        whatHappensNow="Lawyer verification is in progress. We will match you the moment our network is live."
      />
      <section className="border-b border-ink/10 bg-paper">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-paper to-paper pointer-events-none" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 py-14">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-700/30 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800 mb-4">
              <Scale className="w-3.5 h-3.5" /> Verified lawyer network · ₹999 first consult planned
            </div>
            <h1 className="font-serif text-4xl lg:text-5xl text-ink leading-tight">
              Talk to a verified property lawyer.
            </h1>
            <p className="mt-2 font-serif text-lg text-ink/70 italic">30-minute consultation. Clear next steps. Fixed pricing.</p>
            <p className="mt-5 text-ink/80 max-w-2xl">
              हम आपको सिर्फ़ प्रॉपर्टी वकील से जोड़ेंगे जिनका प्रापर्टी-केस में अनुभव है और जिनका हमने background check किया है। ₹999 में 30 मिनट की पहली consultation — आपको पता चल जाएगा कि आगे क्या करना है और कितना खर्च आएगा। No surprise bills.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-12 grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-14">
          <div className="rounded-lg border border-ink/10 bg-paper p-7 lg:p-9">
            <h2 className="font-serif text-2xl text-ink mb-1">Reserve a consultation</h2>
            <p className="text-sm text-ink/60 mb-7">When our lawyer network is live, the lawyer matched to your district will call within 24 hours.</p>
            <LeadForm
              source="dispute-lawyer-waitlist"
              fields={fields}
              submitLabel="Reserve my consultation"
              successHeadline="You are on the list"
              successHeadlineHi="आप सूची में हैं"
              successBody="As soon as a verified property lawyer is on board in your district, we will connect you. No payment is taken today. First consult will be ₹999, all subsequent fees disclosed in writing before work begins."
            />
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border border-ink/10 bg-ink/[0.015] p-6">
              <div className="text-[11px] uppercase tracking-widest text-terracotta/80 font-medium mb-3">Planned fixed prices</div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-ink/75"><span>30-min consult</span><span className="text-ink font-medium">₹999</span></div>
                <div className="flex justify-between text-ink/75"><span>Drafting partition deed</span><span className="text-ink font-medium">₹5,000–8,000</span></div>
                <div className="flex justify-between text-ink/75"><span>Tehsildar representation</span><span className="text-ink font-medium">₹15,000–25,000</span></div>
                <div className="flex justify-between text-ink/75"><span>Court case (full)</span><span className="text-ink font-medium">By case</span></div>
              </div>
              <p className="text-xs text-ink/55 mt-3 pt-3 border-t border-ink/10">All prices disclosed in writing before work begins. No per-hour billing.</p>
            </div>

            <div className="rounded-lg border border-ink/10 p-6">
              <div className="text-[11px] uppercase tracking-widest text-terracotta/80 font-medium mb-3">Lawyer network status</div>
              <ul className="space-y-2 text-sm text-ink/75">
                <li className="flex items-start gap-2"><MapPin className="w-4 h-4 text-terracotta mt-0.5 flex-shrink-0" /><span>Vetting underway: UP, MH, MP, HR</span></li>
                <li className="flex items-start gap-2"><Scale className="w-4 h-4 text-terracotta mt-0.5 flex-shrink-0" /><span>Criteria: 5+ years rural land disputes, no disciplinary record</span></li>
                <li className="flex items-start gap-2"><MessageSquare className="w-4 h-4 text-terracotta mt-0.5 flex-shrink-0" /><span>WhatsApp + phone, Hindi or English</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Shell>
  );
}
