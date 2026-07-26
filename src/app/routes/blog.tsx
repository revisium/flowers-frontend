import type { LinksFunction } from 'react-router';
import { BlogPage } from 'src/pages/Blog';

export const links: LinksFunction = () => [
  {
    as: 'image',
    href: '/blog/blog-hero-journal-v2.webp',
    rel: 'preload',
  },
];

const BlogRoute = () => {
  return <BlogPage />;
};

export default BlogRoute;
