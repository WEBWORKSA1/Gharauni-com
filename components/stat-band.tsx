interface StatBandProps {
  stats: { value: string; label: string; sub: string }[];
}

export function StatBand({ stats }: StatBandProps) {
  return (
    <section className="bg-ink-900 text-ivory-50 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <div key={i} className="border-l-2 border-terracotta-500 pl-5">
            <div className="display text-4xl text-ivory-50 leading-none">{s.value}</div>
            <div className="text-[15px] font-semibold mt-2 text-ivory-200">{s.label}</div>
            <div className="mono text-[11px] text-ink-400 mt-1 tracking-wider">{s.sub}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
