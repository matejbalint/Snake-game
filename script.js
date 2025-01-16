
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const box = 20;

let snake = [{ x: 10 * box, y: 10 * box }];

let direction = 'RIGHT';

let food = {
  x: Math.floor(Math.random() * (canvas.width / box)) * box,
  y: Math.floor(Math.random() * (canvas.height / box)) * box,
};

document.addEventListener('keydown', event => {
if (event.key === 'ArrowUp') direction = 'UP';
if (event.key === 'ArrowDown') direction = 'DOWN';
if (event.key === 'ArrowLeft') direction = 'LEFT';
if (event.key === 'ArrowRight') direction = 'RIGHT';
});

function gameLoop() {
let head = { ...snake[0] };
if (direction === 'UP') head.y -= box;
if (direction === 'DOWN') head.y += box;
if (direction === 'LEFT') head.x -= box;
if (direction === 'RIGHT') head.x += box;

if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height) {
    alert('Game Over!');
    clearInterval(game);
    return;
}

snake.unshift(head);

if (head.x === food.x && head.y === food.y) {
    food = {
      x: Math.floor(Math.random() * (canvas.width / box)) * box,
      y: Math.floor(Math.random() * (canvas.height / box)) * box,
    };
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
ctx.fillRect(food.x, food.y, box, box);
}

let game = setInterval(gameLoop, 150);