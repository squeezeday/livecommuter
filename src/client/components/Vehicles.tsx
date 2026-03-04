import { useQuery } from '@tanstack/react-query';
import { Marker, Popup, Tooltip } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { IVehiclePosition } from '@/shared/IVehiclePosition';

const icon = (entity: IVehiclePosition) =>
  divIcon({
    className: `vehicle ${import.meta.env.VITE_OPERATOR} route-${entity.route_short_name}`,
    html: `<span>${entity.route_short_name ?? ''}</span>`,
    iconSize: [24, 18],
    iconAnchor: [12, 12],
  });

export default function Vehicles() {
  const { data: entities } = useQuery<IVehiclePosition[]>({
    queryKey: ['vehiclePositions'],
    refetchInterval: Number(import.meta.env.VITE_REFRESH_INTERVAL ?? '5000'),
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL ?? ''}/api/vehicles`,
      );
      const data: IVehiclePosition[] = await response.json();
      return data;
    },
  });

  return (
    <>
      {entities?.map((entity) => (
        <Marker
          key={`marker-${entity.vehicle_id}`}
          position={[entity.latitude || 0, entity.longitude || 0]}
          icon={icon(entity)}
          riseOnHover
        >
          <Popup className={`popup-route-${entity.route_short_name}`}>
            <h3>
              {entity.route_short_name} {entity.trip_headsign}
            </h3>
            <p>{Math.round(entity.speed || 0)} km/h</p>
          </Popup>
        </Marker>
      ))}
    </>
  );
}
