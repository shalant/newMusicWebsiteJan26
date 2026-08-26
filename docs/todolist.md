# To-Do List

## Performance — Blazor WASM Load Time

- [x] **Always publish in Release mode** — already true: `.github/workflows/deploy.yml` runs `dotnet publish -c Release -o build` on every push to `main`. Nothing to change; leaving this here as a guardrail note in case anyone ever deploys manually.

- [ ] **Enable PWA service worker** — after the first visit, the .NET runtime and app DLLs are cached locally and subsequent loads are near-instant. Add to `BlazorApp.csproj`:
  ```xml
  <ServiceWorkerAssetsManifest>service-worker-assets.js</ServiceWorkerAssetsManifest>
  ```
  and add the two service worker files Blazor expects (`service-worker.js` and `service-worker.published.js`) to `wwwroot/`. The Blazor PWA template has these ready-made.

- [ ] **Brotli / gzip pre-compression** — GitHub Pages doesn't serve `.br` files automatically, but you can pre-compress the publish output and add a custom `_headers` or configure via a GitHub Action. Brotli typically reduces the .NET runtime payload by another 20–30% on top of trimming.

- [x] **Rename the sheet music file with special characters** — renamed to `PutYourRecordsOn.pdf`, matching the `url` field already in `sample-data/sheetmusic.json` (that entry was pointing at a file that didn't exist — a live 404 on the "Put Your Records On" link).

## Pre-Launch Polish — targeting Sept 2, 2026

Freelance web design business launches Sept 2. This site doubles as the portfolio proof-point (via the "dev site ↗" cross-link to dougrosenbergdev.com) — a musician evaluating you for a $1–2k site will judge your work by how this one feels.

- [x] **Add Open Graph / Twitter card meta tags** to `index.html` — added `og:title`/`description`/`image`/`url` and `twitter:card`/`title`/`description`/`image`, pointed at `https://dougrosenberg.com/images/BackgroundImage2.png` (the existing home hero portrait) and the custom domain from `CNAME`.
- [x] **Add a meta description** — added, pulled from the "saxophonist, composer, educator" tagline in `siteproperties.json`.
- [x] **Drop the unused Roboto font load** in `index.html`.
- [x] **Move the Cormorant Garamond / Montserrat `@import` in `app.css` to a `<link>` in `index.html`** — consolidated with Josefin Sans into one Google Fonts `<link>`, plus `preconnect` to `fonts.googleapis.com`/`fonts.gstatic.com`.
- [ ] **Decide the favicon** — added `apple-touch-icon` pointing at `favicon.png` as a fallback and dropped the dead commented-out `<link>`. Still need to eyeball the SVG monogram (`01-dr-monogram.svg`) at actual tab size across browsers before launch.
- [x] ~~Verify mobile nav~~ — moot: `feature/sax-nav-bloom` is orphaned per your call; this work now branches clean off `main` (`launch-polish-sept2`).
- [x] **Clean up dead/commented markup in `index.html`** — removed the duplicate commented-out MudBlazor script tags and the commented favicon line.
