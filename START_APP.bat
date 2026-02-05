@echo off
echo Starting Shatibiyyah Companion...
echo.

REM Start backend API
echo [1/3] Starting backend API server...
start "Shatibiyyah API" cmd /k "cd /d %~dp0 && npm run dev"
timeout /t 5 /nobreak >nul

REM Install frontend dependencies if needed
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
echo Backend API: http://localhost:5173
echo Frontend App: http://localhost:3000
echo ========================================
echo.
echo Press any key to open the app in your browser...
pause >nul
start http://localhost:3000
