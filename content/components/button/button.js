import * as tools from '/content/js/tools.js';

export default class Button extends HTMLElement {
    buttonIndexes = {
        A: 0,
        B: 1,
        X: 2,
        Y: 3,
        RB: 5,
        RT: 7,
        LB: 4,
        LT: 6,
        U: 12,
        D: 13,
        L: 14,
        R: 15,
    };
    buttonLoop = null;

    constructor() {
        super();
    }

    async connectedCallback() {
        const buttonContainer = (await tools.getComponentHTML('button'))[0];
        const button = buttonContainer.children[0];

        const col = this.getAttribute('col') ?? '3';
        const offset = this.getAttribute('offset') ?? '0';
        const rounded = this.getAttribute('rounded') ?? 'true';
        const color = this.getAttribute('color') ?? 'rgba(0, 0, 0, 1)';
        const text = this.getAttribute('text');

        buttonContainer.classList.add(`col-${col}`);
        buttonContainer.classList.add(`offset-${offset}`);

        button.style.backgroundColor = color;
        button.innerText = text;

        if (rounded == 'true') button.classList.add('rounded-circle');

        if (this.hasAttribute('target-button')) {
            window.addEventListener('gamepadconnected', (e) => {
                const targetButton = this.getAttribute('target-button');
                const buttonIndex = this.buttonIndexes[targetButton];

                this.handleButton(buttonContainer, buttonIndex);
            });

            window.addEventListener('gamepaddisconnected', (e) => {
                buttonContainer.style.opacity = '1';

                cancelAnimationFrame(this.buttonLoop);
            });
        }

        this.replaceWith(buttonContainer);
    }

    handleButton(container, index) {
        const gamepad = navigator.getGamepads()[0];

        container.style.opacity = (gamepad.buttons[index].pressed) ? '1' : '0.5';

        this.buttonLoop = requestAnimationFrame(() => this.handleButton(container, index));
    }
}
