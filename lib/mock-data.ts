// ───────────────────────────────────────────────────
// Mock data — swap with real API responses in Phase 5
// Every export here is structured to match production shape.
// ───────────────────────────────────────────────────

import type { Lender, GharauniCard, Listing, StateData } from './types';

export const LENDERS: Lender[] = [
  { id: 'bajaj', name: 'Bajaj Finserv', logo: 'BF', rate: '9.50%', rateNum: 9.5, maxAmt: '₹50L', maxAmtNum: 5000000, processing: '0.5%', tenure: '20 yrs', tenureNum: 20, rating: 4.6, badge: 'Lowest Rate', color: '#1E3A8A' },
  { id: 'tata', name: 'Tata Capital', logo: 'TC', rate: '9.75%', rateNum: 9.75, maxAmt: '₹75L', maxAmtNum: 7500000, processing: '0.75%', tenure: '25 yrs', tenureNum: 25, rating: 4.7, badge: 'Highest Amount', color: '#003366' },
  { id: 'abfl', name: 'Aditya Birla Capital', logo: 'AB', rate: '10.25%', rateNum: 10.25, maxAmt: '₹40L', maxAmtNum: 4000000, processing: '1.0%', tenure: '15 yrs', tenureNum: 15, rating: 4.4, badge: null, color: '#C8102E' },
  { id: 'kotak', name: 'Kotak Mahindra', logo: 'KM', rate: '10.50%', rateNum: 10.5, maxAmt: '₹60L', maxAmtNum: 6000000, processing: '0.5%', tenure: '20 yrs', tenureNum: 20, rating: 4.5, badge: 'Fast Approval', color: '#D32F2F' },
  { id: 'hdfc', name: 'HDFC Rural', logo: 'HD', rate: '10.75%', rateNum: 10.75, maxAmt: '₹35L', maxAmtNum: 3500000, processing: '0.85%', tenure: '15 yrs', tenureNum: 15, rating: 4.3, badge: null, color: '#004B8D' },
  { id: 'sbi', name: 'SBI Gram Sampark', logo: 'SBI', rate: '9.85%', rateNum: 9.85, maxAmt: '₹45L', maxAmtNum: 4500000, processing: '0.35%', tenure: '20 yrs', tenureNum: 20, rating: 4.5, badge: 'PSU Trusted', color: '#22409A' },
  { id: 'icici', name: 'ICICI Bank Rural', logo: 'IC', rate: '10.10%', rateNum: 10.1, maxAmt: '₹55L', maxAmtNum: 5500000, processing: '0.65%', tenure: '20 yrs', tenureNum: 20, rating: 4.4, badge: null, color: '#F37920' },
  { id: 'axis', name: 'Axis Bank Gramin', logo: 'AX', rate: '10.30%', rateNum: 10.3, maxAmt: '₹50L', maxAmtNum: 5000000, processing: '0.75%', tenure: '18 yrs', tenureNum: 18, rating: 4.3, badge: null, color: '#97144D' },
  { id: 'pnb', name: 'PNB Krishi Awaas', logo: 'PNB', rate: '9.90%', rateNum: 9.9, maxAmt: '₹40L', maxAmtNum: 4000000, processing: '0.40%', tenure: '20 yrs', tenureNum: 20, rating: 4.2, badge: null, color: '#A03020' },
  { id: 'union', name: 'Union Bank Gram', logo: 'UB', rate: '9.95%', rateNum: 9.95, maxAmt: '₹35L', maxAmtNum: 3500000, processing: '0.50%', tenure: '15 yrs', tenureNum: 15, rating: 4.1, badge: null, color: '#E2231A' },
  { id: 'iifl', name: 'IIFL Home Finance', logo: 'IIFL', rate: '10.95%', rateNum: 10.95, maxAmt: '₹30L', maxAmtNum: 3000000, processing: '1.25%', tenure: '15 yrs', tenureNum: 15, rating: 4.2, badge: 'NBFC', color: '#0A2540' }
];

