# UI Features Reference

All UI behavior lives in `wwwroot/js/ui.js` and `wwwroot/css/app.css`.

---

## Scroll Reveal Animations

Elements with the `reveal` CSS class fade in and slide up (32px) when they enter the viewport.

**How it works:** `IntersectionObserver` with `threshold: 0.08` watches `.reveal` elements. When 8% of the element is visible, it adds the `visible` class, triggering the CSS transition.

**Usage in Razor:**
```html
<div class="custom-glass-pane reveal">...</div>
```

**CSS:**
```css
body.js-enabled .reveal { opacity: 0; transform: translateY(32px); transition: ... }
body.js-enabled .reveal.visible { opacity: 1; transform: translateY(0); }
```

The `body.js-enabled` guard means elements are visible if JavaScript hasn't run (progressive enhancement — no flicker on slow connections).

---

## Taglist Stagger Animation

Elements with the CSS class `taglist` have their child `<span>` elements stagger in one-by-one when the list scrolls into view.

Delays are applied via `nth-child` rules (0.03s increments, up to 20 items). Items 21+ appear simultaneously with item 20's delay.

---

## Scroll-Spy Navigation

The active nav link is highlighted based on which section is currently most visible in the viewport.

**How it works:** `IntersectionObserver` with `rootMargin: '-10% 0px -60% 0px'` watches all `section[id]` elements. When a section enters the middle band of the viewport, the corresponding `#header a[href="#id"]` gets the `.active` class.

The observer is initialized in the `MutationObserver` callback so it runs after Blazor finishes rendering the section components.

---

## Scroll Progress Bar

A 2px gradient line at the very top of the viewport (`position: fixed; top: 0; z-index: 9999`) fills from left to right as the user scrolls. Width is `(scrollY / totalScrollHeight) * 100%`.

---

## Back-to-Top Button

A circular glassmorphic button (bottom-right, `position: fixed`) fades in after 400px of scroll. Clicking it calls `window.scrollTo({ top: 0, behavior: 'smooth' })`.

---

## Parallax Hero

On scroll, the hero background image is translated upward at 18% of the scroll offset:

```javascript
hero.style.transform = `translateY(${window.scrollY * 0.18}px)`;
```

This runs only while `scrollY < window.innerHeight * 1.2` (once the hero is off screen, movement stops).

---

## Animated Stat Counters

Elements with a `data-count="N"` attribute count up from 0 to N using a cubic ease-out animation (1 second). Triggered by `IntersectionObserver` at `threshold: 0.6` — the counter starts when 60% of the element is visible.

**Usage:**
```html
<span class="perf-stat__number" data-count="34">34</span>
```

---

## Album Card Hover Overlay

Each album card (`.albums__glass-pane`) has a `.album-cover-wrapper` around the image. On hover:
- Image scales to 106%
- Dark overlay fades in
- External link SVG icon appears (links to Amazon in a new tab)

---

## Gallery Lightbox

Managed entirely in Blazor C# state (`lightboxOpen`, `currentIdx`). When a photo is clicked, `OpenLightbox(idx)` sets state and calls `lightboxRef.FocusAsync()` after a 50ms delay so keyboard events work immediately.

Keyboard handler:
```csharp
private void HandleKey(KeyboardEventArgs e)
{
    if (e.Key == "Escape")      CloseLightbox();
    else if (e.Key == "ArrowLeft")  PrevPhoto();
    else if (e.Key == "ArrowRight") NextPhoto();
}
```

---

## Glass Morphism Cards

Glass panes use:
```css
background-color: var(--surface-color);
backdrop-filter: blur(8px);
border: 1px solid var(--border-color);
box-shadow: 0 4px 24px rgba(0,0,0,0.25), 0 0 0 1px var(--glow-color) inset;
```

Hover lifts the card:
```css
transform: translateY(-3px);
box-shadow: 0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px var(--accent-color) inset;
```

---

## Theme System

See [`themes.md`](themes.md) for full documentation. In brief: the `data-theme` attribute on `<html>` switches a set of CSS custom properties. The selected theme is saved to `localStorage` via `theme.js` and restored on every page load.

---

## Developer-Site Cross-Link

Two entry points link to `dougrosenbergdev.com`:

1. **Nav pill** — "dev site ↗" button at the far right of the navigation bar, styled with a pill border in the accent color. Fills on hover.

2. **Footer card** — an inline-flex card labeled "developer portfolio / dougrosenbergdev.com ↗" that lifts on hover. Sits just above the copyright line.

Both open in a new tab (`target="_blank" rel="noopener noreferrer"`).
