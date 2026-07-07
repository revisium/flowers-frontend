# AGENTS.md

This repository uses the canonical agent playbook from `../../agent-playbook`.

For multi-repo workspaces, prefer the workspace templates in
`../../agent-playbook/templates/workspace/` and keep this file only as a thin
child-repository overlay when agents are launched from inside this repository.

## Repo Overlay

Repo-local instructions win for concrete commands, paths, release policy,
domain facts, and environment boundaries. The canonical agent playbook provides
roles, pipelines, artifact contracts, and adapter rules.

## Canonical Method

- Start multi-role work with `../../agent-playbook/method/manual-run.md`.
- Use `../../agent-playbook/method/bootstrap.md` for local setup.
- Use `../../agent-playbook/method/materialization.md` for generated files.
- Discover roles from `../../agent-playbook/roles/INDEX.md`.
- Discover pipelines from `../../agent-playbook/pipelines/INDEX.md`.
- Fill handoff artifacts from `../../agent-playbook/templates/artifacts/`.
- Keep concrete local values in ignored `.agents/local.*` files.

## Frontend Roles And Stack

- Implementation role: `../../agent-playbook/roles/developer-frontend/ROLE.md`.
- Browser QA role: `../../agent-playbook/roles/qa-frontend/ROLE.md`.
- Stack: `../../agent-playbook/stacks/js-ts/STACK.md`. Once view-model work
  starts, load the composite route
  `../../agent-playbook/stacks/js-ts/references/react-mobx-mvvm.md` for
  React + MobX + MVVM + DI + FSD conventions (it bundles the granular
  `react-ui-boundary.md`, `mvvm-frontend.md`, `mobx-reactivity.md`,
  `frontend-di-composition.md`, and `frontend-fsd.md` references).

## Recommended Repo Docs

- `VERIFICATION.md` - exact local, conditional, static-analysis, and remote
  gates for this repository.
- `REVIEW.md` - repo-specific PR review rubric.
- `REPOSITORY.md` - optional map of repo structure, surfaces, generated files,
  and source-of-truth order.

Existing docs such as `docs/quality-gates.md`, README files, or CI docs may
replace these templates when they already contain the repo-specific truth.

## Repo Facts

- Primary stack: React 19 + React Router v7 (SSR) + Chakra UI v3 + MobX 6
  (installed, not yet wired to ViewModels) + Feature-Sliced Design
  (Steiger-enforced).
- Package manager or build runner: npm.
- Runtime/framework: React Router v7 in SSR mode (Vite 7 build, Node 24).
- Protected branch: `master`.
- Release branch: `master` today. No `release/*` line has been cut yet, but
  `.github/workflows/ci.yml` already triggers on both `master` and
  `release/**`, mirroring the sibling repos' convention, so a release branch
  can be opened later without CI changes.
- Local verify command: `npm run verify`.
- Static-analysis providers: SonarCloud (org `revisium`, project
  `revisium_flowers-frontend`).

## Product Status

- The product concept for this repository is not decided yet. This is
  currently a pure structural/tooling bootstrap: config, CI, and a plain
  presentational Feature-Sliced Design skeleton (for example `src/app`,
  `src/pages/Home`, `src/shared`) only.
- MobX and the MVVM/DataSource layering described by the stack references
  above are available in the dependency tree but not yet wired to any page.
  Do not scaffold ViewModels, DataSources, or DI composition ahead of a real
  product need; see `REVIEW.md` and
  `../../agent-playbook/references/quality/minimal-sufficient-code.md`.

## Component Decomposition

- Do not let page files grow into large one-file UI implementations. Keep page
  components as composition shells and split meaningful sections, repeated
  elements, controls, and decorative primitives into same-named component
  folders under the page `ui/` directory.
- When implementing Chakra UI screens, prefer idiomatic Chakra primitives
  (`Flex`, `Grid`, `Stack`, `Link`, `Image`, `Button`, `Text`) over generic
  `Box` when the element has a clearer semantic layout role. Reserve `Box` for
  neutral wrappers, absolute layers, and small decorative shapes.
- If a screen needs local static data for presentation, keep that data near the
  page in a focused model/helper file instead of embedding large arrays inside
  the page component.

## Required Workflow

- Inspect existing structure before editing.
- Keep changes scoped.
- Run local verification before commit.
- Check CI after push.
- Prefer `VERIFICATION.md`; if it is absent, derive checks from repo scripts and
  CI and report residual uncertainty.
- Treat unresolved static-analysis findings as blockers when the provider is
  configured and the repo policy makes it required.
- Answer PR review threads in-thread and resolve only after validation.
