# Configure Supabase Auth URLs for ngrok tunnel
# Requires SUPABASE_ACCESS_TOKEN in web/.env.local (https://supabase.com/dashboard/account/tokens)

param(
  [string]$NgrokUrl = "https://mardi-policy-name.ngrok-free.dev",
  [string]$ProjectRef = "rkwadduozdwwvtfxiyus"
)

$envFile = Join-Path $PSScriptRoot "..\web\.env.local"
$token = $null

if (Test-Path $envFile) {
  Get-Content $envFile | ForEach-Object {
    if ($_ -match '^SUPABASE_ACCESS_TOKEN=(.+)$') { $token = $matches[1].Trim() }
  }
}

if (-not $token) {
  $token = $env:SUPABASE_ACCESS_TOKEN
}

if (-not $token) {
  Write-Host "SUPABASE_ACCESS_TOKEN manquant." -ForegroundColor Yellow
  Write-Host "1. Cree un token sur https://supabase.com/dashboard/account/tokens"
  Write-Host "2. Ajoute dans web/.env.local : SUPABASE_ACCESS_TOKEN=sbp_..."
  Write-Host "3. Relance ce script"
  exit 1
}

$body = @{
  site_url       = $NgrokUrl
  uri_allow_list = "$NgrokUrl/**,http://localhost:3000/**,http://127.0.0.1:3000/**"
} | ConvertTo-Json

$headers = @{
  Authorization = "Bearer $token"
  "Content-Type" = "application/json"
}

try {
  $response = Invoke-RestMethod `
    -Method PATCH `
    -Uri "https://api.supabase.com/v1/projects/$ProjectRef/config/auth" `
    -Headers $headers `
    -Body $body

  Write-Host "Supabase Auth configure avec succes!" -ForegroundColor Green
  Write-Host "Site URL: $NgrokUrl"
  Write-Host "Redirect URLs: $NgrokUrl/**"
} catch {
  Write-Host "Erreur API Supabase: $($_.Exception.Message)" -ForegroundColor Red
  if ($_.ErrorDetails.Message) { Write-Host $_.ErrorDetails.Message }
  exit 1
}
