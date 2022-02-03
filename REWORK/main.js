const { app, BrowserWindow, ipcMain, powerSaveBlocker, session, systemPreferences } = require('electron');
const windowStateKeeper = require('electron-window-state');
const { nativeTheme } = require('electron/main');
const path = require('path');
const ipc = ipcMain

const createWindow = () => {
  // Create the browser window.
  const mainWindowState = windowStateKeeper({
    defaultWidth: 1200,
    defaultHeight: 800
  })

  const mainWindow = new BrowserWindow({
      x: mainWindowState.x,
      y: mainWindowState.y,
      width: mainWindowState.width,
      height: mainWindowState.height,      
      titleBarStyle: 'customButtonsOnHover',
      minWidth: 1185,
      minHeight: 700,
      frame: false,
      show: false,
      transparent: true,
      autoHideMenuBar: true,
      icon: __dirname + '/src/img/IAC-icon.ico',
      title: 'Instagram Automated Commenting',
      backgroundColor: '#202020',
      webPreferences: {
        // sandbox: true,                         // -!- Problems with require -!- //
        nodeIntegration: true,                    // -!- Can this be disabled in the finale release? -!- //
        contextIsolation: false                   // -!- Same for here? -!- //
      }
  })

  // load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  
  let color = systemPreferences.getAccentColor()

  mainWindow.on('ready-to-show', () => {
    mainWindowState.manage(mainWindow)
    mainWindow.show()
    mainWindow.focus()
    mainWindow.webContents.send('accColor', color)
    if (nativeTheme.shouldUseDarkColors) {
      mainWindow.webContents.send('changedToDark')
    } else {
      mainWindow.webContents.send('changedToLight')
    }
  })

  mainWindow.webContents.on('new-window', function (e, url) {
    e.preventDefault()
    require('electron').shell.openExternal(url)
  })

  systemPreferences.on('accent-color-changed', (event, newColor) => {
    mainWindow.webContents.send('accColorChanged', newColor)
  })

  nativeTheme.on("updated", () => {
    if (nativeTheme.shouldUseDarkColors) {
      mainWindow.webContents.send('changedToDark')
    } else {
      mainWindow.webContents.send('changedToLight')
    }
  })

  mainWindow.on('blur', () => {
    mainWindow.webContents.send('blurPw')
  })

  var sleepID = undefined

  ipc.on('preventSleep', () => {
    sleepID = powerSaveBlocker.start('prevent-display-sleep')
  })

  ipc.on('stopPrevent', () => {
    powerSaveBlocker.stop(sleepID)
  })

  if (mainWindow.isMinimized()) {
    mainWindow.restore()
  }

  ipc.on('minApp', () => {
    mainWindow.minimize()
  })

  ipc.on('maxApp', () => {
    mainWindow.maximize()
    mainWindow.webContents.send('isMaximized')
  })

  ipc.on('restoreApp', () => {
    mainWindow.unmaximize()
    mainWindow.webContents.send('isRestored')
  })

  ipc.on('closeApp', () => {
    mainWindow.close()
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
        responseHeaders: Object.assign ({
            'Content-Security-Policy': [
              // -!- Not secure at all and needs to be re-written -!- //
              "default-src 'unsafe-eval' 'unsafe-inline' 'self'",
              "style-src 'unsafe-inline' 'self'",
              "script-src 'unsafe-eval' 'unsafe-inline' 'self'"
            ]
        }, details.responseHeaders)
    })
  })
  createWindow();
})

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