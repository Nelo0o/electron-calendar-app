import * as calendar from 'node-ical'
import { ICSEvent } from '../interfaces/ICSEvent';
import { IEvent } from '../interfaces/IEvents';
import path from 'path';

export function readICS(chemin: Array<string>) : Array<IEvent> {


    const events: Array<ICSEvent> = calendar.sync.parseFile(chemin[0]);

    console.log(events);
    const lesValues: Array<IEvent> = [];

    for (const event of Object.values(events)) {

        const dateFR = new Intl.DateTimeFormat("fr-FR", {
            dateStyle: "short",
          });

        if (event.summary != undefined) {

            const objetICS = {
                titre: event.summary,
                description:  event.description,
                date: dateFR.format(event.start),
                time: new Date(event.start).toLocaleTimeString("fr-FR")
            }
            
            lesValues.push(objetICS);
        }
    }


    
    if (lesValues.length > 0) {
        return(lesValues)
    }
    

    /*if (lesValues != "") {
        AjouteLigneCustom("evenements", "titre, description, date, time", lesValues)
    }*/
}