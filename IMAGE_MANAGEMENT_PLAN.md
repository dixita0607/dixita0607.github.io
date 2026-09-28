# Image management plan

## The approach

Use **Cloudflare R2** as the one public home for Sketchbook and Coffee images. It is an S3-compatible bucket, so the site can use clean, stable image paths without storing large image files in Git. R2's current free tier includes 10 GB of Standard storage, 1 million write operations, 10 million read operations per month, and free internet egress. An R2 subscription/billing setup is still required, even when usage stays within the free allowance. Recheck limits before bulk uploads. [R2 pricing](https://developers.cloudflare.com/r2/pricing/) · [R2 setup](https://developers.cloudflare.com/r2/get-started/)

The site repository will store only a small metadata catalogue and the code that displays it. Full-resolution originals stay in a private, backed-up location.

## Bucket structure

Use one bucket, for example `dixita-media`, with two simple folders:

```
dixita-media/
  sketchbook/
  coffee/
```

Each image gets a readable, permanent name:

```
sketchbook/dream.jpg
sketchbook/01-fish.jpg
coffee/banana-kents.jpg
coffee/banana-kents-brew.jpg
```

Use lowercase letters, numbers, and hyphens. Do not rename a published image: a stable path means old pages and shared links keep working.

## Keep the catalogue casual

Create one simple file: `content/_data/images.yaml`. Each image needs only four fields:

| Field | What it is for |
| --- | --- |
| `name` | Caption shown under the image. |
| `image` | Hosted R2 URL or bucket path. |
| `alt` | Short description for accessibility. |
| `tags` | A small list used for browsing and grouping. |

Tags are enough for both Sketchbook and Coffee. Examples: `original`, `inktober`, `gouache`, `penciljam`, `portrait`, `cat`, `coffee`, `bag`, `brew`, or a roaster name. An image can have more than one tag.

```yaml
- name: Dream
  image: https://images.example.com/sketchbook/dream.jpg
  alt: A person drawing on a tablet against a soft blue background.
  tags: [original, digital-art, character]

- name: Banana Kents — bag
  image: https://images.example.com/coffee/banana-kents.jpg
  alt: A bag of Banana Kents coffee beans.
  tags: [coffee, bag, half-light]
```

No dates, series fields, prompt fields, place fields, or coffee-specific fields are required. A new tag can be added later only when it makes browsing nicer.

## Upload workflow

1. Keep the original Procreate file or camera photo privately backed up.
2. Export a web copy as JPEG for photos/paintings or PNG only when transparency matters.
3. Resize before upload:
   - Sketchbook grid and coffee cards: longest side around 1600 px.
   - Carousel previews: longest side around 2400 px.
   - Do not upload raw camera files or full-resolution Procreate exports.
4. Name the file clearly, such as `cat-in-the-parking.jpg` or `banana-kents-brew.jpg`.
5. Upload it to the appropriate R2 folder.
6. Add one small entry to `images.yaml` with a name, image URL, alt text, and tags.
7. The relevant page reads that entry and shows it automatically in the grid, filter tags, and carousel.

## Delivery setup

Connect the bucket to a custom image domain, for example `images.dixita.dev` or `media.dixita.dev`. The site then uses URLs such as:

```
https://images.dixita.dev/sketchbook/dream.jpg
https://images.dixita.dev/coffee/banana-kents.jpg
```

Keep the bucket private for uploading and use the custom domain only for public image delivery. This separates the management side from the URLs visitors see.

For the first version, pre-resizing images before upload is the simplest route. If the collection gets large later, add Cloudflare image resizing or a build step to create grid and carousel sizes automatically. That can be introduced without changing the metadata structure.

## Migration plan

1. Set up the R2 bucket and a custom delivery domain.
2. Upload two or three Sketchbook images as a test.
3. Add their four-field entries to `images.yaml`.
4. Update the Sketchbook page to render from the catalogue and verify the grid, tags, and carousel on desktop and mobile.
5. Move the remaining Sketchbook images in small batches.
6. Add coffee images whenever you have them, using the same catalogue and simple tags.
7. Once a hosted image is live and checked, remove its duplicate from `web/assets/` so the repository stays light.

## Guardrails

- R2 hosts public website images, not your only copy of an original.
- Check every image's crop and alt text before publishing.
- Avoid uploading photos with unwanted location metadata; export a clean web copy instead.
- Keep unpublished or personal images out of the public folder.
- Keep tags few and natural. They are for casual browsing, not an archive system.
