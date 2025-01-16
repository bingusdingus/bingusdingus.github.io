class Controller extends HTMLElement {
    constructor(){
        super();
    }

    async connectedCallback() {
        console.log('test');
        const shadow = this.attachShadow({ mode: 'open' });
        await fetch("/content/components/controller/controller.html").then(r => r.text()).then(h => shadow.appendChild(new DOMParser().parseFromString(h, 'text/html').documentElement));
    }
}

customElements.define('controller-display', Controller);