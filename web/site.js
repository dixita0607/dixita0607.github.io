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
  const favicon = document.querySelector('#site-favicon');
  if (favicon) favicon.setAttribute('href', theme === 'dark' ? '/favicon-dark.ico' : '/favicon-light.ico');
  const signature = document.querySelector('#signature-mark');
  if (signature) signature.setAttribute('src', '/assets/signature-black.svg');
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

const sketchFilters = document.querySelectorAll('.sketch-filters .blog-filter');
const sketchTilesForFilter = document.querySelectorAll('.sketch-tile');
const sketchGrid = document.querySelector('.sketch-grid');

function layoutSketchMasonry() {
  if (!sketchGrid) return;

  const gap = 16;
  const minimumColumnWidth = 230;
  const gridWidth = sketchGrid.clientWidth;
  const columns = Math.max(1, Math.floor((gridWidth + gap) / (minimumColumnWidth + gap)));
  const columnWidth = (gridWidth - gap * (columns - 1)) / columns;
  const columnHeights = Array(columns).fill(0);
  const visibleTiles = [...sketchTilesForFilter].filter((tile) => !tile.hidden);

  sketchGrid.classList.add('is-masonry');
  visibleTiles.forEach((tile) => {
    const column = columnHeights.indexOf(Math.min(...columnHeights));
    tile.style.width = `${columnWidth}px`;
    tile.style.left = `${column * (columnWidth + gap)}px`;
    tile.style.top = `${columnHeights[column]}px`;
    columnHeights[column] += tile.offsetHeight + gap;
  });

  sketchGrid.style.height = `${Math.max(0, ...columnHeights) - gap}px`;
}

function selectSketchFilter(selectedTag) {
  sketchFilters.forEach((filter) => {
    const isSelected = filter.dataset.filter === selectedTag;
    filter.classList.toggle('is-active', isSelected);
    filter.setAttribute('aria-pressed', String(isSelected));
  });
  sketchTilesForFilter.forEach((tile) => {
    tile.hidden = selectedTag !== 'all' && !tile.dataset.tags.split(' ').includes(selectedTag);
  });
  requestAnimationFrame(layoutSketchMasonry);
}

sketchFilters.forEach((filter) => {
  filter.addEventListener('click', () => selectSketchFilter(filter.dataset.filter));
});

window.addEventListener('load', layoutSketchMasonry);
window.addEventListener('resize', layoutSketchMasonry);

const lightbox = document.querySelector('.sketch-lightbox');
const sketchTiles = [...document.querySelectorAll('.sketch-tile')];

if (lightbox && sketchTiles.length) {
  const previewImage = lightbox.querySelector('img');
  const previewCaption = lightbox.querySelector('figcaption');
  const closeButton = lightbox.querySelector('.sketch-lightbox__close');
  const previousButton = lightbox.querySelector('.sketch-lightbox__previous');
  const nextButton = lightbox.querySelector('.sketch-lightbox__next');
  let activeSketch = 0;

  function showSketch(index) {
    activeSketch = (index + sketchTiles.length) % sketchTiles.length;
    const tile = sketchTiles[activeSketch];
    const image = tile.querySelector('img');
    previewImage.src = image.currentSrc || image.src;
    previewImage.alt = image.alt;
    previewCaption.textContent = tile.dataset.title || '';
  }

  function openSketch(index) {
    showSketch(index);
    lightbox.showModal();
    closeButton.focus();
  }

  sketchTiles.forEach((tile, index) => {
    const title = tile.dataset.title || 'artwork';
    tile.tabIndex = 0;
    tile.setAttribute('role', 'button');
    tile.setAttribute('aria-label', `Preview ${title}`);
    tile.addEventListener('click', () => openSketch(index));
    tile.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openSketch(index);
      }
    });
  });

  closeButton.addEventListener('click', () => lightbox.close());
  previousButton.addEventListener('click', () => showSketch(activeSketch - 1));
  nextButton.addEventListener('click', () => showSketch(activeSketch + 1));
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) lightbox.close();
  });
  lightbox.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') showSketch(activeSketch - 1);
    if (event.key === 'ArrowRight') showSketch(activeSketch + 1);
  });
}
