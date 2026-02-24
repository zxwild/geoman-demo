import * as React from 'react';
import { Map } from 'maplibre-gl';
import type { StyleSpecification } from 'maplibre-gl';

export interface MapRef {
  getMap(): Map;
}

interface MapGLProps {
  mapStyle: StyleSpecification;
  initialViewState: { longitude: number; latitude: number; zoom: number };
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const MapGL = React.forwardRef<MapRef, MapGLProps>(function MapGL(
  { mapStyle, initialViewState, style, children },
  ref,
) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [map, setMap] = React.useState<Map | null>(null);

  React.useImperativeHandle(
    ref,
    () => ({ getMap: () => map! }),
    [map],
  );

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const instance = new Map({
      container,
      style: mapStyle,
      center: [initialViewState.longitude, initialViewState.latitude],
      zoom: initialViewState.zoom,
    });

    instance.once('load', () => {
      setMap(instance);
    });

    return () => {
      instance.remove();
      setMap(null);
    };
  }, []);

  return (
    <div ref={containerRef} style={style}>
      {map && children}
    </div>
  );
});
