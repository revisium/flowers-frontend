# Frontend Review Contract

This file is the review entry point for human reviewers and AI coding agents
working on flowers-frontend. Treat it as the short review source of truth and
follow links for detail.

If an enforceable review rule changes, update this file and any affected docs
in the same PR.

## Required Reading

Before reviewing a PR that touches frontend code or docs, read:

1. [`AGENTS.md`](./AGENTS.md)
2. [`VERIFICATION.md`](./VERIFICATION.md)
3. [`docs/architecture/frontend.md`](./docs/architecture/frontend.md)
4. [`docs/review/frontend-checklist.md`](./docs/review/frontend-checklist.md)

## Source Of Truth

`docs/` is the frontend implementation source of truth for architecture and
FSD boundaries. Reviewers should block drift in either direction:

- if implementation diverges from the docs, require a code fix or a docs
  update in the same PR;
- if the docs become stale or less specific than the code, require the docs
  to be restored before implementation continues.

The product concept for this repository is not decided yet. The MVVM,
DataSource, and List/Item ViewModel rules referenced below are target-state:
they describe the boundary this repo will use once a real page needs data
and behavior, not a pattern to scaffold in advance. Until a page has a real
consumer, prefer the smallest presentational implementation over speculative
ViewModel/DataSource ceremony - see the reuse-before-abstraction order in
[`../../agent-playbook/references/quality/minimal-sufficient-code.md`](../../agent-playbook/references/quality/minimal-sufficient-code.md).

## Priority Blockers

Block a PR when any of these are true:

- Code contradicts `docs/architecture/frontend.md`,
  `docs/review/frontend-checklist.md`, or this file.
- Target-state, applies once ViewModels/DataSources exist: React components
  fetch data, build API query payloads, or own business state directly
  instead of going through a ViewModel/DataSource.
- Equally valid before that pattern exists: speculative ViewModel,
  DataSource, DI-container, or store scaffolding is introduced without a
  real page consumer. Over-engineering ahead of product need is a blocker
  just as much as skipping the boundary later would be, per the
  minimal-sufficient-code reuse order above.
- Page-specific CSS is used instead of Chakra UI primitives.
- A file exports multiple non-trivial React components.
- A non-test component file under `src/**/ui/` is not placed in a
  same-named folder, or a component folder contains a barrel file such as
  `index.ts`. Example: `ui/RegionCard/RegionCard.tsx` is valid;
  `ui/RegionCard.tsx` and `ui/RegionCard/index.ts` are invalid.
- Generated files under `src/__generated__/` are hand-edited.
- TypeScript, lint, markdown, FSD (`steiger`), build, CI, Sonar, or
  unresolved-review-thread failures are ignored.

## Expected Author Self-Review

Every implementation PR should include:

- changed files summary;
- docs sync summary (what changed in `docs/`, or why no doc update was
  needed);
- `npm run verify` output;
- remaining risks, including any skipped gate and why.

## Review Comment Style

- cite the file and line;
- name the violated rule from this file or a linked doc;
- explain the user-visible, maintainability, or architecture risk;
- propose the smallest fix that keeps docs and code aligned.

Do not request broad rewrites when a local extraction or documentation
update would resolve the issue.
