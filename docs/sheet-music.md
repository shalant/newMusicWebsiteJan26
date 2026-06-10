# Sheet Music Library

The Sheet Music Library lives in the Education section. It shows a searchable list of pieces; clicking one opens the PDF (or image) in an inline viewer with an "Open in New Tab" button.

---

## Adding a Piece

1. **Copy the file** into `src/BlazorApp/wwwroot/sheetmusic/`
   - Supported formats: `.pdf`, `.png`, `.jpg`
   - PDFs are recommended — they render cleanly in the inline viewer

2. **Add an entry** to `src/BlazorApp/wwwroot/sample-data/sheetmusic.json`:

```json
{ "title": "Display Name", "url": "filename.pdf" }
```

**Example:**
```json
[
  { "title": "Fur Elise",  "url": "FurElise.pdf" },
  { "title": "Star Wars",  "url": "StarWars.pdf" },
  { "title": "My New Piece", "url": "MyNewPiece.pdf" }
]
```

That's it — no other changes needed.

---

## Removing a Piece

Delete the entry from `sheetmusic.json`. The PDF file in `wwwroot/sheetmusic/` can stay or be deleted.

---

## Naming Conventions

Keep filenames simple — no spaces or special characters:

| Avoid | Use instead |
|---|---|
| `My Piece.pdf` | `MyPiece.pdf` |
| `Piece+Arrangement.pdf` | `PieceArrangement.pdf` |
| `Piece, Version 2.pdf` | `PieceVersion2.pdf` |

> A file named `Put+Your+Records+On+Arrangement+-+Electric+Piano,+Trumpet+in+Bb.pdf` currently exists in `wwwroot/sheetmusic/` with `+` and `,` characters that break the `dotnet publish` command. Rename it to fix the deployment build error.

---

## Search

The viewer includes a live search box that filters the piece list as you type. It matches any part of the title, case-insensitive.

---

## Viewer Layout

```
┌─────────────────────────┬────────────────────────────────┐
│  Sheet Music Library    │                                │
│  ┌─────────────────┐    │   [Title]          [Open PDF] │
│  │  Search...      │    │   ─────────────────────────── │
│  └─────────────────┘    │                                │
│  Adagio and Allegro     │   ┌──────────────────────────┐│
│  Aebersold Track 6      │   │                          ││
│  Alegretto by Arensky   │   │    Inline PDF viewer     ││
│  ▶ Arioso by Bach       │   │                          ││
│  ...                    │   └──────────────────────────┘│
└─────────────────────────┴────────────────────────────────┘
```

On mobile the list collapses to the top with a fixed max-height, and the PDF viewer appears below it.
