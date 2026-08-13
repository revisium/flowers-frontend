import { access, readFile, readdir } from 'node:fs/promises';
import { extname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const publicDirectory = fileURLToPath(new URL('../public/', import.meta.url));
const collectionPlantsFile = fileURLToPath(
  new URL('../src/entities/collection/model/collectionPlants.ts', import.meta.url),
);
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
const collectionPlantsSource = await readFile(collectionPlantsFile, 'utf8');
const homePhotoPaths = [
  ...collectionPlantsSource.matchAll(/'\/plants\/([^']+-home-photo\.webp)'/g),
].map((match) => match[1]);
const missingCatalogImages = (
  await Promise.all(
    homePhotoPaths.map(async (homePhotoPath) => {
      const catalogPath = homePhotoPath.replace(/\.webp$/, '-catalog.webp');

      try {
        await access(join(publicDirectory, 'plants', catalogPath));
        return undefined;
      } catch {
        return join('plants', catalogPath);
      }
    }),
  )
).filter(Boolean);

if (unsupportedImages.length > 0) {
  console.error('Raster images in public must use WebP:');
  unsupportedImages
    .map((imagePath) => relative(publicDirectory, imagePath))
    .sort()
    .forEach((imagePath) => console.error(`- ${imagePath}`));
}

if (missingCatalogImages.length > 0) {
  console.error('Collection home photos must have matching catalog images:');
  missingCatalogImages.sort().forEach((imagePath) => console.error(`- ${imagePath}`));
}

if (unsupportedImages.length > 0 || missingCatalogImages.length > 0) {
  process.exitCode = 1;
} else {
  console.log('Image format check passed: all public raster images use WebP.');
  console.log('Catalog image check passed: every collection home photo has a catalog variant.');
}
