# Contributing to driverjs-demo

Thanks for your interest in contributing! Every contribution matters — from fixing a typo to adding a new tour pattern.

## Quick Ways to Contribute

### 🟢 Good First Issues

Look for issues labeled [`good first issue`](../../labels/good%20first%20issue). These are perfect for first-time contributors:

- Add a new theme to `scripts/build.js`
- Fix a typo in the docs
- Add an example to `references/examples/`
- Improve a step description in `assets/`

### 🎨 Add a Theme

1. Edit `references/cheatsheet.md` — add CSS variables + Driver.js overlay config
2. Edit `scripts/build.js` — add entry to the `themes` object
3. Test with `node scripts/build.js --type tour --theme yourtheme`
4. Open a PR with a screenshot

### 🧩 Add a Tour Pattern

1. Create `assets/your-pattern.js` — export a function that returns a Driver.js `steps` array
2. Update `SKILL.md` — add the pattern to the "Demo types" section
3. Add an example HTML in `references/examples/`
4. Open a PR

### 🤖 Add Agent-Specific Config

If your agent supports a sidecar config (e.g. `agents/openai.yaml` for Codex), add it alongside `SKILL.md`. The standard skill must always work standalone.

## Development

```bash
# Test the CLI builder
node scripts/build.js --type tour --theme dark --output test.html

# Test with different types
node scripts/build.js --type form --theme cyberpunk --output test-form.html
node scripts/build.js --type spotlight --theme ocean --output test-spotlight.html
node scripts/build.js --type interactive --theme light --output test-interactive.html
```

## Guidelines

- **One PR per feature** — keep changes focused
- **Test your output** — open the generated HTML in a browser before submitting
- **Follow the existing style** — look at existing themes/patterns for reference
- **Update the README** — if you add a new pattern or theme, update the relevant sections

## Questions?

Open a [Discussion](../../discussions) — we're happy to help!
