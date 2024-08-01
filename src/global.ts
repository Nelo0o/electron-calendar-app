import { IEvent } from "./interfaces/IEvents"

export { }
declare global {
    interface Window {
        "electron": {
            getAllEvents: () => Array<IEvent>
            getEventsById: (id: number) => IEvent
            ajoutEvent: (params: IEvent) => Promise<string>
            supprimeEvent: (id: number) => Promise<string>
            modifieEvent: (id: number) => Promise<string>
            openEventModal: (date: Date) => void
        }
        "modale": {
            getEventById: (id: number) => IEvent
        }
    }
}