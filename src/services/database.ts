import Database from 'better-sqlite3';
import * as fs from 'fs';
import path from 'path';

const db = new Database('agenda.db');

/* Créer la table si elle n'existe pas */
export function CreateDb(): void {

    const rqCreate = `CREATE TABLE IF NOT EXISTS evenements 
    (id INTEGER PRIMARY KEY AUTOINCREMENT,
    titre TEXT NOT NULL,
    description TEXT NOT NULL,
    date TEXT,
    time TIME)`;

    const createTable = db.prepare(rqCreate);

    createTable.run();
}

export function CheckDB() {

    const rqCreate = `SELECT count(*) as count FROM sqlite_master WHERE type='table' AND name='evenements'`;

    const checkTable = db.prepare(rqCreate);

    const logCheck =  checkTable.all();

    return logCheck[0].count
}


export function importDB(): void {
    
    CreateDb()
    const filePath = path.join(__dirname, `../../assets/message.txt`);

    if (fs.existsSync(filePath)) {
        const migration = fs.readFileSync(filePath, 'utf8');
        db.exec(migration);
    }    
}