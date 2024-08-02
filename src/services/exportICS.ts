import * as calendar from 'node-ical'
import { IEvent } from '../interfaces/IEvents';
import path from 'path';

export function WriteICS(lesEvents: Array<IEvent>, filePath: string) : void {

    const events = calendar.sync.parseFile(filePath);

    let fileContent = `BEGIN:VCALENDAR
                        VERSION:2.0
                        CALSCALE:GREGORIAN`;

    for (const event of Object.values(lesEvents)) {

        fileContent += `BEGIN:VEVENT
                        SUMMARY: `+event.titre+`
                        DTSTART;TZID=America/New_York:20130802T103400
                        DTEND;TZID=America/New_York:20130802T110400
                        LOCATION:1000 Broadway Ave Brooklyn
                        DESCRIPTION: `+event.description+`
                        STATUS:CONFIRMED
                        UID:7014-1567468800-1567555199@peterbraden@peterbraden.co.uk
                        END:VEVENT`
    }

    fileContent += "END:VCALENDAR";

    console.log(fileContent);
    
    const directEvents = calendar.sync.parseICS(fileContent);

}