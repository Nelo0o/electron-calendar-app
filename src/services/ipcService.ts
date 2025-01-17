import { BrowserWindow, ipcMain } from "electron";
import { getEventById, getEventsByMonth, getEventByDay } from "./readDB";
import { AjouteLigneCustom, ModifieLigne, SupprimeLigne } from "./updateDB";


ipcMain.handle('get-month-events', async (evt, month: number) => {
    return getEventsByMonth(month);
});

ipcMain.handle('get-day-events', async (evt, date: Date) => {
    return getEventByDay(date);
});

ipcMain.handle('ajout-event', async (evt, table: string, zones: string, contenu: string) => {
    const win = BrowserWindow.fromWebContents(evt.sender)
    await AjouteLigneCustom(table, zones, contenu)
    if (win) win.close()
    return "ajout ok"
})

ipcMain.handle('supprime-event', async (evt, id: number) => {
    const win = BrowserWindow.fromWebContents(evt.sender)
    await SupprimeLigne(id)
    if (win) win.close()
    return "supprime ok"
})

ipcMain.handle('modif-event', async (evt, id: string, values: string) => {
    const win = BrowserWindow.fromWebContents(evt.sender)
    await ModifieLigne(id, values)
    if (win) win.close()
    return "modif ok"
})

ipcMain.handle('get-event-id', async (evt, id: number) => {
    return getEventById(id);
});