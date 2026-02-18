param(
  [Parameter(Mandatory = $true)]
  [string]$ZoneId,
  [Parameter(Mandatory = $true)]
  [string]$ApiToken,
  [string]$Domain = "itaicypantanal.com.br",
  [string]$TargetIp = "76.76.21.21"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$baseUrl = "https://api.cloudflare.com/client/v4/zones/$ZoneId/dns_records"
$headers = @{
  Authorization = "Bearer $ApiToken"
  "Content-Type" = "application/json"
}

function Get-Record([string]$type, [string]$name) {
  $url = "${baseUrl}?type=$type&name=$name&per_page=100"
  $response = Invoke-RestMethod -Method Get -Uri $url -Headers $headers
  if (-not $response.success) {
    throw "Cloudflare API error while listing records for $name"
  }
  return @($response.result)
}

function Upsert-ARecord([string]$name, [string]$ip) {
  $existing = @(Get-Record -type "A" -name $name)

  if ($existing.Count -eq 0) {
    $payload = @{
      type    = "A"
      name    = $name
      content = $ip
      ttl     = 1
      proxied = $false
      comment = "Managed by script configure-cloudflare-vercel-dns.ps1"
    } | ConvertTo-Json -Depth 5

    $created = Invoke-RestMethod -Method Post -Uri $baseUrl -Headers $headers -Body $payload
    if (-not $created.success) {
      throw "Failed to create record $name"
    }
    Write-Output "Created A $name -> $ip"
    return
  }

  $first = $existing[0]
  $needsUpdate = ($first.content -ne $ip) -or ($first.proxied -ne $false)
  if (-not $needsUpdate) {
    Write-Output "No change needed for A $name ($ip)"
    return
  }

  $updatePayload = @{
    type    = "A"
    name    = $name
    content = $ip
    ttl     = 1
    proxied = $false
    comment = "Managed by script configure-cloudflare-vercel-dns.ps1"
  } | ConvertTo-Json -Depth 5

  $updateUrl = "$baseUrl/$($first.id)"
  $updated = Invoke-RestMethod -Method Put -Uri $updateUrl -Headers $headers -Body $updatePayload
  if (-not $updated.success) {
    throw "Failed to update record $name"
  }
  Write-Output "Updated A $name -> $ip"
}

Upsert-ARecord -name $Domain -ip $TargetIp
Upsert-ARecord -name "www.$Domain" -ip $TargetIp

Write-Output "Done. Cloudflare DNS records configured for $Domain and www.$Domain"
