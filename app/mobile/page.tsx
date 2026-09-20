import Link from "next/link";
import { Smartphone, Radio, Compass, ShieldCheck, Download, Activity, Zap, CheckCircle2 } from "lucide-react";

export default function MobilePage() {
  const features = [
    { title: "Native Telephony Engine", desc: "Direct hardware reads of LTE RSRP, RSRQ, RSSI, and 5G NR SS-RSRP, SS-RSRQ, SS-SINR, CSI metrics via Android TelephonyManager." },
    { title: "Hardware Signal Finder", desc: "Uses phone compass and sub-second dBm updates to guide you toward optimal signal reflection and window positions." },
    { title: "Web Companion Streaming", desc: "Broadcasts live radio telemetry directly to your SignalFusion Web dashboard over secure WebSockets." },
    { title: "Anti-Drop Protection", desc: "Deterministic heuristic detection of impending connection drops before VoIP calls or gaming sessions degrade." },
    { title: "Sri Lanka Operator Calibration", desc: "Pre-tuned for Dialog (MCC 413-02), Mobitel (413-01), Airtel (413-05), and Hutch (413-08) band allocations." },
    { title: "Battery Efficient Monitoring", desc: "Designed with Kotlin coroutines and Flow to preserve battery life while gathering accurate network samples." },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 mb-4">
          <Smartphone className="w-3.5 h-3.5" />
          <span>Android Mobile Intelligence</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">SignalFusion Mobile for Android</h1>
        <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed">
          The physical hardware sensor of the SignalFusion LK ecosystem. Engineered in Kotlin, Jetpack Compose, and Material 3 with real cellular radio APIs.
        </p>

        <div className="flex items-center justify-center gap-4 mt-6">
          <Link
            href="/download"
            className="px-6 py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-cyan-500 text-white shadow-lg shadow-emerald-500/20 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>DOWNLOAD APK (v1.4.0)</span>
          </Link>
          <Link
            href="/devices"
            className="px-6 py-3 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-700 text-slate-200 hover:text-white"
          >
            PAIR WITH WEB COMPANION
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feat) => (
          <div key={feat.title} className="p-6 rounded-2xl bg-[#0B1327] border border-slate-800 space-y-2">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              {feat.title}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
