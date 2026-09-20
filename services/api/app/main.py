import json
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Query
from fastapi.middleware.cors import CORSMiddleware

from app.core.database import init_db
from app.api.v1.router import router as api_v1_router
from app.realtime.hub import hub

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("signalfusion.api")

# Ensure tables are initialized at startup
init_db()

@asynccontextmanager
async def lifespan(app: FastAPI):
  init_db()
  logger.info("Database initialized. SignalFusion API ready.")
  yield

app = FastAPI(
  title="SignalFusion LK Cloud API",
  description="Sri Lanka-first mobile network intelligence and real-time companion telemetry platform",
  version="1.4.0",
  docs_url="/docs",
  openapi_url="/api/v1/openapi.json",
  lifespan=lifespan
)

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

app.include_router(api_v1_router, prefix="/api")

@app.get("/")
def root():
  return {
    "product": "SignalFusion LK",
    "tagline": "Smarter Signal. Stable Internet.",
    "version": "1.4.0",
    "status": "online",
    "documentation": "/docs"
  }

@app.get("/health")
def health():
  return {"status": "healthy", "service": "SignalFusion Cloud API"}

@app.websocket("/v1/realtime/device")
async def websocket_device_endpoint(websocket: WebSocket, token: str = Query("demo-token")):
  """
  Real-time endpoint for Android / Desktop sensor streaming telemetry.
  """
  await hub.connect_device(token, websocket)
  try:
    while True:
      raw_data = await websocket.receive_text()
      try:
        payload = json.loads(raw_data)
        # Broadcast to all web companion dashboards paired with this token
        await hub.broadcast_to_dashboards(token, payload)
      except Exception as e:
        logger.warning(f"Error parsing device message: {e}")
  except WebSocketDisconnect:
    hub.disconnect_device(token)

@app.websocket("/v1/realtime/dashboard")
async def websocket_dashboard_endpoint(websocket: WebSocket, token: str = Query("demo-token")):
  """
  Real-time endpoint for Web Companion dashboard to receive live telemetry.
  """
  await hub.connect_dashboard(token, websocket)
  try:
    while True:
      # Dashboards can send commands (e.g. trigger speed test or ping)
      data = await websocket.receive_text()
      try:
        msg = json.loads(data)
        if token in hub.devices:
          await hub.devices[token].send_text(json.dumps(msg))
      except Exception:
        pass
  except WebSocketDisconnect:
    hub.disconnect_dashboard(token, websocket)

if __name__ == "__main__":
  import uvicorn
  uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
