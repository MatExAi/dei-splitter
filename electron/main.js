const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    },
    icon: path.join(__dirname, '../build/icon.png')
  });

  // Load the built web app
  // Use different path based on environment
  if (app.isPackaged) {
    // In production, files are in resources/app/dist/web
    const startUrl = path.join(__dirname, '../dist/web/index.html');
    mainWindow.loadFile(startUrl);
  } else {
    // In development
    const startUrl = path.join(__dirname, '../dist/web/index.html');
    mainWindow.loadFile(startUrl);
  }

  // Open DevTools in development
  // mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
