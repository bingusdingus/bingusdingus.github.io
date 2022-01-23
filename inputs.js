// const requestAnimationFrame = window.mozRequestAnimationFrame || window.requestAnimationFrame;

let gamepads = {};
let elements = {};
let canvas = null;
let ctx = null;

function handleGamepads(event, connecting) {
    console.log(event);

    let gamepad = event.gamepad;

    if (connecting) {
        gamepads[gamepad.index] = gamepad;

        setInterval(() => handleInputs(), 16);
    } else {
        delete gamepads[gamepad.index];
    }
}

function drawCircle(x, y, size) {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fillStyle = '#6b0700';
    ctx.fill();
}

function handleDirections(up, down, left, right) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let x = 0;
    let y = 0;

    if (up)
        y = -1;

    if (down)
        y = 1;

    if (left)
        x = -1;

    if (right)
        x = 1;

    let x_offset = x * (canvas.width / 4);
    let y_offset = y * (canvas.height / 4);

    drawCircle((canvas.width / 2) + x_offset, (canvas.height / 2) + y_offset, 50);
}

function handleInputs() {
    Object.values(elements).forEach((element) => element.classList.remove('button-active'));

    let gamepad = gamepads[0];

    let d_up = gamepad.buttons[12];
    let d_dn = gamepad.buttons[13];
    let d_lt = gamepad.buttons[14];
    let d_rt = gamepad.buttons[15];

    handleDirections(d_up.pressed, d_dn.pressed, d_lt.pressed, d_rt.pressed);

    let p = gamepad.buttons[2];
    let k = gamepad.buttons[3];
    let s = gamepad.buttons[5];
    let h = gamepad.buttons[4];

    let d = gamepad.buttons[0];
    let ex1 = gamepad.buttons[1];
    let ex2 = gamepad.buttons[7];
    let ex3 = gamepad.buttons[6];

    if (p.pressed)
        elements.punch.classList.add('button-active');

    if (k.pressed)
        elements.kick.classList.add('button-active');

    if (s.pressed)
        elements.slash.classList.add('button-active');

    if (h.pressed)
        elements.heavySlash.classList.add('button-active');

    if (d.pressed)
        elements.dust.classList.add('button-active');

    if (ex1.pressed)
        elements.extraOne.classList.add('button-active');

    if (ex2.pressed)
        elements.extraTwo.classList.add('button-active');

    if (ex3.pressed)
        elements.extraThree.classList.add('button-active');
}

window.onload = (event) => {
    elements = {
        punch: document.getElementById('p'),
        kick: document.getElementById('k'),
        slash: document.getElementById('s'),
        heavySlash: document.getElementById('h'),
        dust: document.getElementById('d'),
        extraOne: document.getElementById('a'),
        extraTwo: document.getElementById('b'),
        extraThree: document.getElementById('c')
    };

    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    window.ongamepadconnected = (gamepad) => handleGamepads(gamepad, true);
    window.ongamepaddisconnected = (gamepad) => handleGamepads(gamepad, false);
}