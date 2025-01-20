import * as tools from '/content/js/tools.js';

export default class Overlay extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback(){
        tools.getPage(this, 'overlay');
    }
}