# Frontend Architecture

This repository has moved past the pure structural skeleton. The current
product surface is an exploratory greenhouse prototype with one route-level
page slice:

- `src/pages/Home` renders the presentation-focused landing/dashboard view:
  hero, collection summary, care actions, responsive category cards, and notes
  callout.

## FSD Layer Hierarchy

Layers, from top to bottom, each depending only downward:

- `app` — routes, layouts, providers, and app-wide composition.
- `pages` — route-level page slices.
- `widgets` — reusable composed UI blocks shared by page slices. Current widget
  slice is `Layout`, which owns the shared inner-screen frame, persistent
  header, brand mark, search, language controls, and the entry point to the
  personal-plant catalog.
- `features` — cross-page reusable behavior (none yet).
- `entities` — domain types and mock/data records (none yet).
- `shared` — cross-cutting UI, API/transport, config, and infrastructure
  helpers with no product-domain knowledge.

`src/shared/config/locale.ts` owns the prototype locale type and best-effort
localStorage persistence. `src/widgets/Layout` calls the locale hook once,
keeps shared search state, and passes locale/search values into the persistent
header while page-local copy remains in each page slice model.

`entities/` and `features/` do not exist as directories in the repo yet. An
FSD layer should contain only slice folders, and there is no real slice to
put in either layer until the product domain is decided. Create the directory
when the first entity or feature slice lands, instead of adding an empty
placeholder now, to avoid tripping Steiger's structure checks on a layer with
no slices.

## App Layout Contract

`src/app/layouts/AppLayout` is only a React Router outlet boundary. Shared app
chrome lives in `src/widgets/Layout`, following the widget layout pattern used
by sibling projects.

`src/widgets/Layout` owns the persistent viewport frame and shared header. It
renders the app background, applies the fixed `18px` viewport padding, hides
outer overflow, and places page content inside a rounded scroll container that
fills the remaining viewport width and height up to the current content max
width. `HomePage` wraps its route content in this widget instead of adding its
own outer viewport padding, top-level rounded frame, or duplicated header.

## Home Prototype Contract

`src/pages/Home` is a client-side presentation prototype, not an API-backed
product flow. Its local mock data lives in `model/homePageData.ts`, including
the headline collection count, locale copy, statistic cards, and category card
metadata.

- `ui/HomePage` is a composition shell only.
- `ui/HomeHero` composes the generated hero background, tagline, statistics,
  action content, and tablet/desktop reminder card. The shared header is owned
  by `widgets/Layout`, not by the hero.
- `ui/HomeCategoriesSection` owns the labeled category section, responsive
  auto-fit category grid, notes callout, and category-card modal triggers.
  Category cards open local category detail modals from
  `ui/AraceaeCategoryModal/data.ts`.
- `ui/HomeCollectionOverlay` owns the full-screen personal-plant catalog. It
  derives its 67 local mock records from the existing family data, supports
  header-search filtering, and has both a horizontally scrollable family list
  and an explicit `All families` chooser so none of the 15 families are
  hidden behind the initial viewport.
- The reusable category detail modal frame and sections live in
  `ui/CategoryDetailModal`, `ui/CategoryHero`, `ui/CategoryInfoGrid`,
  `ui/CategoryCollectionSection`, `ui/InfoPanel`, and `ui/SproutIcon`.
  Category-specific copy and image paths stay in page-local detail data and the
  adjacent `familySeeds.json` content file so each completed family reuses the
  same presentation structure with different content.
- Repeated or decorative pieces live in same-named component folders, such as
  `HomeCategoryCard`, `HomeStats`, and `StatIconBox`.

The home category thumbnails use one distinct category artwork asset per
category. Cards open local detail modals for family overviews. Personal plants
are available from the persistent header button and open in the local overlay,
not at a separate route. The current prototype does not deep-link to a family
or an individual plant yet.

## Target MVVM Contract

Once product work starts, pages should follow this contract:

- DataSources own API/mock access.
- ViewModels own state, actions, derived values, and validation.
- React views render observable state and forward events only.

MobX is still not wired for the current prototype page. `src/pages/Home` is a
presentational composition backed by typed local mock data, while the
personal-plant overlay uses small local React-state controls and pure catalog
derivation helpers. Do not add MobX observer wiring,
DataSources, or DI composition until the prototype needs real state ownership
beyond the route prototype or external data.

## Styling

Chakra UI is the styling system. Theme/system setup lives in
`src/shared/ui/theme/`, including `theme.ts`, `globalCss.ts`, `textStyles.ts`,
and `fonts.css`. The global font is loaded from `public/fonts`.

## Component Folder Convention

Every component lives in its own same-named folder:
`src/**/ui/ComponentName/ComponentName.tsx`. Barrel `index.ts` files are not
allowed inside component folders — `scripts/lint-ui-structure.mjs` enforces
this. The one exception is `src/shared/ui/index.ts`, the shared-UI public
barrel.

Page files should stay as composition shells. Split meaningful sections,
repeated elements, controls, and decorative primitives into same-named component
folders under the page `ui/` directory. When implementing Chakra UI screens,
prefer the specific Chakra primitive that matches the element's layout or
semantic role (`Flex`, `Grid`, `Stack`, `Link`, `Image`, `Button`, `Text`) and
reserve `Box` for neutral wrappers, absolute layers, and small decorative
shapes. Keep page-local static presentation data in focused `model/` helpers
instead of embedding large arrays inside React components.

## Generated Files

`src/__generated__/` (once it exists, e.g. from GraphQL codegen) is never
hand-edited.
