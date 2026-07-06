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
