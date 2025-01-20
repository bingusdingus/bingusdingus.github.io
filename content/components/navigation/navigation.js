import * as tools from '/content/js/tools.js';

export default class Navigation extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {
        await tools.getComponent(this, 'navigation');
    }
}