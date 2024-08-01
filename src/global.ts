import { IEvent } from "./interfaces/IEvents"

export { }
declare global {
    interface Window {
        "electron": {
            getAllEvents: () => Promise<IEvent[]>
            ajoutEvent: (params: IEvent) => Promise<string>
            supprimeEvent: (id: number) => Promise<string>
            modifieEvent: (id: number) => Promise<string>
            openEventModal: (id: number) => void
            getEventById: (id: number) => Promise<IEvent[]>
            send: (id: number) => number
            receive: (id: number) => number
            getEventId: () => Promise<any>
        }
    }
}