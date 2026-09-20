"use client";

import React, { useState } from "react";
import { Smartphone, Monitor, QrCode, Trash2, Edit2, ShieldAlert, CheckCircle2, Plus, RefreshCw } from "lucide-react";
import DevicePairingModal from "../../components/DevicePairingModal";

interface PairedDevice {
  id: string;
  name: string;
  platform: "android" | "windows";
  status: "connected" | "offline" | "revoked";
  operator: string;
  network: string;
  signalDbm?: number;
  lastSeen: string;
}

export default function DevicesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [devices, setDevices] = useState<PairedDevice[]>([
    {
      id: "dev-s26",
      name: "Samsung Galaxy S26 Ultra",
      platform: "android",
      status: "connected",
      operator: "Dialog",
      network: "5G NR",
      signalDbm: -83,
      lastSeen: "Streaming Live",
    },
    {
      id: "dev-thinkpad",
      name: "ThinkPad P16 Workstation",
      platform: "windows",
      status: "connected",
      operator: "SLT Fibre",
      network: "Ethernet / Wi-Fi",
      lastSeen: "4 minutes ago",
    },
    {
      id: "dev-pixel",
      name: "Pixel 7a (Backup SIM)",
      platform: "android",
      status: "offline",
      operator: "SLT-Mobitel",
      network: "4G LTE",
      lastSeen: "2 days ago",
    },
  ]);

  const handleRevoke = (id: string) => {
    if (confirm("Are you sure you want to revoke and disconnect this device?")) {
      setDevices(devices.filter((d) => d.id !== id));
    }
  };

  const handleRename = (id: string) => {
    const newName = prompt("Enter new device name:");
    if (newName) {
      setDevices(devices.map((d) => (d.id === id ? { ...d, name: newName } : d)));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-2">
            <Smartphone className="w-6 h-6 text-cyan-400" />
            Connected Devices &amp; Pairing
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage your hardware sensor devices streaming cellular and desktop network telemetry.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg shadow-cyan-500/20 flex items-center gap-2 transition-all cursor-pointer"
        >
          <QrCode className="w-4 h-4" />
          <span>PAIR NEW DEVICE</span>
        </button>
      </div>

      {/* Device List */}
      <div className="space-y-4">
        {devices.map((dev) => (
          <div
            key={dev.id}
            className="p-5 rounded-2xl bg-gradient-to-b from-slate-900/80 to-[#0B1327]/80 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-cyan-500/30 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-cyan-400 border border-slate-700">
                {dev.platform === "android" ? <Smartphone className="w-6 h-6" /> : <Monitor className="w-6 h-6" />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">{dev.name}</h3>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                      dev.status === "connected"
                        ? "bg-emerald-950/60 text-emerald-400 border-emerald-500/30"
                        : "bg-slate-800 text-slate-400 border-slate-700"
                    }`}
                  >
                    {dev.status === "connected" ? "Connected" : "Offline"}
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                  <span>{dev.operator}</span>
                  <span>•</span>
                  <span className="text-cyan-400 font-mono">{dev.network}</span>
                  {dev.signalDbm && (
                    <>
                      <span>•</span>
                      <span className="font-mono">{dev.signalDbm} dBm</span>
                    </>
                  )}
                  <span>•</span>
                  <span>Last Seen: {dev.lastSeen}</span>
                </div>
              </div>
            </div>

            {/* Actions: Rename, Revoke */}
            <div className="flex items-center gap-2 self-end md:self-center">
              <button
                onClick={() => handleRename(dev.id)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Rename</span>
              </button>

              <button
                onClick={() => handleRevoke(dev.id)}
                className="px-3 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 hover:text-white border border-rose-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Revoke</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pairing Security Guarantee Box */}
      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-400 leading-relaxed flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-200">Pairing Security Architecture:</strong> Device pairing utilizes single-use ephemeral tokens, end-to-end TLS encryption, and device-specific cryptographic signatures. Devices can be revoked instantly. Sensitive remote actions require local device confirmation. No hidden remote controls are ever executed.
        </div>
      </div>

      <DevicePairingModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSimulatePairSuccess={() => {
          setDevices([
            ...devices,
            {
              id: `dev-${Date.now()}`,
              name: "New Paired Android Sensor",
              platform: "android",
              status: "connected",
              operator: "Dialog",
              network: "5G NR",
              signalDbm: -84,
              lastSeen: "Just Now",
            },
          ]);
        }}
      />
    </div>
  );
}
