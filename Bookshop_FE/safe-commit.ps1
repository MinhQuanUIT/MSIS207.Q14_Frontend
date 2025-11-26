# Safe Git Commit Script for PowerShell
# Sử dụng: .\safe-commit.ps1 "commit message"

param(
    [Parameter(Mandatory=$true)]
    [string]$Message
)

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  Safe Git Workflow - TiQiShop Bookstore" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check git status
Write-Host "1. Checking git status..." -ForegroundColor Yellow
git status
Write-Host ""

# Step 2: Confirm changes
$confirm = Read-Host "Do you want to continue? (y/n)"
if ($confirm -ne 'y') {
    Write-Host "Aborted by user." -ForegroundColor Red
    exit
}

# Step 3: Pull latest changes
Write-Host ""
Write-Host "2. Pulling latest changes from remote..." -ForegroundColor Yellow
git pull origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "⚠️  CONFLICT DETECTED!" -ForegroundColor Red
    Write-Host "Please resolve conflicts manually:" -ForegroundColor Yellow
    Write-Host "  1. Run: git status" -ForegroundColor White
    Write-Host "  2. Edit conflicted files (look for <<<<<<, ======, >>>>>>)" -ForegroundColor White
    Write-Host "  3. After fixing, run: git add ." -ForegroundColor White
    Write-Host "  4. Then run: git commit -m 'Resolve merge conflicts'" -ForegroundColor White
    Write-Host "  5. Finally: git push origin main" -ForegroundColor White
    exit 1
}

# Step 4: Stage changes
Write-Host ""
Write-Host "3. Staging all changes..." -ForegroundColor Yellow
git add .

# Step 5: Commit
Write-Host ""
Write-Host "4. Committing with message: '$Message'..." -ForegroundColor Yellow
git commit -m $Message

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "⚠️  Commit failed! Check error messages above." -ForegroundColor Red
    exit 1
}

# Step 6: Push
Write-Host ""
Write-Host "5. Pushing to remote..." -ForegroundColor Yellow
git push origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "⚠️  Push failed!" -ForegroundColor Red
    Write-Host "Possible reasons:" -ForegroundColor Yellow
    Write-Host "  - Remote has new commits (run: git pull)" -ForegroundColor White
    Write-Host "  - No internet connection" -ForegroundColor White
    Write-Host "  - Authentication failed" -ForegroundColor White
    exit 1
}

# Success
Write-Host ""
Write-Host "==================================================" -ForegroundColor Green
Write-Host "  ✓ Success! Changes pushed to GitHub" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Check your repository at:" -ForegroundColor Cyan
Write-Host "https://github.com/MinhQuanUIT/MSIS207.Q14_Frontend" -ForegroundColor White
