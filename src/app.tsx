import mapStyle from '@/maplibre-style.ts';
import { createGeomanInstance, Geoman } from '@geoman-io/maplibre-geoman-free';
import { Map as MapGL, type MapRef } from '@vis.gl/react-maplibre';
import React, { useEffect, useRef } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import '@geoman-io/maplibre-geoman-free/dist/maplibre-geoman.css';


function InitGeoman({ mapRef }: { mapRef: React.RefObject<MapRef | null>; }) {
  const promiseChainRef = React.useRef<Promise<void>>(Promise.resolve());
  const gmRef = React.useRef<Geoman | null>(null);

  useEffect(() => {
    const map = mapRef.current?.getMap();
    console.log('map', map);

    if (!map) {
      return;
    }

    promiseChainRef.current = promiseChainRef.current.then(async () => {
      gmRef.current = await createGeomanInstance(map, {});
      console.log('geoman loaded!');
    });

    return () => {
      promiseChainRef.current = promiseChainRef.current.then(async () => {
        if (gmRef.current) {
          await gmRef.current.destroy();
          console.log('geoman destroyed!');
        }
      });
    };
  }, [mapRef]);

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
