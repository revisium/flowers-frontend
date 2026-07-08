# Frontend Architecture

This repository has moved past the pure structural skeleton. The current
product surface is an exploratory greenhouse prototype with two route-level
page slices:

- `src/pages/Home` renders the presentation-focused landing/dashboard view:
  hero, search affordance, collection summary, care actions, category cards,
  and notes callout.
- `src/pages/Collection` renders the interactive room canvas with fixed-position
  plant assets, category/search filtering, locale-aware labels, hover plant
  plates, and an opened plant folio card overlay.

## FSD Layer Hierarchy

Layers, from top to bottom, each depending only downward:

- `app` — routes, layouts, providers, and app-wide composition.
- `pages` — route-level page slices.
- `widgets` — reusable composed UI blocks shared by page slices. Current widget
  slices are `Layout`, which owns the shared inner-screen frame, and
  `GreenhouseMenu`, which keeps the brand mark, search, and language controls
  visually consistent across routes.
- `features` — cross-page reusable behavior (none yet).
- `entities` — domain types and mock/data records (none yet).
- `shared` — cross-cutting UI, API/transport, config, and infrastructure
  helpers with no product-domain knowledge.

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

`src/widgets/Layout` owns the persistent viewport frame. It renders the app
background, applies the fixed `18px` viewport padding, and places page content
inside a rounded inner screen that fills the remaining viewport width and
height. `HomePage` and `CollectionPage` wrap their route content in this widget
instead of adding their own outer viewport padding or top-level rounded frame.

## Home Prototype Contract

`src/pages/Home` is a client-side presentation prototype, not an API-backed
product flow. Its local mock data lives in `model/homePageData.ts`, including
the headline collection count, statistic cards, and category card metadata.

- `ui/HomePage` is a composition shell only.
- `ui/HomeHero` composes the generated hero background, top header,
  greeting/statistics/action content, and desktop reminder card.
- `ui/HomeHeader` is a thin route wrapper around `widgets/GreenhouseMenu`.
  Search is presentational for now.
- `ui/HomeCategoriesSection` owns the category strip, arrow scroll controls,
  and the notes callout.
- Repeated or decorative pieces live in same-named component folders, such as
  `HomeCategoryCard`, `HomeStats`, and `StatIconBox`.

The home category thumbnails intentionally use temporary representative plant
images until distinct category artwork lands with the product content model.

## Collection Prototype Contract

`src/pages/Collection` is still a client-side prototype, not an API-backed
product flow. Its data is local mock content in the page slice model, and the UI
uses a fixed room coordinate system so plants stay anchored to shelves, the
windowsill, and floor areas while the room scrolls.

- `model/collectionModel.ts` owns the local room facts: plants, categories,
  labels, locale copy, and count helpers.
- `model/collectionViewModel.ts` owns the prototype interaction state and
  actions: category, search query, locale, selected plant id, and the card reset
  rules used when filters change.
- `model/plantItemViewModel.ts` derives repeated plant item view data:
  localized names, filter results, image paths, and fixed positioning.
- `model/plantCardViewModel.ts` derives the selected plant folio data from the
  local plant record and card content map.
- `ui/RoomScene` composes the shared `widgets/GreenhouseMenu` above the room
  canvas and wires collection search and locale changes into it.
- `ui/RoomSidebar` owns only collection category navigation.
- `ui/RoomPlantLayer` renders plant figures with hover/focus plates. The plate
  includes the plant name, category, and an explicit card-action button.
- `ui/PlantFolioCard` renders the modal plant card overlay with focus entering
  the dialog, Escape dismissal, tab containment, and focus restoration to the
  trigger.
- `ui/CollectionPage` owns the floating return link back to `/`.
- The room background remains a fixed-size canvas matching the source asset
  dimensions. Viewport overflow is handled by scrolling the room, not by
  resizing individual plant positions.

## Target MVVM Contract

Once product work starts, pages should follow this contract:

- DataSources own API/mock access.
- ViewModels own state, actions, derived values, and validation.
- React views render observable state and forward events only.

MobX is still not wired for the current prototype pages. `src/pages/Home` is a
presentational composition backed by typed local mock data, while
`src/pages/Collection` uses a small React-state prototype boundary plus pure
plant item/card derivation helpers. Do not add MobX observer wiring,
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
