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
  heading: string;
  label: string;
  services: ServiceItem[];
}

export function ServiceGrid({ heading, label, services }: ServiceGridProps) {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 max-w-3xl">
          <div className="mono text-xs text-terracotta-600 tracking-widest mb-3">{label}</div>
          <h2 className="display text-4xl sm:text-5xl lg:text-6xl m-0 leading-tight">
            {heading}
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map(s => {
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
    </section>
  );
}
