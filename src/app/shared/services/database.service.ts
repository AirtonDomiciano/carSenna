import { Injectable } from '@angular/core';
import * as sqlite3 from 'sqlite3';
import { app } from 'electron';
import * as path from 'path';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private db: sqlite3.Database;

  constructor() {
    this.db = new sqlite3.Database(':memory:'); // Inicialize com um banco de dados em memória
    this.initDatabase();
  }

  private initDatabase() {
    const dbPath = path.join(app.getPath('userData'), 'database.sqlite');
    this.db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Error opening database', err);
      } else {
        console.log('Database opened');
        this.createTable();
      }
    });
  }

  // ... resto do código permanece o mesmo
}
