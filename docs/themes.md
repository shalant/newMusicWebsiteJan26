# Theme System

The site includes 6 built-in themes selectable via the theme picker (floating button, bottom-right corner). The chosen theme is saved in `localStorage` and persists across visits.

---

## Available Themes

| Theme | Style | Background | Accent |
|---|---|---|---|
| **Dark** | Default warm dark | `#181212` (dark brown-black) | `#d4a574` (warm gold) |
| **Warm** | Light / cream | `#faf5ec` (warm off-white) | `#c4873a` (amber) |
| **Midnight** | Pure black + neon | `#000000` | `#00ff88` (neon green) |
| **Ocean** | Deep navy | `#060f1e` | `#4db8ff` (sky blue) |
| **Forest** | Deep green | `#0d1a0d` | `#7ccc7c` (sage green) |
| **Minimal** | Clean white | `#ffffff` | `#222222` (near-black) |

---

## How It Works

Each theme is a set of CSS custom properties (variables) defined in `wwwroot/css/themes.css`. When the user picks a theme, the `data-theme` attribute on `<html>` is updated and saved to localStorage.

**CSS variables used throughout the site:**

| Variable | Purpose |
|---|---|
| `--bg-primary` | Main page background |
| `--bg-secondary` | Subtle section backgrounds |
| `--surface-color` | Glass pane / card backgrounds |
| `--text-primary` | Main body text |
| `--text-secondary` | Muted/caption text |
| `--accent-color` | Buttons, borders, highlights, links |
| `--accent-light` | Lighter variant of accent |
| `--border-color` | Card and divider borders |
| `--hover-color` | Hover background tint |
| `--nav-bg` | Navigation bar background |
| `--nav-text` | Navigation link text |
| `--glow-color` | Inner glow on cards |
| `--hero-overlay` | Gradient overlay on hero image |
| `--gradient-start/mid/end` | Animated text gradients |

---

## Adding a New Theme

1. Open `src/BlazorApp/wwwroot/css/themes.css`
2. Add a new block:

```css
[data-theme="mytheme"] {
    --bg-primary:     #your-color;
    --bg-secondary:   #your-color;
    --surface-color:  #your-color;
    --text-primary:   #your-color;
    --text-secondary: #your-color;
    --accent-color:   #your-color;
    --accent-light:   #your-color;
    --border-color:   rgba(r, g, b, 0.22);
    --hover-color:    rgba(r, g, b, 0.1);
    --nav-bg:         rgba(r, g, b, 0.97);
    --nav-text:       #your-color;
    --glow-color:     rgba(r, g, b, 0.12);
    --hero-overlay:   linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.7) 100%);
    --gradient-start: #your-accent;
    --gradient-mid:   #your-accent-light;
    --gradient-end:   #your-accent-dark;
}
```

3. Open `Components/ThemeSwitcher.razor` and add your theme to the theme list there.

---

## Tips for New Themes

- Keep `--border-color` low opacity (0.15–0.25) for a subtle glassy look
- `--surface-color` should be slightly lighter/different than `--bg-primary` so glass panes are visible
- Test in both light and dark backgrounds — the artist name chip grid uses `--accent-color` directly for borders, so it should have enough contrast on the section background
- The animated text gradient uses `--gradient-start`, `--gradient-mid`, `--gradient-end` — a three-stop gradient works best
