# Live commuter

Heavily inspired by https://sl-map.gunnar.se/ this web app shows real time commuting traffic on a map for any available operator in Sweden.

## How does it work?

A number of operators provide GTFS data via Trafiklab.

Frontend: React with Vite

Backend: Express js server, serves /api/vehicles and the compiled frontend as static html.

Docker: builds and serves backend. Exposes port 3000.

static.sh: Every morning, a static dataset must be downloaded and imported to a sqlite database in ./data/.

At a given interval (max every 2 seconds), real time traffic data is downloaded and mapped to route information in the Sqlite database.

## Requirements

- Docker
- Sqlite
- Bash
- unzip

## Getting started (with Docker)

1. Sign up at https://developer.trafiklab.se/login
1. Acquire API keys both for real time data and static data.
1. Configure .env (see .env.sample) and .env.production.local
1. Set up static data in data/
   1. Run ./static.sh
1. docker compose up
1. App reachable at http://localhost:3000 or PORT defined in .env

### Static data

The static.sh script will download sweden.zip, extract it, and initialize a Sqlite database based on it. Note that this data is NOT managed within the Docker container but needed for the app to map vehicles to routes.

Somehow this data needs to be updated every morning around 6. Possibly via some cron job.

## Data sets

https://www.trafiklab.se/api/gtfs-datasets/gtfs-sweden/

Currently available service providers for real time data:

| Operator                 | Technical id |
| ------------------------ | ------------ |
| SL                       | sl           |
| UL                       | ul           |
| Sörmlandstrafiken        | sormland     |
| Östgötatrafiken          | otraf        |
| JLT                      | jlt          |
| Kronoberg                | krono        |
| KLT                      | klt          |
| Gotland                  | gotland      |
| Blekingetrafiken         | blekinge     |
| Skånetrafiken            | skane        |
| Hallandstrafiken         | halland      |
| Västtrafik               | vt           |
| Värmlandstrafik          | varm         |
| Örebro                   | orebro       |
| Västmanland              | vastmanland  |
| Dalatrafik               | dt           |
| X-trafik                 | xt           |
| Din Tur - Västernorrland | dintur       |

### GTFS

https://gtfs.org/documentation/realtime/reference/

## License

MIT

Copyleft 2026 Michael Svanström
