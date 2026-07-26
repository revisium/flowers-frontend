import type { LinksFunction } from 'react-router';
import { AboutPage } from 'src/pages/About';

export const links: LinksFunction = () => [
  {
    as: 'image',
    href: '/about/about-hero.webp',
    rel: 'preload',
  },
];

const AboutRoute = () => {
  return <AboutPage />;
};

export default AboutRoute;
