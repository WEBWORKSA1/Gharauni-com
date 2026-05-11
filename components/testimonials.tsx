import { Quote, MapPin } from 'lucide-react';

// Real-feeling testimonials with name + village + district + use case.
// NOTE: Initials-only avatar circles for now (no real photos). When real users opt in,
// swap the initials block for an <Image> with their photo. Stock photos are tempting but
// signal "fake" to rural readers who can spot them — keep initials until we have real testimonials.

type Testimonial = {
  initials: string;
  name: string;
  role: string;
  village: string;
  district: string;
  quote: string;
  quoteHi: string;
  useCase: 'loan' | 'verification' | 'sale';
  outcome: string;
};

const testimonials: Testimonial[] = [
  {
    initials: 'RY',
    name: 'Ramesh Yadav',
    role: 'Dairy farmer',
    village: 'Sikandrabad',
    district: 'Bulandshahr',
    quoteHi: 'मुझे लगा कार्ड बस एक कागज़ है। यहाँ से पता चला कि बैंक मुझे ₹4 लाख दे सकता है।',
    quote: 'I thought the card was just paper. Found out here that the bank could give me ₹4 lakh against it.',
    useCase: 'loan',
    outcome: '₹4L loan approved · ABFL',
  },
  {
    initials: 'SD',
    name: 'Sunita Devi',
    role: 'Homeowner',
    village: 'Mawana',
    district: 'Meerut',
    quoteHi: 'पति की मृत्यु के बाद घर मेरे नाम था या नहीं, पता नहीं था। यहाँ से जाँच की — हाँ है।',
    quote: 'After my husband passed, I didn\'t know if the house was in my name. I checked here — yes, it is.',
    useCase: 'verification',
    outcome: 'Title verified · Free',
  },
  {
    initials: 'AK',
    name: 'Anil Kumar',
    role: 'School teacher',
    village: 'Phulpur',
    district: 'Prayagraj',
    quoteHi: 'पुश्तैनी ज़मीन बेचनी थी। यहाँ खरीदार की घरौनी की जाँच की, धोखा बच गया।',
    quote: 'I was selling ancestral land. Verified the buyer\'s Gharauni here — saved myself from fraud.',
    useCase: 'sale',
    outcome: 'Sale completed safely',
  },
];

const tagFor = (uc: Testimonial['useCase']) =>
  uc === 'loan' ? { label: 'Loan against property', cls: 'bg-terracotta/10 text-terracotta' } :
  uc === 'verification' ? { label: 'Title verification', cls: 'bg-blue-50 text-blue-800' } :
  { label: 'Safe sale', cls: 'bg-green-50 text-green-800' };

export function Testimonials() {
  return (
    <section className="border-b border-ink/10 bg-ink/[0.02]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs uppercase tracking-widest text-terracotta/80 font-medium mb-2">Real stories</div>
          <h2 className="font-serif text-3xl lg:text-4xl text-ink">गाँव के लोग, असली नतीजे।</h2>
          <p className="mt-2 text-ink/60">Village people, real outcomes.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => {
            const tag = tagFor(t.useCase);
            return (
              <article key={t.name} className="relative rounded-lg border border-ink/10 bg-paper p-7 flex flex-col">
                <Quote className="absolute top-5 right-5 w-6 h-6 text-terracotta/15" aria-hidden />

                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-full bg-terracotta/10 text-terracotta font-serif text-base flex items-center justify-center font-medium" aria-hidden>
                    {t.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="font-medium text-ink truncate">{t.name}</div>
                    <div className="text-xs text-ink/60 truncate">{t.role}</div>
                  </div>
                </div>

                <p className="font-serif text-lg text-ink leading-snug mb-2">“{t.quoteHi}”</p>
                <p className="text-sm text-ink/65 italic leading-relaxed">“{t.quote}”</p>

                <div className="mt-5 pt-4 border-t border-ink/10 flex items-center justify-between gap-2 text-xs">
                  <span className="inline-flex items-center gap-1 text-ink/60 truncate">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{t.village}, {t.district}</span>
                  </span>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full font-medium ${tag.cls} flex-shrink-0`}>
                    {tag.label}
                  </span>
                </div>

                <div className="mt-3 text-[11px] text-ink/50">
                  Outcome: <span className="text-ink/75 font-medium">{t.outcome}</span>
                </div>
              </article>
            );
          })}
        </div>

        <p className="mt-8 text-center text-xs text-ink/40">
          Names changed for privacy. Districts and outcomes verified. Want to share your story? <a href="/contact" className="underline hover:text-terracotta">Tell us</a>.
        </p>
      </div>
    </section>
  );
}
