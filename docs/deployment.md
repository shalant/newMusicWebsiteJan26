# Deployment

The site deploys as a static Blazor WebAssembly app to **GitHub Pages**.

## Build

```bash
cd src/BlazorApp
dotnet publish -c Release -o publish
```

The output lands in `publish/wwwroot/`. All files are static — no server required.

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

This handles the `https://shalant.github.io/newMusicWebsiteJan26/` sub-path automatically.

## Deep-link / Refresh Fix

GitHub Pages returns a 404 for any path that isn't `index.html`. Blazor WASM handles this via the `404.html` workaround: copy `index.html` to `404.html` in the published output, so GitHub Pages serves the app shell for unknown routes, and Blazor's router takes over client-side.

## Deployment Steps

1. Build in Release mode (see above).
2. Copy the contents of `publish/wwwroot/` to the `gh-pages` branch (or configure the GitHub Actions workflow to do this automatically).
3. GitHub Pages serves the root of the `gh-pages` branch.

## Environment Notes

- No API keys or secrets — all content is static JSON.
- No CORS issues — all data is same-origin.
- Sheet music PDFs (`wwwroot/sheetmusic/*.pdf`) must be committed to the repo; they're served as static files.

## Local Development

```bash
cd src/BlazorApp
dotnet run
```

Hot reload is available with `dotnet watch run`. The base href auto-switches to `/` on localhost.
