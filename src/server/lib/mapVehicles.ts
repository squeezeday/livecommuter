import db from './db';
import fs from 'node:fs';
import GtfsRealtimeBindings from 'gtfs-realtime-bindings';

import dotenv from 'dotenv';
import { fetchVehiclePositionsSweden } from './updateVehiclePositions';
import { IVehiclePosition } from '@/shared/IVehiclePosition';
dotenv.config();

interface Dict<T> {
  [key: string]: T;
}
interface Trip {
  route_short_name: string | null;
  trip_headsign: string | null;
}

const agencies = process.env.AGENCIES?.split(',') || [];
console.info('Using agencies: ', agencies);
if (agencies.length === 0)
  console.warn(
    'Not limiting the number of agencies will have an impact on memory/performance. Set the AGENCY env var.',
  );

const where =
  agencies.length > 0
    ? `WHERE routes.agency_id in (${agencies.map((_: any) => '?').join(',')})`
    : '';
const sql = `select trips.trip_id, routes.route_short_name, stop_times.stop_headsign as trip_headsign from trips
     join routes on trips.route_id = routes.route_id
     join stop_times on stop_times.trip_id = trips.trip_id and stop_sequence = 1
     ${where}`;

const query = db.prepare(sql);

const ret = query.all(...agencies);
if (ret.length === 0) {
  console.error('Found 0 trips. Missing static data? Run static.sh');
  process.exit(1);
}
const rows: Dict<Trip> = {};
ret
  .filter((x) => x.trip_id)
  .forEach((x) => (rows[x.trip_id!.toString()] = x as unknown as Trip));

console.debug(`Found ${ret.length} trips.`);

async function mapVehicles(): Promise<IVehiclePosition[]> {
  const buffer = await fetchVehiclePositionsSweden();

  console.time('mapVehicles');
  const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
    new Uint8Array(buffer),
  );
  console.debug(`${feed.entity.length} vehicles.`);
  const data = feed.entity
    .filter((x) => x.vehicle?.trip?.tripId && rows[x.vehicle?.trip?.tripId])
    .map((entity) => ({
      vehicle_id: entity.vehicle?.vehicle?.id,
      ...entity.vehicle?.position,
      ...((entity.vehicle?.trip?.tripId &&
        rows[entity.vehicle?.trip?.tripId]) ??
        {}),
    }));
  console.debug(`${data.length} vehicles in route.`);
  console.timeEnd('mapVehicles');
  return data;
}

export default mapVehicles;
