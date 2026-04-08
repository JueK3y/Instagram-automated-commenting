const { app, BrowserWindow, ipcMain, powerSaveBlocker, session, systemPreferences } = require('electron')
const windowStateKeeper = require('electron-window-state')
const { autoUpdater } = require('electron-updater')
const { nativeTheme } = require('electron/main')
const { version } = require('./package.json')
const { shell } = require('electron')
const log = require('electron-log')
const path = require('path')
const ipc = ipcMain

app.commandLine.appendSwitch('remote-debugging-port', '8315');
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
  
  let color = ''
  try { color = systemPreferences.getAccentColor() } catch (_) {}
  
  autoUpdater.logger = log;
  autoUpdater.logger.transports.file.level = 'info';

  mainWindow.on('ready-to-show', () => {
    mainWindowState.manage(mainWindow)
    mainWindow.show()
    mainWindow.focus()
    mainWindow.webContents.send('accColor', color)    
    mainWindow.webContents.send('getCurVer', version)
    autoUpdater.checkForUpdatesAndNotify();
    if (nativeTheme.shouldUseDarkColors) {
      mainWindow.webContents.send('changedToDark')
    } else {
      mainWindow.webContents.send('changedToLight')
    }
    if (mainWindow.isMaximized()) {
      mainWindow.webContents.send('changeWinIcon')
    }
  })

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.on('blur', () => {
    mainWindow.webContents.send('blurPw')
  })

  try {
    systemPreferences.on('accent-color-changed', (event, newColor) => {
      mainWindow.webContents.send('accColorChanged', newColor)
    })
  } catch (_) {}

  nativeTheme.on('updated', () => {
    if (nativeTheme.shouldUseDarkColors) {
      mainWindow.webContents.send('changedToDark')
    } else {
      
      mainWindow.webCont
      ents.send('changedToLight')
    }
  })


  // ------ AutoUpdater ------ //
  const sendStatusToWindow = (text) => {
    log.info(text);
    if (mainWindow) {
      mainWindow.webContents.send('update', text)
    }
  }

  autoUpdater.on('checking-for-update', () => {
    sendStatusToWindow('Checking for update...')
  })

  autoUpdater.on('update-available', (info) => {
    sendStatusToWindow('Update available.')
  })

  autoUpdater.on('update-not-available', (info) => {
    sendStatusToWindow('Update not available.')
  })

  autoUpdater.on('error', (err) => {
    log.error(`Update-Error: ${err.toString()}`)
    mainWindow.webContents.send('message', `Error in auto-updater: ${err.toString()}`)
  })

  //ipc.on('downloadUpdate', () => {
    
  //})

  autoUpdater.on('download-progress', progressObj => {
    sendStatusToWindow(
      `Download speed: ${progressObj.bytesPerSecond} - Downloaded ${progressObj.percent}% (${progressObj.transferred} + '/' + ${progressObj.total} + )`
    )
  })

  autoUpdater.on('update-downloaded', () => {
    sendStatusToWindow('Update successfully downloaded.')
    // TODO: Ask before quitting
    autoUpdater.quitAndInstall();
  })


  // ------ IPC ------ //
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
    mainWindow.webContents.openDevTools()     // FIXME: Syntax Error when calling DevTools
  })
}

