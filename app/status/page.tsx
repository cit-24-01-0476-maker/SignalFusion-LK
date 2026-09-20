import { Activity, Server, CheckCircle2, ShieldCheck, Globe } from "lucide-react";

export default function StatusPage() {
  const services = [
    { name: "SignalFusion Cloud API", status: "Operational", uptime: "99.98%", rtt: "18 ms" },
    { name: "Authentication & Sync Service", status: "Operational", uptime: "100.0%", rtt: "22 ms" },
    { name: "Sri Lanka Map Tile Service", status: "Operational", uptime: "99.95%", rtt: "24 ms" },
    { name: "Realtime WebSocket Hub", status: "Operational", uptime: "99.99%", rtt: "16 ms" },
    { name: "Colombo Speed Node 1 (Tier-3 Primary)", status: "Operational", uptime: "100.0%", rtt: "14 ms" },
    { name: "Colombo Speed Node 2 (Backup Edge)", status: "Operational", uptime: "99.97%", rtt: "17 ms" },
    { name: "Unified Release & Update Service", status: "Operational", uptime: "100.0%", rtt: "20 ms" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <span className="text-xs uppercase font-mono font-bold text-emerald-400 tracking-wider flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            All Systems Operational
          </span>
          <h1 className="text-3xl font-black text-white mt-1">SignalFusion LK Service Status</h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time health and reachability across our Sri Lanka datacenter edges and API infrastructure.
          </p>
        </div>

        <div className="px-4 py-2 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-bold font-mono">
          System Health: 100%
        </div>
      </div>

      <div className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden shadow-xl">
        <div className="divide-y divide-slate-800/80">
          {services.map((svc) => (
            <div key={svc.name} className="p-5 flex items-center justify-between hover:bg-slate-800/30 transition-colors">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-white">{svc.name}</h3>
                  <span className="text-[11px] text-slate-500">Latency to Colombo: {svc.rtt}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="text-slate-400">Uptime: {svc.uptime}</span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-500/30 font-semibold">
                  {svc.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
