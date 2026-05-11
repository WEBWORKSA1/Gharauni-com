import { BookOpen, FileQuestion, Video, ArrowRight, Sparkles, MapPin, IndianRupee } from 'lucide-react';
import { TierPage, TierConfig } from '@/components/tier-page';

const config: TierConfig = {
  badge: 'सीखें · Learn',
  badgeColor: 'blue',
  headlineHi: 'घरौनी क्या है?',
  headline: 'Understand your card.',
  subheadline: 'Plain Hindi and English. Real examples. No jargon.',
  description:
    'आपको SVAMITVA योजना के तहत घरौनी कार्ड मिला है, लेकिन यह साचमुच क्या है? इससे क्या होता है? कहाँ इस्तेमाल करें? हम यह सब सादी भाषा में समझाते हैं — जब आपको ज़रूरत हो।',
  primaryCTA: { label: 'Watch 90-second video · वीडियो देखें', href: '#video' },
  secondaryCTA: { label: 'Browse all guides', href: '#guides' },

  problemTitle: 'A card without a clue',
  problemTitleHi: 'कार्ड जो समझ नहीं आता',
  problemBody:
    '3 करोड़ से ज़्यादा लोगों को घरौनी मिल चुकी है। लेकिन कितने लोग जानते हैं कि यह बैंक लोन, बीमा, सुरक्षित बिक्री, विरासत — सब के लिए काम आती है? Most cardholders treat the Gharauni as just another government paper. They don\'t know about the 11 banks that lend against it, the +23% loan-approval lift it gives, or the title-fraud protection it provides.',
  solutionTitle: 'Bilingual, bite-sized education',
  solutionTitleHi: 'सादी भाषा में सीखें',
  solutionBody:
    'Short videos (90 seconds each), one-page explainers in Hindi + English, and FAQ articles answering the actual questions villagers ask: कार्ड पर कितना लोन मिलेगा? पते में गलती है — कैसे ठीक करें? हम जवाब हिंदी, भोजपुरी, अवधी, और अंग्रेज़ी में देते हैं।',
  outcome:
    'Cardholders understand their rights, ask better questions of banks, and avoid common scams.',

  featuresHeading: 'How we teach',
  featuresHeadingHi: 'कैसे सिखाते हैं',
  features: [
    {
      icon: Video,
      title: '90-second videos',
      titleHi: 'डेढ मिनट के वीडियो',
      body: 'Short visual explainers in Hindi. One topic per video. Examples: "कार्ड कैसे डाउनलोड करें”, "₹5 लाख का लोन कैसे लें”.',
    },
    {
      icon: FileQuestion,
      title: 'FAQ articles',
      titleHi: 'FAQ लेख',
      body: '50+ real questions from real villagers, answered in 200 words each. Topics: rights, loans, inheritance, disputes, sales, taxation.',
    },
    {
      icon: BookOpen,
      title: 'One-page explainers',
      titleHi: 'PDF गाइड',
      body: 'Printable Hindi + English one-pagers. Show your father. Give to the panchayat. Use at the bank. Free download.',
    },
  ],

  stepsHeading: 'How to use the Learn section',
  stepsHeadingHi: 'कैसे सीखें',
  steps: [
    {
      title: 'Pick your question',
      titleHi: 'अपना सवाल चुनें',
      body: 'Browse by topic (loans, disputes, inheritance, taxes) or search for the exact thing you\'re confused about.',
    },
    {
      title: 'Read or watch',
      titleHi: 'देखें या पढ़ें',
      body: 'Most articles take 3 minutes. Most videos take 90 seconds. Hindi + English side-by-side where it helps.',
    },
    {
      title: 'Take action',
      titleHi: 'कार्रवाई करें',
      body: 'Every guide ends with the next concrete step — a form to fill, an office to visit, a number to call. Not just theory.',
    },
  ],

  faq: [
    {
      q: 'What is the SVAMITVA scheme in one sentence?',
      qHi: 'SVAMITVA योजना एक वाक्य में क्या है?',
      a: 'A central government program that uses drones to survey village land and issue every rural homeowner a legal property card (Gharauni) — turning previously undocumented village homes into bankable, sellable, mortgageable property.',
    },
    {
      q: 'What is the difference between Gharauni and a regular property deed (Bhulekh)?',
      qHi: 'घरौनी और भुलेख में क्या अंतर है?',
      a: 'Bhulekh covers agricultural and revenue land. Gharauni covers the "Abadi" residential area inside village boundaries — where your home, courtyard, animal shed, and well actually are. Before SVAMITVA, this Abadi land had no formal title in most states.',
    },
    {
      q: 'How much loan can I get on my Gharauni?',
      qHi: 'घरौनी पर कितना लोन मिलेगा?',
      a: 'Banks typically lend 50-60% of the assessed property value. For a typical 200-square-yard village house, that\'s often ₹2-15 lakh depending on district and construction. Compare 11 lenders on our /loan page.',
    },
    {
      q: 'Is the card mortgageable?',
      qHi: 'क्या यह कार्ड गिरवी रखा जा सकता है?',
      a: 'Yes. As of 2024, RBI guidelines explicitly recognize SVAMITVA property cards as mortgageable collateral. All 11 lenders we partner with accept them.',
    },
    {
      q: 'What if there\'s an error on my card?',
      qHi: 'अगर मेरे कार्ड में गलती है?',
      a: 'Errors in name, plot size, or coordinates can be corrected through your Tehsildar office or through the SVAMITVA grievance portal. We have a step-by-step Hindi guide on this in the FAQ articles section.',
    },
    {
      q: 'Is my Gharauni data on this website private?',
      qHi: 'क्या मेरा डेटा यहाँ सुरक्षित है?',
      a: 'We process your data under India\'s DPDP Act 2023. We never ask for your Aadhaar number or OTP. We only query the public SVAMITVA portal on your behalf.',
    },
  ],

  finalHeadline: 'Knowledge is power.',
  finalHeadlineHi: 'ज्ञान ही शक्ति है।',
  finalBody: 'Spend 5 minutes here and you\'ll understand more about your property rights than 95% of cardholders.',
  finalCTA: { label: 'Start with the basics →', href: '#guides' },
};

export default function LearnPage() {
  return <TierPage config={config} />;
}
