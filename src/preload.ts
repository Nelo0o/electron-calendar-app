// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";
import { IEvent } from "./interfaces/IEvents";


contextBridge.exposeInMainWorld('electron', {
    getAllEvents: () => ipcRenderer.invoke('get-all-events'),
    getEventsByMonth: (month: number) => ipcRenderer.invoke('get-month-events', month),
    getEventById: (id: number) => ipcRenderer.invoke('get-event-id', id),
    ajoutEvent: (params: IEvent) => ipcRenderer.invoke('ajout-event', params),
    supprimeEvent: (id: string) => ipcRenderer.invoke('supprime-event', id),
    modifieEvent: (id: string, values: string) => ipcRenderer.invoke('modif-event', id, values),
    openEventModal: (id: number) => ipcRenderer.send('open-event-modal', id),
    openICSModal: (id: number) => ipcRenderer.send('open-ics-modal', id),
    getEventId: () =>  {
        return new Promise((resolve: any, reject: any) => {
            ipcRenderer.on('send-id', (evt: any, id: number) => {
                resolve(id)
            })
        })
        
    }
    
})