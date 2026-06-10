# Doug Rosenberg — Music Portfolio

A modern, single-page music portfolio built with **Blazor WebAssembly** (.NET 10). Features a photo gallery with lightbox, sheet music library, album showcase, performance history, and a multi-theme UI system.

**Live site:** [shalant.github.io/newMusicWebsiteJan26](https://shalant.github.io/newMusicWebsiteJan26/)
**Developer site:** [dougrosenbergdev.com](https://dougrosenbergdev.com)

---

## Quick Start

**Prerequisites:** [.NET 10 SDK](https://dotnet.microsoft.com/download)

```bash
cd src/BlazorApp
dotnet watch run
```

Navigate to `https://localhost:5001`.

---

## Project Structure

```
src/BlazorApp/
├── Components/
│   ├── Home.razor              # Hero section (name + title over background image)
│   ├── About.razor             # Bio, skills, performance experience
│   ├── Albums.razor            # Album cards linking to Amazon
│   ├── Education.razor         # Teaching history + sheet music viewer
│   ├── Gallery.razor           # Photo gallery with lightbox
│   ├── Portfolio.razor         # Project cards (currently unused)
│   ├── SheetMusicViewer.razor  # PDF viewer with search filter
│   └── ThemeSwitcher.razor     # Theme picker UI
├── Layout/
│   ├── Header.razor            # Fixed top nav with scroll-spy + dev site link
│   ├── Footer.razor            # Social icons + cross-site link
│   └── MainLayout.razor        # Root layout wrapper
├── Models/
│   ├── Album.cs                # Album + Review
│   ├── AboutMe.cs              # Bio text + skills list
│   ├── GalleryPhoto.cs         # Gallery image (src, caption, category)
│   ├── HeroImage.cs            # Background image metadata
│   ├── SheetMusic.cs           # Sheet music entry (title, url)
│   ├── SiteProperties.cs       # Name, title, email, social handles
│   └── SocialIcons.cs          # Social media icon paths
├── Services/
│   ├── HeroImageService.cs     # Loads + caches heroimages.json at startup
│   └── ThemeService.cs         # Persists selected theme to localStorage
├── Pages/
│   └── Index.razor             # Root page — assembles all section components
├── wwwroot/
│   ├── css/
│   │   ├── app.css             # Global styles, animations, utility classes
│   │   └── themes.css          # 6 CSS variable themes
│   ├── js/
│   │   ├── ui.js               # Scroll reveal, parallax, scroll-spy, counters
│   │   └── theme.js            # Theme apply/persist via localStorage
│   ├── images/                 # Photos, backgrounds, icons
│   └── sample-data/            # JSON content files (edit these to update content)
│       ├── siteproperties.json
│       ├── aboutme.json
│       ├── albums.json
│       ├── gallery.json
│       ├── heroimages.json
│       ├── sheetmusic.json
│       └── socialicons.json
└── _Imports.razor              # Global @using statements
```

---

## Updating Content

All site content lives in `wwwroot/sample-data/`. No code changes needed for most updates.

| File | What it controls |
|---|---|
| `siteproperties.json` | Name, subtitle, email, social handles |
| `aboutme.json` | Bio paragraph, skills list |
| `albums.json` | Album covers, descriptions, Amazon links |
| `gallery.json` | Photo gallery — add/remove entries here |
| `heroimages.json` | Background image per section |
| `sheetmusic.json` | Sheet music library — title + PDF filename |
| `socialicons.json` | Paths to social icon images |

See [`docs/content-management.md`](docs/content-management.md) for field-by-field details.

---

## Features

- **6 themes** — Dark, Warm, Midnight, Ocean, Forest, Minimal; persisted in localStorage
- **Photo gallery** — responsive grid, category filters, full-screen lightbox, keyboard navigation
- **Sheet music library** — searchable list, inline PDF viewer
- **Scroll reveal animations** — sections and cards fade/slide in on scroll
- **Scroll progress bar** — thin gradient line at top of viewport
- **Back-to-top button** — appears after scrolling, smooth-scrolls home
- **Scroll-spy nav** — active link highlights as sections come into view
- **Parallax hero** — hero image moves at 18% of scroll speed
- **Animated stat counters** — numbers count up when scrolled to
- **Album lightbox overlay** — hover reveals zoom icon + links to Amazon
- **Cross-site link** — nav pill + footer card linking to dougrosenbergdev.com

---

## Docs

- [`docs/content-management.md`](docs/content-management.md) — editing JSON data files
- [`docs/gallery.md`](docs/gallery.md) — adding photos to the gallery
- [`docs/sheet-music.md`](docs/sheet-music.md) — adding sheet music PDFs
- [`docs/themes.md`](docs/themes.md) — theme system and creating new themes
- [`docs/deployment.md`](docs/deployment.md) — deploying to GitHub Pages
- [`docs/ui-features.md`](docs/ui-features.md) — UI features and animations reference

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Blazor WebAssembly (.NET 10) |
| UI Library | MudBlazor |
| Grid/Layout | Bootstrap 5 + CSS Grid |
| Fonts | Cormorant Garamond + Montserrat (Google Fonts) |
| Animations | CSS transitions + Intersection Observer API (vanilla JS) |
| Data | Static JSON files (no backend/database) |

---

## Known Issues

- **Deploy**: A sheet music file named `Put+Your+Records+On+Arrangement+-+Electric+Piano,+Trumpet+in+Bb.pdf` contains `+` and `,` characters that break MSBuild asset fingerprinting during `dotnet publish`. Rename the file (and update `sheetmusic.json`) to fix. The dev server is unaffected.
- **Social handles**: `siteproperties.json` still has placeholder values for Instagram and Twitter — update with real handles.
