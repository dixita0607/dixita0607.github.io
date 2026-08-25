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
    const opacity = stroke.shape
      ? (age < 1200 ? 1 : 1 - (age - 1200) / 1100)
      : 1 - age / 1250;
    if (opacity <= 0) { strokes.splice(index, 1); continue; }
    if (stroke.shape === 'cloud') {
      const progress = Math.min(1, age / 650);
      const r = stroke.radius;
      const x = stroke.x + age * .025;
      const y = stroke.y + Math.sin(age / 260) * 3;
      context.beginPath();
      context.moveTo(x - r * 1.35, y + r * .3);
      context.bezierCurveTo(x - r * 1.35, y - r * .28, x - r * .88, y - r * .7, x - r * .32, y - r * .4);
      context.bezierCurveTo(x - r * .1, y - r * 1.05, x + r * .55, y - r * 1.02, x + r * .58, y - r * .36);
      context.bezierCurveTo(x + r * 1.2, y - r * .34, x + r * 1.3, y + r * .23, x + r * .85, y + r * .35);
      context.bezierCurveTo(x + r * .48, y + r * .75, x - r * .58, y + r * .75, x - r * 1.35, y + r * .3);
      context.setLineDash([420]);
      context.lineDashOffset = 420 * (1 - progress);
      context.strokeStyle = `rgba(66, 104, 223, ${opacity * .7})`;
      context.lineWidth = 4;
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.stroke();
      context.setLineDash([]);
      continue;
    }
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

function addDemoCloud() {
  if (previousPoint || strokes.filter((stroke) => stroke.shape === 'cloud').length >= 5) return;
  const anchors = [
    { x: .1, y: .18, radius: 25 },
    { x: .82, y: .13, radius: 32 },
    { x: .2, y: .62, radius: 38 },
    { x: .74, y: .7, radius: 27 },
    { x: .44, y: .84, radius: 31 },
  ];
  const anchor = anchors[cloudIndex++ % anchors.length];
  strokes.push({ shape: 'cloud', x: window.innerWidth * anchor.x, y: window.innerHeight * anchor.y, radius: anchor.radius, created: performance.now() });
}

let cloudIndex = 0;
setTimeout(addDemoCloud, 450);
setInterval(addDemoCloud, 560);
