# Apply SQL migration via Supabase Management API
# Requires SUPABASE_ACCESS_TOKEN in web/.env.local

param(
  [string]$MigrationFile = (Join-Path $PSScriptRoot "..\supabase\migrations\003_consultation_psychologists.sql"),
  [string]$ProjectRef = "rkwadduozdwwvtfxiyus"
)

$envFile = Join-Path $PSScriptRoot "..\web\.env.local"
$token = $null

if (Test-Path $envFile) {
  Get-Content $envFile | ForEach-Object {
    if ($_ -match '^SUPABASE_ACCESS_TOKEN=(.+)$') { $token = $matches[1].Trim() }
  }
}

if (-not $token) { $token = $env:SUPABASE_ACCESS_TOKEN }

if (-not $token) {
  Write-Host "SUPABASE_ACCESS_TOKEN manquant." -ForegroundColor Yellow
  Write-Host "Ajoutez-le dans web/.env.local puis relancez."
  exit 1
}

if (-not (Test-Path $MigrationFile)) {
  Write-Host "Fichier introuvable: $MigrationFile" -ForegroundColor Red
  exit 1
}

$sql = Get-Content $MigrationFile -Raw
$body = @{ query = $sql } | ConvertTo-Json -Depth 5
$headers = @{
  Authorization = "Bearer $token"
  "Content-Type" = "application/json"
}

try {
  $response = Invoke-RestMethod `
    -Method POST `
    -Uri "https://api.supabase.com/v1/projects/$ProjectRef/database/query" `
    -Headers $headers `
    -Body $body

  Write-Host "Migration appliquee avec succes!" -ForegroundColor Green
  if ($response) { $response | ConvertTo-Json -Depth 5 }
} catch {
  Write-Host "Erreur: $($_.Exception.Message)" -ForegroundColor Red
  if ($_.ErrorDetails.Message) { Write-Host $_.ErrorDetails.Message }
  exit 1
}
