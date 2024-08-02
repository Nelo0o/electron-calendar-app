import { IEvent } from "./interfaces/IEvents"

export { }
declare global {
    interface Window {
        "electron": {
            getEventsByMonth: (month: number) => Promise<IEvent[]>
            getEventsByDay: (day: Date) => Promise<IEvent[]>
            ajoutEvent: (table: string, zones: string, contenu: string) => void
            supprimeEvent: (id: string) => Promise<string>
            modifieEvent: (id: string, values: string) => Promise<string>
            openEventModal: (id: number) => void
            openICSModal: (id: number) => void
            getEventById: (id: number) => Promise<IEvent[]>
            getEventId: () => Promise<any>
            onRefreshData: (callback: () => void) => void
            getEventFromICS: () => Promise<any>
        }
    }
}