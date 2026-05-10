'use client';

import { useState } from 'react';
import { Nav } from './nav';
import { Footer } from './footer';
import type { Lang } from '@/lib/i18n';

interface ShellProps {
  children: React.ReactNode;
}

export function Shell({ children }: ShellProps) {
  const [lang, setLang] = useState<Lang>('hi');
  return (
    <>
      <Nav lang={lang} onLangChange={setLang} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
