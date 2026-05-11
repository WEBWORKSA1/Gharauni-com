import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, MapPin, Maximize2, Shield, Phone, Calendar, Eye } from 'lucide-react';
import { Shell } from '@/components/shell';
import { LeadForm, LeadField } from '@/components/lead-form';

type Params = { id: string };

const MOCK_LISTINGS: Array<{
  id: string;
  title: string;
  titleHi: string;
  village: string;
  district: string;
  state: string;
  price: number;
  priceLabel: string;
  areaSqYd: number;
  bedrooms: number;
  type: 'house' | 'plot' | 'agricultural';
  cardId: string;
  views: number;
  postedDays: number;
}> = [
  { id: 'gh-mr-001', title: '3-bed pucca house with courtyard', titleHi: '3 कमरे का पक्का घर साथ आंगन', village: 'Sikandrabad', district: 'Bulandshahr', state: 'Uttar Pradesh', price: 1850000, priceLabel: '₹18.5 L', areaSqYd: 220, bedrooms: 3, type: 'house', cardId: '091434-78921-04', views: 142, postedDays: 4 },
  { id: 'gh-mr-002', title: 'Residential plot near main road', titleHi: 'मुख्य सड़क के पास आवासीय ज़मीन', village: 'Mawana', district: 'Meerut', state: 'Uttar Pradesh', price: 950000, priceLabel: '₹9.5 L', areaSqYd: 180, bedrooms: 0, type: 'plot', cardId: '090909-12483-02', views: 89, postedDays: 7 },
  { id: 'gh-mr-003', title: '2-bed brick house with tubewell', titleHi: '2 कमरों का ईंट का घर, ट्यूबवेल साथ', village: 'Phulpur', district: 'Prayagraj', state: 'Uttar Pradesh', price: 1350000, priceLabel: '₹13.5 L', areaSqYd: 175, bedrooms: 2, type: 'house', cardId: '096565-45112-08', views: 67, postedDays: 2 },
  { id: 'gh-mr-004', title: 'Agricultural plot, 1 bigha', titleHi: 'कृषि भूमि, 1 बीघा', village: 'Gauriganj', district: 'Amethi', state: 'Uttar Pradesh', price: 750000, priceLabel: '₹7.5 L', areaSqYd: 605, bedrooms: 0, type: 'agricultural', cardId: '094343-92107-15', views: 121, postedDays: 11 },
  { id: 'gh-mr-005', title: 'Family home, 4 bedrooms', titleHi: '4 बेडरूम का पारिवारिक घर', village: 'Sardhana', district: 'Meerut', state: 'Uttar Pradesh', price: 2750000, priceLabel: '₹27.5 L', areaSqYd: 340, bedrooms: 4, type: 'house', cardId: '090909-67845-11', views: 203, postedDays: 1 },
  { id: 'gh-mr-006', title: 'Corner plot, ready for construction', titleHi: 'कोने का प्लॉट, निर्माण के लिए तैयार', village: 'Kairana', district: 'Shamli', state: 'Uttar Pradesh', price: 680000, priceLabel: '₹6.8 L', areaSqYd: 200, bedrooms: 0, type: 'plot', cardId: '090202-18934-01', views: 54, postedDays: 9 },
];

export function generateStaticParams() {
  return MOCK_LISTINGS.map((l) => ({ id: l.id }));
}

