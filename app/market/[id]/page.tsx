'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, MapPin, Calendar, Home, Phone, Loader2 } from 'lucide-react';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { getListing, submitLead } from '@/lib/api';
import { validatePhone, formatINR } from '@/lib/utils';
import { ROUTES } from '@/lib/constants';
import type { Listing } from '@/lib/types';

export default function ListingDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [showContact, setShowContact] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    getListing(id).then(l => { setListing(l); setLoading(false); });
  }, [id]);

  const onContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePhone(form.phone)) {
      alert('सही मोबाइल नंबर डालें');
      return;
    }
    setSubmitting(true);
    await submitLead({
      intent: 'market',
      name: form.name,
      phone: form.phone,
      cardId: id,
      source: `market/${id}`,
      createdAt: new Date().toISOString()
    });
    setSubmitting(false);
    setSubmitted(true);
  };

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

          {/* HERO IMAGE */}
          <div
            className="h-72 lg:h-96 mb-8 flex items-end p-8 relative"
            style={{ background: 'linear-gradient(135deg, #C2410C 0%, #7C2D12 100%)' }}
          >
            <div className="absolute top-6 right-6 bg-ivory-50 text-accent-green px-3 py-1.5 text-[12px] font-semibold flex items-center gap-1.5">
              <CheckCircle2 size={14} /> VERIFIED · GHARAUNI-ID MATCH
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

              <h2 className="display text-2xl mb-3">विवरण</h2>
              <p className="text-ink-700 leading-relaxed mb-5">
                {listing.village} में स्थित {listing.areaSqft.toLocaleString('en-IN')} वर्ग फुट की वेरिफाइड SVAMITVA संपत्ति। 13-अंक की घरौनी ID के साथ पूर्ण कानूनी दस्तावेज़। खरीदी पर तुरंत नामांतरण होगा।
              </p>
              <p className="text-ink-700 leading-relaxed">
                यह संपत्ति हमारे टाइटल वेरिफिकेशन से गुज़री है — कोई विवाद, ओवरलैप, या छुपा बंधक नहीं।
              </p>
            </div>

            {/* CONTACT CARD */}
            <aside className="bg-ivory-50 p-7 border-[1.5px] border-ivory-200 h-fit lg:sticky lg:top-24">
              {!showContact && !submitted && (
                <>
                  <h3 className="display text-2xl mb-2">मालिक से संपर्क करें</h3>
                  <p className="text-sm text-ink-700 mb-5">Free · No middleman · Direct contact</p>
                  <button onClick={() => setShowContact(true)} className="btn-primary w-full inline-flex items-center justify-center gap-2">
                    <Phone size={16} /> नंबर देखें
                  </button>
                </>
              )}
              {showContact && !submitted && (
                <form onSubmit={onContact}>
                  <h3 className="display text-2xl mb-2">अपनी जानकारी दें</h3>
                  <p className="text-sm text-ink-700 mb-5">मालिक का नंबर SMS पर भेज दिया जाएगा।</p>
                  <div className="space-y-3 mb-4">
                    <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="आपका नाम" className="input-base" />
                    <input required type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="मोबाइल" className="input-base" />
                  </div>
                  <button type="submit" disabled={submitting} className="btn-primary w-full disabled:opacity-60">
                    {submitting ? 'जमा...' : 'SMS भेजें'}
                  </button>
                </form>
              )}
              {submitted && (
                <div className="text-center">
                  <CheckCircle2 size={48} className="text-accent-green mx-auto mb-3" />
                  <div className="display text-xl mb-2">SMS भेजा गया!</div>
                  <p className="text-sm text-ink-700">मालिक का नंबर आपके फ़ोन पर SMS कर दिया गया है।</p>
                </div>
              )}
              <div className="mt-6 pt-6 border-t border-ivory-200">
                <div className="mono text-[11px] text-ink-500 tracking-wider mb-3">VERIFIED VIA</div>
                <div className="text-sm text-ink-700">✓ SVAMITVA registry match</div>
                <div className="text-sm text-ink-700">✓ Bhulekh cross-check</div>
                <div className="text-sm text-ink-700">✓ No active disputes</div>
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
