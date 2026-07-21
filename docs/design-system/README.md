# Design System

No visual design language exists yet — the product concept for
flowers-frontend has not been decided. This doc will grow once a design
direction is chosen.

## Current Convention

- Chakra UI v3 is the styling system.
- The Chakra system/theme setup lives in `src/app/providers/chakraTheme.ts`
  and is wired into the app through `src/app/providers/AppProvider.tsx`.
- No custom tokens, palette, or component recipes exist yet; the app uses
  Chakra's `defaultConfig` as-is.
- The persistent header wordmark uses medium-weight editorial lettering with a
  compact descriptor and a softly muted greenhouse mark. From tablet widths,
  navigation adds the primary page links between the wordmark and compact
  language controls. A dark-green collection-count pill always stays beside the
  language switcher, using a compact icon-and-count treatment below desktop
  widths and its full label on desktop. On mobile, the primary links move to a
  compact second header row.
- The shared footer closes every route with a dark-olive editorial surface,
  warm ivory type, a quiet botanical watermark, canonical navigation, and a
  bordered collection callout. Its three desktop columns collapse into a calm
  vertical sequence on mobile.
- Editorial photographic heroes preserve the source image's intended scale and
  composition, using only a narrow warm contrast gradient behind the copy.
  Their content uses a compact uppercase eyebrow, a dark-green display heading,
  restrained body copy, compact statistics, and a solid-green primary action
  paired with a quieter secondary action. Home may use a serif display heading
  for a more personal editorial tone, while interface controls remain in the
  primary sans-serif family. This treatment is shared in spirit by Home and
  Care while each page keeps its own composition. The contrast field expands at
  tablet and compact-desktop widths so localized copy remains readable at
  responsive sizes and browser zoom.
- Family detail views use layered depth: a tall botanical hero continues behind
  softly translucent information panels, which overlap the image with generous
  spacing instead of creating a hard section boundary.
- The About editorial uses a warm ivory page surface, Georgia display headings,
  olive timeline icons, pale generated watercolor miniatures inside feature
  badges, a pale generated watercolor sprig beside each section heading,
  a faint generated pencil-style botanical sketch inside the quote card,
  restrained inset section margins, and generated natural-light photography.
  Its desktop sections alternate image and copy blocks; they stack vertically
  on narrow screens.
- The Blog uses the same warm editorial family while acting as an index rather
  than a second personal-story page: a photographic journal hero introduces the
  section, and bordered experiment previews pair one responsive image with a
  date, serif title, short narrative, compact figures, and a clear reading
  action. All current and future previews share one 455 px desktop card height,
  with photography cropped inside that frame; tablet and mobile cards remain
  content-driven with a 320 px image frame. A quiet continuation note leaves
  room for future experiments.
- The succulent-leaf story extends that language with an airy split hero,
  alternating documentary image and copy blocks, sage statistic bands, quiet
  note callouts, a pale-sage progress chapter, an asymmetric composition
  gallery, and a generated panoramic closing image. Its own photographs retain
  their natural portrait or landscape proportions, while the generated images
  use warm cream, sage, moss, and dusty-pink botanical styling.
- The Gloxinia story extends the About editorial language with a photographic
  seed-to-flower timeline, thin warm-grey rules, restrained paired statistic
  cards, and a compact flowering gallery. Desktop uses a shorter split hero,
  one six-column journey row, two adjacent fact cards, and a text-plus-gallery
  closing row. Its supplied photographs are shown in responsive aspect-ratio
  frames. Wide timeline sources are extended into portrait compositions so
  they fill their cards without destructive cropping or empty letterbox bands
  when the viewport narrows. A generated panoramic gloxinia photograph and
  transparent handwritten sign-off form the final reflective quote banner.
- The Hoya care infographic at `/blog/hoya-pubicalyx-care` uses a full-width
  ivory editorial article with the same breadcrumb treatment as the Gloxinia
  story, dark botanical serif headings, olive numbered methods,
  fine botanical rules, leaf-image tip markers beside scalable live advice
  copy, exact photographic crops from its supplied reference, and a composed
  soft-olive closing band with live handwritten copy and an overlapping
  transparent branch. Below
  desktop width the three-column method grid becomes two columns and then a
  single readable column without shrinking the body copy. The hero keeps its
  right-side photograph at tablet widths and places only the main copy group on
  an airy, translucent blurred ivory panel; on mobile the photograph is removed so the
  introduction remains compact and readable. Its flowering panel uses three
  generated natural-light macro photographs of spherical burgundy, ivory, and
  blush Hoya umbels inside crisp white circular frames. A responsive ivory
  breathing gap separates the article's decorative closing band from the shared
  dark footer. Major Hoya article bands use doubled responsive spacing: 36 px
  between desktop sections and 84 px before the shared footer, with proportional
  48/44 px mobile and 36/68 px tablet values.
