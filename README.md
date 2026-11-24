# Bootstrap Restaurant & Bar

A restaurant website that combines two earlier projects, **free-meal-api** (recipe search) and **cocktail-api** (cocktail search), into one React app.

| Page | Route | Data source |
|---|---|---|
| Home | `/` | Five signature cocktails, loaded from TheCocktailDB |
| The Kitchen | `/kitchen?q=salmon` | [Edamam Recipe Search API](https://developer.edamam.com/edamam-docs-recipe-api) |
| The Bar | `/bar?q=martini` | [TheCocktailDB](https://www.thecocktaildb.com/api.php) |

Searches are stored in the URL (`?q=`), so they can be shared and work with the back button. The old `/search` route redirects to `/bar`.

## Setup

Node 14 is required (`react-scripts` 4 does not run on Node 17+ without `NODE_OPTIONS=--openssl-legacy-provider`).

```bash
npm install
cp .env.example .env.local   # then add your Edamam app id and key
npm start                    # http://localhost:3000
```

| Command | What it does |
|---|---|
| `npm start` | Dev server with hot reload |
| `npm test` | Runs the test suite (APIs are mocked) |
| `npm run build` | Production build in `build/` |

### Deploying

`public/_redirects` sends every path to `index.html` on Netlify, so client-side routes work. Set `REACT_APP_EDAMAM_APP_ID` and `REACT_APP_EDAMAM_APP_KEY` in the host's environment variables; CRA embeds them at build time.

## Structure

```
src/
  api/          kitchen.js (Edamam), bar.js (CocktailDB): fetch + normalise data
  hooks/        useSearch (URL-driven search), useReveal (scroll animations)
  components/   Navbar, Footer, PageHero, Results, cards, detail views, Modal
  pages/        Home, Kitchen, Bar, NotFound
  styles/       theme.css: the whole design system (colours, type, layout)
  assets/       web-optimised photography
```

Colours and fonts are CSS variables at the top of `src/styles/theme.css`.
