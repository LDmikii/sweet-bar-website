$root = Split-Path -Parent $PSScriptRoot
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8642/")
$listener.Start()
Write-Host "Serving $root at http://localhost:8642/"
$mime = @{ ".html"="text/html"; ".css"="text/css"; ".js"="application/javascript"; ".png"="image/png"; ".jpg"="image/jpeg"; ".svg"="image/svg+xml"; ".ico"="image/x-icon"; ".webmanifest"="application/manifest+json" }
while ($listener.IsListening) {
  $ctx = $listener.GetContext()
  $path = $ctx.Request.Url.AbsolutePath
  if ($path -eq "/") { $path = "/index.html" }
  $file = Join-Path $root ($path.TrimStart("/") -replace "/", "\")
  if (Test-Path $file -PathType Leaf) {
    $bytes = [System.IO.File]::ReadAllBytes($file)
    $ext = [System.IO.Path]::GetExtension($file).ToLower()
    if ($mime.ContainsKey($ext)) { $ctx.Response.ContentType = $mime[$ext] }
    $ctx.Response.OutputStream.Write($bytes, 0, $bytes.Length)
  } else {
    $ctx.Response.StatusCode = 404
    $msg = [System.Text.Encoding]::UTF8.GetBytes("Not found")
    $ctx.Response.OutputStream.Write($msg, 0, $msg.Length)
  }
  $ctx.Response.Close()
}
