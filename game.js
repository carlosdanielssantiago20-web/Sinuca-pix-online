const canvas = document.getElementById("mesa");
const ctx = canvas.getContext("2d");

let bola = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    vx: 0,
    vy: 0,
    r: 6
};

let tocando = false;
let inicio = {};
let fichas = 20;

function desenhar() {
    ctx.clearRect(0,0,canvas.width,canvas.height);

    // Bola
    ctx.beginPath();
    ctx.arc(bola.x, bola.y, bola.r, 0, Math.PI*2);
    ctx.fillStyle = "white";
    ctx.fill();

    requestAnimationFrame(desenhar);
}

function atualizar() {
    bola.x += bola.vx;
    bola.y += bola.vy;

    bola.vx *= 0.98;
    bola.vy *= 0.98;

    // paredes
    if (bola.x < bola.r || bola.x > canvas.width - bola.r) bola.vx *= -1;
    if (bola.y < bola.r || bola.y > canvas.height - bola.r) bola.vy *= -1;

    setTimeout(atualizar, 16);
}

canvas.addEventListener("touchstart", e => {
    const t = e.touches[0];
    tocando = true;
    inicio = { x: t.clientX, y: t.clientY };
});

canvas.addEventListener("touchend", e => {
    if (!tocando) return;
    tocando = false;

    const dx = inicio.x - event.changedTouches[0].clientX;
    const dy = inicio.y - event.changedTouches[0].clientY;

    bola.vx = dx * 0.08;
    bola.vy = dy * 0.08;

    document.getElementById("status").innerText = "Tacada!";
});

function jogoIA(){
    document.getElementById("status").innerText = "Jogando contra IA...";
}

function multiplayer(){
    document.getElementById("status").innerText = "Multiplayer em desenvolvimento";
}

function comprar(){
    fichas += 10;
    document.getElementById("fichas").innerText = fichas;
}

desenhar();
atualizar();
