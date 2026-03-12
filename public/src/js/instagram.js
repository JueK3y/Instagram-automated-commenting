const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const { ipcRenderer } = require('electron')

puppeteer.use(StealthPlugin())
let commentArea = 'textarea[autocomplete="off"]'
let commentLoop

const loginURL = 'https://www.instagram.com/accounts/login/'
const mfaURL = 'https://www.instagram.com/accounts/login/two_factor?next=%2F'
const stpBtn = document.getElementById('stop-btn')

async function smartSleep(ms) {
    const iterations = ms / 250;
    for (let i = 0; i < iterations; i++) {
        if (!runMainLogic) break;
        await new Promise(r => setTimeout(r, 250));
    }
}

function getChromiumExecPath() {
  return puppeteer.executablePath().replace('app.asar', 'app.asar.unpacked')
}

const instagram = {
  browser: null,
  page: null,

  initialize: async (mode) => {
    // Puppeteer startet im Hintergrund (bzw. sichtbar, je nach mode)
    instagram.browser = await puppeteer.launch({
        slowMo: 35,
        headless: mode, 
        executablePath: getChromiumExecPath(),
        userDataDir: './instagram_session_data', 
        args: ['--disable-blink-features=AutomationControlled']
    });

    instagram.page = (await instagram.browser.pages())[0];

    log.info('Instagram initialization successful');
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
       await instagram.browser.close();
       return;
    }

    log.info('Cookies extracted successfully. Injecting into Puppeteer...');

    const puppeteerCookies = cookies.map(c => ({
      name: c.name,
      value: c.value,
      domain: c.domain,
      path: c.path,
      secure: c.secure,
      httpOnly: c.httpOnly,
      sameSite: c.sameSite
    }));

    const pages = await instagram.browser.pages();
    instagram.page = pages[0]; 
    
    for (let i = 1; i < pages.length; i++) {
        await pages[i].close(); 
    }
    
    await instagram.page.bringToFront();

    await instagram.page.setCookie(...puppeteerCookies);
    await instagram.page.goto('https://www.instagram.com/', { waitUntil: 'networkidle2' });
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
       await instagram.browser.close();
       return;
    }
    
    log.info('Login erfolgreich verifiziert! Der Bot ist bereit zum Kommentieren.');
    showBanner('info', 'LogIn erfolgreich', 'Die Sitzung wurde erfolgreich übernommen.', 'login-success', true);
  },

  urlReader: async (postURL) => {
    showBanner('info', 'LogIn erfolgreich', 'Das Einloggen in Instagram war erfolgreich.', 'login-success', true)
    log.info('Correct LogIn data')

    if (postURL.slice(0,4) !== 'http') {        // INFO: Doesn't check, if :// is already there -!- //
      log.info('Adding https:// to URL')
      postURL = 'https://' + postURL
    }
    
    log.info(`Opening ${postURL}`)

    try {
      await instagram.page.goto(postURL, {waitUntil: 'networkidle0'})
    }
    catch {
      // TODO: Catch certain error & check, why it gets called after wrong LogIn Data -!- //
      log.error('Timeout error in loading post url; try again')
      showBanner('error', 'Ladefehler', 'Die URL konnte nicht geladen werden. Bitte erneut versuchen.', 'post-timeout', true)
      noteMessage('Ladefehler', 'Es gab ein Problem mit dem Laden der URL. Bitte versuche es erneut.', true)
      stpBtn.click()
      runMainLogic = false
      await instagram.browser.close()
    }

    // INFO: 404 Check -!- //
    if (await instagram.page.$("span::-p-text(may have been removed)")) {
      log.error('404 Error: URL redirects to empty page')
      showBanner('error', 'Falscher Link', 'Die URL ist falsch. Bitte den eingefügten Link überprüfen.', '404-error', true)
      noteMessage('Falsche URL', 'Der Link konnte nicht geladen werden. Bitte überprüfe die eingegebenen Instagram URL und probiere es erneut.', true)
      formError(urlInput)
      stpBtn.click()
      runMainLogic = false
      await instagram.browser.close()
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
      await instagram.browser.close()   
    }
  },

  comment: async(commentMode, comData) => {
    // INFO: Should the commenting loop or not? -!- //
    if (commentMode === 'once') commentLoop = false
    else if (commentMode === 'loop') commentLoop = true
    else commentLoop = false

    log.info(`Looping comments: ${commentLoop}`)
    let comment
    setTimeout(() => {
      comment = comData
    }, 75)

    let comTime

    // INFO: Comment loop -!- //
    await new Promise(r => setTimeout(r, 150))
    if (commentLoop) {                                                           // TODO: Better stillRunningCheck needed -!- //
      for (let i = 0; i < comment.length; i++) {
        const spamDialog = await instagram.page.$('div[role="dialog"]');
        let comment = comData
        try {
          if (runMainLogic) {   
            if (spamDialog !== null) {
              showBanner('warning', 'Unterbrechung erkannt', 'Instagram hat uns gestoppt. IAC 2.0 macht kurz Pause.', 'spam-notice', true);
              log.warn("Instagram popup detected, commenting slower");

              const dialogButtons = await spamDialog.$$('button');
              
              if (dialogButtons.length > 0) {
                  const confirmButton = dialogButtons[dialogButtons.length - 1];
                  await confirmButton.click();
              }
              await instagram.page.waitForTimeout(5000);
            }
            else {
              await instagram.page.click(commentArea)
              const inputValue = await instagram.page.$eval(commentArea, el => el.value)
              for (let i = 0; i < inputValue.length; i++) {
                await instagram.page.keyboard.press('Backspace')
              }
              await instagram.page.type(commentArea, comment[i], { delay: 65 })
              
              await smartSleep(300)
              await instagram.page.keyboard.press('Enter', { delay: 100 })
              await smartSleep(300)
              await instagram.page.keyboard.press('Enter', { delay: 100 })

              log.info(`Posting comment: ${comment[i]}`)
              
              comTime = (Math.floor(Math.random() * 100) + 5) * 1000
              log.info(`Waiting for ${comTime} miliseconds`)
              
              await smartSleep(comTime)
            }
          }
          else await instagram.page.close()
        }
        catch(TypeError) {
          // INFO: Checks for wrong URL -!- //
          // FIXME: Gets called when closing the page manually -!- //
          log.warn('Wrong page link')
          noteMessage('Falsche URL?', 'Bitte überprüfe die URL und probiere es erneut.', true)
          showBanner('error', 'Falsche URL?', 'Bitte URL überprüfen und erneut versuchen.', 'wrong-ig-url', true)
          formError(urlInput)
          document.getElementById('stop-btn').click()
          runMainLogic = false
          await instagram.browser.close()
        }
      }
    }
    else {
      for (let i = 0; i < comment.length; i++) {
        let comment = comData
        try {
          if (runMainLogic) {                                                                       // TODO: Better stillRunningCheck needed -!- //
            await instagram.page.click(commentArea)
            let inputValue = await instagram.page.$eval(commentArea, el => el.value)                // INFO: Deletes current input
            for (let i = 0; i < inputValue.length; i++) {
              await instagram.page.keyboard.press('Backspace')
            }
            await instagram.page.type(commentArea, comment[i], { delay: 65 })
            await smartSleep(300)
            await instagram.page.keyboard.press('Enter', { delay: 100 })
            await smartSleep(300)
            await instagram.page.keyboard.press('Enter', { delay: 100 })

            log.info(`Posting comment: ${comment[i]}`)
            if (i !== (comment.length - 1)) {
              comTime = (Math.floor(Math.random() * 100) + 5) * 1000
              log.info(`Waiting for ${comTime} miliseconds`)
              
              await smartSleep(comTime)
            }
          }
          else await instagram.page.close()
        }
        catch(TypeError) {
          log.info(TypeError)
          log.warn('Wrong page link')
          noteMessage('Falsche URL?', 'Bitte überprüfe die URL und probiere es erneut.', true)
          showBanner('error', 'Falsche URL?', 'Bitte URL überprüfen und erneut versuchen.', 'wrong-ig-url', true)
          formError(urlInput)
          document.getElementById('stop-btn').click()
          runMainLogic = false
          await instagram.browser.close()
        }
      }
    }
    await new Promise(r => setTimeout(r, 500))
    log.info('Commenting fully completed')
    noteMessage('Kommentieren abgeschlossen', 'IAC 2.0 hat alle Kommentare erfolgreich gepostet.', true)
    showBanner('info', 'Kommentieren fertig', 'Das Kommentieren wurde erfolgreich abgeschlossen.', 'commenting-completed', true)
    document.getElementById('stop-btn').click()
    runMainLogic = false
    await instagram.browser.close()
  }
}

module.exports = instagram
