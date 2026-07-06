# Frontend Architecture

This is a structural skeleton. No product concept, ViewModels, or DataSources
exist yet — this document records the target shape so future work lands in
the right place from day one.

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

## Target MVVM Contract (Not Yet Implemented)

Once product work starts, pages should follow this contract:

- DataSources own API/mock access.
- ViewModels own state, actions, derived values, and validation.
- React views render observable state and forward events only.

**Current stage: plain presentational components only.** `src/pages/Home` has
no ViewModel or DataSource — it is a static placeholder proving the SSR/build
pipeline works end to end. Do not add MobX observer wiring until product work
starts.

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
