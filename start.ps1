# CipherSQLStudio - Start Script
# This script starts both backend and frontend servers

Write-Host "Starting CipherSQLStudio..." -ForegroundColor Green

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "Node.js version: $nodeVersion" -ForegroundColor Cyan
} catch {
    Write-Host "ERROR: Node.js is not installed or not in PATH!" -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Check if npm is installed
try {
    $npmVersion = npm --version
    Write-Host "npm version: $npmVersion" -ForegroundColor Cyan
} catch {
    Write-Host "ERROR: npm is not installed!" -ForegroundColor Red
    exit 1
}

# Check if backend dependencies are installed
if (-not (Test-Path "backend\node_modules")) {
    Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
    Set-Location backend
    npm install
    Set-Location ..
}

# Check if frontend dependencies are installed
if (-not (Test-Path "frontend\node_modules")) {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
    Set-Location frontend
    npm install
    Set-Location ..
}

# Check if .env file exists
if (-not (Test-Path "backend\.env")) {
    Write-Host "WARNING: backend\.env file not found!" -ForegroundColor Yellow
    Write-Host "Please create backend\.env file with your configuration." -ForegroundColor Yellow
    Write-Host "See backend\ENV_SETUP.md for details." -ForegroundColor Yellow
    Write-Host ""
    $continue = Read-Host "Continue anyway? (y/n)"
    if ($continue -ne "y") {
        exit 1
    }
}

Write-Host ""
Write-Host "Starting Backend Server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend'; npm start"

# Wait a bit for backend to start
Start-Sleep -Seconds 3

Write-Host "Starting Frontend Server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\frontend'; npm run dev"

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Servers are starting!" -ForegroundColor Green
Write-Host "Backend: http://localhost:5000" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to exit this script (servers will continue running)..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

