# Frontend Architecture

This repository has moved past the pure structural skeleton. The current
product surface is an exploratory greenhouse prototype with two route-level
page slices:

- `src/pages/Home` renders the presentation-focused landing/dashboard view:
  hero, collection summary, care actions, responsive category cards, and notes
  callout.
- `src/pages/Care` renders the localized care editorial at `/care`: a generated
  photographic hero, practical topic cards, a weekly plant-check routine, and a
  seasonal note.

## FSD Layer Hierarchy

Layers, from top to bottom, each depending only downward:

- `app` — routes, layouts, providers, and app-wide composition.
- `pages` — route-level page slices.
- `widgets` — reusable composed UI blocks shared by page slices. Current widget
  slice is `Layout`, which owns the shared inner-screen frame, persistent
  header, brand mark, and language controls.
- `features` — cross-page reusable behavior (none yet).
- `entities` — domain types and data records. `collection` owns the canonical
  personal-plant list, its count helpers, and the localized content used by
  reusable plant profiles. It remains a domain slice while the prototype has a
  single Home consumer, so its intentional Steiger `insignificant-slice`
  exception is scoped in `steiger.config.ts`. Collection count helpers include
  each nested profile variant as a separate plant, so grouped Tradescantia,
  Callisia, Phalaenopsis, and gloxinia records contribute their full galleries
  to total and family counts.
- `shared` — cross-cutting UI, API/transport, config, and infrastructure
  helpers with no product-domain knowledge.

`src/shared/config/locale.ts` owns the prototype locale type and best-effort
localStorage persistence. `src/shared/config/layoutContext.tsx` owns shared
locale and catalog-open state, while page-local copy remains in each page slice
model.

`features/` does not exist yet. An FSD layer should contain only slice folders;
create a feature only when its behavior is needed across pages.

## App Layout Contract

`src/app/layouts/AppLayout` composes the React Router outlet and mounts the
collection overlay globally so the home hero action can open it without leaving
the current route. Shared app chrome lives in `src/widgets/Layout`, following
the widget layout pattern used by sibling projects.

`src/widgets/Layout` owns the persistent viewport frame and shared header. It
renders the app background, applies the fixed `18px` viewport padding, hides
outer overflow, and places page content inside a rounded scroll container that
fills the remaining viewport width and height up to the current content max
width. `HomePage` wraps its route content in this widget instead of adding its
own outer viewport padding, top-level rounded frame, or duplicated header.

## Home Prototype Contract

`src/pages/Home` is a client-side presentation prototype, not an API-backed
product flow. Its local presentation data lives in `model/homePageData.ts`,
including locale copy, statistic cards, and category-card metadata. The actual
personal-plant list lives in `src/entities/collection` so every counter is
derived from one source.

- `ui/HomePage` is a composition shell only.
- `ui/HomeHero` composes the generated hero background at its original
  responsive scale with a localized editorial introduction, the real plant and
  represented-family counts, and actions for the collection overlay and care
  page. A narrow contrast gradient supports the text without changing the source
  image or its composition. The shared header is owned by `widgets/Layout`, not
  by the hero.
- `ui/HomeCategoriesSection` owns the labeled category section, responsive
  auto-fit category grid, notes callout, and category-card modal triggers.
  Category cards open local category detail modals from
  `ui/AraceaeCategoryModal/data.ts`.
- `ui/HomeCollectionOverlay` supplies the full-screen personal-plant catalog
  mounted by `AppLayout`, so it opens above any current page. It derives its
  records and the count from `entities/collection`, supports local search
  filtering, and has both a horizontally scrollable family list and an explicit
  `All families` chooser so none of the available families are hidden behind the
  initial viewport.
- `ui/PlantProfileTemplate` is the reusable detailed-profile layout opened
  from a catalog card. It renders an individual plant's localized entity data:
  title, taxonomy, photos, difficulty, practical care, and a note. Profiles can
  also opt into a reusable variants gallery for plants represented by several
  colours or forms. The first profile is the real Cissus rhombifolia record in
  `entities/collection`.
- The reusable category detail modal frame and sections live in
  `ui/CategoryDetailModal`, `ui/CategoryHero`, `ui/CategoryInfoGrid`,
  `ui/CategoryCollectionSection`, `ui/InfoPanel`, and `ui/SproutIcon`.
  Family heroes use a tall photographic layer that continues behind the
  responsive origin, traits, and facts panels; the panels overlap it with a
  translucent surface and breakpoint-specific offset.
  Category-specific copy and image paths stay in page-local detail data and the
  adjacent `familySeeds.json` content file so each completed family reuses the
  same presentation structure with different content.
- Repeated or decorative pieces live in same-named component folders, such as
  `HomeCategoryCard` and `HomeStats`.

The home category thumbnails use one distinct category artwork asset per
category. Cards open local detail modals for family overviews. Personal plants
are available from the home hero's primary collection action and open in the
local overlay, not at a separate route. The current prototype does not deep-link
to a family or an individual plant yet.

## Care Prototype Contract

`src/pages/Care` is a static, localized companion page opened by the home
hero's care action. Its typed copy and topic descriptors live in
`model/carePageData.ts`; it does not introduce data fetching, business state,
or speculative ViewModel/DataSource wiring.

- `ui/CarePage` is a composition shell only.
- `ui/CareHero` owns the generated editorial hero image and the route back to
  the greenhouse.
- `ui/CareGuidesSection` composes the three responsive topic cards, while
  `ui/CareGuideCard` owns one repeated card and its practical checklist.
- `ui/CareRoutine` owns the weekly routine and seasonal reminder.

Care photography lives under `public/care/` and is referenced by the typed
page-local descriptors.

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
