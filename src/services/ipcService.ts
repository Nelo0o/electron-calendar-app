import { ipcMain } from "electron";
import { getAllEvents } from "./databse";

ipcMain.handle('get-all-events', async () => {
    const events = await getAllEvents()
    if (Array.isArray(events)) return events
    return []
})