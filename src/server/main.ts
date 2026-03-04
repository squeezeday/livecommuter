import express, { Router } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mapVehicles from './lib/mapVehicles';
import { resolve } from 'node:path';
import { IVehiclePosition } from '@/shared/IVehiclePosition';

dotenv.config();

const app = express();
if (process.env.NODE_ENV === 'development') {
  app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:5173'] }));
}
app.use(express.json());

let vehicles: IVehiclePosition[] = [];
const interval = setInterval(
  async () => {
    vehicles = await mapVehicles();
  },
  Number(process.env.VITE_REFRESH_INTERVAL ?? '5000'),
);

const router = Router();
router.get('/api/vehicles', async (req, res) => {
  res.json(vehicles);
});

app.use(router);
app.use(express.static(resolve(process.cwd(), 'dist/client')));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

function cleanup() {
  clearInterval(interval);

  server.on('close', function () {
    console.log('⬇ Shutting down server');
    process.exit();
  });
  server.close();
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
process.on('SIGQUIT', cleanup);
