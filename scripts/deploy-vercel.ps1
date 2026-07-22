# Déploiement GoSanté sur Vercel (plan Hobby gratuit)
# Usage: powershell -ExecutionPolicy Bypass -File scripts\deploy-vercel.ps1

$ErrorActionPreference = "Stop"
$WebRoot = Join-Path $PSScriptRoot "..\web"
Set-Location $WebRoot

Write-Host "=== GoSanté → Vercel ===" -ForegroundColor Cyan

# 1. Connexion Vercel (ouvre le navigateur si nécessaire)
Write-Host "`n1. Connexion Vercel..."
npx vercel whoami 2>$null
if ($LASTEXITCODE -ne 0) {
    npx vercel login
}

# 2. Lier le projet (première fois)
if (-not (Test-Path ".vercel\project.json")) {
    Write-Host "`n2. Liaison du projet Vercel..."
    npx vercel link --yes
}

# 3. Variables d'environnement depuis .env.local
Write-Host "`n3. Variables d'environnement..."
$envFile = Join-Path $WebRoot ".env.local"
if (-not (Test-Path $envFile)) {
    Write-Host "ERREUR: .env.local introuvable" -ForegroundColor Red
    exit 1
}

$vars = @{}
Get-Content $envFile | ForEach-Object {
    if ($_ -match '^\s*#' -or $_ -match '^\s*$') { return }
    if ($_ -match '^([^=]+)=(.*)$') {
        $vars[$matches[1].Trim()] = $matches[2].Trim()
    }
}

# NEXT_PUBLIC_SITE_URL sera mis à jour après le 1er déploiement
$required = @(
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "GENIUSPAY_MODE",
    "GENIUSPAY_BASE_URL",
    "GENIUSPAY_API_KEY",
    "GENIUSPAY_API_SECRET",
    "GENIUSPAY_WEBHOOK_SECRET_SANDBOX",
    "GROQ_API_KEY",
    "GROQ_MODEL"
)

foreach ($name in $required) {
    if (-not $vars.ContainsKey($name)) {
        Write-Host "  AVERTISSEMENT: $name manquant dans .env.local" -ForegroundColor Yellow
        continue
    }
    $value = $vars[$name]
    Write-Host "  → $name"
    $value | npx vercel env add $name production --force 2>$null
    $value | npx vercel env add $name preview --force 2>$null
}

# Service role (webhook Genius Pay) — ajoutez manuellement si absent
if ($vars.ContainsKey("SUPABASE_SERVICE_ROLE_KEY")) {
    $vars["SUPABASE_SERVICE_ROLE_KEY"] | npx vercel env add SUPABASE_SERVICE_ROLE_KEY production --force 2>$null
} else {
    Write-Host "`n  IMPORTANT: Ajoutez SUPABASE_SERVICE_ROLE_KEY dans Vercel (Supabase → Settings → API)" -ForegroundColor Yellow
}

# 4. Build local (vérification)
Write-Host "`n4. Build de vérification..."
npm run build
if ($LASTEXITCODE -ne 0) { exit 1 }

# 5. Déploiement production
Write-Host "`n5. Déploiement production..."
npx vercel --prod --yes

Write-Host "`n=== Terminé ===" -ForegroundColor Green
Write-Host @"

Prochaines étapes:
1. Copiez l'URL Vercel affichée (ex: https://gosante-xxx.vercel.app)
2. Vercel → Settings → Environment Variables → NEXT_PUBLIC_SITE_URL = cette URL
3. Supabase → Auth → URL Configuration:
   - Site URL: votre URL Vercel
   - Redirect URLs: https://votre-app.vercel.app/**
4. Genius Pay → Webhook: https://votre-app.vercel.app/api/webhooks/geniuspay
5. Redéployez: npx vercel --prod --yes

"@
