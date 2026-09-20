import Link from "next/link";
import { Code, ExternalLink, ShieldCheck, Terminal, Cpu } from "lucide-react";

export default function DocsPage() {
  const endpoints = [
    { method: "POST", path: "/v1/measurements", desc: "Submit verified cellular or speed-test telemetry with anti-fraud scoring." },
    { method: "POST", path: "/v1/speedtests", desc: "Record verified speed test results from web, mobile, or desktop clients." },
    { method: "GET", path: "/v1/map", desc: "Query 1.1km privacy spatial grid tiles with Dialog, Mobitel, Airtel, Hutch benchmarks." },
    { method: "GET", path: "/v1/network-comparison", desc: "Query parallel operator metrics for specified Sri Lankan districts." },
    { method: "POST", path: "/v1/devices/pair", desc: "Generate single-use QR pairing tokens and codes for Companion Live Mode." },
    { method: "GET", path: "/v1/config", desc: "Fetch unified remote config for feature flags, thresholds, and speed nodes." },
    { method: "GET", path: "/v1/releases", desc: "Fetch ecosystem release manifest and signed update URLs." },
    { method: "WS", path: "/v1/realtime/device", desc: "WebSocket ingest stream for Android and Windows sensors." },
    { method: "WS", path: "/v1/realtime/dashboard", desc: "WebSocket subscription stream for Web Companion live monitoring." },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="border-b border-slate-800 pb-5">
        <span className="text-xs uppercase font-mono font-bold text-cyan-400 tracking-wider">
          Developer Documentation
        </span>
        <h1 className="text-3xl font-black text-white mt-1">SignalFusion OpenAPI v3 Specification</h1>
        <p className="text-sm text-slate-400 mt-2">
          The single API contract shared across the Web platform, Android app, and Windows desktop software.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase text-white tracking-wider flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          Core REST &amp; Real-time Endpoints
        </h3>

        <div className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden shadow-xl">
          <div className="divide-y divide-slate-800/80 text-xs">
            {endpoints.map((ep) => (
              <div key={ep.path} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-800/30">
                <div className="flex items-center gap-3 font-mono">
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      ep.method === "POST"
                        ? "bg-emerald-950/60 text-emerald-400 border border-emerald-500/30"
                        : ep.method === "GET"
                        ? "bg-blue-950/60 text-blue-400 border border-blue-500/30"
                        : "bg-purple-950/60 text-purple-400 border border-purple-500/30"
                    }`}
                  >
                    {ep.method}
                  </span>
                  <span className="text-slate-200 font-semibold">{ep.path}</span>
                </div>
                <div className="text-slate-400 text-xs sm:text-right">
                  {ep.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
