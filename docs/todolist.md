# To-Do List

## Performance — Blazor WASM Load Time

- [ ] **Always publish in Release mode** — `dotnet publish -c Release` trims unused framework code, typically cutting the download by 30–50%. Never deploy a Debug build.

- [ ] **Enable PWA service worker** — after the first visit, the .NET runtime and app DLLs are cached locally and subsequent loads are near-instant. Add to `BlazorApp.csproj`:
  ```xml
  <ServiceWorkerAssetsManifest>service-worker-assets.js</ServiceWorkerAssetsManifest>
  ```
  and add the two service worker files Blazor expects (`service-worker.js` and `service-worker.published.js`) to `wwwroot/`. The Blazor PWA template has these ready-made.

- [ ] **Brotli / gzip pre-compression** — GitHub Pages doesn't serve `.br` files automatically, but you can pre-compress the publish output and add a custom `_headers` or configure via a GitHub Action. Brotli typically reduces the .NET runtime payload by another 20–30% on top of trimming.

- [ ] **Rename the sheet music file with special characters** — `Put+Your+Records+On+Arrangement+-+Electric+Piano,+Trumpet+in+Bb.pdf` breaks `dotnet publish`. Rename it and confirm the `url` field in `sample-data/sheetmusic.json` matches. (See also: `deployment.md`.)
