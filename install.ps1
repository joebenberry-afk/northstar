# Installs or updates the Northstar skill for Claude Code (~/.claude/skills)
# and for Codex, OpenCode and OMP (~/.agents/skills).
# From a clone: ./install.ps1
# Remote:       irm https://raw.githubusercontent.com/joebenberry-afk/northstar/main/install.ps1 | iex
$ErrorActionPreference = 'Stop'

if ($PSScriptRoot -and (Test-Path (Join-Path $PSScriptRoot 'northstar/SKILL.md'))) {
    $src = Join-Path $PSScriptRoot 'northstar'
} else {
    $tmp = Join-Path ([IO.Path]::GetTempPath()) "northstar-$([guid]::NewGuid())"
    New-Item -ItemType Directory $tmp | Out-Null
    Invoke-WebRequest 'https://github.com/joebenberry-afk/northstar/archive/refs/heads/main.zip' -OutFile "$tmp/northstar.zip"
    Expand-Archive "$tmp/northstar.zip" $tmp
    $src = Join-Path $tmp 'northstar-main/northstar'
}

foreach ($dest in "$HOME/.claude/skills/northstar", "$HOME/.agents/skills/northstar") {
    if (Test-Path $dest) { Remove-Item -Recurse -Force $dest }
    New-Item -ItemType Directory -Force (Split-Path $dest) | Out-Null
    Copy-Item -Recurse $src $dest
    Write-Host "Installed $dest"
}
