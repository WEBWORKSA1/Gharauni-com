import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Status Check · घरौनी स्थिति जाँचें',
  description: 'Check your Gharauni / SVAMITVA card status instantly. Free. Across 31 states. Enter village name or 13-digit Gharauni ID.'
};

export default function CheckLayout({ children }: { children: React.ReactNode }) {
  return children;
}
