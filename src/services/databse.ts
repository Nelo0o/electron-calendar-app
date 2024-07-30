import Database from 'better-sqlite3';
import * as fs from 'fs';
import path from 'path';

/* Créer la table si elle n'existe pas */
export function CreateDb(): void {
    
    const db = new Database('agenda.db', { verbose: console.log });

    const rqCreate = `CREATE TABLE IF NOT EXISTS evenements 
    (id INTEGER PRIMARY KEY AUTOINCREMENT,
    titre TEXT NOT NULL,
    description TEXT NOT NULL,
    date DATE,
    time TIME)`;

    const createTable = db.prepare(rqCreate);

    const logCreate =  createTable.run();
    console.log(logCreate);
}


export function AjouteLigneCustom(laTable = 'evenements', lesChamps = "titre, description, date, time", lesValeurs = "'letitre', 'ladesc', '2024-07-30', '16:55:00'"): void  {

    const db = new Database('agenda.db');

    const rqAjout = 'INSERT INTO '+laTable+' ('+lesChamps+') VALUES ('+lesValeurs+')';

    const addRow = db.prepare(rqAjout);

    const logAdd =  addRow.run();
}


export function LireDBCustom(lesCollones = "*", laTable = 'evenements'): object  {

    const db = new Database('agenda.db');

    const rqLire = 'SELECT '+lesCollones+' FROM '+laTable;

    const lireLigne = db.prepare(rqLire);

    const lesLignes =  lireLigne.all();

    return lesLignes;
}


export function getAllEvents(): object {

    const db = new Database('agenda.db');

    const rqLire = 'SELECT * FROM evenements';

    const lireLigne = db.prepare(rqLire);

    const lesLignes =  lireLigne.all();

    return lesLignes;
}

export function getEventsByMonth(leMois ="06"): object {

    const db = new Database('agenda.db');

    const rqLire = "SELECT * FROM evenements WHERE strftime('%m', date) = '"+leMois+"'";

    const lireLigne = db.prepare(rqLire);

    const lesLignes =  lireLigne.all();

    return lesLignes;
}

export function importDB(): void {
    const db = new Database('agenda.db');

    const migration = fs.readFileSync(path.join(__dirname, `./message.txt`), 'utf8');
    
    db.exec(migration);
}
