import Database from 'better-sqlite3';

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

export function getEventsById(id : number): object {

    const db = new Database('agenda.db');

    const rqLire = "SELECT * FROM evenements WHERE id ="+id+"";

    const lireLigne = db.prepare(rqLire);

    const lesLignes =  lireLigne.all();

    return lesLignes;
}