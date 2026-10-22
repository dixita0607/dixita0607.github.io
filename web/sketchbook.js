(() => {
  const page = document.querySelector('.sketchbook-page');
  if (!page) return;

  const artworks = JSON.parse(document.querySelector('#sketchbook-artworks').textContent);
  const grid = page.querySelector('.sketch-grid');
  const dialog = page.querySelector('.sketch-preview');
  let preview = dialog.querySelector('img');
  let previewRequest = 0;
  const captionTitle = dialog.querySelector('.sketch-preview__title');
  const captionCredits = dialog.querySelector('.sketch-preview__credits');
  const previewError = dialog.querySelector('.sketch-preview__error');
  const closeButton = dialog.querySelector('.sketch-preview__close');
  const previousButton = dialog.querySelector('.sketch-preview__previous');
  const nextButton = dialog.querySelector('.sketch-preview__next');
  const tiles = [...grid.querySelectorAll('.sketch-tile')];
  let previewIndex = 0;
  let opener = null;
  previousButton.disabled = nextButton.disabled = artworks.length < 2;

  tiles.forEach((tile, index) => {
    const link = tile.querySelector('a');
    const image = tile.querySelector('img');
    const loaded = () => tile.classList.remove('is-loading');
    const failed = () => {
      loaded();
      tile.classList.add('has-error');
    };
    image.addEventListener('load', loaded);
    image.addEventListener('error', failed);
    if (image.complete) {
      if (image.naturalWidth) loaded();
      else failed();
    }
    link.addEventListener('click', (event) => {
      // Preserve normal links, including opening artworks in another tab.
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        typeof dialog.showModal !== 'function'
      )
        return;
      event.preventDefault();
      opener = link;
      showPreview(index);
      dialog.showModal();
      closeButton.focus();
    });
  });

  function finishPreviewLoading() {
    dialog.classList.remove('is-loading');
    dialog.removeAttribute('aria-busy');
  }

  async function showPreview(index) {
    if (!artworks.length) return;
    previewIndex = (index + artworks.length) % artworks.length;
    const artwork = artworks[previewIndex];
    const request = ++previewRequest;
    const url = tiles[previewIndex].querySelector('a').href;
    dialog.classList.toggle('is-loading', !preview.hasAttribute('src'));
    previewError.hidden = true;
    dialog.setAttribute('aria-busy', 'true');
    const nextImage = new Image();
    nextImage.alt = artwork.alt;
    nextImage.src = url;
    try {
      await nextImage.decode();
    } catch {
      if (request !== previewRequest) return;
      finishPreviewLoading();
      previewError.querySelector('a').href = url;
      previewError.hidden = false;
      return;
    }
    // Ignore superseded navigation and requests completed after the viewer closes.
    if (request !== previewRequest) return;
    preview.replaceWith(nextImage);
    preview = nextImage;
    finishPreviewLoading();
    captionTitle.textContent = artwork.title;
    captionCredits.replaceChildren();
    if (artwork.credits?.length) {
      const label = document.createElement('span');
      label.textContent = 'Inspired by: ';
      label.className = 'sketch-preview__credit-label';
      captionCredits.append(label);
      artwork.credits.forEach((credit) => {
        const entry = document.createElement('span');
        entry.className = 'sketch-preview__credit-entry';
        const text = credit.source ? `${credit.source} — ${credit.creator}` : credit.creator;
        if (credit.url) {
          const link = document.createElement('a');
          link.href = credit.url;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          link.textContent = text;
          entry.append(link);
        } else {
          entry.textContent = text;
        }
        captionCredits.append(entry);
      });
    }
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
    finishPreviewLoading();
    preview.removeAttribute('src');
    captionTitle.textContent = '';
    captionCredits.replaceChildren();
    if (opener && !opener.closest('.sketch-tile').hidden) opener.focus({ preventScroll: true });
  });
})();
