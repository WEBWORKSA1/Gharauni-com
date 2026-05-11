import { Shield, FileCheck, Clock, IndianRupee } from 'lucide-react';
import { Shell } from '@/components/shell';
import { LeadForm, LeadField } from '@/components/lead-form';

const fields: LeadField[] = [
  { name: 'gharauniId', label: 'Gharauni Card ID (13 digits)', labelHi: 'घरौनी आईडी', required: true, placeholder: 'e.g. 091434-78921-04', helpText: 'On the front of the card, usually formatted XXXXXX-XXXXX-XX.' },
  { name: 'name', label: 'Your full name', labelHi: 'अपना नाम', required: true, gridCols: 1 },
  { name: 'phone', label: 'Mobile number', labelHi: 'मोबाइल नंबर', type: 'tel', required: true, gridCols: 1, placeholder: '+91 XXXXX XXXXX' },
  { name: 'email', label: 'Email', type: 'email', required: true, gridCols: 1, placeholder: 'you@example.com' },
  { name: 'purpose', label: 'Why are you checking this?', labelHi: 'कारण', type: 'select', required: true, gridCols: 1, options: [
    { value: 'buying', label: 'I am buying this property' },
    { value: 'lending', label: 'I am lending against it' },
    { value: 'inheritance', label: 'Inheritance / family dispute' },
    { value: 'verification', label: 'General verification' },
    { value: 'other', label: 'Other' },
  ] },
  { name: 'notes', label: 'Anything else we should know?', labelHi: 'अन्य जानकारी', type: 'textarea', placeholder: 'Optional. e.g. "Seller says paperwork is from before SVAMITVA, want to confirm."' },
];

export default function TitleCheckPage() {
  return (
    <Shell>
      <section className="border-b border-ink/10 bg-paper">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-paper to-paper pointer-events-none" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 py-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-green-700/30 bg-green-50 px-3 py-1 text-xs font-medium text-green-800 mb-4">
              <Shield className="w-3.5 h-3.5" /> ₹499 · 24–48 hour turnaround
            </div>
            <h1 className="font-serif text-3xl lg:text-4xl text-ink leading-tight">
              Order a title check
            </h1>
            <p className="mt-2 text-ink/70">
              एक घरौनी की जाँच करवाएं। Cross-checked against SVAMITVA + state Bhulekh + dispute records. Signed PDF report by email and WhatsApp.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-12 grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-14">
          <div className="rounded-lg border border-ink/10 bg-paper p-7 lg:p-9">
            <h2 className="font-serif text-2xl text-ink mb-1">Your details</h2>
            <p className="text-sm text-ink/60 mb-7">We\'ll verify the card and email you the signed report.</p>
            <LeadForm
              source="title-check"
              fields={fields}
              submitLabel="Submit · ₹499 will be invoiced"
              successHeadline="Order received"
              successHeadlineHi="ऑर्डर मिल गया"
              successBody="We\'ll send a UPI payment link within an hour. Once paid, your report is delivered within 24-48 hours by email and WhatsApp."
              preSubmit={
                <div className="rounded-md bg-ink/[0.03] border border-ink/10 p-4 text-sm text-ink/75 flex items-start gap-3">
                  <IndianRupee className="w-4 h-4 mt-0.5 text-terracotta flex-shrink-0" />
                  <div>
                    <div className="font-medium text-ink">₹499 invoiced after submission</div>
                    <p className="text-xs text-ink/60 mt-1">We send a UPI/Razorpay link to your phone. Report begins after payment. Free cancellation before payment.</p>
                  </div>
                </div>
              }
            />
          </div>

          <div className="space-y-6">
            <div className="rounded-lg border border-ink/10 bg-ink/[0.015] p-6">
              <div className="text-[11px] uppercase tracking-widest text-terracotta/80 font-medium mb-3">What you get</div>
              <ul className="space-y-3 text-sm text-ink/75">
                <li className="flex items-start gap-2"><FileCheck className="w-4 h-4 text-terracotta mt-0.5 flex-shrink-0" /><span>Signed PDF report verifying card validity</span></li>
                <li className="flex items-start gap-2"><Shield className="w-4 h-4 text-terracotta mt-0.5 flex-shrink-0" /><span>Encumbrance + dispute flag analysis</span></li>
                <li className="flex items-start gap-2"><Clock className="w-4 h-4 text-terracotta mt-0.5 flex-shrink-0" /><span>Delivery in 24-48 hours</span></li>
              </ul>
            </div>
            <div className="text-xs text-ink/55 leading-relaxed">
              <p className="mb-2"><strong className="text-ink/70">Refund policy:</strong> If we cannot verify the card (e.g., it doesn\'t exist or is too damaged), we refund 100% within 48 hours.</p>
              <p><strong className="text-ink/70">Privacy:</strong> Your data processed under DPDP Act 2023. Card ID never shared.</p>
            </div>
          </div>
        </div>
      </section>
    </Shell>
  );
}
