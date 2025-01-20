import * as tools from '/content/js/tools.js';

export default class Home extends HTMLElement {
    constructor() {
        super();
    }

    async connectedCallback() {
        await tools.getPage(this, 'home');

        const names = [
            'bingodingo',
            'bumpusdumpus',
            'burpgreepo',
            'blucheese',
            'blu_cheese',
            'Aperture Science Prototype XR7',
            'waffleboy53',
            'stinkysteve95',
            'catlover1995',
            'farmerbill1982',
            'BatmanFan33039',
        ];

        const nameDisplay = document.getElementById('nameDisplay');
        const nameBar = document.getElementById('nameBar');
        const nameBarDisplay = nameBar.querySelector('.progress-bar');

        const grabName = () => names[Math.floor(Math.random() * names.length)];
        const randomName = (oldName, newName) => (oldName != newName ? newName : randomName(oldName, grabName()));
        const getNewName = () => (nameDisplay.innerHTML = randomName(nameDisplay.innerHTML, grabName()));

        getNewName();

        let start = performance.now();
        const step = () => {
            const now = performance.now();
            let delta = Math.min((now - start) / 5000, 1);
            const percent = delta * 100;

            nameBar.setAttribute('aria-valuenow', percent);
            nameBarDisplay.style.width = `${percent}%`;

            if (delta >= 1) {
                start = performance.now();
                delta = 0;
                getNewName();
            }

            if (delta < 1) requestAnimationFrame(step);
        };

        step();
    }
}