namespace BlazorApp.Services;

public class ThemeService
{
    public event Action? OnThemeChanged;

    private string _currentTheme = "dark";

    public string CurrentTheme
    {
        get => _currentTheme;
        set
        {
            if (_currentTheme != value)
            {
                _currentTheme = value;
                OnThemeChanged?.Invoke();
            }
        }
    }

    public List<Theme> AvailableThemes { get; } = new()
    {
        new Theme { Id = "dark", Name = "Dark Modern", Description = "Sleek dark theme with warm accents" },
        new Theme { Id = "midnight", Name = "Midnight", Description = "Pure black with vibrant neon accents" },
        new Theme { Id = "warm", Name = "Warm Retro", Description = "Vintage warmth with golden tones" },
        new Theme { Id = "minimal", Name = "Minimal", Description = "Clean grayscale with subtle accents" },
        new Theme { Id = "ocean", Name = "Ocean", Description = "Deep blue tones with cool accents" },
        new Theme { Id = "forest", Name = "Forest", Description = "Natural earth tones and greens" },
    };

    public Theme? GetTheme(string id) => AvailableThemes.FirstOrDefault(t => t.Id == id);
}

public class Theme
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}
