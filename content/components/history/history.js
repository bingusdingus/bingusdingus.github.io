import * as tools from '/content/js/tools.js';

export default class History extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {
        await tools.getComponent(this, 'history');
    }
}