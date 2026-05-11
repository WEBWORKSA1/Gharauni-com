import { Scale, AlertTriangle, FileWarning, MessageSquare, Phone, BookOpen } from 'lucide-react';
import { TierPage, TierConfig } from '@/components/tier-page';

const config: TierConfig = {
  badge: 'विवाद · Disputes',
  badgeColor: 'amber',
  headlineHi: 'विवाद को सही रास्ते पर लाएं',
  headline: 'Resolve land disputes calmly.',
  subheadline: 'Step-by-step guidance + verified lawyers for Gharauni-related conflicts.',
  description:
    'Two relatives claim the same plot. The boundary on the card differs from the actual fence. A long-lost uncle suddenly appears with old papers. Gharauni disputes are common — and rarely require court if handled right. We give you the step-by-step guide for free, and connect you to verified property lawyers when you need one. ₹999 first consultation.',
  primaryCTA: { label: 'Start dispute guide →', href: '/dispute/guide' },
  secondaryCTA: { label: 'Talk to a verified lawyer', href: '/dispute/lawyer' },

  problemTitle: 'Disputes get expensive fast',
  problemTitleHi: 'विवाद महंगा हो जाता है',
  problemBody:
    'Most rural land disputes escalate not because they\'re inherently hard, but because villagers don\'t know the right sequence: who to talk to first, what documents to compile, when to involve the panchayat vs the Tehsildar vs the court. By the time a lawyer is hired, both sides have dug in, and ₹50k+ has been spent on what could have been resolved in a panchayat meeting.',
  solutionTitle: 'Free guide + paid escalation',
  solutionTitleHi: 'मुफ्त गाइड + वकील',
  solutionBody:
    'Our step-by-step Hindi guide walks you through the 4-stage resolution path: (1) gather your documents, (2) talk to the other party with a neutral elder, (3) panchayat mediation, (4) Tehsildar or court if needed. Free. When you genuinely need professional help, we connect you to property lawyers we\'ve vetted, with transparent fixed pricing starting at ₹999.',
  outcome:
    '80% of disputes resolved before stage 4. Average cost to the cardholder: under ₹5,000.',

  featuresHeading: 'What\'s in our dispute resource',
  featuresHeadingHi: 'किस तरह मदद करते हैं',
  features: [
    {
      icon: BookOpen,
      title: 'Hindi step-by-step guide',
      titleHi: 'हिंदी में गाइड',
      body: '14-page guide covering inheritance, boundary, double-claim, and forged-document disputes. Free download. No login required.',
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp Q&A',
      titleHi: 'व्हाट्सएप पर सवाल',
      body: 'Send your situation to our WhatsApp. Get a clear next step within 4 hours. Free for the first question.',
    },
    {
      icon: Scale,
      title: 'Verified lawyer network',
      titleHi: 'जाँचे हुए वकील',
      body: 'Property lawyers we\'ve vetted across UP, MH, MP, HR. Fixed pricing (no per-hour billing). ₹999 first consult, transparent fees thereafter.',
    },
  ],

  stepsHeading: 'The 4-stage resolution path',
  stepsHeadingHi: '4-चरण समाधान',
  steps: [
    {
      title: 'Document and de-escalate',
      titleHi: 'जानकारी इकट्ठा करें',
      body: 'Compile your Gharauni, supporting papers, and the other party\'s claim. Talk first — most disputes are misunderstandings.',
    },
    {
      title: 'Panchayat mediation',
      titleHi: 'पंचायत में बातचीत',
      body: 'Bring it to the village panchayat with a neutral elder. Most boundary and inheritance issues end here.',
    },
    {
      title: 'Tehsildar or court',
      titleHi: 'तहसीलदार या न्यायालय',
      body: 'Only if mediation fails. By this point you should have a lawyer. We\'ll connect you with one if needed.',
    },
  ],

  faq: [
    {
      q: 'My brother and I both claim ownership of our father\'s house. What do I do?',
      qHi: 'क्या भाई और मैं दोनों दावा कर रहे हैं?',
      a: 'Inheritance disputes are the most common type. Step 1: get a copy of your father\'s will (if any) and the Gharauni issued for the property. Step 2: under Hindu Succession Act (or other applicable personal law), surviving children typically have equal share. Step 3: panchayat mediation with all siblings present often settles this within a month. Our guide walks through the exact paperwork.',
    },
    {
      q: 'The boundary on my Gharauni differs from my actual fence. What now?',
      qHi: 'सीमा गलत है, क्या करें?',
      a: 'Boundary discrepancies happen because drone surveys are accurate to about 1-2 meters. If the difference is small and your neighbor agrees, you can both file a joint correction request with the Tehsildar (no court needed). For larger discrepancies, our guide covers the formal mutation process.',
    },
    {
      q: 'Someone else claims my plot has been theirs for years. Help?',
      qHi: 'कोई और दावा कर रहा है?',
      a: 'Adverse-possession claims are tricky but rarely successful against SVAMITVA-titled property. The Gharauni card is strong primary evidence. Talk to a lawyer immediately if the other party has filed any formal claim. Our ₹999 first consult clarifies whether you need to do anything urgent.',
    },
    {
      q: 'Can the panchayat overrule my Gharauni?',
      qHi: 'क्या पंचायत कार्ड को बदल सकती है?',
      a: 'No. The panchayat can mediate disputes but cannot legally alter or cancel a Gharauni card. Only the Tehsildar (through proper mutation procedure) or a competent court can do that.',
    },
    {
      q: 'How much do lawyers cost?',
      qHi: 'वकील का खर्च?',
      a: 'Our network: ₹999 first 30-minute consultation. After that, fixed pricing per service — e.g., drafting a partition deed ₹5,000-8,000, representing in Tehsildar case ₹15,000-25,000. We disclose all costs upfront. No surprise per-hour bills.',
    },
    {
      q: 'What if I can\'t afford a lawyer?',
      qHi: 'अगर वकील का पैसा नहीं है?',
      a: 'Free legal aid through District Legal Services Authority (DLSA). Our guide includes the application process. Many disputes also qualify for Lok Adalat (people\'s court) where there is no lawyer fee.',
    },
  ],

  finalHeadline: 'A dispute resolved is property restored.',
  finalHeadlineHi: 'विवाद सुलझाएं, संपत्ति बचाएं।',
  finalBody: 'Most disputes don\'t need a courtroom. Start with our free Hindi guide — you may not need anything else.',
  finalCTA: { label: 'Download the dispute guide →', href: '/dispute/guide' },
};

export default function DisputePage() {
  return <TierPage config={config} />;
}
