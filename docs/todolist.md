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
- [x] **Best Practices: 100/100, SEO: 100/100** (Lighthouse's SEO check — covers crawlability/meta basics, not sitemap/structured data; see the SEO Foundation section below for those).
- [ ] **Performance: 0/100 on this local run — caveat: this was `dotnet run` (Development build), not a Release publish, so the real number is somewhat better but still bad.** FCP 4.8s, LCP 5.8s, total payload 7.3MB on Lighthouse's default mobile throttling. Root cause is twofold: (1) the Blazor WASM runtime/DLL download itself (tracked above via Release mode / PWA caching / Brotli), and (2) images — see next item. **Update 2026-08-26:** re-ran against a real Release publish under weak-mobile-network throttling — Performance 34/100, LCP 38.6s, TTI 39.2s, 7.9MB total (4.1MB images, 3.2MB WASM runtime). See the Image Optimization section below for the fix already built for the image half of that.
  - **Follow-up after the image-optimization merge (2026-08-26):** re-ran the same weak-mobile-network Lighthouse test against current `main` — total payload dropped to 4.3MB (images 4.1MB → 395KB, ~46% overall reduction), but LCP/TTI barely moved (38.6s → 28.2s, still catastrophic) and the Performance score didn't meaningfully change (34 → 31). **Why:** the ~3.2MB WASM runtime isn't just heavy to download, it's heavy to parse/JIT — that CPU-bound cost dominates the timeline regardless of image size, since images and runtime download in parallel and the runtime boot is what actually blocks interactivity. Real, worthwhile win for data usage and paint speed, but doesn't move the number that most defines "does this feel broken on a weak connection." Only Brotli (partial) or the Astro rebuild (the real fix) touch that.
  - **Real-device sanity check (2026-08-26):** loaded the live site on a Samsung Galaxy S21, incognito Chrome, cellular in Chicago, user-described as "the higher end of connection" — "loaded perfectly fast." Consistent with the finding above, not a contradiction: Lighthouse's weak-network throttling profile (~1.6Mbps, 562ms RTT, 4x CPU slowdown) is a deliberately worst-case simulation, nowhere close to a flagship phone on decent LTE/5G. On good conditions, both the network transfer and the WASM boot finish fast enough to be imperceptible — the 28s number is specifically about weak signal / older or budget devices, a real but smaller slice of visitors than "typical mobile."
- [x] **Hero/background images are unoptimized PNGs of photos** — see the dedicated Image Optimization section below (2026-08-25/26 work), converted the two live-referenced ones to WebP.
- [x] **robots.txt / sitemap.xml / canonical tag / structured data (Schema.org Person)** — done, see SEO Foundation section below.
- [ ] **Verify remaining theme contrast** — only the ocean/dark default theme + splash screen got exercised by this Lighthouse run. The `warm` theme's accent color (`#c4873a`) as *text* on its cream background is worth a manual check; all 6 themes' primary text/background pairs looked fine by inspection but weren't machine-verified.

## Image Optimization / Load Speed — 2026-08-25

- [x] **Converted the 2 live-referenced heavy hero PNGs to WebP** (via ImageMagick, quality 82): `BackgroundImage2.png` (home hero portrait, 2.0MB → 41.5KB) and `artDecoBackground1.png` (about/albums/education background, 1.95MB → 18.9KB) — both re-checked visually after conversion, not just trusted the file-size drop. `heroimages.json` now points at the `.webp` files.
- [x] **`artDecoBackground1.png` deleted** — no longer referenced anywhere live once `heroimages.json` switched to the `.webp` (its only other reference was in `heroimagesOLD.json`, itself dead/unloaded by any code).
- [x] **`BackgroundImage2.png` intentionally kept** (not deleted, not swapped to `.webp` in its other usage) — still referenced by `index.html`'s `og:image`/`twitter:image` tags. Link-preview crawlers (Facebook/Slack/iMessage/etc.) have historically inconsistent WebP support, and a broken link preview is a worse outcome than an unoptimized image that's only fetched once by a crawler, not by every visitor. Not worth the risk for a file that doesn't affect page load speed at all.
- [ ] **3 more heavy PNGs found sitting in `images/`, completely unreferenced by any live code path — not touched, flagging for a decision:** `BackgroundImage1.png` (1.8MB), `artDecoBackground2.png` (2.4MB), `imageSansText.png` (2.1MB) — ~6.3MB combined. These don't hurt page load speed (nothing requests them), just repo/publish bloat. Delete if genuinely unused, or point to `git log` on each to check if they're recent additions worth keeping around before removing.
- **Net effect on the actual page-load path:** the two images every visitor's browser fetches (home hero + about/albums/education background) dropped from ~3.9MB combined to ~60KB combined — the single biggest lever pulled this session on the Lighthouse "Performance: 0/100" finding above, though the Blazor WASM runtime download itself (tracked via Release mode / PWA / Brotli items) is still the larger remaining cost.

## Album Art — Stop Hotlinking External Images — 2026-08-25

- [x] **Album covers were hotlinked from Amazon/AllMusic CDNs** (`m.media-amazon.com`, `aentcdn2.azureedge.net`) in `albums.json` — exactly why they keep breaking (these hosts rotate paths, aren't meant for embedding, and don't guarantee stability). Downloaded all 4 covers, self-hosted under `wwwroot/images/albums/`, updated `albumcoverurl` to local relative paths. "Better Than TV" already had an unused local copy (`betterthantv.jpg`) sitting in `images/` — moved it into the new folder instead of re-downloading.
- **Going forward:** any new album/media entry should use a locally-hosted image from the start, not a hotlinked external URL — the `url` field (Amazon purchase link) is fine to stay external, only the *image* needs to be local.

## SEO Foundation — 2026-08-25

- [x] **`robots.txt`** — added, allows all, points at the sitemap.
- [x] **`sitemap.xml`** — added. Single-URL entry (`https://dougrosenberg.com/`) since this is a one-page app with in-page anchor sections, not separate routes — nothing else to list.
- [x] **Canonical tag** — `<link rel="canonical" href="https://dougrosenberg.com/">` added to `index.html`, matching the custom domain in `CNAME` (same apex-domain choice already made for the OG/Twitter tags).
- [x] **Schema.org structured data** — added a `Person` JSON-LD block (name, jobTitle, image, `sameAs` linking Instagram/LinkedIn/YouTube/GitHub from `siteproperties.json`). Validated as parseable JSON, not just visually checked.
- **Next step, not done here:** submit the sitemap to Google Search Console once this is live on the custom domain — needs a real deployed URL to verify against, can't be done from the repo.

## Someday / Big Bet — Astro Rebuild

- [ ] **Evaluate rebuilding on Astro instead of Blazor WASM.** Not a quick win — this is the real fix for the Performance score above, not a CSS/asset tweak. The sibling `dougrosenbergdev.com` repo already went through this exact decision for the same reason (Blazor WASM PageSpeed score of 23/100 in production, LCP 19.4s under throttling — root-caused to the runtime download itself, not fixable content-side) and has a documented stack-decision trail worth reading before committing here: Angular → Blazor WebAssembly → MudBlazor → dropping MudBlazor → (on `haxbyte.com`) dropping Blazor WASM for Astro. Worth deciding deliberately rather than defaulting into it — this site's content (JSON-driven sections, theme switcher, sheet music viewer, gallery lightbox) would all need a real port, not a copy-paste.
## GA4 Analytics — 2026-08-25/26

- [x] **Standard `gtag.js` install added to `index.html`, real Measurement ID set (`G-BGSJ1FWPTF`)** — property created for `dougrosenberg.com` (separate from the `dougrosenbergdev.com` property). Verified locally: `gtag.js` loads and fires `page_view`/`scroll` events tagged with the right ID (confirmed via network inspection against a Release build). The `/collect` requests returned 503 in that test, consistent with a brand-new GA4 property still activating (Google's own UI: data collection can take up to 48h) rather than a wiring problem.
- [x] **Confirmed end-to-end (2026-08-26)** — GA4 Realtime shows genuine active users and page views on the correct property ("doug rosenberg music"), timing lined up with live-site test traffic. Note for future debugging: the automated browser network reader used during testing reported the `/collect` requests as HTTP 503 even though Google's backend was actually accepting and recording them — a false alarm from that specific tool's handling of `sendBeacon`/keepalive-style requests, not a real failure. GA4's own Realtime report is the trustworthy source here, not client-side network inspection of beacon calls.
- **Deliberately minimal:** just page-view tracking (device split + page-level traffic), no custom events. This site has no contact-dialog/CTA-click surface like `dougrosenbergdev.com`'s `/webdesign` page does, so there's nothing obvious to instrument beyond the automatic pageview/scroll/outbound-click events GA4's Enhanced Measurement already provides. Add custom events later if a real question comes up that pageviews alone can't answer.
- **Reminder from the sibling `dougrosenbergdev.com` playbook, worth applying here too:** tag any link before pasting it into a DM/text — e.g. `?utm_source=facebook&utm_medium=dm&utm_campaign=sept2026` — since in-app browsers (Facebook Messenger, Instagram DMs) often strip the referrer, showing real traffic as `(direct)` in GA4 otherwise.
