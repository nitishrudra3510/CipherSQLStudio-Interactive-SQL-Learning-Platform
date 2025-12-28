Write-Host "CipherSQLStudio - Project Runner" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

$nodeInstalled = $false
try {
    $nodeVersion = node --version 2>$null
    if ($nodeVersion) {
        Write-Host "✓ Node.js found: $nodeVersion" -ForegroundColor Green
        $nodeInstalled = $true
    }
} catch {
    $nodeInstalled = $false
}

if (-not $nodeInstalled) {
    Write-Host "✗ Node.js is NOT installed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Node.js first:" -ForegroundColor Yellow
    Write-Host "1. Download from: https://nodejs.org/" -ForegroundColor Yellow
    Write-Host "2. Install it" -ForegroundColor Yellow
    Write-Host "3. Restart this terminal" -ForegroundColor Yellow
    Write-Host "4. Run this script again" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Press any key to open Node.js download page..." -ForegroundColor Cyan
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    Start-Process "https://nodejs.org/"
    exit 1
}

Write-Host ""
Write-Host "Checking dependencies..." -ForegroundColor Cyan

if (-not (Test-Path "backend\node_modules")) {
    Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
    Set-Location backend
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ Backend installation failed!" -ForegroundColor Red
        Set-Location ..
        exit 1
    }
    Set-Location ..
    Write-Host "✓ Backend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "✓ Backend dependencies already installed" -ForegroundColor Green
}

if (-not (Test-Path "frontend\node_modules")) {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
    Set-Location frontend
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ Frontend installation failed!" -ForegroundColor Red
        Set-Location ..
        exit 1
    }
    Set-Location ..
    Write-Host "✓ Frontend dependencies installed" -ForegroundColor Green
} else {
    Write-Host "✓ Frontend dependencies already installed" -ForegroundColor Green
}

Write-Host ""
if (-not (Test-Path "backend\.env")) {
    Write-Host "⚠ WARNING: backend\.env file not found!" -ForegroundColor Yellow
    Write-Host "Creating template .env file..." -ForegroundColor Yellow
    Copy-Item "backend\ENV_SETUP.md" -ErrorAction SilentlyContinue
    Write-Host "Please edit backend\.env with your database credentials!" -ForegroundColor Yellow
    Write-Host ""
}

Write-Host "Starting servers..." -ForegroundColor Cyan
Write-Host ""

Write-Host "Starting Backend Server (Port 5000)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend'; Write-Host 'Backend Server' -ForegroundColor Cyan; npm start"

Start-Sleep -Seconds 3

Write-Host "Starting Frontend Server (Port 3000)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\frontend'; Write-Host 'Frontend Server' -ForegroundColor Cyan; npm run dev"

Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "✓ Servers are starting!" -ForegroundColor Green
Write-Host ""
Write-Host "Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Backend:  http://localhost:5000" -ForegroundColor Cyan
Write-Host "Health:   http://localhost:5000/health" -ForegroundColor Cyan
Write-Host ""
Write-Host "The servers will open in separate windows." -ForegroundColor Yellow
Write-Host "Press any key to exit this script..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

