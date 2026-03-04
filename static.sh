#!/bin/bash

source .env

test -d ./data || mkdir data
test -f /usr/bin/unzip || { echo "unzip is required but not installed. Aborting." >&2; exit 1; }

test -f ./data/app.db && { rm ./data/app.db || { echo "Failed removing app.db" >&2; exit 1; } }
echo -n "Initializing sqlite db.."
sqlite3 ./data/app.db < ./initdb.sql && echo "OK" || { echo "Failed" >&2; exit 1; }

echo Downloading ${SAMTRAFIKEN_STATIC_FILE_URL}'?key='${SAMTRAFIKEN_STATIC_KEY}...

curl -o ./data/sweden.zip ${SAMTRAFIKEN_STATIC_FILE_URL}'?key='${SAMTRAFIKEN_STATIC_KEY} \
  --compressed \
  -H 'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8' \
  -H 'Accept-Language: en-US,en;q=0.5' \
  -H 'Accept-Encoding: gzip, deflate, br, zstd' \
  && echo Download complete || { echo >&2 "Failed"; exit 1; }

echo -n Extracting sweden.zip...
unzip -qo ./data/sweden.zip -d ./data/sweden && echo Done || \
{ echo >&2 "Failed"; exit 1; }

echo Importing data..
sqlite3 -cmd '.mode csv' ./data/app.db -cmd '.import ./data/sweden/trips.txt trips' \
-cmd '.import ./data/sweden/routes.txt routes' \
-cmd '.import --skip 1 ./data/sweden/stop_times.txt stop_times' \
'select count(*) from trips; select count(*) from routes; select count(*) from stop_times;' \
&& echo Done || \
{ echo >&2 "Failed"; exit 1; }
