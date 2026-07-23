# Frontend Architecture

This repository has moved past the pure structural skeleton. The current
product surface is an exploratory greenhouse prototype with four page slices
supporting nine routes:

- `src/pages/Home` renders the presentation-focused landing/dashboard view:
  hero, collection summary, care actions, responsive category cards, and notes
  callout.
- `src/pages/Care` renders the localized care editorial at `/care`: a generated
  photographic hero, practical topic cards, a weekly plant-check routine, and a
  seasonal note.
- `src/pages/About` renders the localized greenhouse story at `/about`: an
  editorial hero, collection features, personal story, milestone timeline, and
  collection call to action.
- `src/pages/Blog` renders the localized experiment journal at `/blog` and its
  photographic articles. The journal links to the gloxinia story at
  `/blog/gloxinia-story` and the Russian Hoya pubicalyx care infographic at
  `/blog/hoya-pubicalyx-care`, plus the succulent-leaf propagation story at
  `/blog/succulent-leaves-story`. Legacy top-level article URLs redirect to
  their canonical Blog routes.

## FSD Layer Hierarchy

Layers, from top to bottom, each depending only downward:

- `app` — routes, layouts, providers, and app-wide composition.
- `pages` — route-level page slices.
- `widgets` — reusable composed UI blocks shared by page slices. Current widget
  slice is `Layout`, which owns the shared inner-screen frame, persistent
  header and footer, brand mark, responsive navigation, collection action, and
  language controls.
- `features` — cross-page reusable behavior (none yet).
- `entities` — domain types and data records. `collection` owns the canonical
  personal-plant list, its count helpers, and the localized content used by
  reusable plant profiles. It remains a domain slice while the prototype has a
  single Home consumer, so its intentional Steiger `insignificant-slice`
  exception is scoped in `steiger.config.ts`. Collection count helpers include
  each nested profile variant as a separate plant by default. A grouped record
  can provide an explicit total when its cover and gallery contain multiple
  photographs of the same plants, as in the Phalaenopsis collection.
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

`src/widgets/Layout` owns the persistent viewport frame and shared page chrome. It
renders the app background, applies the fixed `18px` viewport padding, hides
outer overflow, and places page content inside a rounded scroll container that
fills the remaining viewport width and height up to the current content max
width. The inner scroll container resets to the top whenever the route pathname
changes, so editorial pages always open from their beginning even when navigation
starts from a deeply scrolled page. The header provides a linked brand mark, localized responsive navigation,
a collection-overlay action with the derived plant count, and compact language
controls. Navigation stays in the desktop row from the tablet breakpoint and
moves below the brand and language controls as a second row on mobile. The
active navigation destination uses a persistent visual indicator and
`aria-current`; Blog articles keep Blog active, while the Home and Families
section links remain mutually exclusive based on the current URL hash. The
collection action always stays beside the language controls, using an icon and
count below the desktop breakpoint and its full label on desktop. Route pages
use this widget instead of adding their own outer viewport padding, top-level
rounded frame, or duplicated header. The shared editorial footer repeats the
canonical navigation, derives plant and represented-family counts from the
collection entity, opens the global collection overlay, and stacks its brand,
links, and collection callout on mobile. Its automatic top margin consumes any
unused vertical space so the footer stays against the bottom edge on unusually
tall viewports while continuing to follow long page content normally.

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
  The notes callout links to the greenhouse story at `/about`.
  Category cards open local category detail modals from
  `ui/AraceaeCategoryModal/data.ts`.
- `ui/HomeCollectionOverlay` supplies the full-screen personal-plant catalog
  mounted by `AppLayout`, so it opens above any current page. It derives its
  records and the count from `entities/collection`, supports local search
  filtering, and has both a horizontally scrollable family list and an explicit
  `All families` chooser so none of the available families are hidden behind the
  initial viewport. Opening a plant profile resets the overlay scroll position to
  the top so the profile begins with its title and hero on every breakpoint.
  Returning from a profile restores the catalog scroll position from which that
  plant was opened, while fully closing the overlay still resets its local state.
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

## Blog Article Contract: Hoya Guide

