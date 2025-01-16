class Visualizer extends HTMLElement {
    constructor(){
        super();
    }

    async connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        await fetch("/content/components/visualizer/visualizer.html").then(r => r.text()).then(h => shadow.appendChild(new DOMParser().parseFromString(h, 'text/html').documentElement));
    }
}

customElements.define('visualizer-page', Visualizer);