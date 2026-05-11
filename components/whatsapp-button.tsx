'use client';

import { MessageCircle } from 'lucide-react';
import Link from 'next/link';

interface WhatsAppButtonProps {
  href?: string;
  label?: string;
}

// Rather than a fake placeholder WhatsApp number, we point users to /contact
// where they can leave a message that actually reaches us via /api/leads.
// When we have a real WhatsApp business line, swap the `href` to a wa.me URL.
export function WhatsAppButton({
  href = '/contact',
  label = 'मदद चाहिए? · Need help?'
}: WhatsAppButtonProps) {
  return (
    <Link
      href={href}
      className="fixed bottom-5 right-5 z-30 bg-[#25D366] hover:bg-[#1da851] text-white rounded-full shadow-2xl flex items-center gap-2 transition-all hover:scale-105"
      style={{ padding: '14px 20px' }}
      aria-label="Get help via contact form"
    >
      <MessageCircle size={22} fill="currentColor" />
      <span className="hidden sm:inline font-semibold text-sm">{label}</span>
    </Link>
  );
}
