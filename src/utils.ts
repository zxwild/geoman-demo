import { Geoman } from '@geoman-io/maplibre-geoman-free';
import * as ml from 'maplibre-gl';

export const waitForGeomanLoaded = async (map: ml.Map, geoman: Geoman) => {
  if (geoman.loaded) {
    return;
  }

  await new Promise((resolve) => {
    map.once('gm:loaded', async () => {
      resolve(true);
    });
  });
};
