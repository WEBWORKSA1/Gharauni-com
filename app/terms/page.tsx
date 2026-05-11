import Link from 'next/link';
import type { Metadata } from 'next';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Terms of Service · शर्तें',
  description: 'Terms of use for Gharauni.com aggregator platform.'
};

export default function TermsPage() {
  return (
    <>
      <Nav />
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mono text-xs text-terracotta-600 tracking-widest mb-3">LEGAL · TERMS OF SERVICE</div>
          <h1 className="display text-4xl sm:text-5xl m-0 mb-3 leading-tight">Terms of Service</h1>
          <p className="text-sm text-ink-500 mb-10">Effective: 10 May 2026</p>

          <div className="space-y-6 text-ink-800 leading-relaxed">
            <S t="1. Acceptance">By using Gharauni.com you agree to these terms. If you do not agree, do not use the site.</S>
            <S t="2. What we are">
              An independent aggregator platform. We connect SVAMITVA cardholders with banks, NBFCs, insurers, and other service providers. We do not provide loans, insurance, or legal advice directly.
            </S>
            <S t="3. What we are not">
              We are not the Government of India, not the Ministry of Panchayati Raj, not affiliated with any state Bhulekh portal. We are not a bank, not an NBFC, not an insurance company.
            </S>
            <S t="4. Service availability">
              Gharauni.com is in early launch. Several listed services (title verification, parser API, insurance comparison, dispute lawyer network, marketplace) are currently in waitlist mode. Submitting a form for these services does not create a transactional obligation — we will notify you when the service launches.
            </S>
            <S t="5. Accuracy of information">
              Loan rates, insurance premiums, and Gharauni status data shown on this site are indicative. Final terms are set by the partner. We make no warranty as to completeness or accuracy of third-party data.
            </S>
            <S t="6. User responsibilities">
              <ul className="list-disc pl-6 space-y-1">
                <li>You must provide accurate information when submitting forms.</li>
                <li>You must not misuse the site (scraping, automated abuse, fraud).</li>
                <li>You are 18 years or older.</li>
              </ul>
            </S>
            <S t="7. Intellectual property">
              The Gharauni.com name, logo, design, and content are owned by WebWorks. Lender, bank, and government names and logos belong to their respective owners.
            </S>
            <S t="8. Limitation of liability">
              To the maximum extent permitted by Indian law, our liability for any claim is limited to ₹1,000 or the amount you paid us in the last 12 months, whichever is greater.
            </S>
            <S t="9. Governing law">
              These terms are governed by the laws of India. Any dispute will be resolved in the courts of New Delhi.
            </S>
            <S t="10. Contact">
              <p>For all inquiries, including legal: use our <Link href="/contact" className="text-terracotta-600 underline">contact form</Link> and select the appropriate topic.</p>
            </S>
          </div>

          <div className="mt-12 flex gap-3 flex-wrap">
            <Link href="/privacy" className="btn-ghost">Read Privacy Policy</Link>
            <Link href="/" className="btn-primary">Home</Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

function S({ t, children }: { t: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="display text-2xl mb-3 text-ink-900">{t}</h2>
      <div className="text-[15px] space-y-3">{children}</div>
    </div>
  );
}
