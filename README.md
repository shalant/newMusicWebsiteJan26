# New Music Website

A modern, responsive portfolio website built with Blazor WebAssembly showcasing music, albums, education, and portfolio projects.

## Project Structure

```
src/BlazorApp/
├── Components/          # Razor components for page sections
│   ├── Home.razor       # Hero section with site properties
│   ├── Albums.razor     # Album showcase
│   ├── About.razor      # About section
│   ├── Education.razor  # Education background
│   └── Portfolio.razor  # Project portfolio
├── Layout/              # Layout components
│   ├── MainLayout.razor # Main layout wrapper
│   ├── Header.razor     # Navigation header
│   └── Footer.razor     # Contact footer with social links
├── Models/              # Data models
│   ├── Album.cs         # Album and Review data
│   ├── Education.cs     # Education history
│   ├── Project.cs       # Portfolio project
│   ├── SiteProperties.cs# Site name, title, email, social handles
│   ├── SocialIcons.cs   # Social media icon URLs
│   ├── HeroImage.cs     # Background hero image metadata
│   └── AboutMe.cs       # About section content
├── Services/            # Business logic services
│   └── HeroImageService.cs # Loads and caches hero images
├── wwwroot/
│   ├── css/             # Global styles
│   ├── images/          # Images and icons
│   └── sample-data/     # JSON data files
├── Program.cs           # App entry point and DI setup
├── App.razor            # Root component
└── _Imports.razor       # Global imports
```

## Data Structure

All data is loaded from JSON files in `wwwroot/sample-data/`:

- `siteproperties.json` - Site name, title, contact email, social media handles
- `socialicons.json` - URLs/paths for social media icons
- `albums.json` - Album titles, covers, descriptions, and reviews
- `education.json` - Education history and credentials
- `projects.json` - Portfolio projects
- `heroimages.json` - Background images for each section

## Architecture

### Components
- **Page Components**: Home, Albums, About, Education, Portfolio are self-contained sections
- Each component loads its own data via HttpClient
- Uses MudBlazor for UI components (dialogs, snackbars)

### Services
- **HeroImageService**: Caches hero images at startup and provides filtered access
  - Loads `heroimages.json` once and shares across components
  - Use `GetHeroAsync(predicate)` to find specific hero images

### Styling
- Global styles in `wwwroot/css/app.css`
- Component-specific styles in `Layout/*.razor.css` files
- Uses responsive design with CSS Grid and Flexbox
- Implements glass-morphism effects with `backdrop-filter: blur()`

## Key Technologies

- **Blazor WebAssembly**: C# running in the browser
- **MudBlazor**: Material Design component library
- **Bootstrap**: Responsive grid system
- **CSS Grid & Flexbox**: Modern layout techniques

## Development

### Prerequisites
- .NET 8.0 SDK
- Visual Studio or VS Code with C# extension

### Running Locally
```bash
dotnet run --project src/BlazorApp
```
Navigate to `https://localhost:5001`

### Building
```bash
dotnet publish src/BlazorApp -c Release
```

## Known Issues & Technical Debt

1. **Index Out of Bounds**: Albums.razor assumes exactly 4 albums without validation
2. **No Error Handling**: JSON load failures in components don't display error states
3. **Inline Styles**: Multiple components use inline CSS instead of CSS classes
4. **Code Duplication**: Albums display logic is repeated 4 times
5. **Missing Nullable Annotations**: Models should use C# nullable reference types

## Future Improvements

- Add error boundaries and fallback UI
- Refactor inline styles to CSS classes
- Convert hardcoded loops to data-driven rendering
- Add form validation for contact section
- Implement lazy loading for images
- Add dark mode support
