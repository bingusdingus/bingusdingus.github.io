import * as tools from "/content/js/tools.js";

class Controller extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });
        await tools.getComponentRaw("button", shadow);
    }
}

customElements.define("controller-button", Controller);
