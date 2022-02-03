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
                let loop = setInterval(handleInputs, 16);
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
        let loop = setInterval(handleInputs, 16);
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
}

function isPressed(button) {
    if (typeof (button) == 'object')
        return button.pressed;

    return b == 1.0;
}

function addToInputBuffer(input) {
    if (inputsBuffer.length > 0) {
        let prevInput = inputsBuffer[inputsBuffer.length - 1];

        if (input == prevInput.input) {

            let isHeld = (Math.abs(Date.now() - prevInput.timestamp) <= 35);

            if (isHeld)
                inputsBuffer[inputsBuffer.length - 1].timestamp = Date.now();
            else
                inputsBuffer.push({ input: input, timestamp: Date.now() });
        } else {
            let prevOfType = inputsBuffer.map(e => e.input).lastIndexOf(input);

            if (prevOfType != -1) {
                let isHeld = (Math.abs(Date.now() - inputsBuffer[prevOfType].timestamp) <= 35);

                if (isHeld)
                    inputsBuffer[prevOfType].timestamp = Date.now();
                else
                    inputsBuffer.push({ input: input, timestamp: Date.now() });
            } else
                inputsBuffer.push({ input: input, timestamp: Date.now() });

        }
    } else
        inputsBuffer.push({ input: input, timestamp: Date.now() });

    if (inputsBuffer.length > 10)
        inputsBuffer.shift();
}

let cachedBuffer = [];
function parseAndDisplayInputs() {
    let baseClass = 'button rounded-circle input-display d-flex justify-content-center'

    if (!isEqual(inputsBuffer, cachedBuffer)) {
        let displays = document.getElementById('inputDisplay').children;
        for (let i = 0; i < inputsBuffer.length; i++) {
            displays[i].className = baseClass;
            displays[i].firstChild.className = '';

            let currInput = inputsBuffer[i]
            if (currInput.input == 'p')
                displays[i].classList.add('p');

            if (currInput.input == 'k')
                displays[i].classList.add('k');

            if (currInput.input == 's')
                displays[i].classList.add('s');

            if (currInput.input == 'h')
                displays[i].classList.add('h');

            if (currInput.input == 'd')
                displays[i].classList.add('d');

            if (currInput.input.includes('ex'))
                displays[i].classList.add('ex');

            if (currInput.input == 'UB')
                displays[i].firstChild.className = "bi bi-arrow-up-left";

            if (currInput.input == 'U')
                displays[i].firstChild.className = "bi bi-arrow-up";

            if (currInput.input == 'UF')
                displays[i].firstChild.className = "bi bi-arrow-up-right";

            if (currInput.input == 'B')
                displays[i].firstChild.className = "bi bi-arrow-left";

            if (currInput.input == 'F')
                displays[i].firstChild.className = "bi bi-arrow-right";

            if (currInput.input == 'DB')
                displays[i].firstChild.className = "bi bi-arrow-down-left";

            if (currInput.input == 'D')
                displays[i].firstChild.className = "bi bi-arrow-down";

            if (currInput.input == 'DF')
                displays[i].firstChild.className = "bi bi-arrow-down-right";
        }
    }

    cachedBuffer = [...inputsBuffer];
}

function isEqual(arr1, arr2) {
    if (arr1.length != arr2.length)
        return false;

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i].input != arr2[i].input)
            return false;

        if (arr1[i].timestamp != arr2[i].timestamp)
            return false;
    }

    return true;
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

    if (dir != '')
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