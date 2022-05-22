const { app, BrowserWindow, ipcMain, powerSaveBlocker, session, systemPreferences } = require('electron')
const windowStateKeeper = require('electron-window-state')
const { autoUpdater } = require('electron-updater')
const { nativeTheme } = require('electron/main')
const { shell } = require('electron')
const log = require('electron-log')
const path = require('path')
const fs = require('fs')
const ipc = ipcMain

log.info('--- Main start of IAC 2.0 ---')

const createWindow = () => {
  // INFO: Create the browser window -!- //
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
        // sandbox: true,                         // FIXME: Problems with require -!- //
        nodeIntegration: true,                    // TODO: Can this be disabled in the finale release? -!- //
        contextIsolation: false                   // TODO: Same for here? -!- //
      }
  })

  // INFO: Load the index.html of the app -!- //
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  
  let color = systemPreferences.getAccentColor()

  mainWindow.on('ready-to-show', () => {
    mainWindowState.manage(mainWindow)
    mainWindow.show()
    mainWindow.focus()
    mainWindow.webContents.send('accColor', color)    
    mainWindow.webContents.send('getCurVer', process.env.npm_package_version)
    if (nativeTheme.shouldUseDarkColors) {
      mainWindow.webContents.send('changedToDark')
    } else {
      mainWindow.webContents.send('changedToLight')
    }
    if (mainWindow.isMaximized()) {
      mainWindow.webContents.send('changeWinIcon')
    }
  })

  mainWindow.webContents.on('new-window', function (e, url) {
    e.preventDefault()
    require('electron').shell.openExternal(url)
  })

  systemPreferences.on('accent-color-changed', (event, newColor) => {
    mainWindow.webContents.send('accColorChanged', newColor)
  })

  nativeTheme.on('updated', () => {
    if (nativeTheme.shouldUseDarkColors) {
      mainWindow.webContents.send('changedToDark')
    } else {
      mainWindow.webContents.send('changedToLight')
    }
  })

  mainWindow.on('blur', () => {
    mainWindow.webContents.send('blurPw')
  })

  ipc.on('checkFile', (evt, arg) => {
    let userData = app.getPath('userData')
    let dirLocation = path.join(userData + '/data')
    let fileLocation = path.join(dirLocation, 'comments.txt')
    var filePathArgs = {
      dirLoc: dirLocation,
      fileLoc: fileLocation
    }
    mainWindow.webContents.send('getFilePath', [filePathArgs[arg[0]], filePathArgs[arg[1]]])
  })

  ipc.on('openCommentFile', (evt, path) => {
    shell.openPath(path)
  })

  let sleepID = undefined

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

  ipc.on('openDevConsole', () => {
    mainWindow.webContents.openDevTools()
  })
  
  autoUpdater.logger = log;
  autoUpdater.logger.transports.file.level = 'info';

  autoUpdater.checkForUpdatesAndNotify()
  
  const sendStatusToWindow = (text) => {
    log.info(text);
    if (mainWindow) {
      mainWindow.webContents.send('update', text)
    }
  }

  // sendStatusToWindow('Update available')
  
  ////// Update
  autoUpdater.on('checking-for-update', () => {
    sendStatusToWindow('Checking for update...')
  })

  autoUpdater.on('update-available', () => {
    sendStatusToWindow('Update available')
  })

  autoUpdater.on('update-not-available', () => {
    sendStatusToWindow('Update not available')
  })

  autoUpdater.on('error', err => {
    log.error(`Update-Error: ${err.toString()}`)
    mainWindow.webContents.send('message', `Error in auto-updater: ${err.toString()}`)
  })

  autoUpdater.on('download-progress', progressObj => {
    sendStatusToWindow(
      `Download speed: ${progressObj.bytesPerSecond} - Downloaded ${progressObj.percent}% (${progressObj.transferred} + '/' + ${progressObj.total} + )`
    )
  })

  autoUpdater.on('update-downloaded', () => {
    sendStatusToWindow('Update downloaded; will install now')
    // Wait 5 seconds, then quit and install
    // In your application, you don't need to wait 500 ms.
    // You could call autoUpdater.quitAndInstall(); immediately
    autoUpdater.quitAndInstall()
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
              // FIXME: Not secure at all and needs to be re-written -!- //
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