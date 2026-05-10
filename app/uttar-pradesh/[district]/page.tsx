import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, MapPin, Building2, Layers, Banknote, Search, ExternalLink } from 'lucide-react';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { UP_DISTRICTS, getUpDistrict, getUpTehsilsByDistrict } from '@/lib/up-geography';
import { ROUTES } from '@/lib/constants';

interface Props {
  params: { district: string };
}

export async function generateStaticParams() {
  return UP_DISTRICTS.map(d => ({ district: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const d = getUpDistrict(params.district);
  if (!d) return { title: 'District not found' };
  return {
    title: `Gharauni in ${d.name}, UP · ${d.nameHi} घरौनी — ${d.tehsilCount} Tehsils, ${d.blockCount} Blocks`,
    description: `Complete Gharauni / SVAMITVA directory for ${d.name} district in Uttar Pradesh (${d.division} Division). ${d.tehsilCount} tehsils, ${d.blockCount} development blocks. Status check, loan compare, marketplace.`,
    alternates: { canonical: `/uttar-pradesh/${d.slug}` }
  };
}

export default function UpDistrictPage({ params }: Props) {
  const d = getUpDistrict(params.district);
  if (!d) notFound();

  const tehsils = getUpTehsilsByDistrict(d.slug);

  return (
    <>
      <Nav />

      <section className="py-16 px-6 bg-ivory-100">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 text-sm text-ink-500 mb-4 flex-wrap">
            <Link href="/" className="hover:text-terracotta-600">Home</Link>
            <span>/</span>
            <Link href="/up" className="hover:text-terracotta-600">Uttar Pradesh</Link>
            <span>/</span>
            <span className="text-terracotta-600">{d.name}</span>
          </div>
          <div className="mono text-xs text-terracotta-600 tracking-widest mb-3">
            DISTRICT · {d.divisionCode} DIVISION · CODE {d.code}
          </div>
          <h1 className="display text-4xl sm:text-5xl lg:text-6xl m-0 leading-[1.05] mb-3">
            {d.name} <span className="text-ink-500">· {d.nameHi}</span>
          </h1>
          <p className="text-lg text-ink-700 leading-relaxed max-w-3xl">
            हेडक्वार्टर: <strong>{d.headquarters}</strong> · मंडल: <strong>{d.division} ({d.divisionHi})</strong>
          </p>
        </div>
      </section>

      <section className="bg-ink-900 text-ivory-50 py-10 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <Stat v={String(d.tehsilCount)} l="Tehsils · तहसील" />
          <Stat v={String(d.blockCount)} l="Blocks · विकास खंड" />
          <Stat v={d.code} l="District Code (LGD)" />
          <Stat v={d.divisionCode} l="Division Code" />
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-5">
          <Action href={ROUTES.check} icon={Search} title="घरौनी जाँचें" desc={`${d.name} में SVAMITVA card status`} />
          <Action href={ROUTES.loan} icon={Banknote} title="लोन की तुलना" desc="9.5% से 11 lenders" />
          <Action href={ROUTES.market} icon={Building2} title="संपत्ति देखें" desc={`${d.name} verified listings`} />
        </div>
      </section>

      {/* TEHSILS */}
      <section className="bg-ivory-100 py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-2">
            <Layers size={18} className="text-terracotta-600" />
            <span className="mono text-xs tracking-wider text-terracotta-600">TEHSILS · तहसीलें</span>
          </div>
          <h2 className="display text-3xl mb-6">{d.name} की तहसीलें ({d.tehsilCount})</h2>

          {d.hasDetailedData && tehsils.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {tehsils.map(t => (
                <div key={`${t.districtSlug}-${t.name}`} className="bg-ivory-50 border border-ivory-200 p-4">
                  <div className="display text-lg">{t.name}</div>
                  <div className="text-sm text-ink-500">{t.nameHi}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-ivory-50 border border-dashed border-terracotta-500 p-6 text-sm text-ink-700 leading-relaxed">
              <strong className="text-terracotta-600">Detailed tehsil & block listings being added.</strong> {d.name} has <strong>{d.tehsilCount} tehsils</strong> and <strong>{d.blockCount} blocks</strong> per the district NIC portal. Full names + Hindi script in progress (Phase 6 ingest).
              <br/><br/>
              For now, you can <Link href={ROUTES.check} className="text-terracotta-600 underline">check Gharauni status</Link> by typing your village name directly — our system accepts free-text village names while we complete the data ingest.
            </div>
          )}
        </div>
      </section>

      {/* BHULEKH LINK */}
      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto bg-ink-900 text-ivory-50 p-7 grid md:grid-cols-[1fr_auto] gap-4 items-center">
          <div>
            <div className="display text-xl mb-1">Official UP Bhulekh Portal</div>
            <p className="text-ink-400 text-sm">For raw revenue records (Khata/Khasra) in {d.name}, visit the state's official portal.</p>
          </div>
          <a href="https://upbhulekh.gov.in" target="_blank" rel="noopener noreferrer" className="bg-amber-300 text-ink-900 px-5 py-2.5 font-semibold inline-flex items-center gap-1.5 whitespace-nowrap">
            Visit upbhulekh.gov.in <ExternalLink size={14} />
          </a>
        </div>
      </section>

      {/* RELATED DISTRICTS */}
      <section className="py-12 px-6 bg-ivory-100">
        <div className="max-w-5xl mx-auto">
          <Link href="/up" className="inline-flex items-center gap-1.5 text-terracotta-600 text-sm mb-6 hover:underline">
            <ArrowLeft size={16} /> All UP districts
          </Link>
          <h3 className="display text-2xl mb-4">Other districts in {d.division} division</h3>
          <div className="flex flex-wrap gap-2">
            {UP_DISTRICTS.filter(o => o.divisionCode === d.divisionCode && o.slug !== d.slug).map(o => (
              <Link key={o.slug} href={`/uttar-pradesh/${o.slug}`} className="px-4 py-2 bg-ivory-50 border border-ivory-300 text-sm hover:border-terracotta-500 hover:text-terracotta-600 transition">
                {o.name} <span className="text-ink-500">· {o.nameHi}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

function Stat({ v, l }: { v: string; l: string }) {
  return (
    <div className="border-l-2 border-terracotta-500 pl-4">
      <div className="display text-2xl text-ivory-50">{v}</div>
      <div className="text-xs text-ink-400 mt-1">{l}</div>
    </div>
  );
}

function Action({ href, icon: Icon, title, desc }: any) {
  return (
    <Link href={href} className="hover-lift bg-ivory-50 border-[1.5px] border-ivory-200 p-5 block">
      <Icon size={26} className="text-terracotta-600 mb-3" />
      <div className="display text-lg mb-1">{title}</div>
      <div className="text-sm text-ink-700 mb-2">{desc}</div>
      <div className="text-terracotta-600 text-sm inline-flex items-center gap-1 font-semibold">शुरू <ArrowRight size={13} /></div>
    </Link>
  );
}
