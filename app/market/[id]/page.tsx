'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, MapPin, Calendar, Home, Loader2, AlertCircle } from 'lucide-react';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { getListing } from '@/lib/api';
import { formatINR } from '@/lib/utils';
import { ROUTES } from '@/lib/constants';
import type { Listing } from '@/lib/types';

export default function ListingDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getListing(id).then(l => { setListing(l); setLoading(false); });
  }, [id]);

  if (loading) {
    return (
      <>
        <Nav />
        <div className="py-32 text-center">
          <Loader2 size={32} className="animate-spin mx-auto text-terracotta-600" />
        </div>
        <Footer />
      </>
    );
  }

  if (!listing) {
    return (
      <>
        <Nav />
        <section className="py-24 px-6 text-center min-h-[60vh]">
          <h1 className="display text-4xl mb-4">Listing not found</h1>
          <Link href={ROUTES.market} className="btn-ghost">Back to marketplace</Link>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <Link href={ROUTES.market} className="inline-flex items-center gap-1.5 text-terracotta-600 text-sm mb-6 hover:underline">
            <ArrowLeft size={16} /> Back to listings
          </Link>

          {/* Preview banner */}
          <div className="mb-6 rounded-md bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-900 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <div>
              <strong className="font-medium">Marketplace preview.</strong> Sample listings shown to illustrate the product. The verified-by-Gharauni marketplace launches Q3 2026. Submit an enquiry to join the buyer waitlist for this property type and district.
            </div>
          </div>

          {/* HERO IMAGE */}
          <div
            className="h-72 lg:h-96 mb-8 flex items-end p-8 relative"
            style={{ background: 'linear-gradient(135deg, #C2410C 0%, #7C2D12 100%)' }}
          >
            <div className="absolute top-6 right-6 bg-ivory-50 text-ink-900 px-3 py-1.5 text-[11px] font-medium">
              SAMPLE LISTING · PREVIEW
            </div>
            <div>
              <div className="mono text-sm text-ivory-100 mb-2">{listing.id}</div>
              <div className="display text-4xl text-ivory-50">{listing.village}</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10">
            {/* DETAILS */}
            <div>
              <div className="flex items-baseline gap-3 mb-2">
                <div className="display text-5xl text-terracotta-600">{listing.price}</div>
                <div className="text-ink-500 text-sm">{formatINR(listing.priceNum)}</div>
              </div>
              <div className="flex items-center gap-2 text-ink-700 mb-8">
                <MapPin size={16} className="text-terracotta-600" />
                <span>{listing.district}, {listing.state}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
                <Stat icon={Home} label="Type" value={listing.type} />
                <Stat icon={MapPin} label="Area" value={listing.area} />
                <Stat icon={Calendar} label="Posted" value={formatPosted(listing.postedAt)} />
              </div>

              <h2 className="display text-2xl mb-3">About this property type</h2>
              <p className="text-ink-700 leading-relaxed mb-5">
                {listing.village} (district {listing.district}, {listing.state}) is in an area covered by the SVAMITVA Scheme. Once our marketplace goes live, properties from this region will appear with verified 13-digit Gharauni IDs and a complete title-check report.
              </p>
              <p className="text-ink-700 leading-relaxed">
                The areas, prices, and IDs shown here are realistic samples to illustrate what listings will look like — not actual properties for sale today.
              </p>
            </div>

            {/* CONTACT CARD — redirects to waitlist form */}
            <aside className="bg-ivory-50 p-7 border-[1.5px] border-ivory-200 h-fit lg:sticky lg:top-24">
              <h3 className="display text-2xl mb-2">Join the buyer waitlist</h3>
              <p className="text-sm text-ink-700 mb-5">
                Tell us what you are looking for. When verified listings matching your district and budget go live, we will notify you first.
              </p>
              <Link
                href={`/market/${listing.id}/contact`}
                className="btn-primary w-full inline-flex items-center justify-center gap-2"
              >
                Tell us what you want
              </Link>
              <div className="mt-6 pt-6 border-t border-ivory-200">
                <div className="mono text-[11px] text-ink-500 tracking-wider mb-3">WHEN LISTINGS GO LIVE</div>
                <div className="text-sm text-ink-700">• SVAMITVA registry match</div>
                <div className="text-sm text-ink-700">• Bhulekh cross-check</div>
                <div className="text-sm text-ink-700">• Dispute scan</div>
                <div className="text-xs text-ink-500 mt-3">Every listing will have these checks before publication. We will not publish unverified inventory.</div>
              </div>
            </aside>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

function Stat({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="bg-ivory-100 p-4">
      <Icon size={18} className="text-terracotta-600 mb-2" />
      <div className="mono text-[10px] text-ink-500 tracking-wider">{label}</div>
      <div className="font-semibold text-[15px] mt-0.5">{value}</div>
    </div>
  );
}

function formatPosted(iso: string): string {
  const d = new Date(iso);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}
