import { TrendingUp, Home, MapPin, IndianRupee } from 'lucide-react';

// Stat band — numbers anchored to source + date, so they feel like reporting, not marketing.

type Stat = {
  icon: React.ComponentType<{ className?: string }>;
  number: string;
  numberHi?: string;
  label: string;
  labelHi: string;
  source: string;
};

const stats: Stat[] = [
  {
    icon: Home,
    number: '3.06 cr',
    numberHi: '3.06 करोड़',
    label: 'Property cards prepared',
    labelHi: 'संपत्ति कार्ड तैयार',
    source: 'MoPR · Jan 2026',
  },
  {
    icon: MapPin,
    number: '1.86 L',
    numberHi: '1.86 लाख',
    label: 'Villages covered',
    labelHi: 'गाँव कवर',
    source: '92% of target',
  },
  {
    icon: IndianRupee,
    number: '₹132 L cr',
    numberHi: '₹132 लाख करोड़',
    label: 'Asset value unlocked',
    labelHi: 'संपत्ति मूल्य का जागरण',
    source: 'PM speech · 2025',
  },
  {
    icon: TrendingUp,
    number: '+23%',
    numberHi: '+23%',
    label: 'Loan sanctions lift',
    labelHi: 'लोन मंजूरी में वृद्धि',
    source: 'EAC-PM study · 2024',
  },
];

export function StatBand() {
  return (
    <section className="border-b border-ink/10 bg-ink text-paper" aria-label="SVAMITVA Scheme key numbers">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="text-center mb-10">
          <div className="text-[11px] uppercase tracking-[0.2em] text-terracotta/70 mb-2">By the numbers</div>
          <h2 className="font-serif text-2xl lg:text-3xl text-paper">India's largest property formalization, ever.</h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-paper/10 rounded-lg overflow-hidden">
          {stats.map((s) => (
            <div key={s.label} className="bg-ink p-7 flex flex-col items-start">
              <s.icon className="w-5 h-5 text-terracotta mb-3" aria-hidden />
              <div className="font-serif text-4xl lg:text-5xl text-paper leading-none mb-1">{s.number}</div>
              <div className="text-sm text-paper/70 mt-2">{s.label}</div>
              <div className="text-xs text-paper/40 mt-3 pt-3 border-t border-paper/10 w-full">{s.source}</div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-paper/40 mt-6">
          Sources: Ministry of Panchayati Raj official statistics, Economic Advisory Council to PM working paper, public addresses.
        </p>
      </div>
    </section>
  );
}
