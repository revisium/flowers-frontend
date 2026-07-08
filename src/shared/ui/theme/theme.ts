import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';

import { globalCss } from './globalCss';
import { textStyles } from './textStyles';

const config = defineConfig({
  globalCss,
  theme: {
    textStyles,
    tokens: {
      colors: {
        greenhouse: {
          leaf: { value: '#6f9745' },
          leafDark: { value: '#263729' },
          soil: { value: '#5b4c36' },
          cream: { value: '#fff8e9' },
          mist: { value: '#f2eadb' },
        },
      },
      fonts: {
        body: { value: "'NT Somic', 'NT Somic Fallback', sans-serif" },
        heading: { value: "'NT Somic', 'NT Somic Fallback', sans-serif" },
      },
    },
    breakpoints: {
      base: '0px',
      sm: '360px',
      md: '768px',
      lg: '1024px',
      xl: '1200px',
    },
  },
});

export const chakraSystem = createSystem(defaultConfig, config);