export const STATES: StateData[] = [
  { code: 'up', name: 'Uttar Pradesh', nameHi: 'उत्तर प्रदेश', cardsIssued: 8500000, villagesCovered: 62000, bhulekhUrl: 'https://upbhulekh.gov.in' },
  { code: 'mp', name: 'Madhya Pradesh', nameHi: 'मध्य प्रदेश', cardsIssued: 4200000, villagesCovered: 41000, bhulekhUrl: 'https://mpbhuabhilekh.nic.in' },
  { code: 'mh', name: 'Maharashtra', nameHi: 'महाराष्ट्र', cardsIssued: 3800000, villagesCovered: 28000, bhulekhUrl: 'https://bhulekh.mahabhumi.gov.in' },
  { code: 'ka', name: 'Karnataka', nameHi: 'कर्नाटक', cardsIssued: 2900000, villagesCovered: 19000, bhulekhUrl: 'https://landrecords.karnataka.gov.in' },
  { code: 'hr', name: 'Haryana', nameHi: 'हरियाणा', cardsIssued: 2100000, villagesCovered: 6800 },
  { code: 'pb', name: 'Punjab', nameHi: 'पंजाब', cardsIssued: 1900000, villagesCovered: 12000 },
  { code: 'uk', name: 'Uttarakhand', nameHi: 'उत्तराखंड', cardsIssued: 800000, villagesCovered: 7500 },
  { code: 'cg', name: 'Chhattisgarh', nameHi: 'छत्तीसगढ़', cardsIssued: 1500000, villagesCovered: 19500 },
  { code: 'rj', name: 'Rajasthan', nameHi: 'राजस्थान', cardsIssued: 2400000, villagesCovered: 28000 },
  { code: 'br', name: 'Bihar', nameHi: 'बिहार', cardsIssued: 1100000, villagesCovered: 38000 }
];

export const SAMPLE_CARD: GharauniCard = {
  cardId: '274612-04567-08',
  owner: 'राम कुमार सिंह',
  village: 'Bharatpur',
  district: 'Kanpur Dehat',
  state: 'Uttar Pradesh',
  area: '1,200 sq ft',
  areaSqft: 1200,
  issued: '2025-01-18',
  status: 'READY',
  loanEligible: true,
  eligibilityMin: 680000,
  eligibilityMax: 920000,
  coordinates: { lat: 26.4499, lng: 80.3319 }
};

export const MOCK_LISTINGS: Listing[] = [
  { id: 'UP-12-04567', village: 'Bharatpur, Kanpur Dehat', district: 'Kanpur Dehat', state: 'Uttar Pradesh', area: '1,200 sq ft', areaSqft: 1200, price: '₹8.5L', priceNum: 850000, type: 'Residential', verified: true, postedAt: '2026-03-15' },
  { id: 'MH-08-23145', village: 'Wadgaon, Pune', district: 'Pune', state: 'Maharashtra', area: '2,100 sq ft', areaSqft: 2100, price: '₹14.2L', priceNum: 1420000, type: 'Residential + Plot', verified: true, postedAt: '2026-03-22' },
  { id: 'MP-15-09823', village: 'Sehore, Bhopal', district: 'Sehore', state: 'Madhya Pradesh', area: '950 sq ft', areaSqft: 950, price: '₹5.8L', priceNum: 580000, type: 'Residential', verified: true, postedAt: '2026-04-01' },
  { id: 'KA-22-11234', village: 'Tumkur, Bangalore Rural', district: 'Tumkur', state: 'Karnataka', area: '1,800 sq ft', areaSqft: 1800, price: '₹22L', priceNum: 2200000, type: 'Residential + Shop', verified: true, postedAt: '2026-04-10' },
  { id: 'UP-31-09812', village: 'Sadabad, Hathras', district: 'Hathras', state: 'Uttar Pradesh', area: '1,500 sq ft', areaSqft: 1500, price: '₹6.2L', priceNum: 620000, type: 'Residential', verified: true, postedAt: '2026-04-12' },
  { id: 'RJ-09-44521', village: 'Bagru, Jaipur', district: 'Jaipur', state: 'Rajasthan', area: '2,400 sq ft', areaSqft: 2400, price: '₹18.5L', priceNum: 1850000, type: 'Residential + Plot', verified: true, postedAt: '2026-04-18' }
];

export const VIDEOS = [
  { title: 'घरौनी क्या है? पूरी जानकारी', views: '2.3L views', dur: '8:42', lang: 'हिंदी' },
  { title: 'घरौनी पर लोन कैसे लें — स्टेप बाय स्टेप', views: '1.8L views', dur: '12:15', lang: 'हिंदी' },
  { title: 'Gharauni disputes — कैसे सुलझाएँ', views: '94K views', dur: '9:30', lang: 'हिंदी' },
  { title: 'SVAMITVA card download tutorial', views: '3.1L views', dur: '6:20', lang: 'English' },
  { title: 'गाँव की ज़मीन बेचने का सही तरीका', views: '1.2L views', dur: '11:08', lang: 'हिंदी' },
  { title: 'ఘరౌని పత్రం వివరణ', views: '67K views', dur: '10:14', lang: 'తెలుగు' }
];
