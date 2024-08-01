import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('modale', {
    getEventById: (id: number) => ipcRenderer.invoke('get-event-id', id),
    
});