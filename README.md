# Dixita Ganatra

My personal website, built with [Eleventy](https://www.11ty.dev/).

## Run locally

Install dependencies with `npm ci`, then run `npm start`.

## Build locally

Run `npm run build`. The deployable site is written to `dist/`.

## Sketchbook

Artwork records live in `content/_data/artworks.yaml`. Each record contains an exact R2
object key (`image_key`), a title, alt text, and tags. Tag filters are generated from the
catalogue; `portfolio` is the default filter, and `all` is last. Only tiles near the viewport
are mounted, with lazy-loaded images and a keyboard-accessible preview dialog.

Set the image host in `content/_data/sketchbook.yaml`. The current `r2.dev` host is for
previewing this branch; switch to the custom artwork domain before production use.
Image transformations are not enabled yet, so the preview serves the uploaded originals.

`content/_data/artworkGeometry.json` contains aspect ratios derived from the original
images to reserve the masonry layout before downloads complete. New artwork without a
cached ratio starts square and learns its ratio when the image loads; no dimensions need
to be entered in YAML. The local `artwork-images/` review folder is ignored by Git and is
not copied into the site build.
