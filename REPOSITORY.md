# REPOSITORY.md

This file is the repo-local map for agents working on flowers-frontend.

## Status

- Recommended: yes, filled with real content (this file is not a template
  and carries no `TODO` placeholders).
- Existing repo-specific docs override this file if they are added later.

## Repository Purpose

Flowers frontend - structural FSD/React Router v7 SSR skeleton, product
concept not yet decided.

## Structure

Feature-Sliced Design layers, one-way dependency
`app -> pages -> widgets/features/entities -> shared`:

- `src/app/` - application composition: root layout, providers, global
  setup.
- `src/pages/` - route-level page slices. `Home` owns the greenhouse dashboard
  and `Care` owns the localized `/care` editorial page.
- `src/widgets/` - composite UI slices. `Layout` owns the persistent app frame,
  header, locale control, and collection entry point.
- `src/features/` - reusable leaf UI/behavior slices. Empty pending product
  work.
- `src/entities/` - domain-shaped UI/data slices. Empty pending product
  work.
- `src/shared/` - cross-slice primitives (UI kit wiring, lib, config). No
  MobX view-model or DataSource wiring yet.
- `docs/` - architecture, review, and product docs, filled in as the
  product concept and pages are decided.

## Primary Surfaces

- Frontend: yes (React Router v7, SSR).
- Backend: not applicable.
- Library/package: not applicable.
- Infrastructure: not applicable for local ownership; a Docker image
  (`docker/`) and a Kubernetes deploy are built and run by CI only.
- Documentation: yes, under `docs/`.
- Data/modeling: not applicable yet - no backend or GraphQL schema is wired
  up.

## Entrypoints

- Main application entrypoint: `src/root.tsx`.
- Local development command: `npm run dev`.
- Primary verify command: see `VERIFICATION.md`.
- Review policy: see `REVIEW.md`.

## Generated Files

- Generated sources: `src/__generated__/` (GraphQL codegen output). Not yet
  populated - no backend or GraphQL schema is wired up yet.
- Files agents may regenerate: `src/__generated__/**`, via
  `npm run gql:codegen`, once a schema exists.
- Files agents must not edit manually: `src/__generated__/**`.

## Local Overlays

Concrete local values belong in ignored overlays such as:

- `.agents/local.env`
- `.agents/local.context.md`

Do not commit machine paths, tokens, account names, hosts, namespaces, or
other environment-specific values.

## Agent Notes

- Inspect current repo files before applying generic method rules.
- Prefer explicit repo docs over defaults from other repositories.
- If a required repo fact is missing, report it as unknown and request
  human input instead of guessing.

## Source Of Truth Order

1. `docs/` - architecture, review, and handoff docs, as they are added.
2. `VERIFICATION.md` - gate commands.
3. `REVIEW.md` - review policy.
4. This file - structure and conventions.
5. Workspace `../../agent-playbook` - canonical roles, pipelines, method.
