const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

const shiptSize = 58;
const enemySize = 48;
canvas.width = 400;
canvas.height = 700;

document.body.appendChild(canvas);

let backgroundImage, shipImage, bulletImage, gameOverImage;
let gameOver = false;
let score = 0;
let levelSpeed = 0;

let shipX = canvas.width / 2 - 29;
let shipY = canvas.height - shiptSize;

let bulletList = [];
function Bullet() {
    this.x = 0;
    this.y = 0;
    this.alive = true;
    this.init = () => {
        this.x = shipX + 18;
        this.y = shipY;

        bulletList.push(this);
    };

    this.shoot = () => {
        if (this.y <= 0) {
            this.alive = false;
        }
        this.y -= 7;
    };

    this.attack = () => {
        for (let i = 0; i < enemyList.length; i++) {
            if (this.y <= enemyList[i].y && this.x >= enemyList[i].x && this.x <= enemyList[i].x + 40) {
                score++;
                levelSpeed = parseInt(score / 5, 10);
                this.alive = false;
                enemyList.splice(i, 1);
            }
        }
    };
}

function genRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

let enemyList = [];
function Enemy() {
    this.x = 0;
    this.y = 0;
    this.init = () => {
        this.x = genRandomNumber(0, canvas.width - enemySize);
        this.y = 0;

        enemyList.push(this);
    };

    this.updateY = () => {
        this.y += 2 + levelSpeed;
        if (this.y >= canvas.height - enemySize) {
            gameOver = true;
        }
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

function createEnemy() {
    setInterval(() => {
        let enemy = new Enemy();
        enemy.init();
    }, 1000);
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
        if (bulletList[i].alive) {
            bulletList[i].shoot();
            bulletList[i].attack();
        }
    }
}

function enemyFalling() {
    for (let i = 0; i < enemyList.length; i++) {
        enemyList[i].updateY();
    }
}

function render() {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(shipImage, shipX, shipY);
    ctx.fillText(`SCORE : ${score}`, 10, 20);
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";

    for (let i = 0; i < bulletList.length; i++) {
        if (bulletList[i].alive) {
            ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y);
        }
    }

    for (let i = 0; i < enemyList.length; i++) {
        ctx.drawImage(enemyImage, enemyList[i].x, enemyList[i].y);
    }
}

function main() {
    if (gameOver) {
        return ctx.drawImage(gameOverImage, -25, 100, 450, 450);
    }
    moveShip(); // 좌표 업데이트 후
    shootBullet();
    enemyFalling();
    render(); // 랜더
    requestAnimationFrame(main);
}

loadImage();
keyboardListener();
createEnemy();
main();
