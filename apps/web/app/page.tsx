"use client";

import React, { useState } from "react";
import Link from "next/link";
import HeroRadar from "../components/HeroRadar";
import SpeedTestGauge from "../components/SpeedTestGauge";
import SriLankaMap from "../components/SriLankaMap";
import CompanionLiveDashboard from "../components/CompanionLiveDashboard";
import { Activity, Radio, Smartphone, Monitor, ShieldCheck, Zap, BarChart3, QrCode, ArrowRight, CheckCircle2, Lock } from "lucide-react";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"speedtest" | "map" | "companion">("speedtest");

  return (
    <div className="space-y-16 pb-20">
      {/* 1. Cinematic Hero */}
      <HeroRadar />

      {/* 2. Interactive Feature Showcase Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Live Network Workspace
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Switch between browser-based speed testing, Sri Lanka live mapping, or companion device telemetry.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab("speedtest")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                activeTab === "speedtest"
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Speed Test
            </button>
            <button
              onClick={() => setActiveTab("map")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                activeTab === "map"
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Live Map
            </button>
            <button
              onClick={() => setActiveTab("companion")}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                activeTab === "companion"
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Companion Live
            </button>
          </div>
        </div>

        {/* Dynamic Display based on active tab */}
        {activeTab === "speedtest" && <SpeedTestGauge />}
        {activeTab === "map" && <SriLankaMap />}
        {activeTab === "companion" && <CompanionLiveDashboard />}
      </section>

      {/* 3. The Two Operating Modes: Web-Only vs Companion Live Mode */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase font-mono font-bold text-cyan-400 tracking-wider">
            Architecture Highlights
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-2">
            Two Operating Modes. Zero Deception.
          </h2>
          <p className="text-sm text-slate-400 mt-3">
            SignalFusion distinguishes between browser-observed application network metrics and native cellular radio telemetry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mode 1: Web-Only Mode */}
          <div className="rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#0B1222]/90 border border-slate-800 p-8 shadow-xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white">MODE 1: Web-Only Mode</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Run directly in any modern browser without installing software. Performs high-resolution application speed tests, round-trip latency probes, jitter estimation, network lab diagnostics, and coverage map exploration.
              </p>

              <div className="space-y-2 pt-2 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Real HTTP streaming throughput to Colombo test nodes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Honest browser capability detection (`navigator.connection`)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Never displays imaginary cellular dBm or fake SS-RSRP</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80">
              <Link
                href="/speedtest"
                className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 group"
              >
                <span>Launch Web Speed Test</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Mode 2: Companion Live Mode */}
          <div className="rounded-2xl bg-gradient-to-b from-[#0D1933]/90 to-[#070E1F]/90 border border-cyan-500/30 p-8 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white">MODE 2: Companion Live Mode</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Pair your Android smartphone or Windows PC via QR code. Your mobile phone acts as the physical hardware radio sensor, streaming live SS-RSRP, SS-RSRQ, SS-SINR, PCI, and Cell ID directly to your web browser dashboard over encrypted WebSockets.
              </p>

              <div className="space-y-2 pt-2 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Sub-second live cellular telemetry stream (1-2 updates/sec)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Live Signal Finder with orientation compass and gain tracking</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span>Authenticated remote optimization requests (`BOOST NOW`)</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 relative z-10">
              <Link
                href="/devices"
                className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 group"
              >
                <span>Pair a Companion Device Now</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Sri Lankan Operator Ecosystem Support */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-[#091021] border border-slate-800 p-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-xl font-bold text-white">
              Built Specifically for Sri Lanka&apos;s Mobile Infrastructure
            </h3>
            <p className="text-xs text-slate-400 mt-2">
              Continuous crowdsourced and telemetry benchmarks calibrated for Sri Lankan spectrums and MCC 413 operators.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
              <div className="text-xs font-bold text-red-500 uppercase tracking-wider">Dialog</div>
              <div className="text-sm font-semibold text-white mt-1">MCC 413 • MNC 02</div>
              <div className="text-[11px] text-slate-400 mt-2">5G Trial &amp; 4G LTE</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">SLT-Mobitel</div>
              <div className="text-sm font-semibold text-white mt-1">MCC 413 • MNC 01</div>
              <div className="text-[11px] text-slate-400 mt-2">5G Pre-commercial &amp; 4G LTE</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
              <div className="text-xs font-bold text-rose-400 uppercase tracking-wider">Airtel</div>
              <div className="text-sm font-semibold text-white mt-1">MCC 413 • MNC 05</div>
              <div className="text-[11px] text-slate-400 mt-2">4G LTE High-Density</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 text-center">
              <div className="text-xs font-bold text-amber-500 uppercase tracking-wider">Hutch</div>
              <div className="text-sm font-semibold text-white mt-1">MCC 413 • MNC 08</div>
              <div className="text-[11px] text-slate-400 mt-2">4G Broadband &amp; Rural</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
