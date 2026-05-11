'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, MapPin, FileText, Clock, Shield, CheckCircle2, ChevronRight, Info } from 'lucide-react';
import { Shell } from '@/components/shell';
import { CardMockup } from '@/components/card-mockup';
import type { GharauniCard } from '@/lib/types';

// Sample card shown as a preview of what users get back after a check.
const SAMPLE_CARD: GharauniCard = {
  cardId: '091434-78921-04',
  owner: 'Ramesh Yadav',
  village: 'Sikandrabad',
  district: 'Bulandshahr',
  state: 'Uttar Pradesh',
  area: '220 sq yd',
  areaSqft: 1980,
  issued: '2024-03-18',
  status: 'READY',
  loanEligible: true,
  eligibilityMin: 800000,
  eligibilityMax: 1500000,
};

export default function CheckPage() {
  const router = useRouter();
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [tehsil, setTehsil] = useState('');
  const [village, setVillage] = useState('');

  const canSubmit = state && district && village.trim().length >= 2;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    const params = new URLSearchParams({ state, district, tehsil, village: village.trim() });
    router.push(`/check/result?${params.toString()}`);
  };

  return (
    <Shell>
      {/* Hero */}
      <section className="border-b border-ink/10 bg-paper">
        <div className="absolute inset-0 bg-gradient-to-br from-terracotta/8 via-paper to-paper pointer-events-none" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 py-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-terracotta/30 bg-terracotta/5 px-3 py-1 text-xs font-medium text-terracotta mb-4">
              <Search className="w-3.5 h-3.5" />
              <span>Free · 30 seconds · No Aadhaar OTP</span>
            </div>
            <h1 className="font-serif text-4xl lg:text-5xl text-ink leading-tight">
              अपनी <span className="text-terracotta">घरौनी</span> की जाँच करें
            </h1>
            <p className="mt-2 font-serif text-lg text-ink/70 italic">Check your Gharauni status</p>
            <p className="mt-4 text-ink/75">
              अपना राज्य, जिला, तहसील, और गाँव चुनें। हम SVAMITVA के सरकारी पोर्टल से आपके कार्ड की स्थिति जाँचेंगे।
            </p>
          </div>
        </div>
      </section>

      {/* Form + Preview */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-12 grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-14 items-start">
          {/* Form */}
          <form onSubmit={onSubmit} className="rounded-lg border border-ink/10 bg-paper p-7 lg:p-9">
            <h2 className="font-serif text-2xl text-ink mb-1">अपना पता भरें · Fill your address</h2>
            <p className="text-sm text-ink/60 mb-7">All fields except tehsil are required.</p>

            <div className="space-y-5">
              {/* State */}
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-ink mb-1.5">राज्य · State <span className="text-terracotta">*</span></label>
                <select
                  id="state"
                  value={state}
                  onChange={(e) => { setState(e.target.value); setDistrict(''); setTehsil(''); }}
                  required
                  className="w-full rounded-md border border-ink/15 bg-paper px-3 py-2.5 text-ink focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 outline-none"
                >
                  <option value="">राज्य चुनें…</option>
                  <option value="uttar-pradesh">Uttar Pradesh · उत्तर प्रदेश</option>
                  <option value="madhya-pradesh" disabled>Madhya Pradesh (coming soon)</option>
                  <option value="maharashtra" disabled>Maharashtra (coming soon)</option>
                  <option value="karnataka" disabled>Karnataka (coming soon)</option>
                  <option value="haryana" disabled>Haryana (coming soon)</option>
                  <option value="rajasthan" disabled>Rajasthan (coming soon)</option>
                </select>
              </div>

              {/* District (linked) */}
              <div>
                <label htmlFor="district" className="block text-sm font-medium text-ink mb-1.5">जिला · District <span className="text-terracotta">*</span></label>
                <input
                  id="district"
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  disabled={!state}
                  placeholder={state ? 'e.g. Meerut, Lucknow, Prayagraj' : 'Select state first'}
                  required
                  className="w-full rounded-md border border-ink/15 bg-paper px-3 py-2.5 text-ink placeholder:text-ink/35 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 outline-none disabled:bg-ink/[0.03] disabled:cursor-not-allowed"
                />
                {state === 'uttar-pradesh' && (
                  <Link href="/uttar-pradesh" className="mt-1.5 inline-flex items-center gap-1 text-xs text-terracotta hover:underline">
                    Browse all 75 UP districts <ChevronRight className="w-3 h-3" />
                  </Link>
                )}
              </div>

              {/* Tehsil (optional) */}
              <div>
                <label htmlFor="tehsil" className="block text-sm font-medium text-ink mb-1.5">तहसील · Tehsil <span className="text-ink/40 text-xs">(optional)</span></label>
                <input
                  id="tehsil"
                  type="text"
                  value={tehsil}
                  onChange={(e) => setTehsil(e.target.value)}
                  disabled={!district}
                  placeholder={district ? 'e.g. Sardhana, Mohanlalganj' : 'Enter district first'}
                  className="w-full rounded-md border border-ink/15 bg-paper px-3 py-2.5 text-ink placeholder:text-ink/35 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 outline-none disabled:bg-ink/[0.03] disabled:cursor-not-allowed"
                />
              </div>

              {/* Village */}
              <div>
                <label htmlFor="village" className="block text-sm font-medium text-ink mb-1.5">गाँव · Village <span className="text-terracotta">*</span></label>
                <input
                  id="village"
                  type="text"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  disabled={!district}
                  placeholder={district ? 'Type your village name' : 'Enter district first'}
                  required
                  className="w-full rounded-md border border-ink/15 bg-paper px-3 py-2.5 text-ink placeholder:text-ink/35 focus:border-terracotta focus:ring-2 focus:ring-terracotta/20 outline-none disabled:bg-ink/[0.03] disabled:cursor-not-allowed"
                />
              </div>

              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full mt-3 inline-flex items-center justify-center gap-2 rounded-md bg-terracotta px-6 py-3.5 text-white font-medium hover:bg-terracotta-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Search className="w-4 h-4" />
                जाँच करें · Check Status
              </button>

              <div className="flex items-start gap-2 rounded-md bg-blue-50 border border-blue-100 px-3 py-2.5 text-xs text-blue-900">
                <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                <span>We never ask for your Aadhaar number, OTP, or any private data. We query the public SVAMITVA portal on your behalf.</span>
              </div>
            </div>
          </form>

          {/* Preview pane: what you'll get */}
          <div className="space-y-6">
            <div>
              <div className="text-[11px] uppercase tracking-widest text-terracotta/80 font-medium mb-3">What you will get back</div>
              <h3 className="font-serif text-xl text-ink mb-4">जाँच के बाद आपको यह मिलेगा</h3>
            </div>

            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-medium text-ink">Card status</div>
                  <div className="text-sm text-ink/65">Is your Gharauni issued, pending, or not yet processed?</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center flex-shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-medium text-ink">Card details</div>
                  <div className="text-sm text-ink/65">13-digit unique ID, plot number, area, registered owner name.</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-medium text-ink">Map location</div>
                  <div className="text-sm text-ink/65">GPS coordinates of your plot as captured by the drone survey.</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-terracotta/10 text-terracotta flex items-center justify-center flex-shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-medium text-ink">Next steps</div>
                  <div className="text-sm text-ink/65">Eligible lenders, estimated loan amount, or what to do if your card is pending.</div>
                </div>
              </li>
            </ul>

            {/* Sample card preview */}
            <div className="pt-4 border-t border-ink/10">
              <div className="text-xs text-ink/50 mb-3">Example Gharauni card:</div>
              <div className="scale-90 origin-top-left">
                <CardMockup card={SAMPLE_CARD} showEligibility={false} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust band */}
      <section className="border-t border-ink/10 bg-ink/[0.015]">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="grid sm:grid-cols-3 gap-6 text-sm">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-terracotta flex-shrink-0" />
              <div>
                <div className="font-medium text-ink">DPDP Act 2023 compliant</div>
                <div className="text-xs text-ink/60 mt-0.5">Your data is processed under India&apos;s Digital Personal Data Protection Act.</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-terracotta flex-shrink-0" />
              <div>
                <div className="font-medium text-ink">Source: MoPR official portal</div>
                <div className="text-xs text-ink/60 mt-0.5">Data sourced from Ministry of Panchayati Raj&apos;s SVAMITVA database.</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-terracotta flex-shrink-0" />
              <div>
                <div className="font-medium text-ink">Pending data, type freely</div>
                <div className="text-xs text-ink/60 mt-0.5">Even if your tehsil is not in our dropdown yet, type the village name and we will find it.</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Shell>
  );
}
