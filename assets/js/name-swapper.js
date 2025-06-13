const names = ['blucheese', 'blu_cheese', 'Aperature Science Prototype XR7', 'stinkysteve95', 'waffleboy53', 'farmerbill1982', 'BatmanFan33039'];
const nameDisplay = document.getElementById('name-display');
const nameDisplayBar = document.getElementById('name-display-bar');

let usedNames = ['blucheese'];

const duration = 5000;
let zero = document.timeline.currentTime;

requestAnimationFrame(progressTowardsNextName);

function progressTowardsNextName(timestamp) {
    const value = (timestamp - zero) / duration;
    const percent = value * 100;

    nameDisplayBar.style.width = (percent > 100) ? '100%' : `${percent}%`;

    if (value > 1) {
        zero = timestamp;
        pickNewName();
    }

    requestAnimationFrame((t) => progressTowardsNextName(t));
}

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