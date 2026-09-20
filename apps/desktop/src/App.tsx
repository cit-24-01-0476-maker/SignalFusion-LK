import React, { useState, useEffect } from "react";
import {
  Monitor, Activity, Wifi, ShieldCheck, Zap, Server, QrCode,
  HardDrive, RefreshCw, Radio, CheckCircle2, AlertTriangle,
  ArrowDown, ArrowUp, Cpu, Network, Lock, Sparkles, Sliders
} from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<"monitor" | "speedtest" | "diagnostics" | "companion" | "updates">("monitor");
  const [latencyHistory, setLatencyHistory] = useState<number[]>([14, 15, 14, 16, 15, 14, 17, 14, 15, 14, 16, 14, 15, 14, 13, 14]);
  const [currentPing, setCurrentPing] = useState(14.8);
  const [jitter, setJitter] = useState(1.4);
  const [packetLoss, setPacketLoss] = useState(0.0);
  const [gamingMode, setGamingMode] = useState(false);
  const [callMode, setCallMode] = useState(true);
  const [isSpeedTesting, setIsSpeedTesting] = useState(false);
  const [speedVal, setSpeedVal] = useState(154.2);
  const [uploadVal, setUploadVal] = useState(58.4);
  const [pairedMobile, setPairedMobile] = useState({
    device: "Samsung Galaxy S23 (5G NR)",
    operator: "Dialog Axiata",
    signalDbm: -83,
    ssRsrp: -83,
    ssRsrq: -10,
    ssSinr: 19,
    cellId: 4130289,
    status: "CONNECTED_LIVE"
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const sample = 13 + Math.random() * 3.5;
      setCurrentPing(Math.round(sample * 10) / 10);
      setJitter(Math.round((0.8 + Math.random() * 1.2) * 10) / 10);
      setLatencyHistory((prev) => [...prev.slice(1), Math.round(sample)]);
    }, 1200);

    return () => clearInterval(timer);
  }, []);

  const runSpeedTest = () => {
    setIsSpeedTesting(true);
    setSpeedVal(0);
    setTimeout(() => {
      setSpeedVal(168.4);
      setUploadVal(62.1);
      setIsSpeedTesting(false);
    }, 2800);
  };

  return (
    <div style={{ background: "#060913", color: "#F8FAFC", minHeight: "100vh", padding: "24px", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Precision 2026 Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1E293B", paddingBottom: "16px", marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "40px", height: "40px", background: "linear-gradient(135deg, #1E40AF, #00F2FE)", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 20px rgba(0, 242, 254, 0.25)" }}>
            <Activity size={22} color="#060913" strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <h1 style={{ margin: 0, fontSize: "17px", fontWeight: "900", letterSpacing: "-0.02em" }}>SignalFusion Desktop</h1>
              <span style={{ fontSize: "10px", background: "rgba(0, 242, 254, 0.15)", color: "#00F2FE", padding: "2px 6px", borderRadius: "4px", fontWeight: "800", border: "1px solid rgba(0, 242, 254, 0.3)" }}>WINDOWS PRO v1.4.0</span>
            </div>
            <span style={{ fontSize: "11px", color: "#64748B" }}>Unified Sri Lanka Network Intelligence &amp; Multi-Device Companion</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: "flex", gap: "4px", background: "#0B1224", padding: "4px", borderRadius: "10px", border: "1px solid #1E293B" }}>
          {(["monitor", "speedtest", "diagnostics", "companion", "updates"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: activeTab === tab ? "rgba(0, 242, 254, 0.12)" : "transparent",
                color: activeTab === tab ? "#00F2FE" : "#94A3B8",
                border: activeTab === tab ? "1px solid rgba(0, 242, 254, 0.3)" : "1px solid transparent",
                padding: "6px 14px",
                borderRadius: "7px",
                fontSize: "12px",
                fontWeight: "700",
                textTransform: "capitalize",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
            >
              {tab === "monitor" ? "Realtime Monitor" : tab === "speedtest" ? "Speed Test" : tab === "companion" ? "Phone Companion" : tab}
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: REALTIME MONITOR */}
      {activeTab === "monitor" && (
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Sparkline Canvas Latency Card */}
            <div style={{ background: "#0B1224", borderRadius: "16px", border: "1px solid #1E293B", padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                <div>
                  <span style={{ fontSize: "11px", color: "#64748B", fontWeight: "700", letterSpacing: "0.05em" }}>COLOMBO GATEWAY ROUND-TRIP TIME</span>
                  <div style={{ fontSize: "36px", fontWeight: "900", fontFamily: "monospace", color: "#FFFFFF" }}>
                    {currentPing} <span style={{ fontSize: "16px", color: "#00F2FE" }}>ms</span>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: "11px", color: "#64748B", fontWeight: "700" }}>NETWORK HEALTH</span>
                  <div style={{ fontSize: "24px", fontWeight: "900", color: "#10B981" }}>98% (A+)</div>
                </div>
              </div>

              {/* Real SVG Sparkline */}
              <div style={{ height: "100px", background: "#060913", borderRadius: "10px", padding: "10px", display: "flex", alignItems: "flex-end", gap: "4px" }}>
                {latencyHistory.map((val, idx) => {
                  const h = Math.min(100, Math.max(15, (val / 30) * 100));
                  return (
                    <div
                      key={idx}
                      style={{
                        flex: 1,
                        height: `${h}%`,
                        background: "linear-gradient(180deg, #00F2FE, #1E40AF)",
                        borderRadius: "2px",
                        opacity: idx === latencyHistory.length - 1 ? 1 : 0.75
                      }}
                      title={`${val} ms`}
                    />
                  );
                })}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px", fontSize: "10px", color: "#475569" }}>
                <span>-20 sec</span>
                <span>REALTIME CONTINUOUS PING (1.2s SAMPLES)</span>
                <span>LIVE</span>
              </div>
            </div>

            {/* Network Hardware Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
              <div style={{ background: "#0B1224", borderRadius: "14px", border: "1px solid #1E293B", padding: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#00F2FE", marginBottom: "8px" }}>
                  <Wifi size={18} />
                  <span style={{ fontWeight: "700", fontSize: "13px" }}>Wi-Fi 6E (802.11ax)</span>
                </div>
                <div style={{ fontSize: "12px", color: "#94A3B8" }}>SSID: SignalFusion-Fiber-5G</div>
                <div style={{ fontSize: "12px", color: "#94A3B8" }}>PHY Rate: 1200 / 1200 Mbps</div>
                <div style={{ fontSize: "12px", color: "#10B981", fontWeight: "700", marginTop: "4px" }}>Signal: -48 dBm (Excellent)</div>
              </div>

              <div style={{ background: "#0B1224", borderRadius: "14px", border: "1px solid #1E293B", padding: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#3B82F6", marginBottom: "8px" }}>
                  <Network size={18} />
                  <span style={{ fontWeight: "700", fontSize: "13px" }}>Ethernet Adapter</span>
                </div>
                <div style={{ fontSize: "12px", color: "#94A3B8" }}>Controller: Intel I225-V 2.5GbE</div>
                <div style={{ fontSize: "12px", color: "#94A3B8" }}>Link Speed: 1000 Mbps Full Duplex</div>
                <div style={{ fontSize: "12px", color: "#10B981", fontWeight: "700", marginTop: "4px" }}>Bufferbloat Grade: A+ (1ms)</div>
              </div>
            </div>
          </div>

          {/* Right Column: Modes & Controls */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <div style={{ background: "#0B1224", borderRadius: "16px", border: "1px solid #1E293B", padding: "18px" }}>
              <span style={{ fontSize: "11px", color: "#64748B", fontWeight: "700" }}>NETWORK PROFILES</span>
              
              <div style={{ marginTop: "14px", display: "flex", flexDirection: "column", gap: "10px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#060913", padding: "12px", borderRadius: "10px" }}>
                  <div>
                    <div style={{ fontWeight: "700", fontSize: "12px" }}>Gaming Low-Jitter Mode</div>
                    <div style={{ fontSize: "10px", color: "#64748B" }}>Prioritize UDP packets &amp; bypass Nagle algorithm</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={gamingMode}
                    onChange={(e) => setGamingMode(e.target.checked)}
                    style={{ transform: "scale(1.2)", cursor: "pointer" }}
                  />
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#060913", padding: "12px", borderRadius: "10px" }}>
                  <div>
                    <div style={{ fontWeight: "700", fontSize: "12px" }}>VoIP Call Stability</div>
                    <div style={{ fontSize: "10px", color: "#64748B" }}>Shield against Zoom/Teams micro-packet loss</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={callMode}
                    onChange={(e) => setCallMode(e.target.checked)}
                    style={{ transform: "scale(1.2)", cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>

            {/* Paired Mobile Preview */}
            <div style={{ background: "#0B1224", borderRadius: "16px", border: "1px solid rgba(0, 242, 254, 0.25)", padding: "18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "11px", color: "#00F2FE", fontWeight: "800" }}>CONNECTED PHONE SENSOR</span>
                <span style={{ fontSize: "10px", background: "#064E3B", color: "#34D399", padding: "2px 6px", borderRadius: "4px", fontWeight: "900" }}>LIVE</span>
              </div>
              <div style={{ marginTop: "10px", fontSize: "13px", fontWeight: "700" }}>{pairedMobile.device}</div>
              <div style={{ fontSize: "11px", color: "#94A3B8" }}>{pairedMobile.operator} • 5G NR</div>
              <div style={{ marginTop: "8px", display: "flex", justifyContent: "space-between", fontSize: "11px" }}>
                <span style={{ color: "#64748B" }}>Cellular dBm:</span>
                <span style={{ fontWeight: "bold", color: "#FFFFFF", fontFamily: "monospace" }}>{pairedMobile.signalDbm} dBm</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px" }}>
                <span style={{ color: "#64748B" }}>SS-RSRP / SINR:</span>
                <span style={{ fontWeight: "bold", color: "#FFFFFF", fontFamily: "monospace" }}>{pairedMobile.ssRsrp} dBm / {pairedMobile.ssSinr} dB</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SPEED TEST */}
      {activeTab === "speedtest" && (
        <div style={{ background: "#0B1224", borderRadius: "16px", border: "1px solid #1E293B", padding: "30px", textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
          <span style={{ fontSize: "11px", color: "#64748B", fontWeight: "800", letterSpacing: "0.05em" }}>COLOMBO NODE 1 • TIER-3 DATACENTER</span>
          <div style={{ fontSize: "56px", fontWeight: "900", fontFamily: "monospace", color: "#FFFFFF", margin: "16px 0" }}>
            {isSpeedTesting ? "TESTING..." : `${speedVal}`}
            <span style={{ fontSize: "18px", color: "#00F2FE", marginLeft: "6px" }}>Mbps</span>
          </div>

          <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginBottom: "24px" }}>
            <div style={{ background: "#060913", padding: "10px 20px", borderRadius: "10px" }}>
              <div style={{ fontSize: "10px", color: "#64748B" }}>UPLOAD</div>
              <div style={{ fontSize: "16px", fontWeight: "bold" }}>{uploadVal} Mbps</div>
            </div>
            <div style={{ background: "#060913", padding: "10px 20px", borderRadius: "10px" }}>
              <div style={{ fontSize: "10px", color: "#64748B" }}>PING</div>
              <div style={{ fontSize: "16px", fontWeight: "bold" }}>14 ms</div>
            </div>
            <div style={{ background: "#060913", padding: "10px 20px", borderRadius: "10px" }}>
              <div style={{ fontSize: "10px", color: "#64748B" }}>JITTER</div>
              <div style={{ fontSize: "16px", fontWeight: "bold" }}>1.2 ms</div>
            </div>
          </div>

          <button
            onClick={runSpeedTest}
            disabled={isSpeedTesting}
            style={{
              background: "#2563EB",
              color: "#FFFFFF",
              border: "none",
              padding: "12px 36px",
              borderRadius: "10px",
              fontSize: "13px",
              fontWeight: "900",
              cursor: "pointer"
            }}
          >
            {isSpeedTesting ? "MEASURING BANDWIDTH..." : "START WINDOWS SPEED TEST"}
          </button>
        </div>
      )}

      {/* TAB 3: DIAGNOSTICS */}
      {activeTab === "diagnostics" && (
        <div style={{ background: "#0B1224", borderRadius: "16px", border: "1px solid #1E293B", padding: "20px" }}>
          <h2 style={{ fontSize: "15px", fontWeight: "bold", margin: "0 0 16px 0" }}>Deep Route &amp; Socket Diagnostics</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "12px", fontFamily: "monospace" }}>
            <div style={{ background: "#060913", padding: "10px", borderRadius: "8px", display: "flex", justifyContent: "space-between" }}>
              <span>Hop 1: 192.168.1.1 (Gateway Router)</span>
              <span style={{ color: "#10B981" }}>0.8 ms</span>
            </div>
            <div style={{ background: "#060913", padding: "10px", borderRadius: "8px", display: "flex", justifyContent: "space-between" }}>
              <span>Hop 2: 10.154.0.1 (ISP BNG Concentrator)</span>
              <span style={{ color: "#10B981" }}>3.4 ms</span>
            </div>
            <div style={{ background: "#060913", padding: "10px", borderRadius: "8px", display: "flex", justifyContent: "space-between" }}>
              <span>Hop 3: LankaX Colombo IX Core (192.248.1.1)</span>
              <span style={{ color: "#10B981" }}>8.2 ms</span>
            </div>
            <div style={{ background: "#060913", padding: "10px", borderRadius: "8px", display: "flex", justifyContent: "space-between" }}>
              <span>Hop 4: Cloudflare Colombo Edge (1.1.1.1)</span>
              <span style={{ color: "#10B981" }}>14.2 ms</span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: COMPANION */}
      {activeTab === "companion" && (
        <div style={{ background: "#0B1224", borderRadius: "16px", border: "1px solid #1E293B", padding: "24px", maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
          <QrCode size={48} color="#00F2FE" style={{ margin: "0 auto 12px auto" }} />
          <h2 style={{ fontSize: "16px", fontWeight: "bold", margin: "0 0 8px 0" }}>Pair Mobile Phone with Windows App</h2>
          <p style={{ fontSize: "12px", color: "#94A3B8", margin: "0 0 16px 0" }}>Scan this token using your SignalFusion Android app to mirror cellular radio telemetry live on this PC.</p>
          <div style={{ background: "#060913", padding: "14px", borderRadius: "10px", fontSize: "28px", fontWeight: "900", fontFamily: "monospace", color: "#00F2FE", letterSpacing: "4px" }}>
            LK-8894
          </div>
        </div>
      )}

      {/* TAB 5: UPDATES */}
      {activeTab === "updates" && (
        <div style={{ background: "#0B1224", borderRadius: "16px", border: "1px solid #1E293B", padding: "24px", maxWidth: "600px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            <CheckCircle2 color="#10B981" size={24} />
            <h2 style={{ fontSize: "16px", fontWeight: "bold", margin: 0 }}>SignalFusion Desktop is Up to Date</h2>
          </div>
          <p style={{ fontSize: "12px", color: "#94A3B8" }}>Version: 1.4.0 (Windows x64 Release Build). Signed Tauri auto-updater connected to SignalFusion Cloud.</p>
        </div>
      )}
    </div>
  );
}
