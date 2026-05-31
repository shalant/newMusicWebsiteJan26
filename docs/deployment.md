# Deployment

The site is deployed as a static site to **GitHub Pages** from the `main` branch.

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

## Building for Production

```bash
cd src/BlazorApp
dotnet publish -c Release -o ../../publish
```

The output lands in `publish/wwwroot/`. That folder contains everything needed for GitHub Pages.

---

## GitHub Pages Deployment

The `index.html` already handles the base-href correctly for both localhost and GitHub Pages:

```html
<base href="https://shalant.github.io/newMusicWebsiteJan26/" />
```

A script in `index.html` switches to `/` automatically when running on localhost.

### Manual Deploy Steps

1. Build: `dotnet publish -c Release`
2. Copy the contents of `publish/wwwroot/` into the `docs/` folder at the repo root (or whichever branch/folder GitHub Pages is configured to serve)
3. Commit and push

### Automated Deploy (GitHub Actions)

Consider adding a `.github/workflows/deploy.yml` to automate this on every push to `main`:

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

## Base Href

The `<base href>` in `index.html` must match the GitHub Pages path. If you move the repo or rename it, update this line:

```html
<base href="https://shalant.github.io/newMusicWebsiteJan26/" />
```

---

## Dev Server

```bash
cd src/BlazorApp
dotnet watch run
```

The base-href switching script in `index.html` automatically serves from `/` on localhost. No configuration needed.
