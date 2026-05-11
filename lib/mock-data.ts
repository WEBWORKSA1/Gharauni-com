// Mock lender data for the loan comparison page.
// Rates are indicative, sourced from each lender's published Gharauni/SVAMITVA loan product pages
// where available. Last reviewed May 2026. Update quarterly.
//
// Real affiliate IDs go in env vars (NEXT_PUBLIC_BAJAJ_AFF_ID, etc.) and get appended in /loan/apply/[slug].

import type { GharauniCard, Listing, StateData } from './types';

export type Lender = {
  slug: string;
  name: string;
  type: 'Bank' | 'NBFC' | 'Housing Finance';
  rate: number;          // annual interest rate %, on the cheaper end of their range
  rateMax: number;       // upper end of their published range
  processingFee: number; // % of loan amount
  maxAmount: number;     // INR max loan amount they advertise for Gharauni-backed loans
  tenure: string;        // tenure range as displayed to user
  bestFor?: string;      // short positioning line, shown next to name in list
  affiliateUrl?: string; // optional direct deep link; otherwise we use /loan/apply/[slug]
};

export const LENDERS: Lender[] = [
  { slug: 'bajaj-finserv', name: 'Bajaj Finserv', type: 'NBFC', rate: 9.5, rateMax: 12.5, processingFee: 1.5, maxAmount: 5000000, tenure: 'Up to 20 years', bestFor: 'Fast disbursal' },
  { slug: 'tata-capital', name: 'Tata Capital', type: 'NBFC', rate: 9.65, rateMax: 13.5, processingFee: 1.0, maxAmount: 5000000, tenure: 'Up to 15 years', bestFor: 'Lowest processing fee' },
  { slug: 'aditya-birla-finance', name: 'Aditya Birla Finance', type: 'NBFC', rate: 9.75, rateMax: 12.0, processingFee: 1.25, maxAmount: 5000000, tenure: 'Up to 20 years', bestFor: 'Flexible tenure' },
  { slug: 'kotak-mahindra', name: 'Kotak Mahindra', type: 'Bank', rate: 9.85, rateMax: 11.5, processingFee: 1.0, maxAmount: 5000000, tenure: 'Up to 20 years', bestFor: 'Salaried applicants' },
  { slug: 'hdfc-bank', name: 'HDFC Bank', type: 'Bank', rate: 9.95, rateMax: 11.0, processingFee: 0.5, maxAmount: 5000000, tenure: 'Up to 20 years', bestFor: 'Lowest rate for salaried' },
  { slug: 'icici-bank', name: 'ICICI Bank', type: 'Bank', rate: 10.05, rateMax: 11.5, processingFee: 1.0, maxAmount: 5000000, tenure: 'Up to 20 years', bestFor: 'Quick online approval' },
  { slug: 'axis-bank', name: 'Axis Bank', type: 'Bank', rate: 10.15, rateMax: 12.0, processingFee: 1.0, maxAmount: 5000000, tenure: 'Up to 20 years', bestFor: 'Pre-approved offers' },
  { slug: 'pnb-housing', name: 'PNB Housing', type: 'Housing Finance', rate: 10.25, rateMax: 13.0, processingFee: 0.5, maxAmount: 5000000, tenure: 'Up to 30 years', bestFor: 'Longest tenure' },
  { slug: 'iifl-finance', name: 'IIFL Finance', type: 'NBFC', rate: 10.50, rateMax: 14.0, processingFee: 1.5, maxAmount: 3000000, tenure: 'Up to 15 years', bestFor: 'Self-employed' },
  { slug: 'lt-finance', name: 'L&T Finance', type: 'NBFC', rate: 10.75, rateMax: 13.5, processingFee: 1.0, maxAmount: 3000000, tenure: 'Up to 15 years', bestFor: 'Rural specialization' },
  { slug: 'cholamandalam', name: 'Cholamandalam', type: 'NBFC', rate: 10.95, rateMax: 14.5, processingFee: 1.5, maxAmount: 2500000, tenure: 'Up to 12 years', bestFor: 'First-time borrowers' },
];

// SVAMITVA scheme statistics, shown in StatBand and elsewhere.
// Sourced from Ministry of Panchayati Raj official statistics, EAC-PM working paper,
// and public addresses. Re-check quarterly.
export const SVAMITVA_STATS = {
  cardsPrepared: '3.06 cr',
  cardsPreparedSource: 'MoPR · 29 Jan 2026',
  villagesCovered: '1.86 L',
  villagesCoveredPct: 92,
  villagesCoveredSource: '92% of target',
  assetValueUnlocked: '₹132 L cr',
  assetValueUnlockedUsd: '$1.58 T',
  assetValueUnlockedSource: 'PM speech · 2025',
  loanLift: '+23%',
  loanLiftBackwardClass: '+21%',
  loanLiftBottom20Women: '+24.6%',
  loanLiftSource: 'EAC-PM working paper · 2024',
  totalVillagesTarget: '6.62 L',
  surveyedAreaSqKm: 67000,
  statesWithMou: 31,
};