`src/pages/Blog/HoyaGuide` renders the static Russian care infographic at
`/blog/hoya-pubicalyx-care`. It recreates the supplied 1024 × 1536 editorial
artwork as a responsive, full-width Blog article. Its hero starts directly
below the shared header and carries the same Home / Blog / article breadcrumb
pattern as the gloxinia story. The original supplied artwork is retained under
`public/blog/hoya-pubicalyx-care/` and used as the exact visual source for
photographic regions and the intricate decorative treatments that must remain
pixel-faithful: botanical dividers and care pictograms. Advice bars, the
recommendations/flowering panels, and the closing band use live, scalable
typography with reusable transparent image icons so their copy stays readable.
Three generated macro photographs provide the burgundy, ivory, and blush flower
portraits while preserving the reference's circular composition. The legacy
`/hoya-pubicalyx-care` route redirects to the canonical Blog URL.

- `ui/HoyaGuidePage` is a composition shell only.
- `ui/HoyaGuideHero`, `ui/HoyaMethodsSection`, and `ui/HoyaGuideFooter` own the
  three principal bands of the infographic.
- At tablet width the hero's translucent blur is scoped to the text group only;
  the photograph remains unobscured outside that compact rounded reading panel.
- The article shell has no additional outer gutter, width cap, or poster shadow;
  its internal bands scale to the full width supplied by the shared layout.
- `ui/HoyaMethodCard` renders one typed record from `model/hoyaGuideData.ts` and
  pairs its live advice copy with the shared leaf image asset.
- `ui/ReferenceCrop` consistently exposes the supplied reference's photographic
  regions without creating approximated replacement images.
- Recommendation pictograms are separate generated WebP assets with transparent
  backgrounds. The closing band is composed from CSS, live text, and a clean
  transparent botanical illustration positioned over the flowering panel.

## About Prototype Contract

`src/pages/About` is a static, localized editorial page opened by the home
notes callout. Its typed copy, feature descriptors, and milestone records live
in `model/aboutPageData.ts`; it does not introduce data fetching, business
state, or speculative ViewModel/DataSource wiring.

- `ui/AboutPage` is a composition shell only.
- `ui/AboutHero`, `ui/AboutFeatures`, `ui/AboutStory`, `ui/AboutTimeline`, and
  `ui/AboutClosing` own the responsive page sections.
- `ui/AboutFeatureArtwork` supplies the generated watercolor miniatures used by
  feature items, `ui/AboutIcon` supplies the line-icon family used by milestone
  items and compact controls, and `ui/BotanicalHeading` supplies the repeated
  editorial heading.
- The `Ботанические эксперименты` / `Botanical experiments` feature provides
  the contextual route into the experiment journal at `/blog`.
- The closing section offers a non-commercial invitation to ask questions or
  exchange plant observations through Telegram or MAX, while its secondary
  action opens the global collection overlay through the shared layout context.

About photography lives under `public/about/` and is referenced by the page
sections.

## Blog Prototype Contract

`src/pages/Blog` is the static, localized index for personal growing
experiments. It is reached from the persistent header and the About feature
grid. The slice groups each route page with its own model and UI: the journal
index lives in `BlogPage/`, while the three articles live in
`GloxiniaStoryPage/`, `HoyaGuide/`, and `SucculentLeavesStoryPage/`. Typed copy
and experiment preview data live in `BlogPage/model/blogPageData.ts`; the
current prototype introduces no remote data or speculative state layer.

- `BlogPage/ui/BlogPage` is a composition shell only.
- `BlogPage/ui/BlogHero` introduces the journal, while
  `BlogPage/ui/BlogEntries` owns the section heading and experiment list,
  and `BlogPage/ui/BlogQuote` closes the index with a personal botanical quote.
- Blog heroes reuse the localized `shared/ui/EditorialBreadcrumbs` primitive and
  the common `shared/ui/EditorialHeroTitle` typography so the index and article
  introductions keep one accessible editorial structure without duplicating
  page-specific markup.
