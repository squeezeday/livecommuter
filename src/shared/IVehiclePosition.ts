export interface IVehiclePosition {
  vehicle_id?: string | null;
  trip_id?: string | null;
  route_id?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  bearing?: number | null;
  speed?: number | null;
  route_short_name?: string | null;
  trip_headsign?: string | null;
}
