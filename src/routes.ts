import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';

export default [
  layout('app/layouts/AppLayout/AppLayout.tsx', [
    index('app/routes/_index.tsx'),
    route('about', 'app/routes/about.tsx'),
    route('blog', 'app/routes/blog.tsx'),
    route('care', 'app/routes/care.tsx'),
    route('gloxinia-story', 'app/routes/gloxinia-story.tsx'),
  ]),
] satisfies RouteConfig;
