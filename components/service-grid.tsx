import Link from 'next/link';
import {
  Search, Banknote, Shield, Building2, Cpu,
  Umbrella, Youtube, FileCheck, ArrowRight
} from 'lucide-react';

const ICON_MAP: Record<string, any> = {
  Search, Banknote, Shield, Building2, Cpu, Umbrella, Youtube, FileCheck
};

interface ServiceItem {
  key: string;
  icon: string;
  route: string;
  color: string;
  title: string;
  desc: string;
}

interface ServiceGridProps {
  heading?: string;
  label?: string;
  services?: ServiceItem[];
}

// Default services shown when no `services` prop is passed.
// Mirrors the 8 tiers advertised on the homepage.
const DEFAULT_SERVICES: ServiceItem[] = [
  { key: 'check',    icon: 'Search',    route: '/check',    color: '#c54a1f', title: 'Check Status',     desc: 'See if your SVAMITVA card is ready. Free, 30 seconds, no Aadhaar OTP.' },
  { key: 'loan',     icon: 'Banknote',  route: '/loan',     color: '#c54a1f', title: 'Compare Loans',    desc: '11 lenders. Lowest rate auto-highlighted. EMI calculator built in.' },
  { key: 'title',    icon: 'Shield',    route: '/title',    color: '#3a7a4f', title: 'Title Verification', desc: '\u20b9499 signed report. Cross-checks SVAMITVA + state Bhulekh + disputes.' },
  { key: 'market',   icon: 'Building2', route: '/market',   color: '#c54a1f', title: 'Marketplace',       desc: 'Verified rural property listings. Hyperlocal. Direct seller contact.' },
  { key: 'parser',   icon: 'Cpu',       route: '/parser',   color: '#1f4d80', title: 'PDF Parser API',    desc: 'Developer tool. Extract structured data from any Gharauni PDF in 1.4s.' },
  { key: 'insurance',icon: 'Umbrella',  route: '/insurance',color: '#b8810a', title: 'Home Insurance',    desc: '6 insurers compared. Cover from \u20b91,200/yr for fire, flood, theft.' },
  { key: 'learn',    icon: 'Youtube',   route: '/learn',    color: '#1f4d80', title: 'Learn',             desc: '90-second Hindi videos. Plain explanations. Real use cases.' },
  { key: 'dispute',  icon: 'FileCheck', route: '/dispute',  color: '#b8810a', title: 'Dispute Help',      desc: 'Free Hindi guide. Verified lawyers when you need them. Fixed pricing.' },
];

export function ServiceGrid({ heading, label, services }: ServiceGridProps = {}) {
  const items = services ?? DEFAULT_SERVICES;
  const showHeader = Boolean(heading || label);

  return (
    <div className="max-w-7xl mx-auto">
      {showHeader && (
        <div className="mb-14 max-w-3xl">
          {label && <div className="mono text-xs text-terracotta-600 tracking-widest mb-3">{label}</div>}
          {heading && (
            <h2 className="display text-4xl sm:text-5xl lg:text-6xl m-0 leading-tight">{heading}</h2>
          )}
        </div>
      )}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map(s => {
          const Icon = ICON_MAP[s.icon] || Search;
          return (
            <Link
              key={s.key}
              href={s.route}
              className="hover-lift bg-ivory-50 border-[1.5px] border-ivory-200 p-7 cursor-pointer relative block min-h-[200px]"
            >
              <div
                className="w-12 h-12 flex items-center justify-center mb-5 text-ivory-50"
                style={{ background: s.color }}
              >
                <Icon size={22} />
              </div>
              <div className="display text-2xl mb-2 text-ink-900">{s.title}</div>
              <div className="text-sm text-ink-700 leading-relaxed">{s.desc}</div>
              <div className="absolute bottom-4 right-4" style={{ color: s.color }}>
                <ArrowRight size={20} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
