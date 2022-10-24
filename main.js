const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

const shiptSize = 58;
canvas.width = 400;
canvas.height = 700;

document.body.appendChild(canvas);

let backgroundImage, shipImage, bulletImage, gameOverImage;
let shipX = canvas.width / 2 - 29;
let shipY = canvas.height - shiptSize;

let bulletList = [];
function Bullet() {
    this.x = 0;
    this.y = 0;
    this.init = () => {
        this.x = shipX + 20;
        this.y = shipY;

        bulletList.push(this);
    };
    this.shoot = () => {
        this.y -= 7;
    };
}
function loadImage() {
    backgroundImage = new Image();
    backgroundImage.src = "images/background.png";

    shipImage = new Image();
    shipImage.src = "images/spaceship.png";

    bulletImage = new Image();
    bulletImage.src = "images/bullet.png";

    enemyImage = new Image();
    enemyImage.src = "images/enemy.png";

    gameOverImage = new Image();
    gameOverImage.src = "images/gameover.png";
}

let keyValue = {};
function keyboardListener() {
    document.addEventListener("keydown", (e) => {
        keyValue[e.key] = true;
    });

    document.addEventListener("keyup", (e) => {
        delete keyValue[e.key];
        if (e.key === " ") {
            let bullet = new Bullet();
            bullet.init();
        }
    });
}

function moveShip() {
    if ("ArrowRight" in keyValue) {
        shipX += 5;
    }
    if ("ArrowLeft" in keyValue) {
        shipX -= 5;
    }
    if (shipX <= 0) {
        shipX = 0;
    }
    if (shipX >= canvas.width - shiptSize) {
        shipX = canvas.width - shiptSize;
    }
}

function shootBullet() {
    for (let i = 0; i < bulletList.length; i++) {
        bulletList[i].shoot();
    }
}

function render() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(shipImage, shipX, shipY);
    for (let i = 0; i < bulletList.length; i++) {
        ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y);
    }
}

function main() {
    moveShip(); // 좌표 업데이트 후
    shootBullet();
    render(); // 랜더
    requestAnimationFrame(main);
}

loadImage();
keyboardListener();
main();
