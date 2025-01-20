export async function getPage(context, page) {
    context.replaceWith(...getHTML(await getText('pages', page)));
}

export async function getPageHTML(page) {
    return getHTML(await getText('pages', page));
}

export async function getComponent(context, component) {
    context.replaceWith(...getHTML(await getText('components', component)));
}

export async function getComponentHTML(component) {
    return getHTML(await getText('components', component));
}

async function getText(folder, name) {
    return (await fetch(`/content/${folder}/${name}/${name}.html`)).text();
}

function getHTML(text) {
    return new DOMParser().parseFromString(text, 'text/html').documentElement.querySelectorAll('body > *');
}