@echo off
echo Starting Shatibiyyah Companion (Final Corrected)...
echo.

REM Start backend API on Port 5000 in DEVELOPMENT mode
echo [1/3] Starting backend API server (Port 5000)...
start "Shatibiyyah API (Port 5000)" cmd /k "cd /d %~dp0 && set PORT=5000&& set NODE_ENV=development&& npx tsx server/_core/index.ts"
timeout /t 10 /nobreak >nul

REM Install frontend dependencies
if not exist "%~dp0web\node_modules" (
    echo [2/3] Installing frontend dependencies...
    cd /d "%~dp0web"
    call npm install
    cd /d "%~dp0"
)

REM Start frontend
echo [3/3] Starting frontend web app...
start "Shatibiyyah Web" cmd /k "cd /d %~dp0web && npm run dev"

echo.
echo ========================================
echo Servers are starting...
echo Backend API: http://localhost:5000
echo Frontend App: http://localhost:3000
echo ========================================
echo.
echo Press any key to open the app...
pause >nul
start http://localhost:3000
