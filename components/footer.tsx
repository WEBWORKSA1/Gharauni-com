import Link from 'next/link';
import { Seal } from './seal';
import { ROUTES } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="bg-ink-900 text-ivory-50 pt-16 px-6 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Seal />
              <div className="display text-2xl text-ivory-50">घरौनी</div>
            </div>
            <p className="text-ink-400 text-sm leading-relaxed">
              India’s first dedicated platform for SVAMITVA cardholders.
            </p>
          </div>

          <div>
            <div className="font-semibold mb-3 text-ivory-50">Services</div>
            {[
              { l: 'Loan Comparison', h: ROUTES.loan },
              { l: 'Status Check', h: ROUTES.check },
              { l: 'Title Verification', h: ROUTES.title },
              { l: 'Marketplace', h: ROUTES.market },
              { l: 'Insurance', h: ROUTES.insurance }
            ].map(s =>
              <Link key={s.l} href={s.h} className="block py-1.5 text-ink-400 text-sm hover:text-ivory-200">{s.l}</Link>
            )}
          </div>

          <div>
            <div className="font-semibold mb-3 text-ivory-50">Languages</div>
            {['हिंदी', 'English', 'मराठी', 'తెలుగు', 'भोजपुरी'].map(s =>
              <div key={s} className="py-1.5 text-ink-400 text-sm">{s}</div>)}
          </div>

          <div>
            <div className="font-semibold mb-3 text-ivory-50">Trust</div>
            <div className="py-1.5 text-ink-400 text-sm">SVAMITVA-aligned data</div>
            <div className="py-1.5 text-ink-400 text-sm">RBI partner-lender ecosystem</div>
            <div className="py-1.5 text-ink-400 text-sm">SSL · Aadhaar e-KYC</div>
          </div>
        </div>

        <div className="border-t border-ink-800 pt-6 flex justify-between flex-wrap gap-3 text-[13px] text-ink-400">
          <div>© 2026 Gharauni.com · India’s Largest Rural Property Platform</div>
          <div className="mono">Not affiliated with Govt of India · Aggregator platform</div>
        </div>
      </div>
    </footer>
  );
}
