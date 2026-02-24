import mapStyle from '@/maplibre-style.ts';
import {
  createGeomanInstance,
  type FeatureCreatedFwdEvent,
  type FeatureSourceName,
  Geoman
} from '@geoman-io/maplibre-geoman-free';
import {MapGL, type MapRef} from '@/mapgl.tsx';
import React, {useEffect, useRef} from 'react';
import '@/style.css';
import 'maplibre-gl/dist/maplibre-gl.css';
import '@geoman-io/maplibre-geoman-free/dist/maplibre-geoman.css';


let promiseChain = Promise.resolve();

function InitGeoman({mapRef}: { mapRef: React.RefObject<MapRef | null>; }) {
  useEffect(() => {
    let geoman: Geoman;
    const map = mapRef.current?.getMap();
    console.log('map', map);

    if (!map) {
      return;
    }

    const eventHandler = async (event: FeatureCreatedFwdEvent) => {
      await event.feature.updateProperties({toolType: 'test-123'});
      await geoman.features.updateManager.waitForPendingUpdates(event.feature.source.id as FeatureSourceName);

      console.log('feature geojson', event.feature.getGeoJson());
      console.log('source geojson', event.feature.source.getGeoJson());
    };

    promiseChain = promiseChain.then(async () => {
      // geoman = await createGeomanInstance(map, {settings: {awaitDataUpdatesOnEvents: false}});
      geoman = await createGeomanInstance(map, {});
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
      initialViewState={{longitude: 0, latitude: 51, zoom: 5}}
      style={{flex: '1 1 auto'}}
    >
      <InitGeoman mapRef={mapRef} />
    </MapGL>
  );
}
