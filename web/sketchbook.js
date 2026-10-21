(() => {
  const page = document.querySelector('.sketchbook-page');
  if (!page) return;

  const artworks = JSON.parse(document.querySelector('#sketchbook-artworks').textContent);
  const geometry = JSON.parse(document.querySelector('#sketchbook-geometry').textContent);
  const grid = page.querySelector('.sketch-grid');
  const filters = [...page.querySelectorAll('[data-sketch-filter]')];
  const status = page.querySelector('.sketch-status');
  const empty = page.querySelector('.sketch-empty');
  const dialog = page.querySelector('.sketch-lightbox');
  let preview = dialog.querySelector('img');
  let previewRequest = 0;
  const captionTitle = dialog.querySelector('.sketch-lightbox__title');
  const captionCredits = dialog.querySelector('.sketch-lightbox__credits');
  const previewError = dialog.querySelector('.sketch-lightbox__error');
  const closeButton = dialog.querySelector('.sketch-lightbox__close');
  const previousButton = dialog.querySelector('.sketch-lightbox__previous');
  const nextButton = dialog.querySelector('.sketch-lightbox__next');
  const mounted = new Map();
  const gap = 16;
  const imageBase = page.dataset.imageBase.replace(/\/$/, '');
  let filtered = [];
  let positions = [];
  let columnWidth = 0;
  let previewIndex = 0;
  let openerIndex = 0;
  let scheduled = false;

  const imageUrl = (artwork) =>
    `${imageBase}/${artwork.image_key.split('/').map(encodeURIComponent).join('/')}`;

  function layout() {
    const width = grid.clientWidth;
    if (width <= 0) return;
    const columns = Math.max(1, Math.floor((width + gap) / (240 + gap)));
    columnWidth = (width - gap * (columns - 1)) / columns;
    const heights = Array(columns).fill(0);
    positions = filtered.map((artwork) => {
      const column = heights.indexOf(Math.min(...heights));
      const height = columnWidth / (geometry[artwork.image_key] || 1);
      const position = { x: column * (columnWidth + gap), y: heights[column], height };
      heights[column] += height + gap;
      return position;
    });
    grid.style.height = `${Math.max(0, ...heights) - (filtered.length ? gap : 0)}px`;
    render();
  }

  function createTile(index) {
    const artwork = filtered[index];
    const tile = document.createElement('div');
    tile.className = 'sketch-tile is-loading';
    const shade = [...artwork.image_key].reduce((hash, letter) => hash + letter.charCodeAt(0), 0);
    tile.style.setProperty('--sketch-placeholder-tint', `${8 + (shade % 5) * 4}%`);
    tile.setAttribute('role', 'listitem');
    tile.setAttribute('aria-posinset', index + 1);
    tile.setAttribute('aria-setsize', filtered.length);
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-label', `Open ${artwork.title}`);
    const image = document.createElement('img');
    image.alt = artwork.alt;
    image.decoding = 'async';
    image.loading = 'lazy';
    image.addEventListener('load', () => {
      tile.classList.remove('is-loading');
      // New additions can acquire their geometry when first viewed, without YAML fields.
      if (!geometry[artwork.image_key] && image.naturalWidth && image.naturalHeight) {
        geometry[artwork.image_key] = image.naturalWidth / image.naturalHeight;
        layout();
      }
    });
    image.addEventListener('error', () => {
      tile.classList.remove('is-loading');
      tile.classList.add('has-error');
    });
    image.src = imageUrl(artwork);
    const error = document.createElement('span');
    error.className = 'sketch-tile__error';
    error.textContent = 'Preview unavailable. Open artwork';
    button.append(image, error);
    button.addEventListener('click', () => {
      openerIndex = index;
      showPreview(index);
      dialog.showModal();
      closeButton.focus();
    });
    // Tab follows catalogue order, including tiles not yet mounted in the window.
    button.addEventListener('keydown', (event) => {
      if (event.key !== 'Tab') return;
      const next = index + (event.shiftKey ? -1 : 1);
      if (next >= 0 && next < filtered.length) {
        event.preventDefault();
        focusTile(next);
      }
    });
    tile.append(button);
    return tile;
  }

  function render(forceIndex = -1) {
    const top = grid.getBoundingClientRect().top;
    const overscan = window.innerHeight * 0.75;
    const start = -top - overscan;
    const end = -top + window.innerHeight + overscan;
    const active = document.activeElement;
    const keep = new Set();
    positions.forEach((position, index) => {
      const tile = mounted.get(index);
      if (
        (position.y + position.height >= start && position.y <= end) ||
        index === forceIndex ||
        tile?.contains(active)
      ) {
        keep.add(index);
        if (!tile) mounted.set(index, createTile(index));
        const element = mounted.get(index);
        element.style.width = `${columnWidth}px`;
        element.style.height = `${position.height}px`;
        element.style.transform = `translate(${position.x}px, ${position.y}px)`;
      }
    });
    for (const [index, tile] of mounted) {
      if (!keep.has(index)) {
        tile.remove();
        mounted.delete(index);
      }
    }
    // Keep DOM and screen-reader order aligned without moving focused nodes.
    let cursor = grid.firstElementChild;
    [...keep]
      .sort((a, b) => a - b)
      .forEach((index) => {
        const tile = mounted.get(index);
        if (tile !== cursor) grid.insertBefore(tile, cursor);
        cursor = tile.nextElementSibling;
      });
  }

  function focusTile(index) {
    const position = positions[index];
    if (!position) return;
    const gridTop = window.scrollY + grid.getBoundingClientRect().top;
    const top = gridTop + position.y;
    if (top < window.scrollY || top + position.height > window.scrollY + window.innerHeight) {
      window.scrollTo({ top: Math.max(0, top - 24), behavior: 'instant' });
    }
    render(index);
    mounted.get(index)?.querySelector('button').focus({ preventScroll: true });
  }

  function selectFilter(tag) {
    filtered = artworks.filter((artwork) => tag === 'all' || artwork.tags.includes(tag));
    filters.forEach((button) => {
      const active = button.dataset.sketchFilter === tag;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    mounted.clear();
    grid.replaceChildren();
    empty.hidden = filtered.length > 0;
    status.textContent = `${filtered.length} artworks. ${tag === 'all' ? 'All tags' : tag} selected.`;
    layout();
  }

  async function showPreview(index) {
    if (!filtered.length) return;
    previewIndex = (index + filtered.length) % filtered.length;
    const artwork = filtered[previewIndex];
    const request = ++previewRequest;
    const url = imageUrl(artwork);
    dialog.classList.toggle('is-loading', !preview.hasAttribute('src'));
    previewError.hidden = true;
    dialog.setAttribute('aria-busy', 'true');
    previousButton.disabled = nextButton.disabled = filtered.length < 2;
    const nextImage = new Image();
    nextImage.alt = artwork.alt;
    nextImage.src = url;
    try {
      await nextImage.decode();
    } catch {
      if (request !== previewRequest) return;
      dialog.classList.remove('is-loading');
      dialog.removeAttribute('aria-busy');
      previewError.querySelector('a').href = url;
      previewError.hidden = false;
      return;
    }
    // Ignore superseded navigation and requests completed after the viewer closes.
    if (request !== previewRequest) return;
    preview.replaceWith(nextImage);
    preview = nextImage;
    dialog.classList.remove('is-loading');
    dialog.removeAttribute('aria-busy');
    captionTitle.textContent = artwork.title;
    captionCredits.replaceChildren();
    if (artwork.credits?.length) {
      const label = document.createElement('span');
      label.textContent = 'Inspired by: ';
      label.className = 'sketch-lightbox__credit-label';
      captionCredits.append(label);
      artwork.credits.forEach((credit) => {
        const entry = document.createElement('span');
        entry.className = 'sketch-lightbox__credit-entry';
        const text = credit.source ? `${credit.source} — ${credit.creator}` : credit.creator;
        if (credit.url) {
          const link = document.createElement('a');
          link.href = credit.url;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          link.textContent = text;
          entry.append(link);
        } else {
          const plainText = document.createElement('span');
          plainText.textContent = text;
          entry.append(plainText);
        }
        captionCredits.append(entry);
      });
    }
    previewError.querySelector('a').href = url;
  }

  previousButton.addEventListener('click', () => showPreview(previewIndex - 1));
  nextButton.addEventListener('click', () => showPreview(previewIndex + 1));
  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showPreview(previewIndex + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
  dialog.addEventListener('close', () => {
    ++previewRequest;
    dialog.classList.remove('is-loading');
    dialog.removeAttribute('aria-busy');
    preview.removeAttribute('src');
    captionTitle.textContent = '';
    captionCredits.replaceChildren();
    focusTile(openerIndex);
  });

  filters.forEach((button) =>
    button.addEventListener('click', () => {
      const tag = button.dataset.sketchFilter;
      selectFilter(tag);
      const url = new URL(window.location.href);
      url.hash = tag;
      window.history.replaceState(null, '', url);
    }),
  );
  const initialFilter = () => {
    const tag = window.location.hash.slice(1);
    return filters.some((button) => button.dataset.sketchFilter === tag)
      ? tag
      : artworks.some((artwork) => artwork.tags.includes('portfolio'))
        ? 'portfolio'
        : 'all';
  };
  window.addEventListener('hashchange', () => selectFilter(initialFilter()));
  page.querySelector('.sketch-filters').hidden = false;
  selectFilter(initialFilter());
  window.addEventListener(
    'scroll',
    () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        render();
      });
    },
    { passive: true },
  );
  let previousWidth = grid.clientWidth;
  new ResizeObserver(([entry]) => {
    if (entry.contentRect.width === previousWidth) return;
    previousWidth = entry.contentRect.width;
    layout();
  }).observe(grid);
})();
