import type { Metadata } from 'next';
import { Mail, MessageCircle, Shield, Clock } from 'lucide-react';
import { Shell } from '@/components/shell';
import { LeadForm, LeadField } from '@/components/lead-form';

export const metadata: Metadata = {
  title: 'Contact · संपर्क करें',
  description: 'Contact Gharauni.com — partnerships, support, press, or legal. We respond within one business day.'
};

const fields: LeadField[] = [
  { name: 'name', label: 'Your name', labelHi: 'आपका नाम', required: true, gridCols: 1 },
  { name: 'email', label: 'Email', type: 'email', required: true, gridCols: 1, placeholder: 'you@example.com' },
  { name: 'phone', label: 'Phone or WhatsApp', labelHi: 'फ़ोन / WhatsApp', type: 'tel', gridCols: 1, placeholder: '+91 XXXXX XXXXX (optional)' },
  { name: 'topic', label: 'What is this about?', labelHi: 'विषय', type: 'select', required: true, gridCols: 1, options: [
    { value: 'support', label: 'Support / question about my Gharauni' },
    { value: 'partnership', label: 'Partnership (lender, insurer, NBFC)' },
    { value: 'enterprise', label: 'Enterprise (B2B title or parser API)' },
    { value: 'press', label: 'Press / media inquiry' },
    { value: 'legal', label: 'Legal / privacy / DPDP request' },
    { value: 'feedback', label: 'Feedback / feature suggestion' },
    { value: 'other', label: 'Other' },
  ] },
  { name: 'message', label: 'Message', labelHi: 'संदेश', type: 'textarea', required: true, placeholder: 'Tell us what you need. The more specific, the faster we can help.' },
];

export default function ContactPage() {
  return (
    <Shell>
      <section className="border-b border-ink/10 bg-paper">
        <div className="absolute inset-0 bg-gradient-to-br from-terracotta/8 via-paper to-paper pointer-events-none" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 py-14">
          <div className="max-w-3xl">
            <div className="text-[11px] uppercase tracking-widest text-terracotta/80 font-medium mb-3">Contact</div>
            <h1 className="font-serif text-4xl lg:text-5xl text-ink leading-tight">हमसे संपर्क करें</h1>
            <p className="mt-2 font-serif text-lg text-ink/70 italic">Get in touch.</p>
            <p className="mt-5 text-ink/80 max-w-2xl">
              Partnership, support, press, legal — pick a topic, write your message, and we respond within one business day. हम सब संदेश पढ़ते हैं।
            </p>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-12 grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-14">
          {/* Form */}
          <div className="rounded-lg border border-ink/10 bg-paper p-7 lg:p-9">
            <h2 className="font-serif text-2xl text-ink mb-1">Write to us</h2>
            <p className="text-sm text-ink/60 mb-7">All fields except phone are required.</p>
            <LeadForm
              source="contact"
              fields={fields}
              submitLabel="Send message"
              successHeadline="Message received"
              successHeadlineHi="संदेश मिल गया"
              successBody="We will reply within one business day. For urgent matters, mention &quot;urgent&quot; in the subject and we will prioritize it."
            />
          </div>

          {/* Side info */}
          <div className="space-y-6">
            <div className="rounded-lg border border-ink/10 bg-ink/[0.015] p-6">
              <Clock className="w-5 h-5 text-terracotta mb-3" />
              <h3 className="font-serif text-lg text-ink mb-2">Response times</h3>
              <ul className="space-y-2 text-sm text-ink/70">
                <li><strong className="text-ink">Support:</strong> within 1 business day</li>
                <li><strong className="text-ink">Partnerships:</strong> within 2 business days</li>
                <li><strong className="text-ink">Enterprise:</strong> within 1 business day (with proposal)</li>
                <li><strong className="text-ink">Press:</strong> within 1 business day</li>
              </ul>
            </div>

            <div className="rounded-lg border border-ink/10 bg-ink/[0.015] p-6">
              <MessageCircle className="w-5 h-5 text-terracotta mb-3" />
              <h3 className="font-serif text-lg text-ink mb-2">WhatsApp support</h3>
              <p className="text-sm text-ink/70 mb-3">
                For quick questions in Hindi or English, our WhatsApp line is the fastest way to reach us.
              </p>
              <p className="text-xs text-ink/55">
                We will publish our WhatsApp number once our India operations partner goes live. Until then, the form above is the fastest route.
              </p>
            </div>

            <div className="rounded-lg border border-ink/10 bg-ink/[0.015] p-6">
              <Shield className="w-5 h-5 text-terracotta mb-3" />
              <h3 className="font-serif text-lg text-ink mb-2">Your privacy</h3>
              <p className="text-sm text-ink/70">
                Processed under India&apos;s DPDP Act 2023. We do not sell or share your data. We may follow up once if related to your inquiry.
              </p>
            </div>

            <div className="text-xs text-ink/50 leading-relaxed">
              <p><strong className="text-ink/70">Office:</strong> WebWorks · Gharauni Platform · Markham, Ontario, Canada. India operations partner: TBA.</p>
            </div>
          </div>
        </div>
      </section>
    </Shell>
  );
}