export default function ListingContactPage({ params }: { params: Params }) {
  const listing = MOCK_LISTINGS.find((l) => l.id === params.id);
  if (!listing) return notFound();

  const askingPriceLabel = 'Matches the asking price (' + listing.priceLabel + ')';

  const fields: LeadField[] = [
    { name: 'name', label: 'Your name', labelHi: 'अपना नाम', required: true, gridCols: 1 },
    { name: 'phone', label: 'Mobile (WhatsApp)', labelHi: 'मोबाइल', type: 'tel', required: true, gridCols: 1, placeholder: '+91 XXXXX XXXXX' },
    { name: 'email', label: 'Email', type: 'email', required: true, gridCols: 1 },
    { name: 'budget', label: 'Your budget range', type: 'select', required: true, gridCols: 1, options: [
      { value: 'match', label: askingPriceLabel },
      { value: 'lower', label: 'Lower than asking' },
      { value: 'higher', label: 'Higher than asking, open to negotiate' },
      { value: 'exploring', label: 'Just exploring' },
    ] },
    { name: 'timeline', label: 'When do you want to buy?', type: 'select', required: true, options: [
      { value: 'asap', label: 'Within 30 days' },
      { value: 'quarter', label: 'Within 3 months' },
      { value: '6months', label: 'Within 6 months' },
      { value: 'browsing', label: 'Just browsing for now' },
    ] },
    { name: 'needsLoan', label: 'Will you need a loan?', type: 'select', required: true, gridCols: 1, options: [
      { value: 'yes', label: 'Yes, please connect me to lenders' },
      { value: 'maybe', label: 'Maybe - send loan info too' },
      { value: 'no', label: 'No, paying in cash' },
    ] },
    { name: 'visitInterest', label: 'Want to visit the property?', type: 'select', required: false, gridCols: 1, options: [
      { value: 'yes', label: 'Yes, schedule a visit' },
      { value: 'video', label: 'Video tour first' },
      { value: 'later', label: 'Decide after talking' },
    ] },
    { name: 'questions', label: 'Questions for the seller?', type: 'textarea', placeholder: 'e.g., How old is the construction? Is electricity connection included? Any pending disputes?' },
  ];

  return (
    <Shell>
      <section className="border-b border-ink/10 bg-paper">
        <div className="absolute inset-0 bg-gradient-to-br from-terracotta/8 via-paper to-paper pointer-events-none" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 py-8">
          <Link href="/market" className="text-sm text-ink/60 hover:text-terracotta inline-flex items-center gap-1 mb-3">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to listings
          </Link>
          <h1 className="font-serif text-3xl lg:text-4xl text-ink leading-tight">Contact the seller</h1>
          <p className="mt-1 text-ink/65">विक्रेता से संपर्क करें. We facilitate the introduction — your phone never reaches the seller until you both agree.</p>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-10 grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-14">
          <div className="rounded-lg border border-ink/10 bg-paper p-7 lg:p-9">
            <h2 className="font-serif text-2xl text-ink mb-1">Tell us about you</h2>
            <p className="text-sm text-ink/60 mb-7">We forward verified buyer enquiries to the seller. They reach out to you, not the other way around.</p>
            <LeadForm
              source={`market-contact:${listing.id}`}
              fields={fields}
              submitLabel="Send enquiry to seller"
              successHeadline="Enquiry sent"
              successHeadlineHi="पूछताछ भेजी गई"
              successBody={'We have forwarded your enquiry about "' + listing.title + '" in ' + listing.village + '. The seller will reach out within 48 hours. If you do not hear back, email us at hello@gharauni.com.'}
              preSubmit={
                <div className="rounded-md bg-ink/[0.03] border border-ink/10 p-4 text-sm text-ink/75 flex items-start gap-3">
                  <Shield className="w-4 h-4 mt-0.5 text-terracotta flex-shrink-0" />
                  <div>
                    <div className="font-medium text-ink">Your details are not shared until you agree</div>
                    <p className="text-xs text-ink/60 mt-1">We pre-screen buyer enquiries and only forward to the seller once both sides confirm interest. No spam calls.</p>
                  </div>
                </div>
              }
            />
          </div>

          <div className="space-y-6">
            <article className="rounded-lg border border-ink/10 bg-paper overflow-hidden">
              <div className="relative aspect-[4/3] bg-gradient-to-br from-terracotta/15 to-terracotta/5 flex items-center justify-center">
                <MapPin className="w-10 h-10 text-terracotta/30" strokeWidth={1.5} />
                <div className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/95 backdrop-blur px-2.5 py-1 text-[10px] font-medium text-green-800">
                  <Shield className="w-2.5 h-2.5" /> Verified by Gharauni
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-serif text-lg text-ink leading-snug">{listing.title}</h3>
                <p className="text-xs text-ink/55 italic mt-0.5">{listing.titleHi}</p>
                <div className="mt-3 font-serif text-2xl text-terracotta">{listing.priceLabel}</div>
                <div className="mt-3 grid grid-cols-2 gap-y-2 text-xs text-ink/70">
                  <div className="flex items-center gap-1"><Maximize2 className="w-3 h-3" /> {listing.areaSqYd} sq yd</div>
                  {listing.bedrooms > 0 && <div>{listing.bedrooms} bed</div>}
                  <div className="capitalize">{listing.type}</div>
                  <div className="flex items-center gap-1"><Eye className="w-3 h-3" /> {listing.views} views</div>
                </div>
                <div className="mt-4 pt-4 border-t border-ink/10 space-y-1.5 text-xs">
                  <div className="flex items-center gap-1.5 text-ink/65"><MapPin className="w-3 h-3" /> {listing.village}, {listing.district}</div>
                  <div className="flex items-center gap-1.5 text-ink/50"><Calendar className="w-3 h-3" /> Posted {listing.postedDays} day{listing.postedDays === 1 ? '' : 's'} ago</div>
                  <div className="text-ink/40">Card ID: {listing.cardId}</div>
                </div>
              </div>
            </article>

            <div className="rounded-md bg-amber-50 border border-amber-200 p-4 text-xs text-amber-900">
              <strong className="font-medium">Want extra protection?</strong>
              <p className="mt-1">Before transacting, run a <Link href="/title" className="underline font-medium">₹499 title check</Link> on the seller&apos;s Gharauni. Catches duplicate listings, encumbrances, or pending disputes.</p>
            </div>
          </div>
        </div>
      </section>
    </Shell>
  );
}
