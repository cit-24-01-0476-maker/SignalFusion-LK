"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Activity, Radio, Smartphone, Monitor, ShieldCheck, Zap, BarChart3, Plus, ArrowUpRight, CheckCircle2, Clock } from "lucide-react";
import CompanionLiveDashboard from "../../components/CompanionLiveDashboard";

export default function DashboardPage() {
  const [deviceConnected, setDeviceConnected] = useState(true);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Greeting & Quick Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <span className="text-xs uppercase font-mono tracking-wider text-cyan-400 font-semibold">
            SignalFusion Cloud Sync
          </span>
          <h1 className="text-3xl font-black text-white mt-1">GOOD MORNING</h1>
          <p className="text-xs text-slate-400 mt-1">
            Connected across Web, Android, and Desktop. Real-time Sri Lanka network intelligence.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/speedtest"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 hover:bg-cyan-500/30 flex items-center gap-1.5 transition-all"
          >
            <Activity className="w-3.5 h-3.5" />
            <span>RUN TEST</span>
          </Link>
          <Link
            href="/map"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-slate-200 border border-slate-800 hover:text-white flex items-center gap-1.5 transition-all"
          >
            <Radio className="w-3.5 h-3.5 text-cyan-400" />
            <span>OPEN MAP</span>
          </Link>
          <Link
            href="/devices"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-slate-200 border border-slate-800 hover:text-white flex items-center gap-1.5 transition-all"
          >
            <Plus className="w-3.5 h-3.5 text-cyan-400" />
            <span>CONNECT DEVICE</span>
          </Link>
          <Link
            href="/compare"
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-slate-200 border border-slate-800 hover:text-white flex items-center gap-1.5 transition-all"
          >
            <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
            <span>COMPARE NETWORKS</span>
          </Link>
        </div>
      </div>

      {/* Flagship Companion Live Telemetry Block */}
      {deviceConnected && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE CONTROL CENTER (Connected Device)
            </h2>
            <button
              onClick={() => setDeviceConnected(false)}
              className="text-xs text-slate-500 hover:text-slate-300"
            >
              Hide Live View
            </button>
          </div>
          <CompanionLiveDashboard onDisconnect={() => setDeviceConnected(false)} />
        </div>
      )}

      {/* Overview Grid: Recent Test, Saved Places, Health Score */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Recent Test */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-cyan-400 flex items-center gap-1.5">
              <Activity className="w-4 h-4" /> Recent Speed Test
            </span>
            <span className="text-[10px] text-slate-500 font-mono">14m ago</span>
          </div>

          <div className="space-y-2">
            <div className="text-3xl font-black font-mono text-emerald-400">164.2 Mbps</div>
            <div className="text-xs text-slate-400 flex items-center gap-2">
              <span>Upload: 34.8 Mbps</span>
              <span>•</span>
              <span>Ping: 18.4 ms</span>
            </div>
            <div className="text-[11px] text-slate-500 pt-1">
              Source: Samsung Galaxy S26 • Dialog 5G
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800/80">
            <Link href="/history" className="text-xs font-bold text-cyan-400 hover:underline flex items-center gap-1">
              <span>View full test history</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Saved Locations */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-cyan-400 flex items-center gap-1.5">
              <Radio className="w-4 h-4" /> Saved Locations
            </span>
            <span className="text-[10px] text-slate-500">3 places</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-semibold text-white block">Home (Malabe)</span>
                <span className="text-[10px] text-slate-500">Dialog 5G • 168 Mbps</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono">Optimal</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-semibold text-white block">Office (Colombo Fort)</span>
                <span className="text-[10px] text-slate-500">SLT-Mobitel Fibre • 92 Mbps</span>
              </div>
              <span className="text-[10px] text-cyan-300 font-mono">Stable</span>
            </div>
          </div>

          <div className="pt-1">
            <Link href="/map" className="text-xs font-bold text-cyan-400 hover:underline flex items-center gap-1">
              <span>Explore live map</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Network Health & Recent Alerts */}
        <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-cyan-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" /> Network Health
            </span>
            <span className="text-[10px] text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30">
              88%
            </span>
          </div>

          <div className="space-y-2 text-xs text-slate-300">
            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>Zero call drops detected in last 24 hours on Dialog 5G.</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>Jitter variation to Colombo test nodes remained below 3ms.</span>
            </div>
          </div>

          <div className="pt-1">
            <Link href="/network-lab" className="text-xs font-bold text-cyan-400 hover:underline flex items-center gap-1">
              <span>Run diagnostics scan</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
