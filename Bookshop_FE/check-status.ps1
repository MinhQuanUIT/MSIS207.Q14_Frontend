# TiQiShop Quick Test Script
# Check mock server status and list users

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  TiQiShop - Server Status" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Test server connection
try {
    Write-Host "Checking server..." -ForegroundColor Yellow
    $response = Invoke-WebRequest -Uri "http://localhost:5000/api/books" -TimeoutSec 2 -ErrorAction Stop
    Write-Host "Server Status: RUNNING" -ForegroundColor Green
    Write-Host ""
    
    # Get users
    Write-Host "Registered Users:" -ForegroundColor Yellow
    $usersResponse = Invoke-WebRequest -Uri "http://localhost:5000/api/admin/users" -ErrorAction Stop
    $usersData = $usersResponse.Content | ConvertFrom-Json
    
    if ($usersData.data.Count -eq 0) {
        Write-Host "  No users registered yet." -ForegroundColor Gray
    } else {
        foreach ($user in $usersData.data) {
            Write-Host "  - $($user.name) ($($user.email))" -ForegroundColor White
        }
    }
    Write-Host ""
    
} catch {
    Write-Host "Server Status: NOT RUNNING" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please start mock server:" -ForegroundColor Yellow
    Write-Host "  node server/mock-server.cjs" -ForegroundColor White
    Write-Host ""
}

Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
