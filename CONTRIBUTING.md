# Contributing Guidelines

## Code Style

### C# / Razor Components
- Use **file-scoped namespaces** (`namespace BlazorApp.Models;`)
- Use **nullable reference types** - enable `<nullable>enable</nullable>` in csproj
- Prefer `required` keyword for mandatory properties
- Use auto-properties with initialization for data classes
- Format: `public string PropertyName { get; set; } = string.Empty;`

### CSS Naming Convention (BEM)
```css
/* Block */
.albums { }

/* Element (child of block) */
.albums__glass-pane { }

/* Modifier (variant) */
.albums__glass-pane--highlighted { }
```

Classes should be:
- Lowercase with hyphens between words
- Semantic and descriptive
- Scoped to their block (avoid global `.button`, use `.component__button`)

### Razor Markup
- Use **CSS classes** for styling, not inline `style=` attributes
- Null-coalescing checks: prefer `is null` / `is not null` over `== null`
- String checks: use `string.IsNullOrWhiteSpace(value) is false` for clarity
- Template syntax: `@property.Name` (not `@(property.Name)` unless required)

## Component Best Practices

### Data Loading
```csharp
[Parameter, EditorRequired]
public required HttpClient Http { get; set; }

private List<Album>? albums;

protected override async Task OnInitializedAsync()
{
    albums = await Http.GetFromJsonAsync<List<Album>>("sample-data/albums.json");
}
```

- Always mark `[EditorRequired]` on injected dependencies
- Initialize collections as nullable (`List<T>?`)
- Check for null before rendering: `@if (albums is null) { ... }`
- Use `await` on HTTP calls in `OnInitializedAsync()`

### Rendering
- Use **data-driven loops** (`@foreach`, `@for`) instead of hardcoded markup
- Always add bounds checking when accessing list items by index
- Provide fallback UI for null/empty states
- Add meaningful alt text to all images

## File Structure

### Models
```csharp
namespace BlazorApp.Models;

public class Album
{
    public string Title { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
}
```

- One public class per file
- File name matches class name (PascalCase)
- Initialize string properties to `string.Empty` (not null)

### Components
```razor
<section class="component-name" id="component-id">
    @if (data is null)
    {
        <p>Loading...</p>
    }
    else
    {
        <!-- render content -->
    }
</section>

@code {
    [Parameter, EditorRequired]
    public required HttpClient Http { get; set; }

    private Model? data;

    protected override async Task OnInitializedAsync()
    {
        data = await Http.GetFromJsonAsync<Model>("sample-data/data.json");
    }
}
```

## Common Pitfalls to Avoid

❌ **Don't:**
- Use inline styles (`style="..."`)
- Hardcode array indices without bounds checking
- Catch exceptions silently (`catch { }`)
- Use `string == null` (use `is null`)
- Create duplicate component code (use `@foreach` instead)

✅ **Do:**
- Use CSS classes for all styling
- Validate collection length before indexing
- Let exceptions propagate or handle explicitly
- Use null-conditional operators (`?.`)
- Extract repeated markup into loops or components

## Pull Request Checklist

- [ ] Code follows style guide
- [ ] No inline styles (use CSS classes)
- [ ] All collections have bounds checking
- [ ] Components have null-check rendering
- [ ] CSS is organized and commented
- [ ] No commented-out code
- [ ] Related documentation updated
