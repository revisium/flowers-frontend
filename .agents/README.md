# .agents

This directory is the repo-local agent workflow overlay for flowers-frontend,
built on the canonical agent playbook.

For multi-repo workspaces, prefer
`../../agent-playbook/templates/workspace/agents-README.md` at the workspace
root. Use this repo-local file when this repository is used as a standalone
consuming root or needs a child-repo overlay.

These workflows are not a separate product or architecture source of truth.
When behavior, architecture, or review policy changes, update `AGENTS.md`,
`VERIFICATION.md`, `REVIEW.md`, and `REPOSITORY.md` first, then keep the
workflows below aligned.

## Source

- canonical playbook: `../../agent-playbook`
- manual run protocol: `../../agent-playbook/method/manual-run.md`
- bootstrap protocol: `../../agent-playbook/method/bootstrap.md`
- materialization protocol: `../../agent-playbook/method/materialization.md`
- artifact templates: `../../agent-playbook/templates/artifacts/`

## Skills

- [`frontend-general-checks`](./skills/frontend-general-checks/SKILL.md) -
  baseline verification before handoff, PR creation, and review-thread
  replies.
- [`frontend-self-review`](./skills/frontend-self-review/SKILL.md) -
  pre-handoff self-review for implementation branches and PR updates.
- [`frontend-pr-publish`](./skills/frontend-pr-publish/SKILL.md) - verified
  branch, commit, push, and PR creation workflow from fresh `master`.
- [`frontend-pr-review-iteration`](./skills/frontend-pr-review-iteration/SKILL.md)
  - GitHub review-thread and failed-check workflow: fetch, triage, fix,
  reply, resolve after verification.

Every `SKILL.md` must include YAML frontmatter with `name` and `description`.
`npm run skills:lint` enforces the repo-local skill format and is part of
`npm run verify`.

## Rules

Rules under [`rules/`](./rules/) are short reusable constraints for agents
and editors that understand `.mdc` rule files:

- [`generated-files.mdc`](./rules/generated-files.mdc) - keep generated
  files generated.
- [`git-staging.mdc`](./rules/git-staging.mdc) - keep commits scoped and
  reviewable.
- [`frontend-mvvm-boundaries.mdc`](./rules/frontend-mvvm-boundaries.mdc) -
  target-state MVVM/DataSource/List-Item ViewModel boundaries.
- [`read-review-contract.mdc`](./rules/read-review-contract.mdc) - start
  review and implementation work from `REVIEW.md`.

## Local Files

Use ignored files for concrete local values:

- `.agents/local.env`
- `.agents/local.context.md`
- `.agents/runs/`

Use `../../agent-playbook/templates/artifacts/execution-profile.md` as the
template for available roles, runners, model profiles, consensus providers,
and budget defaults. Save the filled profile as
`.agents/local.execution-profile.md`. Keep the filled profile ignored unless
the repository explicitly wants to commit non-sensitive defaults.

Example `.agents/local.context.md`:

```md
agents_repo_path: ../../agent-playbook
target_repo_path: .
execution_profile: .agents/local.execution-profile.md
```

## Playbook Overlay Rules

- Do not copy the full canonical playbook into this directory.
- Keep generated skills or adapter files reproducible from
  `../../agent-playbook`.
- Keep run artifacts out of reusable method changes unless the repo
  explicitly commits them.
- PR bodies are empty only by default at creation time. Do not clear or
  overwrite a PR body later, including automation-populated text, unless an
  explicit human-approved PR-maintenance action or repo overlay requires it.
- Merge `../../agent-playbook/templates/common/gitignore` into `.gitignore`
  before recording local `.agents` overlays or run state.
