(() => {
  const page = document.querySelector('.sketchbook-page');
  if (!page) return;

  const artworks = JSON.parse(document.querySelector('#sketchbook-artworks').textContent);
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
  const imageBase = page.dataset.imageBase.replace(/\/$/, '');
  let filtered = [];
  let previewIndex = 0;
  let openerIndex = 0;

  const imageUrl = (artwork) =>
    `${imageBase}/${artwork.image_key.split('/').map(encodeURIComponent).join('/')}`;
  const thumbnailUrl = (artwork) =>
    `${imageBase}/cdn-cgi/image/width=320,format=auto/${artwork.image_key.split('/').map(encodeURIComponent).join('/')}`;

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
    let usingOriginal = false;
    image.addEventListener('load', () => {
      tile.classList.remove('is-loading');
    });
    image.addEventListener('error', () => {
      if (!usingOriginal) {
        usingOriginal = true;
        image.src = imageUrl(artwork);
        return;
      }
      tile.classList.remove('is-loading');
      tile.classList.add('has-error');
    });
    image.src = thumbnailUrl(artwork);
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
    tile.append(button);
    return tile;
  }

  function selectFilter(tag) {
    filtered = artworks.filter((artwork) => tag === 'all' || artwork.tags.includes(tag));
    filters.forEach((button) => {
      const active = button.dataset.sketchFilter === tag;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    grid.replaceChildren(...filtered.map((_, index) => createTile(index)));
    empty.hidden = filtered.length > 0;
    status.textContent = `${filtered.length} artworks. ${tag === 'all' ? 'All tags' : tag} selected.`;
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
    grid.children[openerIndex]?.querySelector('button').focus({ preventScroll: true });
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
  const startingFilter = initialFilter();
  selectFilter(startingFilter);
  if (window.location.hash !== `#${startingFilter}`) {
    const url = new URL(window.location.href);
    url.hash = startingFilter;
    window.history.replaceState(null, '', url);
  }
})();
