import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Rural Property Marketplace · ग्रामीण बाज़ार',
  description: 'Verified-by-Gharauni-ID rural property marketplace. Every listing tied to a real 13-digit SVAMITVA card. No fake titles, no disputes.'
};

export default function MarketLayout({ children }: { children: React.ReactNode }) {
  return children;
}
