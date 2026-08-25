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
    const angle = Math.atan2(stroke.toY - stroke.fromY, stroke.toX - stroke.fromX);
    const offsetX = Math.cos(angle + Math.PI / 2);
    const offsetY = Math.sin(angle + Math.PI / 2);
    context.beginPath();
    context.moveTo(stroke.fromX + offsetX * stroke.fromWidth / 2, stroke.fromY + offsetY * stroke.fromWidth / 2);
    context.lineTo(stroke.toX + offsetX * stroke.toWidth / 2, stroke.toY + offsetY * stroke.toWidth / 2);
    context.lineTo(stroke.toX - offsetX * stroke.toWidth / 2, stroke.toY - offsetY * stroke.toWidth / 2);
    context.lineTo(stroke.fromX - offsetX * stroke.fromWidth / 2, stroke.fromY - offsetY * stroke.fromWidth / 2);
    context.closePath();
    context.fillStyle = `rgba(66, 104, 223, ${opacity * .44})`;
    context.fill();
  }
  requestAnimationFrame(draw);
}

window.addEventListener('pointerdown', (event) => {
  if (event.pointerType !== 'mouse') return;
  if (event.target.closest('a, button, input, textarea')) return;
  previousPoint = { x: event.clientX, y: event.clientY, width: 3.8, time: performance.now() };
});
window.addEventListener('pointermove', (event) => {
  if (event.pointerType !== 'mouse') return;
  if (!previousPoint || event.buttons === 0) return;
  const now = performance.now();
  const distance = Math.hypot(event.clientX - previousPoint.x, event.clientY - previousPoint.y);
  const speed = distance / Math.max(now - previousPoint.time, 1);
  const penPressure = event.pointerType === 'pen' ? event.pressure : 0;
  const width = penPressure > 0 ? 1.2 + penPressure * 5 : Math.max(1.15, Math.min(4.4, 4.6 - speed * .05));
  strokes.push({ fromX: previousPoint.x, fromY: previousPoint.y, toX: event.clientX, toY: event.clientY, fromWidth: previousPoint.width, toWidth: width, created: now });
  previousPoint = { x: event.clientX, y: event.clientY, width, time: now };
});
window.addEventListener('pointerup', () => { previousPoint = null; });
window.addEventListener('resize', sizeCanvas);
sizeCanvas();
requestAnimationFrame(draw);
