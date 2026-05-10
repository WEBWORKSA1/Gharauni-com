'use client';

import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  phone?: string;
  message?: string;
  label?: string;
}

export function WhatsAppButton({
  phone = '919876543210',
  message = 'Namaste! Mujhe Gharauni ke baare mein jaankari chahiye.',
  label = 'WhatsApp पर पूछें'
}: WhatsAppButtonProps) {
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-30 bg-[#25D366] hover:bg-[#1da851] text-white rounded-full shadow-2xl flex items-center gap-2 transition-all hover:scale-105"
      style={{ padding: '14px 20px' }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={22} fill="currentColor" />
      <span className="hidden sm:inline font-semibold text-sm">{label}</span>
    </a>
  );
}
