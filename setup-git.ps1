# Git Remote Setup Script
# Replace YOUR_USERNAME and REPO_NAME with your actual values

Write-Host "Setting up Git remote..." -ForegroundColor Green
Write-Host ""
Write-Host "Please provide:" -ForegroundColor Yellow
Write-Host "1. Your GitHub username"
Write-Host "2. Repository name (or we'll create one)"
Write-Host ""

$username = Read-Host "Enter your GitHub username"
$repoName = Read-Host "Enter repository name (e.g., hotel-resort-management)"

if ($username -and $repoName) {
    $remoteUrl = "https://github.com/$username/$repoName.git"
    Write-Host ""
    Write-Host "Adding remote: $remoteUrl" -ForegroundColor Cyan
    git remote add origin $remoteUrl
    Write-Host ""
    Write-Host "Remote added successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Make sure the repository exists on GitHub"
    Write-Host "2. Run: git push -u origin main"
} else {
    Write-Host "Username and repository name are required!" -ForegroundColor Red
}

