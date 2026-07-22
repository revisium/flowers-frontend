import { readdir } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const publicDirectory = fileURLToPath(new URL('../public/', import.meta.url));
const unsupportedRasterExtensions = new Set(['.jpeg', '.jpg', '.png']);

const collectUnsupportedImages = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const nestedResults = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = join(directory, entry.name);

      if (entry.isDirectory()) {
        return collectUnsupportedImages(entryPath);
      }

      return unsupportedRasterExtensions.has(extname(entry.name).toLowerCase()) ? [entryPath] : [];
    }),
  );

  return nestedResults.flat();
};

const unsupportedImages = await collectUnsupportedImages(publicDirectory);

if (unsupportedImages.length > 0) {
  console.error('Raster images in public must use WebP:');
  unsupportedImages
    .map((imagePath) => relative(publicDirectory, imagePath))
    .sort()
    .forEach((imagePath) => console.error(`- ${imagePath}`));
  process.exitCode = 1;
} else {
  console.log('Image format check passed: all public raster images use WebP.');
}
