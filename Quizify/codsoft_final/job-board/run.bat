@echo off
REM Quick Start Script for Job Board Application (Windows)
REM This script starts both the backend and frontend servers

echo.
echo =========================================
echo   Job Board Application - Quick Start
echo =========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ ERROR: Node.js is not installed!
    echo Please download and install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Node.js found
echo.

REM Check if MongoDB URI is configured
if not exist "server\.env" (
    echo ❌ ERROR: Server .env file not found!
    echo Please follow the SETUP_GUIDE.md instructions
    pause
    exit /b 1
)

echo ✓ Server .env file found
echo.

REM Check if node_modules exist in server
if not exist "server\node_modules" (
    echo Installing server dependencies...
    cd server
    call npm install
    if %errorlevel% neq 0 (
        echo ❌ Failed to install server dependencies
        pause
        exit /b 1
    )
    cd ..
    echo ✓ Server dependencies installed
)

REM Check if node_modules exist in client
if not exist "client\node_modules" (
    echo Installing client dependencies...
    cd client
    call npm install
    if %errorlevel% neq 0 (
        echo ❌ Failed to install client dependencies
        pause
        exit /b 1
    )
    cd ..
    echo ✓ Client dependencies installed
)

echo.
echo =========================================
echo Starting Job Board Application...
echo =========================================
echo.
echo Starting Backend Server on port 5000...
echo Starting Frontend on port 3000...
echo.
echo 📝 Note: Two terminal windows will open
echo 📝 Wait 10 seconds for frontend to load
echo.

REM Start backend in a new window
start cmd /k "cd server && npm run dev"

REM Wait a bit before starting frontend
timeout /t 3 /nobreak

REM Start frontend in a new window
start cmd /k "cd client && npm start"

echo.
echo ✓ Both servers started!
echo.
echo Backend URL: http://localhost:5000
echo Frontend URL: http://localhost:3000
echo.
echo Close the terminal windows when you want to stop the application.
echo.

pause
