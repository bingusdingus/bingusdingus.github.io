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

    console.log(currentThemeIconClass);
    currentThemeIcon.className = (currentThemeIconClass == 'bi bi-moon-fill') ? 'bi bi-sun-fill' : 'bi bi-moon-fill'
})