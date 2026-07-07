# Frontend Architecture

This repository has moved past the pure structural skeleton. The current
product surface is an exploratory home greenhouse prototype: `src/pages/Home`
renders a room canvas with fixed-position plant assets, category/search
filtering, locale-aware labels, hover plant plates, and an opened plant folio
card overlay.

## FSD Layer Hierarchy

Layers, from top to bottom, each depending only downward:

- `app` — routes, layouts, providers, and app-wide composition.
- `pages` — route-level page slices.
- `widgets` — reusable composed UI blocks (none yet).
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

## Home Prototype Contract

`src/pages/Home` is still a client-side prototype, not an API-backed product
flow. Its data is local mock content in the page slice model, and the UI uses a
fixed room coordinate system so plants stay anchored to shelves, the
windowsill, and floor areas while the room scrolls.

- `model/homeModel.ts` owns the local room facts: plants, categories, labels,
  locale copy, and count helpers.
- `model/homeViewModel.ts` owns the prototype interaction state and actions:
  category, search query, locale, selected plant id, and the card reset rules
  used when filters change.
- `model/plantItemViewModel.ts` derives repeated plant item view data:
  localized names, filter results, image paths, and fixed positioning.
- `model/plantCardViewModel.ts` derives the selected plant folio data from the
  local plant record and card content map.
- `ui/RoomPlantLayer` renders plant figures with hover/focus plates. The plate
  includes the plant name, category, and an explicit card-action button.
- `ui/PlantFolioCard` renders the modal plant card overlay with focus entering
  the dialog, Escape dismissal, tab containment, and focus restoration to the
  trigger.
- The room background remains a fixed-size canvas matching the source asset
  dimensions. Viewport overflow is handled by scrolling the room, not by
  resizing individual plant positions.

## Target MVVM Contract

Once product work starts, pages should follow this contract:

- DataSources own API/mock access.
- ViewModels own state, actions, derived values, and validation.
- React views render observable state and forward events only.

MobX is still not wired for `src/pages/Home`; the current home view model is a
small React-state prototype boundary, and plant item/card view models are pure
derivation helpers. Do not add MobX observer wiring, DataSources, or DI
composition until the prototype needs real state ownership beyond the route
prototype or external data.

## Styling

Chakra UI is the only styling system. Do not add raw CSS beyond the reset in
`src/shared/ui/global.css`. Theme/system setup lives in
`src/app/providers/chakraTheme.ts`.

## Component Folder Convention

Every component lives in its own same-named folder:
`src/**/ui/ComponentName/ComponentName.tsx`. Barrel `index.ts` files are not
allowed inside component folders — `scripts/lint-ui-structure.mjs` enforces
this. The one exception is `src/shared/ui/index.ts`, the shared-UI public
barrel.

## Generated Files

`src/__generated__/` (once it exists, e.g. from GraphQL codegen) is never
hand-edited.
