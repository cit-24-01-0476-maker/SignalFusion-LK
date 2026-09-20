"use client";

import React, { useState } from "react";
import { BarChart3, MapPin, Activity, ShieldCheck, ArrowUpDown, Filter } from "lucide-react";

interface OperatorData {
  name: string;
  brandColor: string;
  tagline: string;
  coverageTech: string;
  medianDownload: number;
  medianUpload: number;
  medianPing: number;
  medianJitter: number;
  medianSignal: number;
  stabilityScore: number;
  sampleCount: number;
  freshness: string;
}

const COMPARISON_DATA: Record<string, OperatorData[]> = {
  "Malabe IT Hub (Colombo)": [
    {
      name: "Dialog",
      brandColor: "#ED1C24",
      tagline: "MCC 413 • MNC 02",
      coverageTech: "5G NSA / 4G+",
      medianDownload: 168.4,
      medianUpload: 34.2,
      medianPing: 19.2,
      medianJitter: 2.8,
      medianSignal: -83,
      stabilityScore: 94,
      sampleCount: 520,
      freshness: "42s ago",
    },
    {
      name: "SLT-Mobitel",
      brandColor: "#00875A",
      tagline: "MCC 413 • MNC 01",
      coverageTech: "4G+ Robust / 5G Pre-commercial",
      medianDownload: 58.1,
      medianUpload: 18.6,
      medianPing: 26.8,
      medianJitter: 4.1,
      medianSignal: -86,
      stabilityScore: 89,
      sampleCount: 390,
      freshness: "4m ago",
    },
    {
      name: "Airtel",
      brandColor: "#E51937",
      tagline: "MCC 413 • MNC 05",
      coverageTech: "4G LTE",
      medianDownload: 44.5,
      medianUpload: 12.4,
      medianPing: 32.1,
      medianJitter: 5.8,
      medianSignal: -91,
      stabilityScore: 82,
      sampleCount: 210,
      freshness: "18m ago",
    },
    {
      name: "Hutch",
      brandColor: "#FF6600",
      tagline: "MCC 413 • MNC 08",
      coverageTech: "4G LTE",
      medianDownload: 31.2,
      medianUpload: 9.8,
      medianPing: 37.5,
      medianJitter: 6.5,
      medianSignal: -95,
      stabilityScore: 78,
      sampleCount: 160,
      freshness: "45m ago",
    },
  ],
  "Colombo Fort": [
    {
      name: "Dialog",
      brandColor: "#ED1C24",
      tagline: "MCC 413 • MNC 02",
      coverageTech: "5G NSA / 4G+",
      medianDownload: 189.5,
      medianUpload: 38.4,
      medianPing: 18.2,
      medianJitter: 2.4,
      medianSignal: -81,
      stabilityScore: 96,
      sampleCount: 680,
      freshness: "2m ago",
    },
    {
      name: "SLT-Mobitel",
      brandColor: "#00875A",
      tagline: "MCC 413 • MNC 01",
      coverageTech: "5G Trial / 4G+",
      medianDownload: 92.4,
      medianUpload: 24.1,
      medianPing: 22.4,
      medianJitter: 3.5,
      medianSignal: -84,
      stabilityScore: 92,
      sampleCount: 440,
      freshness: "8m ago",
    },
    {
      name: "Airtel",
      brandColor: "#E51937",
      tagline: "MCC 413 • MNC 05",
      coverageTech: "4G LTE",
      medianDownload: 52.8,
      medianUpload: 14.9,
      medianPing: 29.8,
      medianJitter: 4.8,
      medianSignal: -89,
      stabilityScore: 84,
      sampleCount: 290,
      freshness: "22m ago",
    },
    {
      name: "Hutch",
      brandColor: "#FF6600",
      tagline: "MCC 413 • MNC 08",
      coverageTech: "4G LTE",
      medianDownload: 38.6,
      medianUpload: 11.2,
      medianPing: 35.1,
      medianJitter: 5.9,
      medianSignal: -92,
      stabilityScore: 80,
      sampleCount: 190,
      freshness: "1h ago",
    },
  ],
  "Kandy City Center": [
    {
      name: "Dialog",
      brandColor: "#ED1C24",
      tagline: "MCC 413 • MNC 02",
      coverageTech: "5G NSA / 4G+",
      medianDownload: 155.0,
      medianUpload: 31.0,
      medianPing: 21.4,
      medianJitter: 3.1,
      medianSignal: -84,
      stabilityScore: 91,
      sampleCount: 380,
      freshness: "10m ago",
    },
    {
      name: "SLT-Mobitel",
      brandColor: "#00875A",
      tagline: "MCC 413 • MNC 01",
      coverageTech: "4G+ Robust",
      medianDownload: 62.8,
      medianUpload: 18.2,
      medianPing: 27.5,
      medianJitter: 3.9,
      medianSignal: -88,
      stabilityScore: 89,
      sampleCount: 310,
      freshness: "12m ago",
    },
    {
      name: "Airtel",
      brandColor: "#E51937",
      tagline: "MCC 413 • MNC 05",
      coverageTech: "4G LTE",
      medianDownload: 39.4,
      medianUpload: 10.5,
      medianPing: 34.8,
      medianJitter: 6.2,
      medianSignal: -93,
      stabilityScore: 80,
      sampleCount: 150,
      freshness: "1h ago",
    },
    {
      name: "Hutch",
      brandColor: "#FF6600",
      tagline: "MCC 413 • MNC 08",
      coverageTech: "4G LTE",
      medianDownload: 28.5,
      medianUpload: 8.4,
      medianPing: 41.2,
      medianJitter: 7.1,
      medianSignal: -97,
      stabilityScore: 74,
      sampleCount: 110,
      freshness: "2h ago",
    },
  ],
};

