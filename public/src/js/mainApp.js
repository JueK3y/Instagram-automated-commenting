const puppeteer = require('puppeteer-extra')

const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

let runMainLogic;
commentLoop = false

function getChromiumExecPath() {
  return puppeteer.executablePath().replace('app.asar', 'app.asar.unpacked');
}

function launchMainLogic(_url, _username, _password, _mode) {
  puppeteer.launch({ headless: _mode, slowMo: 50, executablePath: getChromiumExecPath()}).then(async browser => {    // TODO: Without slowMo arg in production -!- //
    while (runMainLogic) {
      log.info('Main logic launch successfull')
      const page = (await browser.pages())[0]
      
      // INFO: Stealh mode checker -!- //
      /*await page.goto('https://arh.antoinevastel.com/bots/areyouheadless')
      await page.waitForTimeout(5000)
      await page.screenshot({ path: 'Stealth.png' })*/
      
      const loginURL = 'https://www.instagram.com/accounts/login/'
      const mfaURL = 'https://www.instagram.com/accounts/login/two_factor?next=%2F'
      let postURL = _url
      const username = _username
      const password = _password
    
      if (postURL.slice(0,4) !== 'http') {        // INFO: Doesn't check, if :// is already there -!- //
        log.info('Adding https:// to URL')
        postURL = 'https://' + postURL
      }
  
  
      // INFO: Opening browser -!- //
      log.info('Opening instagram login page')
      try {
        await page.goto(loginURL, {
          waitUntil: 'networkidle2',
        })
        // browser.on('disconnected', alert('Test'))
      }
      catch (ProtocolError) {
        log.error('Failed to execute browser action')
      }
    
  
      // INFO: Check for cookie banner -!- //
      if (runMainLogic) {                                                                    // TODO: Better stillRunningCheck needed -!- //
        if (await page.$('._a9_1') !== null) {                                               // INFO: Shouldn't use class detection -!- //
          log.info('Found cookie banner')
          await page.click('._a9_1')                                                         // FIXME: Faulty error detection -!- //
        }
      }
      else {
        await page.close()
        return
      }

    
    
      // INFO: Waiting for LogIn load -!- //
      if (runMainLogic) {
        await page.waitForSelector('input[name="username"]')
      }
      else {
        await page.close()
        return
      }
    
  
      // INFO: Entering LogIn data -!- //
      if (runMainLogic) {                                                                    // TODO: Better stillRunningCheck needed -!- //
        await page.type('input[name="username"]', username)
        await page.type('input[name="password"]', password)
      }
      else {
        await page.close()
        return
      }
  
      // INFO: Submit LogIn data -!- //
      if (runMainLogic) await page.click('[type="submit"]')                                  // TODO: Better stillRunningCheck needed -!- //
      else {
        await page.close()
        return
      }
  
      // TODO: Check alert message AFTER the submit button is clicked -!- //
  
      if (runMainLogic) await page.waitForTimeout(5000)                                      // TODO: Better stillRunningCheck needed -!- //
      else {
        await page.close()
        return
      }
  
      // INFO: Check if data is correct -!- //
      log.info('Checking LogIn data')
      await page.waitForTimeout(75)
      if (await page.url() === loginURL) {
        await page.waitForTimeout(75)
        await page.waitForSelector('#slfErrorAlert')                              // FIXME: Shouldn't use id detection -!- //
        log.warn('Wrong LogIn data')
        log.warn('Instagram error message: "' + await page.$eval('#slfErrorAlert', element => element.innerHTML) + '"')     // FIXME: Eval is considered as unsafe -!- //
        noteMessage('Falsche LogIn Daten', 'Bitte überprüfe die eingegebenen LogIn Daten und probiere es erneut.', true)
        showBanner('error', 'Falsche Eingabe?', 'Bitte überprüfe die angegebenen LogIn Daten.', 'wrong-login-data', true)
        document.getElementById('stop-btn').click()
        runMainLogic = false
        await browser.close()
      }
      else {
        // FIXME: 2FA doesn't work currently. Add support on final release -!- //
        if (await page.url() === mfaURL) {
          log.warn('Two-Factor Auth was detected')

          // TODO: Delete this, if 2FA works -!- //
          noteMessage('Zwei-Faktor Authentifizierung entdeckt', 'In dieser Version wird das Anmelden mit 2FA noch nicht unterstützt', true)
          showBanner('warning', '2FA LogIn', '2FA Login zur Zeit nicht möglich.', 'multi-factor-auth', true)
          document.getElementById('stop-btn').click()
          runMainLogic = false
          await page.close()

          /* noteMessage('Zwei-Faktor Authentifizierung Code benötigt', 'Für die Anmeldung wird ein 2FA Code benötigt. Dieser kann bei der entsprechenden Auth-App oder per SMS erhalten werden.', true)
          showBanner('warning', '2FA LogIn', 'Zum LogIn wird aufgrund 2FA ein Code benötigt.', 'multi-factor-auth', true)  
          openSmallWin('multi-fa', 'src/img/icons/dark/info.svg', 'Instagram Automated Commenting 2.0')
          await page.waitForTimeout(3000)
          await page.waitForFunction(() => {
            document.getElementById('s-w-m-b-multi-fa').onclick = () => {
              let mfaCode = document.getElementById('mfa-input').value
            }
          //   return mfaButton === true && mfaCode.length === 6 // FIXME: Doesn't work yet -!- //
          })
          // TODO: Add ID's -!- //
          await page.waitForSelector('input[name="verificationCode"]')
          await page.type('input[name="verificationCode"]', mfaCode)
          await page.click('.L3NKy')
          await page.waitForTimeout(3000)
          if (await page.url() === mfaURL) await page.waitForSelector('#twoFactorErrorAlert')
          // TODO: Add 2FA Code and check it -!- //
          // TODO: If #twoFactorErrorAlert comes up - ask for 2FA again -!- // */
        }
        showBanner('info', 'LogIn erfolgreich', 'Das Einloggen in Instagram war erfolgreich.', 'login-success', true)
        log.info('Correct LogIn data')
        log.info(`Opening ${postURL}`)
        try {
          await page.goto(postURL, {
            waitUntil: 'networkidle0',
          })
        }
        catch {
          log.error('Timeout error in loading post url; try again')
          showBanner('error', 'Ladefehler', 'Die URL konnte nicht geladen werden. Bitte erneut versuchen.', 'post-timeout', true)
          document.getElementById('stop-btn').click()
          runMainLogic = false
          await browser.close()
        }

        try {
          await page.click('textarea.x1i0vuye')
        }
        catch(err) {
          log.warn('Comment function disabled')
          noteMessage('Kommentieren nicht möglich', 'Der Ersteller hat die Kommentar-Funktion deaktiviert.', true)
          showBanner('error', 'Kommentieren nicht möglich', 'Der Ersteller verbietet das Kommentieren.', 'comment-function-disabled', true)
          document.getElementById('stop-btn').click()
          runMainLogic = false
          await browser.close()
        }

        if (runMainLogic) getComments()                                                      // TODO: Better stillRunningCheck needed -!- //
        else {
          await page.close()
          return
        }
        
        commentLoop = false                                                                 // INFO: Should the commenting loop or not? -!- //
        log.info(`Looping comments: ${commentLoop}`)
        let comment
        setTimeout(() => {
          comment = comData
        }, 75)

        let comTime
        // INFO: Comment loop -!- //

        if (commentLoop) {
          while (commentLoop) {
            if (runMainLogic) {                                                              // TODO: Better stillRunningCheck needed -!- //
              await page.waitForTimeout(75)
              for (let i = 0; i < comment.length; i++) {
                // const commInp = await page.$('[data-testid="post-comment-text-area"]')
                // const commBut = await page.$('[data-testid="post-comment-input-button"]')
                // const commInp = await page.$x('//*[@id="mount_0_0_0r"]/div/div[1]/div/div[1]/div/div/div/div[1]/div[1]/section/main/div[1]/div[1]/article/div/div[2]/div/div[2]/section[3]/div/form/textarea')    
                // const commBut = await page.$x('/html/body/div[1]/div/div[1]/div/div[1]/div/div/div/div[1]/div[1]/section/main/div[1]/div[1]/article/div/div[2]/div/div[2]/section[3]/div/form/button')
                const spamNotice = await page.$('.piCib')
                let comment = comData
                try {
                  if (spamNotice !== null) {
                    showBanner('warning', 'Spam erkannt', 'IAC 2.0 muss etwas langsamer kommentieren.', 'spam-notice', true)
                    log.warn("Instagram detected spam, commenting slower")
                    await page.keyboard.press('Enter');
                    await page.waitForTimeout(2000)
                  }
                  else {
                    await page.click('textarea.x1i0vuye')
                    const inputValue = await page.$eval('textarea.x1i0vuye', el => el.value);
                    for (let i = 0; i < inputValue.length; i++) {
                      await page.keyboard.press('Backspace')
                    }
                    await page.type('textarea.x1i0vuye', comment[i])
                    await page.keyboard.press('Enter')
                    log.info(`Posting comment: ${comment[i]}`)
                    comTime = (Math.floor(Math.random() * 100) + 5) * 1000
                    log.info(`Waiting for ${comTime} miliseconds`)
                    await page.waitForTimeout(comTime)     // TODO: Change this value to user based input -!- //
                  }
                }
                catch(TypeError) {
                  // INFO: Checks for wrong URL -!- //
                  // FIXME: Gets called when closing the page manually -!- //
                  log.warn('Wrong page link')
                  noteMessage('Falsche URL?', 'Bitte überprüfe die URL und probiere es erneut.', true)
                  showBanner('error', 'Falsche URL?', 'Bitte URL überprüfen und erneut versuchen.', 'wrong-ig-url', true)
                  document.getElementById('stop-btn').click()
                  await browser.close()
                  runMainLogic = false
                }
              }
            }
            else {
              await page.close()
              return
            }
          }
        }
        else {
          await page.waitForTimeout(75)
          for (let i = 0; i < comment.length; i++) {
            let comment = comData
            try {
              if (runMainLogic) {                                                           // TODO: Better stillRunningCheck needed -!- //
                await page.click('textarea.x1i0vuye')
                let inputValue = await page.$eval('textarea.x1i0vuye', el => el.value)               // INFO: Deletes current input
                log.info(inputValue)
                for (let i = 0; i < inputValue.length; i++) {
                  await page.keyboard.press('Backspace')
                }
                await page.type('textarea.x1i0vuye', comment[i])
                await page.keyboard.press('Enter')
                log.info(`Posting comment: ${comment[i]}`)
                if (i === (comment.length - 1)) {
                  log.info('Commenting fully completed')
                  noteMessage('Kommentieren abgeschlossen', 'IAC 2.0 hat alle Kommentare erfolgreich gepostet.', true)
                  showBanner('info', 'Kommentieren fertig', 'Das Kommentieren wurde erfolgreich abgeschlossen.', 'commenting-completed', true)
                  document.getElementById('stop-btn').click()
                  runMainLogic = false
                  await browser.close()
                }
                else {
                  comTime = (Math.floor(Math.random() * 100) + 5) * 1000
                  log.info(`Waiting for ${comTime} miliseconds`)
                  await page.waitForTimeout(comTime)     // TODO: Change this value to user based input -!- //
                }
              }
              else {
                await page.close()
                return
              }
            }
            catch(TypeError) {
              log.info(TypeError)
              log.warn('Wrong page link')
              noteMessage('Falsche URL?', 'Bitte überprüfe die URL und probiere es erneut.', true)
              showBanner('error', 'Falsche URL?', 'Bitte URL überprüfen und erneut versuchen.', 'wrong-ig-url', true)
              document.getElementById('stop-btn').click()
              runMainLogic = false
              await browser.close()
            }
          }
        }
        // commentLoop = false
        log.info('Commenting fully completed')
        noteMessage('Kommentieren abgeschlossen', 'IAC 2.0 hat alle Kommentare erfolgreich gepostet.', true)
        showBanner('info', 'Kommentieren fertig', 'Das Kommentieren wurde erfolgreich abgeschlossen.', 'commenting-completed', true)
        document.getElementById('stop-btn').click()
        runMainLogic = false
        await browser.close()
      }        
    }
  })
}