import { Activity, ShieldCheck, Heart, Radio } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="border-b border-slate-800 pb-5 text-center">
        <span className="text-xs uppercase font-mono font-bold text-cyan-400 tracking-wider">
          Sri Lanka-First Mission
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white mt-1">About SignalFusion LK</h1>
        <p className="text-sm text-slate-400 mt-2 max-w-xl mx-auto">
          Built to bring transparency, stability, and genuine telemetry to Sri Lanka&apos;s mobile and broadband internet users.
        </p>
      </div>

      <div className="space-y-6 text-xs text-slate-300 leading-relaxed">
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <h3 className="text-sm font-bold text-white">Our Philosophy</h3>
          <p>
            SignalFusion LK was created because Sri Lankan internet users deserved an honest tool. Many apps in app stores promise &quot;300% signal boost&quot; or claim to &quot;unlock hidden 5G&quot;—promises that violate the laws of physics and deceive users.
          </p>
          <p>
            SignalFusion LK takes a completely different path: <strong>Measure, Analyze, Detect, Optimize where technically possible, Measure again, and Show Real Results</strong>. We never fake numbers, never simulate imaginary 5G coverage, and clearly distinguish between browser-observable performance and native cellular radio sensors.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <h3 className="text-sm font-bold text-white">Local Infrastructure Peering</h3>
          <p>
            We operate edge nodes in Colombo data centers peered with Sri Lankan ISPs (Dialog, SLT-Mobitel, Airtel, Hutch, and the LankaX internet exchange) to provide genuine domestic latency and throughput measurements.
          </p>
        </div>
      </div>
    </div>
  );
}
