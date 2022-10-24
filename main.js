const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

const shiptSize = 58;
canvas.width = 400;
canvas.height = 700;

document.body.appendChild(canvas);

let backgroundImage, shipImage, bulletImage, gameOverImage;
let shipX = canvas.width / 2 - 29;
let shipY = canvas.height - shiptSize;

function loadImage() {
    backgroundImage = new Image();
    backgroundImage.src = "images/background.png";

    shipImage = new Image();
    shipImage.src = "images/spaceship.png";

    bulletImage = new Image();
    bulletImage.scr = "images/bullet.png";

    enemyImage = new Image();
    enemyImage.scr = "images/enemy.png";

    gameOverImage = new Image();
    gameOverImage.sre = "images/gameover.png";
}

function setupKeyboardListener(e) {
    if (e.keyCode === 39) {
        shipX += 10;
    }
    if (e.keyCode === 37) {
        shipX -= 10;
    }
    if (shipX <= 0) {
        shipX = 0;
    }
    if (shipX >= canvas.width - shiptSize) {
        shipX = canvas.width - shiptSize;
    }
}

function render() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(shipImage, shipX, shipY);
}

function main() {
    render();
    document.addEventListener("keydown", setupKeyboardListener);
    requestAnimationFrame(main);
}

loadImage();
main();
