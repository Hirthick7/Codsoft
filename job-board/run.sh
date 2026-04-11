#!/bin/bash
# Quick Start Script for Job Board Application (Mac/Linux)
# This script starts both the backend and frontend servers

echo ""
echo "========================================="
echo "  Job Board Application - Quick Start"
echo "========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ ERROR: Node.js is not installed!"
    echo "Please download and install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js found"
echo ""

# Check if MongoDB URI is configured
if [ ! -f "server/.env" ]; then
    echo "❌ ERROR: Server .env file not found!"
    echo "Please follow the SETUP_GUIDE.md instructions"
    exit 1
fi

echo "✓ Server .env file found"
echo ""

# Check if node_modules exist in server
if [ ! -d "server/node_modules" ]; then
    echo "Installing server dependencies..."
    cd server
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install server dependencies"
        exit 1
    fi
    cd ..
    echo "✓ Server dependencies installed"
fi

# Check if node_modules exist in client
if [ ! -d "client/node_modules" ]; then
    echo "Installing client dependencies..."
    cd client
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ Failed to install client dependencies"
        exit 1
    fi
    cd ..
    echo "✓ Client dependencies installed"
fi

echo ""
echo "========================================="
echo "Starting Job Board Application..."
echo "========================================="
echo ""
echo "Starting Backend Server on port 5000..."
echo "Starting Frontend on port 3000..."
echo ""
echo "📝 Note: Press Ctrl+C to stop both servers"
echo ""

# Start backend in background
cd server
npm run dev &
SERVER_PID=$!
cd ..

# Wait a bit before starting frontend
sleep 3

# Start frontend in foreground
cd client
npm start
FRONTEND_PID=$!
cd ..

# Wait for both processes
wait

echo ""
echo "Application stopped"
echo ""
