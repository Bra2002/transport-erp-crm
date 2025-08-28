import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db, initSchema } from './models/db.js';
import authRouter from './routes/auth.js';
import clientsRouter from './routes/clients.js';
import vehiclesRouter from './routes/vehicles.js';
import shipmentsRouter from './routes/shipments.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));

// Initialize DB schema
await initSchema();

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.use('/api/auth', authRouter);
app.use('/api/clients', clientsRouter);
app.use('/api/vehicles', vehiclesRouter);
app.use('/api/shipments', shipmentsRouter);

// static: serve frontend (for quick demo)
app.use('/', express.static(new URL('../frontend', import.meta.url).pathname));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
