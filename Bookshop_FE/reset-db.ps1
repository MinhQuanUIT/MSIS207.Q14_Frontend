# TiQiShop Quick Reset Script
# Simple version - just reset database

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  TiQiShop - Reset Mock Server" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

try {
    Write-Host "Resetting database..." -ForegroundColor Yellow
    $response = Invoke-WebRequest -Uri "http://localhost:5000/api/admin/reset-db" -Method POST -ContentType "application/json" -ErrorAction Stop
    $result = $response.Content | ConvertFrom-Json
    
    Write-Host ""
    Write-Host "SUCCESS: $($result.message)" -ForegroundColor Green
    Write-Host ""
    Write-Host "You can now register with any email!" -ForegroundColor White
    Write-Host ""
    
} catch {
    Write-Host ""
    Write-Host "ERROR: Cannot connect to mock server!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please make sure mock server is running:" -ForegroundColor Yellow
    Write-Host "  node server/mock-server.cjs" -ForegroundColor White
    Write-Host ""
}

Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