- `BlogPage/ui/BlogExperimentCard` owns the reusable preview presentation and
  navigates through each entry's typed canonical URL. The current entries link
  to the Hoya care infographic and the gloxinia photo essay; later growing
  experiments should be added to the Blog slice as peer article-page folders
  rather than as new FSD page slices or About-page sections.
- Every experiment preview uses the shared card's fixed 455 px desktop height;
  source-image proportions must be handled with `object-fit: cover` and must
  never change an individual card's height. Below desktop the card returns to
  content-driven height and a stable 320 px image frame so copy remains fully
  readable.

`BlogPage/` and the article-page folders are intentional internal route groups,
not FSD slices. `steiger.config.ts` narrowly disables the segment and nested
public-API rules only below `src/pages/Blog`; the `Blog` slice itself continues
to expose both route pages through its root `index.ts`.

The journal hero and first preview use generated editorial photography under
`public/blog/`; article-specific imagery remains under the corresponding
`public/blog/<article>/` folder.

## Blog Article Contract: Gloxinia Story

The gloxinia article is a static, localized photo essay inside
`src/pages/Blog/GloxiniaStoryPage`, reached from the experiment journal at
`/blog/gloxinia-story`. Its typed Russian and English copy, journey records,
statistics, and gallery descriptors live in
`GloxiniaStoryPage/model/gloxiniaStoryData.ts`. It introduces no remote data or
product state.

- `GloxiniaStoryPage/ui/GloxiniaStoryPage` is a composition shell only.
- `GloxiniaStoryPage/ui/GloxiniaStoryHero`,
  `GloxiniaStoryPage/ui/GloxiniaJourney`,
  `GloxiniaStoryPage/ui/GloxiniaFacts`,
  `GloxiniaStoryPage/ui/GloxiniaSharing`, and
  `GloxiniaStoryPage/ui/GloxiniaClosing` own the responsive editorial sections.
- `GloxiniaStoryPage/ui/GloxiniaJourneyStep` and
  `GloxiniaStoryPage/ui/GloxiniaStat` own repeated records, while
  `GloxiniaStoryPage/ui/GloxiniaStoryHeading` owns the shared botanical heading
  treatment.
- At desktop width the hero, six-stage journey, paired fact cards, and sharing
  gallery use the compact editorial proportions of the approved reference;
  narrower layouts progressively stack without horizontal clipping.
- Journey and gallery images use stable aspect-ratio frames. Wide journey
  sources are generatively extended into portrait photographs before display,
  avoiding both responsive cropping and empty letterbox bands.

The edited photographic sequence, generated hero, closing banner, and
handwritten closing artwork live under
`public/blog/gloxinia-story/`. The legacy `/gloxinia-story` route redirects to
the canonical Blog URL so saved links remain valid.

## Blog Article Contract: Succulent Leaves Story

The succulent-leaf article is a static, localized photo essay inside
`src/pages/Blog/SucculentLeavesStoryPage`, reached from the experiment journal
at `/blog/succulent-leaves-story`. Its typed Russian and English copy, journal
records, and statistics live in
`SucculentLeavesStoryPage/model/succulentLeavesStoryData.ts`. It introduces no
remote data or product state.

- `ui/SucculentLeavesStoryPage` is a composition shell only.
- `ui/SucculentStoryHero`, `ui/SucculentStoryJournal`, and
  `ui/SucculentStoryClosing` own the responsive editorial sections.
- The author's arrival, planting, cell-progress, and composition photographs
  are identified as documentary images in their captions; generated editorial
  photography supplies the hero, expected-rooting illustration, and closing
  banner.
- `ui/SucculentStoryUpdate` owns the later progress chapter, pairing two cell
  close-ups with an asymmetric three-image composition gallery and cautious
  plant identifications where the photographs show recognisable traits.
- Desktop alternates image and copy columns, while the mobile article stacks
  without horizontal clipping. The portrait planting photograph retains its
  original framing.

Article photography lives under `public/blog/succulent-leaves-story/` and is
referenced by the typed page-local descriptors.

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

Raster assets under `public/` use WebP consistently, including images with
transparency. `npm run images:check` enforces the format during verification;
SVG artwork and font files remain in their native formats. Images outside the
initial viewport should use native lazy loading and asynchronous decoding.

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
