import type { Metadata, Viewport } from 'next';
import { Crimson_Pro, Tiro_Devanagari_Hindi, DM_Mono } from 'next/font/google';
import './globals.css';

const displayFont = Tiro_Devanagari_Hindi({
  weight: '400',
  subsets: ['latin', 'devanagari'],
  variable: '--font-display',
  display: 'swap'
});

const bodyFont = Crimson_Pro({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap'
});

const monoFont = DM_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap'
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://gharauni.com'),
  title: {
    default: 'Gharauni · घरौनी — SVAMITVA Loans, Status Check, Marketplace',
    template: '%s · Gharauni'
  },
  description: 'India\u2019s first dedicated platform for 30M+ SVAMITVA cardholders. Check Gharauni status, compare loans from 11 banks, verified rural property marketplace.',
  keywords: [
    'gharauni', 'घरौनी', 'svamitva', 'svamitva card', 'rural property loan',
    'gharauni download', 'gharauni status', 'svamitva yojana', 'property card India',
    'village property loan', 'loan against gharauni'
  ],
  openGraph: {
    type: 'website',
    locale: 'hi_IN',
    alternateLocale: ['en_IN', 'mr_IN', 'te_IN'],
    siteName: 'Gharauni',
    title: 'Gharauni — Your Village. Your Home. Your Right.',
    description: 'Loans, status, marketplace for 30M+ SVAMITVA cardholders.'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gharauni · घरौनी',
    description: 'India\u2019s rural property platform.'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' }
  },
  alternates: {
    canonical: '/',
    languages: {
      'hi-IN': '/',
      'en-IN': '/en'
    }
  }
};

export const viewport: Viewport = {
  themeColor: '#7C2D12',
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hi" className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}>
      <body className="font-body bg-ivory-50 text-ink-900 antialiased">
        {children}
      </body>
    </html>
  );
}
