import * as tools from "/content/js/tools.js";

export default class Controller extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {
        const buttonContainer = (await tools.getComponentHTML('button'))[0];
        const button = buttonContainer.children[0];

        const col = this.getAttribute('col') ?? '3';
        const offset = this.getAttribute('offset') ?? '0';
        const rounded = this.getAttribute('rounded') ?? 'true';
        const active = this.getAttribute('active');

        buttonContainer.classList.add(`col-${col}`);
        buttonContainer.classList.add(`offset-${offset}`);
        buttonContainer.style.opacity = (active == 'true') ? '1' : '0.5';

        if (rounded == 'true') button.classList.add('rounded-circle');

        this.replaceWith(buttonContainer);
    }
}