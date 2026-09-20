"use client";

import React, { useState } from "react";
import { ShieldCheck, Server, Settings, Sliders, Activity, AlertTriangle, CheckCircle2, RefreshCw, Send } from "lucide-react";

export default function AdminConsolePage() {
  const [activeTab, setActiveTab] = useState<"overview" | "nodes" | "config" | "fraud" | "releases">("overview");

  const [remoteConfig, setRemoteConfig] = useState({
    version: "1.4.0",
    enable5GSurvey: true,
    enableHighSpeedTest: true,
    enableWebRtcPacketLoss: true,
    quickDownloadMb: 20,
    standardDownloadMb: 60,
    highSpeedDownloadMb: 180,
    excellentDbm: -80,
    goodDbm: -95,
    fairDbm: -108,
  });

  const [savedMessage, setSavedMessage] = useState(false);

  const handleSaveConfig = () => {
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <span className="text-xs uppercase font-mono font-bold text-amber-400 tracking-wider">
            admin.signalfusion.lk
          </span>
          <h1 className="text-3xl font-black text-white mt-1">Unified Admin Console</h1>
          <p className="text-xs text-slate-400 mt-1">
            Ecosystem operations, speed nodes monitor, remote config distribution, and fraud detection.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs">
          {(["overview", "nodes", "config", "fraud", "releases"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg capitalize font-semibold transition-all cursor-pointer ${
                activeTab === tab
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab === "config" ? "Remote Config" : tab === "nodes" ? "Speed Nodes" : tab}
            </button>
          ))}
        </div>
      </div>

      {/* 1. Overview */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <span className="text-xs text-slate-400 uppercase font-mono">Live Ingestion</span>
              <div className="text-2xl font-black font-mono text-cyan-400 mt-1">42 / sec</div>
              <span className="text-[10px] text-slate-500">Android &amp; Web Sensors</span>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <span className="text-xs text-slate-400 uppercase font-mono">Paired Devices</span>
              <div className="text-2xl font-black font-mono text-emerald-400 mt-1">1,420</div>
              <span className="text-[10px] text-slate-500">Active WebSocket links</span>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <span className="text-xs text-slate-400 uppercase font-mono">24h Speed Tests</span>
              <div className="text-2xl font-black font-mono text-white mt-1">18,940</div>
              <span className="text-[10px] text-slate-500">Colombo Nodes</span>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <span className="text-xs text-slate-400 uppercase font-mono">Fraud Flag Rate</span>
              <div className="text-2xl font-black font-mono text-amber-400 mt-1">0.14%</div>
              <span className="text-[10px] text-slate-500">Outlier filtered</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. Speed Nodes Monitor */}
      {activeTab === "nodes" && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase text-white tracking-wider">Colombo Edge Nodes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-base">Colombo Node 1 (Tier-3 Datacenter)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                  HEALTHY
                </span>
              </div>
              <div className="text-xs text-slate-400 space-y-1 font-mono">
                <div>Host: localhost:8001 (10 Gbps Tier-1 Port)</div>
                <div>Domestic Latency: 14 ms</div>
                <div>Peering: Dialog, SLT-Mobitel, Airtel, Hutch, LankaX</div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-base">Colombo Node 2 (Backup Edge)</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                  HEALTHY
                </span>
              </div>
              <div className="text-xs text-slate-400 space-y-1 font-mono">
                <div>Host: localhost:8002 (Failover Port)</div>
                <div>Domestic Latency: 17 ms</div>
                <div>Peering: SLT IPTransit, Dialog Direct</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Remote Config Editor */}
      {activeTab === "config" && (
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-6 text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white">Unified Remote Configuration</h3>
              <p className="text-slate-400 mt-0.5">Propagates live to Web, Android, and Desktop without reinstalling.</p>
            </div>
            <button
              onClick={handleSaveConfig}
              className="px-4 py-2 rounded-xl font-bold bg-gradient-to-r from-amber-600 to-amber-500 text-white flex items-center gap-1.5 cursor-pointer shadow-lg shadow-amber-500/20"
            >
              <Send className="w-3.5 h-3.5" />
              <span>PUBLISH CONFIG</span>
            </button>
          </div>

          {savedMessage && (
            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Remote Config published successfully. Propagated to all connected devices over WebSockets.</span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-bold text-slate-200 uppercase">Speed Test Sizes (MB)</h4>
              <div>
                <label className="text-slate-400 block mb-1">Quick Test Target (MB):</label>
                <input
                  type="number"
                  value={remoteConfig.quickDownloadMb}
                  onChange={(e) => setRemoteConfig({ ...remoteConfig, quickDownloadMb: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Standard Test Target (MB):</label>
                <input
                  type="number"
                  value={remoteConfig.standardDownloadMb}
                  onChange={(e) => setRemoteConfig({ ...remoteConfig, standardDownloadMb: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                />
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-slate-200 uppercase">Signal Thresholds (dBm)</h4>
              <div>
                <label className="text-slate-400 block mb-1">Excellent Threshold (dBm):</label>
                <input
                  type="number"
                  value={remoteConfig.excellentDbm}
                  onChange={(e) => setRemoteConfig({ ...remoteConfig, excellentDbm: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Good Threshold (dBm):</label>
                <input
                  type="number"
                  value={remoteConfig.goodDbm}
                  onChange={(e) => setRemoteConfig({ ...remoteConfig, goodDbm: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Fraud Detection Audit Log */}
      {activeTab === "fraud" && (
        <div className="space-y-4">
          <h3 className="text-sm font-bold uppercase text-white tracking-wider">Anti-Fake &amp; Outlier Audit Log</h3>
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-5 space-y-3 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-rose-400 block">Blocked Out-of-Bounds Submission</span>
                <span className="text-[11px] text-slate-500">Lat: 13.08, Lon: 80.27 (Outside Sri Lankan territorial bounding box)</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">4m ago</span>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-amber-400 block">Flagged Speed Outlier</span>
                <span className="text-[11px] text-slate-500">Reported: 940 Mbps on 4G LTE. Flagged for secondary confirmation before map ingestion.</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">18m ago</span>
            </div>
          </div>
        </div>
      )}

      {/* 5. Unified Release Center */}
      {activeTab === "releases" && (
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white">Unified Release Management</h3>
              <p className="text-slate-400">Deploy coordinated updates across Web, Android APK, and Windows MSI.</p>
            </div>
            <button className="px-4 py-2 rounded-xl font-bold bg-cyan-600 hover:bg-cyan-500 text-white cursor-pointer">
              TRIGGER DEPLOYMENT
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-400 font-mono block">WEB CLIENT</span>
              <span className="text-emerald-400 font-bold block mt-1">v1.4.0 (Live)</span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-400 font-mono block">ANDROID APK</span>
              <span className="text-emerald-400 font-bold block mt-1">v1.4.0 (Ready)</span>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-400 font-mono block">WINDOWS TAURI</span>
              <span className="text-emerald-400 font-bold block mt-1">v1.4.0 (Signed)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
