import Link from 'next/link';
import { Code2, Zap, Key, FileText, Github, ExternalLink, AlertTriangle } from 'lucide-react';
import { Shell } from '@/components/shell';
import { WaitlistBanner } from '@/components/waitlist-banner';

export default function ParserDocsPage() {
  return (
    <Shell>
      <WaitlistBanner
        service="Parser API"
        whatHappensNow="Docs published as a preview. Sign up to receive your sandbox key the day v1 ships."
      />
      <section className="border-b border-ink/10 bg-paper">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-paper to-paper pointer-events-none" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-6 py-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-700/30 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-800 mb-4">
              <Code2 className="w-3.5 h-3.5" /> API Documentation · v1 preview
            </div>
            <h1 className="font-serif text-4xl text-ink leading-tight">Gharauni Parser API</h1>
            <p className="mt-2 font-serif text-lg text-ink/70 italic">REST API to extract structured data from SVAMITVA property card PDFs and images.</p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-md bg-amber-50 border border-amber-200 px-3 py-2 text-xs text-amber-900">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span><strong>Preview only.</strong> The endpoints below are not live yet. Sign up to be notified when v1 ships and receive a sandbox key.</span>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/parser/signup" className="inline-flex items-center gap-2 rounded-md bg-terracotta px-5 py-2.5 text-white font-medium hover:bg-terracotta-dark transition-colors">
                <Key className="w-4 h-4" /> Join the API waitlist
              </Link>
              <a href="https://github.com/gharauni/parser-sdk" target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-2 rounded-md border border-ink/20 bg-paper px-5 py-2.5 text-ink font-medium hover:bg-ink/5 transition-colors">
                <Github className="w-4 h-4" /> SDK repo (coming)
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-12 grid lg:grid-cols-[200px_1fr] gap-10">
          <nav className="text-sm space-y-1 lg:sticky lg:top-6 self-start">
            <div className="text-[11px] uppercase tracking-widest text-ink/40 font-medium mb-2">On this page</div>
            <a href="#auth" className="block py-1 text-ink/70 hover:text-terracotta">Authentication</a>
            <a href="#parse" className="block py-1 text-ink/70 hover:text-terracotta">POST /v1/parse</a>
            <a href="#response" className="block py-1 text-ink/70 hover:text-terracotta">Response schema</a>
            <a href="#errors" className="block py-1 text-ink/70 hover:text-terracotta">Error codes</a>
            <a href="#sdks" className="block py-1 text-ink/70 hover:text-terracotta">SDKs</a>
            <a href="#limits" className="block py-1 text-ink/70 hover:text-terracotta">Rate limits</a>
          </nav>

          <article className="max-w-3xl space-y-10">

            <section id="auth">
              <h2 className="font-serif text-2xl text-ink mb-3">Authentication</h2>
              <p className="text-ink/75 mb-4">At launch, all requests will require an API key in the <code className="bg-ink/[0.06] px-1.5 py-0.5 rounded text-sm">Authorization</code> header:</p>
              <pre className="bg-ink text-paper text-xs rounded-md p-4 overflow-x-auto"><code>Authorization: Bearer gharauni_sk_live_xxxxxxxxxxxxx</code></pre>
              <p className="text-sm text-ink/60 mt-3">Join the waitlist at <Link href="/parser/signup" className="text-terracotta underline">/parser/signup</Link>. We will email your sandbox key the day v1 ships.</p>
            </section>

            <section id="parse">
              <h2 className="font-serif text-2xl text-ink mb-3">POST /v1/parse</h2>
              <p className="text-ink/75 mb-4">Planned: parses a single Gharauni card from a PDF or image. Target latency 1.4s median.</p>
              <h3 className="font-medium text-ink mt-5 mb-2">Request via cURL</h3>
              <pre className="bg-ink text-paper text-xs rounded-md p-4 overflow-x-auto"><code>{`curl -X POST https://api.gharauni.com/v1/parse \\
  -H "Authorization: Bearer gharauni_sk_live_xxx" \\
  -F "file=@/path/to/card.pdf"`}</code></pre>
              <h3 className="font-medium text-ink mt-5 mb-2">Or by URL</h3>
              <pre className="bg-ink text-paper text-xs rounded-md p-4 overflow-x-auto"><code>{`curl -X POST https://api.gharauni.com/v1/parse \\
  -H "Authorization: Bearer gharauni_sk_live_xxx" \\
  -H "Content-Type: application/json" \\
  -d '{"url": "https://example.com/card.pdf"}'`}</code></pre>
            </section>

            <section id="response">
              <h2 className="font-serif text-2xl text-ink mb-3">Response schema (planned)</h2>
              <pre className="bg-ink text-paper text-xs rounded-md p-4 overflow-x-auto"><code>{`{
  "id": "parse_01HXYZ...",
  "durationMs": 1380,
  "data": {
    "gharauniId": "091434-78921-04",
    "plotNumber": "178/2",
    "ownerName": "Ramesh Yadav",
    "area": { "value": 200, "unit": "sqYd" },
    "village": "Sikandrabad",
    "tehsil": "Bulandshahr",
    "district": "Bulandshahr",
    "state": "Uttar Pradesh",
    "coordinates": { "lat": 28.4543, "lng": 77.6912 },
    "issueDate": "2024-03-18"
  },
  "confidence": {
    "gharauniId": 0.99,
    "plotNumber": 0.96,
    "ownerName": 0.97,
    "area": 0.94,
    "coordinates": 0.91,
    "overall": 0.95
  }
}`}</code></pre>
              <p className="text-sm text-ink/60 mt-3">Fields with confidence below 0.85 should be flagged for human review in your LOS.</p>
            </section>

            <section id="errors">
              <h2 className="font-serif text-2xl text-ink mb-3">Error codes (planned)</h2>
              <div className="rounded-md border border-ink/10 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-ink/5 text-left">
                    <tr><th className="px-4 py-2 font-medium">HTTP</th><th className="px-4 py-2 font-medium">Code</th><th className="px-4 py-2 font-medium">Meaning</th></tr>
                  </thead>
                  <tbody className="divide-y divide-ink/10">
                    <tr><td className="px-4 py-2 font-mono">400</td><td className="px-4 py-2 font-mono">invalid_file</td><td className="px-4 py-2 text-ink/70">File not a valid PDF or image, or greater than 10MB</td></tr>
                    <tr><td className="px-4 py-2 font-mono">401</td><td className="px-4 py-2 font-mono">unauthorized</td><td className="px-4 py-2 text-ink/70">Missing or invalid API key</td></tr>
                    <tr><td className="px-4 py-2 font-mono">402</td><td className="px-4 py-2 font-mono">quota_exceeded</td><td className="px-4 py-2 text-ink/70">Monthly free tier exhausted, upgrade required</td></tr>
                    <tr><td className="px-4 py-2 font-mono">422</td><td className="px-4 py-2 font-mono">not_gharauni</td><td className="px-4 py-2 text-ink/70">Document does not appear to be a SVAMITVA card</td></tr>
                    <tr><td className="px-4 py-2 font-mono">429</td><td className="px-4 py-2 font-mono">rate_limited</td><td className="px-4 py-2 text-ink/70">Too many requests per minute. Backoff and retry.</td></tr>
                    <tr><td className="px-4 py-2 font-mono">500</td><td className="px-4 py-2 font-mono">internal_error</td><td className="px-4 py-2 text-ink/70">Try again. Persistent errors: status.gharauni.com</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section id="sdks">
              <h2 className="font-serif text-2xl text-ink mb-3">SDKs (planned)</h2>
              <p className="text-ink/75 mb-4">Official SDKs will be MIT-licensed at launch.</p>
              <h3 className="font-medium text-ink mt-5 mb-2">Python</h3>
              <pre className="bg-ink text-paper text-xs rounded-md p-4 overflow-x-auto"><code>{`pip install gharauni-sdk

from gharauni import Client

client = Client(api_key="gharauni_sk_live_xxx")
result = client.parse(file=open("card.pdf", "rb"))
print(result.data.gharauni_id)  # 091434-78921-04`}</code></pre>
              <h3 className="font-medium text-ink mt-5 mb-2">Node.js</h3>
              <pre className="bg-ink text-paper text-xs rounded-md p-4 overflow-x-auto"><code>{`npm install @gharauni/sdk

import { Client } from '@gharauni/sdk';
import fs from 'fs';

const client = new Client({ apiKey: 'gharauni_sk_live_xxx' });
const result = await client.parse({ file: fs.createReadStream('card.pdf') });
console.log(result.data.gharauniId);`}</code></pre>
            </section>

            <section id="limits">
              <h2 className="font-serif text-2xl text-ink mb-3">Rate limits (planned)</h2>
              <ul className="space-y-1.5 text-ink/75 text-sm">
                <li><strong className="text-ink">Free:</strong> 100 req/min, 50 parses/month total</li>
                <li><strong className="text-ink">Starter (₹5/parse):</strong> 1,000 req/min, capped at ₹5k/month</li>
                <li><strong className="text-ink">Growth (₹3/parse):</strong> 5,000 req/min</li>
                <li><strong className="text-ink">Enterprise:</strong> Up to 10,000 req/min, reserved capacity</li>
              </ul>
              <p className="text-sm text-ink/60 mt-3">Rate limit headers returned on every response.</p>
            </section>

            <div className="pt-8 border-t border-ink/10 flex items-center justify-between">
              <Link href="/parser" className="text-sm text-ink/60 hover:text-terracotta">Back to product page</Link>
              <Link href="/contact" className="inline-flex items-center gap-1 text-sm text-terracotta hover:underline">
                Question? Use our contact form <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </article>
        </div>
      </section>
    </Shell>
  );
}
