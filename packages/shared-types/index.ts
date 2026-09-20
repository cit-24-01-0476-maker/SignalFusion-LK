export type SriLankaOperator = "Dialog" | "SLT-Mobitel" | "Airtel" | "Hutch" | "Unknown";

export type NetworkTechnology = "2G" | "3G" | "4G" | "5G" | "Wi-Fi" | "Ethernet" | "Unknown";

export type MeasurementSource =
  | "android_native"
  | "desktop_native"
  | "web_speedtest"
  | "web_companion"
  | "community_data";

export type ConfidenceScore = "LOW CONFIDENCE" | "MEDIUM CONFIDENCE" | "HIGH CONFIDENCE";

export type FreshnessCategory = "LIVE DEVICE" | "FRESH" | "RECENT" | "HISTORICAL";

export interface RadioTelemetry {
  operator: SriLankaOperator;
  mcc?: string;
  mnc?: string;
  networkType: NetworkTechnology;
  band?: string;
  cellId?: number;
  pci?: number;
  tac?: number;
  earfcn?: number;
  nrArfcn?: number;
  signalDbm?: number;
  // 4G LTE metrics
  lteRsrp?: number;
  lteRsrq?: number;
  lteSinr?: number;
  lteRssi?: number;
  // 5G NR metrics
  ssRsrp?: number;
  ssRsrq?: number;
  ssSinr?: number;
  csiRsrp?: number;
  csiRsrq?: number;
  csiSinr?: number;
  simSlot?: number;
  isRoaming?: boolean;
}

export interface SpeedTestResult {
  id: string;
  serverNodeId: string;
  serverName: string;
  downloadMbps: number;
  uploadMbps: number;
  latencyMs: number;
  jitterMs: number;
  packetLossPercent: number;
  timestamp: string;
  testType: "quick" | "standard" | "high_speed";
  clientType: "web" | "android" | "desktop";
  measurementSource: MeasurementSource;
  approxLocation?: {
    city: string;
    district: string;
    latitudeGrid: number;
    longitudeGrid: number;
  };
}

export interface NetworkHealth {
  overallScore: number; // 0-100
  stabilityRating: "EXCELLENT" | "GOOD" | "FAIR" | "POOR";
  dropRisk: "LOW" | "MODERATE" | "HIGH";
  bottleneck: "NONE" | "HIGH_LATENCY" | "JITTER_SPIKES" | "PACKET_LOSS" | "LOW_THROUGHPUT" | "WEAK_SIGNAL";
  insights: string[];
}

export interface DevicePairingSession {
  pairingToken: string;
  pairingCode: string; // 6-digit numeric for manual entry
  qrDataUrl: string;
  expiresAt: string;
  deviceId?: string;
  deviceName?: string;
  platform?: "android" | "windows";
  status: "pending" | "paired" | "revoked" | "expired";
}

export interface SriLankaNetworkTile {
  gridId: string;
  district: string;
  locationName: string;
  latitude: number;
  longitude: number;
  operator: SriLankaOperator;
  networkTechnology: NetworkTechnology;
  medianSignalDbm?: number;
  medianRsrp?: number;
  medianRsrq?: number;
  medianSinr?: number;
  medianDownloadMbps: number;
  medianUploadMbps: number;
  medianLatencyMs: number;
  sampleCount: number;
  deviceCount: number;
  latestMeasurementTimestamp: string;
  confidence: ConfidenceScore;
  freshness: FreshnessCategory;
}

export interface RemoteConfig {
  version: string;
  updatedAt: string;
  featureFlags: {
    enable5GSurvey: boolean;
    enableHighSpeedTest: boolean;
    enableWebRtcPacketLoss: boolean;
    enableAntiDropPrediction: boolean;
    enableLiveCompanionMode: boolean;
  };
  speedTest: {
    quickDownloadMb: number;
    standardDownloadMb: number;
    highSpeedDownloadMb: number;
    maxDurationSeconds: number;
    warmupDurationSeconds: number;
  };
  signalThresholds: {
    excellentDbm: number; // e.g. >= -80
    goodDbm: number;      // e.g. -80 to -95
    fairDbm: number;      // e.g. -95 to -110
    poorDbm: number;      // e.g. < -110
  };
  supportedOperators: string[];
  activeNodes: {
    id: string;
    name: string;
    city: string;
    country: string;
    host: string;
    port: number;
    isHealthy: boolean;
  }[];
}
