Blazor WebAssembly Deployment Guide (GitHub Pages + GoDaddy Domain)

This document outlines how to deploy a static Blazor WebAssembly app to GitHub Pages while renting a custom domain from GoDaddy.

🌐 Overview

Hosting: GitHub Pages (static site)

Domain registrar: GoDaddy

Live URL (default): https://shalant.github.io/newMusicWebsiteJan26/

Once DNS propagation completes, your site will be accessible via your custom domain (e.g., https://dougrosenberg.com).

🧩 Pre‑Publish Checklist

1. Fix the Filename Bug

One file in wwwroot/sheetmusic/ contains special characters that break dotnet publish:

Put+Your+Records+On+Arrangement+-+Electric+Piano,+Trumpet+in+Bb.pdf

Fix:

Rename it to PutYourRecordsOn.pdf.

Update its entry in sample-data/sheetmusic.json if necessary (the url field should match the new filename).

2. Verify Routing

GitHub Pages returns a 404 for non‑root paths. To fix deep‑linking and refresh issues, copy index.html to 404.html in the published output so Blazor’s router handles client‑side navigation.

⚙️ Build Instructions

cd src/BlazorApp
dotnet publish -c Release -o ../../publish

The output will appear in publish/wwwroot/. All files are static and ready for deployment.

🧠 Base Href Configuration

The <base href> in index.html is dynamically set at runtime:

var base = document.getElementsByTagName('base')[0];
if (window.location.host.includes('localhost')) {
    base.setAttribute('href', '/');
} else if (path.length > 2) {
    base.setAttribute('href', '/' + path[1] + '/');
}

This automatically handles sub‑paths like https://shalant.github.io/newMusicWebsiteJan26/. If you rename the repo, update the fallback path accordingly.

🚀 Deployment Options

Manual Deploy

Build in Release mode.

Copy the contents of publish/wwwroot/ into the docs/ folder at the repo root (or whichever branch GitHub Pages serves).

Commit and push to main.

Automated Deploy (GitHub Actions)

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

This workflow automatically builds and deploys your Blazor app whenever you push to main.

🧾 GoDaddy DNS Configuration

To connect your domain to GitHub Pages, add these records in GoDaddy’s DNS settings:

Type

Name

Value

TTL

A

@

185.199.108.153

3600

A

@

185.199.109.153

3600

A

@

185.199.110.153

3600

A

@

185.199.111.153

3600

CNAME

www

shalant.github.io

3600

Once propagation completes (usually within 30 min – 4 hr), GitHub Pages will detect the domain automatically.

🔒 HTTPS and Custom Domain Setup

Go to GitHub → Settings → Pages.

Enter your custom domain (e.g., dougrosenberg.com).

Click Save, then Check again until DNS verification passes.

Enable Enforce HTTPS.

GitHub will issue a free SSL certificate once DNS resolves correctly.

🧰 Environment Notes

No API keys or secrets — all content is static JSON.

No CORS issues — all data is same‑origin.

Sheet music PDFs (wwwroot/sheetmusic/*.pdf) must be committed to the repo.

💻 Local Development

cd src/BlazorApp
dotnet watch run

Hot reload is available with dotnet watch run. The base href script automatically switches to / on localhost.

✅ Summary

Once DNS propagation completes and GitHub Pages detects your domain, your Blazor WASM site will serve securely from GitHub Pages under your GoDaddy domain — no server required, just static hosting and automatic CI/CD via GitHub Actions.