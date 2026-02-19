#!/usr/bin/env pwsh
# Validates a Cloudbeds API key (cbat_...) against PMS API endpoints.
#
# Usage:
#   pwsh scripts/cloudbeds/test-cloudbeds-apikey.ps1 -ApiKey "cbat_..."
#   pwsh scripts/cloudbeds/test-cloudbeds-apikey.ps1   # reads CLOUDBEDS_API_KEY / CLOUDBEDS_ACCESS_TOKEN from .env
#
# Notes:
# - Prefer copy/paste the key as plain text (not OCR) to avoid ambiguous characters.
# - Base URL default matches Cloudbeds docs for PMS API.

param(
  [string]$ApiKey = "",
  [string]$BaseUrl = "https://hotels.cloudbeds.com/api/v1.2"
)

$ErrorActionPreference = "Stop"

function Read-EnvValue([string]$path, [string]$name) {
  if (-not (Test-Path $path)) { return "" }
  $line = Get-Content $path | Where-Object { $_ -match ("^" + [Regex]::Escape($name) + "=") } | Select-Object -First 1
  if (-not $line) { return "" }
  return ($line.Substring(($name + "=").Length)).Trim().Trim('"')
}

# Resolve key from args or local .env
if ($ApiKey -eq "") {
  $envFile = Join-Path (Get-Location) ".env"
  $ApiKey = Read-EnvValue $envFile "CLOUDBEDS_API_KEY"
  if ($ApiKey -eq "") {
    $ApiKey = Read-EnvValue $envFile "CLOUDBEDS_ACCESS_TOKEN"
  }
}

if ($ApiKey -eq "") {
  Write-Host "ERRO: Nenhuma API Key fornecida." -ForegroundColor Red
  Write-Host "Uso: pwsh scripts/cloudbeds/test-cloudbeds-apikey.ps1 -ApiKey 'cbat_...'"
  exit 1
}

Write-Host "=== Cloudbeds API Key Validation ===" -ForegroundColor Cyan
Write-Host ("BaseUrl: {0}" -f $BaseUrl) -ForegroundColor Gray
Write-Host ("Key:     {0}..." -f $ApiKey.Substring(0, [Math]::Min(12, $ApiKey.Length))) -ForegroundColor Gray
Write-Host ""

function Invoke-Test([string]$label, [string]$url, [hashtable]$headers) {
  Write-Host $label -ForegroundColor Yellow
  try {
    $resp = Invoke-WebRequest -Uri $url -Headers $headers -Method GET -ErrorAction Stop
    Write-Host ("  OK (HTTP {0})" -f $resp.StatusCode) -ForegroundColor Green
    return $true
  } catch {
    $status = "N/A"
    $rid = ""
    if ($_.Exception.Response) {
      try { $status = [int]$_.Exception.Response.StatusCode } catch {}
      try { $rid = $_.Exception.Response.Headers["X-Request-ID"] } catch {}
      if (-not $rid) { try { $rid = $_.Exception.Response.Headers["X-Kong-Request-Id"] } catch {} }
    }
    Write-Host ("  FAIL (HTTP {0}) {1}" -f $status, $_.Exception.Message) -ForegroundColor Red
    if ($rid) { Write-Host ("  Request-ID: {0}" -f $rid) -ForegroundColor DarkGray }
    return $false
  }
}

$ok1 = Invoke-Test "[1/3] getHotels (Authorization: Bearer)" "$BaseUrl/getHotels" @{ Authorization = "Bearer $ApiKey" }
$ok2 = Invoke-Test "[2/3] getHotels (x-api-key)" "$BaseUrl/getHotels" @{ "x-api-key" = "$ApiKey" }

$start = (Get-Date).AddDays(30).ToString("yyyy-MM-dd")
$end = (Get-Date).AddDays(32).ToString("yyyy-MM-dd")
$ok3 = Invoke-Test "[3/3] getAvailableRoomTypes (smoke)" "$BaseUrl/getAvailableRoomTypes?startDate=$start&endDate=$end&rooms=1&adults=2&children=0" @{ Authorization = "Bearer $ApiKey" }

Write-Host ""
if ($ok1 -and $ok2 -and $ok3) {
  Write-Host "=== OK: chave validada ===" -ForegroundColor Green
  exit 0
}

Write-Host "=== ATENCAO: falhou ===" -ForegroundColor DarkYellow
Write-Host "Se todos retornarem 401, a chave nao esta sendo aceita (invalida / nao ativada / recortada errado)." -ForegroundColor Gray
exit 2

