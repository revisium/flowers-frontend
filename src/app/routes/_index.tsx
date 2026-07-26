import type { LinksFunction } from 'react-router';
import { HomePage } from 'src/pages/Home';

export const links: LinksFunction = () => [
  {
    as: 'image',
    href: '/greenhouse-home-hero.webp',
    rel: 'preload',
  },
];

const HomeRoute = () => {
  return <HomePage />;
};

export default HomeRoute;
