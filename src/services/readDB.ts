import Database from 'better-sqlite3';

const db = new Database('agenda.db');

export function LireDBCustom(lesCollones = "*", laTable = 'evenements'): object  {

    const rqLire = 'SELECT '+lesCollones+' FROM '+laTable;

    const lireLigne = db.prepare(rqLire);

    const lesLignes =  lireLigne.all();

    return lesLignes;
}


export function getAllEvents() {

    const rqLire = 'SELECT * FROM evenements';

    const lireLigne = db.prepare(rqLire);

    const lesLignes =  lireLigne.all();

    return lesLignes;
}

export function getEventsByMonth(leMois: Date) {

    const rqLire = "SELECT * FROM evenements WHERE strftime('%m', date) = '"+leMois+"'";

    const lireLigne = db.prepare(rqLire);

    const lesLignes =  lireLigne.all();

    return lesLignes;
}

export function getEventsById(id : number) {

    const rqLire = "SELECT * FROM evenements WHERE id ="+id+"";

    const lireLigne = db.prepare(rqLire);

    const lesLignes =  lireLigne.all();

    return lesLignes;
}