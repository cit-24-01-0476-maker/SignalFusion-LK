import os
import uuid
from datetime import datetime
from sqlalchemy import create_engine, Column, String, Float, Integer, DateTime, Boolean, JSON
from sqlalchemy.orm import declarative_base, sessionmaker

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./signalfusion.db")

# If using sqlite, need connect_args={"check_same_thread": False}
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class MeasurementDB(Base):
  __tablename__ = "measurements"

  id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
  anonymous_user_id = Column(String, default="anon")
  device_id = Column(String, index=True)
  operator = Column(String, index=True)
  mcc = Column(String, default="413")
  mnc = Column(String, nullable=True)
  network_type = Column(String, index=True)
  signal_dbm = Column(Integer, nullable=True)
  rsrp = Column(Integer, nullable=True)
  rsrq = Column(Integer, nullable=True)
  sinr = Column(Integer, nullable=True)
  rssi = Column(Integer, nullable=True)
  download_mbps = Column(Float, nullable=True)
  upload_mbps = Column(Float, nullable=True)
  ping_ms = Column(Float, nullable=True)
  jitter_ms = Column(Float, nullable=True)
  packet_loss = Column(Float, default=0.0)
  latitude = Column(Float)
  longitude = Column(Float)
  location_grid = Column(String, index=True)
  timestamp = Column(DateTime, default=datetime.utcnow)
  device_model = Column(String, default="Unknown")
  os = Column(String, default="web")
  os_version = Column(String, default="")
  client_type = Column(String, default="web")
  verification_status = Column(String, default="verified")
  confidence_score = Column(String, default="MEDIUM CONFIDENCE")
  measurement_source = Column(String, default="web_speedtest")

class SpeedTestDB(Base):
  __tablename__ = "speedtests"

  id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
  user_id = Column(String, default="anon")
  device_id = Column(String, index=True)
  server_node_id = Column(String)
  server_name = Column(String, default="Colombo Node 1")
  download_mbps = Column(Float)
  upload_mbps = Column(Float)
  latency_ms = Column(Float)
  jitter_ms = Column(Float)
  packet_loss = Column(Float, default=0.0)
  test_type = Column(String, default="standard")
  client_type = Column(String, default="web")
  timestamp = Column(DateTime, default=datetime.utcnow)
  verified = Column(Boolean, default=True)

class DeviceDB(Base):
  __tablename__ = "devices"

  id = Column(String, primary_key=True)
  user_id = Column(String, default="demo_user", index=True)
  device_name = Column(String)
  platform = Column(String) # android, windows
  status = Column(String, default="connected") # connected, offline, revoked
  pairing_token = Column(String, nullable=True)
  last_seen = Column(DateTime, default=datetime.utcnow)
  current_operator = Column(String, nullable=True)
  current_network = Column(String, nullable=True)
  current_signal_dbm = Column(Integer, nullable=True)

class PairingSessionDB(Base):
  __tablename__ = "pairing_sessions"

  pairing_token = Column(String, primary_key=True)
  pairing_code = Column(String, index=True) # 6 digits
  user_id = Column(String, default="demo_user")
  created_at = Column(DateTime, default=datetime.utcnow)
  expires_at = Column(DateTime)
  status = Column(String, default="pending") # pending, paired, expired

def init_db():
  Base.metadata.create_all(bind=engine)

def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()
