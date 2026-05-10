import type { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, Building2, Layers, ArrowRight, Database } from 'lucide-react';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import {
  UP_DIVISIONS,
  UP_DISTRICTS,
  getUpStats,
  getUpDistrictsByDivision
} from '@/lib/up-geography';

export const metadata: Metadata = {
  title: 'Uttar Pradesh · घरौनी UP — All 75 Districts, 18 Divisions',
  description: 'Complete Gharauni / SVAMITVA directory for Uttar Pradesh. All 75 districts grouped by 18 administrative divisions. 360 tehsils, 829 blocks. Status check, loans, marketplace per district.',
  alternates: { canonical: '/up' }
};

export default function UpDirectoryPage() {
  const stats = getUpStats();
  return (
    <>
      <Nav />

      {/* HERO */}
      <section className="py-20 px-6 bg-ivory-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-ink-500 mb-4">
            <Link href="/" className="hover:text-terracotta-600">Home</Link>
            <span>/</span>
            <span className="text-terracotta-600">Uttar Pradesh · उत्तर प्रदेश</span>
          </div>
          <div className="mono text-xs text-terracotta-600 tracking-widest mb-3">STATE · SVAMITVA · UTTAR PRADESH</div>
          <h1 className="display text-4xl sm:text-5xl lg:text-6xl m-0 leading-[1.05] mb-4">
            Gharauni in Uttar Pradesh · उत्तर प्रदेश
          </h1>
          <p className="text-lg text-ink-700 leading-relaxed max-w-3xl">
            सभी 75 ज़िले, 18 मंडल, ~360 तहसील, ~829 विकास खंड — UP में SVAMITVA / घरौनी की पूरी directory. अपने गाँव का ज़िला चुनें · Pick your district.
          </p>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="bg-ink-900 text-ivory-50 py-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-6">
          <StatCell value={String(stats.divisions)} label="Divisions · मंडल" />
          <StatCell value={String(stats.districts)} label="Districts · ज़िले" />
          <StatCell value={stats.totalTehsils.toLocaleString('en-IN')} label="Tehsils · तहसील" />
          <StatCell value={stats.totalBlocks.toLocaleString('en-IN')} label="Blocks · विकास खंड" />
          <StatCell value={`${stats.districtsWithDetail}/75`} label="With detailed data" />
        </div>
      </section>

      {/* DIVISIONS → DISTRICTS */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <Layers size={18} className="text-terracotta-600" />
            <span className="mono text-xs tracking-wider text-terracotta-600">BY DIVISION · मंडल के अनुसार</span>
          </div>
          <h2 className="display text-3xl mb-3">18 Administrative Divisions</h2>
          <p className="text-ink-700 mb-10 max-w-3xl">UP is grouped into 18 divisions (मंडल), each led by a Divisional Commissioner. Pick your division below to see its districts.</p>

          <div className="space-y-10">
            {UP_DIVISIONS.map(div => {
              const districtsInDiv = getUpDistrictsByDivision(div.code);
              return (
                <div key={div.code} className="border-l-4 border-terracotta-500 pl-5">
                  <div className="flex items-baseline gap-3 flex-wrap mb-4">
                    <h3 className="display text-2xl">{div.name} <span className="text-ink-500">· {div.nameHi}</span></h3>
                    <span className="mono text-xs text-ink-500">{districtsInDiv.length} districts</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                    {districtsInDiv.map(d => (
                      <Link
                        key={d.code}
                        href={`/uttar-pradesh/${d.slug}`}
                        className="group bg-ivory-50 border border-ivory-200 p-3 hover:border-terracotta-500 transition"
                      >
                        <div className="flex items-baseline justify-between">
                          <div className="text-[15px] font-semibold leading-tight">{d.name}</div>
                          {d.hasDetailedData && (
                            <span className="text-[9px] mono uppercase text-accent-green bg-accent-green/10 px-1.5 py-0.5" title="Detailed tehsil & block data available">FULL</span>
                          )}
                        </div>
                        <div className="text-[12px] text-ink-500 mt-0.5">{d.nameHi}</div>
                        <div className="flex gap-2 mt-2 text-[10px] mono text-ink-500">
                          <span>{d.tehsilCount}t</span>
                          <span>{d.blockCount}b</span>
                          <span className="text-terracotta-600 ml-auto group-hover:translate-x-0.5 transition">→</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="bg-ivory-100 py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="display text-3xl mb-3">UP में SVAMITVA सेवाएँ</h2>
          <p className="text-ink-700 mb-6">Already know your village? Skip the directory — use the tools directly.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/check" className="btn-primary inline-flex items-center gap-1.5">
              स्थिति जाँचें <ArrowRight size={16} />
            </Link>
            <Link href="/loan" className="btn-ghost inline-flex items-center gap-1.5">
              Loan compare
            </Link>
            <Link href="/market" className="btn-ghost inline-flex items-center gap-1.5">
              Marketplace
            </Link>
          </div>
        </div>
      </section>

      {/* DATA SOURCE NOTE */}
      <section className="py-12 px-6">
        <div className="max-w-3xl mx-auto p-6 bg-ivory-50 border border-dashed border-terracotta-500">
          <div className="flex items-start gap-3">
            <Database size={20} className="text-terracotta-600 flex-shrink-0 mt-1" />
            <div className="text-sm text-ink-700 leading-relaxed">
              <strong className="text-terracotta-600">Data source:</strong> District counts and tehsil/block totals are compiled from the Government of India Local Government Directory (LGD) and individual district NIC portals (e.g. meerut.nic.in, gorakhpur.nic.in, prayagrajdivision.nic.in), verified May 2026. {stats.districtsWithDetail} districts currently have full tehsil + block listings; the remaining {75 - stats.districtsWithDetail} have aggregate counts only — detailed listings being added progressively in Phase 6 ingest.
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

function StatCell({ value, label }: { value: string; label: string }) {
  return (
    <div className="border-l-2 border-terracotta-500 pl-4">
      <div className="display text-3xl text-ivory-50">{value}</div>
      <div className="text-xs text-ink-400 mt-1 leading-tight">{label}</div>
    </div>
  );
}
