import Database from 'better-sqlite3';


export function AjouteLigneCustom(laTable = 'event', lesChamps = "titre, description, date, time", lesValeurs = "('letitre', 'ladesc', '2024-07-30', '16:55:00')"): void  {

    const db = new Database('agenda.db');

    const rqAjout = "INSERT INTO "+laTable+" ("+lesChamps+") VALUES "+lesValeurs+"";

    console.log(rqAjout);
    
    const addRow = db.prepare(rqAjout);

    addRow.run();
}

export function SupprimeLigne(id: number): void  {

    if (typeof id != "number") {
       id = parseInt(id)
    }

    const db = new Database('agenda.db');

    const rqSuppr = "DELETE FROM event WHERE id="+id+"";

    const delRow = db.prepare(rqSuppr);

    delRow.run();
}

export function ModifieLigne(id: string, values = "description = 'despcition', titre = 'titre'"): void  {

    const db = new Database('agenda.db');

    const rqUppdt = "UPDATE event SET "+values+" WHERE id ="+id+"";

    const uppdtRow = db.prepare(rqUppdt);

    uppdtRow.run();
}
