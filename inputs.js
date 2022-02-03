let gamepad = {};
let inputsBuffer = [];
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

    if (isPressed(p)) {
        elements.punch.classList.add('button-active');
        addToInputBuffer('p');
    }

    if (isPressed(k)) {
        elements.kick.classList.add('button-active');
        addToInputBuffer('k');
    }

    if (isPressed(s)) {
        elements.slash.classList.add('button-active');
        addToInputBuffer('s');
    }

    if (isPressed(h)) {
        elements.heavySlash.classList.add('button-active');
        addToInputBuffer('h');
    }

    if (isPressed(d)) {
        elements.dust.classList.add('button-active');
        addToInputBuffer('d');
    }

    if (isPressed(ex1)) {
        elements.extraOne.classList.add('button-active');
        addToInputBuffer('ex1');
    }

    if (isPressed(ex2)) {
        elements.extraTwo.classList.add('button-active');
        addToInputBuffer('ex2');
    }

    if (isPressed(ex3)) {
        elements.extraThree.classList.add('button-active');
        addToInputBuffer('ex3');
    }

    parseAndDisplayInputs();

    requestAnimationFrame(handleInputs);
}

function isPressed(button) {
    if (typeof (button) == 'object')
        return button.pressed;

    return b == 1.0;
}

function addToInputBuffer(input) {
    inputsBuffer.push({ input: input, timestamp: Date.now() });

    if (inputsBuffer.length > 720) // 5 seconds of inputs straight
        inputsBuffer.shift();
}

function parseAndDisplayInputs() {
    let inputs = ['', '', '', '', '', '', '', '', '', ''];

    for (let i = 0; i < inputsBuffer.length; i++) {
        let input = inputsBuffer[i];
        let prevInput = -1

        if ((i - 1) != -1)
            prevInput = inputsBuffer.map(e => e.input).lastIndexOf(input.input, i - 1);

        if (prevInput != -1) {
            let pI = inputsBuffer[prevInput];
            let cI = input;

            if (!(Math.abs(cI.timestamp - pI.timestamp) <= 10))
                inputs.push(cI.input);
        } else
            inputs.push(input.input);

        if (inputs.length > 10)
            inputs.shift();
    }

    let displays = document.getElementById('inputDisplay').children;
    for (let i = 0; i < inputs.length; i++) {
        displays[i].className = 'button rounded-circle input-display d-flex justify-content-center';
        displays[i].firstChild.className = '';

        if (inputs[i] != '') {
            switch (inputs[i]) {
                case 'p':
                    displays[i].classList.add('p');
                    break;
                case 'k':
                    displays[i].classList.add('k');
                    break;
                case 's':
                    displays[i].classList.add('s');
                    break;
                case 'h':
                    displays[i].classList.add('h');
                    break;
                case 'd':
                    displays[i].classList.add('d');
                    break;
                case 'ex1':
                case 'ex2':
                case 'ex3':
                    displays[i].classList.add('ex');
                    break;
                case 'UB':
                    displays[i].firstChild.className = "bi bi-arrow-up-left";
                    break;
                case 'U':
                    displays[i].firstChild.className = "bi bi-arrow-up";
                    break;
                case 'UF':
                    displays[i].firstChild.className = "bi bi-arrow-up-right";
                    break;
                case 'B':
                    displays[i].firstChild.className = "bi bi-arrow-left";
                    break;
                case 'F':
                    displays[i].firstChild.className = "bi bi-arrow-right";
                    break;
                case 'DB':
                    displays[i].firstChild.className = "bi bi-arrow-down-left";
                    break;
                case 'D':
                    displays[i].firstChild.className = "bi bi-arrow-down";
                    break;
                case 'DF':
                    displays[i].firstChild.className = "bi bi-arrow-down-right";
                    break;
            }
        } else
            continue;
    }
}

function handleDirections(up, down, left, right) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let x = 0;
    let y = 0;

    let dir = ''

    if (up) {
        y = -1;
        dir = 'U';
    }

    if (down) {
        y = 1;
        dir = 'D';
    }

    if (left) {
        x = -1;
        dir += 'B'
    }

    if (right) {
        x = 1;
        dir += 'F'
    }

    if (dir != '') // dont account for neutral
        addToInputBuffer(dir)

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