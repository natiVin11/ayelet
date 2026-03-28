import sqlite3 from 'better-sqlite3';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'leads.db');
const db = new sqlite3(dbPath);

// יצירת טבלה אם לא קיימת
db.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    phone TEXT,
    email TEXT,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export default db;