import { IEvent } from "./interfaces/IEvents"

export { }
declare global {
    interface Window {
        "electron": {
            getAllEvents: () => Array<Object>
            ajoutEvent: (params: IEvent) => Promise<string>
            supprimeEvent: (id: number) => Promise<string>
            modifieEvent: (id: number) => Promise<string>
            openEventModal: (date: Date) => void
        }
    }
}