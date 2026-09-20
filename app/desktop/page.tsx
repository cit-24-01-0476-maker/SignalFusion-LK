import Link from "next/link";
import { Monitor, Activity, Wifi, ShieldCheck, Download, Cpu, CheckCircle2 } from "lucide-react";

export default function DesktopPage() {
  const features = [
    { title: "Rust System Engine", desc: "Built with Tauri 2 and native Rust. Sub-millisecond latency probes, raw socket stats, and minimal CPU footprint." },
    { title: "Continuous Ping & Jitter Monitor", desc: "Long-running latency and packet-loss graph sitting quietly in your Windows system tray." },
    { title: "Wi-Fi & Ethernet Diagnostics", desc: "Detailed adapter health, signal attenuation, BSSID details, and local gateway route diagnostics." },
    { title: "Gaming & Call Stability Mode", desc: "Real-time jitter spike warning and bufferbloat alerts before multiplayer games or video conferences drop." },
    { title: "Signed Cryptographic Auto-Updater", desc: "Seamless updates delivered through Tauri's SHA-256 signed release manifest." },
    { title: "Web Companion Live Sync", desc: "Transmits your PC network telemetry to your SignalFusion Web account in real-time." },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-950/60 border border-cyan-500/40 text-cyan-400 mb-4">
          <Monitor className="w-3.5 h-3.5" />
          <span>Windows Desktop Intelligence</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white">SignalFusion Desktop for Windows</h1>
        <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed">
          High-performance network monitoring for Windows 10 and 11. Built with Tauri 2, Rust, and React for zero-bloat continuous telemetry.
        </p>

        <div className="flex items-center justify-center gap-4 mt-6">
          <Link
            href="/download"
            className="px-6 py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/20 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>DOWNLOAD INSTALLER (x64)</span>
          </Link>
          <Link
            href="/speedtest"
            className="px-6 py-3 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-700 text-slate-200 hover:text-white"
          >
            TEST BROWSER SPEED NOW
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feat) => (
          <div key={feat.title} className="p-6 rounded-2xl bg-[#0B1327] border border-slate-800 space-y-2">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              {feat.title}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
