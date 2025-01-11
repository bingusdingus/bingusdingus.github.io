class Visualizer extends HTMLElement {
    constructor(){
        super();
    }

    async connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });

        shadow.innerHTML = await (await fetch("/content/components/visualizer/visualizer.html")).text();
    }
}

customElements.define('visualizer-page', Visualizer);