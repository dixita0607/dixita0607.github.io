# Agent Notes

## Editing guidance

- Do not overwrite user edits in a dirty working tree.
- Put blog assets in `web/assets/blog/<post-slug>/`.
- Ask before adding project conventions that are not already documented or clear from existing files.
- Keep internal implementation notes in AGENTS.md; do not update README.md for each code change.

## Listing pages

- Blog, sketchbook, anime, and coffee use `lib/listings.js` for build-time listing generation.
- Listings share `{ key, label, url, items }` under `collections.listings`; each section uses
  Eleventy pagination and its own item components.
- Blog and artwork filters come from tags; anime and coffee use properties such as `type` and
  `favorite`. Filter definitions and defaults live in `createSectionListings`.
- Keep source content in the existing Markdown and YAML files; listing navigation needs no browser JavaScript.
- Verify listing logic with `node --test tests/listings.test.js`.
