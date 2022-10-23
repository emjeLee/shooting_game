const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

const shiptSize = 58;
canvas.width = 400;
canvas.height = 700;

document.body.appendChild(canvas);

let backgroundImage, shiptImage, bulletImage, gameOverImage;
let shiptImageX = canvas.width / 2 - 29;
let shiptImageY = canvas.height - shiptSize;

function loadImage() {
    backgroundImage = new Image();
    backgroundImage.src = "images/background.png";

    shiptImage = new Image();
    shiptImage.src = "images/spaceship.png";

    bulletImage = new Image();
    bulletImage.scr = "images/bullet.png";

    enemyImage = new Image();
    enemyImage.scr = "images/enemy.png";

    gameOverImage = new Image();
    gameOverImage.sre = "images/gameover.png";
}

function setupKeyboardListener(e) {
    if (e.keyCode === 39) {
        shiptImageX += 10;
    }
    if (e.keyCode === 37) {
        shiptImageX -= 10;
    }
    if (shiptImageX <= 0) {
        shiptImageX = 0;
    }
    if (shiptImageX >= canvas.width - shiptSize) {
        shiptImageX = canvas.width - shiptSize;
    }
}

function render() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(shiptImage, shiptImageX, shiptImageY);
}

function main() {
    render();
    document.addEventListener("keydown", setupKeyboardListener);
    requestAnimationFrame(main);
}

loadImage();
main();
