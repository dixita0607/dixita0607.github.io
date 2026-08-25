const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.site-nav');
const themeButton = document.querySelector('.theme-toggle');

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('is-open', !open);
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  if (link.pathname === window.location.pathname) link.setAttribute('aria-current', 'page');
});

function setTheme(theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  themeButton?.setAttribute('aria-pressed', String(theme === 'dark'));
  localStorage.setItem('theme', theme);
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme) setTheme(savedTheme);
themeButton?.addEventListener('click', () => setTheme(document.documentElement.classList.contains('dark') ? 'light' : 'dark'));

const canvas = document.createElement('canvas');
canvas.id = 'draw-layer';
canvas.setAttribute('aria-hidden', 'true');
document.body.append(canvas);
const cursorDot = document.createElement('span');
cursorDot.id = 'cursor-dot';
cursorDot.setAttribute('aria-hidden', 'true');
document.body.append(cursorDot);
const context = canvas.getContext('2d');
let previousPoint = null;
const strokes = [];

function canDrawOn(target) {
  return !target.closest('a, button, input, textarea, img, .hero-copy, .portrait-card, .mini-card, .note-card, .project-row, .social-grid, .site-header, .site-footer');
}

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
  if (!canDrawOn(event.target)) return;
  event.preventDefault();
  document.body.classList.add('is-drawing');
  previousPoint = { x: event.clientX, y: event.clientY, width: 3.8, time: performance.now() };
}, { passive: false });
window.addEventListener('pointermove', (event) => {
  if (event.pointerType !== 'mouse') return;
  const drawingSurface = canDrawOn(event.target);
  document.body.classList.toggle('is-drawing-surface', drawingSurface);
  cursorDot.classList.toggle('is-visible', drawingSurface);
  cursorDot.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
  if (!previousPoint || event.buttons === 0) return;
  const now = performance.now();
  const distance = Math.hypot(event.clientX - previousPoint.x, event.clientY - previousPoint.y);
  const speed = distance / Math.max(now - previousPoint.time, 1);
  const penPressure = event.pointerType === 'pen' ? event.pressure : 0;
  const width = penPressure > 0 ? 1.2 + penPressure * 5 : Math.max(1.15, Math.min(4.4, 4.6 - speed * .05));
  strokes.push({ fromX: previousPoint.x, fromY: previousPoint.y, toX: event.clientX, toY: event.clientY, fromWidth: previousPoint.width, toWidth: width, created: now });
  previousPoint = { x: event.clientX, y: event.clientY, width, time: now };
});
window.addEventListener('pointerup', () => { previousPoint = null; document.body.classList.remove('is-drawing'); });
window.addEventListener('mouseout', (event) => {
  if (!event.relatedTarget) {
    document.body.classList.remove('is-drawing-surface');
    cursorDot.classList.remove('is-visible');
  }
});
window.addEventListener('resize', sizeCanvas);
sizeCanvas();
requestAnimationFrame(draw);

function addDemoStroke() {
  if (previousPoint || strokes.length > 0) return;
  const fromX = window.innerWidth * (.08 + Math.random() * .72);
  const fromY = window.innerHeight * (.18 + Math.random() * .62);
  const length = 38 + Math.random() * 46;
  const angle = -0.7 + Math.random() * 1.4;
  const toX = fromX + Math.cos(angle) * length;
  const toY = fromY + Math.sin(angle) * length;
  const now = performance.now();
  strokes.push({ fromX, fromY, toX, toY, fromWidth: 1.1, toWidth: 2.8, created: now - 350 });
}

setTimeout(addDemoStroke, 1800);
setInterval(addDemoStroke, 8500);
