import Link from 'next/link';
import type { Metadata } from 'next';
import { Mail, MessageCircle, Phone, MapPin } from 'lucide-react';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Contact · संपर्क करें',
  description: 'Contact Gharauni.com — partnership inquiries, support, press, or legal.'
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mono text-xs text-terracotta-600 tracking-widest mb-3">CONTACT</div>
          <h1 className="display text-4xl sm:text-5xl m-0 mb-3 leading-tight">हमसे संपर्क करें</h1>
          <p className="text-lg text-ink-700 mb-12 leading-relaxed max-w-2xl">
            Partnership, support, press, or just a hello — we read every message.
          </p>

          <div className="grid sm:grid-cols-2 gap-5 mb-10">
            <ContactCard icon={Mail} label="General / Support" value="hello@gharauni.com" href="mailto:hello@gharauni.com" />
            <ContactCard icon={Mail} label="Partnerships (Lenders, NBFCs)" value="partners@gharauni.com" href="mailto:partners@gharauni.com" />
            <ContactCard icon={Mail} label="Press" value="press@gharauni.com" href="mailto:press@gharauni.com" />
            <ContactCard icon={Mail} label="Legal / Privacy" value="legal@gharauni.com" href="mailto:legal@gharauni.com" />
            <ContactCard icon={MessageCircle} label="WhatsApp Support" value="+91 98765 43210" href="https://wa.me/919876543210" />
            <ContactCard icon={Phone} label="Helpline (Hindi/English)" value="1800-XXX-XXXX" sub="Mon–Sat, 9am–7pm IST" />
          </div>

          <div className="bg-ivory-100 p-7 border border-ivory-200">
            <MapPin size={24} className="text-terracotta-600 mb-3" />
            <div className="display text-2xl mb-2">Office</div>
            <p className="text-ink-700">
              WebWorks · Gharauni Platform<br/>
              Markham, Ontario, Canada<br/>
              Operations partner: India (TBA)
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

function ContactCard({ icon: Icon, label, value, sub, href }: any) {
  const content = (
    <div className="hover-lift bg-ivory-50 border-[1.5px] border-ivory-200 p-6 h-full">
      <Icon size={22} className="text-terracotta-600 mb-3" />
      <div className="mono text-[11px] text-ink-500 tracking-wider mb-1">{label.toUpperCase()}</div>
      <div className="text-lg font-semibold">{value}</div>
      {sub && <div className="text-sm text-ink-500 mt-1">{sub}</div>}
    </div>
  );
  return href ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener">{content}</a> : content;
}
