// Jednoduchá hra Snake napsaná v JavaScriptu

// Vybereme canvas z HTML a nastavíme kontext kreslení
const canvas = document.getElementById('gameCanvas'); // Přístup k HTML elementu canvas
const ctx = canvas.getContext('2d'); // Nastavení 2D kontextu pro kreslení

// Nastavení velikosti canvasu
canvas.width = 600; // Šířka hrací plochy
canvas.height = 600; // Výška hrací plochy

// Velikost jednoho políčka
const box = 30; // Velikost jednotlivého segmentu hada nebo jídla

// Počáteční pozice hada
let snake = [
  { x: 10 * box, y: 10 * box }, // Hlava hada
  { x: 9 * box, y: 10 * box },  // Druhý segment
  { x: 8 * box, y: 10 * box }   // Třetí segment
];

// Směr hada
let direction = 'RIGHT'; // Počáteční směr pohybu hada

// Náhodná pozice jídla
let food = {
  x: Math.floor(Math.random() * (canvas.width / box)) * box, // Náhodná X-ová pozice
  y: Math.floor(Math.random() * (canvas.height / box)) * box // Náhodná Y-ová pozice
};

// Načtení obrázku jídla
const foodImage = new Image();
foodImage.src = './images/food.png'; // Cesta k obrázku jídla

// Skóre a rekord
let score = 0; // Aktuální skóre
let highScore = localStorage.getItem('highScore') || 0; // Uložený rekord z localStorage

// Detekce stisku kláves pro změnu směru
document.addEventListener('keydown', event => {
  // Změna směru podle šipky, pokud nový směr není opačný aktuálnímu
  if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
  if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
  if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
  if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
});

// Funkce pro restart hry
function restartGame() {
  snake = [
    { x: 10 * box, y: 10 * box }, // Reset pozice hlavy hada
    { x: 9 * box, y: 10 * box },  // Reset druhého segmentu
    { x: 8 * box, y: 10 * box }   // Reset třetího segmentu
  ];
  direction = 'RIGHT'; // Reset směru
  score = 0; // Reset skóre
  food = {
    x: Math.floor(Math.random() * (canvas.width / box)) * box, // Nová pozice jídla
    y: Math.floor(Math.random() * (canvas.height / box)) * box
  };
  clearInterval(game); // Zastavení aktuální hry
  game = setInterval(gameLoop, 150); // Restart herní smyčky
}

// Funkce pro aktualizaci skóre
function updateScore() {
  score++; // Zvýšení skóre
  if (score > highScore) { // Kontrola, zda je nové skóre vyšší než rekord
    highScore = score; // Aktualizace rekordu
    localStorage.setItem('highScore', highScore); // Uložení rekordu do localStorage
  }
}

// Hlavní herní smyčka
function gameLoop() {
  // Aktualizace pozice hlavy hada
  let head = { ...snake[0] }; // Kopie aktuální hlavy
  if (direction === 'UP') head.y -= box; // Pohyb nahoru
  if (direction === 'DOWN') head.y += box; // Pohyb dolů
  if (direction === 'LEFT') head.x -= box; // Pohyb doleva
  if (direction === 'RIGHT') head.x += box; // Pohyb doprava

  // Kontrola, zda had narazil do zdi
  if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height) {
    alert('Game Over!'); // Zobrazení zprávy o konci hry
    restartGame(); // Restart hry
    return;
  }

  // Kontrola, zda had narazil do sebe
  for (let segment of snake) {
    if (head.x === segment.x && head.y === segment.y) {
      alert('Game Over!'); // Zobrazení zprávy o konci hry
      restartGame(); // Restart hry
      return;
    }
  }

  // Přidání hlavy na začátek hada
  snake.unshift(head);

  // Kontrola, zda had snědl jídlo
  if (head.x === food.x && head.y === food.y) {
    // Nové jídlo na náhodné pozici
    food = {
      x: Math.floor(Math.random() * (canvas.width / box)) * box,
      y: Math.floor(Math.random() * (canvas.height / box)) * box
    };
    updateScore(); // Aktualizace skóre
  } else {
    // Odstranění posledního segmentu hada
    snake.pop();
  }

  // Kreslení hry
  ctx.fillStyle = 'black'; // Nastavení barvy pozadí
  ctx.fillRect(0, 0, canvas.width, canvas.height); // Vyplnění pozadí

  // Kreslení hada
  snake.forEach((segment, index) => {
    if (index === 0) {
      // Hlava hada
      ctx.fillStyle = 'yellow';
      ctx.beginPath();
      ctx.arc(segment.x + box / 2, segment.y + box / 2, box / 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (index === snake.length - 1) {
      // Ocas hada
      ctx.fillStyle = 'green';
      ctx.beginPath();
      ctx.arc(segment.x + box / 2, segment.y + box / 2, box / 2.5, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Tělo hada
      ctx.fillStyle = 'green';
      ctx.fillRect(segment.x, segment.y, box, box);
    }
  });

  // Kreslení jídla
  ctx.drawImage(foodImage, food.x, food.y, 40, 40); // Kreslení obrázku jídla

  // Kreslení skóre
  ctx.fillStyle = 'white'; // Nastavení barvy textu
  ctx.font = '20px Arial'; // Nastavení fontu textu
  ctx.fillText(`Score: ${score}`, 10, 20); // Zobrazení aktuálního skóre
  ctx.fillText(`High Score: ${highScore}`, 10, 50); // Zobrazení rekordu
}

// Spuštění herní smyčky
let game = setInterval(gameLoop, 150); // Nastavení intervalové funkce pro hlavní smyčku
