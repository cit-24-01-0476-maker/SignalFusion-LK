@echo off
title SignalFusion LK - Vercel Deployment
color 0a
echo ========================================================
echo       SignalFusion LK - 1-Click Vercel Deployer
echo ========================================================
echo.
cd /d "%~dp0apps\web"
echo Deploying apps/web to Vercel Cloud...
echo.
call npx vercel
echo.
echo ========================================================
echo Deployment finished! If prompted, log in with your free GitHub/Email account.
echo ========================================================
pause
