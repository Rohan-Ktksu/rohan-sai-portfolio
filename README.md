# Rohan Sai — Portfolio

A responsive, single-page portfolio made with HTML, CSS and TypeScript. The HTML contains the complete portfolio, including all projects and certificates. TypeScript progressively adds project filtering, an accessible mobile menu, current-section navigation and a copy-email control. Content and contact links remain available without scripting.

Edit the content in `dist/index.html`, the design in `dist/styles.css`, and the interactive behaviour in `src/portfolio.ts`. Browser JavaScript is compiled into `dist/assets`; the site requires no server application, framework or runtime libraries.

```sh
npm ci
npm run build
npm test
```

Serve `dist` with a static HTTP server to preview the site. The compiled JavaScript is checked in so the folder can also be hosted directly. Rebuild after editing TypeScript. GitHub Pages rebuilds and runs the filter tests on every push to `main`.

The portrait uses a responsive CSS crop of the supplied photograph to exclude the phone interface; the original image is preserved. The decorative monochrome appearance is a CSS filter.

The Bengaluru project thumbnail is an actual spatial visualisation of the atlas's 1,320 analysis cells and cooling-priority classes. Project descriptions are based on their repository READMEs. SelahFrame is a working local Windows studio; its cloud deployment remains in development. Other project thumbnails are illustrative HTML/CSS previews, not live output. Work history, education and contact information were supplied by Rohan. Certificate titles, completion dates and verification links are taken from the supplied credential records.

The website is hosted on GitHub Pages: https://rohan-ktksu.github.io/rohan-sai-portfolio/

The workflow in `.github/workflows/pages.yml` publishes the `dist` folder when changes are pushed to `main`. The website is portable and can also be served by any static web host. No account or sign-in is needed to view the public portfolio.

## Certificates

- Typescript in React: Get started — Coursera, completed 20 October 2026 ([credential](https://www.coursera.org/account/accomplishments/verify/EHZZO8VL8RCW)).
- Optimize Your Marketing Pipeline with AI — Coursera, completed 21 September 2026 ([credential](https://www.coursera.org/account/accomplishments/verify/D6H4ZBQRICPY)).
- Introduction to Graphic Design — NPTEL / IIT Hyderabad, February–April 2026; Elite, 82%. The supplied original PDF is in `dist/assets/certificates/nptel-graphic-design.pdf`.
