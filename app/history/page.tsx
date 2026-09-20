"use client";

import React, { useState } from "react";
import { Clock, Smartphone, Monitor, Globe, ArrowDown, ArrowUp, Activity, Filter } from "lucide-react";

interface TestHistoryItem {
  id: string;
  timestamp: string;
  serverName: string;
  downloadMbps: number;
  uploadMbps: number;
  latencyMs: number;
  jitterMs: number;
  packetLoss: number;
  clientType: "web" | "android" | "desktop";
  operator: string;
  networkType: string;
}

const SAMPLE_HISTORY: TestHistoryItem[] = [
  {
    id: "hist-01",
    timestamp: "14 minutes ago",
    serverName: "Colombo Node 1",
    downloadMbps: 164.2,
    uploadMbps: 34.8,
    latencyMs: 18.4,
    jitterMs: 2.8,
    packetLoss: 0.0,
    clientType: "android",
    operator: "Dialog",
    networkType: "5G NR",
  },
  {
    id: "hist-02",
    timestamp: "3 hours ago",
    serverName: "Colombo Node 1",
    downloadMbps: 54.1,
    uploadMbps: 18.2,
    latencyMs: 29.1,
    jitterMs: 5.4,
    packetLoss: 0.2,
    clientType: "web",
    operator: "SLT-Mobitel",
    networkType: "4G LTE",
  },
  {
    id: "hist-03",
    timestamp: "Yesterday, 18:45",
    serverName: "Colombo Node 2",
    downloadMbps: 98.4,
    uploadMbps: 42.1,
    latencyMs: 12.8,
    jitterMs: 1.9,
    packetLoss: 0.0,
    clientType: "desktop",
    operator: "SLT Fibre",
    networkType: "Ethernet",
  },
  {
    id: "hist-04",
    timestamp: "Sep 18, 2026",
    serverName: "Colombo Node 1",
    downloadMbps: 41.5,
    uploadMbps: 11.2,
    latencyMs: 34.0,
    jitterMs: 6.1,
    packetLoss: 0.5,
    clientType: "android",
    operator: "Airtel",
    networkType: "4G LTE",
  },
];

export default function HistoryPage() {
  const [filterType, setFilterType] = useState<string>("all");

  const filteredHistory = SAMPLE_HISTORY.filter((item) => {
    if (filterType === "all") return true;
    return item.clientType === filterType;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-2">
            <Clock className="w-6 h-6 text-cyan-400" />
            Synchronized Measurement History
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            One account across Web, Android, and Windows. Tests appear seconds after completion.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          {["all", "web", "android", "desktop"].map((f) => (
            <button
              key={f}
              onClick={() => setFilterType(f)}
              className={`px-3 py-1.5 rounded-lg capitalize font-semibold transition-all cursor-pointer ${
                filterType === f
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* History Table */}
      <div className="rounded-2xl bg-slate-900/60 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 uppercase font-mono text-[10px] text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4">Platform &amp; Operator</th>
                <th className="px-6 py-4">Download</th>
                <th className="px-6 py-4">Upload</th>
                <th className="px-6 py-4">Latency</th>
                <th className="px-6 py-4">Jitter</th>
                <th className="px-6 py-4">Server Node</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredHistory.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-mono text-slate-400">{item.timestamp}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {item.clientType === "android" && <Smartphone className="w-4 h-4 text-emerald-400" />}
                      {item.clientType === "desktop" && <Monitor className="w-4 h-4 text-cyan-400" />}
                      {item.clientType === "web" && <Globe className="w-4 h-4 text-blue-400" />}
                      <div>
                        <span className="font-semibold text-white block">{item.operator}</span>
                        <span className="text-[10px] text-slate-500 font-mono">{item.networkType}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-emerald-400 font-bold text-sm">
                    {item.downloadMbps.toFixed(1)} Mbps
                  </td>
                  <td className="px-6 py-4 font-mono text-cyan-300">
                    {item.uploadMbps.toFixed(1)} Mbps
                  </td>
                  <td className="px-6 py-4 font-mono text-indigo-300">
                    {item.latencyMs.toFixed(1)} ms
                  </td>
                  <td className="px-6 py-4 font-mono text-slate-400">
                    {item.jitterMs.toFixed(1)} ms
                  </td>
                  <td className="px-6 py-4 text-slate-400">
                    {item.serverName}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
