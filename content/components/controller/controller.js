import * as tools from '/content/js/tools.js';

export default class Controller extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {
        await tools.getComponent(this, 'controller');
    }
}
