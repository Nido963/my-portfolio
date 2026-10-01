# Collectif Nafass — Nidal Abdo portfolio

This is a hand-coded rebuild of **nafassdance.com**, which was made in Wix. It is a full-stack project with two parts:

- **Front end:** React 19 + Vite + React Router (`src/`)
- **Back end:** Express 5 API that serves all of the site content (`server/`)

## Run it

```bash
npm install
npm run dev
```

`npm run dev` starts both parts together:

| Part | URL |
| --- | --- |
| Website (Vite) | http://localhost:5173 |
| API (Express) | http://localhost:3001/api/site |

Vite forwards `/api/*` to Express, so the site always talks to the API.

### Production

```bash
npm run build   # bundles the site into dist/
npm start       # Express serves dist/ + the API at http://localhost:3000
```

## Pages (same URLs as the Wix site)

| URL | Page |
| --- | --- |
| `/` | Home: hero, 5 YouTube videos, photo gallery with full-screen viewer, quote strip, contact |
| `/bio` | About: Collective Nafass, Nidal Abdo, professional experiences, education |
| `/shows-1` | Shows: 3 cards, each "See more" opens its show page |
| `/habitus` · `/what-if-tomorrow` · `/in-motion` | Show pages: credits, about the show, dancers, video |
| `/press` | Press: 12 articles; each "Lire l'article complet" opens the article popup |

Menu items **Videos** and **Contact Us** scroll to `/#videos` and `/#contact` on the home page, the same as on Wix.
A gallery photo can be linked directly with `/?pgid=jcoipdc8-<id>`, which was also how Wix did it.

## Editing content

**All text, links, video IDs, captions and image paths live in one file: `server/data/site.json`.**
The API reads it on every request, so after you save the file you only need to refresh the browser.

- Add a gallery photo: put it in `public/media/gallery/` and add an item to `home.gallery.items`. `x/y/w/h` place it in the collage, which is laid out on a 1450 px-wide grid.
- Add a press article: add an entry to `press.articles`. The popup can show `title`, `paragraphs` and/or `images`.
- Change a video: edit the `youtubeId`.

## Folder map

```
server/
  index.js            Express API (+ serves dist/ in production)
  data/site.json      ← all site content
src/
  pages/              Home, Bio, Shows, ShowDetail, Press
  components/         Header, Footer, Gallery, Lightbox, PressPopup, VideoEmbed, Reveal …
  styles/             global + one CSS file per page
public/media/         all photos and logos, downloaded from the original site
_wix-reference/       the original saved Wix HTML pages (reference only, not used by the app)
```

## Fonts

All fonts come from Google Fonts. Two of the Wix fonts are commercial, so they have stand-ins:

- Share Tech Mono, Montserrat, Barlow and Niconne are the same fonts the Wix site used.
- *Avenir LT Light* → Nunito Sans Light
- *Lulo Clean* (the press popup titles) → Montserrat ExtraBold, uppercase and spaced
