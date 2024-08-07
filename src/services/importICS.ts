import * as calendar from 'node-ical'
import { ICSEvenement } from '../interfaces/ICSEvent';
import { IEvent } from '../interfaces/IEvents';

export function readICS(chemin: Array<string>) : Array<IEvent> {


    const events: Array<ICSEvenement> = calendar.sync.parseFile(chemin[0]);

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
                date_deb: dateFR.format(event.start),
                date_fin: dateFR.format(event.end),
                location: event.location
            }

            
            lesValues.push(objetICS);
        }
    }


    
    if (lesValues.length > 0) {
        return(lesValues)
    }
}