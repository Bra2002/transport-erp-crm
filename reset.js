import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();
const dbPath = process.env.DB_PATH || './backend/models/app.db';
if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);
console.log('Database removed. It will be recreated on next run.');
