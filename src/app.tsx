import mapStyle from '@/maplibre-style.ts';
import React, { useRef } from 'react';
import { type MapRef, Map as MapGL } from '@vis.gl/react-maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

function Geoman({ mapRef }: {
  mapRef: React.RefObject<MapRef | null>;
}) {
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
      <Geoman mapRef={mapRef} />
    </MapGL>
  );
}
