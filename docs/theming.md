# Theming System

## Overview

Themes are implemented entirely in CSS via custom properties (`--var`). Switching themes applies a `data-theme="name"` attribute to `<html>` and stores the choice in `localStorage`.

## Available Themes

| ID | Name | Style |
|----|------|-------|
| `dark` | Dark Modern | Warm dark browns, gold accent — **default** |
| `midnight` | Midnight | Pure black, neon green accent |
| `warm` | Warm Retro | Cream background, caramel accent — light |
| `minimal` | Minimal | White background, charcoal accent — light |
| `ocean` | Ocean | Deep navy, electric blue accent |
| `forest` | Forest | Dark green, sage accent |

## CSS Variables

All theme values are defined in `wwwroot/css/themes.css`. Each theme block overrides these variables:

| Variable | Purpose |
|----------|---------|
| `--bg-primary` | Main page background |
| `--bg-secondary` | Secondary/alternating background |
| `--surface-color` | Card/glass pane background |
| `--text-primary` | Body and heading text |
| `--text-secondary` | Subdued text, captions |
| `--accent-color` | Primary accent (borders, highlights, icons) |
| `--accent-light` | Lighter accent variant |
| `--border-color` | Card and divider borders |
| `--hover-color` | Hover/focus background fill |
| `--nav-bg` | Navigation bar background (semi-transparent) |
| `--nav-text` | Navigation link color |
| `--glow-color` | Inner box-shadow glow on cards |
| `--hero-overlay` | Gradient overlay on hero images |
| `--gradient-start/mid/end` | Animated gradient text colors |

## JavaScript API

`wwwroot/js/theme.js` exports three functions:

```js
initializeTheme()   // Called on page load — reads localStorage and applies stored theme
applyTheme(id)      // Sets data-theme attribute and saves to localStorage
getStoredTheme()    // Returns the stored theme ID (or "dark" default)
```

These are attached to `window` in `index.html` so Blazor components can call them via JSInterop.

## Adding a New Theme

1. Add a new block in `themes.css`:

```css
[data-theme="your-theme-id"] {
    --bg-primary: #...;
    --bg-secondary: #...;
    --surface-color: #...;
    --text-primary: #...;
    --text-secondary: #...;
    --accent-color: #...;
    --accent-light: #...;
    --border-color: rgba(...);
    --hover-color: rgba(...);
    --hero-overlay: linear-gradient(...);
    --gradient-start: #...;
    --gradient-mid: #...;
    --gradient-end: #...;
    --nav-bg: rgba(...);
    --nav-text: #...;
    --glow-color: rgba(...);
}
```

2. Register it in `ThemeService.cs` by adding a new `ThemeDefinition` to the list.

## Contrast Requirements

Light themes (`warm`, `minimal`) need careful contrast checks:
- `--text-primary` on `--bg-primary` should meet WCAG AA (4.5:1 for body text)
- `--accent-color` used on `--surface-color` backgrounds for interactive elements
