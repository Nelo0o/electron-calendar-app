import * as calendar from 'node-ical'
import { ICSEvent } from '../interfaces/ICSEvent';
import path from 'path';

export function readICS() : string | void {

    const filePath = path.join(__dirname, `../../assets/data.ics`);


    const events: Array<ICSEvent> = calendar.sync.parseFile(filePath);


    let lesValues = "";

    for (const event of Object.values(events)) {

        const dateFR = new Intl.DateTimeFormat("fr-FR", {
            dateStyle: "short",
          });

        if (event.summary != undefined) {
            const titre = event.summary;
            const description = event.description;
            const date = dateFR.format(event.start);
            const time = new Date(event.start).toLocaleTimeString("fr-FR")

            if (lesValues == "") {
                lesValues += "('"+titre+"', '"+description+"', '"+date+"', '"+time+"')"
            } else {
                lesValues += ", ('"+titre+"', '"+description+"', '"+date+"', '"+time+"')"
            }
        }
    }
    if (lesValues != "") {
        return(lesValues)
    }
    

    /*if (lesValues != "") {
        AjouteLigneCustom("evenements", "titre, description, date, time", lesValues)
    }*/
}