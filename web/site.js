const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.site-nav');
const themeButton = document.querySelector('.theme-toggle');

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('is-open', !open);
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  const isCurrentPage = link.pathname === window.location.pathname
    || (link.pathname !== '/' && window.location.pathname.startsWith(link.pathname));
  if (isCurrentPage) link.setAttribute('aria-current', 'page');
});

const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');
let savedTheme = null;

try {
  savedTheme = window.localStorage?.getItem('theme');
} catch {
  // Some privacy-focused browsers block persistent storage.
}

function applyTheme(theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.classList.toggle('light', theme === 'light');
  themeButton?.setAttribute('aria-pressed', String(theme === 'dark'));
  themeButton?.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
  const favicon = document.querySelector('#site-favicon');
  if (favicon) favicon.setAttribute('href', '/assets/signature-purple.svg');
}

applyTheme(savedTheme || (systemPrefersDark.matches ? 'dark' : 'light'));

themeButton?.addEventListener('click', () => {
  const nextTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
  applyTheme(nextTheme);
  try {
    window.localStorage?.setItem('theme', nextTheme);
  } catch {
    // The current session still switches theme when storage is unavailable.
  }
});

const blogFilters = document.querySelectorAll('.content-list .blog-filters .blog-filter');
const blogPosts = document.querySelectorAll('.blog-list li');

function selectBlogFilter(selectedTag) {
  blogFilters.forEach((filter) => {
    const isSelected = filter.dataset.filter === selectedTag;
    filter.classList.toggle('is-active', isSelected);
    filter.setAttribute('aria-pressed', String(isSelected));
  });
  blogPosts.forEach((post) => {
    post.hidden = selectedTag !== 'all' && !post.dataset.tags.split(' ').includes(selectedTag);
  });
}

blogFilters.forEach((filter) => {
  filter.addEventListener('click', () => {
    selectBlogFilter(filter.dataset.filter);
  });
});

const initialBlogFilter = window.location.hash.slice(1);
if (initialBlogFilter && [...blogFilters].some((filter) => filter.dataset.filter === initialBlogFilter)) {
  selectBlogFilter(initialBlogFilter);
}
