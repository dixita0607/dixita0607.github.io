const test = require('node:test');
const assert = require('node:assert/strict');
const { createListings, createSectionListings } = require('../lib/listings');

const slugify = (value) => value.toLowerCase().replace(/\s+/g, '-');

test('listings select overlapping items and preserve a non-all default URL', () => {
  const items = [{ tags: ['portfolio', 'ink'] }, { tags: ['ink'] }];
  const pages = createListings({
    baseUrl: '/art/',
    items,
    defaultKey: 'portfolio',
    slugify,
    filters: [
      { key: 'portfolio', label: 'Portfolio', matches: (item) => item.tags.includes('portfolio') },
      { key: 'ink', label: 'Ink', matches: (item) => item.tags.includes('ink') },
      { key: 'all', label: 'All', matches: () => true },
    ],
  });
  assert.equal(pages[0].url, '/art/');
  assert.equal(pages[1].url, '/art/ink/');
  assert.equal(pages[2].url, '/art/all/');
  assert.deepEqual(
    pages.map((page) => page.items.length),
    [1, 2, 2],
  );
  assert.equal(pages[0].items[0], items[0]);
});

test('invalid defaults and colliding URL slugs fail the build', () => {
  const settings = { baseUrl: '/blog/', items: [], slugify };
  assert.throws(() => createListings({ ...settings, filters: [] }), /Missing default/);
  const filters = ['all', 'Digital Art', 'digital-art'].map((key) => ({
    key,
    label: key,
    matches: () => true,
  }));
  assert.throws(() => createListings({ ...settings, filters }), /duplicate listing URL/);
});

test('every section shares the listing contract without mutating its source records', () => {
  const source = {
    posts: [{ data: { tags: ['travel', 'art'] } }, { data: { tags: ['art'] } }],
    artworks: [{ tags: ['portfolio', 'illustration'] }, { tags: ['illustration'] }],
    anime: {
      watching: [{ title: 'Current', type: 'series', favorite: true }],
      watched: { 2025: [{ title: 'Movie', type: 'film', favorite: false }] },
    },
    coffees: [
      { name: 'Old', date: '2025-01-01', favorite: true },
      { name: 'New', date: '2026-01-01', favorite: false },
    ],
  };
  const original = structuredClone(source);
  const sections = createSectionListings(source, slugify);
  for (const pages of Object.values(sections)) {
    for (const page of pages) assert.deepEqual(Object.keys(page), ['key', 'label', 'url', 'items']);
  }
  assert.equal(sections.blog.find((page) => page.key === 'art').items.length, 2);
  assert.equal(sections.sketchbook[0].url, '/sketchbook/');
  assert.equal(sections.anime.find((page) => page.key === 'favorites').items.length, 1);
  const film = sections.anime.find((page) => page.key === 'film').items[0];
  assert.equal(film.watching, false);
  assert.equal(film.year, '2025');
  assert.equal(sections.coffee[0].items[0].name, 'New');
  assert.equal(sections.coffee[1].items[0].name, 'Old');
  assert.deepEqual(source, original);
});

test('empty sections still generate their default listing', () => {
  const sections = createSectionListings(
    {
      posts: [],
      artworks: [],
      anime: { watching: [], watched: {} },
      coffees: [],
    },
    slugify,
  );
  for (const [section, pages] of Object.entries(sections)) {
    assert.equal(pages[0].url, `/${section}/`);
    assert.deepEqual(pages[0].items, []);
  }
});
