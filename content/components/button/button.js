import * as tools from '/content/js/tools.js';

export default class Controller extends HTMLElement {
    static buttonIndexes = {
        A: 0,
        B: 1,
        X: 2,
        Y: 3,
        RB: 5,
        RT: 7,
        LB: 4,
        LT: 8,
        U: 12,
        D: 13,
        L: 14,
        R: 15,
    };

    constructor() {
        super();
    }

    async connectedCallback() {
        const buttonContainer = (await tools.getComponentHTML('button'))[0];
        const button = buttonContainer.children[0];

        const col = this.getAttribute('col') ?? '3';
        const offset = this.getAttribute('offset') ?? '0';
        const rounded = this.getAttribute('rounded') ?? 'true';

        buttonContainer.classList.add(`col-${col}`);
        buttonContainer.classList.add(`offset-${offset}`);

        if (rounded == 'true') button.classList.add('rounded-circle');

        if (this.hasAttribute('target-button')) {
            const targetButton = this.getAttribute('target-button');

            buttonContainer.style.opacity = '0.5';
        }

        this.replaceWith(buttonContainer);
    }
}
