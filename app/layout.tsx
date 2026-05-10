import type { Metadata, Viewport } from 'next';
import { Crimson_Pro, Tiro_Devanagari_Hindi, DM_Mono } from 'next/font/google';
import { CookieBanner } from '@/components/cookie-banner';
import { WhatsAppButton } from '@/components/whatsapp-button';
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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://gharauni-com.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Gharauni · घरौनी — SVAMITVA Loans, Status Check, Marketplace',
    template: '%s · Gharauni'
  },
  description: 'India’s first dedicated platform for 30M+ SVAMITVA cardholders. Check Gharauni status, compare loans from 11 banks, verified rural property marketplace.',
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
    description: 'Loans, status, marketplace for 30M+ SVAMITVA cardholders.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Gharauni.com' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gharauni · घरौनी',
    description: 'India’s rural property platform.'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' }
  },
  alternates: {
    canonical: '/',
    languages: { 'hi-IN': '/', 'en-IN': '/en' }
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined
  }
};

export const viewport: Viewport = {
  themeColor: '#7C2D12',
  width: 'device-width',
  initialScale: 1
};

// JSON-LD Organization schema for rich snippets
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Gharauni',
  alternateName: 'घरौनी',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  sameAs: [],
  description: 'India’s first dedicated platform for SVAMITVA cardholders.',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'hello@gharauni.com',
    availableLanguage: ['Hindi', 'English', 'Marathi', 'Telugu', 'Bhojpuri']
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hi" className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="font-body bg-ivory-50 text-ink-900 antialiased">
        {children}
        <CookieBanner />
        <WhatsAppButton />
      </body>
    </html>
  );
}
