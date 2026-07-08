import type { SystemConfig } from '@chakra-ui/react';

export const globalCss: SystemConfig['globalCss'] = {
  'html, body': {
    height: '100%',
    margin: 0,
    fontFamily: "'NT Somic', sans-serif",
    background: '#f2eadb',
    color: '#2e3328',
  },
  body: {
    paddingBottom: 'env(safe-area-inset-bottom)',
    paddingLeft: 'env(safe-area-inset-left)',
    paddingRight: 'env(safe-area-inset-right)',
  },
  '*, *::before, *::after': {
    boxSizing: 'border-box',
  },
  button: {
    color: 'inherit',
    cursor: 'pointer',
    font: 'inherit',
  },
  'a, a:hover, a:focus, a:focus-visible, a:active, [data-scope="link"], [data-scope="link"]:hover, [data-scope="link"]:focus, [data-scope="link"]:focus-visible, [data-scope="link"]:active':
    {
    color: 'inherit',
    textDecoration: 'none',
  },
};
