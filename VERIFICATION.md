# VERIFICATION.md

This file is the repo-local verification contract for agents working on
flowers-frontend.

## Status

- Default repo-local contract: yes, filled with real commands (this file is
  not a template and carries no `TODO` placeholders).
- Existing repo-specific verification docs, if added later (for example
  `docs/quality-gates.md`), override this file.

## Primary Local Gate

Run before every handoff, commit, or PR update:

```bash
npm run verify
```

`verify` runs the gates in order and fails fast:

1. `markdown:lint` - `markdownlint-cli2` over repo Markdown and `.mdc` files.
2. `skills:lint` - validates `.agents/skills/*/SKILL.md` frontmatter and shape.
3. `ui:lint` - enforces the same-named component-folder convention under
   `src/**/ui/` (no loose component files, no barrel `index.ts` inside a
   component folder).
4. `ts:check` - `tsc --noEmit`, run twice: once against `tsconfig.json` and
   once against `tsconfig.node.json`.
5. `lint:ci` - `eslint "src/**/*.{ts,tsx}" --max-warnings 0` (zero warnings
   allowed).
6. `fsd:check` - `steiger src` (Feature-Sliced Design boundary checks).
7. `build` - `react-router build`; must produce both `build/server` and
   `build/client`.

## Required Local Gates

- Typecheck: `npm run ts:check` (`tsc --noEmit` against `tsconfig.json` and
  `tsconfig.node.json`).
- Lint: `npm run lint:ci` (`eslint --max-warnings 0`).
- Tests: none configured. This is a known gap, not an approved permanent
  exemption - no test runner is installed yet, matching the sibling
  `demo-enterprise-catalog-frontend` reference repo at the same bootstrap
  stage. Report this explicitly in verification results and self-reviews
  instead of silently skipping test-related review expectations.
- Build: `npm run build` (`react-router build`; must produce `build/server`
  and `build/client`).

## Conditional Gates

Run these only when the touched surface makes them relevant.

- Frontend structure checks: `npm run fsd:check` (Steiger FSD boundaries) and
  `npm run ui:lint` (same-named component-folder convention). Run after any
  change under `src/`.
- Backend contract or integration tests: not applicable; this repo has no
  backend.
- Database migration checks: not applicable.
- Package/type-surface checks: covered by `ts:check` above; no separate
  published package surface in this repo.
- Documentation checks: `npm run markdown:lint`. Run after any `.md` or
  `.mdc` change.
- Infrastructure checks: not applicable to local verification. The Docker
  image and Kubernetes deploy are exercised by the `build.yml` and
  `deploy.yml` GitHub Actions workflows, not by local commands.
- GraphQL/codegen drift: `npm run gql:codegen`, then `git diff --
  src/__generated__`. Run after any `.graphql` document or schema change.
  Codegen is configured but currently unused - there is no backend or
  GraphQL schema wired up yet, so this gate has nothing to exercise until
  that lands.

## Static Analysis

- Providers: SonarCloud.
- Blocking status: blocking on CI once `SONAR_TOKEN` is configured. Current
  state: the CI Sonar step in `.github/workflows/ci.yml` checks for
  `SONAR_TOKEN` and no-ops the scan when the secret is absent. Treat that as
  the current environment state, not a policy exemption - never report the
  Sonar gate as passed when it was actually skipped for a missing secret.
- Required before push: recommended locally whenever `SONAR_TOKEN`/
  `.env.sonar` is available; required in CI once the secret is configured
  there.
- Scope: full project. Coverage is excluded
  (`sonar.coverage.exclusions=**/*` in `sonar-project.properties`) because no
  test runner is installed yet.
- Local mode command: `npm run sonar:local` (local scan) and
  `npm run ci:local:sonar` (CI-equivalent local run).
- Local mode environment: requires a local `.env.sonar` file (copy from
  `.env.sonar.example`) or `SONAR_ENV_FILE`. Keep `.env.sonar` out of
  commits.
- Issue-level access: `npm run sonar:issues:local`.
- Finding categories: security, reliability, maintainability, duplication,
  quality gate. Coverage findings are not applicable while coverage is
  excluded.
- False-positive or accepted-risk policy: do not suppress a SonarCloud
  finding without narrow, documented evidence in the same PR.

## Remote Gates

- CI provider: GitHub Actions (`.github/workflows/ci.yml`).
- Blocking jobs: the single `checks` job - `npm run verify` plus the
  conditional SonarCloud scan.
- Non-blocking / independent jobs: `build.yml` (builds and pushes the Docker
  image; triggers on `master` pushes and `v*` tags) and `deploy.yml`
  (deploys to the `development` Kubernetes environment after a successful
  `Build` run on `master`). Neither runs on pull requests and neither gates
  PR merge.
- Required review threads: all open review threads must be resolved, with
  evidence, before merge; see `REVIEW.md`.
- Required deployment or preview checks: not applicable; `deploy.yml` only
  runs after merge to `master`, never as a PR gate.

## Notes

- Do not loosen `--max-warnings 0` or relax Steiger rules to make a gate
  pass.
- Do not hand-edit files under `src/__generated__/`; regenerate with
  `npm run gql:codegen` once a schema exists.
- Do not suppress a SonarCloud finding without narrow, documented evidence.
- This repo has no test runner configured yet. That is a known gap - flag it
  explicitly in verification results and self-reviews instead of treating
  "no tests exist" as equivalent to "tests passed".
- Local SonarCloud runs need Docker; copy `.env.sonar.example` to
  `.env.sonar` before running `npm run sonar:local` /
  `npm run sonar:issues:local`.
