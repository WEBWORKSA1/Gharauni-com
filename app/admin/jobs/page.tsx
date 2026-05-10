'use client';

import { useState, useEffect } from 'react';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { RefreshCw, AlertCircle, CheckCircle2, Loader2, XCircle, KeyRound } from 'lucide-react';

export default function AdminJobsPage() {
  const [key, setKey] = useState('');
  const [authed, setAuthed] = useState(false);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/jobs?key=${encodeURIComponent(key)}`);
      const json = await res.json();
      if (!json.ok) throw new Error(json.error || 'unauthorized');
      setData(json);
      setAuthed(true);
    } catch (err: any) {
      setError(err.message);
      setAuthed(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!authed) return;
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authed]);

  if (!authed) {
    return (
      <>
        <Nav />
        <section className="py-32 px-6 min-h-[60vh]">
          <div className="max-w-md mx-auto bg-ivory-50 p-8 border-[1.5px] border-ivory-200">
            <KeyRound size={32} className="text-terracotta-600 mb-3" />
            <h1 className="display text-2xl mb-2">Admin — Scraper Jobs</h1>
            <p className="text-sm text-ink-700 mb-5">Enter admin key to view live job queue.</p>
            <form onSubmit={e => { e.preventDefault(); fetchData(); }}>
              <input
                type="password"
                value={key}
                onChange={e => setKey(e.target.value)}
                placeholder="ADMIN_SECRET value"
                className="input-base mb-3 mono"
              />
              {error && <div className="text-sm text-red-700 mb-3">{error}</div>}
              <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
                {loading ? 'Checking...' : 'Unlock'}
              </button>
            </form>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Nav />
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
            <div>
              <div className="mono text-xs text-terracotta-600 tracking-widest">ADMIN · SCRAPER OPS</div>
              <h1 className="display text-3xl m-0">Job Queue</h1>
            </div>
            <button onClick={fetchData} className="flex items-center gap-2 text-sm text-terracotta-600 hover:underline">
              <RefreshCw size={14} /> Refresh (auto every 5s)
            </button>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-8">
            <StatCard label="Total" value={data?.stats.total || 0} color="#7C2D12" />
            <StatCard label="Queued" value={data?.stats.queued || 0} color="#1E40AF" icon={Loader2} />
            <StatCard label="Running" value={data?.stats.running || 0} color="#92400E" />
            <StatCard label="Success" value={data?.stats.success || 0} color="#16A34A" icon={CheckCircle2} />
            <StatCard label="Failed" value={data?.stats.failed || 0} color="#DC2626" icon={XCircle} />
            <StatCard label="Captcha" value={data?.stats.captchaRequired || 0} color="#A16207" icon={AlertCircle} />
          </div>

          {/* WORKERS */}
          <h2 className="display text-xl mb-3">Workers ({data?.workers.length || 0})</h2>
          {data?.workers.length === 0 ? (
            <div className="bg-ivory-100 p-5 border border-dashed border-terracotta-500 text-sm text-ink-700 mb-8">
              ⚠️ No workers connected. Deploy the worker service (see <code className="mono">/worker</code> directory) and set the heartbeat to <code className="mono">/api/scrape/worker</code>.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
              {data?.workers.map((w: any) => (
                <div key={w.workerId} className="bg-ivory-50 p-4 border-[1.5px] border-ivory-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="mono text-xs">{w.workerId}</span>
                    <span className={`w-2 h-2 rounded-full ${w.proxyStatus === 'healthy' ? 'bg-accent-green' : 'bg-red-500'}`} />
                  </div>
                  <div className="text-xs text-ink-500">Last seen: {new Date(w.lastSeen).toLocaleTimeString()}</div>
                  <div className="text-xs text-ink-700">In progress: {w.jobsInProgress} · Done: {w.jobsCompleted} · Failed: {w.jobsFailed}</div>
                </div>
              ))}
            </div>
          )}

          {/* JOB TABLE */}
          <h2 className="display text-xl mb-3">Recent Jobs</h2>
          <div className="bg-ivory-50 border-[1.5px] border-ivory-200 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-ink-900 text-ivory-50 text-left">
                  <th className="p-3 mono text-xs">ID</th>
                  <th className="p-3 mono text-xs">STATE</th>
                  <th className="p-3 mono text-xs">VILLAGE</th>
                  <th className="p-3 mono text-xs">STATUS</th>
                  <th className="p-3 mono text-xs">ATTEMPTS</th>
                  <th className="p-3 mono text-xs">CREATED</th>
                </tr>
              </thead>
              <tbody>
                {data?.recentJobs.length === 0 && (
                  <tr><td colSpan={6} className="p-8 text-center text-ink-500">No jobs yet. Trigger one via <code className="mono">/api/scrape</code></td></tr>
                )}
                {data?.recentJobs.map((j: any) => (
                  <tr key={j.id} className="border-b border-ivory-200">
                    <td className="p-3 mono text-xs">{j.id.slice(0, 18)}...</td>
                    <td className="p-3">{j.state}</td>
                    <td className="p-3">{j.village}</td>
                    <td className="p-3"><StatusBadge status={j.status} /></td>
                    <td className="p-3 mono">{j.attempts}/{j.maxAttempts}</td>
                    <td className="p-3 mono text-xs text-ink-500">{new Date(j.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 p-4 bg-ivory-100 border border-dashed border-terracotta-500 text-xs text-ink-700">
            ℹ️ In-memory job store. Restarts on Vercel function recycle. Migrate to Upstash Redis (Phase 6) for persistence.
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

function StatCard({ label, value, color, icon: Icon }: any) {
  return (
    <div className="bg-ivory-50 p-4 border-[1.5px] border-ivory-200">
      <div className="flex items-center gap-1.5 mb-1">
        {Icon && <Icon size={12} style={{ color }} />}
        <div className="mono text-[10px] text-ink-500 tracking-wider">{label.toUpperCase()}</div>
      </div>
      <div className="display text-3xl" style={{ color }}>{value}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    queued: { bg: '#DBEAFE', color: '#1E40AF' },
    running: { bg: '#FEF3C7', color: '#92400E' },
    success: { bg: '#DCFCE7', color: '#16A34A' },
    failed: { bg: '#FEE2E2', color: '#DC2626' },
    captcha_required: { bg: '#FED7AA', color: '#A16207' },
    cancelled: { bg: '#E7E5E4', color: '#78716C' }
  };
  const s = map[status] || map.queued;
  return (
    <span className="px-2 py-0.5 text-[11px] font-semibold mono uppercase" style={{ background: s.bg, color: s.color }}>
      {status}
    </span>
  );
}
