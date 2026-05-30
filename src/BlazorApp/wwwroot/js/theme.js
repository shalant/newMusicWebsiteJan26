export function applyTheme(themeId) {
    document.documentElement.setAttribute('data-theme', themeId);
    localStorage.setItem('theme', themeId);
}

export function getStoredTheme() {
    return localStorage.getItem('theme') || 'dark';
}

export function initializeTheme() {
    const theme = getStoredTheme();
    applyTheme(theme);
    return theme;
}
