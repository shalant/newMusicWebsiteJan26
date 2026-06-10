# Doug Rosenberg — Music Portfolio Site

A single-page Blazor WebAssembly portfolio for jazz musician, composer, and educator Doug Rosenberg. Deployed as a static site to GitHub Pages.

## Features

- **Hero section** — Full-bleed photography with animated gradient typography
- **About** — Bio, skills, performance venues, and collaborating artists
- **Albums** — Discography grid with cover art, descriptions, and buy/stream links
- **Education** — Teaching history, guest residencies, academic credentials
- **Sheet Music Library** — Downloadable/viewable PDF scores via an in-page viewer
- **Theming** — Six switchable themes (Dark, Midnight, Warm, Minimal, Ocean, Forest)
- **Contact/Footer** — Social and email links

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Blazor WebAssembly (.NET 10) |
| UI components | MudBlazor |
| Fonts | Cormorant Garamond (display), Montserrat (body) |
| CSS | Scoped component CSS + global `app.css` |
| Data | Static JSON files in `wwwroot/sample-data/` |
| Hosting | GitHub Pages (static, no server) |

## Live Site

`https://shalant.github.io/newMusicWebsiteJan26/`

## Quick Start

```bash
cd src/BlazorApp
dotnet run
```

Open `https://localhost:PORT` in a browser.
