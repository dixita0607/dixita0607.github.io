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
    if (stroke.shape === 'circle') {
      const progress = Math.min(1, age / 520);
      context.beginPath();
      context.arc(stroke.x, stroke.y, stroke.radius, 0, Math.PI * 2 * progress);
      context.strokeStyle = `rgba(66, 104, 223, ${opacity * .74})`;
      context.lineWidth = 4;
      context.lineCap = 'round';
      context.stroke();
      continue;
    }
    if (stroke.shape === 'star') {
      const progress = Math.min(1, age / 520);
      const points = Math.max(2, Math.ceil(8 * progress) + 1);
      context.beginPath();
      for (let point = 0; point < points; point += 1) {
        const angle = -Math.PI / 2 + point * Math.PI / 4;
        const radius = point % 2 === 0 ? stroke.radius : stroke.radius * .42;
        const x = stroke.x + Math.cos(angle) * radius;
        const y = stroke.y + Math.sin(angle) * radius;
        if (point === 0) context.moveTo(x, y); else context.lineTo(x, y);
      }
      context.strokeStyle = `rgba(66, 104, 223, ${opacity * .74})`;
      context.lineWidth = 4;
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.stroke();
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

let demoShape = 0;
function addDemoShape() {
  if (previousPoint || strokes.length > 0) return;
  const circle = demoShape++ % 2 === 0;
  strokes.push(circle
    ? { shape: 'circle', x: 76, y: window.innerHeight - 100, radius: 31, created: performance.now() }
    : { shape: 'star', x: window.innerWidth - 78, y: 128, radius: 27, created: performance.now() });
}

setTimeout(addDemoShape, 1800);
setInterval(addDemoShape, 4600);
