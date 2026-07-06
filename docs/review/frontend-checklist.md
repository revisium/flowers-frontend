# Frontend Checklist

- Docs match changed behavior.
- React views do not own data fetching, forms, or business state.
- Mock data, once introduced, is typed and kept outside React components.
- UI fits desktop, tablet, and mobile layouts.
- `npm run verify` passes.
- `npm run ci:local:sonar` passes when `SONAR_TOKEN` is available; this is the
  local duplication/Quality Gate check.
- CI, Sonar, and review threads are followed to completion.