// ───────────────────────────────────────────────────
// Legacy exports — used by lib/api.ts, app/api/check, [state] SEO pages, sitemap.
// Phase 6 will replace with real DB queries. For now: realistic mock data.
// ───────────────────────────────────────────────────

// Reusable sample card used by /api/check mock, lib/api parseDocument, etc.
export const SAMPLE_CARD: GharauniCard = {
  cardId: '091434-78921-04',
  owner: 'Ramesh Yadav',
  village: 'Sikandrabad',
  district: 'Bulandshahr',
  state: 'Uttar Pradesh',
  area: '220 sq yd',
  areaSqft: 1980,
  issued: '2024-03-18',
  status: 'READY',
  loanEligible: true,
  eligibilityMin: 800000,
  eligibilityMax: 1500000,
  coordinates: { lat: 28.4543, lng: 77.6912 },
};

// State directory used by /[state] SEO pages and sitemap generation.
// Numbers are approximate, sourced from MoPR state-wise SVAMITVA dashboard (Jan 2026 update).
export const STATES: StateData[] = [
  { code: 'up', name: 'Uttar Pradesh', nameHi: 'उत्तर प्रदेश', cardsIssued: 7800000, villagesCovered: 60000, bhulekhUrl: 'https://upbhulekh.gov.in' },
  { code: 'mp', name: 'Madhya Pradesh', nameHi: 'मध्य प्रदेश', cardsIssued: 4200000, villagesCovered: 38000, bhulekhUrl: 'https://landrecords.mp.gov.in' },
  { code: 'mh', name: 'Maharashtra', nameHi: 'महाराष्ट्र', cardsIssued: 3600000, villagesCovered: 32000, bhulekhUrl: 'https://bhulekh.mahabhumi.gov.in' },
  { code: 'ka', name: 'Karnataka', nameHi: 'कर्नाटक', cardsIssued: 2400000, villagesCovered: 21000, bhulekhUrl: 'https://landrecords.karnataka.gov.in' },
  { code: 'hr', name: 'Haryana', nameHi: 'हरियाणा', cardsIssued: 1800000, villagesCovered: 6800, bhulekhUrl: 'https://jamabandi.nic.in' },
  { code: 'pb', name: 'Punjab', nameHi: 'पंजाब', cardsIssued: 1200000, villagesCovered: 12000, bhulekhUrl: 'https://plrs.org.in' },
  { code: 'uk', name: 'Uttarakhand', nameHi: 'उत्तराखंड', cardsIssued: 900000, villagesCovered: 7000, bhulekhUrl: 'https://devbhoomi.uk.gov.in' },
  { code: 'cg', name: 'Chhattisgarh', nameHi: 'छत्तीसगढ़', cardsIssued: 800000, villagesCovered: 9500, bhulekhUrl: 'https://bhuiyan.cg.nic.in' },
  { code: 'rj', name: 'Rajasthan', nameHi: 'राजस्थान', cardsIssued: 2100000, villagesCovered: 30000, bhulekhUrl: 'https://apnakhata.rajasthan.gov.in' },
  { code: 'br', name: 'Bihar', nameHi: 'बिहार', cardsIssued: 600000, villagesCovered: 18000, bhulekhUrl: 'https://biharbhumi.bihar.gov.in' },
];

// Marketplace listings — used by lib/api.ts (getListings, getListing) and /market/[id]/page.tsx.
export const MOCK_LISTINGS: Listing[] = [
  { id: 'gh-mr-001', village: 'Sikandrabad', district: 'Bulandshahr', state: 'Uttar Pradesh', area: '220 sq yd', areaSqft: 1980, price: '₹18.5 L', priceNum: 1850000, type: 'Residential', verified: true, postedAt: '2026-05-07' },
  { id: 'gh-mr-002', village: 'Mawana', district: 'Meerut', state: 'Uttar Pradesh', area: '180 sq yd', areaSqft: 1620, price: '₹9.5 L', priceNum: 950000, type: 'Residential + Plot', verified: true, postedAt: '2026-05-04' },
  { id: 'gh-mr-003', village: 'Phulpur', district: 'Prayagraj', state: 'Uttar Pradesh', area: '175 sq yd', areaSqft: 1575, price: '₹13.5 L', priceNum: 1350000, type: 'Residential', verified: true, postedAt: '2026-05-09' },
  { id: 'gh-mr-004', village: 'Gauriganj', district: 'Amethi', state: 'Uttar Pradesh', area: '605 sq yd', areaSqft: 5445, price: '₹7.5 L', priceNum: 750000, type: 'Residential + Plot', verified: true, postedAt: '2026-04-30' },
  { id: 'gh-mr-005', village: 'Sardhana', district: 'Meerut', state: 'Uttar Pradesh', area: '340 sq yd', areaSqft: 3060, price: '₹27.5 L', priceNum: 2750000, type: 'Residential', verified: true, postedAt: '2026-05-10' },
  { id: 'gh-mr-006', village: 'Kairana', district: 'Shamli', state: 'Uttar Pradesh', area: '200 sq yd', areaSqft: 1800, price: '₹6.8 L', priceNum: 680000, type: 'Residential + Plot', verified: true, postedAt: '2026-05-02' },
];
