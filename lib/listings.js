function createListings({ baseUrl, items, filters, defaultKey = 'all', slugify }) {
  const urls = new Set();
  if (!filters.some((filter) => filter.key === defaultKey)) {
    throw new Error(`Missing default listing: ${baseUrl}${defaultKey}`);
  }
  return filters.map(({ key, label, matches }) => {
    const slug = slugify(key);
    const url = key === defaultKey ? baseUrl : `${baseUrl}${slug}/`;
    if (!slug || urls.has(url)) throw new Error(`Invalid or duplicate listing URL: ${url}`);
    urls.add(url);
    return { key, label, url, items: items.filter(matches) };
  });
}

function tagFilters(items, getTags, defaultKey = 'all') {
  const tags = [...new Set(items.flatMap(getTags))].sort();
  const keys = [defaultKey, ...tags.filter((tag) => tag !== defaultKey && tag !== 'all')];
  if (defaultKey !== 'all') keys.push('all');
  return keys.map((key) => ({
    key,
    label: key === 'all' ? 'All' : key === 'portfolio' ? 'Portfolio' : key,
    matches: (item) => key === 'all' || getTags(item).includes(key),
  }));
}

function createSectionListings({ posts, artworks, anime, coffees }, slugify) {
  const all = { key: 'all', label: 'All', matches: () => true };
  const favorites = {
    key: 'favorites',
    label: 'Favorites',
    matches: (item) => item.favorite === true,
  };
  const defaultArtworkTag = artworks.some((item) => item.tags.includes('portfolio'))
    ? 'portfolio'
    : 'all';
  const animeItems = [
    ...anime.watching.map((item) => ({ ...item, watching: true })),
    ...Object.entries(anime.watched).flatMap(([year, entries]) =>
      entries.map((item) => ({ ...item, watching: false, year })),
    ),
  ];
  const sections = {
    blog: {
      items: posts,
      filters: tagFilters(posts, (post) => post.data.tags || []),
    },
    sketchbook: {
      items: artworks,
      defaultKey: defaultArtworkTag,
      filters: tagFilters(artworks, (artwork) => artwork.tags, defaultArtworkTag),
    },
    anime: {
      items: animeItems,
      filters: [
        all,
        favorites,
        { key: 'series', label: 'Seasons', matches: (item) => item.type === 'series' },
        { key: 'film', label: 'Movies', matches: (item) => item.type === 'film' },
      ],
    },
    coffee: {
      items: [...coffees].sort((a, b) => String(a.date).localeCompare(String(b.date))).reverse(),
      filters: [all, favorites],
    },
  };
  return Object.fromEntries(
    Object.entries(sections).map(([section, settings]) => [
      section,
      createListings({ baseUrl: `/${section}/`, ...settings, slugify }),
    ]),
  );
}

module.exports = { createListings, createSectionListings };
