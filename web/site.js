const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.site-nav');

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('is-open', !open);
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  if (link.pathname === window.location.pathname) link.setAttribute('aria-current', 'page');
});

const canvas = document.createElement('canvas');
canvas.id = 'draw-layer';
canvas.setAttribute('aria-hidden', 'true');
document.body.append(canvas);
const context = canvas.getContext('2d');
let previousPoint = null;
const strokes = [];

function sizeCanvas() {
  const scale = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * scale;
  canvas.height = window.innerHeight * scale;
  context.setTransform(scale, 0, 0, scale, 0, 0);
}

function draw(timestamp) {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  for (let index = strokes.length - 1; index >= 0; index -= 1) {
    const stroke = strokes[index];
    const age = timestamp - stroke.created;
    const opacity = 1 - age / 1250;
    if (opacity <= 0) { strokes.splice(index, 1); continue; }
    context.beginPath();
    context.moveTo(stroke.fromX, stroke.fromY);
    context.lineTo(stroke.toX, stroke.toY);
    context.strokeStyle = `rgba(66, 104, 223, ${opacity * .42})`;
    context.lineWidth = 2.2;
    context.lineCap = 'round';
    context.stroke();
  }
  requestAnimationFrame(draw);
}

window.addEventListener('pointerdown', (event) => {
  if (event.pointerType !== 'mouse') return;
  if (event.target.closest('a, button, input, textarea')) return;
  previousPoint = { x: event.clientX, y: event.clientY };
});
window.addEventListener('pointermove', (event) => {
  if (event.pointerType !== 'mouse') return;
  if (!previousPoint || event.buttons === 0) return;
  strokes.push({ fromX: previousPoint.x, fromY: previousPoint.y, toX: event.clientX, toY: event.clientY, created: performance.now() });
  previousPoint = { x: event.clientX, y: event.clientY };
});
window.addEventListener('pointerup', () => { previousPoint = null; });
window.addEventListener('resize', sizeCanvas);
sizeCanvas();
requestAnimationFrame(draw);
