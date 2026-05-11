import { Shield, Search, FileCheck, AlertTriangle, Users, Building2 } from 'lucide-react';
import { TierPage, TierConfig } from '@/components/tier-page';

const config: TierConfig = {
  badge: 'For banks, NBFCs, and serious buyers',
  badgeColor: 'green',
  headlineHi: 'ज़मीन का पिछोड़ा जाँचें',
  headline: 'Verify any rural title.',
  subheadline: 'Title verification service for SVAMITVA-backed property.',
  description:
    'Before you lend, before you buy, before you build — confirm the seller\'s Gharauni is real, unique, and clean. We cross-check the 13-digit Gharauni ID against the public SVAMITVA portal, flag duplicates, surface any pending disputes, and deliver a one-page report in 24-48 hours. ₹499 per check for individuals; volume pricing for lenders.',
  primaryCTA: { label: 'Run a title check · ₹499', href: '/title/check' },
  secondaryCTA: { label: 'For lenders: enterprise pricing', href: '/title/enterprise' },

  problemTitle: 'Rural title fraud is invisible',
  problemTitleHi: 'ज़मीन का धोखा छिपा हुआ',
  problemBody:
    'Multiple sellers claim the same plot. Patwari registers get forged. Inherited land has unknown co-owners. Even after Gharauni cards are issued, disputes can persist quietly until a buyer or bank gets blindsided. Most retail buyers have no way to verify what they\'re paying for. Most regional banks lack the workflow to check 50 rural collaterals a week without an army of staff.',
  solutionTitle: 'API + report, lender-grade',
  solutionTitleHi: 'सर्टिफाइड जाँच',
  solutionBody:
    'Submit the 13-digit Gharauni ID. We verify against the SVAMITVA portal, run dispute checks against state Bhulekh APIs, scan public land records for adjacent claims, and deliver a signed PDF report listing: (1) card validity, (2) registered owner, (3) any encumbrance flags, (4) recommended action. Banks get API access for batch processing.',
  outcome:
    '95%+ confidence on title cleanliness before money changes hands.',

  featuresHeading: 'What\'s in a title report',
  featuresHeadingHi: 'जाँच में क्या मिलता है',
  features: [
    {
      icon: FileCheck,
      title: 'Card validity',
      titleHi: 'कार्ड की पुष्टि',
      body: 'Confirms the 13-digit Gharauni ID exists, is active, and matches the seller\'s name on the public SVAMITVA database.',
    },
    {
      icon: AlertTriangle,
      title: 'Encumbrance flags',
      titleHi: 'चेतावनी मार्क',
      body: 'Detects duplicate listings, pending disputes, mortgage liens, and inheritance ambiguity. Each flag gets a severity score.',
    },
    {
      icon: Shield,
      title: 'Signed PDF report',
      titleHi: 'हस्ताक्षरित रिपोर्ट',
      body: 'Digitally signed report, sharable with your bank or panchayat office. Valid for 90 days from issue date.',
    },
  ],

  stepsHeading: 'How a title check works',
  stepsHeadingHi: 'जाँच कैसे होती है',
  steps: [
    {
      title: 'Submit Gharauni ID',
      titleHi: 'आईडी भेजें',
      body: 'Enter the 13-digit Gharauni ID from the seller\'s card. Pay ₹499 securely via UPI or card.',
    },
    {
      title: 'We cross-check',
      titleHi: 'हम जाँचें',
      body: 'Automated checks against SVAMITVA + state Bhulekh + dispute databases. Manual review where flags appear.',
    },
    {
      title: 'Get the report',
      titleHi: 'रिपोर्ट पाएँ',
      body: 'Signed PDF in 24-48 hours by email and WhatsApp. Includes specific recommendations on next steps.',
    },
  ],

  faq: [
    {
      q: 'Is this an official government verification?',
      qHi: 'क्या यह सरकारी जाँच है?',
      a: 'No. We are a private service that uses publicly available government data to do thorough verification. For absolute legal certainty, banks still require their own due diligence. Our reports are widely accepted as a fast first-pass screening tool.',
    },
    {
      q: 'What if you find a problem?',
      qHi: 'अगर समस्या मिली तो?',
      a: 'The report will flag the specific issue and recommend next steps — typically contacting the Tehsildar office, hiring a local property lawyer, or stepping away from the transaction. We don\'t provide legal services ourselves.',
    },
    {
      q: 'Why pay when I can check the SVAMITVA portal myself?',
      qHi: 'मुफ़्त का पोर्टल है तो पैसा क्यों दें?',
      a: 'You can. The SVAMITVA portal confirms basic existence. Our ₹499 service cross-checks against state Bhulekh records, dispute databases, and runs a structured manual review by someone who has seen 1000+ rural titles. The marginal cost is small compared to the loss from a bad deal.',
    },
    {
      q: 'Do you offer volume pricing for banks and NBFCs?',
      qHi: 'क्या बैंकों के लिए थोक दाम है?',
      a: 'Yes. For 100+ checks/month: API access with batch processing, dedicated account manager, custom SLA. Email enterprise@gharauni.com for pricing.',
    },
    {
      q: 'How fast is the turnaround?',
      qHi: 'कितने समय में रिपोर्ट मिलेगी?',
      a: '24-48 hours for clean cases. Up to 5 working days where manual review of complex disputes is needed. Express 6-hour service available for an additional ₹999.',
    },
  ],

  finalHeadline: 'Don\'t buy blind.',
  finalHeadlineHi: 'अंधाधुंध नहीं, सुनिश्चित होकर।',
  finalBody: '₹499 to verify a title is cheap insurance against losing ₹10+ lakh on a fraudulent deal.',
  finalCTA: { label: 'Run a title check now', href: '/title/check' },
};

export default function TitlePage() {
  return <TierPage config={config} />;
}
