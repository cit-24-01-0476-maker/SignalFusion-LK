import { Radio, Lock, Smartphone, Globe, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function HowItWorksPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase font-mono font-bold text-cyan-400 tracking-wider">
          Transparency &amp; Methodology
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white mt-2">
          How SignalFusion LK Works
        </h1>
        <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed">
          From hardware radio antennas in Sri Lanka to live crowdsourced maps: learn how SignalFusion LK measures, protects privacy, and verifies data.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 rounded-2xl bg-[#091021] border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Smartphone className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">1. Native Android Sensor</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            The SignalFusion Mobile Android application interfaces directly with Android Telephony APIs to read genuine SS-RSRP, SS-RSRQ, SS-SINR, LTE RSRP, and tower cell IDs from your SIM card.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#091021] border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">2. Privacy-Preserving Grids</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Exact user coordinates are never stored or published. GPS points are immediately quantized into ~1.1km spatial grids before aggregation, completely protecting exact home and office privacy.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#091021] border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white">3. Sri Lanka Map Aggregation</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Measurements are pooled by operator (Dialog, Mobitel, Airtel, Hutch) using median calculations rather than means to prevent outliers from distorting real-world user expectations.
          </p>
        </div>
      </div>
    </div>
  );
}
