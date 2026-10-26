#!/usr/bin/env sh
# Installs or updates the Northstar skill for Claude Code (~/.claude/skills)
# and for Codex, OpenCode and OMP (~/.agents/skills).
# From a clone: ./install.sh
# Remote:       curl -fsSL https://raw.githubusercontent.com/joebenberry-afk/northstar/main/install.sh | sh
set -eu

here=$(cd "$(dirname "$0")" 2>/dev/null && pwd || true)
if [ -f "$here/northstar/SKILL.md" ]; then
  src="$here/northstar"
else
  tmp=$(mktemp -d)
  curl -fsSL https://github.com/joebenberry-afk/northstar/archive/refs/heads/main.tar.gz | tar -xz -C "$tmp"
  src="$tmp/northstar-main/northstar"
fi

for dest in "$HOME/.claude/skills/northstar" "$HOME/.agents/skills/northstar"; do
  rm -rf "$dest"
  mkdir -p "$(dirname "$dest")"
  cp -R "$src" "$dest"
  echo "Installed $dest"
done
