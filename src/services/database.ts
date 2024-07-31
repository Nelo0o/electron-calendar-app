import Database from 'better-sqlite3';
import * as fs from 'fs';
import path from 'path';

/* Créer la table si elle n'existe pas */
export function CreateDb(): void {
    
    const db = new Database('agenda.db');

    const rqCreate = `CREATE TABLE IF NOT EXISTS evenements 
    (id INTEGER PRIMARY KEY AUTOINCREMENT,
    titre TEXT NOT NULL,
    description TEXT NOT NULL,
    date DATE,
    time TIME)`;

    const createTable = db.prepare(rqCreate);

    const logCreate =  createTable.run();
}


export function importDB(): void {
    
    CreateDb()
    const db = new Database('agenda.db');
    const filePath = path.join(__dirname, `../../assets/message.txt`);

    if (fs.existsSync(filePath)) {
        const migration = fs.readFileSync(filePath, 'utf8');
        db.exec(migration);
    }    
}