// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron');
const url = require('url');
const path = require('path');
const args = process.argv.slice(1);
const serve = args.some(val => val === "--serve" || val === "-serve");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 640,
    minWidth:360,
    minHeight: 640,
    maxHeight: 640,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
    },
    frame: false,
    titleBarStyle: 'hidden'
  })

  // and load the index.html of the app.
  if(serve) {
    require('electron-reload')(__dirname);
    mainWindow.loadURL('http://localhost:5000/#/index');
  } else {
    mainWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      hash: 'index',
      protocol: 'file:',
      slashes: true
    }));
  }

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.