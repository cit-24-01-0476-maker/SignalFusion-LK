@echo off
title SignalFusion LK - Ecosystem Starter
color 0b
echo ========================================================
echo    SignalFusion LK - Mobile Network Intelligence
echo    "Smarter Signal. Stable Internet."
echo ========================================================
echo.
echo Starting all microservices and edge tunnels...
echo.

cd /d "%~dp0"

echo [1/4] Starting Cloud Backend (FastAPI :8000)...
start "SignalFusion API" /min python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --app-dir services/api

echo [2/4] Starting Colombo Edge Speed Test Node (:8001)...
start "SignalFusion SpeedTest Node" /min python -m uvicorn server:node_app --host 0.0.0.0 --port 8001 --app-dir services/speedtest-node

echo [3/4] Starting Next.js Production Web & Reverse Proxy (:3000)...
cd apps\web
start "SignalFusion Web" /min npm start
cd ..\..

echo [4/4] Starting Cloudflare Edge Tunnel...
start "SignalFusion Cloudflare Tunnel" .\cloudflared.exe tunnel --protocol http2 --url http://localhost:3000

echo.
echo ========================================================
echo All services launched!
echo Local Web Dashboard: http://localhost:3000
echo Local Cloud API:     http://localhost:8000/docs
echo Colombo Speed Node:  http://localhost:8001/speedtest/health
echo Android APK Download: http://localhost:3000/downloads/SignalFusion-v1.4.0.apk
echo ========================================================
echo.
pause
