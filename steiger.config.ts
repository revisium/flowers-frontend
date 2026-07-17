import { defineConfig } from 'steiger';
import fsd from '@feature-sliced/steiger-plugin';

export default defineConfig([
  ...fsd.configs.recommended,
  {
    files: ['./src/entities/collection/**'],
    rules: {
      'fsd/insignificant-slice': 'off',
    },
  },
  {
    files: ['./src/pages/Blog/**'],
    rules: {
      'fsd/no-segmentless-slices': 'off',
      'fsd/public-api': 'off',
    },
  },
]);
