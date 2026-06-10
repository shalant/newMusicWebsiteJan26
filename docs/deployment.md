# Deployment

The site deploys as a static Blazor WebAssembly app to **GitHub Pages**.

**Live URL:** `https://shalant.github.io/newMusicWebsiteJan26/`

---

## Before Publishing — Fix the Filename Bug

One file in `wwwroot/sheetmusic/` has special characters in its name that break `dotnet publish`:

```
Put+Your+Records+On+Arrangement+-+Electric+Piano,+Trumpet+in+Bb.pdf
```

**Fix:**
1. Rename the file to something like `PutYourRecordsOn.pdf`
2. Update its entry in `sample-data/sheetmusic.json` — the `url` field already says `PutYourRecordsOn.pdf`, so it may already match after renaming

---

## Build

```bash
cd src/BlazorApp
dotnet publish -c Release -o ../../publish
```

The output lands in `publish/wwwroot/`. All files are static — no server required.

---

## Deep-link / Refresh Fix

GitHub Pages returns a 404 for any path that isn't `index.html`. The `404.html` workaround handles this: copy `index.html` to `404.html` in the published output so GitHub Pages serves the app shell for unknown routes and Blazor's router takes over client-side.

---

## GitHub Pages Setup

The `<base href>` in `index.html` is set dynamically at runtime:

```js
var base = document.getElementsByTagName('base')[0];
if (window.location.host.includes('localhost')) {
    base.setAttribute('href', '/');
} else if (path.length > 2) {
    base.setAttribute('href', '/' + path[1] + '/');
}
```

This handles the `https://shalant.github.io/newMusicWebsiteJan26/` sub-path automatically. If you rename the repo, update the fallback path here.

---

## Manual Deploy Steps

1. Build in Release mode (see above).
2. Copy the contents of `publish/wwwroot/` into the `docs/` folder at the repo root (or whichever branch/folder GitHub Pages is configured to serve).
3. Commit and push to `main`.

---

## Automated Deploy (GitHub Actions)

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-dotnet@v4
        with:
          dotnet-version: '10.x'
      - run: dotnet publish src/BlazorApp -c Release -o site
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: site/wwwroot
```

---

## Environment Notes

- No API keys or secrets — all content is static JSON.
- No CORS issues — all data is same-origin.
- Sheet music PDFs (`wwwroot/sheetmusic/*.pdf`) must be committed to the repo; they are served as static files.

---

## Local Development

```bash
cd src/BlazorApp
dotnet watch run
```

Hot reload is available with `dotnet watch run`. The base href script in `index.html` switches to `/` automatically on localhost — no configuration needed.
