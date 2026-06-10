# Architecture

## Project Structure

```
src/BlazorApp/
├── Components/          # Page sections (each is a Blazor component)
│   ├── About.razor
│   ├── Albums.razor
│   ├── Education.razor
│   ├── Home.razor
│   ├── Portfolio.razor  (unused/commented out)
│   ├── SheetMusicViewer.razor
│   └── ThemeSwitcher.razor
├── Layout/
│   ├── Header.razor     # Fixed navigation bar with brand + links
│   ├── Footer.razor     # Contact/social links section
│   └── MainLayout.razor # Root layout (wraps all pages)
├── Models/              # C# record types matching JSON data shapes
│   ├── AboutMe.cs
│   ├── Album.cs
│   ├── Education.cs
│   ├── HeroImage.cs
│   ├── Project.cs
│   ├── SheetMusic.cs
│   ├── SiteProperties.cs
│   └── SocialIcons.cs
├── Pages/
│   └── Index.razor      # The single page — composes all section components
├── Services/
│   ├── HeroImageService.cs   # Loads hero images, selects by name
│   └── ThemeService.cs       # Holds theme metadata list
├── wwwroot/
│   ├── css/
│   │   ├── app.css       # Global styles, layout, animations, grid
│   │   └── themes.css    # CSS variable definitions for all 6 themes
│   ├── js/
│   │   └── theme.js      # Theme persistence (localStorage)
│   ├── images/           # Static images (down-arrow SVG etc.)
│   ├── sheetmusic/       # PDF files served for the sheet music viewer
│   ├── sample-data/      # JSON data files (see data-reference.md)
│   └── index.html        # App shell (loads Blazor WASM, theme, scroll JS)
└── Program.cs            # DI setup, HttpClient registration
```

## Data Flow

1. `Program.cs` registers `HttpClient` and `HeroImageService` as scoped services.
2. `Index.razor` injects `HttpClient` and `HeroImageService` and passes them to each section component as parameters.
3. Each section component calls `Http.GetFromJsonAsync<T>()` in `OnInitializedAsync` to load its JSON data.
4. Hero images are loaded centrally by `HeroImageService` from `heroimages.json` and cached; each component requests its section's image by name.

## Rendering

Blazor WebAssembly renders entirely on the client after the WASM bundle loads. There is no server-side rendering. The loading spinner shown during WASM initialization is in `index.html`.

## Scroll Behavior

- The header is `position: fixed` with a `68px` height.
- All sections have `scroll-margin-top: 68px` to offset anchor-link navigation.
- A MutationObserver + IntersectionObserver combo in `index.html` powers scroll-reveal animations (`.reveal` → `.visible` classes).
- A scroll event listener adds `.scrolled` to `#header` after 60px scroll to trigger a CSS padding shrink.
- A second scroll listener highlights the matching `.nav-links a` with `.active`.