export default function ComparePage() {
  const [selectedLocation, setSelectedLocation] = useState<string>("Malabe IT Hub (Colombo)");
  const [sortBy, setSortBy] = useState<"download" | "ping" | "stability" | "signal">("download");

  const locationData = COMPARISON_DATA[selectedLocation] || COMPARISON_DATA["Malabe IT Hub (Colombo)"];

  // Sort based on user selected metric without bias or arbitrary labels
  const sortedData = [...locationData].sort((a, b) => {
    if (sortBy === "download") return b.medianDownload - a.medianDownload;
    if (sortBy === "ping") return a.medianPing - b.medianPing;
    if (sortBy === "stability") return b.stabilityScore - a.stabilityScore;
    if (sortBy === "signal") return b.medianSignal - a.medianSignal;
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-cyan-400" />
            Network Comparison
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Parallel side-by-side crowdsourced and telemetry benchmarks for Sri Lankan operators. No fake ratings.
          </p>
        </div>

        {/* Location Selector */}
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-cyan-400" />
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="bg-slate-900 text-white text-xs font-semibold rounded-xl px-3 py-2 border border-slate-700 focus:outline-none focus:border-cyan-400"
          >
            {Object.keys(COMPARISON_DATA).map((loc) => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Sort By Controls */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-400 font-semibold uppercase">Sort By:</span>
          {(["download", "ping", "signal", "stability"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setSortBy(m)}
              className={`px-3 py-1 rounded-lg capitalize font-medium transition-colors cursor-pointer ${
                sortBy === m
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {m === "download" ? "Download Speed" : m === "ping" ? "Lowest Ping" : m === "signal" ? "Signal Strength" : "Stability Score"}
            </button>
          ))}
        </div>
        <div className="hidden sm:block text-slate-500 text-[11px]">
          Sorted by user-selected metric
        </div>
      </div>

      {/* Comparison Grid (Dialog, SLT-Mobitel, Airtel, Hutch) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sortedData.map((op) => (
          <div
            key={op.name}
            className="rounded-2xl bg-gradient-to-b from-[#0D1527] to-[#070B14] border border-slate-800 p-6 flex flex-col justify-between shadow-xl hover:border-cyan-500/30 transition-all"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div>
                  <h3 className="text-xl font-bold text-white">{op.name}</h3>
                  <span className="text-[10px] font-mono text-slate-500">{op.tagline}</span>
                </div>
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: op.brandColor }} />
              </div>

              <div className="text-xs text-slate-300 font-semibold flex items-center justify-between">
                <span>Technology:</span>
                <span className="text-cyan-400 font-mono">{op.coverageTech}</span>
              </div>

              {/* Metrics */}
              <div className="space-y-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-400">Median Download:</span>
                  <span className="font-bold font-mono text-emerald-400 text-sm">{op.medianDownload} Mbps</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-400">Median Upload:</span>
                  <span className="font-bold font-mono text-cyan-300">{op.medianUpload} Mbps</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-400">Median Latency:</span>
                  <span className="font-bold font-mono text-indigo-300">{op.medianPing} ms</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-400">Jitter:</span>
                  <span className="font-bold font-mono text-slate-300">{op.medianJitter} ms</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-400">Median Signal:</span>
                  <span className="font-bold font-mono text-cyan-400">{op.medianSignal} dBm</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-400">Stability Index:</span>
                  <span className="font-bold font-mono text-emerald-400">{op.stabilityScore}%</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
              <span>{op.sampleCount} Measurements</span>
              <span>Updated: {op.freshness}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Honest Comparison Principle Note */}
      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 leading-relaxed">
        <strong className="text-slate-200">Comparison Transparency:</strong> SignalFusion LK does not designate any operator as an absolute &quot;Winner&quot; or &quot;Best&quot;. Different operators excel depending on exact location, band deployment (e.g. 5G n78 vs 4G Band 3/8), and current tower capacity. Users can inspect verifiable measurements to make informed choices.
      </div>
    </div>
  );
}
