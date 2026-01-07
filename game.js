const canvas = document.getElementById("mesa");
const ctx = canvas.getContext("2d");

let bola = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  vx: 0,
  vy: 0,
  r: 6
};

let puxando = false;
let mira = { x: 0, y: 0 };
let poder = 0;

// Desenho principal
function desenhar() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Mesa
  ctx.fillStyle = "#0b5d2a";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Taco (quando puxando)
  if (puxando) {
    let dx = bola.x - mira.x;
    let dy = bola.y - mira.y;
    let angulo = Math.atan2(dy, dx);

    let dist = Math.min(Math.sqrt(dx*dx + dy*dy), 80);
    poder = dist;

    ctx.save();
    ctx.translate(bola.x, bola.y);
    ctx.rotate(angulo);
    ctx.fillStyle = "#c9a063";
    ctx.fillRect(-dist - 40, -2, 40, 4);
    ctx.restore();

    // Linha de mira
    ctx.beginPath();
    ctx.moveTo(bola.x, bola.y);
    ctx.lineTo(mira.x, mira.y);
    ctx.strokeStyle = "rgba(0,255,204,0.6)";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // Bola
  ctx.beginPath();
  ctx.arc(bola.x, bola.y, bola.r, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.fill();

  requestAnimationFrame(desenhar);
}

// Física
function atualizar() {
  bola.x += bola.vx;
  bola.y += bola.vy;

  bola.vx *= 0.98;
  bola.vy *= 0.98;

  // Bordas
  if (bola.x < bola.r || bola.x > canvas.width - bola.r) bola.vx *= -1;
  if (bola.y < bola.r || bola.y > canvas.height - bola.r) bola.vy *= -1;

  setTimeout(atualizar, 16);
}

// Controles (toque)
canvas.addEventListener("touchstart", e => {
  const t = e.touches[0];
  puxando = true;
  mira.x = t.clientX - canvas.offsetLeft;
  mira.y = t.clientY - canvas.offsetTop;
});

canvas.addEventListener("touchmove", e => {
  if (!puxando) return;
  const t = e.touches[0];
  mira.x = t.clientX - canvas.offsetLeft;
  mira.y = t.clientY - canvas.offsetTop;
});

canvas.addEventListener("touchend", () => {
  puxando = false;

  let dx = bola.x - mira.x;
  let dy = bola.y - mira.y;

  bola.vx = dx * 0.06;
  bola.vy = dy * 0.06;
});

// Início
desenhar();
atualizar();
