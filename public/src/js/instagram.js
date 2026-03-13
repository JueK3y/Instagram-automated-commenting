const puppeteerCore = require('puppeteer-core');
const { addExtra } = require('puppeteer-extra');
const puppeteer = addExtra(puppeteerCore);

const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { ipcRenderer } = require('electron')

puppeteer.use(StealthPlugin())
let commentArea = 'textarea[autocomplete="off"]'
let commentLoop
let stopMonitor = null;

const stpBtn = document.getElementById('stop-btn')

async function smartSleep(ms) {
    const iterations = ms / 250;
    for (let i = 0; i < iterations; i++) {
        if (!runMainLogic) break;
        await new Promise(r => setTimeout(r, 250));
    }
}

const instagram = {
  browser: null,
  page: null,

  initialize: async (mode) => {
    log.info('Speichere Sichtbarkeits-Modus für späteren Bot-Start...');
    instagram._mode = mode; 

    if (stopMonitor) clearInterval(stopMonitor);
    stopMonitor = setInterval(async () => {
        if (typeof runMainLogic !== 'undefined' && !runMainLogic) {
            log.info('Stop button detected: Force closing bot window...');
            if (instagram.page && !instagram.page.isClosed()) {
                await instagram.page.close().catch(() => {});
            }
            if (instagram.browser) {
                instagram.browser.disconnect();
            }
            clearInterval(stopMonitor);
        }
    }, 500);
  },

  login: async (username, password) => {
    log.info('Starting native Electron login...');

    ipcRenderer.on('2fa-required', () => {
       log.info('2FA verification detected, notifying user...');
       if (typeof noteMessage === 'function') {
           noteMessage('2FA erforderlich', 'Bitte gib deinen Sicherheitscode im Instagram-Fenster ein.', false);
       }
       if (typeof showBanner === 'function') {
           showBanner('info', '2FA erforderlich', 'Bitte gib den 6-stelligen Code im Instagram-Fenster ein.', '2fa-info', true);
       }
    });

    const cookies = await new Promise((resolve) => {
      ipcRenderer.once('login-success', (event, cookies) => {
          ipcRenderer.removeAllListeners('2fa-required');
          resolve(cookies);
      });
      ipcRenderer.once('login-closed', () => {
          ipcRenderer.removeAllListeners('2fa-required');
          resolve(null);
      }); 
      ipcRenderer.send('open-login-window', { username: username, password: password });
    });

    if (!cookies) {
      log.error('Login window was closed manually. Aborting.');
      showBanner('error', 'Login abgebrochen', 'Das Anmeldefenster wurde manuell geschlossen.', 'login-closed', true);
      stpBtn.click();
      runMainLogic = false;
      if (instagram.page && !instagram.page.isClosed()) await instagram.page.close();
      if (instagram.browser) instagram.browser.disconnect();
      return;
    }

    log.info('Login erfolgreich. Erstelle geteiltes Bot-Fenster...');

    const isVisible = !instagram._mode; 
    
    const wsUrl = await new Promise((resolve) => {
        ipcRenderer.once('bot-window-ready', (event, url) => resolve(url));
        ipcRenderer.send('create-bot-window', { isVisible: isVisible, username: username });
    });

    if (!wsUrl) {
        log.error('Konnte keine Debugger-URL finden! Verbindung abgebrochen.');
        return;
    }

    instagram.browser = await puppeteer.connect({
        browserWSEndpoint: wsUrl,
        defaultViewport: null
    });

    const pages = await instagram.browser.pages();
    instagram.page = pages.find(p => p.url().includes('robots.txt'));
    if (!instagram.page) {
        instagram.page = pages[pages.length - 1];
    }

    await new Promise(r => setTimeout(r, 1000));

    log.info('Lade Instagram-Startseite...');
    await instagram.page.goto('https://www.instagram.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  },

  validation: async () => {
    log.info('Prüfe, ob Puppeteer die Cookies akzeptiert hat...');
    const currentUrl = await instagram.page.url();
    
    if (currentUrl.includes('login')) {
      log.warn('Trotz Cookies nicht eingeloggt. Session abgelaufen?');
      noteMessage('Fehler beim Übernehmen', 'Die Sitzung konnte nicht an den Bot übergeben werden.', true);
      showBanner('error', 'Login fehlgeschlagen', 'Sitzung nicht übernommen.', 'cookie-fail', true);
      stpBtn.click();
      runMainLogic = false;
      if (instagram.page && !instagram.page.isClosed()) await instagram.page.close();
      if (instagram.browser) instagram.browser.disconnect();
      return;
    }
    
    log.info('Login erfolgreich verifiziert! Der Bot ist bereit zum Kommentieren.');
    showBanner('info', 'LogIn erfolgreich', 'Die Sitzung wurde erfolgreich übernommen.', 'login-success', true);
  },

  urlReader: async (postURL) => {
    if (!runMainLogic) return;
    showBanner('info', 'LogIn erfolgreich', 'Das Einloggen in Instagram war erfolgreich.', 'login-success', true)
    log.info('Correct LogIn data')

    if (postURL.slice(0,4) !== 'http') {        
      log.info('Adding https:// to URL')
      postURL = 'https://' + postURL
    }
    
    log.info(`Opening ${postURL}`)

    try {
      await instagram.page.goto(postURL, {waitUntil: 'domcontentloaded', timeout: 60000})
      await new Promise(r => setTimeout(r, 2000)); 
    }
    catch (err) {
      if (!runMainLogic || err.message.includes('TargetCloseError') || err.message.includes('Session closed')) {
          return; 
      }
      
      log.error('Timeout error in loading post url; try again')
      showBanner('error', 'Ladefehler', 'Die URL konnte nicht geladen werden. Bitte erneut versuchen.', 'post-timeout', true)
      noteMessage('Ladefehler', 'Es gab ein Problem mit dem Laden der URL. Bitte versuche es erneut.', true)
      stpBtn.click()
      runMainLogic = false
      if (instagram.page && !instagram.page.isClosed()) await instagram.page.close();
      if (instagram.browser) instagram.browser.disconnect();
      return;
    }

    if (!runMainLogic) return;

    // 404 Check 
    if (await instagram.page.$("span::-p-text(may have been removed)")) {
      log.error('404 Error: URL redirects to empty page')
      showBanner('error', 'Falscher Link', 'Die URL ist falsch. Bitte den eingefügten Link überprüfen.', '404-error', true)
      noteMessage('Falsche URL', 'Der Link konnte nicht geladen werden. Bitte überprüfe die eingegebenen Instagram URL und probiere es erneut.', true)
      if (typeof formError === 'function') formError(urlInput)
      stpBtn.click()
      runMainLogic = false
      if (instagram.page && !instagram.page.isClosed()) await instagram.page.close();
      if (instagram.browser) instagram.browser.disconnect();
    }
  },

  commentCheck: async() => {
    // INFO: Checks if comments are turned off -!- //
    try {
      await instagram.page.click(commentArea)
    }
    catch(err) {
      log.warn('Comment function disabled')
      noteMessage('Kommentieren nicht möglich', 'Der Ersteller hat die Kommentar-Funktion deaktiviert.', true)
      showBanner('error', 'Kommentieren nicht möglich', 'Der Ersteller verbietet das Kommentieren.', 'comment-function-disabled', true)
      stpBtn.click()
      runMainLogic = false
      if (instagram.page && !instagram.page.isClosed()) await instagram.page.close();
      if (instagram.browser) instagram.browser.disconnect();
    }
  },

  comment: async(commentMode, comData) => {
    if (commentMode === 'once') commentLoop = false
    else if (commentMode === 'loop') commentLoop = true
    else commentLoop = false

    log.info(`Looping comments: ${commentLoop}`)
    let comment
    setTimeout(() => {
      comment = comData
    }, 75)

    let comTime

    await new Promise(r => setTimeout(r, 150))
    
    if (commentLoop) {                                                           
      for (let i = 0; i < comment.length; i++) {
        if (!runMainLogic) break; 

        try {
          const spamDialog = await instagram.page.$('div[role="dialog"]');
          if (spamDialog !== null) {
            showBanner('warning', 'Unterbrechung erkannt', 'Instagram hat uns gestoppt. IAC 2.0 macht kurz Pause.', 'spam-notice', true);
            log.warn("Instagram popup detected, commenting slower");

            const dialogButtons = await spamDialog.$$('button');
            if (dialogButtons.length > 0) {
                const confirmButton = dialogButtons[dialogButtons.length - 1];
                await confirmButton.click();
            }
            await smartSleep(5000); 
          }
          else {
            await instagram.page.click(commentArea)
            const inputValue = await instagram.page.$eval(commentArea, el => el.value)
            
            for (let j = 0; j < inputValue.length; j++) {
              await instagram.page.keyboard.press('Backspace')
            }
            await instagram.page.type(commentArea, comment[i], { delay: 65 })
            
            await smartSleep(300)
            if (!runMainLogic) break;
            await instagram.page.keyboard.press('Enter', { delay: 100 })
            
            await smartSleep(300)
            if (!runMainLogic) break;
            await instagram.page.keyboard.press('Enter', { delay: 100 })

            log.info(`Posting comment: ${comment[i]}`)
            
            comTime = (Math.floor(Math.random() * 100) + 5) * 1000
            log.info(`Waiting for ${comTime} miliseconds`)
            
            await smartSleep(comTime)
          }
        }
        catch(err) {
          if (!runMainLogic || err.message.includes('TargetCloseError') || err.message.includes('Session closed')) {
              break;
          }
          log.warn('Element not found or wrong URL: ' + err.message)
          noteMessage('Falsche URL?', 'Bitte überprüfe die URL und probiere es erneut.', true)
          showBanner('error', 'Falsche URL?', 'Bitte URL überprüfen und erneut versuchen.', 'wrong-ig-url', true)
          if (typeof formError === 'function') formError(urlInput)
          runMainLogic = false
          break;
        }
      }
    }
    else {
      for (let i = 0; i < comment.length; i++) {
        if (!runMainLogic) break;

        try {
          await instagram.page.click(commentArea)
          let inputValue = await instagram.page.$eval(commentArea, el => el.value)                
          for (let j = 0; j < inputValue.length; j++) {
            await instagram.page.keyboard.press('Backspace')
          }
          await instagram.page.type(commentArea, comment[i], { delay: 65 })
          
          await smartSleep(300)
          if (!runMainLogic) break;
          await instagram.page.keyboard.press('Enter', { delay: 100 })
          
          await smartSleep(300)
          if (!runMainLogic) break;
          await instagram.page.keyboard.press('Enter', { delay: 100 })

          log.info(`Posting comment: ${comment[i]}`)
          if (i !== (comment.length - 1)) {
            comTime = (Math.floor(Math.random() * 100) + 5) * 1000
            log.info(`Waiting for ${comTime} miliseconds`)
            await smartSleep(comTime)
          }
        }
        catch(err) {
          if (!runMainLogic || err.message.includes('TargetCloseError') || err.message.includes('Session closed')) {
              break;
          }
          log.warn('Element not found or wrong URL: ' + err.message)
          noteMessage('Falsche URL?', 'Bitte überprüfe die URL und probiere es erneut.', true)
          showBanner('error', 'Falsche URL?', 'Bitte URL überprüfen und erneut versuchen.', 'wrong-ig-url', true)
          if (typeof formError === 'function') formError(urlInput)
          runMainLogic = false
          break;
        }
      }
    }

    await new Promise(r => setTimeout(r, 500))
    
    if (runMainLogic) {
        log.info('Commenting fully completed')
        noteMessage('Kommentieren abgeschlossen', 'IAC 2.0 hat alle Kommentare erfolgreich gepostet.', true)
        showBanner('info', 'Kommentieren fertig', 'Das Kommentieren wurde erfolgreich abgeschlossen.', 'commenting-completed', true)
    } else {
        log.info('Commenting was manually stopped by the user.')
    }

    document.getElementById('stop-btn').click()
    runMainLogic = false
    if (instagram.page && !instagram.page.isClosed()) await instagram.page.close();
    if (instagram.browser) instagram.browser.disconnect();
  }
}

module.exports = instagram
