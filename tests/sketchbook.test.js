const test = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const vm = require('node:vm');

const source = readFileSync(require.resolve('../web/sketchbook.js'), 'utf8');

function element() {
  const classes = new Set();
  return {
    classes,
    events: {},
    classList: {
      add: (name) => classes.add(name),
      remove: (name) => classes.delete(name),
      toggle(name, active) {
        if (active) classes.add(name);
        else classes.delete(name);
      },
    },
    addEventListener(name, callback) {
      this.events[name] = callback;
    },
    setAttribute() {},
    removeAttribute() {},
    hasAttribute: () => false,
    focus() {},
    replaceChildren() {},
    append() {},
  };
}

function gallery({ complete = false, naturalWidth = 0 } = {}) {
  const thumbnail = 'https://art.example/cdn-cgi/image/width=640,format=auto/art.jpg';
  const original = 'https://art.example/art.jpg';
  const image = Object.assign(element(), { src: thumbnail, complete, naturalWidth });
  const link = Object.assign(element(), { href: original });
  const tile = element();
  tile.classes.add('is-loading');
  tile.querySelector = (selector) => (selector === 'a' ? link : image);
  link.closest = () => tile;
  const controls = new Map();
  const dialog = element();
  dialog.querySelector = (selector) => {
    if (!controls.has(selector)) controls.set(selector, element());
    return controls.get(selector);
  };
  dialog.showModal = () => {
    dialog.open = true;
  };
  const page = {
    querySelector: (selector) =>
      selector === '.sketch-grid' ? { querySelectorAll: () => [tile] } : dialog,
  };
  const document = {
    querySelector: (selector) =>
      selector === '#sketchbook-artworks'
        ? { textContent: '[{"title":"Artwork","alt":"Artwork description"}]' }
        : page,
    createElement: element,
  };
  const previewRequests = [];
  class Image {
    constructor() {
      Object.assign(this, element());
    }
    decode() {
      previewRequests.push(this.src);
      return Promise.resolve();
    }
  }
  controls.set('img', Object.assign(element(), { replaceWith() {} }));
  vm.runInNewContext(source, { document, Image });
  return { thumbnail, original, image, link, tile, dialog, previewRequests };
}

test('thumbnail failures show an error without requesting the original', () => {
  const state = gallery();
  assert(state.tile.classes.has('is-loading'));
  state.image.events.error();
  state.image.events.error();
  assert(!state.tile.classes.has('is-loading'));
  assert(state.tile.classes.has('has-error'));
  assert.equal(state.image.src, state.thumbnail);
  assert.deepEqual(state.previewRequests, []);
  assert.equal(state.link.href, state.original);
});

test('cached thumbnail failures and successes initialize correctly', () => {
  const failed = gallery({ complete: true });
  assert(failed.tile.classes.has('has-error'));
  assert.equal(failed.image.src, failed.thumbnail);
  assert.deepEqual(failed.previewRequests, []);
  const loaded = gallery({ complete: true, naturalWidth: 640 });
  assert(!loaded.tile.classes.has('is-loading'));
  assert(!loaded.tile.classes.has('has-error'));
});

test('an errored tile opens the original only when explicitly selected', async () => {
  const state = gallery();
  state.image.events.error();
  state.link.events.click({ button: 0, ctrlKey: true });
  assert.deepEqual(state.previewRequests, []);
  let prevented = false;
  state.link.events.click({
    button: 0,
    preventDefault() {
      prevented = true;
    },
  });
  await new Promise(setImmediate);
  assert(prevented);
  assert(state.dialog.open);
  assert.deepEqual(state.previewRequests, [state.original]);
  assert.equal(state.image.src, state.thumbnail);
});
