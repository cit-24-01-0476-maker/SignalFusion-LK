export interface LiveCompanionTelemetry {
  deviceId: string;
  deviceName: string;
  platform: "android" | "windows";
  operator: string;
  simSlot: number;
  networkType: string;
  signalDbm: number;
  rsrp: number; // SS-RSRP for 5G, LTE RSRP for 4G
  rsrq: number; // SS-RSRQ / LTE RSRQ
  sinr: number; // SS-SINR / LTE SINR
  rssi?: number;
  cellId?: number;
  pci?: number;
  tac?: number;
  downloadMbps: number;
  uploadMbps: number;
  pingMs: number;
  jitterMs: number;
  packetLossPct: number;
  networkHealth: number; // 0-100%
  dropRisk: "LOW" | "MODERATE" | "HIGH";
  batteryLevel: number;
  isCharging: boolean;
  compassHeading?: number; // 0-360 for Signal Finder
  bestSignalDbm?: number;
  lastUpdated: string;
  status: "CONNECTED" | "DISCONNECTED" | "RECONNECTING";
}

export type TelemetryListener = (telemetry: LiveCompanionTelemetry) => void;

export class CompanionTelemetryClient {
  private socket: WebSocket | null = null;
  private token: string;
  private wsUrl: string;
  private listener: TelemetryListener | null = null;
  private demoInterval: any = null;

  constructor(token: string = "demo-session-s26", wsUrl: string = "ws://localhost:8000/v1/realtime/dashboard") {
    this.token = token;
    this.wsUrl = wsUrl;
  }

  public connect(onUpdate: TelemetryListener) {
    this.listener = onUpdate;
    try {
      this.socket = new WebSocket(`${this.wsUrl}?token=${this.token}`);

      this.socket.onopen = () => {
        console.log("[SignalFusion Companion] Connected to realtime dashboard hub.");
      };

      this.socket.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          if (this.listener) {
            this.listener(payload);
          }
        } catch (e) {
          console.error("Error parsing telemetry WebSocket payload", e);
        }
      };

      this.socket.onerror = () => {
        // Start simulated demo stream if backend socket is not connected locally
        this.startSimulatedCompanionStream();
      };

      this.socket.onclose = () => {
        this.startSimulatedCompanionStream();
      };
    } catch (e) {
      this.startSimulatedCompanionStream();
    }
  }

  public sendCommand(action: string, payload: any = {}) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ action, payload, timestamp: Date.now() }));
    }
  }

  public disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
    if (this.demoInterval) {
      clearInterval(this.demoInterval);
      this.demoInterval = null;
    }
  }

  private startSimulatedCompanionStream() {
    if (this.demoInterval) return;

    let currentSignal = -83;
    let heading = 114;

    const emitUpdate = () => {
      // Subtle natural fluctuations
      const delta = (Math.random() - 0.5) * 2;
      currentSignal = Math.min(-72, Math.max(-105, currentSignal + delta));
      heading = (heading + (Math.random() * 6 - 3) + 360) % 360;

      const telemetry: LiveCompanionTelemetry = {
        deviceId: "dev-samsung-s26",
        deviceName: "Samsung Galaxy S26 Ultra",
        platform: "android",
        operator: "Dialog",
        simSlot: 1,
        networkType: "5G NR (NSA)",
        signalDbm: Math.round(currentSignal),
        rsrp: Math.round(currentSignal),
        rsrq: -10,
        sinr: 19,
        rssi: -71,
        cellId: 4130289,
        pci: 246,
        tac: 5012,
        downloadMbps: 168.4 + (Math.random() * 10 - 5),
        uploadMbps: 34.2 + (Math.random() * 4 - 2),
        pingMs: 19.2 + (Math.random() * 3 - 1.5),
        jitterMs: 2.6,
        packetLossPct: 0.0,
        networkHealth: 88,
        dropRisk: "LOW",
        batteryLevel: 84,
        isCharging: false,
        compassHeading: Math.round(heading),
        bestSignalDbm: -79,
        lastUpdated: new Date().toLocaleTimeString(),
        status: "CONNECTED",
      };

      if (this.listener) {
        this.listener(telemetry);
      }
    };

    emitUpdate();
    this.demoInterval = setInterval(emitUpdate, 1200);
  }
}
