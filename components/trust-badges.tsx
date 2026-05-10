import { CheckCircle2, ShieldCheck, Award, Building2 } from 'lucide-react';

export function TrustBadges() {
  const items = [
    { icon: ShieldCheck, label: 'SSL Encrypted' },
    { icon: CheckCircle2, label: 'DPDP Compliant' },
    { icon: Award, label: 'SVAMITVA Aligned' },
    { icon: Building2, label: 'RBI Partner Network' }
  ];
  return (
    <div className="flex flex-wrap gap-4 sm:gap-6 items-center justify-center py-6">
      {items.map((b, i) => (
        <div key={i} className="flex items-center gap-2 text-sm text-ink-700">
          <b.icon size={18} className="text-terracotta-600" />
          <span className="font-semibold">{b.label}</span>
        </div>
      ))}
    </div>
  );
}
