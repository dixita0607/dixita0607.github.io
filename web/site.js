document.documentElement.classList.add('js');

const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.site-nav');
const themeButton = document.querySelector('.theme-toggle');

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('is-open', !open);
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  const isCurrentPage =
    link.pathname === window.location.pathname ||
    (link.pathname !== '/' && window.location.pathname.startsWith(link.pathname));
  if (isCurrentPage) link.setAttribute('aria-current', 'page');
});

const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');
let savedTheme = null;

try {
  savedTheme = validTheme(window.localStorage?.getItem('theme'));
} catch {
  // Some privacy-focused browsers block persistent storage.
}

function validTheme(theme) {
  return theme === 'light' || theme === 'dark' ? theme : null;
}

function applyTheme(theme = savedTheme || (systemPrefersDark.matches ? 'dark' : 'light')) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.classList.toggle('light', theme === 'light');
  themeButton?.setAttribute('aria-pressed', String(theme === 'dark'));
  themeButton?.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
}

applyTheme();

systemPrefersDark.addEventListener('change', () => {
  if (!savedTheme) applyTheme();
});

window.addEventListener('storage', (event) => {
  if (event.key !== 'theme' && event.key !== null) return;
  savedTheme = validTheme(event.newValue);
  applyTheme();
});

themeButton?.addEventListener('click', () => {
  const nextTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
  savedTheme = nextTheme;
  applyTheme(nextTheme);
  try {
    window.localStorage?.setItem('theme', nextTheme);
  } catch {
    // The current session still switches theme when storage is unavailable.
  }
});
