const applicationLabel = document.getElementById('applicationLabel');
const tabs = document.querySelectorAll('#links button[data-bs-toggle="pill"]');

tabs.forEach((x) => x.addEventListener('show.bs.tab', e => {
    applicationLabel.innerText = e.target.getAttribute('data-header');
    bootstrap.Offcanvas.getOrCreateInstance('#navigation').hide();
}));