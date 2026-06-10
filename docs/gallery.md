# Photo Gallery

The gallery section displays a responsive grid of photos with category filtering and a full-screen lightbox.

---

## Adding Photos

1. **Copy the image** into `src/BlazorApp/wwwroot/images/`
   - Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`
   - Recommended resolution: at least 1200px on the long edge
   - Keep file sizes reasonable — large images slow the page load

2. **Add an entry** to `src/BlazorApp/wwwroot/sample-data/gallery.json`:

```json
{
  "src": "images/your-photo.jpg",
  "caption": "Caption shown on hover and in the lightbox",
  "category": "Performance"
}
```

3. **Reload the dev server** — changes to JSON files are picked up automatically.

---

## Categories

Categories drive the filter tabs at the top of the gallery. Any string works. Suggested categories:

| Category | Use for |
|---|---|
| `Performance` | Live show photos |
| `Studio` | Recording session photos |
| `Education` | Teaching, clinics, workshops |
| `Press` | Headshots, promotional photos |
| `Albums` | Album artwork, release photos |
| `Archive` | Older or vintage photos |

The "All" tab is always present. Filter tabs appear automatically for each distinct category value in the JSON — so adding a new category is as simple as using it in an entry.

---

## Removing or Reordering Photos

The gallery displays photos in the order they appear in `gallery.json`. To reorder, cut and paste entries. To remove a photo, delete its entry from the JSON (you can also delete the image file, but that's optional).

---

## Filenames with Special Characters

Avoid spaces and special characters in image filenames when possible. If a file has a space, URL-encode it in the JSON:

```json
{ "src": "images/my%20photo.jpg", "caption": "..." }
```

Avoid `+`, `,`, `&` in filenames — these can cause issues with the MSBuild publish step.

---

## Gallery UI Behavior

- **Grid**: `auto-fill, minmax(280px, 1fr)` — fills available width at any screen size
- **Aspect ratios**: Cards vary between 4:3, 1:1, and 16:9 using `nth-child` rules for visual rhythm
- **Hover**: Image zooms to 107%, dark gradient overlay slides up with caption + zoom icon
- **Lightbox**: Click any photo to open full-screen. Navigate with on-screen arrows or keyboard
- **Keyboard shortcuts in lightbox**: `←` previous · `→` next · `Esc` close
- **Counter**: Shows current position, e.g. `3 / 18`
- **Lazy loading**: Images use `loading="lazy"` — only loaded when near the viewport
