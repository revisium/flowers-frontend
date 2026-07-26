import type { LinksFunction } from 'react-router';
import { CarePage } from 'src/pages/Care';

export const links: LinksFunction = () => [
  {
    as: 'image',
    href: '/care/care-hero.webp',
    rel: 'preload',
  },
];

const CareRoute = () => {
  return <CarePage />;
};

export default CareRoute;
