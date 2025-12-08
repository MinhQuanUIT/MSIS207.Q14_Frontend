# Quick Test & Reset Script

Write-Host "=== TiQiShop Testing & Reset Utility ===" -ForegroundColor Cyan
Write-Host ""

# Function to test if server is running
function Test-Server {
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:5000/api/books" -TimeoutSec 2 -ErrorAction Stop
        return $true
    } catch {
        return $false
    }
}

# Menu
Write-Host "Choose an option:" -ForegroundColor Yellow
Write-Host "1. Reset Mock Server (clear all users)"
Write-Host "2. List all registered users"
Write-Host "3. Test register with new email"
Write-Host "4. Test login"
Write-Host "5. Test book API (get book-1)"
Write-Host "6. Check server status"
Write-Host "0. Exit"
Write-Host ""

$choice = Read-Host "Enter your choice (0-6)"

switch ($choice) {
    "1" {
        Write-Host "`nResetting mock server database..." -ForegroundColor Yellow
        try {
            $response = Invoke-WebRequest -Uri "http://localhost:5000/api/admin/reset-db" -Method POST -ContentType "application/json"
            $result = $response.Content | ConvertFrom-Json
            Write-Host "Success: $($result.message)" -ForegroundColor Green
        } catch {
            Write-Host "Error: Unable to reset. Is the mock server running?" -ForegroundColor Red
        }
    }
    
    "2" {
        Write-Host "`nFetching registered users..." -ForegroundColor Yellow
        try {
            $response = Invoke-WebRequest -Uri "http://localhost:5000/api/admin/users"
            $result = $response.Content | ConvertFrom-Json
            if ($result.data.Count -eq 0) {
                Write-Host "No users registered yet." -ForegroundColor Yellow
            } else {
                Write-Host "Registered Users:" -ForegroundColor Green
                $result.data | ForEach-Object {
                    Write-Host "  - ID: $($_.id), Name: $($_.name), Email: $($_.email), Phone: $($_.phone)" -ForegroundColor White
                }
            }
        } catch {
            Write-Host "Error: Unable to fetch users." -ForegroundColor Red
        }
    }
    
    "3" {
        $email = Read-Host "Enter email"
        $name = Read-Host "Enter name"
        $phone = Read-Host "Enter phone"
        $password = Read-Host "Enter password"
        
        Write-Host "`nRegistering user..." -ForegroundColor Yellow
        try {
            $body = @{
                name = $name
                email = $email
                phone = $phone
                password = $password
            } | ConvertTo-Json
            
            $response = Invoke-WebRequest -Uri "http://localhost:5000/api/auth/register" -Method POST -Body $body -ContentType "application/json"
            $result = $response.Content | ConvertFrom-Json
            Write-Host "Success: $($result.message)" -ForegroundColor Green
            Write-Host "User ID: $($result.user.id)" -ForegroundColor White
        } catch {
            $errorResponse = $_.Exception.Response
            if ($errorResponse) {
                $reader = New-Object System.IO.StreamReader($errorResponse.GetResponseStream())
                $errorBody = $reader.ReadToEnd() | ConvertFrom-Json
                Write-Host "Error: $($errorBody.message)" -ForegroundColor Red
            } else {
                Write-Host "Error: Unable to register. Is the mock server running?" -ForegroundColor Red
            }
        }
    }
    
    "4" {
        $email = Read-Host "Enter email"
        $password = Read-Host "Enter password"
        
        Write-Host "`nLogging in..." -ForegroundColor Yellow
        try {
            $body = @{
                email = $email
                password = $password
            } | ConvertTo-Json
            
            $response = Invoke-WebRequest -Uri "http://localhost:5000/api/auth/login" -Method POST -Body $body -ContentType "application/json"
            $result = $response.Content | ConvertFrom-Json
            Write-Host "Success: $($result.message)" -ForegroundColor Green
            Write-Host "Token: $($result.access_token)" -ForegroundColor White
            Write-Host "User: $($result.user.name) ($($result.user.email))" -ForegroundColor White
        } catch {
            $errorResponse = $_.Exception.Response
            if ($errorResponse) {
                $reader = New-Object System.IO.StreamReader($errorResponse.GetResponseStream())
                $errorBody = $reader.ReadToEnd() | ConvertFrom-Json
                Write-Host "Error: $($errorBody.message)" -ForegroundColor Red
            } else {
                Write-Host "Error: Unable to login." -ForegroundColor Red
            }
        }
    }
    
    "5" {
        Write-Host "`nFetching book-1..." -ForegroundColor Yellow
        try {
            $response = Invoke-WebRequest -Uri "http://localhost:5000/api/books/book-1"
            $result = $response.Content | ConvertFrom-Json
            Write-Host "Success!" -ForegroundColor Green
            Write-Host "Book: $($result.data.title)" -ForegroundColor White
            Write-Host "Author: $($result.data.author)" -ForegroundColor White
            Write-Host "Price: $($result.data.price)" -ForegroundColor White
        } catch {
            Write-Host "Error: Unable to fetch book." -ForegroundColor Red
        }
    }
    
    "6" {
        Write-Host "`nChecking server status..." -ForegroundColor Yellow
        if (Test-Server) {
            Write-Host "✓ Mock server is running on port 5000" -ForegroundColor Green
        } else {
            Write-Host "✗ Mock server is NOT running" -ForegroundColor Red
            Write-Host "  Start it with: node server/mock-server.cjs" -ForegroundColor Yellow
        }
    }
    
    "0" {
        Write-Host "`nExiting..." -ForegroundColor Yellow
    }
    
    default {
        Write-Host "`nInvalid choice!" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Done!" -ForegroundColor Cyan
