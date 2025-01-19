export async function getComponent(componentName, shadow) {
    await fetch(`/content/components/${componentName}/${componentName}.html`).then(r => r.text()).then(h => shadow.appendChild(new DOMParser().parseFromString(h, 'text/html').documentElement));
}

export async function getSubComponent(componentName, shadow) {
    await fetch(`/content/components/${componentName}/${componentName}.js`).then(r => r.text()).then(s => {
        let script = document.createElement('script');
        script.type = 'module';
        script.innerHTML = s;
        shadow.appendChild(script);
    });
}