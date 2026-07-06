import { type RouteConfig, index, layout } from '@react-router/dev/routes';

export default [
  layout('app/layouts/AppLayout/AppLayout.tsx', [index('app/routes/_index.tsx')]),
] satisfies RouteConfig;
