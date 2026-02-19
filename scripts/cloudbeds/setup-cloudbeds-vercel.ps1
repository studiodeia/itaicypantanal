#!/usr/bin/env pwsh
# Sets Cloudbeds env vars in Vercel for API Key mode (cbat_...).
#
# Usage:
#   pwsh scripts/cloudbeds/setup-cloudbeds-vercel.ps1 -ApiKey "cbat_..." [-BaseUrl "https://hotels.cloudbeds.com/api/v1.2"] [-SkipDeploy]
#
# Notes:
# - Uses a temp file without trailing newline to avoid Vercel CLI "Value contains newlines" warnings.

param(
  [Parameter(Mandatory = $true)]
  [string]$ApiKey,
  [string]$BaseUrl = "https://hotels.cloudbeds.com/api/v1.2",
  [switch]$SkipDeploy
)

$ErrorActionPreference = "Stop"

function Set-VercelEnv([string]$key, [string]$value, [string]$target, [switch]$Sensitive) {
  $tmpFile = [System.IO.Path]::GetTempFileName()
  try {
    # Write value without newline.
    [System.IO.File]::WriteAllText($tmpFile, $value, [System.Text.Encoding]::ASCII)
    $sensFlag = ""
    if ($Sensitive) { $sensFlag = "--sensitive" }
    cmd /c "vercel env add $key $target $sensFlag --yes --force < `"$tmpFile`"" 2>&1 | Out-Null
    Write-Host "  SET $key ($target)" -ForegroundColor Green
  } finally {
    Remove-Item $tmpFile -Force -ErrorAction SilentlyContinue
  }
}

Write-Host "=== Configurando Cloudbeds no Vercel (API Key mode) ===" -ForegroundColor Cyan
Write-Host ""

foreach ($target in @("preview", "production")) {
  Write-Host "[$target]" -ForegroundColor Yellow
  Set-VercelEnv "CLOUDBEDS_ENABLED" "true" $target
  Set-VercelEnv "CLOUDBEDS_API_BASE_URL" $BaseUrl $target
  Set-VercelEnv "CLOUDBEDS_API_KEY" $ApiKey $target -Sensitive
  Write-Host ""
}

if (-not $SkipDeploy) {
  Write-Host "=== Deploy preview ===" -ForegroundColor Cyan
  vercel --yes | Out-Null
  Write-Host "Preview deploy enviado." -ForegroundColor Green

  Write-Host "=== Deploy production ===" -ForegroundColor Cyan
  vercel --prod --yes | Out-Null
  Write-Host "Production deploy enviado." -ForegroundColor Green
}

