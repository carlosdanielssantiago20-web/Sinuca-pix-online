const canvas = document.getElementById("mesa");
const ctx = canvas.getContext("2d");

// Bola
let bola = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  vx: 0,
  vy: 0,
  r: 6,
  caindo: false
};

// Buracos
const buracos = [
  {x: 0, y: 0},
  {x: canvas.width/2, y: 0},
  {x: canvas.width, y: 0},
  {x: 0, y: canvas.height},
  {x: canvas.width/2, y: canvas.height},
  {x: canvas.width, y: canvas.height}
];

let puxando = false;
let mira = {x:0, y:0};

// Desenhar tudo
function desenhar() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  // Mesa
  ctx.fillStyle = "#0b5d2a";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  // Buracos
  buracos.forEach(b => {
    ctx.beginPath();
    ctx.arc(b.x, b.y, 12, 0, Math.PI*2);
    ctx.fillStyle = "#000";
    ctx.fill();
  });

  // Taco + mira
  if (puxando && !bola.caindo) {
    let dx = bola.x - mira.x;
    let dy = bola.y - mira.y;
    let ang = Math.atan2(dy, dx);
    let dist = Math.min(Math.sqrt(dx*dx+dy*dy), 80);

    ctx.save();
    ctx.translate(bola.x, bola.y);
    ctx.rotate(ang);
    ctx.fillStyle = "#c9a063";
    ctx.fillRect(-dist-40, -2, 40, 4);
    ctx.restore();

    ctx.beginPath();
    ctx.moveTo(bola.x, bola.y);
    ctx.lineTo(mira.x, mira.y);
    ctx.strokeStyle = "rgba(0,255,204,0.6)";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // Bola
  if (!bola.caindo) {
    ctx.beginPath();
    ctx.arc(bola.x, bola.y, bola.r, 0, Math.PI*2);
    ctx.fillStyle = "#fff";
    ctx.fill();
  }

  requestAnimationFrame(desenhar);
}

// Física
function atualizar() {
  if (!bola.caindo) {
    bola.x += bola.vx;
    bola.y += bola.vy;
    bola.vx *= 0.98;
    bola.vy *= 0.98;

    // Bordas
    if (bola.x < bola.r || bola.x > canvas.width - bola.r) bola.vx *= -1;
    if (bola.y < bola.r || bola.y > canvas.height - bola.r) bola.vy *= -1;

    verificarBuraco();
  }
  setTimeout(atualizar, 16);
}

// Verificar buracos
function verificarBuraco() {
  buracos.forEach(b => {
    let dx = bola.x - b.x;
    let dy = bola.y - b.y;
    let dist = Math.sqrt(dx*dx + dy*dy);
    if (dist < 12) {
      cairNoBuraco();
    }
  });
}

// Animação de queda
function cairNoBuraco() {
  bola.caindo = true;
  bola.vx = 0;
  bola.vy = 0;

  setTimeout(() => {
    bola.x = canvas.width / 2;
    bola.y = canvas.height / 2;
    bola.caindo = false;
  }, 600);
}

// Controles
canvas.addEventListener("touchstart", e => {
  if (bola.caindo) return;
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
  if (bola.caindo) return;

  let dx = bola.x - mira.x;
  let dy = bola.y - mira.y;
  bola.vx = dx * 0.06;
  bola.vy = dy * 0.06;
});

// Iniciar
desenhar();
atualizar();
