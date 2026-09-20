import { Sparkles, Smartphone, Monitor, Globe, Download, CheckCircle2, ShieldCheck } from "lucide-react";

export default function ReleasesPage() {
  const releases = [
    {
      version: "1.4.0",
      channel: "Stable",
      date: "September 20, 2026",
      summary: "Sri Lanka 5G NR Carrier Intelligence & Companion Live Mode release.",
      notes: [
        "Full support for Sri Lankan 5G NR metrics (SS-RSRP, SS-RSRQ, SS-SINR) on Dialog and SLT-Mobitel.",
        "High-precision WebSocket live device companion streaming from Android & Windows to Web.",
        "Interactive Sri Lanka coverage map with 1.1km privacy-preserving spatial grid aggregation.",
        "Real HTTP streaming speed-test engine with Colombo edge datacenter peering."
      ],
      platforms: {
        web: "Build sf-v1.4.0-prod (Live)",
        android: "APK v1.4.0 (SHA-256 Verified)",
        windows: "MSI v1.4.0 (Tauri Signed)"
      }
    },
    {
      version: "1.3.2",
      channel: "Maintenance",
      date: "August 14, 2026",
      summary: "Colombo Node 2 backup edge integration and latency calibration.",
      notes: [
        "Added automatic failover to secondary speed node.",
        "Improved Jitter calculation over mobile broadband connections.",
        "Refined Sri Lanka district boundaries in map explorer."
      ],
      platforms: {
        web: "Archived",
        android: "v1.3.2",
        windows: "v1.3.2"
      }
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <span className="text-xs uppercase font-mono font-bold text-cyan-400 tracking-wider">
            Unified Ecosystem Releases
          </span>
          <h1 className="text-3xl font-black text-white mt-1">Release Center</h1>
          <p className="text-xs text-slate-400 mt-1">
            Single coordinated releases across Web, Android, and Desktop software.
          </p>
        </div>

        <div className="px-3.5 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold">
          Current Version: v1.4.0 (Stable)
        </div>
      </div>

      <div className="space-y-8">
        {releases.map((rel) => (
          <div key={rel.version} className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-black font-mono text-white">v{rel.version}</h3>
                <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {rel.channel}
                </span>
              </div>
              <span className="text-xs font-mono text-slate-400">{rel.date}</span>
            </div>

            <p className="text-xs text-slate-300 font-medium">{rel.summary}</p>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Highlights</h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {rel.notes.map((note, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
              <span>Web: <strong className="text-slate-200">{rel.platforms.web}</strong></span>
              <span>•</span>
              <span>Android: <strong className="text-slate-200">{rel.platforms.android}</strong></span>
              <span>•</span>
              <span>Windows: <strong className="text-slate-200">{rel.platforms.windows}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
