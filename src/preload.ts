// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";
import { IEvent } from "./interfaces/IEvents";


contextBridge.exposeInMainWorld('electron', {
    getEventsByMonth: (month: number) => ipcRenderer.invoke('get-month-events', month),
    getEventsByDay: (day: Date) => ipcRenderer.invoke('get-day-events', day),
    getEventById: (id: number) => ipcRenderer.invoke('get-event-id', id),
    ajoutEvent: (table: string, zones: string, contenu: string) => ipcRenderer.invoke('ajout-event', table, zones, contenu),
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
    },
    onRefreshData: (callback: () => void) => ipcRenderer.on('refresh-data', callback),
    getEventFromICS: () =>  {
        return new Promise((resolve: any, reject: any) => {
            ipcRenderer.on('send-event', (evt: any, lesEvents: Array<IEvent>) => {
                resolve(lesEvents)
            })
        })
    },
    showConfirmationDialog: (message: string) => ipcRenderer.invoke('show-confirmation-dialog', message)
})