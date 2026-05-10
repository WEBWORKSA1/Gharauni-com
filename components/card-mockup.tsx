import { Seal } from './seal';
import { Banknote } from 'lucide-react';
import type { GharauniCard } from '@/lib/types';
import { formatINR } from '@/lib/utils';

interface CardMockupProps {
  card: GharauniCard;
  showEligibility?: boolean;
  rotate?: number;
}

export function CardMockup({ card, showEligibility = true, rotate = 1.5 }: CardMockupProps) {
  return (
    <div>
      <div
        className="bg-ivory-50 border-2 border-ink-900 p-7 relative shadow-2xl"
        style={{ transform: `rotate(${rotate}deg)` }}
      >
        <div className="absolute -top-3 right-6 bg-terracotta-600 text-ivory-50 px-3 py-1 text-[11px] mono tracking-widest">
          VERIFIED
        </div>

        <div className="flex justify-between items-start mb-5 pb-4 border-b border-dashed border-ink-400">
          <div>
            <div className="mono text-[10px] text-ink-500 tracking-widest">SVAMITVA YOJANA</div>
            <div className="display text-2xl text-ink-900 mt-1">संपत्ति कार्ड</div>
          </div>
          <Seal size="lg" />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <Field label="OWNER" value={card.owner} />
          <Field label="VILLAGE" value={`${card.village}, ${card.state.slice(0, 2).toUpperCase()}`} />
          <Field label="GHARAUNI ID" value={card.cardId} mono accent />
          <Field label="AREA" value={card.area} />
        </div>

        <div className="mt-5 pt-4 border-t border-dashed border-ink-400 flex justify-between">
          <div className="mono text-[11px] text-ink-500">Issued: {formatDate(card.issued)}</div>
          <div className="mono text-[11px] text-accent-green font-semibold">
            {card.loanEligible ? '● LOAN-ELIGIBLE' : '○ PENDING'}
          </div>
        </div>
      </div>

      {showEligibility && card.eligibilityMin && card.eligibilityMax && (
        <div className="mt-6 px-4 py-3.5 bg-ink-900 text-ivory-50 flex items-center gap-3">
          <Banknote size={20} />
          <div>
            <div className="text-[13px] text-ink-400">Estimated loan eligibility</div>
            <div className="display text-xl">
              {formatINR(card.eligibilityMin, true)} — {formatINR(card.eligibilityMax, true)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value, mono, accent }: { label: string; value: string; mono?: boolean; accent?: boolean }) {
  return (
    <div>
      <div className="mono text-[10px] text-ink-500 tracking-wider">{label}</div>
      <div
        className={`mt-0.5 font-semibold ${mono ? 'mono text-[15px]' : 'text-base'} ${accent ? 'text-terracotta-600' : ''}`}
      >
        {value}
      </div>
    </div>
  );
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1).toString().padStart(2, '0')}.${d.getFullYear()}`;
}
