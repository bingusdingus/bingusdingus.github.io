document.querySelectorAll('a.link').forEach(e => {
    if (e.getAttribute('href') == window.location.pathname)
        e.classList.add('active');
});