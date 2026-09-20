import time
import os
from fastapi import FastAPI, Request, Query
from fastapi.responses import StreamingResponse, JSONResponse
from fastapi.middleware.cors import CORSMiddleware

node_app = FastAPI(
  title="SignalFusion Colombo Edge Speed Node",
  description="High-throughput low-jitter edge node for Sri Lanka network measurements",
  version="1.4.0"
)

node_app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

CHUNK_SIZE = 64 * 1024  # 64KB buffer chunk
ZERO_BUFFER = b"\x00" * CHUNK_SIZE

NODE_INFO = {
  "node_id": "cmbo-01",
  "name": "Colombo Node 1 (Tier-3 Datacenter)",
  "city": "Colombo",
  "country": "Sri Lanka",
  "operator_peering": ["Dialog", "SLT-Mobitel", "Airtel", "Hutch", "LankaX"],
  "capacity_gbps": 10.0,
  "status": "healthy"
}

@node_app.get("/speedtest/health")
def health_check():
  return {
    "status": "healthy",
    "timestamp_ns": time.time_ns(),
    "node": NODE_INFO
  }

@node_app.get("/speedtest/ping")
def ping_probe(t: int = Query(..., description="Client timestamp in ms")):
  """
  High precision latency probe. Returns server timestamp and echoes client timestamp.
  Prevents any HTTP caching.
  """
  now_ns = time.time_ns()
  now_ms = int(now_ns / 1_000_000)
  response = JSONResponse({
    "client_t": t,
    "server_t": now_ms,
    "server_ns": now_ns
  })
  response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0"
  response.headers["Pragma"] = "no-cache"
  return response

@node_app.get("/speedtest/download")
async def download_stream(
  size_mb: int = Query(20, ge=1, le=200, description="Target size in megabytes"),
  cb: str = Query("", description="Cache buster")
):
  """
  Streams chunked binary data with no-store caching headers.
  """
  total_bytes = size_mb * 1024 * 1024
  chunks_count = total_bytes // CHUNK_SIZE

  async def stream_generator():
    for _ in range(chunks_count):
      yield ZERO_BUFFER

  headers = {
    "Content-Type": "application/octet-stream",
    "Content-Length": str(total_bytes),
    "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
    "Pragma": "no-cache",
    "X-SignalFusion-Node": "cmbo-01"
  }
  return StreamingResponse(stream_generator(), headers=headers)

@node_app.post("/speedtest/upload")
async def upload_stream(request: Request):
  """
  Receives binary chunk stream and measures exact received payload volume.
  """
  start_time = time.time()
  total_bytes = 0

  async for chunk in request.stream():
    total_bytes += len(chunk)

  elapsed = time.time() - start_time
  mbps = (total_bytes * 8) / (elapsed * 1_000_000) if elapsed > 0 else 0

  response = JSONResponse({
    "bytes_received": total_bytes,
    "duration_seconds": round(elapsed, 4),
    "upload_mbps": round(mbps, 2),
    "node_id": "cmbo-01"
  })
  response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate"
  return response

if __name__ == "__main__":
  import uvicorn
  uvicorn.run(node_app, host="0.0.0.0", port=8001)
