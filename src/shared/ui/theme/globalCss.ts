import type { SystemConfig } from '@chakra-ui/react';

export const globalCss: SystemConfig['globalCss'] = {
  'html, body': {
    height: '100%',
    margin: 0,
    fontFamily: "'NT Somic', 'NT Somic Fallback', sans-serif",
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
  'button:focus, button:focus-visible, a:focus, a:focus-visible, input:focus, input:focus-visible, textarea:focus, textarea:focus-visible, select:focus, select:focus-visible, [role="button"]:focus, [role="button"]:focus-visible, [tabindex]:focus, [tabindex]:focus-visible, [data-focus], [data-focus-visible]': {
    boxShadow: 'none !important',
    outline: 'none !important',
  },
  'a, a:hover, a:focus, a:focus-visible, a:active, [data-scope="link"], [data-scope="link"]:hover, [data-scope="link"]:focus, [data-scope="link"]:focus-visible, [data-scope="link"]:active': {
    color: 'inherit',
    textDecoration: 'none',
  },
};
