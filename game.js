const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  r: 12,
  vx: 0,
  vy: 0
};

let aiming = false;
let mouse = { x: 0, y: 0 };

canvas.addEventListener("touchstart", e => {
  aiming = true;
  const t = e.touches[0];
  mouse.x = t.clientX;
  mouse.y = t.clientY;
});

canvas.addEventListener("touchmove", e => {
  const t = e.touches[0];
  mouse.x = t.clientX;
  mouse.y = t.clientY;
});

canvas.addEventListener("touchend", () => {
  aiming = false;
  ball.vx = (ball.x - mouse.x) * 0.05;
  ball.vy = (ball.y - mouse.y) * 0.05;
});

function update() {
  ball.x += ball.vx;
  ball.y += ball.vy;

  ball.vx *= 0.98;
  ball.vy *= 0.98;

  if (ball.x < ball.r || ball.x > canvas.width - ball.r) ball.vx *= -1;
  if (ball.y < ball.r || ball.y > canvas.height - ball.r) ball.vy *= -1;
}

function draw() {
  ctx.fillStyle = "#0a5c2f";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();

  if (aiming) {
    ctx.beginPath();
    ctx.moveTo(ball.x, ball.y);
    ctx.lineTo(mouse.x, mouse.y);
    ctx.strokeStyle = "yellow";
    ctx.lineWidth = 3;
    ctx.stroke();
  }
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
