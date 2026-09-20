from typing import Optional, List, Dict, Any
from datetime import datetime
from pydantic import BaseModel, Field

class MeasurementCreate(BaseModel):
  operator: str = Field(..., description="Dialog, SLT-Mobitel, Airtel, Hutch")
  mcc: Optional[str] = "413"
  mnc: Optional[str] = None
  network_type: str = Field(..., description="4G, 5G, 3G, Wi-Fi, Ethernet")
  signal_dbm: Optional[int] = None
  rsrp: Optional[int] = None
  rsrq: Optional[int] = None
  sinr: Optional[int] = None
  rssi: Optional[int] = None
  download_mbps: Optional[float] = None
  upload_mbps: Optional[float] = None
  ping_ms: Optional[float] = None
  jitter_ms: Optional[float] = None
  packet_loss: Optional[float] = None
  latitude: float
  longitude: float
  device_id: Optional[str] = "anonymous"
  device_model: Optional[str] = "Unknown"
  os: Optional[str] = "web"
  os_version: Optional[str] = ""
  client_type: str = Field("web", description="web, android, desktop")
  measurement_source: str = Field("web_speedtest", description="android_native, desktop_native, web_speedtest, web_companion")

class MeasurementResponse(BaseModel):
  id: str
  operator: str
  network_type: str
  signal_dbm: Optional[int]
  download_mbps: Optional[float]
  upload_mbps: Optional[float]
  ping_ms: Optional[float]
  timestamp: datetime
  confidence_score: str
  verification_status: str
  location_grid: str

class SpeedTestCreate(BaseModel):
  server_node_id: str
  download_mbps: float
  upload_mbps: float
  latency_ms: float
  jitter_ms: float
  packet_loss: float = 0.0
  test_type: str = "standard" # quick, standard, high_speed
  client_type: str = "web" # web, android, desktop
  device_id: Optional[str] = "anonymous"
  latitude: Optional[float] = None
  longitude: Optional[float] = None
  operator: Optional[str] = None
  network_type: Optional[str] = None

class SpeedTestResponse(BaseModel):
  id: str
  server_node_id: str
  download_mbps: float
  upload_mbps: float
  latency_ms: float
  jitter_ms: float
  packet_loss: float
  test_type: str
  timestamp: datetime
  verified: bool

class DevicePairRequest(BaseModel):
  pairing_code: str
  device_name: str
  platform: str # android, windows
  device_id: str

class DeviceItem(BaseModel):
  device_id: str
  device_name: str
  platform: str
  status: str # connected, offline, revoked
  last_seen: datetime
  current_operator: Optional[str] = None
  current_network: Optional[str] = None
  current_signal_dbm: Optional[int] = None

class TelemetryEvent(BaseModel):
  event_type: str # signal.update, network.change, speedtest.progress, drop.warning
  device_id: str
  device_name: str
  platform: str
  timestamp: float
  data: Dict[str, Any]

class LocationSummary(BaseModel):
  location_name: str
  district: str
  latitude: float
  longitude: float
  primary_operator: str
  median_download_mbps: float
  median_upload_mbps: float
  median_latency_ms: float
  median_signal_dbm: Optional[int]
  samples_count: int
  confidence: str
  freshness: str

class OperatorStats(BaseModel):
  operator: str
  median_download: float
  median_upload: float
  median_latency: float
  median_signal: int
  sample_count: int
  stability_score: int
  coverage_rating: str

class NetworkComparison(BaseModel):
  district: str
  location_name: str
  operators: List[OperatorStats]
  updated_at: str

class DiagnosticsReport(BaseModel):
  test_id: str
  client_type: str
  dns_latency_ms: Optional[float] = None
  api_latency_ms: Optional[float] = None
  speed_node_latency_ms: Optional[float] = None
  packet_loss_pct: Optional[float] = None
  websocket_status: str = "ok"
  service_worker_status: str = "active"
  issues_detected: List[str] = []
  recommendations: List[str] = []
