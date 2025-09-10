import mapStyle from '@/maplibre-style.ts';
import { Geoman } from '@geoman-io/maplibre-geoman-free';
import ml from 'maplibre-gl';
import React, { useEffect, useRef } from 'react';


const App = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<ml.Map | null>(null);
  const geomanInstance = useRef<Geoman | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstance.current) {
      return;
    }

    mapInstance.current = new ml.Map({
      container: mapRef.current,
      style: mapStyle,
      center: [0, 51],
      zoom: 5,
      fadeDuration: 50,
    });
    geomanInstance.current = new Geoman(mapInstance.current);
    console.log(`Geoman loaded, maplibre version: "${mapInstance.current.version}"`, geomanInstance.current);

    return () => {
      console.log('Geoman cleanup');
      if (geomanInstance.current) {
        geomanInstance.current.destroy();
        geomanInstance.current = null;
      }
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <div id="dev-map" ref={mapRef}>
    </div>
  );
};

export default App;
