
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 600;

const box = 30;

let snake = [
  { x: 10 * box, y: 10 * box },
  { x: 9 * box, y: 10 * box },
  { x: 8 * box, y: 10 * box }
];

let direction = 'RIGHT';

let food = {
  x: Math.floor(Math.random() * (canvas.width / box)) * box,
  y: Math.floor(Math.random() * (canvas.height / box)) * box,
};

let score = 0;
let highScore = localStorage.getItem('highScore') || 0;

document.addEventListener('keydown', event => {
if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
});

function restartGame() {
snake = [
    { x: 10 * box, y: 10 * box },
    { x: 9 * box, y: 10 * box },
    { x: 8 * box, y: 10 * box }
];
direction = 'RIGHT';
score = 0;
food = {
    x: Math.floor(Math.random() * (canvas.width / box)) * box,
    y: Math.floor(Math.random() * (canvas.height / box)) * box,
};
clearInterval(game);
game = setInterval(gameLoop, 150);
}

function updateScore() {
score++;
if (score > highScore) {
    highScore = score;
    localStorage.setItem('highScore', highScore);
}
}

function gameLoop() {
let head = { ...snake[0] };
if (direction === 'UP') head.y -= box;
if (direction === 'DOWN') head.y += box;
if (direction === 'LEFT') head.x -= box;
if (direction === 'RIGHT') head.x += box;

if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height) {
    alert('Game Over!');
    restartGame();
    return;
}

for (let segment of snake) {
    if (head.x === segment.x && head.y === segment.y) {
    alert('Game Over!');
    restartGame();
    return;
    }
}

snake.unshift(head);

if (head.x === food.x && head.y === food.y) {
    food = {
      x: Math.floor(Math.random() * (canvas.width / box)) * box,
      y: Math.floor(Math.random() * (canvas.height / box)) * box,
    };
    updateScore();
} else {
    snake.pop();
}

ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);

for (let segment of snake) {
    ctx.fillStyle = 'green';
    ctx.fillRect(segment.x, segment.y, box, box);
}

ctx.fillStyle = 'red';
ctx.beginPath();
  ctx.arc(food.x + box / 2, food.y + box / 2, box / 2, 0, Math.PI * 2);
ctx.fill();

ctx.fillStyle = 'white';
ctx.font = '20px Arial';
ctx.fillText(`Score: ${score}`, 10, 20);
ctx.fillText(`High Score: ${highScore}`, 10, 50);
}

let game = setInterval(gameLoop, 150);
