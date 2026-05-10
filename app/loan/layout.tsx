import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Loan Against Gharauni · घरौनी पर लोन',
  description: 'Compare loans from 11 banks and NBFCs against your SVAMITVA card. Rates from 9.5%. Up to ₹75 lakh. 60-second eligibility check.'
};

export default function LoanLayout({ children }: { children: React.ReactNode }) {
  return children;
}
