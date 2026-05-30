# Architecture Overview

## Design Patterns

### Component Architecture
The application follows a **section-based component pattern** where each major page section (Home, Albums, About, Education, Portfolio) is a self-contained Razor component that:
1. Declares required dependencies as `[Parameter]` with `[EditorRequired]` attribute
2. Loads its own data via `HttpClient` during `OnInitializedAsync()`
3. Renders its view independently
4. Styles are maintained locally with component-specific CSS files or global classes

### Service Layer
**HeroImageService** acts as a cache layer:
- Initializes by loading `heroimages.json` once at application startup
- Provides `GetHeroAsync(predicate)` to query cached images by name
- Eliminates redundant HTTP requests for the same resource

### Data Flow
```
Component → HttpClient → JSON Files (wwwroot/sample-data/) → Models
     ↑
     └─ HeroImageService (cached layer)
```

## File Organization

### `/Components/`
Self-contained page sections with their own rendering logic:
- Each component loads and displays a specific type of content
- No inter-component communication (each is independent)

### `/Models/`
Data transfer objects that shape JSON deserialization:
- `Album` - Album metadata and associated reviews
- `Education` - Educational background info
- `Project` - Portfolio project details
- `SiteProperties` - Global site configuration
- `SocialIcons` - Social media icon URLs
- `HeroImage` - Background image metadata

### `/Services/`
Stateful services registered in DI container:
- `HeroImageService` - Cached image provider
- Services are scoped (one per HTTP request in server context, shared in WASM)

### `/Layout/`
Global layout and navigation structure:
- `MainLayout.razor` - Root layout wrapper
- `Header.razor` - Navigation bar
- `Footer.razor` - Global footer with contact links

### `/wwwroot/`
Static assets:
- `css/app.css` - Global styles using BEM naming convention
- `css/bootstrap/` - Bootstrap framework
- `images/` - Icons, backgrounds, logos
- `sample-data/` - JSON configuration files

## CSS Architecture

Uses **BEM (Block Element Modifier)** naming convention:
- `.block` - Top-level component
- `.block__element` - Child component
- `.block--modifier` - Variation

Example: `.albums__glass-pane` = glass-pane element of albums block

### Utility Classes
- `.small` - Small text (15px)
- `.large` - Large text (24px)
- Global responsive utilities via media queries

### Styling Strategy
1. **Global styles** (app.css) - Typography, layout, theme
2. **Component styles** (Layout/*.razor.css) - Layout-specific overrides
3. **CSS classes** - Preferred over inline styles for maintainability
4. **Responsive design** - Mobile-first media queries at 300px, 360px, 420px breakpoints

## Dependency Injection (Program.cs)

```csharp
builder.Services.AddMudServices();
builder.Services.AddScoped(sp => new HttpClient { BaseAddress = ... });
builder.Services.AddScoped<HeroImageService>();
```

**Scoped** dependencies are created once per request, making `HeroImageService` a shared cache for all components in a single page load.

## Error Handling

Currently minimal error handling. Components gracefully degrade:
- Null checks for loaded data
- Fallback UI for loading states (e.g., "Loading...", "No albums found")
- No try-catch in component initialization (uncaught exceptions will show Blazor error UI)

## Future Improvements

1. **Shared Component Library** - Create reusable card/pane components
2. **State Management** - Consider if cross-component communication is needed
3. **Error Boundaries** - Catch and display errors gracefully
4. **Type Safety** - Add nullable reference type annotations to all models
5. **Data Validation** - Validate JSON deserialization with FluentValidation
6. **Caching Strategy** - Consider cache invalidation timing for hero images
7. **Testing** - Add unit tests for services and component logic
