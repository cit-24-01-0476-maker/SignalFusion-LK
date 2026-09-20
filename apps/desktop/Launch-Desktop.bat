@echo off
title SignalFusion LK Desktop Network Monitor
echo Starting SignalFusion LK Windows Software...
cd /d "%~dp0"
start "" "npx" "vite" "--port" "5173"
timeout /t 2 >nul
start "" "msedge" "--app=http://localhost:5173" || start "" "chrome" "--app=http://localhost:5173" || start "" "http://localhost:5173"
exit
