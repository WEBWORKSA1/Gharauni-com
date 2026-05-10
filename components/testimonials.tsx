import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    text: 'पहले मुझे घरौनी के बारे में कुछ पता नहीं था। यहां 5 मिनट में जाना कि मेरे घर पर ₹6 लाख का लोन मिल सकता है।',
    name: 'Suresh Yadav',
    place: 'करनाल, हरियाणा',
    role: 'Gharauni cardholder',
    rating: 5
  },
  {
    text: 'Bank ne 11.5% pe rate bola tha. Gharauni.com pe Bajaj Finserv ne 9.5% diya. 2% kam = 60,000 rupaye bach gaye life me.',
    name: 'Anita Patil',
    place: 'पुणे, महाराष्ट्र',
    role: 'Loan approved · ₹12.5L',
    rating: 5
  },
  {
    text: 'Title verification ki service maine apne NBFC ke liye use ki. 200+ rural mortgages ke titles check kiye. Pehle 5 din lagta tha, ab 24 ghante.',
    name: 'Rajesh Kumar',
    place: 'Credit Head, mid-sized NBFC',
    role: 'B2B customer',
    rating: 5
  }
];

export function Testimonials() {
  return (
    <section className="py-20 px-6 bg-ivory-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="mono text-xs text-terracotta-600 tracking-widest mb-3">TESTIMONIALS</div>
          <h2 className="display text-4xl sm:text-5xl m-0 leading-tight">कार्डधारकों की ज़िंदगी बदली</h2>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="bg-ivory-100 p-7 border-l-4 border-terracotta-600">
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={14} fill="#FBBF24" className="text-amber-300" />
                ))}
              </div>
              <p className="text-[15px] text-ink-800 leading-relaxed mb-5">“{t.text}”</p>
              <div className="flex items-center gap-3 pt-4 border-t border-ivory-300">
                <div className="w-10 h-10 rounded-full bg-terracotta-600 text-ivory-50 flex items-center justify-center font-semibold display text-lg">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-semibold text-sm">{t.name}</div>
                  <div className="text-xs text-ink-500">{t.place} · {t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
