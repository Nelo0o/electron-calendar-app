import * as calendar from 'node-ical'
import path from 'path';
import { AjouteLigneCustom } from './updateDB';

export function readICS() : void {

    const filePath = path.join(__dirname, `../../assets/data.ics`);


    const events = calendar.sync.parseFile(filePath);


    let lesValues = "";

    for (const event of Object.values(events)) {
        /*console.log(
            'Summary: ' + event.summary +
            '\nDescription: ' + event.description +
            '\nStart Date: ' + event.start +
            '\n' 
        );*/

        const dateFR = new Intl.DateTimeFormat("fr-FR", {
            dateStyle: "short",
          });

        if (event.summary != undefined) {
            let titre = event.summary;
            let description = event.description;
            let date = dateFR.format(event.start);
            let time = new Date(event.start).toLocaleTimeString("fr-FR")

            if (lesValues == "") {
                lesValues += "('"+titre+"', '"+description+"', '"+date+"', '"+time+"')"
            } else {
                lesValues += ", ('"+titre+"', '"+description+"', '"+date+"', '"+time+"')"
            }
        }
    };

    if (lesValues != "") {
        AjouteLigneCustom("evenements", "titre, description, date, time", lesValues)
    }
}