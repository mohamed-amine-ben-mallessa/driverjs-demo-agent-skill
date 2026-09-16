# Driver.js Cheatsheet

## CDN

```html
<script src="https://cdn.jsdelivr.net/npm/driver.js@latest/dist/driver.js.iife.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/driver.js@latest/dist/driver.css" />
<!-- Hints only -->
<script src="https://cdn.jsdelivr.net/npm/driver.js@latest/dist/hints.iife.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/driver.js@latest/dist/hints.css" />
```

## Globals (CDN)

```javascript
const driver = window.driver.js.driver;
const hints  = window.driverHints.hints;
```

## Minimal tour

```javascript
const tour = driver({
  showProgress: true,
  steps: [
    { element: '#el', popover: { title: 'T', description: 'D' } },
  ],
});
tour.drive();
```

## Single highlight

```javascript
driver().highlight({ element: '#el', popover: { title: 'T', description: 'D' } });
```

## Hints

```javascript
const h = hints({ hints: [{ element: '#btn', popover: { title: 'T', description: 'D' } }] });
h.show(); h.open('id'); h.dismiss('id'); h.restore('id'); h.hide();
```

## API

```javascript
tour.drive() / .drive(n)
tour.moveNext() / .movePrevious() / .moveTo(n)
tour.hasNextStep() / .hasPreviousStep()
tour.isFirstStep() / .isLastStep()
tour.getActiveIndex() / .getActiveStep() / .getActiveElement()
tour.isActive() / .refresh() / .destroy()
```

## Hooks

```
onHighlightStarted  onHighlighted  onDeselected  onReset
onDestroyStarted    onDestroyed    onNextClick   onPrevClick
onCloseClick        onPopoverRender
```

## Themes

### light
```css
--color-bg: #f8fafc; --surface: #fff; --border: #e2e8f0;
--text: #1e293b; --muted: #64748b; --primary: #3b82f6;
```
```js
{ overlayColor: '#0f172a', overlayOpacity: 0.6 }
```

### dark
```css
--color-bg: #0f172a; --surface: #1e293b; --border: #334155;
--text: #f1f5f9; --muted: #94a3b8; --primary: #3b82f6;
```
```js
{ overlayColor: '#020617', overlayOpacity: 0.85 }
```
```css
/* Popover overrides */
.driver-popover { background: #1e293b !important; color: #f1f5f9 !important; border: 1px solid #334155 !important; }
.driver-popover-title { color: #f8fafc !important; }
.driver-popover-description { color: #cbd5e1 !important; }
.driver-popover-next-btn { background: #3b82f6 !important; color: white !important; }
```

### ocean
```css
--color-bg: #ecfeff; --surface: #fff; --border: #a5f3fc;
--text: #164e63; --muted: #0e7490; --primary: #06b6d4;
```
```js
{ overlayColor: '#164e63', overlayOpacity: 0.6 }
```

### sunset
```css
--color-bg: #fefce8; --surface: #fff; --border: #fde68a;
--text: #451a03; --muted: #92400e; --primary: #f59e0b;
```
```js
{ overlayColor: '#451a03', overlayOpacity: 0.65 }
```

### cyberpunk
```css
--color-bg: #0a0a0f; --surface: #12121a; --border: #2a2a3e;
--text: #e0e0ff; --muted: #8888aa; --primary: #ff006e;
```
```js
{ overlayColor: '#000', overlayOpacity: 0.9 }
```
```css
.driver-popover { border: 1px solid #ff006e !important; box-shadow: 0 0 30px rgba(255,0,110,0.3) !important; }
.driver-popover-title { color: #ff006e !important; }
.driver-popover-next-btn { background: linear-gradient(135deg,#ff006e,#00f5d4) !important; color: #0a0a0f !important; }
```

### mint
```css
--color-bg: #f0fdf4; --surface: #fff; --border: #bbf7d0;
--text: #14532d; --muted: #16a34a; --primary: #22c55e;
```

### mono
```css
--color-bg: #fafafa; --surface: #fff; --border: #e5e5e5;
--text: #171717; --muted: #737373; --primary: #171717;
```
```js
{ overlayOpacity: 0.7, stageRadius: 2 }
```

## Show tour only once

```javascript
if (!localStorage.getItem('tourDone')) {
  const tour = driver({
    onDestroyed: () => localStorage.setItem('tourDone', '1'),
    steps: [...],
  });
  tour.drive();
}
```
