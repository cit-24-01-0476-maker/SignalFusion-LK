import { ShieldCheck, Lock, CheckCircle2, EyeOff } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="border-b border-slate-800 pb-5">
        <span className="text-xs uppercase font-mono font-bold text-cyan-400 tracking-wider">
          Privacy Policy &amp; Architecture
        </span>
        <h1 className="text-3xl font-black text-white mt-1">Your Privacy is Built Into the Code</h1>
        <p className="text-sm text-slate-400 mt-2">
          SignalFusion LK adheres to strict privacy principles. We never expose exact coordinates and collect zero personal content.
        </p>
      </div>

      <div className="space-y-6 text-xs text-slate-300 leading-relaxed">
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-cyan-400" />
            1. Spatial Grid Quantization (No Exact GPS)
          </h3>
          <p>
            When you run speed tests or contribute crowdsourced signals, raw latitude and longitude coordinates are immediately transformed on the client or API gateway into ~1.1km grid boxes (e.g. `LK_GRID_6.92_79.86`). Exact location coordinates are discarded.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <EyeOff className="w-4 h-4 text-cyan-400" />
            2. Prohibited Data Collection
          </h3>
          <p>
            SignalFusion LK will NEVER inspect, read, or upload:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-400 pt-1">
            <li>IMEI or hardware serial numbers</li>
            <li>Contacts, SMS messages, or phone call audio</li>
            <li>Personal browsing history or private files</li>
            <li>Phone numbers or carrier account credentials</li>
          </ul>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            3. User Data Rights
          </h3>
          <p>
            You have complete control over your data. In the user settings, you may disable crowdsourced contributions at any time, export all your speed test records as JSON, or permanently delete your account and historical tests.
          </p>
        </div>
      </div>
    </div>
  );
}
