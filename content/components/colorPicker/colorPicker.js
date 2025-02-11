import * as tools from '/content/js/tools.js';

export default class ColorPicker extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {
        await tools.getComponent(this, 'colorPicker');
    }
}