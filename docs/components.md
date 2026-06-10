# Component Reference

## Pages

### `Index.razor`
The single entry-point page (`/`). Composes all section components in order and passes shared services.

```razor
<Header />
<Home Http=@Http HeroImageService=@HeroImageService />
<About Http=@Http HeroImageService=@HeroImageService />
<Albums Http=@Http HeroImageService=@HeroImageService />
<Education Http=@Http HeroImageService=@HeroImageService />
<Footer Http=@Http PrimaryColor="#4E567E" SecondaryColor="#D2F1E4" />
```

---

## Layout Components

### `Header.razor`
Fixed navigation bar. Contains artist brand name (left) and nav links (right).

- Brand uses `Cormorant Garamond`, uppercase, wide letter-spacing.
- Nav links highlight with an underline via `.active` class added by scroll JS.
- Gains `.scrolled` class after 60px scroll (reduces padding via CSS transition).
- Scoped CSS: `Header.razor.css`

### `Footer.razor`
Contact section rendered as `#contact`. Loads `siteproperties.json` and `socialicons.json`.

Parameters:
| Parameter | Type | Description |
|-----------|------|-------------|
| `Http` | `HttpClient` | Required |
| `PrimaryColor` | `string` | Background color fallback (overridden by CSS var) |
| `SecondaryColor` | `string` | Unused currently |

---

## Section Components

### `Home.razor`
Hero section (`#home`). Full-viewport height with background image, animated gradient `h1`/`h2` text, and a bouncing scroll-down arrow.

Loads: `siteproperties.json`, hero image named `"home"`.

### `About.razor`
About section (`#about`). Bio text, skills tag cloud, venue chips, and collaborating artists grid. All glass panes use `.reveal` for scroll-in animation.

Loads: `aboutme.json`, hero image named `"about"`.

Scoped CSS: `About.razor.css` — defines `.skills-list` tag cloud and `.detail-quote` editorial styling.

### `Albums.razor`
Albums section (`#albums`). CSS grid of album cards with square cover art, hover overlay "Listen" button, title, and description.

- Grid: `repeat(auto-fill, minmax(240px, 1fr))`.
- Hover: card lifts + rotates slightly, cover darkens, overlay appears.
- Each card has `.reveal` with staggered delays.

Loads: `albums.json`, hero image named `"albums"`.

### `Education.razor`
Education section (`#education`) + inline Sheet Music section (`#sheet-music`).

- Teaching experience, guest residencies, professional affiliations, academic credentials — all in `.custom-glass-pane` cards with `.reveal`.
- Embeds `SheetMusicViewer` component.

Loads: hero image named `"education"`.

### `SheetMusicViewer.razor`
Embedded in the Education section. Two-column grid: left panel is a scrollable list of pieces; right panel renders the selected PDF in an `<iframe>`.

Parameter: `Http` (required).  
Loads: `sheetmusic.json`.

Scoped CSS: `SheetMusicViewer.razor.css` — uses theme CSS variables for item hover/active states.

### `ThemeSwitcher.razor`
Fixed floating button (bottom-right). Opens a popover listing the 6 available themes. Calls `window.applyTheme(themeId)` to apply and `window.initializeTheme()` on first render to restore the last saved theme.

Scoped CSS: `ThemeSwitcher.razor.css`

---

## Services

### `HeroImageService`
Loads `heroimages.json` once (lazy, cached). Exposes `GetHeroAsync(predicate)` to retrieve a single hero image by predicate (typically `img.Name is "section-name"`).

### `ThemeService`
Holds the list of `ThemeDefinition` objects (Id, Name, Description) used by `ThemeSwitcher` to render the theme menu.
