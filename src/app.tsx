import mapStyle from '@/maplibre-style.ts';
import { waitForGeomanLoaded } from '@/utils.ts';
import { type FeatureCreatedFwdEvent, Geoman } from '@geoman-io/maplibre-geoman-free';
import { Map as MapGL, type MapRef } from '@vis.gl/react-maplibre';
import React, { useEffect, useRef } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import '@geoman-io/maplibre-geoman-free/dist/maplibre-geoman.css';


let promiseChain = Promise.resolve();

function InitGeoman({ mapRef }: { mapRef: React.RefObject<MapRef | null>; }) {
  useEffect(() => {
    let geoman: Geoman;
    const map = mapRef.current?.getMap();
    console.log('map', map);

    if (!map) {
      return;
    }

    const eventHandler = async (event: FeatureCreatedFwdEvent) => {
      event.feature.updateGeoJsonProperties({ toolType: 'test-123' });
      await event.feature.source.waitForLoad();

      console.log('feature geojson', event.feature.getGeoJson());
      console.log('source geojson', event.feature.source.getGeoJson());
    };

    promiseChain = promiseChain.then(async () => {
      geoman = new Geoman(map, {});
      await waitForGeomanLoaded(map, geoman);
      console.log('loaded!');

      map.on('gm:create', eventHandler);
    });

    return () => {
      promiseChain = promiseChain.then(async () => {
        map.off('gm:create', eventHandler);
        await geoman.destroy();
        console.log('destroyed!');
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
