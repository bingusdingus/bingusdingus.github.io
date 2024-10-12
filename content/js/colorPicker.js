class ColorPicker extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });

        const style = document.createElement('link');
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css');
        style.setAttribute('integrity', 'sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH');
        style.setAttribute('crossorigin', 'anonymous');

        const card = document.createElement('div');
        card.setAttribute('class', 'card');

        const header = document.createElement('h5');
        header.setAttribute('class', 'card-header');
        header.innerText = "Base";

        const body = document.createElement('div');
        body.setAttribute('class', 'card-body');

        const row = document.createElement('div');
        row.setAttribute('class', 'row');

        const baseLabel = document.createElement('label');
        baseLabel.setAttribute('class', 'col-form-label col-lg-3');

        const baseInputContainer = document.createElement('div');
        baseInputContainer.setAttribute('class', 'col-lg-9 d-flex align-items-center');

        const colorLabel = baseLabel.cloneNode();
        colorLabel.setAttribute("for", "color");
        colorLabel.innerText = "Color";

        const colorContainer = baseInputContainer.cloneNode();

        const color = document.createElement("input");
        color.setAttribute("id", "color");
        color.setAttribute("type", "color");
        color.setAttribute("class", "form-control");
        // TODO: Set Value

        const alphaLabel = baseLabel.cloneNode();
        alphaLabel.setAttribute("for", "range");
        alphaLabel.innerText = "Opacity"

        const alphaContainer = baseInputContainer.cloneNode();

        const alpha = document.createElement("input");
        alpha.setAttribute("id", "range");
        alpha.setAttribute("type", "range");
        alpha.setAttribute("class", "form-range");
        // TODO: Set Value

        shadow.appendChild(style);
        shadow.appendChild(card);
        card.appendChild(header);
        card.appendChild(body);
        body.appendChild(row);
        row.appendChild(colorLabel);
        row.appendChild(colorContainer);
        colorContainer.appendChild(color);
        row.appendChild(alphaLabel);
        row.appendChild(alphaContainer);
        alphaContainer.appendChild(alpha);
    }
}

customElements.define('color-picker', ColorPicker);
