document.querySelectorAll('a.link').forEach(e => {
    if (e.getAttribute('href') == window.location.pathname)
        e.classList.add('active');
});

document.getElementById('switch-theme').addEventListener('click', e => {
    const html = document.querySelector('html');
    const currentTheme = html.getAttribute('data-bs-theme');

    html.setAttribute('data-bs-theme', (currentTheme == 'light') ? 'dark' : 'light');

    const currentThemeIcon = document.getElementById('switch-theme-icon');
    const currentThemeIconClass = currentThemeIcon.className;

    currentThemeIcon.className = (currentThemeIconClass == 'bi bi-moon-fill') ? 'bi bi-sun-fill' : 'bi bi-moon-fill'
});

document.getElementById('toggle-navigation').addEventListener('click', e => {
    const navigationIcon = document.getElementById('toggle-navigation-icon');
    const navigationIconClass = navigationIcon.className;

    navigationIcon.className = (navigationIconClass == 'bi bi-caret-down-fill') ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'
});