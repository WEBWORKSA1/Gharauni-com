import { FileText, Zap, Code, Database, Lock, ScanLine } from 'lucide-react';
import { TierPage, TierConfig } from '@/components/tier-page';

const config: TierConfig = {
  badge: 'For fintechs, banks, and developers',
  badgeColor: 'blue',
  headlineHi: 'PDF से डेटा निकालें',
  headline: 'Gharauni PDF Parser API.',
  subheadline: 'Turn scanned property cards into structured JSON in under 2 seconds.',
  description:
    'Every loan origination system (LOS) we\'ve talked to has the same bottleneck: villagers send their Gharauni as a PDF or photo, and a human has to type out the 13-digit ID, plot number, area, and coordinates. Our parser does it in 1.4 seconds with 98% accuracy. ₹5 per parse at scale. Free trial: 50 parses.',
  primaryCTA: { label: 'Get free trial · 50 parses', href: '/parser/signup' },
  secondaryCTA: { label: 'View API docs', href: '/parser/docs' },

  problemTitle: 'The data entry tax on rural lending',
  problemTitleHi: 'मानव की गलती का बोझ',
  problemBody:
    'When a villager applies for a Gharauni-backed loan, the bank receives a PDF or phone photo of the card. Today, that gets fed into a manual review queue. A clerk types out the 13-digit ID, plot number, owner name, area, and tehsil into the LOS. This process takes 4-8 minutes per application, has a 6% manual-error rate, and bottlenecks the entire rural lending pipeline. At 100 applications/day, that\'s 8 person-hours and ~6 typo errors that propagate downstream.',
  solutionTitle: 'Structured extraction via REST API',
  solutionTitleHi: 'REST API से डेटा',
  solutionBody:
    'POST a PDF or image to our /api/parse endpoint. Receive structured JSON in 1.4 seconds median: { gharauniId, plotNumber, ownerName, area, district, tehsil, village, coordinates, issueDate, confidence }. Our model is trained on 50,000+ real SVAMITVA cards across UP, MH, MP, HR, KA. Handles low-quality phone photos, scanned PDFs, and printed copies.',
  outcome:
    'Cuts loan-application processing time by 80%. Saves ₹4-6 per loan in clerk costs.',

  featuresHeading: 'What the API returns',
  featuresHeadingHi: 'API क्या देता है',
  features: [
    {
      icon: ScanLine,
      title: 'OCR + layout understanding',
      titleHi: 'चित्र समझ',
      body: 'Reads structured data from any quality scan or photo. Trained on real SVAMITVA card formats across 5 states with regional script variants.',
    },
    {
      icon: Database,
      title: 'JSON output',
      titleHi: 'JSON बाहर',
      body: 'Clean, validated JSON ready for your LOS. Includes confidence scores per field so you know when to flag for human review.',
    },
    {
      icon: Lock,
      title: 'Private + ephemeral',
      titleHi: 'सुरक्षित',
      body: 'PDFs deleted from our servers after 24 hours. DPDP-compliant. We never train on your customer data. SOC 2 Type I in progress.',
    },
  ],

  stepsHeading: 'How to integrate',
  stepsHeadingHi: 'कैसे कनेक्ट करें',
  steps: [
    {
      title: 'Sign up, get API key',
      titleHi: 'API key लें',
      body: 'Free trial with 50 parses, no credit card. Instant API key. Self-serve dashboard for usage tracking.',
    },
    {
      title: 'POST your PDF',
      titleHi: 'PDF भेजें',
      body: 'Single endpoint: POST /v1/parse with multipart/form-data. Or send a public URL. cURL or any HTTP client.',
    },
    {
      title: 'Receive JSON',
      titleHi: 'JSON पाएँ',
      body: 'Median 1.4 seconds. Per-field confidence scores. Webhook callback option for async use.',
    },
  ],

  faq: [
    {
      q: 'What\'s the accuracy rate?',
      qHi: 'सटीकता कितनी है?',
      a: 'On clean PDFs from the SVAMITVA portal: 99.2% field-level accuracy. On phone photos of physical cards: 96.4%. Each response includes per-field confidence so you can flag low-confidence extractions for human review.',
    },
    {
      q: 'What\'s the pricing?',
      qHi: 'दाम क्या है?',
      a: 'Free: 50 parses/month. Starter: ₹5/parse, capped at ₹5,000/month. Growth: ₹3/parse at 5k+/month. Enterprise: custom pricing at 50k+/month. Volume pricing email enterprise@gharauni.com.',
    },
    {
      q: 'Do you support languages other than Hindi/English?',
      qHi: 'अन्य भाषाएँ?',
      a: 'Yes — Marathi, Telugu, Kannada, Haryanvi, Gujarati cards all supported in v2 (Aug 2025+). Bilingual cards parsed in both languages with cross-validation.',
    },
    {
      q: 'What rate limits should I expect?',
      qHi: 'दर सीमा?',
      a: '100 requests/minute on free tier. 1000/min on Starter+. Enterprise plans have custom limits up to 10k req/min with reserved capacity.',
    },
    {
      q: 'Is there an SDK?',
      qHi: 'SDK?',
      a: 'Python and Node.js SDKs in /parser/docs. Open-sourced under MIT. Java/Go on the roadmap.',
    },
    {
      q: 'How does this compare to AWS Textract or Google Document AI?',
      qHi: 'AWS Textract से क्या अंतर?',
      a: 'General-purpose document AIs achieve 70-80% accuracy on SVAMITVA cards because they don\'t know the layout. We\'re trained specifically on this single document class. Net: higher accuracy, lower latency, 1/5 the price.',
    },
  ],

  finalHeadline: 'Stop typing 13-digit IDs by hand.',
  finalHeadlineHi: 'मैनुअल डेटा एंट्री बंद करें।',
  finalBody: '50 free parses to try it on your own loan application backlog. No credit card. Cancel anytime.',
  finalCTA: { label: 'Start free trial →', href: '/parser/signup' },
};

export default function ParserPage() {
  return <TierPage config={config} />;
}
