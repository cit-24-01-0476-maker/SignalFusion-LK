import React, { useState, useEffect } from "react";
import { Monitor, Activity, Wifi, ShieldCheck, Zap, Server, QrCode, HardDrive, RefreshCw, Radio, CheckCircle2, AlertTriangle, ArrowDown, ArrowUp } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<"monitor" | "speedtest" | "diagnostics" | "companion" | "updates">("monitor");
  const [latencyHistory, setLatencyHistory] = useState<number[]>([14, 15, 14, 16, 15, 14, 17, 14, 15, 14, 16, 14]);
  const [currentPing, setCurrentPing] = useState(14.8);
  const [jitter, setJitter] = useState(1.8);
  const [packetLoss, setPacketLoss] = useState(0.0);
  const [gamingMode, setGamingMode] = useState(false);
  const [callMode, setCallMode] = useState(true);
  const [pairedWithWeb, setPairedWithWeb] = useState(true);
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const sample = 13 + Math.random() * 4;
      setCurrentPing(Math.round(sample * 10) / 10);
      setLatencyHistory((prev) => [...prev.slice(1), Math.round(sample)]);
    }, 1500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ background: "#070B14", color: "#F8FAFC", minHeight: "100vh", padding: "24px", fontFamily: "system-ui" }}>
      {/* Top Header Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1E293B", paddingBottom: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "36px", height: "36px", background: "linear-gradient(135deg, #2563EB, #00F2FE)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Monitor size={20} color="#FFFFFF" />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: "18px", fontWeight: "bold" }}>SignalFusion Desktop (Windows)</h1>
            <span style={{ fontSize: "11px", color: "#94A3B8" }}>Continuous Ping &amp; Network Health Monitor • v1.4.0</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: "flex", gap: "6px", background: "#0D1527", padding: "4px", borderRadius: "10px", border: "1px solid #1E293B" }}>
          {(["monitor", "speedtest", "diagnostics", "companion", "updates"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: activeTab === tab ? "rgba(0, 242, 254, 0.15)" : "transparent",
                color: activeTab === tab ? "#00F2FE" : "#94A3B8",
                border: activeTab === tab ? "1px solid rgba(0, 242, 254, 0.3)" : "none",
                padding: "6px 12px",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: "bold",
                textTransform: "capitalize",
                cursor: "pointer",
              }}
            >
              {tab === "monitor" ? "Live Monitor" : tab === "speedtest" ? "Speed Test" : tab}
            </button>
          ))}
        </div>
      </div>

      {/* 1. Live Continuous Network Monitor */}
      {activeTab === "monitor" && (
        <div style={{ marginTop: "20px" }}>
          {/* Main Latency Card */}
          <div style={{ background: "#0D1527", border: "1px solid rgba(0, 242, 254, 0.2)", borderRadius: "16px", padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "12px", fontWeight: "bold", textTransform: "uppercase", color: "#00F2FE", letterSpacing: "1px" }}>
                Continuous Colombo Edge Latency
              </span>
              <span style={{ fontSize: "11px", color: "#94A3B8" }}>Gateway: 192.168.1.1 (SLT Fibre)</span>
            </div>

            <div style={{ display: "flex", alignItems: "baseline", gap: "16px", marginTop: "12px" }}>
              <div style={{ fontSize: "48px", fontWeight: "900", fontFamily: "monospace", color: "#FFFFFF" }}>
                {currentPing} ms
              </div>
              <div style={{ fontSize: "14px", color: "#94A3B8" }}>
                Jitter: <strong style={{ color: "#00F2FE" }}>{jitter} ms</strong>
              </div>
              <div style={{ fontSize: "14px", color: "#94A3B8" }}>
                Loss: <strong style={{ color: "#10B981" }}>{packetLoss}%</strong>
              </div>
            </div>

            {/* Live Sparkline Graph */}
            <div style={{ display: "flex", alignItems: "flex-end", height: "70px", gap: "6px", marginTop: "16px", background: "#070B14", padding: "8px", borderRadius: "8px" }}>
              {latencyHistory.map((val, idx) => (
                <div
                  key={idx}
                  style={{
                    flex: 1,
                    height: `${Math.min(100, (val / 30) * 100)}%`,
                    background: "linear-gradient(to top, #2563EB, #00F2FE)",
                    borderRadius: "4px 4px 0 0",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Adapter Health & Stability Modes */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "16px" }}>
            <div style={{ background: "#0D1527", padding: "16px", borderRadius: "12px", border: "1px solid #1E293B" }}>
              <span style={{ fontSize: "11px", color: "#94A3B8", textTransform: "uppercase" }}>Hardware Adapter</span>
              <div style={{ fontSize: "14px", fontWeight: "bold", color: "#FFFFFF", marginTop: "4px" }}>
                Intel Wi-Fi 6E AX211 (160MHz)
              </div>
              <span style={{ fontSize: "11px", color: "#10B981", marginTop: "2px", display: "block" }}>Link Speed: 1201 Mbps (Optimal)</span>
            </div>

            <div style={{ background: "#0D1527", padding: "16px", borderRadius: "12px", border: "1px solid #1E293B" }}>
              <span style={{ fontSize: "11px", color: "#94A3B8", textTransform: "uppercase" }}>Network Health</span>
              <div style={{ fontSize: "14px", fontWeight: "bold", color: "#10B981", marginTop: "4px" }}>
                Score: 96% (Grade A Bufferbloat)
              </div>
              <span style={{ fontSize: "11px", color: "#94A3B8", marginTop: "2px", display: "block" }}>Zero route congestion to Colombo</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. Desktop Speed Test */}
      {activeTab === "speedtest" && (
        <div style={{ marginTop: "20px", background: "#0D1527", borderRadius: "16px", padding: "24px", border: "1px solid #1E293B" }}>
          <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "bold" }}>Desktop High-Throughput Speed Test</h3>
          <p style={{ fontSize: "12px", color: "#94A3B8", marginTop: "4px" }}>Multi-stream native HTTP throughput directly to Colombo Node 1.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginTop: "16px" }}>
            <div style={{ background: "#070B14", padding: "16px", borderRadius: "10px", textAlign: "center" }}>
              <span style={{ fontSize: "11px", color: "#94A3B8" }}>DOWNLOAD THROUGHPUT</span>
              <div style={{ fontSize: "32px", fontWeight: "900", color: "#10B981", marginTop: "4px" }}>98.4 Mbps</div>
            </div>
            <div style={{ background: "#070B14", padding: "16px", borderRadius: "10px", textAlign: "center" }}>
              <span style={{ fontSize: "11px", color: "#94A3B8" }}>UPLOAD THROUGHPUT</span>
              <div style={{ fontSize: "32px", fontWeight: "900", color: "#00F2FE", marginTop: "4px" }}>42.1 Mbps</div>
            </div>
          </div>
        </div>
      )}

      {/* 3. Hardware Diagnostics */}
      {activeTab === "diagnostics" && (
        <div style={{ marginTop: "20px", background: "#0D1527", borderRadius: "16px", padding: "24px", border: "1px solid #1E293B" }}>
          <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "bold" }}>Windows Adapter &amp; Route Diagnostics</h3>
          <div style={{ fontSize: "12px", marginTop: "12px", color: "#CBD5E1", lineHeight: "1.8" }}>
            <div>• Adapter Status: Intel Wi-Fi 6E (Driver v23.40.0.4) - UP</div>
            <div>• Default Gateway: 192.168.1.1 (0.8ms local ping)</div>
            <div>• Local DNS Resolver: 192.168.1.1 (Upstream: SLT Telecom / 1.1.1.1)</div>
            <div>• MTU Size: 1500 bytes (No packet fragmentation detected)</div>
          </div>
        </div>
      )}

      {/* 4. Web Companion Status */}
      {activeTab === "companion" && (
        <div style={{ marginTop: "20px", background: "#0D1527", borderRadius: "16px", padding: "24px", border: "1px solid #1E293B" }}>
          <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "bold" }}>Web Companion Live Sync</h3>
          <p style={{ fontSize: "12px", color: "#94A3B8", marginTop: "4px" }}>Streaming continuous desktop latency and adapter health to your SignalFusion Web account.</p>
          <div style={{ marginTop: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#10B981" }} />
            <span style={{ fontSize: "13px", fontWeight: "bold" }}>Connected to Web Control Center (wss://api.signalfusion.lk/v1/realtime/device)</span>
          </div>
        </div>
      )}

      {/* 5. Automatic Updates */}
      {activeTab === "updates" && (
        <div style={{ marginTop: "20px", background: "#0D1527", borderRadius: "16px", padding: "24px", border: "1px solid #1E293B" }}>
          <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "bold" }}>Tauri Signed Cryptographic Auto-Updater</h3>
          <div style={{ fontSize: "12px", color: "#CBD5E1", marginTop: "10px" }}>
            <div>Current Version: <strong>1.4.0</strong> (Latest Stable)</div>
            <div>Update Channel: <strong>Production</strong></div>
            <div>Signature Validation: <strong>Verified (SHA-256)</strong></div>
          </div>
          <div style={{ marginTop: "16px" }}>
            <span style={{ fontSize: "12px", color: "#10B981" }}>✓ You are using the latest version of SignalFusion Desktop.</span>
          </div>
        </div>
      )}
    </div>
  );
}
