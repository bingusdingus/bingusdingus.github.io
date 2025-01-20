import * as tools from '/content/js/tools.js';

export default class navigationLink extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {
        const link = (await tools.getComponentHTML('navigationLink'))[0];
        const header = this.getAttribute('header');
        const target = this.getAttribute('target');
        const active = this.getAttribute('active');

        link.id = `${target}Link`;
        if (active == 'true') link.classList.add('active');
        link.setAttribute('data-header', header);
        link.setAttribute('data-bs-target', `#${target}`);
        link.setAttribute('aria-controls', target);
        link.setAttribute('aria-selected', active == 'true' ? 'true' : 'false');
        link.innerText = header;
        link.addEventListener('show.bs.tab', (e) => {
            document.getElementById('applicationLabel').innerText = header;
            bootstrap.Offcanvas.getOrCreateInstance('#navigation').hide();
        });

        this.replaceWith(link);
    }
}
