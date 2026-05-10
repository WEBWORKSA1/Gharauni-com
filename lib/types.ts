// ───────────────────────────────────────────────────
// Domain types — single source of truth for all entities
// ───────────────────────────────────────────────────

export interface Lender {
  id: string;
  name: string;
  logo: string; // 2-3 letter shorthand for monogram
  rate: string; // e.g. "9.50%"
  rateNum: number; // 9.5 (for sorting/calculations)
  maxAmt: string; // "₹50L"
  maxAmtNum: number; // 5000000 (in rupees)
  processing: string; // "0.5%"
  tenure: string; // "20 yrs"
  tenureNum: number; // 20
  rating: number; // 4.6
  badge: string | null;
  color: string; // hex for brand color
  affiliateUrl?: string; // set per partner when affiliate signed
}

export interface GharauniCard {
  cardId: string;        // 13-digit ID e.g. "274612-04567-08"
  owner: string;
  village: string;
  district: string;
  state: string;
  area: string;          // "1,200 sq ft"
  areaSqft: number;
  issued: string;        // ISO date
  status: 'READY' | 'IN_PROGRESS' | 'DISPUTED' | 'NOT_FOUND';
  loanEligible: boolean;
  eligibilityMin?: number; // rupees
  eligibilityMax?: number;
  coordinates?: { lat: number; lng: number };
}

export interface Listing {
  id: string; // matches Gharauni ID
  village: string;
  district: string;
  state: string;
  area: string;
  areaSqft: number;
  price: string;
  priceNum: number;
  type: 'Residential' | 'Residential + Plot' | 'Residential + Shop' | 'Commercial';
  verified: boolean;
  postedAt: string;
  ownerContact?: string; // hidden until lead captured
}

export interface Lead {
  intent: 'loan' | 'check' | 'market' | 'title' | 'insurance' | 'dispute' | 'parser';
  name?: string;
  phone?: string;
  email?: string;
  state?: string;
  district?: string;
  village?: string;
  cardId?: string;
  loanAmount?: number;
  preferredLender?: string;
  message?: string;
  source?: string; // page/route that captured
  utm?: Record<string, string>;
  createdAt?: string;
}

export interface StateData {
  code: string;
  name: string;
  nameHi: string;
  cardsIssued: number;
  villagesCovered: number;
  bhulekhUrl?: string;
}

export interface ServiceTile {
  key: string;
  icon: string; // lucide icon name
  route: string;
  color: string;
}

export interface FAQItem {
  q: string;
  a: string;
}
