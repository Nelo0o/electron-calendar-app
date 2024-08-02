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

    try {
        return (lireLigne.all());
    }catch(e) {
        return("ERROR")
    }
}

export function getEventsByMonth(leMois: number) {

    let lemoisAp = 0;
    let lemoisAv = 0;
    
    if (leMois == 1) {
        lemoisAv = 12;
    } else {
        lemoisAv = leMois;
    }

    if (leMois == 12) {
        lemoisAp = 1;
    } else {
        lemoisAp = leMois +2;
    }

    leMois++;

    let lemoisApOK = lemoisAp.toString();
    let lemoisAvOK = lemoisAv.toString();
    let lemoisOK = leMois.toString();

    if (lemoisApOK != "10" && lemoisApOK != "11" && lemoisApOK != "12") {
        lemoisApOK = "0"+lemoisApOK;
    }
    if (lemoisAvOK != "10" && lemoisAvOK != "11" && lemoisAvOK != "12") {
        lemoisAvOK = "0"+lemoisAvOK;
    }
    if (lemoisOK != "10" && lemoisOK != "11" && lemoisOK != "12") {
        lemoisOK = "0"+lemoisOK;
    }



    const rqLire = "SELECT * FROM evenements WHERE strftime('%m', date) IN ('"+lemoisAvOK+"', '"+lemoisOK+"', '"+lemoisApOK+"')";

    const lireLigne = db.prepare(rqLire);

    try {
        return (lireLigne.all());
    }catch(e) {
        return("ERROR")
    }
}

export function getEventById(id : number) {

    const rqLire = "SELECT * FROM evenements WHERE id ="+id+"";
    const lireLigne = db.prepare(rqLire);

    const lesLignes =  lireLigne.all();

    return lesLignes;
}

export function getEventByDay(date: Date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const rqLire = `SELECT * FROM evenements WHERE strftime('%d', date) = '${day < 10 ? '0' + day : day}' AND strftime('%m', date) = '${month < 10 ? '0' + month : month}' AND strftime('%Y', date) = '${year}'`;
    const lireLigne = db.prepare(rqLire);

    try {
        return lireLigne.all();
    } catch (e) {
        console.error("Erreur lors de la récupération des événements :", e);
        return [];
    }
}