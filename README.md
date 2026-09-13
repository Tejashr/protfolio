# Tejas HR — Portfolio

Personal site of Tejas HR, full-stack developer. Live at
[tejashr.github.io/protfolio](https://tejashr.github.io/protfolio/).

A single-page, mobile-first editorial portfolio: React 19 built with Vite,
no CSS framework, no animation library. Light and dark themes, self-hosted
fonts, responsive AVIF/WebP images generated at build time, structured data
for search engines and AI assistants.

## Scripts

| Command           | What it does                                                        |
| ----------------- | ------------------------------------------------------------------- |
| `npm run dev`     | Start the dev server (also `npm start`).                            |
| `npm run build`   | Production build into `dist/`.                                      |
| `npm run preview` | Serve the production build locally.                                 |
| `npm run deploy`  | Build and publish `dist/` to the `gh-pages` branch (GitHub Pages).  |

Requires Node 20 or newer. The site is served from `/protfolio/`, which is
set as `base` in `vite.config.js`; change both if the repository is renamed.

## Where things live

```
index.html                  Meta tags, Open Graph, JSON-LD, theme no-flash script
public/                     Static files copied as-is: fonts, icons, robots, sitemap, OG image
src/
  main.jsx                  Entry point
  App.jsx                   Page composition
  styles/tokens.css         Design tokens: colours (light + dark), type scale, spacing, motion
  styles/base.css           Fonts, reset, utilities, reveal animations, reduced motion
  data/                     All content, as plain data
    profile.js              Name, title, location, email, links
    projects.js             Selected work + the "recent, code only" footnote
    experience.js           Positions, newest first
    capabilities.js         What I build
    background.js           Recognition, education, certifications
    philosophy.js           Working principles
    navigation.js           Section list and numbering
  components/               One folder-free component per section, each with a CSS module
  hooks/                    Theme, scroll state, active section, reveal, focus trap, body lock
  lib/                      Theme storage helpers, date helpers
  assets/images/            Source images (portraits, project visuals, certificate)
scripts/
  make-icons.mjs            Regenerates the PNG icons from public/favicon.svg
  make-og.mjs               Renders public/og-image.png from scripts/og-template.html
  verify.mjs                Cross-breakpoint checks against a built site (needs Playwright)
  tour.mjs                  Viewport screenshots of every section for design review
  serve.mjs                 Tiny static server for dist/ with gzip, used by verify.mjs
```

## Editing content

Everything shown on the page comes from `src/data/`. To add a project, add an
entry to `projects.js` with a `layout` of `full`, `split-right`, `split-left`
or `typographic`, and import its image with the same `?w=...&format=...&as=picture`
query the existing entries use; `vite-imagetools` produces the responsive
variants at build time. To add a position, add an entry to `experience.js`.

## Theme

Three states: light, dark and system. The inline script in `index.html`
applies the stored choice (or the OS preference) before first paint, so there
is no flash. The header button switches light and dark; the footer and the
mobile menu expose the full three-way control. The choice is stored in
`localStorage` under `tejas-theme`.

## Verification

With Playwright available on the machine:

```
npm run build
node scripts/serve.mjs 4173
node scripts/verify.mjs http://localhost:4173/protfolio/ .verify
```

The script screenshots every breakpoint (375 to 1920) in both themes, checks
for horizontal overflow, console errors, image alt text and dimensions, theme
persistence, the mobile menu (mouse, keyboard, focus trap, Escape), the skip
link, reduced-motion rendering and every outbound link. It writes a report
to `.verify/report.md`.
