const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const statusText = document.getElementById("status");

let playing = false;
let dragging = false;
let startX = 0;
let startY = 0;

// Bola branca
let ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  r: 6,
  vx: 0,
  vy: 0
};

// Desenhar mesa
function drawTable() {
  ctx.fillStyle = "#0b5d2a";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Desenhar bola
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();
}

// Linha de mira
function drawAimLine(x, y) {
  ctx.beginPath();
  ctx.moveTo(ball.x, ball.y);
  ctx.lineTo(x, y);
  ctx.strokeStyle = "#00ffcc";
  ctx.lineWidth = 2;
  ctx.stroke();
}

// Física
function update() {
  if (!dragging) {
    ball.x += ball.vx;
    ball.y += ball.vy;

    ball.vx *= 0.98;
    ball.vy *= 0.98;

    // Bordas
    if (ball.x < ball.r || ball.x > canvas.width - ball.r) ball.vx *= -1;
    if (ball.y < ball.r || ball.y > canvas.height - ball.r) ball.vy *= -1;

    if (Math.abs(ball.vx) < 0.05 && Math.abs(ball.vy) < 0.05) {
      ball.vx = 0;
      ball.vy = 0;
      playing = false;
      statusText.innerText = "Sua vez";
    }
  }

  drawTable();
  drawBall();
  requestAnimationFrame(update);
}

// Controles (toque / mouse)
canvas.addEventListener("pointerdown", e => {
  if (playing) return;
  dragging = true;
  startX = e.offsetX;
  startY = e.offsetY;
});

canvas.addEventListener("pointermove", e => {
  if (!dragging) return;
  drawTable();
  drawBall();
  drawAimLine(e.offsetX, e.offsetY);
});

canvas.addEventListener("pointerup", e => {
  if (!dragging) return;
  dragging = false;

  let dx = ball.x - e.offsetX;
  let dy = ball.y - e.offsetY;

  ball.vx = dx * 0.08;
  ball.vy = dy * 0.08;

  playing = true;
  statusText.innerText = "Tacada!";
});

// Início
statusText.innerText = "Sua vez";
update();
