# SignalFusion LK

**Smarter Signal. Stable Internet.**

SignalFusion LK is a premium, production-grade, Sri Lanka-first mobile network intelligence and diagnostics ecosystem connecting the Web, Android, Desktop, and Cloud Backend.

---

## Ecosystem Architecture

```
SignalFusion LK/
├── apps/
│   ├── web/               # Next.js 14, React 19, TypeScript, Tailwind CSS
│   │                      # Features: Web Speed Test, Live Sri Lanka Map, Compare, Network Lab,
│   │                      # Companion Live Mode, Dashboard, Devices, Download, Releases, PWA
│   ├── desktop/           # Tauri 2, Rust system engine, React TS Windows continuous monitor
│   └── android/           # Kotlin, Jetpack Compose, Clean Architecture, TelephonyManager,
│                          # 5G NR SS-RSRP/SINR, 4G LTE RSRP, Signal Finder, Companion WebSocket
├── services/
│   ├── api/               # FastAPI Cloud Backend (REST + WebSockets + SQLite/PostgreSQL)
│   │                      # OpenAPI v3 /api/v1/, anti-fake engine, device pairing, remote config
│   └── speedtest-node/    # Standalone high-throughput edge test node (Colombo Node 1)
├── packages/
│   ├── design-tokens/     # Deep Navy, Electric Cyan, Midnight Surface, Operator brands
│   ├── shared-types/      # Telemetry, speed test, Sri Lanka grid tile data types
│   ├── config-schema/     # Unified Remote Config JSON schema & defaults
│   └── api-contracts/     # OpenAPI schemas
└── infra/
    └── docker/            # Docker Compose (API, Speed Node, Redis, PostGIS, Web)
```

---

## Core Product Principles

1. **Zero Fake Signals**:
   - Web-Only Mode never pretends to read cellular radio dBm, SS-RSRP, or tower Cell IDs directly.
   - Genuine hardware readings require **SignalFusion Mobile**.
2. **Two Operating Modes**:
   - **MODE 1: Web-Only Mode**: In-browser HTTP streaming speed test, latency probes, jitter estimation, network lab diagnostics, and crowdsourced map explorer.
   - **MODE 2: Companion Live Mode**: Scans QR code with Android or Windows device, streaming live native radio telemetry (1-2 updates/sec) over secure WebSockets to the web control center.
3. **Sri Lankan Operator Calibrations**:
   - **Dialog** (MCC 413, MNC 02)
   - **SLT-Mobitel** (MCC 413, MNC 01)
   - **Airtel** (MCC 413, MNC 05)
   - **Hutch** (MCC 413, MNC 08)
4. **Privacy-Preserving Spatial Grids**:
   - Exact user GPS coordinates are never exposed or saved. All measurements are quantized into ~1.1km spatial grids (`LK_GRID_lat_lon`).

---

## Quick Start Guide

### 1. Launch FastAPI Cloud Backend
```bash
cd services/api
python -m uvicorn app.main:app --port 8000 --reload
```
API Documentation: [http://localhost:8000/docs](http://localhost:8000/docs)

### 2. Launch Colombo Edge Speed Test Node
```bash
cd services/speedtest-node
python server.py
```
Edge Node Health: [http://localhost:8001/speedtest/health](http://localhost:8001/speedtest/health)

### 3. Launch Web Platform & Web App
```bash
cd apps/web
npm run dev
```
Web App: [http://localhost:3000](http://localhost:3000)

### 4. Run Automated Backend Tests
```bash
cd services/api
python -m pytest tests
```

---

## Web Routes Implemented

- `/` - Marketing Homepage with animated Sri Lanka radar, feature matrix, live demo card
- `/speedtest` - Real browser streaming speed test (Quick, Standard, High-Speed)
- `/map` - Interactive Sri Lanka Network Map with Dialog/Mobitel/Airtel/Hutch filters
- `/compare` - Side-by-side operator metrics for Sri Lankan districts
- `/network-lab` - Browser protocol diagnostics (DNS, API latency, WebRTC, Service Worker)
- `/dashboard` - Authenticated Web control center & live companion monitor
- `/devices` - Connected devices, QR pairing code, revoke actions
- `/history` - Cross-device synchronized test history
- `/mobile` - Android application architecture showcase
- `/desktop` - Windows Tauri 2 software showcase
- `/download` - Download center for Android APK, Windows Installer, and PWA
- `/technology` - Engineering philosophy and zero-fake signal commitment
- `/how-it-works` - Crowdsourcing, privacy grids, and telemetry pipeline
- `/status` - Live system status and node uptime monitor
- `/releases` - Unified Release Center (v1.4.0)
- `/admin` - Remote config editor, speed nodes, fraud audit logs
- `/docs`, `/support`, `/privacy`, `/terms`, `/about`, `/login`, `/register`
