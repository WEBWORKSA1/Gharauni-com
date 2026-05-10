'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const accepted = localStorage.getItem('gharauni_cookie_consent');
    if (!accepted) {
      // Slight delay so it doesn’t flash on first load
      const t = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('gharauni_cookie_consent', JSON.stringify({
      accepted: true,
      ts: new Date().toISOString()
    }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:max-w-md bg-ink-900 text-ivory-50 p-5 shadow-2xl z-50 border border-terracotta-600"
         style={{ animation: 'fadeUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) both' }}>
      <button onClick={() => setVisible(false)} className="absolute top-3 right-3 text-ink-400 hover:text-ivory-50" aria-label="Close">
        <X size={16} />
      </button>
      <div className="display text-lg mb-2">कुकी सूचना</div>
      <p className="text-sm text-ink-300 mb-4 leading-relaxed">
        We use first-party cookies and Plausible Analytics (cookieless) to improve your experience. No ad trackers, no data sales. <Link href="/privacy" className="text-amber-300 underline">Read more</Link>.
      </p>
      <div className="flex gap-2">
        <button onClick={accept} className="bg-amber-300 text-ink-900 px-4 py-2 text-sm font-semibold flex-1">
          स्वीकार करें · Accept
        </button>
        <Link href="/privacy" className="bg-transparent text-ivory-50 border border-ink-700 px-4 py-2 text-sm font-semibold">
          Details
        </Link>
      </div>
    </div>
  );
}
