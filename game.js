const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let statusText = document.getElementById("status");
let fichasEl = document.getElementById("fichas");

let fichas = 20;
let playing = false;

// Bola
let ball = {
  x: 80,
  y: 90,
  r: 6,
  vx: 0,
  vy: 0
};

function drawTable() {
  ctx.fillStyle = "#0b5d2a";
  ctx.fillRect(0,0,canvas.width,canvas.height);
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();
}

function update() {
  if (playing) {
    ball.x += ball.vx;
    ball.y += ball.vy;
    ball.vx *= 0.98;
    ball.vy *= 0.98;

    if (Math.abs(ball.vx) < 0.05 && Math.abs(ball.vy) < 0.05) {
      playing = false;
      statusText.innerText = "Fim da jogada (IA jogou)";
    }
  }

  drawTable();
  drawBall();
  requestAnimationFrame(update);
}

function playFree() {
  statusText.innerText = "Jogando contra IA...";
  ball.x = 80;
  ball.y = 90;

  // IA simples
  ball.vx = Math.random() * 3 + 1;
  ball.vy = (Math.random() - 0.5) * 2;
  playing = true;
}

update();
