---
name: driverjs-demo
description: >
  Generates self-contained interactive HTML demos using Driver.js for product
  tours, onboarding walkthroughs, feature spotlights, form guidance, and
  interactive tutorials. Use when the user asks for a guided tour, product
  walkthrough, feature highlight, onboarding flow, contextual help overlay,
  or any interactive demo with Driver.js. Produces a single .html file that
  runs in any browser without a build step.
license: MIT
compatibility: >
  Works in any environment with filesystem write access. Output is a
  standalone HTML file — no runtime dependencies, no build step, no npm.
  CDN-loaded Driver.js (~5kb). Tested in Chrome, Firefox, Safari, Edge.
metadata:
  version: "1.0.0"
  author: "driverjs-demo contributors"
  tags: "driver.js product-tour onboarding interactive-demo walkthrough"
  category: "frontend"
allowed-tools: Read Write Bash
---

# Driver.js Interactive Demo Generator

Generate self-contained HTML demos using [Driver.js](https://driverjs.com) (~5kb, no dependencies, MIT).

## When to use

- Product tour or onboarding walkthrough
- Feature spotlight or "What's New" flow
- Interactive tutorial (hands-on, user performs actions)
- Form guidance (field-by-field with validation hints)
- Contextual help overlays on an existing UI

## Output contract

Produce a **single `.html` file** containing:

1. Driver.js via CDN (no npm, no build step)
2. All CSS in a `<style>` block
3. All JS in a `<script>` block at end of `<body>`
4. A mock UI if the user does not provide one
5. A floating 🦊 button to restart the tour

## CDN setup

```html
<script src="https://cdn.jsdelivr.net/npm/driver.js@latest/dist/driver.js.iife.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/driver.js@latest/dist/driver.css" />
```

Access globals:

```javascript
const driver = window.driver.js.driver;  // Tour API
const hints  = window.driverHints.hints; // Hints API (separate CDN)
```

For hints, add:

```html
<script src="https://cdn.jsdelivr.net/npm/driver.js@latest/dist/hints.iife.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/driver.js@latest/dist/hints.css" />
```

## Workflow

1. Determine demo type from user request (tour / spotlight / form / interactive / hints).
2. Read the matching template from `assets/` for step patterns and default config.
3. Build a mock UI (sidebar + topbar + content) unless the user supplies HTML.
4. Pick a theme from `references/cheatsheet.md` § Themes or ask the user.
5. Assemble the single HTML file: CDN tags → `<style>` → body HTML → `<script>`.
6. Write the file to workspace and present it.

## Demo types

### Product Tour

Step-by-step walkthrough of a UI. Best for onboarding.

```
driver({ showProgress: true, steps: [...] }).drive();
```

Key options: `animate`, `smoothScroll`, `showProgress`, `overlayOpacity`, `nextBtnText`, `doneBtnText`.

Pattern: see `assets/product-tour.js`.

### Feature Spotlight

Highlight new features with light overlay on dark UI.

```
driver({ overlayColor: '#fff', overlayOpacity: 0.15, steps: [...] }).drive();
```

Pattern: see `assets/feature-hints.js`.

### Form Guidance

Guide users field-by-field. Use `disableActiveInteraction: false` so they can type.

```
{ element: '#email', popover: {...}, disableActiveInteraction: false }
```

Pattern: see `assets/form-guidance.js`.

### Interactive Tutorial

User performs actions before the tour advances.

```
{ element: '#btn', popover: {...}, advanceOnClick: true }
{ element: '#modal', popover: {...}, waitForElement: 3000 }
```

Pattern: see `assets/interactive-tour.js`.

### Feature Hints (beacons)

Persistent beacons, not a linear tour. Separate API.

```javascript
const h = hints({ hints: [{ element: '#btn', popover: { title: 'T', description: 'D' } }] });
h.show();
```

## Step options reference

| Option | Type | Default | Purpose |
|---|---|---|---|
| `element` | `string` | — | CSS selector |
| `popover.title` | `string` | — | Title (HTML ok) |
| `popover.description` | `string` | — | Body (HTML ok) |
| `popover.side` | `string` | `bottom` | `top` / `right` / `bottom` / `left` |
| `popover.align` | `string` | `start` | `start` / `center` / `end` |
| `advanceOnClick` | `bool` | `false` | Advance on element click |
| `disableActiveInteraction` | `bool` | `false` | Block interaction with element |
| `waitForElement` | `number` | `0` | Wait ms for dynamic element |
| `skipMissingElement` | `bool` | `false` | Skip if element missing |

## Driver-level options

| Option | Default | Use |
|---|---|---|
| `animate` | `true` | Transition animation |
| `overlayColor` | `black` | Overlay color |
| `overlayOpacity` | `0.5` | Overlay opacity |
| `allowClose` | `true` | Close on backdrop click |
| `showProgress` | `false` | "X of Y" text |
| `smoothScroll` | `false` | Smooth scroll |
| `stagePadding` | `10` | Padding around cutout |
| `stageRadius` | `5` | Cutout radius |
| `showButtons` | `next,prev,close` | Visible buttons |
| `nextBtnText` | `Next` | Next label |
| `prevBtnText` | `Previous` | Prev label |
| `doneBtnText` | `Done` | Last-step label |

## Hooks

```javascript
onHighlightStarted, onHighlighted, onDeselected, onReset,
onDestroyStarted, onDestroyed, onNextClick, onPrevClick,
onCloseClick, onPopoverRender
```

## API methods

```javascript
tour.drive() / .drive(n)  // start at step 0 or n
tour.moveNext() / .movePrevious() / .moveTo(n)
tour.hasNextStep() / .hasPreviousStep()
tour.isFirstStep() / .isLastStep()
tour.getActiveIndex() / .getActiveStep() / .getActiveElement()
tour.isActive() / .refresh() / .destroy()
tour.getConfig() / .setConfig({}) / .setSteps([])
```

## Best practices

1. Use `#id` selectors over `.class` for reliability.
2. Set `showProgress: true` on tours with 3+ steps.
3. Use `allowClose: false` for mandatory onboarding.
4. Use `smoothScroll: true` when steps are far apart.
5. Use `popover.side` to avoid overlapping page edges.
6. Keep descriptions to 1–2 sentences per step.
7. Use `onPopoverRender` to inject images/videos into popovers.
8. For dark UIs: `overlayColor: 'white'`, `overlayOpacity: 0.15`.
9. Use `advanceOnClick` + `waitForElement` for interactive tutorials.
10. Show tour only once with `localStorage`.

## Themes

See `references/cheatsheet.md` for 7 ready-made themes (light, dark, ocean, sunset, cyberpunk, mint, mono) with CSS variables and Driver.js config.

## Examples

Pre-built demos in the workspace (open any `.html` file in a browser):

| File | Type |
|---|---|
| `references/examples/01-basic-tour.html` | Simple product tour |
| `references/examples/02-saas-dashboard.html` | Full SaaS dashboard tour |
| `references/examples/03-form-wizard.html` | Dark-mode form guidance |
| `references/examples/04-feature-spotlight.html` | Feature spotlight with beacons |
| `references/examples/05-interactive-tutorial.html` | Hands-on todo tutorial |

## Edge cases

- Element not found → centered popover (no element). Use `skipMissingElement: true` to auto-skip.
- Dynamic content → `waitForElement: 5000` waits up to 5s.
- Multiple tours on same page → each `driver()` call is independent.
- Mobile → Driver.js is responsive, but verify popover positioning.
