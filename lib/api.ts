// ───────────────────────────────────────────────────
// API layer — production stubs.
// In Phase 5, swap mock returns for real fetch() calls to:
//   - SVAMITVA central registry (when partnership signed)
//   - State Bhulekh portals (UP, MP, MH — see lib/constants)
//   - Internal API routes (/api/leads, /api/check) — built in Phase 4
// ───────────────────────────────────────────────────

import type { GharauniCard, Lead, Listing } from './types';
import { SAMPLE_CARD, MOCK_LISTINGS } from './mock-data';

export interface CheckStatusInput {
  state: string;
  district?: string;
  village: string;
  cardId?: string;
}

/**
 * Check Gharauni status by village + optional card ID.
 * MOCK: returns SAMPLE_CARD with overrides after 1.2s delay.
 * PROD: POST to /api/check → routes to state Bhulekh + SVAMITVA registry.
 */
export async function checkStatus(input: CheckStatusInput): Promise<GharauniCard> {
  await new Promise(r => setTimeout(r, 1200));
  return {
    ...SAMPLE_CARD,
    village: input.village || SAMPLE_CARD.village,
    state: input.state || SAMPLE_CARD.state,
    district: input.district || SAMPLE_CARD.district,
    cardId: input.cardId || SAMPLE_CARD.cardId
  };
}

/**
 * Submit a lead (loan, insurance, dispute, marketplace).
 * MOCK: console.log + simulated success after 800ms.
 * PROD: POST to /api/leads → routes to webhook (n8n/Make/Airtable).
 */
export async function submitLead(lead: Lead): Promise<{ ok: boolean; id?: string; error?: string }> {
  await new Promise(r => setTimeout(r, 800));
  if (typeof window !== 'undefined') {
    console.log('[Gharauni] Lead captured (mock):', lead);
  }
  return { ok: true, id: `lead_${Date.now()}` };
}

/**
 * Get marketplace listings.
 * MOCK: returns filtered MOCK_LISTINGS.
 * PROD: GET /api/listings with query params → PostgreSQL.
 */
export async function getListings(filters?: {
  state?: string;
  district?: string;
  minPrice?: number;
  maxPrice?: number;
}): Promise<Listing[]> {
  await new Promise(r => setTimeout(r, 300));
  let results = [...MOCK_LISTINGS];
  if (filters?.state) results = results.filter(l => l.state === filters.state);
  if (filters?.district) results = results.filter(l => l.district === filters.district);
  if (filters?.minPrice) results = results.filter(l => l.priceNum >= filters.minPrice!);
  if (filters?.maxPrice) results = results.filter(l => l.priceNum <= filters.maxPrice!);
  return results;
}

/**
 * Fetch single listing by Gharauni ID.
 */
export async function getListing(id: string): Promise<Listing | null> {
  await new Promise(r => setTimeout(r, 200));
  return MOCK_LISTINGS.find(l => l.id === id) || null;
}

/**
 * Parse a Gharauni PDF (B2B parser product).
 * MOCK: returns SAMPLE_CARD shape.
 * PROD: multipart upload → OCR + LLM extraction.
 */
export async function parseDocument(_file: File): Promise<GharauniCard & { confidence: number }> {
  await new Promise(r => setTimeout(r, 1500));
  return { ...SAMPLE_CARD, confidence: 0.987 };
}
