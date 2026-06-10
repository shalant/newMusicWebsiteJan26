# Data Reference

All content data lives in `src/BlazorApp/wwwroot/sample-data/` as static JSON files. The Blazor client fetches them at runtime via `HttpClient`.

---

## `siteproperties.json`

Top-level artist metadata. Used by `Home` (name/title) and `Footer` (social links).

```json
{
  "name": "string",
  "title": "string",
  "email": "string",
  "devDotTo": "string | null",
  "gitHub": "string | null",
  "instagram": "string | null",
  "linkedIn": "string | null",
  "medium": "string | null",
  "twitter": "string | null",
  "youTube": "string | null"
}
```

Social fields are usernames only (no full URL). The Footer component constructs the URL from the username.

---

## `aboutme.json`

Bio content. Used by `About`.

```json
{
  "description": "string",
  "skills": ["string"],
  "detailOrQuote": "string"
}
```

- `description` — Main bio paragraph.
- `skills` — Rendered as a tag cloud above the divider.
- `detailOrQuote` — Displayed as a pull quote (large decorative quote mark).

---

## `albums.json`

Array of album objects. Used by `Albums`.

```json
[
  {
    "title": "string",
    "albumcoverurl": "string",
    "description": "string",
    "url": "string"
  }
]
```

- `albumcoverurl` — External image URL for the cover art.
- `url` — Buy/stream link (opens in new tab).

---

## `heroimages.json`

Array of background images used across sections.

```json
[
  {
    "name": "string",
    "src": "string",
    "alt": "string"
  }
]
```

- `name` — Section identifier: `"home"`, `"about"`, `"albums"`, `"education"`.
- `src` — Relative or absolute URL to the image.
- `alt` — Accessibility description.

`HeroImageService` loads this file once and caches it. Each section fetches its image by matching `name`.

---

## `sheetmusic.json`

Array of sheet music pieces. Used by `SheetMusicViewer`.

```json
[
  {
    "id": 1,
    "title": "string",
    "url": "string"
  }
]
```

- `id` — Unique integer identifier.
- `url` — Filename of the PDF within `wwwroot/sheetmusic/`.

---

## `socialicons.json`

SVG/PNG icon URLs for each social platform. Used by `Footer`.

```json
{
  "email": "string",
  "devDotTo": "string",
  "gitHub": "string",
  "instagram": "string",
  "linkedIn": "string",
  "medium": "string",
  "twitter": "string",
  "youTube": "string"
}
```

Values are relative paths to icon files in `wwwroot/`.

---

## `education.json`

Currently unused in code (Education component has hardcoded content). Reserved for future dynamic education data.

---

## Updating Content

Since all data is in static JSON, updates require:
1. Edit the relevant JSON file in `wwwroot/sample-data/`.
2. Rebuild and redeploy (or just push to GitHub if CI/CD is configured).

No database or backend needed.
