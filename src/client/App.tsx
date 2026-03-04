import { MapContainer } from 'react-leaflet/MapContainer';
import './App.css';
import 'leaflet/dist/leaflet.css';
import { TileLayer } from 'react-leaflet/TileLayer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import Info from './components/Info';
import Vehicles from './components/Vehicles';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      retry: false,
    },
  },
});
function App() {
  const mapCenter = import.meta.env.VITE_MAP_CENTER.split(',');
  const [showInfo, setShowInfo] = useState(false);
  return (
    <QueryClientProvider client={queryClient}>
      <header>
        <div>
          <h1>{import.meta.env.VITE_APP_TITLE ?? 'Livecommuter'}</h1>
        </div>
        <div>
          <nav>
            <ul>
              <li>
                <button className="button" onClick={() => setShowInfo(true)}>
                  Vad är detta?
                </button>
              </li>
              <li>
                <a
                  href="https://github.com/squeezeday/livecommuter"
                  target="_blank"
                  className="button"
                  aria-label="Github"
                >
                  <i className="fa-brands fa-github"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <MapContainer center={mapCenter} zoom={9} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Vehicles />
      </MapContainer>
      <dialog open={showInfo} className="dlg-info">
        <button className="button close" onClick={() => setShowInfo(false)}>
          <i className="fa fa-x"></i>
        </button>
        <Info />
      </dialog>
    </QueryClientProvider>
  );
}

export default App;
