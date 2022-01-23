let gamepad = {};
let elements = {};
let canvas = null;
let ctx = null;

let interval;
window.onload = () => {
    if (!('ongamepadconnected' in window)) {
        interval = setInterval(() => {
            pollGamepads();

            if (gamepad.id) {
                handleInputs();
                clearInterval(interval);
            }
        }, 500);
    } else {
        window.ongamepadconnected = (gamepad) => handleGamepads(gamepad, true);
        window.ongamepaddisconnected = (gamepad) => handleGamepads(gamepad, false);
    }

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
}

function pollGamepads() {
    let gps = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);

    if (gps[0])
        gamepad = gps[0];
}

function handleGamepads(event, connecting) {
    if (connecting) {
        gamepad = event.gamepad;
        handleInputs();
    } else {
        gamepad = {};
    }
}

function handleInputs() {
    Object.values(elements).forEach((element) => element.classList.remove('button-active'));

    if (!('ongamepadconnected' in window))
        pollGamepads();

    let d_up = gamepad.buttons[12];
    let d_dn = gamepad.buttons[13];
    let d_lt = gamepad.buttons[14];
    let d_rt = gamepad.buttons[15];

    handleDirections(isPressed(d_up), isPressed(d_dn), isPressed(d_lt), isPressed(d_rt));

    let p = gamepad.buttons[2];
    let k = gamepad.buttons[3];
    let s = gamepad.buttons[5];
    let h = gamepad.buttons[4];

    let d = gamepad.buttons[0];
    let ex1 = gamepad.buttons[1];
    let ex2 = gamepad.buttons[7];
    let ex3 = gamepad.buttons[6];

    if (isPressed(p))
        elements.punch.classList.add('button-active');

    if (isPressed(k))
        elements.kick.classList.add('button-active');

    if (isPressed(s))
        elements.slash.classList.add('button-active');

    if (isPressed(h))
        elements.heavySlash.classList.add('button-active');

    if (isPressed(d))
        elements.dust.classList.add('button-active');

    if (isPressed(ex1))
        elements.extraOne.classList.add('button-active');

    if (isPressed(ex2))
        elements.extraTwo.classList.add('button-active');

    if (isPressed(ex3))
        elements.extraThree.classList.add('button-active');

    requestAnimationFrame(handleInputs);
}

function isPressed(button) {
    if (typeof (button) == 'object')
        return button.pressed;

    return b == 1.0;
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

    drawStick((canvas.width / 2) + x_offset, (canvas.height / 2) + y_offset, 50);
}

function drawStick(x, y, size) {
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, size, 0, 2 * Math.PI);
    ctx.fillStyle = '#000';
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(x, y);
    ctx.lineWidth = 20;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#525252'
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fillStyle = '#6b0700';
    ctx.shadowColor = '#000';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.fill();
}