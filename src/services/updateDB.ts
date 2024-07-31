import Database from 'better-sqlite3';


export function AjouteLigneCustom(laTable = 'evenements', lesChamps = "titre, description, date, time", lesValeurs = "('letitre', 'ladesc', '2024-07-30', '16:55:00')"): void  {

    const db = new Database('agenda.db');

    const rqAjout = "INSERT INTO "+laTable+" ("+lesChamps+") VALUES "+lesValeurs+"";

    const addRow = db.prepare(rqAjout);

    const logAdd =  addRow.run();
}

export function SupprimeLigne(id: number): void  {

    const db = new Database('agenda.db');

    const rqSuppr = "DELETE FROM evenements WHERE id="+id+"";

    const delRow = db.prepare(rqSuppr);

    const logAdd =  delRow.run();
}

export function ModifieLigne(id: number, values = "description = 'despcition', titre = 'titre'"): void  {

    const db = new Database('agenda.db');

    const rqUppdt = "UPDATE evenements SET "+values+" WHERE id ="+id+"";

    const uppdtRow = db.prepare(rqUppdt);

    const logAdd =  uppdtRow.run();
}
