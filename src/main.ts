import { app, BrowserWindow, ipcMain, Menu, shell, dialog } from 'electron';
import path from 'path';
import {importDB, CheckDB} from "./services/database";
import { getAllEvents } from './services/readDB';
import './services/ipcService'
import { WriteICS } from './services/exportICS';
import { readICS } from './services/importICS';
import { IEvent } from './interfaces/IEvents';


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

if (CheckDB() == 0) {
  importDB(); 
  console.log("Importation de la DB");
}

let mainWindow: BrowserWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: 'assets/icon-logo.ico',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  mainWindow.webContents.openDevTools();

  const menuTemplate: Electron.MenuItemConstructorOptions[] = [
    {
      label: 'Evénements',
      submenu: [
        {
          label: 'Ajouter un event',
          click: () => {
            OpenModale(0);
          },
        },
      ],
    },
    {
        label: 'Import/Export',
        submenu: [
            {
                label: 'Importer un fichier ICS',
                click: (e) => {
                    console.log('Import ICS');
                    dialog.showOpenDialog(e.sender, {
                      title: "Selectionnez votre import ICS",
                      filters: [{ name: "fichier ICS", extensions: ["ics"] }],
                      properties: ["openFile"]
                    }).then(res => {
                        const lesEvents = readICS(res.filePaths);
                        openModaleImport(lesEvents);
                    })
                },
            },
            {
                label: 'Exporter en fichier ICS',
                click: (e) => {
                    dialog.showSaveDialog(e.sender, {
                      title: "Sauvegarder l'export ICS",
                      filters: [{ name: "fichier ICS", extensions: ["ics"] }],
                    }).then(res => {
                      const lesEvents = getAllEvents();
                      WriteICS(lesEvents, res.filePath)
                      console.log(res.filePath);
                    })
                },
            },
        ],
    },
    {
      label: 'A propos',
      submenu: [
        {
          label: 'Repo Github',
          click: () => {
            shell.openExternal('https://github.com/Nelo0o/electron-calendar-app');
          },
        },
        {
          label: 'Patreon',
          click: () => {
            shell.openExternal('https://www.patreon.com/fr-FR');
          },
        },
      ],
    },
    {
      label: 'Aide',
      click: () => {
        shell.openExternal('https://perdu.com');
      },
    },
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
};

ipcMain.on('open-event-modal', (event, arg) => {
  OpenModale(arg);
});

ipcMain.handle('show-confirmation-dialog', async (event, message) => {
  const result = await dialog.showMessageBox(mainWindow, {
    type: 'question',
    buttons: ['Oui', 'Non'],
    defaultId: 1,
    title: 'Confirmation',
    message: message
  });
  return result.response === 0;
});

function OpenModale (arg) {
  const eventModal = new BrowserWindow({
    width: 900,
    height: 600,
    parent: mainWindow,
    modal: true,
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
    eventModal.webContents.once('dom-ready', () => eventModal.webContents.send('send-id', arg));
  }

  eventModal.on('closed', () => {
    mainWindow.webContents.send('refresh-data');
  });
}

function openModaleImport (lesEvents: Array<IEvent> ) {
  const eventModalImport = new BrowserWindow({
    width: 900,
    height: 600,
    icon: 'assets/icon-logo.ico',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
    
  });

  eventModalImport.webContents.openDevTools();

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    eventModalImport.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}/src/pages/importICS/ics.html`);
  } else {
    eventModalImport.loadFile(path.join(__dirname, `../../src/pages/importICS/ics.html`));
  }

    eventModalImport.webContents.once('dom-ready', () => eventModalImport.webContents.send('send-event', lesEvents))
}


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
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});