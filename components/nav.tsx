'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Seal } from './seal';
import { ROUTES } from '@/lib/constants';
import { SUPPORTED_LANGS, type Lang } from '@/lib/i18n';
import { cn } from '@/lib/utils';

interface NavProps {
  lang?: Lang;
  onLangChange?: (l: Lang) => void;
}

const PRIMARY_LINKS = [
  { href: ROUTES.check, label: 'Check Status', labelHi: 'स्थिति' },
  { href: ROUTES.loan, label: 'Get Loan', labelHi: 'लोन' },
  { href: ROUTES.market, label: 'Market', labelHi: 'बाज़ार' },
  { href: ROUTES.learn, label: 'Learn', labelHi: 'सीखें' }
];

const MORE_LINKS = [
  { href: ROUTES.title, label: 'Title Verification' },
  { href: ROUTES.parser, label: 'Parser API' },
  { href: ROUTES.insurance, label: 'Insurance' },
  { href: ROUTES.dispute, label: 'Dispute Tracker' }
];

export function Nav({ lang = 'hi', onLangChange }: NavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  return (
    <>
      {/* TOP STRIPE */}
      <div className="bg-ink-900 text-ivory-50 py-2 text-center text-[13px] mono">
        🇮🇳 Verified rural property platform · SVAMITVA Scheme aligned · 30M+ cards supported
      </div>

      <nav className="bg-ivory-50 border-b border-ivory-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Seal />
            <div>
              <div className="display text-2xl text-terracotta-600 leading-none">घरौनी</div>
              <div className="mono text-[10px] text-ink-500 tracking-[0.1em] mt-0.5">.COM · EST. 2026</div>
            </div>
          </Link>

          {/* DESKTOP */}
          <div className="hidden md:flex items-center gap-1">
            {PRIMARY_LINKS.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className="px-4 py-2 text-[15px] font-semibold text-ink-900 hover:bg-ivory-100 transition rounded-sm"
              >
                {lang === 'hi' ? l.labelHi : l.label}
              </Link>
            ))}

            {/* MORE dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setMoreOpen(true)}
              onMouseLeave={() => setMoreOpen(false)}
            >
              <button className="px-4 py-2 text-[15px] font-semibold text-ink-900 hover:bg-ivory-100 transition rounded-sm flex items-center gap-1">
                More <ChevronDown size={14} />
              </button>
              {moreOpen && (
                <div className="absolute top-full right-0 bg-ivory-50 border border-ivory-200 shadow-lg py-2 min-w-[200px]">
                  {MORE_LINKS.map(l => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="block px-5 py-2.5 text-sm text-ink-900 hover:bg-ivory-100"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="w-px h-6 bg-ivory-300 mx-2" />

            {/* LANG SWITCHER */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="px-3 py-1.5 border border-terracotta-600 text-terracotta-600 text-[13px] font-semibold rounded-sm hover:bg-terracotta-600 hover:text-ivory-50 transition flex items-center gap-1.5"
              >
                {SUPPORTED_LANGS.find(l => l.code === lang)?.native ?? 'हिंदी'}
                <ChevronDown size={12} />
              </button>
              {langOpen && (
                <div className="absolute top-full right-0 mt-1 bg-ivory-50 border border-ivory-200 shadow-lg py-1 min-w-[140px] z-50">
                  {SUPPORTED_LANGS.map(l => (
                    <button
                      key={l.code}
                      onClick={() => {
                        onLangChange?.(l.code);
                        setLangOpen(false);
                      }}
                      className={cn(
                        'w-full text-left px-4 py-2 text-sm hover:bg-ivory-100',
                        l.code === lang ? 'text-terracotta-600 font-semibold' : 'text-ink-900'
                      )}
                    >
                      {l.native}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* MOBILE PANEL */}
        {mobileOpen && (
          <div className="md:hidden border-t border-ivory-200 px-6 py-4 bg-ivory-50">
            <div className="flex flex-col gap-1">
              {[...PRIMARY_LINKS, ...MORE_LINKS.map(l => ({ ...l, labelHi: l.label }))].map(l => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-base font-semibold text-ink-900 border-b border-ivory-200 last:border-0"
                >
                  {lang === 'hi' ? (l as any).labelHi : l.label}
                </Link>
              ))}
              <div className="flex gap-2 mt-3 flex-wrap">
                {SUPPORTED_LANGS.map(l => (
                  <button
                    key={l.code}
                    onClick={() => {
                      onLangChange?.(l.code);
                      setMobileOpen(false);
                    }}
                    className={cn(
                      'px-3 py-1.5 text-sm border rounded-sm',
                      l.code === lang
                        ? 'bg-terracotta-600 text-ivory-50 border-terracotta-600'
                        : 'border-ivory-300 text-ink-900'
                    )}
                  >
                    {l.native}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