ipcMain.on('open-login-window', async (event, credentials) => {
    const safeUsername = (credentials && credentials.username) 
        ? credentials.username.replace(/[^a-zA-Z0-9_]/g, '').toLowerCase() 
        : 'default';
    const partitionName = `persist:instagram_${safeUsername}`;

    const loginWin = new BrowserWindow({
      width: 450,
      height: 700,
      title: `Instagram Login - ${credentials.username || 'Unbekannt'}`,
      autoHideMenuBar: true,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        partition: partitionName 
      }
    });

    loginWin.webContents.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36';

    const igSession = session.fromPartition(partitionName);
    await igSession.cookies.set({ url: 'https://www.instagram.com', name: 'ig_cb', value: '1' });

    let loginSuccessSent = false; 
    let twoFactorSent = false;

    const checkLoginStatus = async () => {
        if (loginSuccessSent) return;
        const cookies = await igSession.cookies.get({ domain: '.instagram.com' });
        if (cookies.some(c => c.name === 'sessionid')) {
            loginSuccessSent = true;
            event.reply('login-success', cookies);
            loginWin.close();
        }
    };

    const typeText = async (text) => {
        for (const char of text) {
            loginWin.webContents.sendInputEvent({ type: 'char', keyCode: char });
            await new Promise(r => setTimeout(r, 20 + Math.random() * 30)); 
        }
    };

    let hasTyped = false;

    loginWin.on('page-title-updated', async (e, title) => {
        if (title === 'IAC_2FA_REQUIRED' && !twoFactorSent) {
            twoFactorSent = true;
            event.reply('2fa-required');
        }

        if (title === 'IAC_READY_TO_TYPE_FULL' && !hasTyped) {
            hasTyped = true;
            await new Promise(r => setTimeout(r, 500));
            
            await typeText(credentials.username);
            
            loginWin.webContents.sendInputEvent({ type: 'keyDown', keyCode: 'Tab' });
            loginWin.webContents.sendInputEvent({ type: 'keyUp', keyCode: 'Tab' });
            await new Promise(r => setTimeout(r, 300));
            
            await typeText(credentials.password);
            await new Promise(r => setTimeout(r, 500));
            
            loginWin.webContents.sendInputEvent({ type: 'keyDown', keyCode: 'Return' });
            loginWin.webContents.sendInputEvent({ type: 'char', keyCode: '\r' });
            loginWin.webContents.sendInputEvent({ type: 'keyUp', keyCode: 'Return' });
            
            triggerLoginClick();
        } 
        else if (title === 'IAC_READY_TO_TYPE_PASS_ONLY' && !hasTyped) {
            hasTyped = true;
            await new Promise(r => setTimeout(r, 500));
            
            await typeText(credentials.password);
            await new Promise(r => setTimeout(r, 500));
            
            loginWin.webContents.sendInputEvent({ type: 'keyDown', keyCode: 'Return' });
            loginWin.webContents.sendInputEvent({ type: 'char', keyCode: '\r' });
            loginWin.webContents.sendInputEvent({ type: 'keyUp', keyCode: 'Return' });
            
            triggerLoginClick();
        }
    });

    const triggerLoginClick = async () => {
        try {
            await loginWin.webContents.executeJavaScript(`
                new Promise((resolve) => {
                    let checkCount = 0;
                    const btnInterval = setInterval(() => {
                        checkCount++;
                        const buttons = Array.from(document.querySelectorAll('div[role="button"], button'));
                        const loginBtn = buttons.find(b => (!b.querySelector('svg') && b.innerText.length > 0) || b.innerText.includes('Anmelden') || b.innerText.includes('Log In'));
                        
                        if (loginBtn && loginBtn.getAttribute('aria-disabled') !== 'true') {
                            clearInterval(btnInterval);
                            loginBtn.click();
                            resolve();
                        } else if (checkCount > 15) {
                            clearInterval(btnInterval);
                            resolve();
                        }
                    }, 250);
                });
            `);

            setTimeout(() => {
                if (!loginWin.isDestroyed()) {
                    loginWin.webContents.executeJavaScript(`
                        if(document.getElementById('iac-overlay')) {
                            document.getElementById('iac-overlay').remove();
                        }
                    `).catch(() => {});
                }
            }, 3000);
        } catch (err) {
            console.log("Ignorierter Klick-Fehler:", err.message);
        }
    };

    loginWin.webContents.on('dom-ready', async () => {
        try {
            const cookies = await igSession.cookies.get({ domain: '.instagram.com' });
            if (cookies.some(c => c.name === 'sessionid')) {
                checkLoginStatus(); 
                return; 
            }

            if (credentials && credentials.username && credentials.password) {
                await loginWin.webContents.executeJavaScript(`
                    (() => {
                        if (window.iacScriptInjected) return;
                        window.iacScriptInjected = true;

                        const overlay = document.createElement('div');
                        overlay.id = 'iac-overlay';
                        overlay.style.position = 'fixed';
                        overlay.style.top = '0'; overlay.style.left = '0';
                        overlay.style.width = '100vw'; overlay.style.height = '100vh';
                        overlay.style.backgroundColor = 'rgba(0,0,0,0.85)';
                        overlay.style.color = '#fff';
                        overlay.style.display = 'flex';
                        overlay.style.flexDirection = 'column';
                        overlay.style.alignItems = 'center';
                        overlay.style.justifyContent = 'center';
                        overlay.style.zIndex = '99999';
                        overlay.style.fontFamily = 'sans-serif';
                        overlay.innerHTML = '<h2 style="color: #ffffff !important; margin-bottom: 10px;">IAC 2.0 meldet dich an...</h2><p style="color: #ffffff !important; margin-bottom: 20px;">Bitte kurz warten.</p><button id="iac-cancel-btn" style="padding: 10px 20px; background-color: #ed4956; color: #ffffff !important; border: none; border-radius: 5px; font-weight: bold; cursor: pointer;">Abbrechen & manuell anmelden</button>';
                        document.body.appendChild(overlay);

                        document.getElementById('iac-cancel-btn').addEventListener('click', () => {
                            overlay.remove();
                        });

                        setTimeout(() => {
                            const buttons = Array.from(document.querySelectorAll('button'));
                            const cookieBtn = buttons.find(b => b.innerText.includes('Zulassen') || b.innerText.includes('erforderliche') || b.innerText.includes('Allow') || b.innerText.includes('Decline'));
                            if (cookieBtn) cookieBtn.click();
                        }, 1500);

                        const focusInterval = setInterval(() => {
                            const switchButtons = Array.from(document.querySelectorAll('div[role="button"], button, a'));
                            const switchBtn = switchButtons.find(b => {
                                const txt = b.innerText || '';
                                const label = b.getAttribute('aria-label') || '';
                                return txt.includes('Anderes Profil verwenden') || 
                                       txt.includes('Switch account') || 
                                       label.includes('Anderes Profil verwenden') || 
                                       label.includes('Switch account');
                            });

                            if (switchBtn && switchBtn.offsetParent !== null && !window.iacSwitchedAccount) {
                                window.iacSwitchedAccount = true;
                                switchBtn.click();
                                return;
                            }

                            const userField = document.querySelector('input[name="username"]') || document.querySelector('input[name="email"]');
                            const passField = document.querySelector('input[name="password"]');
                            
                            if (userField && userField.offsetParent !== null) {
                                clearInterval(focusInterval);
                                userField.focus();
                                document.title = 'IAC_READY_TO_TYPE_FULL';
                            } else if (passField && passField.offsetParent !== null) {
                                clearInterval(focusInterval);
                                passField.focus();
                                document.title = 'IAC_READY_TO_TYPE_PASS_ONLY';
                            }
                        }, 500);

                        setInterval(() => {
                            const twoFactorField = document.querySelector('input[name="verificationCode"]');
                            const urlCheck = window.location.href.includes('two_factor');
                            if ((twoFactorField || urlCheck) && document.title !== 'IAC_2FA_REQUIRED') {
                                document.title = 'IAC_2FA_REQUIRED';
                            }
                        }, 1000);
                    })();
                `);
            }
        } catch (err) {
        }
    });

    loginWin.webContents.on('did-navigate', checkLoginStatus);
    loginWin.webContents.on('did-navigate-in-page', checkLoginStatus);

    loginWin.on('closed', () => {
      if (!loginSuccessSent) {
        event.reply('login-closed', null); 
      }
    });

    loginWin.loadURL('https://www.instagram.com/');
});

ipcMain.on('create-bot-window', async (event, config) => {
    const safeUsername = (config.username) 
        ? config.username.replace(/[^a-zA-Z0-9_]/g, '').toLowerCase() 
        : 'default';
    const partitionName = `persist:instagram_${safeUsername}`;

    const botWin = new BrowserWindow({
        width: 1000,
        height: 800,
        show: config.isVisible, 
        webPreferences: {
            partition: partitionName
        }
    });
    
    botWin.loadURL('https://www.instagram.com/robots.txt');
    
    botWin.webContents.once('did-finish-load', async () => {
        try {
            const response = await fetch('http://127.0.0.1:8315/json/version');
            const data = await response.json();
            event.reply('bot-window-ready', data.webSocketDebuggerUrl);
        } catch (err) {
            console.error("Fehler beim Abrufen des Debugger-Ports:", err);
            event.reply('bot-window-ready', null);
        }
    });
});

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