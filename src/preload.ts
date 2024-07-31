// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";
import { IEvent } from "./interfaces/IEvents";

contextBridge.exposeInMainWorld('electron', {
    getAllEvents: () => ipcRenderer.invoke('get-all-events'),
    ajoutEvent: (params: IEvent) => ipcRenderer.invoke('ajout-event', params),
    supprimeEvent: (id: number) => ipcRenderer.invoke('supprime-event', id),
    modifieEvent: (id: number) => ipcRenderer.invoke('modif-event', id)
    
})