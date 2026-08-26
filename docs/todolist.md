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

## Accessibility / Mobile Audit — 2026-08-25

Ran a real local Lighthouse pass (`npx lighthouse` against `dotnet run`, mobile defaults) rather than guessing at numbers.

- [x] **Accessibility: 94 → 100/100.** One real failure found — `.splash__role` (the loading-screen subtitle) had 4.4:1 contrast against a 4.5:1 requirement. Bumped its alpha from 0.65 → 0.8 in `app.css`. Re-ran Lighthouse after the fix to confirm 100/100, not just eyeballed the math.
- [x] **`<main>` landmark missing** — `MainLayout.razor` had `<div id="main">` instead of `<main id="main">` (plus the matching `div#main` → `main#main` CSS selector in `app.css`). Same exact bug already found and fixed on the sibling `dougrosenbergdev.com` repo's own audit — worth remembering as a pattern to check first on any new Blazor layout.
- [x] **Hamburger button tap target too small** — mobile nav toggle (`Header.razor.css` `.hamburger`) was ~30×26px, under the 44×44px WCAG/platform minimum. Added `min-width`/`min-height: 44px` + `align-items: center` to keep the icon centered in the larger hit area.
- [x] **Mobile breakpoints are real, not just claimed** — confirmed 7 files with actual `@media` rules (Header, Footer, MainLayout, Gallery, SheetMusicViewer, ThemeSwitcher, app.css) and a working hamburger/slide-down nav with proper `aria-label`/`aria-expanded`, not a stub.
- [x] **Best Practices: 100/100, SEO: 100/100** (Lighthouse's SEO check — covers crawlability/meta basics, not sitemap/structured data, see below).
- [ ] **Performance: 0/100 on this local run — caveat: this was `dotnet run` (Development build), not a Release publish, so the real number is somewhat better but still bad.** FCP 4.8s, LCP 5.8s, total payload 7.3MB on Lighthouse's default mobile throttling. Root cause is twofold: (1) the Blazor WASM runtime/DLL download itself (tracked above via Release mode / PWA caching / Brotli), and (2) images — see next item.
- [ ] **Hero/background images are unoptimized PNGs of photos** — `BackgroundImage2.png` (the home hero, ~2MB), `artDecoBackground1.png`/`artDecoBackground2.png` (~2MB each, used across About/Albums/Education), `BackgroundImage1.png` (~1.9MB), `imageSansText.png` (~2.1MB) — PNG is lossless and wrong for photographic content; converting to WebP/optimized JPEG typically cuts 80-90% off files like these. `images/` is 12MB total. ImageMagick (`magick`) is available locally if this gets picked up.
- [ ] **robots.txt / sitemap.xml / canonical tag / structured data (Schema.org Person/MusicGroup)** — none exist yet. Lighthouse's SEO score doesn't catch these (it only checks on-page basics), but real search indexing needs them. The sibling `dougrosenbergdev.com` repo's SEO pass (`PortfolioNov25/docs/PORTFOLIO_TODO.md` #2) is a ready-made template for this exact checklist.
- [ ] **Verify remaining theme contrast** — only the ocean/dark default theme + splash screen got exercised by this Lighthouse run. The `warm` theme's accent color (`#c4873a`) as *text* on its cream background is worth a manual check; all 6 themes' primary text/background pairs looked fine by inspection but weren't machine-verified.

## Album Art — Stop Hotlinking External Images — 2026-08-25

- [x] **Album covers were hotlinked from Amazon/AllMusic CDNs** (`m.media-amazon.com`, `aentcdn2.azureedge.net`) in `albums.json` — exactly why they keep breaking (these hosts rotate paths, aren't meant for embedding, and don't guarantee stability). Downloaded all 4 covers, self-hosted under `wwwroot/images/albums/`, updated `albumcoverurl` to local relative paths. "Better Than TV" already had an unused local copy (`betterthantv.jpg`) sitting in `images/` — moved it into the new folder instead of re-downloading.
- **Going forward:** any new album/media entry should use a locally-hosted image from the start, not a hotlinked external URL — the `url` field (Amazon purchase link) is fine to stay external, only the *image* needs to be local.

## Someday / Big Bet — Astro Rebuild

- [ ] **Evaluate rebuilding on Astro instead of Blazor WASM.** Not a quick win — this is the real fix for the Performance score above, not a CSS/asset tweak. The sibling `dougrosenbergdev.com` repo already went through this exact decision for the same reason (Blazor WASM PageSpeed score of 23/100 in production, LCP 19.4s under throttling — root-caused to the runtime download itself, not fixable content-side) and has a documented stack-decision trail worth reading before committing here: Angular → Blazor WebAssembly → MudBlazor → dropping MudBlazor → (on `haxbyte.com`) dropping Blazor WASM for Astro. Worth deciding deliberately rather than defaulting into it — this site's content (JSON-driven sections, theme switcher, sheet music viewer, gallery lightbox) would all need a real port, not a copy-paste.
