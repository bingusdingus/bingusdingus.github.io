const names = ['blucheese', 'blu_cheese', 'Aperature Science Prototype XR7', 'stinkysteve95', 'waffleboy53', 'farmerbill1982', 'BatmanFan33039'];
const nameDisplay = document.getElementById('name-display');

let usedNames = ['blucheese'];

const interval = setInterval(pickNewName, 5000);

function pickNewName() {
    let filteredNames = names.filter((name) => !usedNames.includes(name));

    if (filteredNames.length == 0) {
        filteredNames = names;
        usedNames = [];
    }

    const name = filteredNames[Math.floor(Math.random() * filteredNames.length)]
    usedNames.push(name);

    nameDisplay.innerText = name;
}