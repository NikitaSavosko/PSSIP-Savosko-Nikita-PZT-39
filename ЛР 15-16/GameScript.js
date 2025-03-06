const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

class Ship {
    constructor() {
        this.width = 30;
        this.height = 50;
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - this.height - 10;
        this.speed = 5;
    }

    draw() {
        ctx.fillStyle = "cyan";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    moveLeft() {
        if (this.x > 0) {
            this.x -= this.speed;
        }
    }

    moveRight() {
        if (this.x + this.width < canvas.width) {
            this.x += this.speed;
        }
    }
}

class Meteor {
    constructor() {
        this.width = 30;
        this.height = 30;
        this.x = Math.random() * (canvas.width - this.width);
        this.y = 0;
        this.speed = 2 + Math.random() * 3;
    }

    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    fall() {
        this.y += this.speed;
    }

    isOutOfBounds() {
        return this.y > canvas.height;
    }

    checkCollision(ship) {
        return (
            this.x < ship.x + ship.width &&
            this.x + this.width > ship.x &&
            this.y < ship.y + ship.height &&
            this.y + this.height > ship.y
        );
    }
}

const ship = new Ship();
let meteors = [];
let score = 0;
let leftPressed = false;
let rightPressed = false;
let gameRunning = true;
let meteorSpawnCounter = 0; // Счетчик для появления метеоритов

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") leftPressed = true;
    if (event.key === "ArrowRight") rightPressed = true;
});

document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowLeft") leftPressed = false;
    if (event.key === "ArrowRight") rightPressed = false;
});

// Функция для перезапуска игры
function resetGame() {
    meteors = [];
    score = 0;
    gameRunning = true;
    meteorSpawnCounter = 0;
    ship.x = canvas.width / 2 - ship.width / 2;
    document.getElementById("score").innerText = `Score: ${score}`;
    gameLoop(); // Запускаем игру заново
}

function gameLoop() {
    if (!gameRunning) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (leftPressed) ship.moveLeft();
    if (rightPressed) ship.moveRight();
    ship.draw();

    // Логика для создания метеоритов через каждые 30 кадров
    meteorSpawnCounter++;
    if (meteorSpawnCounter >= 30) {
        meteors.push(new Meteor());
        meteorSpawnCounter = 0; // Сброс счетчика
    }

    for (let i = meteors.length - 1; i >= 0; i--) {
        meteors[i].fall();
        meteors[i].draw();

        if (meteors[i].checkCollision(ship)) {
            gameRunning = false;
            setTimeout(() => {
                alert(`Игра окончена! Ваш счет: ${score}`);
                resetGame();
            }, 100);
            return;
        }

        if (meteors[i].isOutOfBounds()) {
            meteors.splice(i, 1);
            score++;
            document.getElementById("score").innerText = `Score: ${score}`;
        }
    }

    requestAnimationFrame(gameLoop);
}

gameLoop();
