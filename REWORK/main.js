const { app, BrowserWindow, ipcMain, powerSaveBlocker, session, systemPreferences } = require('electron')
const windowStateKeeper = require('electron-window-state')
const { nativeTheme } = require('electron/main')
const { shell } = require('electron')
const path = require('path')
const fs = require('fs')
const { Console } = require('console')
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

  // -!- Better in renderer process? -!- //
  let userData = app.getPath('userData')
  let dirLocation = path.join(userData + '/data')
  let fileLocation = path.join(dirLocation, 'comments.txt')  

  ipc.on('checkFile', () => {
    if (! fs.existsSync(fileLocation)) {
      if (! fs.existsSync(dirLocation)) {
        fs.mkdirSync(dirLocation)
      }
      fs.writeFileSync(fileLocation, '! Write only one comment per line. Comments with \'!\' at the beginning will be ignored.')
    }
    shell.openPath(fileLocation)
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




const puppeteer = require('puppeteer-extra')

const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())


puppeteer.launch({ headless: false, slowMo: 100 }).then(async browser => {    // Without {} args in production
  const page = await browser.newPage()
  
  // Stealh mode checker
  /*await page.goto('https://arh.antoinevastel.com/bots/areyouheadless')
  await page.waitForTimeout(5000)
  await page.screenshot({ path: 'Stealth.png' })*/
  
  const username = 'username'
  const password = 'password'
  const postURL = 'https://www.instagram.com/accounts/login/'

  await page.goto(postURL);

  // Waiting for LogIn load
  await page.waitForSelector('input[name="username"]')

  // Entering LogIn data
  await page.type('input[name="username"]', username)
  await page.type('input[name="password"]', password)

  // Submit LogIn data
  page.click('[type="submit"]'),
  page.waitForNavigation({ waitUntil: 'networkidle0' })

  await page.screenshot({ path: 'Instagram.png' })
  
  // await browser.close();
})