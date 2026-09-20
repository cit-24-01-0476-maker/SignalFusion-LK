"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Activity, Radio, Smartphone, Monitor, ShieldCheck, ArrowRight, Zap, Play, CheckCircle2 } from "lucide-react";

export default function HeroRadar() {
  const [selectedNode, setSelectedNode] = useState("Malabe");

  const nodes = [
    { name: "Colombo Fort", x: 110, y: 260, op: "Dialog 5G", ping: "17ms", speed: "192 Mbps" },
    { name: "Malabe", x: 130, y: 265, op: "Dialog 5G", ping: "19ms", speed: "187 Mbps" },
    { name: "Negombo", x: 105, y: 220, op: "SLT-Mobitel 4G", ping: "24ms", speed: "64 Mbps" },
    { name: "Kandy", x: 195, y: 230, op: "Dialog 5G", ping: "21ms", speed: "155 Mbps" },
    { name: "Kurunegala", x: 160, y: 200, op: "Airtel 4G", ping: "29ms", speed: "42 Mbps" },
    { name: "Galle Fort", x: 135, y: 360, op: "SLT-Mobitel 4G", ping: "26ms", speed: "58 Mbps" },
    { name: "Jaffna", x: 155, y: 60, op: "Dialog 4G+", ping: "38ms", speed: "48 Mbps" },
  ];

  return (
    <div className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-800/80 bg-gradient-to-b from-[#070B14] via-[#09101F] to-[#070B14]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00f2fe08_1px,transparent_1px),linear-gradient(to_bottom,#00f2fe08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Announcement Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 shadow-sm shadow-cyan-950">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-semibold">SignalFusion LK v1.4.0 Live</span>
            <span className="text-slate-500">|</span>
            <span>Sri Lanka 4G/5G Network Intelligence Ecosystem</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Confident Pitch & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              See Your Network <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
                Differently.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0 font-normal">
              Real 4G/5G intelligence, network testing and smarter connectivity for Sri Lanka.
              No fake signal boosters. No simulated metrics. Measure, analyze, detect, and optimize with genuine telemetry.
            </p>

            {/* Platform Selectors */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2">
              <span className="text-xs text-slate-400 font-medium mr-1">Platforms:</span>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900/90 border border-slate-700 text-xs text-slate-200">
                <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Android App</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900/90 border border-slate-700 text-xs text-slate-200">
                <Monitor className="w-3.5 h-3.5 text-cyan-400" />
                <span>Windows Desktop</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900/90 border border-slate-700 text-xs text-slate-200">
                <Activity className="w-3.5 h-3.5 text-blue-400" />
                <span>Web Platform (PWA)</span>
              </div>
            </div>

            {/* 3 Primary CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link
                href="/download"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-cyan-400 text-white shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 group"
              >
                <span>GET SIGNALFUSION</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                href="/speedtest"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-semibold bg-slate-900/90 hover:bg-slate-800 text-cyan-400 border border-cyan-500/30 hover:border-cyan-400/60 shadow-lg shadow-black/40 transition-all flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>RUN WEB SPEED TEST</span>
              </Link>

              <Link
                href="/map"
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl text-sm font-semibold text-slate-300 hover:text-white bg-slate-950/40 hover:bg-slate-900/60 border border-slate-800 transition-all flex items-center justify-center gap-2"
              >
                <Radio className="w-4 h-4 text-slate-400" />
                <span>EXPLORE LIVE MAP</span>
              </Link>
            </div>

            {/* Honest Guarantee Points */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-400 border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Zero Fake Signals</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Dialog • Mobitel • Airtel • Hutch</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Real Colombo Edge Nodes</span>
              </div>
            </div>
          </div>

          {/* Right Column: Sri Lanka Interactive Radar + Demo Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#0B132B]/90 border border-cyan-500/20 p-5 shadow-2xl backdrop-blur-xl">
              {/* Radar Header */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
                  </span>
                  <span className="text-xs font-semibold text-white tracking-wide uppercase">
                    Sri Lanka Live Signal Radar
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-400 border border-cyan-500/30">
                  Node: {selectedNode}
                </span>
              </div>

              {/* Sri Lanka Stylized Radar Map SVG */}
              <div className="relative w-full h-[280px] bg-[#050811] rounded-xl overflow-hidden border border-slate-800/80 flex items-center justify-center">
                {/* Radar Grid Circles */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-64 h-64 rounded-full border border-cyan-500/10"></div>
                  <div className="w-44 h-44 rounded-full border border-cyan-500/15"></div>
                  <div className="w-24 h-24 rounded-full border border-cyan-500/20"></div>
                </div>

                {/* Radar Sweep Line */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none animate-radar-sweep">
                  <div className="w-64 h-64 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,transparent_270deg,rgba(0,242,254,0.15)_360deg)]" />
                </div>

                {/* Stylized Sri Lanka Island Silhouette representation */}
                <svg className="absolute w-[240px] h-[260px] opacity-40 text-cyan-400/30" viewBox="0 0 300 420" fill="currentColor">
                  {/* Approximate Sri Lanka teardrop landmass */}
                  <path d="M 155,30 C 185,50 210,120 220,180 C 230,240 210,320 180,380 C 160,405 130,405 120,380 C 90,320 75,250 85,180 C 95,110 125,50 155,30 Z" />
                </svg>

                {/* Signal Nodes */}
                {nodes.map((node) => {
                  const isSelected = selectedNode === node.name;
                  return (
                    <button
                      key={node.name}
                      onClick={() => setSelectedNode(node.name)}
                      style={{ left: `${(node.x / 300) * 100}%`, top: `${(node.y / 420) * 100}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none"
                    >
                      <div className="relative flex items-center justify-center">
                        <div className={`w-3 h-3 rounded-full ${isSelected ? "bg-cyan-400 ring-4 ring-cyan-500/30" : "bg-blue-500/80 hover:bg-cyan-300"} transition-all`} />
                        <span className={`absolute -bottom-4 whitespace-nowrap text-[9px] font-mono px-1 rounded transition-all ${
                          isSelected ? "bg-cyan-900/90 text-cyan-200 border border-cyan-400" : "text-slate-400 bg-slate-900/60"
                        }`}>
                          {node.name}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Homepage Product Demo Card (Specified in Prompt) */}
              <div className="mt-4 p-3.5 rounded-xl bg-slate-950/80 border border-cyan-500/25 relative overflow-hidden">
                <div className="flex items-center justify-between text-xs mb-2">
                  <div className="flex items-center gap-1.5 font-bold text-white tracking-wider">
                    <Activity className="w-3.5 h-3.5 text-cyan-400" />
                    <span>CURRENT NETWORK</span>
                  </div>
                  {/* Explicit Demo Label */}
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    Demo
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                  <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase">Operator</div>
                    <div className="font-bold text-white text-sm">Dialog 5G</div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase">Signal</div>
                    <div className="font-bold text-cyan-400 text-sm">-84 dBm</div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase">Download</div>
                    <div className="font-bold text-emerald-400 text-sm">187 Mbps</div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900/80 border border-slate-800">
                    <div className="text-[10px] text-slate-400 uppercase">Ping</div>
                    <div className="font-bold text-indigo-300 text-sm">19 ms</div>
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Network Health: <strong className="text-emerald-400 font-semibold">87% (Optimal)</strong></span>
                  <span className="text-[10px] text-slate-500">Demo Preview • Galaxy S26</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
