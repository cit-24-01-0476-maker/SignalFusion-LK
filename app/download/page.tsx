"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Smartphone, Monitor, Globe, Download, CheckCircle2, ShieldCheck, Sparkles, ExternalLink } from "lucide-react";

export default function DownloadPage() {
  const [pwaInstalled, setPwaInstalled] = useState(false);

  const handleInstallPwa = () => {
    if (typeof window !== "undefined" && (window as any).deferredPrompt) {
      (window as any).deferredPrompt.prompt();
    } else {
      alert("To install SignalFusion Web App, click the install icon in your browser's address bar or use 'Add to Home Screen'.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-black text-white">Download SignalFusion Ecosystem</h1>
        <p className="text-sm text-slate-400 mt-2">
          Experience genuine Sri Lankan mobile and desktop network intelligence across all your personal devices.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1: Android App */}
        <div className="rounded-2xl bg-gradient-to-b from-[#0D1527] to-[#070B14] border border-cyan-500/20 p-6 flex flex-col justify-between shadow-2xl hover:border-cyan-400/40 transition-all">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-semibold">Latest Stable: v1.4.0</span>
              <h3 className="text-xl font-bold text-white mt-1">SignalFusion Mobile</h3>
              <p className="text-xs text-slate-400 mt-1">Android 8.0+ (API 26 to 35)</p>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Full native cellular radio intelligence. Measures SS-RSRP, SS-RSRQ, SS-SINR, LTE RSRP, Cell ID, PCI, and powers live Web Companion telemetry.
            </p>

            <div className="space-y-2 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Real 5G NR &amp; 4G Telephony Engine</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Live Signal Finder Compass</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Dialog, Mobitel, Airtel, Hutch calibrated</span>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-2">
            <a
              href="/downloads/SignalFusion-v1.4.0.apk"
              download="SignalFusion-v1.4.0.apk"
              className="w-full py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-cyan-500 hover:from-emerald-500 hover:to-cyan-400 text-white flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD APK (v1.4.0)</span>
            </a>
            <div className="text-center">
              <span className="text-[11px] text-slate-500">Google Play Store release certified • 8.5 MB</span>
            </div>
          </div>
        </div>

        {/* Card 2: Desktop Software */}
        <div className="rounded-2xl bg-gradient-to-b from-[#0D1527] to-[#070B14] border border-cyan-500/20 p-6 flex flex-col justify-between shadow-2xl hover:border-cyan-400/40 transition-all">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Monitor className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase font-semibold">Latest Stable: v1.4.0</span>
              <h3 className="text-xl font-bold text-white mt-1">SignalFusion Desktop</h3>
              <p className="text-xs text-slate-400 mt-1">Windows 10 / 11 (x64, ARM64 ready)</p>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Tauri 2 &amp; Rust high-precision network monitor. Continuous ping, jitter, Wi-Fi / Ethernet adapter diagnostics, and local route monitoring.
            </p>

            <div className="space-y-2 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Continuous background ping &amp; jitter monitor</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Local adapter &amp; DNS routing diagnostics</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Tauri signed cryptographic auto-updater</span>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-2">
            <a
              href="https://releases.signalfusion.lk/desktop/SignalFusion-Setup-1.4.0-x64.msi"
              className="w-full py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD WINDOWS (x64)</span>
            </a>
            <div className="text-center">
              <span className="text-[11px] text-slate-500">Includes signed SHA-256 binary validation</span>
            </div>
          </div>
        </div>

        {/* Card 3: Web App / PWA */}
        <div className="rounded-2xl bg-gradient-to-b from-[#0D1527] to-[#070B14] border border-cyan-500/20 p-6 flex flex-col justify-between shadow-2xl hover:border-cyan-400/40 transition-all">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-purple-400 uppercase font-semibold">Zero Installation</span>
              <h3 className="text-xl font-bold text-white mt-1">SignalFusion Web App</h3>
              <p className="text-xs text-slate-400 mt-1">All modern browsers (Chrome, Safari, Edge, Firefox)</p>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Progressive Web App with offline shell, streaming speed test engine, live Sri Lanka map, and Web Companion control center.
            </p>

            <div className="space-y-2 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400" />
                <span>Instant access without download</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400" />
                <span>Installable as standalone PWA window</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400" />
                <span>Web Companion QR receiver ready</span>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-2">
            <button
              onClick={handleInstallPwa}
              className="w-full py-3 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center gap-2 border border-slate-700 transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>INSTALL PWA STANDALONE</span>
            </button>
            <div className="text-center">
              <Link href="/speedtest" className="text-[11px] text-cyan-400 hover:underline">
                Or launch Web Speed Test directly
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
