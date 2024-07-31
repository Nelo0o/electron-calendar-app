import { ipcMain } from "electron";
import { getAllEvents } from "./readDB";
import { IEvent } from "src/interfaces/IEvents";
import { BrowserWindow } from "electron/main";
import { AjouteLigneCustom, ModifieLigne, SupprimeLigne } from "./updateDB";

ipcMain.handle('get-all-events', async () => {
    const events = await getAllEvents()
    if (Array.isArray(events)) return events
    return []
})

ipcMain.handle('ajout-event', async (evt, params: IEvent) => {
    const win = BrowserWindow.fromWebContents(evt.sender)
    await AjouteLigneCustom('evenements',"titre, description, date, time",""+params.title+", "+params.description+", "+params.start+", "+params.end+"")
    if (win) win.close()
    return "ajout ok"
})

ipcMain.handle('supprime-event', async (evt, id: number) => {
    const win = BrowserWindow.fromWebContents(evt.sender)
    await SupprimeLigne(id)
    if (win) win.close()
    return "supprime ok"
})

ipcMain.handle('modifie-event', async (evt, id: number) => {
    const win = BrowserWindow.fromWebContents(evt.sender)
    await ModifieLigne(id)
    if (win) win.close()
    return "modif ok"
})