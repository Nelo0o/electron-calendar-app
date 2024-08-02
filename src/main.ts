import { app, BrowserWindow, ipcMain, ipcRenderer } from 'electron';
import path from 'path';
import {importDB, CheckDB} from "./services/database";
import './services/ipcService'


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

if (CheckDB() == 0) {
  importDB(); 
  console.log("Importation de la DB");
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: 'assets/icon-logo.ico',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

ipcMain.on('open-event-modal', (event, arg) => {
  const eventModal = new BrowserWindow({
    width: 900,
    height: 600,
    icon: 'assets/icon-logo.ico',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    
  });

  eventModal.webContents.openDevTools();

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    eventModal.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}/src/pages/event/event.html`);
  } else {
    eventModal.loadFile(path.join(__dirname, `../../src/pages/event/event.html`));
  }

  if (parseInt(arg) != 0) {
    eventModal.webContents.once('dom-ready', () => eventModal.webContents.send('send-id', arg))
  }
  
});

ipcMain.on('open-ics-modal', (event, arg) => {
  const eventModal = new BrowserWindow({
    width: 900,
    height: 600,
    icon: 'assets/icon-logo.ico',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    
  });

  eventModal.webContents.openDevTools();

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    eventModal.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}/src/pages/importICS/ics.html`);
  } else {
    eventModal.loadFile(path.join(__dirname, `../../src/pages/importICS/ics.html`));
  }

  if (parseInt(arg) != 0) {
    eventModal.webContents.once('dom-ready', () => eventModal.webContents.send('send-id', arg))
  }
  
});

// This method will be called when Electron has finished
// initialization and is ready tcreateTableo create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.




