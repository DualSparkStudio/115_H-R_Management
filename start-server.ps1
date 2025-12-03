# PowerShell script to start React development server
# This handles the path with special characters

$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

# Start the server using the full path to react-scripts
$reactScriptsPath = Join-Path $scriptPath "node_modules\react-scripts\bin\react-scripts.js"

if (Test-Path $reactScriptsPath) {
    Write-Host "Starting development server..." -ForegroundColor Green
    node $reactScriptsPath start
} else {
    Write-Host "Error: react-scripts not found. Please run 'npm install' first." -ForegroundColor Red
}

