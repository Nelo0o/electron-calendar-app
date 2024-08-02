import { IEvent } from "./interfaces/IEvents"

export { }
declare global {
    interface Window {
        "electron": {
            getAllEvents: () => Promise<IEvent[]>
            getEventsByMonth: (month: number) => Promise<IEvent[]>
            ajoutEvent: (params: IEvent) => Promise<string>
            supprimeEvent: (id: string) => Promise<string>
            modifieEvent: (id: string, values: string) => Promise<string>
            openEventModal: (id: number) => void
            getEventById: (id: number) => Promise<IEvent[]>
            send: (id: number) => number
            receive: (id: number) => number
            getEventId: () => Promise<any>
        }
    }
}