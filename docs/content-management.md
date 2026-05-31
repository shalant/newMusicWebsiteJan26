# Content Management

All site content is stored in `src/BlazorApp/wwwroot/sample-data/`. Editing these JSON files updates the site — no code changes needed.

---

## siteproperties.json

Controls the hero section name/subtitle and footer social links.

```json
{
  "name": "doug rosenberg",
  "title": "saxophonist, composer, educator",
  "email": "doug.rosenberg@gmail.com",
  "gitHub": "shalant",
  "instagram": "your_handle",
  "linkedIn": "douglasrosenberg",
  "twitter": "your_handle",
  "youTube": "your_channel",
  "devDotTo": null,
  "medium": ""
}
```

| Field | Used in |
|---|---|
| `name` | Hero h1, footer copyright |
| `title` | Hero subtitle (h2) |
| `email` | Footer email icon link |
| `gitHub` | Footer GitHub icon — links to `github.com/<handle>` |
| `instagram` | Footer Instagram icon |
| `linkedIn` | Footer LinkedIn icon |
| `twitter` | Footer Twitter/X icon |
| `youTube` | Footer YouTube icon |
| `devDotTo` / `medium` | Set to `null` or `""` to hide those icons |

---

## aboutme.json

Controls the About section biography and skills list.

```json
{
  "description": "Your biography paragraph...",
  "skills": [
    "Saxophones, flutes, clarinets",
    "Composition/arranging",
    "Education"
  ],
  "detailOrQuote": "An optional quote or extra detail."
}
```

> Note: the `detailOrQuote` field exists in the data but is not currently displayed on the site.

---

## albums.json

Each entry is one album card. Cards link to Amazon purchase pages.

```json
[
  {
    "title": "Album Title",
    "albumcoverurl": "https://url-to-cover-image.jpg",
    "description": "Description shown on the card.",
    "url": "https://www.amazon.com/dp/ASIN"
  }
]
```

**Tips:**
- `albumcoverurl` can be an Amazon product image URL or a local `images/` path
- `url` should be a direct Amazon product link (`/dp/ASIN`) for a better user experience
- Clicking the album cover opens the `url` in a new tab
- Albums display in pairs (2 per row on desktop)

---

## gallery.json

Each entry is one photo in the gallery grid.

```json
[
  {
    "src": "images/filename.jpg",
    "caption": "Caption shown in the overlay and lightbox",
    "category": "Performance"
  }
]
```

**To add a photo:**
1. Copy the image file into `wwwroot/images/`
2. Add an entry to `gallery.json`

**Categories** — any string works; filter tabs are generated automatically from whatever values you use. Suggested: `Performance`, `Studio`, `Education`, `Press`, `Albums`, `Archive`.

**Filenames with spaces:** URL-encode the space as `%20` in the `src` field — e.g., `"src": "images/my%20photo.jpg"`.

See [`gallery.md`](gallery.md) for more detail.

---

## heroimages.json

Sets the background image for each section. The `name` field must match exactly.

```json
[
  { "name": "home",      "src": "images/BackgroundImage2.png", "alt": "description" },
  { "name": "about",     "src": "images/artDecoBackground1.png", "alt": "description" },
  { "name": "albums",    "src": "images/artDecoBackground1.png", "alt": "description" },
  { "name": "education", "src": "images/artDecoBackground1.png", "alt": "description" },
  { "name": "portfolio", "src": "images/design-desk.jpeg", "alt": "description" }
]
```

The `src` path is relative to `wwwroot/`. Use any image from `wwwroot/images/`.

---

## sheetmusic.json

Each entry is one piece in the Sheet Music Library. Pieces appear in the left sidebar as clickable buttons; the PDF/image opens in the right panel.

```json
[
  { "title": "Fur Elise", "url": "FurElise.pdf" },
  { "title": "Star Wars",  "url": "StarWars.pdf" }
]
```

**To add a piece:**
1. Copy the PDF (or image) into `wwwroot/sheetmusic/`
2. Add `{ "title": "Display Name", "url": "filename.pdf" }` to the array

The list is alphabetical by default — just keep entries in order if you want alphabetical display.

See [`sheet-music.md`](sheet-music.md) for more detail.

---

## socialicons.json

Maps social network names to icon image paths. These icons appear in the footer.

```json
{
  "email": "images/socials/email.svg",
  "gitHub": "images/socials/github.svg",
  "instagram": "images/socials/instagram.svg",
  "linkedIn": "images/socials/linkedin.svg",
  "twitter": "images/socials/twitter.svg",
  "youTube": "images/socials/youtube.svg",
  "devDotTo": "images/socials/devdotto.svg",
  "medium": "images/socials/medium.svg"
}
```

The icons live in `wwwroot/images/socials/`. Replace any icon by swapping the SVG file — keep the same filename.
