"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Square, RotateCcw, Server, Activity, ArrowDown, ArrowUp, AlertCircle, ShieldAlert, CheckCircle2 } from "lucide-react";
import { WebSpeedTestEngine, SpeedTestProgress, SpeedTestPreset, PRESET_CONFIGS } from "../lib/speedtest-engine";

export default function SpeedTestGauge() {
  const [preset, setPreset] = useState<SpeedTestPreset>("standard");
  const [progress, setProgress] = useState<SpeedTestProgress>({
    phase: "idle",
    serverName: "Colombo Node 1",
    pingMs: 0,
    jitterMs: 0,
    downloadMbps: 0,
    uploadMbps: 0,
    packetLossPct: 0,
    bytesTransferredMb: 0,
    progressPercent: 0,
  });

  const [connectionProfile, setConnectionProfile] = useState<string>("Detecting...");
  const engineRef = useRef<WebSpeedTestEngine | null>(null);

  useEffect(() => {
    // Capability check for navigator.connection
    if (typeof navigator !== "undefined" && "connection" in navigator) {
      const conn = (navigator as any).connection;
      const type = conn.effectiveType ? conn.effectiveType.toUpperCase() : "Browser Profile";
      const rtt = conn.rtt ? ` (~${conn.rtt}ms RTT)` : "";
      setConnectionProfile(`Browser Connection Profile: ${type}${rtt}`);
    } else {
      setConnectionProfile("Browser Connection Profile: Standard Web API");
    }

    engineRef.current = new WebSpeedTestEngine((p) => {
      setProgress(p);
    }, "http://localhost:8001");

    return () => {
      if (engineRef.current) {
        engineRef.current.abort();
      }
    };
  }, []);

  const handleStart = () => {
    if (engineRef.current) {
      engineRef.current.runTest(preset);
    }
  };

  const handleStop = () => {
    if (engineRef.current) {
      engineRef.current.abort();
    }
  };

  const isTesting = progress.phase !== "idle" && progress.phase !== "completed" && progress.phase !== "error";

  // Calculate gauge angle (from -90deg to 90deg, 0 to 300 Mbps)
  const displaySpeed = progress.phase === "upload" ? progress.uploadMbps : progress.downloadMbps;
  const clampedSpeed = Math.min(300, displaySpeed);
  const gaugePercent = clampedSpeed / 300;
  const strokeDashoffset = 314 - 314 * (gaugePercent * 0.75);

  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl bg-gradient-to-b from-[#0D1527] to-[#070B14] border border-cyan-500/20 p-6 md:p-8 shadow-2xl backdrop-blur-xl">
      {/* Top Header & Node info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-cyan-400" />
            SignalFusion Web Speed Test
          </h2>
          <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
            <span>{connectionProfile}</span>
            <span className="text-slate-600">•</span>
            <span className="text-cyan-400 font-mono">No Fake Numbers</span>
          </div>
        </div>

        {/* Server Node Selection */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs">
          <Server className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-slate-300 font-medium">Node:</span>
          <span className="text-white font-semibold">{progress.serverName}</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
        </div>
      </div>

      {/* Preset Selector with Data Usage Warning */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-400 font-medium mr-1">Test Mode:</span>
          {(["quick", "standard", "high_speed"] as SpeedTestPreset[]).map((mode) => (
            <button
              key={mode}
              onClick={() => !isTesting && setPreset(mode)}
              disabled={isTesting}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all cursor-pointer ${
                preset === mode
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm shadow-cyan-950"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              {mode.replace("_", " ")}
            </button>
          ))}
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>
            Estimated Data Use:{" "}
            <strong className="text-amber-300 font-semibold">
              ~{PRESET_CONFIGS[preset].targetDownloadMb + PRESET_CONFIGS[preset].targetUploadMb} MB
            </strong>
          </span>
        </div>
      </div>

      {/* Main Gauge & Speed Display */}
      <div className="my-8 flex flex-col items-center justify-center relative">
        {/* Speedometer Radial Graphic */}
        <div className="relative w-64 h-64 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 120 120">
            {/* Background Track */}
            <circle
              cx="60"
              cy="60"
              r="50"
              className="text-slate-800/60"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              strokeDasharray="314"
              strokeDashoffset="78"
            />
            {/* Active Progress Track */}
            <circle
              cx="60"
              cy="60"
              r="50"
              className="text-cyan-400 transition-all duration-300"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              strokeDasharray="314"
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>

          {/* Centered Digital Readout */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-xs uppercase font-mono tracking-wider text-slate-400 mb-1">
              {progress.phase === "upload" ? "Upload Stream" : "Download Stream"}
            </span>
            <div className="text-5xl font-black tracking-tight text-white font-mono">
              {displaySpeed.toFixed(1)}
            </div>
            <span className="text-sm font-bold text-cyan-400 tracking-wide mt-1">Mbps</span>

            {/* Test Phase Pill */}
            <span className="mt-3 text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-slate-900 border border-cyan-500/20 text-slate-300">
              {progress.phase === "idle" ? "Ready" : progress.phase.replace("_", " ")}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        {isTesting && (
          <div className="w-full max-w-md mt-4 bg-slate-900 rounded-full h-1.5 overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full transition-all duration-300"
              style={{ width: `${progress.progressPercent}%` }}
            />
          </div>
        )}
      </div>

      {/* Secondary Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        {/* Latency Card */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/90 text-center">
          <div className="text-[11px] text-slate-400 font-medium uppercase mb-1 flex items-center justify-center gap-1">
            <Activity className="w-3.5 h-3.5 text-blue-400" />
            Network Latency
          </div>
          <div className="text-2xl font-bold font-mono text-white">
            {progress.pingMs > 0 ? `${progress.pingMs} ms` : "—"}
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Application RTT</div>
        </div>

        {/* Jitter Card */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/90 text-center">
          <div className="text-[11px] text-slate-400 font-medium uppercase mb-1">Jitter</div>
          <div className="text-2xl font-bold font-mono text-indigo-300">
            {progress.jitterMs > 0 ? `${progress.jitterMs} ms` : "—"}
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Variation Delta</div>
        </div>

        {/* Download Mbps */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/90 text-center">
          <div className="text-[11px] text-slate-400 font-medium uppercase mb-1 flex items-center justify-center gap-1">
            <ArrowDown className="w-3.5 h-3.5 text-emerald-400" />
            Download
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400">
            {progress.downloadMbps > 0 ? `${progress.downloadMbps.toFixed(1)}` : "—"}
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Mbps</div>
        </div>

        {/* Upload Mbps */}
        <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/90 text-center">
          <div className="text-[11px] text-slate-400 font-medium uppercase mb-1 flex items-center justify-center gap-1">
            <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
            Upload
          </div>
          <div className="text-2xl font-bold font-mono text-cyan-400">
            {progress.uploadMbps > 0 ? `${progress.uploadMbps.toFixed(1)}` : "—"}
          </div>
          <div className="text-[10px] text-slate-500 mt-1">Mbps</div>
        </div>
      </div>

      {/* Bottom Action & Controls */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 border-t border-slate-800/80">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>High-resolution browser timing API • Anti-caching headers active</span>
        </div>

        <div className="flex items-center gap-3">
          {isTesting ? (
            <button
              onClick={handleStop}
              className="px-6 py-2.5 rounded-xl font-bold text-sm bg-rose-600 hover:bg-rose-500 text-white flex items-center gap-2 transition-all cursor-pointer"
            >
              <Square className="w-4 h-4" />
              <span>CANCEL TEST</span>
            </button>
          ) : (
            <button
              onClick={handleStart}
              className="px-8 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-cyan-400 hover:from-blue-500 hover:to-cyan-300 text-white shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>{progress.phase === "completed" ? "TEST AGAIN" : "START SPEED TEST"}</span>
            </button>
          )}
        </div>
      </div>

      {/* Honest Technical Transparency Alert */}
      <div className="mt-6 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 leading-relaxed flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-200">Honesty Guarantee:</strong> SignalFusion Web measures genuine application-layer HTTP streaming throughput and round-trip latency to our Colombo test edge node. Browser JavaScript cannot send raw ICMP pings or read cellular radio dBm values directly. Connect SignalFusion Mobile to capture native SS-RSRP and 5G NR carrier metrics.
        </div>
      </div>
    </div>
  );
}
