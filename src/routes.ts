import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';

export default [
  layout('app/layouts/AppLayout/AppLayout.tsx', [
    index('app/routes/_index.tsx'),
    route('collection', 'app/routes/collection.tsx'),
  ]),
] satisfies RouteConfig;
