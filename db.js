import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const dbPath = process.env.DB_PATH || './backend/models/app.db';

export const db = await open({
  filename: dbPath,
  driver: sqlite3.Database
});

export async function initSchema() {
  await db.exec(`
    PRAGMA foreign_keys = ON;
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'admin',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS clients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT,
      email TEXT,
      address TEXT,
      tax_id TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS vehicles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      plate TEXT UNIQUE NOT NULL,
      model TEXT,
      year INTEGER,
      capacity_kg INTEGER,
      fuel_type TEXT,
      status TEXT DEFAULT 'active',
      last_service_date TEXT,
      insurance_expiry TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS shipments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      reference TEXT UNIQUE,
      client_id INTEGER NOT NULL,
      origin TEXT,
      destination TEXT,
      cargo_description TEXT,
      weight_kg REAL,
      price DECIMAL(10,2),
      status TEXT DEFAULT 'scheduled',
      pickup_date TEXT,
      delivery_date TEXT,
      vehicle_id INTEGER,
      driver_name TEXT,
      FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
      FOREIGN KEY (vehicle_id) REFERENCES vehicles(id) ON DELETE SET NULL
    );
  `);

  // seed default admin if empty
  const user = await db.get('SELECT * FROM users LIMIT 1');
  if (!user) {
    const bcrypt = (await import('bcryptjs')).default;
    const hash = bcrypt.hashSync('admin123', 10);
    await db.run('INSERT INTO users (name, email, password_hash, role) VALUES (?,?,?,?)',
      ['Admin', 'admin@company.com', hash, 'owner']);
    console.log('Seeded default user: admin@company.com / admin123');
  }
}
