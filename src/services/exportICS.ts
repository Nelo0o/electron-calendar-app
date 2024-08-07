import * as calendar from 'node-ical'
import { IEvent } from '../interfaces/IEvents';
import fs from 'node:fs'

export function WriteICS(lesEvents: Array<IEvent>, filePath: string) : void {

    let fileContent = `BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN\n`;

    for (const event of Object.values(lesEvents)) {

      const laDate = new Date(event.date_deb);
      const laDateFin = new Date(event.date_fin);

        fileContent += `BEGIN:VEVENT
SUMMARY:`+event.titre+`
DTSTART:`+laDate.getFullYear().toString() +
((laDate.getMonth() + 1)<10? "0" + (laDate.getMonth() + 1).toString():(laDate.getMonth() + 1).toString()) + 
((laDate.getDate() + 1)<10? "0" + laDate.getDate().toString():laDate.getDate().toString())+"T"+(laDate.getHours() <10? "0"+laDate.getHours(): laDate.getHours()).toString() + (laDate.getMinutes() ==0? "0"+laDate.getMinutes():laDate.getMinutes()).toString() + `00`+`
DTEND:`+laDateFin.getFullYear().toString() +
((laDateFin.getMonth() + 1)<10? "0" + (laDateFin.getMonth() + 1).toString():(laDateFin.getMonth() + 1).toString()) + 
((laDateFin.getDate() + 1)<10? "0" + laDateFin.getDate().toString():laDateFin.getDate().toString())+"T"+(laDateFin.getHours() <10? "0"+laDateFin.getHours(): laDateFin.getHours()).toString() + (laDateFin.getMinutes() ==0? "0"+laDateFin.getMinutes():laDateFin.getMinutes()).toString() + `00`+`
LOCATION:`+event.location+`
DESCRIPTION:`+event.description+`
END:VEVENT\n`
    }

    fileContent += "END:VCALENDAR";

    try {
        fs.writeFileSync(filePath+".ics", fileContent);
      } catch (err) {
        console.error(err);
      }
    
    const directEvents = calendar.sync.parseICS(fileContent);

}