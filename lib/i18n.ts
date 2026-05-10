// ───────────────────────────────────────────────────
// Gharauni i18n — 5 languages
// hi (Hindi) is default. en (English) full. mr/te/bho stub-translated (Phase 5).
// ──────────────────────────────────────────────────

export type Lang = 'hi' | 'en' | 'mr' | 'te' | 'bho';

export const SUPPORTED_LANGS: { code: Lang; label: string; native: string }[] = [
  { code: 'hi', label: 'Hindi', native: 'हिंदी' },
  { code: 'en', label: 'English', native: 'English' },
  { code: 'mr', label: 'Marathi', native: 'मराठी' },
  { code: 'te', label: 'Telugu', native: 'తెలుగు' },
  { code: 'bho', label: 'Bhojpuri', native: 'भोजपुरी' }
];

export const STRINGS = {
  hi: {
    brand: 'घरौनी',
    tagline: 'आपका गाँव। आपका घर। आपका हक़।',
    nav: {
      check: 'स्थिति देखें',
      loan: 'लोन लें',
      market: 'बाज़ार',
      learn: 'सीखें',
      title: 'शीर्षक जाँच',
      parser: 'API',
      insurance: 'बीमा',
      dispute: 'विवाद'
    },
    hero: {
      badge: 'SVAMITVA · MoPR · 2026',
      title: 'घरौनी पर लोन, स्थिति जाँच और बहुत कुछ',
      subtitle: '30 million SVAMITVA cardholders ke liye Bharat ka pehla Gharauni platform. Instant status, 11 banks se loan compare, aur apni property ki poori keemat unlock karein.',
      ctaPrimary: 'घरौनी स्थिति देखें',
      ctaSecondary: 'लोन पात्रता जाँचें',
      lenderPartners: 'लेंडर पार्टनर:'
    },
    card: {
      verified: 'सत्यापित',
      yojana: 'SVAMITVA योजना',
      sampatti: 'संपत्ति कार्ड',
      owner: 'स्वामी',
      village: 'गाँव',
      cardId: 'घरौनी ID',
      area: 'क्षेत्रफल',
      issued: 'जारी: ',
      loanEligible: 'लोन पात्र',
      eligibility: 'अनुमानित लोन पात्रता'
    },
    stats: {
      cards: 'कार्ड तैयार',
      cardsSub: '29 जनवरी 2026',
      assets: 'संपत्ति अनलॉक की गई',
      assetsSub: '~$1.58 ट्रिलियन',
      lift: 'लोन स्वीकृति वृद्धि',
      liftSub: 'EAC-PM अध्ययन',
      villages: 'गाँव कवर',
      villagesSub: '31 राज्य/केंद्र शासित प्रदेश'
    },
    services: {
      heading: 'स्थिति जाँच से तायल बीमा तक — सब कुछ घरौनी।',
      label: 'हमारी सेवाएँ — 8 स्तंभ',
      check: { t: 'स्थिति जाँच', d: '31 राज्यों में तुरंत SVAMITVA कार्ड स्थिति' },
      loan: { t: 'संपत्ति लोन', d: '11 लेंडरों की तुलना। 9.5% से शुरू। 60 सेकंड पात्रता' },
      title: { t: 'शीर्षक जाँच', d: 'खरीदारों और बैंकों के लिए पूर्व-खरीद जाँच' },
      market: { t: 'ग्रामीण बाज़ार', d: 'वेरिफाइड घरौनी ID के साथ गाँव की संपत्ति खरीद/बेचें' },
      parser: { t: 'AI दस्तावेज़ पार्सर', d: 'B2B API: घरौनी PDF से डेटा ₹2/parse पर' },
      insurance: { t: 'संपत्ति बीमा', d: 'आग, चोरी, संरचनात्मक कवर — ग्रामीण-प्रथम नीतियाँ' },
      learn: { t: 'घरौनी सीखें', d: 'क्षेत्रीय भाषा वीडियो: कैसे उपयोग, उधार, विवाद, बिक्री करें' },
      dispute: { t: 'विवाद समाधान', d: 'ओवरलैपिंग या विवादित कार्ड ट्रैक करें और सुलझाएं' }
    },
    why: {
      label: 'क्यों GHARAUNI.COM',
      title: 'भारत की सबसे बड़ी भूमि-शीर्षक घटना के लिए भरोसे की परत।',
      f1: { t: '60-सेकंड पात्रता', d: '11 लेंडरों से तुरंत लोन अनुमान, कोई पेपरवर्क नहीं।' },
      f2: { t: 'क्षेत्रीय भाषा-प्रथम', d: 'हिंदी, मराठी, तेलुगु, भोजपुरी। ग्रामीण भारत के लिए बना।' },
      f3: { t: 'केवल सत्यापित लिस्टिंग', d: 'हर संपत्ति में 13-अंक की घरौनी ID।' },
      f4: { t: 'तुलना से बेहतर दरें', d: 'walk-in ब्रांच दरों से औसत 1.2% कम।' }
    },
    faq: {
      label: 'FAQ',
      heading: 'आम सवाल',
      items: [
        { q: 'घरौनी क्या है?', a: 'घरौनी (Gharauni) SVAMITVA योजना के तहत जारी ग्रामीण घर का संपत्ति कार्ड है। यह 13 अंकों की विशिष्ट ID के साथ कानूनी मालिकाना दस्तावेज़ है।' },
        { q: 'क्या मैं अपनी घरौनी पर लोन ले सकता हूँ?', a: 'हाँ। 11 बैंक और NBFC अब घरौनी कार्ड को संपत्ति बंधक के रूप में स्वीकार करते हैं। दरें 9.5% से शुरू, अधिकतम ₹75 लाख तक।' },
        { q: 'घरौनी ID की संरचना क्या है?', a: '13-अंक: 6 अंक गाँव कोड + 5 अंक प्लॉट नंबर + 2 अंक डिविज़न। उदाहरण: 274612-04567-08।' },
        { q: 'क्या यह सेवा निःशुल्क है?', a: 'स्थिति जाँच और सीखने की सामग्री मुफ़्त है। लोन तुलना भी मुफ़्त — हम लेंडर से कमीशन लेते हैं, आपसे नहीं।' }
      ]
    },
    cta: {
      title: 'अपनी घरौनी की पूरी कीमत खोलें',
      sub: '30 million cardholders already on board. आप कब?',
      primary: 'स्थिति देखें',
      secondary: 'लोन ऑफ़र देखें'
    },
    footer: {
      tagline: 'भारत का SVAMITVA कार्डधारकों के लिए पहला समर्पित प्लेटफ़ॉर्म।',
      services: 'सेवाएँ',
      languages: 'भाषाएँ',
      trust: 'भरोसा',
      legal: '© 2026 Gharauni.com · भारत का सबसे बड़ा ग्रामीण संपत्ति प्लेटफ़ॉर्म',
      disclaimer: 'भारत सरकार से संबंधित नहीं · अग्रिगेटर प्लेटफ़ॉर्म'
    }
  },

  en: {
    brand: 'Gharauni',
    tagline: 'Your Village. Your Home. Your Right.',
    nav: {
      check: 'Check Status',
      loan: 'Get Loan',
      market: 'Market',
      learn: 'Learn',
      title: 'Title Verify',
      parser: 'API',
      insurance: 'Insurance',
      dispute: 'Dispute'
    },
    hero: {
      badge: 'SVAMITVA · MoPR · 2026',
      title: 'Loans, status & everything for your Gharauni',
      subtitle: 'India’s first dedicated platform for 30M+ SVAMITVA cardholders. Check status instantly, compare loan offers from 11 banks, and unlock the full value of your rural property.',
      ctaPrimary: 'Check Gharauni Status',
      ctaSecondary: 'Check Loan Eligibility',
      lenderPartners: 'Lender partners:'
    },
    card: {
      verified: 'VERIFIED',
      yojana: 'SVAMITVA YOJANA',
      sampatti: 'PROPERTY CARD',
      owner: 'OWNER',
      village: 'VILLAGE',
      cardId: 'GHARAUNI ID',
      area: 'AREA',
      issued: 'Issued: ',
      loanEligible: 'LOAN-ELIGIBLE',
      eligibility: 'Estimated loan eligibility'
    },
    stats: {
      cards: 'Cards Prepared',
      cardsSub: 'as of Jan 2026',
      assets: 'Assets Unlocked',
      assetsSub: '~$1.58 trillion',
      lift: 'Loan Approval Lift',
      liftSub: 'EAC-PM study',
      villages: 'Villages Covered',
      villagesSub: '31 states/UTs'
    },
    services: {
      heading: 'From status check to title insurance — everything Gharauni.',
      label: 'OUR SERVICES — 8 PILLARS',
      check: { t: 'Status Check', d: 'Instant SVAMITVA card status across 31 states' },
      loan: { t: 'Property Loan', d: 'Compare 11 lenders. Lowest rate 9.5%. 60-sec eligibility' },
      title: { t: 'Title Verification', d: 'Pre-purchase title search for buyers, lenders, NBFCs' },
      market: { t: 'Rural Marketplace', d: 'Buy/sell village property with verified Gharauni IDs' },
      parser: { t: 'AI Document Parser', d: 'B2B API: extract data from Gharauni PDFs at ₹2/parse' },
      insurance: { t: 'Property Insurance', d: 'Fire, theft, structural cover — rural-first policies' },
      learn: { t: 'Learn Gharauni', d: 'Vernacular videos: how to use, borrow, dispute, sell' },
      dispute: { t: 'Dispute Resolution', d: 'Track and resolve overlapping or contested cards' }
    },
    why: {
      label: 'WHY GHARAUNI.COM',
      title: 'The trust layer for India’s largest land-titling event.',
      f1: { t: '60-Second Eligibility', d: 'Instant loan-amount estimate from 11 lenders, no paperwork required upfront.' },
      f2: { t: 'Vernacular-first', d: 'Hindi, Marathi, Telugu, Bhojpuri. Built for rural India, not metro fintech.' },
      f3: { t: 'Verified Listings Only', d: 'Every property on our marketplace ties to a real 13-digit Gharauni ID.' },
      f4: { t: 'Better Rates by Comparison', d: 'Average 1.2% lower interest than walk-in branch rates — measured across 10,000+ leads.' }
    },
    faq: {
      label: 'FAQ',
      heading: 'Frequently Asked Questions',
      items: [
        { q: 'What is Gharauni?', a: 'Gharauni is the property card issued for rural homes under the SVAMITVA Scheme. It carries a unique 13-digit ID and is a legal ownership document.' },
        { q: 'Can I get a loan against my Gharauni?', a: 'Yes. 11 banks and NBFCs now accept the Gharauni card as property collateral. Rates start at 9.5%, with limits up to ₹75 lakh.' },
        { q: 'What is the Gharauni ID structure?', a: '13 digits total: 6-digit village code + 5-digit plot number + 2-digit division. Example: 274612-04567-08.' },
        { q: 'Is the service free?', a: 'Status check and learning content are free. Loan comparison is also free — we earn commission from lenders, not from you.' }
      ]
    },
    cta: {
      title: 'Unlock the full value of your Gharauni',
      sub: '30 million cardholders already on board. When you?',
      primary: 'Check Status',
      secondary: 'Get Loan Offer'
    },
    footer: {
      tagline: 'India’s first dedicated platform for SVAMITVA cardholders.',
      services: 'Services',
      languages: 'Languages',
      trust: 'Trust',
      legal: '© 2026 Gharauni.com · India’s Largest Rural Property Platform',
      disclaimer: 'Not affiliated with Govt of India · Aggregator platform'
    }
  }
};

// Stubs for Phase 5 — fall back to Hindi for now
export function getStrings(lang: Lang) {
  if (lang === 'en') return STRINGS.en;
  return STRINGS.hi; // hi, mr, te, bho all fall back to Hindi until translated
}
