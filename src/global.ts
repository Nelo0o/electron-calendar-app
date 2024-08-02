import { IEvent } from "./interfaces/IEvents"

export { }
declare global {
    interface Window {
        "electron": {
            getEventsByMonth: (month: number) => Promise<IEvent[]>
            getEventsByDay: (day: Date) => Promise<IEvent[]>
            ajoutEvent: (params: IEvent) => Promise<string>
            supprimeEvent: (id: string) => Promise<string>
            modifieEvent: (id: string, values: string) => Promise<string>
            openEventModal: (id: number) => void
            openICSModal: (id: number) => void
            getEventById: (id: number) => Promise<IEvent[]>
            getEventId: () => Promise<any>
        }
    }
}