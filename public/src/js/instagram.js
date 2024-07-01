const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

puppeteer.use(StealthPlugin())
let commentArea = 'textarea.x1i0vuye'
let commentLoop

const loginURL = 'https://www.instagram.com/accounts/login/'
const mfaURL = 'https://www.instagram.com/accounts/login/two_factor?next=%2F'
const stpBtn = document.getElementById('stop-btn')

function getChromiumExecPath() {
  return puppeteer.executablePath().replace('app.asar', 'app.asar.unpacked')
}

const instagram = {
  browser: null,
  page: null,

  initialize: async (mode) => {
    instagram.browser = await puppeteer.launch({
        slowMo: 35,
        headless: mode,
        executablePath: getChromiumExecPath()
    })

    instagram.page = (await instagram.browser.pages())[0]

    log.info('Instagram initialization successful')
  },

  login: async (username, password) => {
    await instagram.page.goto(loginURL, { waitUntil: 'networkidle2' })

    try {
        await instagram.page.click('._a9_1')
        log.info('Cookies accepted')
    }
    catch (error) {
        log.error(error)
        log.info('Cookie banner not found')
    }
    
    // LogIn process
    await instagram.page.waitForSelector('input[name="username"]')
    await instagram.page.type('input[name="username"]', username, { delay: 50 })
    await instagram.page.type('input[name="password"]', password, { delay: 50 })

    await instagram.page.click('[type="submit"]') 
  },

  validation: async () => {
    await instagram.page.waitForSelector('[data-visualcompletion="loading-state"]')
    log.info('Checking Login-Data')

    await new Promise(r => setTimeout(r, 1500))

    if (await instagram.page.url() === loginURL) {
      log.info('No URL change detected')
      try {
        await instagram.page.waitForNavigation({timeout: 7500})
      } 
      catch (error) {
        log.warn('Wrong LogIn data')
        try {
          // TODO: Check content of error message and display correct noteMessage (Wrong password f. ex.) -!- //
          log.warn('Instagram error message: "' + await instagram.page.$eval('._ab2z', element => element.innerHTML) + '"')     // FIXME: Eval is considered as unsafe -!- //
        }
        catch (e) {
          log.info(e)
        }
        noteMessage('Falsche LogIn Daten', 'Bitte überprüfe die eingegebenen LogIn Daten und probiere es erneut.', true)
        showBanner('error', 'Falsche Eingabe?', 'Bitte überprüfe die angegebenen LogIn Daten.', 'wrong-login-data', true)
        formError(password)
        stpBtn.click()
        runMainLogic = false
        await instagram.browser.close()
        // FIXME: Doesn't stop here -!- //
      }
    }

    // TODO: Introduce 2-FA Check -!- //
    if (await instagram.page.url() === mfaURL) {
      log.warn('Two-Factor Auth was detected')
      noteMessage('Zwei-Faktor Authentifizierung entdeckt', 'In dieser Version wird das Anmelden mit 2FA noch nicht unterstützt', true)
      showBanner('warning', '2FA LogIn', '2FA Login zur Zeit nicht möglich.', 'multi-factor-auth', true)
      stpBtn.click()
      runMainLogic = false
      await instagram.browser.close()
    }
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

  comment: async(commentMode, comData) => {
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
        const spamNotice = await instagram.page.$('.piCib')
        let comment = comData
        try {
          if (runMainLogic) {   
            if (spamNotice !== null) {
              showBanner('warning', 'Spam erkannt', 'IAC 2.0 muss etwas langsamer kommentieren.', 'spam-notice', true)
              log.warn("Instagram detected spam, commenting slower")
              await instagram.page.keyboard.press('Enter')
              await instagram.page.waitForTimeout(2000)
            }
            else {
              await instagram.page.click(commentArea)
              const inputValue = await instagram.page.$eval(commentArea, el => el.value)
              for (let i = 0; i < inputValue.length; i++) {
                await instagram.page.keyboard.press('Backspace')
              }
              await instagram.page.type(commentArea, comment[i], { delay: 150 })
              await instagram.page.keyboard.press('Enter', { dely: 250 })
              await instagram.page.keyboard.press('Enter', { dely: 250 })
              await instagram.page.keyboard.press('Enter', { dely: 250 })
              // TODO: Check if Instagram blocks commenting, error pops up -!- //
              await instagram.page.keyboard.press('Enter', { dely: 250 })
              await instagram.page.keyboard.press('Enter', { dely: 250 })
              log.info(`Posting comment: ${comment[i]}`)
              comTime = (Math.floor(Math.random() * 100) + 5) * 1000
              log.info(`Waiting for ${comTime} miliseconds`)
              await new Promise(r => setTimeout(r, comTime))  // TODO: Change this value to user based input -!- //
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
            await instagram.page.type(commentArea, comment[i], { delay: 150 })
            await instagram.page.keyboard.press('Enter', { dely: 250 })
            await instagram.page.keyboard.press('Enter', { dely: 250 })
            await instagram.page.keyboard.press('Enter', { dely: 250 })
            // TODO: Check if Instagram blocks commenting, error pops up -!- //
            await instagram.page.keyboard.press('Enter', { dely: 250 })
            await instagram.page.keyboard.press('Enter', { dely: 250 })
            log.info(`Posting comment: ${comment[i]}`)
            if (i !== (comment.length - 1)) {
              comTime = (Math.floor(Math.random() * 100) + 5) * 1000
              log.info(`Waiting for ${comTime} miliseconds`)
              await new Promise(r => setTimeout(r, comTime))  // TODO: Change this value to user based input -!- //
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
    await new Promise(r => setTimeout(r, 150))
    log.info('Commenting fully completed')
    noteMessage('Kommentieren abgeschlossen', 'IAC 2.0 hat alle Kommentare erfolgreich gepostet.', true)
    showBanner('info', 'Kommentieren fertig', 'Das Kommentieren wurde erfolgreich abgeschlossen.', 'commenting-completed', true)
    document.getElementById('stop-btn').click()
    runMainLogic = false
    await instagram.browser.close()
  }
}

module.exports = instagram
