import asyncio
import json
import logging
from typing import Dict, Set
from fastapi import WebSocket

logger = logging.getLogger("signalfusion.realtime")

class RealtimeHub:
  def __init__(self):
    # Maps pairing_token/device_id to set of active web dashboard WebSockets
    self.dashboards: Dict[str, Set[WebSocket]] = {}
    # Maps device_id to active device WebSocket
    self.devices: Dict[str, WebSocket] = {}
    # Last cached telemetry per device
    self.latest_telemetry: Dict[str, dict] = {}

  async def connect_dashboard(self, session_key: str, websocket: WebSocket):
    await websocket.accept()
    if session_key not in self.dashboards:
      self.dashboards[session_key] = set()
    self.dashboards[session_key].add(websocket)
    # If we have cached telemetry for this session, send immediately
    if session_key in self.latest_telemetry:
      await websocket.send_text(json.dumps(self.latest_telemetry[session_key]))
    logger.info(f"Dashboard connected for session: {session_key}")

  def disconnect_dashboard(self, session_key: str, websocket: WebSocket):
    if session_key in self.dashboards:
      self.dashboards[session_key].discard(websocket)
      if not self.dashboards[session_key]:
        del self.dashboards[session_key]
    logger.info(f"Dashboard disconnected for session: {session_key}")

  async def connect_device(self, session_key: str, websocket: WebSocket):
    await websocket.accept()
    self.devices[session_key] = websocket
    logger.info(f"Device sensor connected for session: {session_key}")

  def disconnect_device(self, session_key: str):
    if session_key in self.devices:
      del self.devices[session_key]
    logger.info(f"Device sensor disconnected: {session_key}")

  async def broadcast_to_dashboards(self, session_key: str, message: dict):
    self.latest_telemetry[session_key] = message
    if session_key in self.dashboards:
      serialized = json.dumps(message)
      dead_sockets = set()
      for ws in self.dashboards[session_key]:
        try:
          await ws.send_text(serialized)
        except Exception:
          dead_sockets.add(ws)
      for dead in dead_sockets:
        self.dashboards[session_key].discard(dead)

hub = RealtimeHub()
