#!/bin/bash
# Install driverjs-demo skill across all compatible AI agents.
#
# Usage:
#   ./scripts/install.sh          # project-level install
#   ./scripts/install.sh --global # global install (~)
#
# One copy, every agent. Uses symlinks to avoid duplication.

set -e

SKILL="driverjs-demo"
SRC="$(cd "$(dirname "$0")/.." && pwd)"
MODE="${1:-project}"

echo "🦊 Installing $SKILL skill..."
echo "   Source: $SRC"
echo "   Mode:   $MODE"
echo ""

install_link() {
  local target_dir="$1"
  local label="$2"

  mkdir -p "$target_dir" 2>/dev/null || true
  local dest="$target_dir/$SKILL"

  if [ -L "$dest" ]; then
    echo "   ⏭️  $label — already linked"
  elif [ -d "$dest" ]; then
    echo "   ⏭️  $label — already exists"
  else
    ln -sfn "$SRC" "$dest" 2>/dev/null || cp -r "$SRC" "$dest"
    echo "   ✅ $label"
  fi
}

if [ "$MODE" = "--global" ]; then
  echo "📍 Global install (~)..."
  install_link "$HOME/.claude/skills"    "Claude Code"
  install_link "$HOME/.codex/skills"     "Codex CLI"
  install_link "$HOME/.agents/skills"    "Agents (shared)"
  install_link "$HOME/.gemini/skills"    "Gemini CLI"
  install_link "$HOME/.openclaw/skills"  "OpenClaw"
  install_link "$HOME/.cursor/skills"    "Cursor"
  install_link "$HOME/.cline/skills"     "Cline"
else
  echo "📍 Project-level install..."
  install_link ".claude/skills"    "Claude Code"
  install_link ".codex/skills"     "Codex CLI"
  install_link ".agents/skills"    "Agents (shared)"
  install_link ".gemini/skills"    "Gemini CLI"
  install_link ".cursor/skills"    "Cursor"
  install_link ".cline/skills"     "Cline"
  install_link ".openclaw/skills"  "OpenClaw"
fi

echo ""
echo "🎉 Done! Restart your agent session to discover the skill."
echo ""
echo "Try asking your agent:"
echo "  → \"Create a product tour for my dashboard with a dark theme\""
echo "  → \"Generate a signup form walkthrough\""
echo "  → \"Make a What's New feature spotlight\""
