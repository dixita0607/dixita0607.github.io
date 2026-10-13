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
  if (favicon) favicon.setAttribute('href', '/favicon.svg?v=triangle-v3');
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
    const selectedTag = filter.dataset.filter;
    selectBlogFilter(selectedTag);
    const url = new URL(window.location.href);
    url.hash = selectedTag === 'all' ? '' : selectedTag;
    window.history.replaceState(null, '', url);
  });
});

const initialBlogFilter = window.location.hash.slice(1);
if (
  initialBlogFilter &&
  [...blogFilters].some((filter) => filter.dataset.filter === initialBlogFilter)
) {
  selectBlogFilter(initialBlogFilter);
}

const animeFilters = document.querySelector('.anime-filters');
const animeEntries = [...document.querySelectorAll('.anime-entry')];
const animeEmpty = document.querySelector('#anime-filter-empty');
const animeSections = document.querySelector('.anime-sections');

if (animeFilters) {
  animeFilters.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
      const selected = button.dataset.animeFilter;
      animeFilters.querySelectorAll('button').forEach((filter) => {
        const active = filter === button;
        filter.classList.toggle('is-active', active);
        filter.setAttribute('aria-pressed', String(active));
      });
      animeEntries.forEach((entry) => {
        const matches =
          selected === 'all' ||
          (selected === 'favorites'
            ? entry.dataset.favorite === 'true'
            : entry.dataset.type === selected);
        entry.hidden = !matches;
      });
      document.querySelectorAll('.anime-year').forEach((year) => {
        year.hidden = !year.querySelector('.anime-entry:not([hidden])');
      });
      document.querySelectorAll('.anime-watching, .anime-archive').forEach((section) => {
        const hasEntries = section.querySelector('.anime-entry');
        const hasVisibleEntries = section.querySelector('.anime-entry:not([hidden])');
        section.hidden = Boolean(hasEntries) && !hasVisibleEntries;
      });
      animeSections.hidden = !animeSections.querySelector(':scope > section:not([hidden])');
      animeEmpty.hidden = animeEntries.some((entry) => !entry.hidden);
    });
  });
}

const coffeeFilters = document.querySelector('.coffee-filters');
const coffeeCards = [...document.querySelectorAll('.coffee-card')];
const coffeeEmpty = document.querySelector('.coffee-empty');

if (coffeeFilters) {
  coffeeFilters.querySelectorAll('button').forEach((button) => {
    button.addEventListener('click', () => {
      const selected = button.dataset.coffeeFilter;
      coffeeFilters.querySelectorAll('button').forEach((filter) => {
        const active = filter === button;
        filter.classList.toggle('is-active', active);
        filter.setAttribute('aria-pressed', String(active));
      });
      coffeeCards.forEach((card) => {
        card.hidden = selected === 'favorites' && card.dataset.favorite !== 'true';
      });
      coffeeEmpty.hidden = coffeeCards.some((card) => !card.hidden);
    });
  });
}
