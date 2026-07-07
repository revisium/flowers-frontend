# Frontend Checklist

- Docs match changed behavior.
- React views do not own data fetching, forms, or business state.
- Mock data, once introduced, is typed and kept outside React components.
- Page files stay as composition shells; sections, repeated elements, controls,
  and decorative primitives are split into same-named component folders.
- Chakra UI screens use role-appropriate primitives (`Flex`, `Grid`, `Stack`,
  `Link`, `Image`, `Button`, `Text`) instead of defaulting to generic `Box`.
- UI fits desktop, tablet, and mobile layouts.
- `npm run verify` passes.
- `npm run ci:local:sonar` passes when `SONAR_TOKEN` is available; this is the
  local duplication/Quality Gate check.
- CI, Sonar, and review threads are followed to completion.
