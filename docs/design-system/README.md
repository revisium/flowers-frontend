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
- The persistent header wordmark uses medium-weight uppercase lettering with a
  compact uppercase descriptor and a softly muted greenhouse mark. This keeps
  the brand editorial without competing with page display headings.
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
