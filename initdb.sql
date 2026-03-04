DROP TABLE IF EXISTS trips;

DROP TABLE IF EXISTS routes;

DROP TABLE IF EXISTS stop_times;

CREATE TABLE
  trips (
    route_id TEXT,
    service_id TEXT,
    trip_id TEXT PRIMARY KEY,
    trip_headsign TEXT,
    direction_id TEXT,
    shape_id TEXT
  ) STRICT;

CREATE TABLE
  routes (
    route_id TEXT PRIMARY KEY,
    agency_id TEXT,
    route_short_name TEXT,
    route_long_name TEXT,
    route_type TEXT,
    route_desc TEXT
  ) STRICT;

CREATE TABLE
  stop_times (
    trip_id TEXT,
    arrival_time TEXT,
    departure_time TEXT,
    stop_id TEXT,
    stop_sequence INTEGER,
    stop_headsign TEXT,
    pickup_type INTEGER,
    drop_off_type INTEGER,
    shape_dist_traveled TEXT,
    timepoint INTEGER,
    pickup_booking_rule_id TEXT NULL,
    drop_off_booking_rule_id TEXT NULL
  ) STRICT;

create index trip_id on stop_times (trip_id);