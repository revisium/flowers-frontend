import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';

export default [
  layout('app/layouts/AppLayout/AppLayout.tsx', [
    index('app/routes/_index.tsx'),
    route('about', 'app/routes/about.tsx'),
    route('blog', 'app/routes/blog.tsx'),
    route('blog/gloxinia-story', 'app/routes/blog-gloxinia-story.tsx'),
    route('blog/hoya-pubicalyx-care', 'app/routes/blog-hoya-pubicalyx-care.tsx'),
    route('blog/succulent-leaves-story', 'app/routes/blog-succulent-leaves-story.tsx'),
    route('care', 'app/routes/care.tsx'),
    route('gloxinia-story', 'app/routes/gloxinia-story.tsx'),
    route('hoya-pubicalyx-care', 'app/routes/hoya-pubicalyx-care.tsx'),
  ]),
] satisfies RouteConfig;
