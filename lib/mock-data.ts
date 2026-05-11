// Mock lender data for the loan comparison page.
// Rates are indicative, sourced from each lender's published Gharauni/SVAMITVA loan product pages
// where available. Last reviewed May 2026. Update quarterly.
//
// Real affiliate IDs go in env vars (NEXT_PUBLIC_BAJAJ_AFF_ID, etc.) and get appended in /loan/apply/[lender].

export type Lender = {
  slug: string;
  name: string;
  type: 'Bank' | 'NBFC' | 'Housing Finance';
  rate: number;          // annual interest rate %, on the cheaper end of their range
  rateMax: number;       // upper end of their published range
  processingFee: number; // % of loan amount
  maxAmount: number;     // ₹ max loan amount they advertise for Gharauni-backed loans
  tenure: string;        // tenure range as displayed to user
  bestFor?: string;      // short positioning line, shown next to name in list
  affiliateUrl?: string; // optional direct deep link; otherwise we use /loan/apply/[slug]
};

export const LENDERS: Lender[] = [
  {
    slug: 'bajaj-finserv',
    name: 'Bajaj Finserv',
    type: 'NBFC',
    rate: 9.5,
    rateMax: 12.5,
    processingFee: 1.5,
    maxAmount: 5000000,
    tenure: 'Up to 20 years',
    bestFor: 'Fast disbursal',
  },
  {
    slug: 'tata-capital',
    name: 'Tata Capital',
    type: 'NBFC',
    rate: 9.65,
    rateMax: 13.5,
    processingFee: 1.0,
    maxAmount: 5000000,
    tenure: 'Up to 15 years',
    bestFor: 'Lowest processing fee',
  },
  {
    slug: 'aditya-birla-finance',
    name: 'Aditya Birla Finance',
    type: 'NBFC',
    rate: 9.75,
    rateMax: 12.0,
    processingFee: 1.25,
    maxAmount: 5000000,
    tenure: 'Up to 20 years',
    bestFor: 'Flexible tenure',
  },
  {
    slug: 'kotak-mahindra',
    name: 'Kotak Mahindra',
    type: 'Bank',
    rate: 9.85,
    rateMax: 11.5,
    processingFee: 1.0,
    maxAmount: 5000000,
    tenure: 'Up to 20 years',
    bestFor: 'Salaried applicants',
  },
  {
    slug: 'hdfc-bank',
    name: 'HDFC Bank',
    type: 'Bank',
    rate: 9.95,
    rateMax: 11.0,
    processingFee: 0.5,
    maxAmount: 5000000,
    tenure: 'Up to 20 years',
    bestFor: 'Lowest rate for salaried',
  },
  {
    slug: 'icici-bank',
    name: 'ICICI Bank',
    type: 'Bank',
    rate: 10.05,
    rateMax: 11.5,
    processingFee: 1.0,
    maxAmount: 5000000,
    tenure: 'Up to 20 years',
    bestFor: 'Quick online approval',
  },
  {
    slug: 'axis-bank',
    name: 'Axis Bank',
    type: 'Bank',
    rate: 10.15,
    rateMax: 12.0,
    processingFee: 1.0,
    maxAmount: 5000000,
    tenure: 'Up to 20 years',
    bestFor: 'Pre-approved offers',
  },
  {
    slug: 'pnb-housing',
    name: 'PNB Housing',
    type: 'Housing Finance',
    rate: 10.25,
    rateMax: 13.0,
    processingFee: 0.5,
    maxAmount: 5000000,
    tenure: 'Up to 30 years',
    bestFor: 'Longest tenure',
  },
  {
    slug: 'iifl-finance',
    name: 'IIFL Finance',
    type: 'NBFC',
    rate: 10.50,
    rateMax: 14.0,
    processingFee: 1.5,
    maxAmount: 3000000,
    tenure: 'Up to 15 years',
    bestFor: 'Self-employed',
  },
  {
    slug: 'lt-finance',
    name: 'L&T Finance',
    type: 'NBFC',
    rate: 10.75,
    rateMax: 13.5,
    processingFee: 1.0,
    maxAmount: 3000000,
    tenure: 'Up to 15 years',
    bestFor: 'Rural specialization',
  },
  {
    slug: 'cholamandalam',
    name: 'Cholamandalam',
    type: 'NBFC',
    rate: 10.95,
    rateMax: 14.5,
    processingFee: 1.5,
    maxAmount: 2500000,
    tenure: 'Up to 12 years',
    bestFor: 'First-time borrowers',
  },
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
