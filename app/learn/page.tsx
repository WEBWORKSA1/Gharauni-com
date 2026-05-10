import Link from 'next/link';
import { Youtube, Play } from 'lucide-react';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { VIDEOS } from '@/lib/mock-data';

const CATEGORIES = [
  { key: 'all', label: 'सभी' },
  { key: 'basics', label: 'मूल जानकारी' },
  { key: 'loan', label: 'लोन' },
  { key: 'dispute', label: 'विवाद' },
  { key: 'sell', label: 'बिक्री' }
];

export default function LearnPage() {
  return (
    <>
      <Nav />
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mono text-xs text-terracotta-600 tracking-widest mb-3">SERVICE · LEARN</div>
          <h1 className="display text-4xl sm:text-5xl m-0 mb-3 leading-tight">घरौनी सीखें — मुफ़्त वीडियो लाइब्रेरी</h1>
          <p className="text-lg text-ink-700 mb-10 leading-relaxed max-w-2xl">
            5 भाषाओं में स्थानीय शिक्षा। हमेशा मुफ़्त।
          </p>

          {/* CATEGORY PILLS */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {CATEGORIES.map((c, i) => (
              <button
                key={c.key}
                className={`px-4 py-1.5 text-sm font-semibold border transition ${
                  i === 0
                    ? 'bg-terracotta-600 text-ivory-50 border-terracotta-600'
                    : 'bg-transparent text-terracotta-600 border-terracotta-600 hover:bg-terracotta-600/10'
                }`}
                style={{ borderRadius: 2 }}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* VIDEO GRID */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {VIDEOS.map((v, i) => (
              <div key={i} className="hover-lift bg-ivory-50 border-[1.5px] border-ivory-200 cursor-pointer overflow-hidden">
                <div className="h-44 bg-ink-900 relative flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-terracotta-600 flex items-center justify-center">
                    <Play size={22} className="text-ivory-50 ml-1" fill="currentColor" />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-ivory-50 px-2 py-0.5 text-[11px] mono">
                    {v.dur}
                  </div>
                  <div className="absolute top-2 left-2 bg-amber-300 text-ink-900 px-2 py-0.5 text-[11px] font-semibold">
                    {v.lang}
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-[16px] font-semibold leading-snug mb-2">{v.title}</div>
                  <div className="mono text-xs text-ink-500">{v.views}</div>
                </div>
              </div>
            ))}
          </div>

          {/* SUBSCRIBE CTA */}
          <div className="mt-16 bg-ink-900 text-ivory-50 p-10 grid lg:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <Youtube size={40} className="text-red-500 mb-3" />
              <h2 className="display text-3xl mb-2">YouTube पर सब्सक्राइब करें</h2>
              <p className="text-ink-400">हर हफ़्ते नए वीडियो। सबसे पहले जानें।</p>
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-ivory-50 px-6 py-3 font-semibold inline-flex items-center gap-2 transition">
              <Youtube size={18} /> Subscribe · Free
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
