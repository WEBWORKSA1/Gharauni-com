import Link from 'next/link';
import { Home, ArrowRight } from 'lucide-react';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { Seal } from '@/components/seal';

export default function NotFound() {
  return (
    <>
      <Nav />
      <section className="py-32 px-6 text-center min-h-[60vh]">
        <div className="max-w-2xl mx-auto">
          <Seal size="lg" className="mx-auto mb-6" />
          <div className="display text-7xl text-terracotta-600 mb-4">404</div>
          <h1 className="display text-3xl mb-4">यह पृष्ठ नहीं मिला</h1>
          <p className="text-lg text-ink-700 mb-8">
            The page you’re looking for doesn’t exist on Gharauni.com. शायद गलत URL टाइप हो गया हो?
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/" className="btn-primary inline-flex items-center gap-2">
              <Home size={16} /> Home
            </Link>
            <Link href="/check" className="btn-ghost inline-flex items-center gap-2">
              स्थिति जाँचें <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
