import { Umbrella, Flame, CloudRain, ShieldCheck, IndianRupee, Clock } from 'lucide-react';
import { TierPage, TierConfig } from '@/components/tier-page';

const config: TierConfig = {
  badge: 'बीमा · Property Insurance',
  badgeColor: 'amber',
  headlineHi: 'अपने घर का बीमा कराएँ',
  headline: 'Insure your village home.',
  subheadline: 'For the 30 crore homes that never had a title to insure against — until now.',
  description:
    'Pre-SVAMITVA, rural homes were essentially uninsurable. Insurers want proof of ownership and a clear address; village houses had neither. With your Gharauni card, you can now get home insurance covering fire, flood, storm damage, and theft. Premiums start from ₹1,200/year for a typical 200-sq-yd house. We compare 6 insurers and find the cheapest cover for your district.',
  primaryCTA: { label: 'Get insurance quotes →', href: '/insurance/quote' },
  secondaryCTA: { label: 'What\'s covered', href: '#features' },

  problemTitle: 'Rural homes were uninsurable',
  problemTitleHi: 'गाँव के घर बीमे से बाहर',
  problemBody:
    'Insurance companies require proof of ownership and a defined address. Pre-SVAMITVA, most village homes had neither — the land was technically "Abadi" (un-titled residential commons) and addresses were oral. Result: when a flood, fire, or storm hit, families had no claim against any insurer. Recovery happened through informal lending or, increasingly, never at all.',
  solutionTitle: 'Gharauni unlocks home insurance',
  solutionTitleHi: 'घरौनी से बीमा हो सकता है',
  solutionBody:
    'The 13-digit Gharauni ID gives insurers everything they need: confirmed ownership, defined location with GPS, and a verifiable parcel. We work with HDFC ERGO, ICICI Lombard, Bajaj Allianz, SBI General, New India Assurance, and United India — 6 insurers competing for your premium. Most policies start under ₹100/month for fire+flood+storm cover up to ₹5L.',
  outcome:
    'Your home is finally protected against disasters that used to mean permanent financial loss.',

  featuresHeading: 'What\'s covered',
  featuresHeadingHi: 'क्या-क्या कवर है',
  features: [
    {
      icon: Flame,
      title: 'Fire and explosion',
      titleHi: 'आग और विस्फोट',
      body: 'Damage from fire, electrical shorts, gas cylinder explosions, and lightning. Includes contents (furniture, electronics) where opted.',
    },
    {
      icon: CloudRain,
      title: 'Flood and storm',
      titleHi: 'बाढ़ और तूफ़ान',
      body: 'Floods (rivers, monsoon), cyclones, hailstorms, and lightning damage. Critical in flood-prone UP, Bihar, AP, and coastal states.',
    },
    {
      icon: ShieldCheck,
      title: 'Theft and burglary',
      titleHi: 'चोरी और डकैती',
      body: 'Loss of contents from break-in or theft. Police FIR required for claim. Add-on covers extends to outbuildings and animal sheds.',
    },
  ],

  stepsHeading: 'How to get insured',
  stepsHeadingHi: 'बीमा कैसे लें',
  steps: [
    {
      title: 'Share Gharauni + property details',
      titleHi: 'जानकारी दें',
      body: 'Card ID, construction type (pucca/kachha/mixed), area, year built. 2 minutes online or via WhatsApp.',
    },
    {
      title: 'Compare 6 insurers',
      titleHi: 'किसके साथ?',
      body: 'We pull quotes from HDFC ERGO, ICICI Lombard, Bajaj Allianz, SBI General, New India Assurance, United India. Side-by-side coverage and premiums.',
    },
    {
      title: 'Pay premium, policy issued',
      titleHi: 'पालिसी जारी',
      body: 'UPI or card. Policy document by email + WhatsApp within 24 hours. Cover starts immediately.',
    },
  ],

  faq: [
    {
      q: 'What does a typical premium cost?',
      qHi: 'प्रीमियम कितना होगा?',
      a: 'For a 200-sq-yd pucca house with ₹5L sum insured (building+contents): roughly ₹1,200-1,800/year. Kachha houses cost less but cover is also more limited. Flood-prone districts have a 15-30% surcharge.',
    },
    {
      q: 'What\'s NOT covered?',
      qHi: 'क्या क्या cover नहीं है?',
      a: 'Standard exclusions: war, riots (in some policies), wear-and-tear, intentional damage, agricultural land/crops (those need crop insurance), and damage to non-permanent structures like temporary sheds without optional add-on. We list exact exclusions per insurer on the quotes page.',
    },
    {
      q: 'How fast are claims paid?',
      qHi: 'क्लेम कितनी देर में मिलता है?',
      a: 'After a verified incident: 15-30 days for straightforward claims under ₹1 lakh. Larger or complex claims take 45-60 days. Sub-claim emergency advances (up to 25% of claim) typically released in 7 days.',
    },
    {
      q: 'Can I insure a kachha (mud/thatch) house?',
      qHi: 'क्या कच्चे घर का बीमा होगा?',
      a: 'Yes, but with limited cover. Pure kachha houses can be insured for fire + theft, but flood cover is usually unavailable. Mixed (pucca walls + thatched roof) houses get broader cover.',
    },
    {
      q: 'Do you charge a fee?',
      qHi: 'आप शुल्क लेते हैं?',
      a: 'Zero. We earn a small commission from the insurer when you buy through us — it doesn\'t increase your premium. Comparison and quotes are 100% free.',
    },
  ],

  finalHeadline: 'One flood. One fire. One total loss.',
  finalHeadlineHi: 'एक हादसा — सब कुछ बचाने का जरिया।',
  finalBody: 'A ₹100/month policy can mean the difference between recovering in 30 days vs 30 years.',
  finalCTA: { label: 'Get quotes for your home →', href: '/insurance/quote' },
};

export default function InsurancePage() {
  return <TierPage config={config} />;
}
