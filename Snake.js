//gameboard
let canvas = document.getElementById("canvas");

let Lmfcontext = canvas.getContext("2d");

const CELL_SIZE = 20;
const GRID_WIDTH = 40;
const GRID_HEIGHT = 30;

canvas.height = GRID_HEIGHT * CELL_SIZE;
canvas.width = GRID_WIDTH * CELL_SIZE;

canvas.style.background = "#050000";

//setUp
let gameOver = false;
let paused = false;
let score = 0;
let food = {x:0,y:0};
let snake = [
    {x:5,y:5},
    {x:4,y:5},
    {x:3,y:5}
];
let dx = 1;
let dy = 0;

function drawSnake(snake){
    for(let i=0; i<snake.length;i++){
        
        let x= snake[i].x;
        let y= snake[i].y;

        Lmfcontext.fillStyle = "#07ec79";

        Lmfcontext.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
}

function moveSnake() {

    const head = snake[0];

    let newHead = {
        x:head.x + dx,
        y:head.y + dy
    };

    snake.unshift(newHead);

    if (
            newHead.x === food.x &&
            newHead.y === food.y
        ) {

            score++;

            food = foodLocation();

        } else {

            snake.pop();

    }
}

//food
function foodLocation() {

    while (true) {

        let newX = Math.floor(Math.random() * GRID_WIDTH);
        let newY = Math.floor(Math.random() * GRID_HEIGHT);

        let onSnake = false;

        for (const segment of snake) {

            if (
                segment.x === newX &&
                segment.y === newY
            ) {

                onSnake = true;
                break;

            }

        }

        if (!onSnake) {

            return {
                x: newX,
                y: newY
            };

        }

    }

}
food = foodLocation();
function drawFood(food){

    let x= food.x;
    let y= food.y;

    Lmfcontext.fillStyle = "#f60404";

    Lmfcontext.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}

function checkWall(){
    
    let head = snake[0];

    if (head.x<0 ||
        head.y<0||
        head.x>=GRID_WIDTH||
        head.y>=GRID_HEIGHT){

        gameOver = true;
    }
}

function checkSelf(){
    let head = snake[0];

     for (let i = 1; i < snake.length; i++) {

        if (
            head.x === snake[i].x &&
            head.y === snake[i].y
        ) {

            gameOver = true;

        }

    }
}

function updateGame() {

    moveSnake();

    checkSelf();

    checkWall();

}

//gamw loop
function gameLoop() {

     if (gameOver) {

        drawGameOver()
        return;

    }

    if (paused) {

        drawPaused();
        return;

    }

    clearScreen();

    updateGame()

    drawFood(food);

    drawSnake(snake);

    drawScore();

}

setInterval(() => {

    gameLoop();

}, 200);

function clearScreen() {

    Lmfcontext.fillStyle = "#a09f9f";

    Lmfcontext.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

}

//controller
window.addEventListener("keydown", (event) => {

   if (event.key === "ArrowUp" && dy !== 1) {
        dx = 0;
        dy = -1;
    }

    else if (event.key === "ArrowDown" && dy !== -1) {
        dx = 0;
        dy = 1;
    }

    else if (event.key === "ArrowLeft" && dx !== 1) {
        dx = -1;
        dy = 0;
    }

    else if (event.key === "ArrowRight" && dx !== -1) {
        dx = 1;
        dy = 0;
    }

    else if (event.key === "r" || event.key === "R") {

        resetGame();
        return;
    }

    else if (event.key === "p" || event.key === "P") {

    paused = !paused;

    return;
    }
});

function drawScore() {

    Lmfcontext.fillStyle = "black";

    Lmfcontext.font = "30px Arial";

    Lmfcontext.fillText(
        "Score: " + score,
        20,
        40
    );

}

function drawGameOver() {

    Lmfcontext.fillStyle = "red";

    Lmfcontext.font = "60px Arial";

    Lmfcontext.fillText(
        "GAME OVER ",
        225,
        200
    );
    Lmfcontext.font = "30px Arial";
     Lmfcontext.fillText(
    "press r to restart",
    325,
    260
     );

}

function resetGame(){
snake = [
    {x:5,y:5},
    {x:4,y:5},
    {x:3,y:5}
];
score = 0;
food = foodLocation();
dx = 1;
dy = 0;
gameOver = false;
paused = false;
}

function drawPaused() {

    drawSnake(snake);

    drawFood(food);

    drawScore();

    Lmfcontext.fillStyle = "yellow";

    Lmfcontext.font = "50px Arial";

    Lmfcontext.fillText(
        "PAUSED",
        canvas.width / 2 - 100,
        canvas.height / 2
    );

}
gameLoop();
