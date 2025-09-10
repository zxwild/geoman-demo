import App from '@/app.tsx';
import 'maplibre-gl/dist/maplibre-gl.css';
import '@geoman-io/maplibre-geoman-free/dist/maplibre-geoman.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/index.css';


ReactDOM.createRoot(document.getElementById('app')!).render(<App />);
