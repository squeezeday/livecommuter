import fetch from 'node-fetch';

export const fetchVehiclePositionsSweden = async () => {
  console.time('fetchVehiclePositions');
  const response = await fetch(
    `${process.env.SAMTRAFIKEN_API_URL}?key=${process.env.SAMTRAFIKEN_API_KEY}`,
  );
  console.timeEnd('fetchVehiclePositions');
  if (!response.ok) {
    const error = new Error(
      `${response.url}: ${response.status} ${response.statusText}`,
    );
    throw error;
  }
  const buffer = await response.arrayBuffer();
  return buffer;
};
