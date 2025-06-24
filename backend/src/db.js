import path from 'path';
import sqlite3 from 'sqlite3';

const dbPath = path.resolve('../database/farmacia.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erro ao conectar ao banco:', err.message);
  } else {
    console.log('Conectado ao banco farmacia.db');
  }
});

export default db;