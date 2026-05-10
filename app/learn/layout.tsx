import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Learn Gharauni · घरौनी सीखें',
  description: 'Free vernacular video education on Gharauni / SVAMITVA. How to download, get a loan, resolve disputes, sell. 5 Indian languages.'
};

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return children;
}
