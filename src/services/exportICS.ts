import * as calendar from 'node-ical'
import { IEvent } from '../interfaces/IEvents';
import fs from 'node:fs'

export function WriteICS(lesEvents: Array<IEvent>, filePath: string) : void {

    let fileContent = `BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN\n`;

    for (const event of Object.values(lesEvents)) {

        fileContent += `BEGIN:VEVENT
SUMMARY: `+event.titre+`
DTSTART;TZID=America/New_York:20130802T103400
DTEND;TZID=America/New_York:20130802T110400
LOCATION:1000 Broadway Ave Brooklyn
DESCRIPTION: `+event.description+`
STATUS:CONFIRMED
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