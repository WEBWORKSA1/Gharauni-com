import Link from 'next/link';
import type { Metadata } from 'next';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Privacy Policy · गोपनीयता नीति',
  description: 'How Gharauni.com collects, uses, stores, and protects your data. DPDP Act 2023 compliant.'
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mono text-xs text-terracotta-600 tracking-widest mb-3">LEGAL · PRIVACY POLICY</div>
          <h1 className="display text-4xl sm:text-5xl m-0 mb-3 leading-tight">Privacy Policy</h1>
          <p className="text-sm text-ink-500 mb-10">Last updated: 10 May 2026 · Compliant with DPDP Act, 2023</p>

          <div className="prose-block space-y-6 text-ink-800 leading-relaxed">
            <Section title="1. Who we are">
              Gharauni.com (“we”, “us”, “our”) is an independent aggregator platform operated by WebWorks providing services around India’s SVAMITVA Scheme. We are not affiliated with the Government of India, the Ministry of Panchayati Raj, or any state government.
            </Section>
            <Section title="2. Information we collect">
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Contact data:</strong> name, mobile number, email, when you submit any form on this site.</li>
                <li><strong>Property data:</strong> village, state, district, Gharauni ID — only when you voluntarily enter it.</li>
                <li><strong>Technical data:</strong> IP address, browser, device, referrer URL, for security and analytics.</li>
                <li>We <strong>do not</strong> collect Aadhaar, PAN, bank account numbers, or biometric data on this site.</li>
              </ul>
            </Section>
            <Section title="3. How we use it">
              <ul className="list-disc pl-6 space-y-1">
                <li>To connect you with lender, insurer, or service partners you explicitly request.</li>
                <li>To send you the status of any service request you initiated.</li>
                <li>To improve site performance and content via aggregate analytics.</li>
              </ul>
            </Section>
            <Section title="4. Who sees your data">
              <p>
                When you submit a loan, insurance, or service request, your contact information is shared <strong>only</strong> with the specific partner you selected (e.g., Bajaj Finserv for a loan inquiry).
              </p>
              <p>We <strong>do not</strong> sell your data to data brokers, lead farms, or third-party advertisers.</p>
            </Section>
            <Section title="5. Your rights under DPDP Act">
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Access:</strong> Submit our contact form to receive a copy of what we hold on you.</li>
                <li><strong>Correction:</strong> Submit our contact form to fix any inaccurate data.</li>
                <li><strong>Erasure:</strong> Submit our contact form to delete your data (subject to lender retention rules).</li>
                <li><strong>Withdraw consent:</strong> You may withdraw consent for marketing communication anytime.</li>
              </ul>
              <p>To exercise any of these rights, use our <Link href="/contact" className="text-terracotta-600 underline">contact form</Link> and select “Legal / privacy / DPDP request” as the topic. We respond within one business day.</p>
            </Section>
            <Section title="6. Data retention">
              We retain lead data for up to 24 months from last activity. Analytics data is anonymized after 14 months.
            </Section>
            <Section title="7. Cookies">
              We use first-party cookies for session management and Plausible Analytics (which does not use cookies for cross-site tracking). We do not run advertising trackers on first-party pages.
            </Section>
            <Section title="8. Children">
              Gharauni.com is not directed at children under 18. We do not knowingly collect data from minors.
            </Section>
            <Section title="9. Changes">
              We will update this page when policies change. Material changes will be notified via banner on the homepage.
            </Section>
            <Section title="10. Contact">
              <p>Data Protection Officer · WebWorks (Gharauni Platform)</p>
              <p>Use our <Link href="/contact" className="text-terracotta-600 underline">contact form</Link> and select “Legal / privacy / DPDP request”.</p>
            </Section>
          </div>

          <div className="mt-12 flex gap-3 flex-wrap">
            <Link href="/terms" className="btn-ghost">Read Terms of Service</Link>
            <Link href="/" className="btn-primary">Home</Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="display text-2xl mb-3 text-ink-900">{title}</h2>
      <div className="text-[15px] space-y-3">{children}</div>
    </div>
  );
}
