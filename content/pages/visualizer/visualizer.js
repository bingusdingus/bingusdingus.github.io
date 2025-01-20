import * as tools from '/content/js/tools.js';

export default class Visualizer extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {
        await tools.getPage(this, 'visualizer');
    }
}