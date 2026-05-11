import { Shield, Lock, FileCheck, Building2 } from 'lucide-react';

// Trust badges — specific lenders named, regulatory compliance listed, not just generic logos.

export function TrustBadges() {
  return (
    <section className="border-b border-ink/10 bg-paper" aria-label="Trust and compliance">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-14 items-start">
          {/* Compliance badges */}
          <div>
            <div className="text-[11px] uppercase tracking-widest text-terracotta/80 font-medium mb-3">Compliance</div>
            <h3 className="font-serif text-2xl text-ink mb-5">Built to Indian regulatory standards.</h3>
            <ul className="space-y-3 text-sm text-ink/75">
              <li className="flex items-start gap-3">
                <Shield className="w-4 h-4 text-terracotta mt-0.5 flex-shrink-0" />
                <span><strong className="text-ink">DPDP Act 2023</strong> — your data is processed under India's Digital Personal Data Protection Act.</span>
              </li>
              <li className="flex items-start gap-3">
                <Lock className="w-4 h-4 text-terracotta mt-0.5 flex-shrink-0" />
                <span><strong className="text-ink">No Aadhaar OTP</strong> — we never ask for your Aadhaar number or OTP. Status checks use the public SVAMITVA portal.</span>
              </li>
              <li className="flex items-start gap-3">
                <FileCheck className="w-4 h-4 text-terracotta mt-0.5 flex-shrink-0" />
                <span><strong className="text-ink">RBI-registered lenders only</strong> — every partner is an RBI-licensed bank or registered NBFC.</span>
              </li>
              <li className="flex items-start gap-3">
                <Building2 className="w-4 h-4 text-terracotta mt-0.5 flex-shrink-0" />
                <span><strong className="text-ink">Data sourced from</strong> Ministry of Panchayati Raj, Survey of India, and state revenue departments.</span>
              </li>
            </ul>
          </div>

          {/* Partner banks/NBFCs */}
          <div className="lg:col-span-2">
            <div className="text-[11px] uppercase tracking-widest text-terracotta/80 font-medium mb-3">Lender Network</div>
            <h3 className="font-serif text-2xl text-ink mb-5">11 partners. One application.</h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {[
                'Bajaj Finserv',
                'Tata Capital',
                'Aditya Birla Finance',
                'Kotak Mahindra',
                'HDFC Bank',
                'ICICI Bank',
                'Axis Bank',
                'PNB Housing',
                'IIFL Finance',
                'L&T Finance',
                'Cholamandalam',
                '+ Regional Rural Banks',
              ].map((lender) => (
                <div key={lender} className="rounded-md border border-ink/10 bg-paper px-3 py-3 text-sm text-ink/80 font-medium text-center hover:border-terracotta/30 hover:bg-terracotta/[0.02] transition-colors">
                  {lender}
                </div>
              ))}
            </div>

            <p className="mt-5 text-xs text-ink/50">
              We compare rates from all 11 partners in seconds. You apply once. Approval typically in 48–72 hours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
