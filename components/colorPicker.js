

const template = document.createElement('template');
template.innerHTML = `
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">

<div class="card">
    <div id="header" class="card-header"></div>
    <slot name="body"></slot>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">
            <div class="d-flex flex-row align-items-center">
                <label class="pe-3" for="bRNum">R</label>
                <input 
                    type="number" 
                    id="rNum" 
                    class="form-control w-25" 
                    min="0" 
                    max="255" />
                <input 
                    type="range" 
                    id="rRange" 
                    class="form-range ps-3" 
                    min="0" 
                    max="255" />
            </div>
        </li>
        <li class="list-group-item">
            <div class="d-flex flex-row align-items-center">
                <label class="pe-3" for="bGNum">G</label>
                <input 
                    type="number" 
                    id="gNum" 
                    class="form-control w-25" 
                    min="0" 
                    max="255" />
                <input 
                    type="range" 
                    id="gRange" 
                    class="form-range ps-3" 
                    min="0" 
                    max="255" />
            </div>
        </li>
        <li class="list-group-item">
            <div class="d-flex flex-row align-items-center">
                <label class="pe-3" for="bBNum">B</label>
                <input 
                    type="number" 
                    id="bNum" 
                    class="form-control w-25" 
                    min="0" 
                    max="255" />
                <input 
                    type="range" 
                    id="bRange" 
                    class="form-range ps-3" 
                    min="0" 
                    max="255" />
            </div>
        </li>
        <li class="list-group-item">
            <div class="d-flex flex-row align-items-center">
                <label class="pe-3" for="bANum">A</label>
                <input 
                    type="number" 
                    id="aNum" 
                    class="form-control w-25" 
                    min="0" 
                    max="1"
                    step="0.01" />
                <input 
                    type="range" 
                    id="aRange" 
                    class="form-range ps-3" 
                    min="0" 
                    max="1"
                    step="0.01" />
            </div>
        </li>
    </ul>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
            crossorigin="anonymous"></script>
`;

class ColorPicker extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.updateColor('r', this.getAttribute('red'));
        this.updateColor('g', this.getAttribute('green'));
        this.updateColor('b', this.getAttribute('blue'));
        this.updateColor('a', this.getAttribute('alpha'));

        this.dispatch();
    }

    dispatch() {
        this.dispatchEvent(new CustomEvent('colorchanged', {
            bubbles: true,
            composed: true,
            detail: {
                color: this.formatRGBAString(),
            }
        }));
    }

    connectedCallback() {
        this.shadowRoot.querySelectorAll('[id^="r"]').forEach((e) => e.addEventListener('input', () => { this.updateColor('r', e.value); this.dispatch(); }));
        this.shadowRoot.querySelectorAll('[id^="g"]').forEach((e) => e.addEventListener('input', () => { this.updateColor('g', e.value); this.dispatch(); }));
        this.shadowRoot.querySelectorAll('[id^="b"]').forEach((e) => e.addEventListener('input', () => { this.updateColor('b', e.value); this.dispatch(); }));
        this.shadowRoot.querySelectorAll('[id^="a"]').forEach((e) => e.addEventListener('input', () => { this.updateColor('a', e.value); this.dispatch(); }));
    }

    disconnectedCallback() {
        this.shadowRoot.querySelectorAll('[id^="r"]').forEach((e) => e.removeEventListener());
        this.shadowRoot.querySelectorAll('[id^="g"]').forEach((e) => e.removeEventListener());
        this.shadowRoot.querySelectorAll('[id^="b"]').forEach((e) => e.removeEventListener());
        this.shadowRoot.querySelectorAll('[id^="a"]').forEach((e) => e.removeEventListener());
    }

    updateColor(color, value) {
        this.shadowRoot.querySelectorAll(`[id^="${color}"]`).forEach((e) => e.value = value);
        this.shadowRoot.getElementById('header').style.backgroundColor = this.formatRGBAString();
    }

    formatRGBAString() {
        let r = this.shadowRoot.getElementById('rNum').value;
        let g = this.shadowRoot.getElementById('gNum').value;
        let b = this.shadowRoot.getElementById('bNum').value;
        let a = this.shadowRoot.getElementById('aNum').value;

        return `rgba(${r}, ${g}, ${b}, ${a})`;
    }
}

window.customElements.define('color-picker', ColorPicker);