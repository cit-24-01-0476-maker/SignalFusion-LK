"use client";

import React, { useState } from "react";
import { X, QrCode, Smartphone, Monitor, ShieldCheck, Check, Copy, RefreshCw } from "lucide-react";

interface DevicePairingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSimulatePairSuccess?: () => void;
}

export default function DevicePairingModal({
  isOpen,
  onClose,
  onSimulatePairSuccess
}: DevicePairingModalProps) {
  const [pairingCode] = useState("491 823");
  const [copied, setCopied] = useState(false);
  const [pairingStatus, setPairingStatus] = useState<"ready" | "connecting" | "paired">("ready");

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText("491823");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulate = () => {
    setPairingStatus("connecting");
    setTimeout(() => {
      setPairingStatus("paired");
      if (onSimulatePairSuccess) onSimulatePairSuccess();
      setTimeout(() => {
        onClose();
      }, 1200);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="relative w-full max-w-lg rounded-2xl bg-gradient-to-b from-[#0D1527] to-[#070B14] border border-cyan-500/30 p-6 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center pb-4 border-b border-slate-800">
          <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <QrCode className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">Connect Device to Web Companion</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Transform your Android or Windows device into a live hardware telemetry sensor for this dashboard.
          </p>
        </div>

        {/* QR Code + Pairing Code Box */}
        <div className="my-6 flex flex-col items-center justify-center">
          {/* Stylized QR Code Frame */}
          <div className="p-3 bg-white rounded-xl shadow-lg relative group">
            {/* SVG stylized QR code representation */}
            <svg className="w-40 h-40" viewBox="0 0 100 100" fill="currentColor">
              {/* Position markers */}
              <rect x="5" y="5" width="28" height="28" rx="4" fill="#070B14" />
              <rect x="9" y="9" width="20" height="20" rx="2" fill="#FFFFFF" />
              <rect x="13" y="13" width="12" height="12" rx="1" fill="#070B14" />

              <rect x="67" y="5" width="28" height="28" rx="4" fill="#070B14" />
              <rect x="71" y="9" width="20" height="20" rx="2" fill="#FFFFFF" />
              <rect x="75" y="13" width="12" height="12" rx="1" fill="#070B14" />

              <rect x="5" y="67" width="28" height="28" rx="4" fill="#070B14" />
              <rect x="9" y="71" width="20" height="20" rx="2" fill="#FFFFFF" />
              <rect x="13" y="75" width="12" height="12" rx="1" fill="#070B14" />

              {/* Data dots pattern */}
              <rect x="38" y="10" width="8" height="8" fill="#070B14" />
              <rect x="50" y="10" width="8" height="8" fill="#070B14" />
              <rect x="38" y="24" width="8" height="8" fill="#070B14" />
              <rect x="50" y="24" width="8" height="8" fill="#070B14" />
              <rect x="10" y="38" width="8" height="8" fill="#070B14" />
              <rect x="24" y="38" width="8" height="8" fill="#070B14" />
              <rect x="38" y="38" width="24" height="24" rx="2" fill="#00F2FE" />
              <rect x="67" y="38" width="8" height="8" fill="#070B14" />
              <rect x="80" y="38" width="8" height="8" fill="#070B14" />
              <rect x="38" y="67" width="8" height="8" fill="#070B14" />
              <rect x="50" y="67" width="8" height="8" fill="#070B14" />
              <rect x="38" y="80" width="8" height="8" fill="#070B14" />
              <rect x="67" y="67" width="24" height="8" fill="#070B14" />
              <rect x="75" y="80" width="16" height="12" fill="#070B14" />
            </svg>
          </div>

          {/* Manual Numeric Code */}
          <div className="mt-4 text-center">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-mono">
              Or enter 6-digit pairing code
            </div>
            <div className="flex items-center justify-center gap-2 mt-1">
              <span className="font-mono text-2xl font-black text-cyan-400 tracking-widest bg-slate-900 px-4 py-1 rounded-lg border border-cyan-500/30">
                {pairingCode}
              </span>
              <button
                onClick={handleCopy}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                title="Copy code"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Pairing Instructions */}
        <div className="space-y-2 text-xs text-slate-400 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
          <div className="flex items-start gap-2">
            <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</span>
            <span>Open <strong>SignalFusion Mobile</strong> on Android or <strong>SignalFusion Desktop</strong> on Windows.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</span>
            <span>Tap <strong>Web Companion</strong> &gt; <strong>Scan QR Code</strong> or type the code.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="w-4 h-4 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">3</span>
            <span>Your device will begin streaming real-time cellular SS-RSRP and radio telemetry.</span>
          </div>
        </div>

        {/* Simulation / Quick Test button */}
        <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>End-to-End TLS Encrypted Pairing</span>
          </div>

          <button
            onClick={handleSimulate}
            disabled={pairingStatus !== "ready"}
            className="px-4 py-2 text-xs font-bold rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 flex items-center gap-2 transition-all cursor-pointer"
          >
            {pairingStatus === "connecting" && <RefreshCw className="w-3.5 h-3.5 animate-spin" />}
            {pairingStatus === "paired" && <Check className="w-3.5 h-3.5 text-emerald-400" />}
            <span>
              {pairingStatus === "ready" && "Simulate Companion Device"}
              {pairingStatus === "connecting" && "Pairing..."}
              {pairingStatus === "paired" && "Device Paired!"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
