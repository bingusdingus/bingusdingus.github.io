import * as tools from '/content/js/tools.js';

class Visualizer extends HTMLElement {
    constructor(){
        super();
    }

    async connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        await tools.getComponent('visualizer', shadow);
        await tools.getSubComponent('controller', shadow);
    }
}

customElements.define('visualizer-page', Visualizer);