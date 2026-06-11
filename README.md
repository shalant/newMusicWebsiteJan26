<div align="center">

# Doug Rosenberg — Music Portfolio

**A personal website for jazz musician Doug Rosenberg.**
Showcases albums, performance history, teaching experience, sheet music, and a photo gallery.

**[→ Visit the live site](https://shalant.github.io/newMusicWebsiteJan26/)**

<!-- 📸 Drop a full-page screenshot at docs/screenshots/hero.png to show it here -->
<!-- ![Site preview](docs/screenshots/hero.png) -->

</div>

---

## What's on the site

| Section | What's there |
|---|---|
| **Home** | Hero image with name and title |
| **About** | Bio, skills, venues performed at, artists performed with |
| **Listen** | Album cards with cover art, descriptions, and links |
| **Education** | Teaching history, guest artist appearances, academic background |
| **Sheet Music** | Searchable library with inline PDF viewer |
| **Gallery** | Photo grid with full-screen lightbox and category filters |

---

## Themes

The site ships with **6 color themes** switchable from the top-right of the page. The selected theme is remembered between visits.

<!-- 📸 Drop a themes screenshot at docs/screenshots/themes.png -->
<!-- ![Themes](docs/screenshots/themes.png) -->

| Theme | Vibe |
|---|---|
| **Ocean** *(default)* | Deep navy + sky blue |
| **Dark** | Warm brown + ember gold |
| **Midnight** | Pure black + neon green |
| **Forest** | Dark green + sage |
| **Warm** | Cream + amber (light) |
| **Minimal** | White + charcoal (light) |

---

## Updating your content

Everything on the site is driven by JSON files in `src/BlazorApp/wwwroot/sample-data/`. You don't need to touch any code to update most things — just edit the right file.

### Change your bio or skills
Edit **`sample-data/aboutme.json`**:
```json
{
  "description": "Your bio text here...",
  "skills": ["Saxophone", "Clarinet", "Jazz Improvisation"],
  "detailOrQuote": "A quote or extra detail"
}
```

### Add or edit an album
Edit **`sample-data/albums.json`** — each album is one object in the array:
```json
{
  "title": "Album Title",
  "description": "Short description",
  "coverImageUrl": "images/albums/cover.jpg",
  "amazonUrl": "https://amazon.com/..."
}
```

### Add a photo to the gallery
1. Drop the image file into `wwwroot/images/gallery/`
2. Add an entry to **`sample-data/gallery.json`**:
```json
{
  "src": "images/gallery/your-photo.jpg",
  "caption": "Caption text",
  "category": "Live"
}
```

### Add sheet music
1. Drop the PDF into `wwwroot/sheetmusic/` (use simple filenames — no `+`, `,`, or spaces)
2. Add an entry to **`sample-data/sheetmusic.json`**:
```json
{
  "title": "Song Title",
  "url": "sheetmusic/YourFile.pdf"
}
```

### Update your name, email, or social links
Edit **`sample-data/siteproperties.json`**.

---

## Running locally

You need the [.NET 10 SDK](https://dotnet.microsoft.com/download) installed.

```bash
cd src/BlazorApp
dotnet watch run
```

Then open `https://localhost:5001` in your browser. Changes to Razor files and CSS hot-reload automatically.

---

## Deploying

The site deploys to GitHub Pages automatically whenever you push to `main` (via GitHub Actions). See [`docs/deployment.md`](docs/deployment.md) for the full setup, custom domain configuration, and manual deploy steps.

---

## Developer site

The companion developer portfolio is at [dougrosenbergdev.com](https://dougrosenbergdev.com).

---

<details>
<summary>Tech notes (for developers)</summary>

- **Framework:** Blazor WebAssembly (.NET 10) — fully client-side, no server required
- **Styling:** Custom CSS with 6 CSS-variable themes, Bootstrap 5 grid, glassmorphism cards
- **Fonts:** Josefin Sans + Montserrat (Google Fonts)
- **Animations:** CSS transitions + Intersection Observer API (vanilla JS)
- **Data:** Static JSON files — no backend, no database, no API keys
- **Hosting:** GitHub Pages with a custom GoDaddy domain
- **Docs:** [`docs/`](docs/) folder has guides for deployment, theming, content management, and UI features

</details>
