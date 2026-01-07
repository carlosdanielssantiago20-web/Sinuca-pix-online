const canvas = document.getElementById("mesa");
const ctx = canvas.getContext("2d");
const status = document.getElementById("status");

let ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  r: 6,
  vx: 0,
  vy: 0
};

let dragging = false;
let aimX = 0;
let aimY = 0;

// Desenhar mesa
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Bola
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();

  // Linha de mira
  if (dragging) {
    ctx.beginPath();
    ctx.moveTo(ball.x, ball.y);
    ctx.lineTo(aimX, aimY);
    ctx.strokeStyle = "#00ffcc";
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

// Física
function update() {
  ball.x += ball.vx;
  ball.y += ball.vy;

  ball.vx *= 0.98;
  ball.vy *= 0.98;

  if (ball.x < ball.r || ball.x > canvas.width - ball.r) ball.vx *= -1;
  if (ball.y < ball.r || ball.y > canvas.height - ball.r) ball.vy *= -1;

  if (Math.abs(ball.vx) < 0.05) ball.vx = 0;
  if (Math.abs(ball.vy) < 0.05) ball.vy = 0;

  draw();
  requestAnimationFrame(update);
}

// Controles
canvas.addEventListener("pointerdown", e => {
  dragging = true;
  aimX = e.offsetX;
  aimY = e.offsetY;
});

canvas.addEventListener("pointermove", e => {
  if (!dragging) return;
  aimX = e.offsetX;
  aimY = e.offsetY;
});

canvas.addEventListener("pointerup", e => {
  dragging = false;

  let dx = ball.x - e.offsetX;
  let dy = ball.y - e.offsetY;

  ball.vx = dx * 0.08;
  ball.vy = dy * 0.08;

  status.innerText = "Tacada!";
});

update();
