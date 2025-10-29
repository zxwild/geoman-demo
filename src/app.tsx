import mapStyle from '@/maplibre-style.ts';
import { Geoman } from '@geoman-io/maplibre-geoman-free';
import { Map as MapGL, type MapRef } from '@vis.gl/react-maplibre';
import React, { useEffect, useRef } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import '@geoman-io/maplibre-geoman-free/dist/maplibre-geoman.css';


let promiseChain = Promise.resolve();

function InitGeoman({ mapRef }: {
  mapRef: React.RefObject<MapRef | null>;
}) {
  useEffect(() => {
    let geoman: Geoman;
    const map = mapRef.current?.getMap();
    console.log('map', map);

    if (!map) {
      return;
    }

    promiseChain = promiseChain.then(async () => {
      geoman = new Geoman(map, {});
      await new Promise((resolve) => {
        map.once('gm:loaded', async () => {
          resolve(geoman);
        });
      });
    });

    return () => {
      promiseChain = promiseChain.then(async () => {
        geoman.destroy();
      });
    };
  }, []);

  return null;
}

export default function App() {
  const mapRef = useRef<MapRef | null>(null);

  return (
    <MapGL
      ref={mapRef}
      mapStyle={mapStyle}
      initialViewState={{ longitude: 0, latitude: 51, zoom: 5 }}
      style={{ width: '100vw', height: '100vh' }}
    >
      <InitGeoman mapRef={mapRef} />
    </MapGL>
  );
}
