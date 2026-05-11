import { Sparkles } from 'lucide-react';

// Shared banner shown at the top of any service that is not yet fully delivering.
// Honest pre-launch framing: "submit to join the waitlist, not to buy today."
// When the service actually launches, swap or remove the banner per page.

interface WaitlistBannerProps {
  // Short label for the service, e.g. "Title verification", "Parser API", "Insurance quotes"
  service: string;
  // What "submit" actually does for users right now, e.g.
  // "You will be the first notified when verified title checks launch."
  whatHappensNow: string;
  // Expected launch window, e.g. "Q3 2026"
  launchTarget?: string;
}

export function WaitlistBanner({ service, whatHappensNow, launchTarget = 'Q3 2026' }: WaitlistBannerProps) {
  return (
    <div className="border-b border-amber-200 bg-amber-50">
      <div className="mx-auto max-w-7xl px-6 py-3">
        <div className="flex items-start gap-3 text-sm">
          <Sparkles className="w-4 h-4 mt-0.5 text-amber-700 flex-shrink-0" />
          <div className="text-amber-900">
            <strong className="font-semibold">{service} · launching {launchTarget}.</strong>{' '}
            <span className="text-amber-900/85">{whatHappensNow} Free to join. No payment requested today.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
