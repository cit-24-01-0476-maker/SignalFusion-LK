import { ShieldCheck, Cpu, Activity, Zap, CheckCircle2, AlertTriangle } from "lucide-react";

export default function TechnologyPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase font-mono font-bold text-cyan-400 tracking-wider">
          Engineering Architecture
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white mt-2">
          Engineering Honesty &amp; Technical Philosophy
        </h1>
        <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed">
          SignalFusion LK rejects deceptive &quot;signal boosting&quot; applications. We are built on verifiable radio science, deterministic heuristics, and strict platform separation.
        </p>
      </div>

      {/* Core Philosophy Chain: MEASURE -> ANALYZE -> DETECT -> OPTIMIZE -> MEASURE AGAIN */}
      <div className="p-8 rounded-2xl bg-gradient-to-r from-[#0D1527] via-[#09152C] to-[#0D1527] border border-cyan-500/30">
        <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-400 mb-6 text-center">
          The SignalFusion Core Pipeline
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 text-center">
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 font-mono block">STAGE 1</span>
            <span className="text-sm font-bold text-white mt-1 block">MEASURE</span>
            <span className="text-[10px] text-slate-500 mt-1 block">Raw Physical dBm</span>
          </div>
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 font-mono block">STAGE 2</span>
            <span className="text-sm font-bold text-cyan-300 mt-1 block">ANALYZE</span>
            <span className="text-[10px] text-slate-500 mt-1 block">SINR / Jitter Curve</span>
          </div>
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 font-mono block">STAGE 3</span>
            <span className="text-sm font-bold text-amber-300 mt-1 block">DETECT</span>
            <span className="text-[10px] text-slate-500 mt-1 block">Route Congestion</span>
          </div>
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 font-mono block">STAGE 4</span>
            <span className="text-sm font-bold text-emerald-400 mt-1 block">OPTIMIZE</span>
            <span className="text-[10px] text-slate-500 mt-1 block">Where Permitted</span>
          </div>
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 font-mono block">STAGE 5</span>
            <span className="text-sm font-bold text-blue-300 mt-1 block">MEASURE AGAIN</span>
            <span className="text-[10px] text-slate-500 mt-1 block">Validate Gain</span>
          </div>
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
            <span className="text-xs text-slate-400 font-mono block">STAGE 6</span>
            <span className="text-sm font-bold text-emerald-300 mt-1 block">SHOW RESULTS</span>
            <span className="text-[10px] text-slate-500 mt-1 block">Transparent Proof</span>
          </div>
        </div>
      </div>

      {/* Principles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-[#091021] border border-slate-800 space-y-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-cyan-400" />
            No Fake Cellular Numbers
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Web browsers run in a secure sandbox that intentionally prevents direct access to mobile radio basebands. When a browser does not expose a metric, SignalFusion reports &quot;Not available on this device&quot; or &quot;Requires SignalFusion Mobile&quot; rather than fabricating imaginary 5G or dBm values.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#091021] border border-slate-800 space-y-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            Anti-Fake Measurement Engine
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Our ingestion backend runs automated spatial plausibility checks, Sri Lankan territorial bounding box validation, duplicate detection, and outlier analysis. Outlier speeds are statistically validated rather than naively accepted.
          </p>
        </div>
      </div>
    </div>
  );
}
