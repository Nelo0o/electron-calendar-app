import { IEvent } from "./interfaces/IEvents"

export { }
declare global {
    interface Window {
        "electron": {
            getAllEvents: () => Promise<IEvent[]>
            ajoutEvent: (params: IEvent) => Promise<string>
            supprimeEvent: (id: number) => Promise<string>
            modifieEvent: (id: number) => Promise<string>
        }
    }
}