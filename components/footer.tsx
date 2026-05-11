import Link from 'next/link';
import { Seal } from './seal';
import { ROUTES } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="bg-ink-900 text-ivory-50 pt-16 px-6 pb-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-10">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Seal />
              <div className="display text-2xl text-ivory-50">घरौनी</div>
            </div>
            <p className="text-ink-400 text-sm leading-relaxed">
              India&rsquo;s first dedicated platform for SVAMITVA cardholders.
            </p>
          </div>
          <div>
            <div className="font-semibold mb-3 text-ivory-50">Services</div>
            <Link href={ROUTES.loan} className="block py-1.5 text-ink-400 text-sm hover:text-ivory-200">Loan Comparison</Link>
            <Link href={ROUTES.check} className="block py-1.5 text-ink-400 text-sm hover:text-ivory-200">Status Check</Link>
            <Link href={ROUTES.title} className="block py-1.5 text-ink-400 text-sm hover:text-ivory-200">Title Verification</Link>
            <Link href={ROUTES.market} className="block py-1.5 text-ink-400 text-sm hover:text-ivory-200">Marketplace</Link>
            <Link href={ROUTES.insurance} className="block py-1.5 text-ink-400 text-sm hover:text-ivory-200">Insurance</Link>
          </div>
          <div>
            <div className="font-semibold mb-3 text-ivory-50">Company</div>
            <Link href="/about" className="block py-1.5 text-ink-400 text-sm hover:text-ivory-200">About</Link>
            <Link href="/contact" className="block py-1.5 text-ink-400 text-sm hover:text-ivory-200">Contact</Link>
            <Link href={ROUTES.parser} className="block py-1.5 text-ink-400 text-sm hover:text-ivory-200">Developer API</Link>
            <Link href={ROUTES.learn} className="block py-1.5 text-ink-400 text-sm hover:text-ivory-200">Learn</Link>
            <Link href="/partners" className="block py-1.5 text-ink-400 text-sm hover:text-ivory-200">Partnerships</Link>
          </div>
          <div>
            <div className="font-semibold mb-3 text-ivory-50">Legal</div>
            <Link href="/privacy" className="block py-1.5 text-ink-400 text-sm hover:text-ivory-200">Privacy Policy</Link>
            <Link href="/terms" className="block py-1.5 text-ink-400 text-sm hover:text-ivory-200">Terms of Service</Link>
            <Link href="/contact" className="block py-1.5 text-ink-400 text-sm hover:text-ivory-200">Legal contact</Link>
            <div className="py-1.5 text-ink-400 text-xs mt-3">DPDP Act 2023 compliant</div>
          </div>
          <div>
            <div className="font-semibold mb-3 text-ivory-50">Languages</div>
            {['हिंदी', 'English', 'मराठी', 'తెలుగు', 'भोजपुरी'].map(s =>
              <div key={s} className="py-1.5 text-ink-400 text-sm">{s}</div>)}
          </div>
        </div>
        <div className="border-t border-ink-800 pt-6 flex justify-between flex-wrap gap-3 text-[13px] text-ink-400">
          <div>© 2026 Gharauni.com · A WebWorks venture</div>
          <div className="mono">Not affiliated with Govt of India · Independent aggregator</div>
        </div>
      </div>
    </footer>
  );
}
