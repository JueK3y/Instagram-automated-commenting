const puppeteer = require('puppeteer-extra')

const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

let runMainLogic;
commentLoop = false

function launchMainLogic(_url, _username, _password) {
  puppeteer.launch({ headless: false, slowMo: 100 }).then(async browser => {    // Without {} args in production
    while (runMainLogic) {
      devLog('info', 'Main logic launch successfull')
      const page = (await browser.pages())[0]
      
      // Stealh mode checker
      /*await page.goto('https://arh.antoinevastel.com/bots/areyouheadless')
      await page.waitForTimeout(5000)
      await page.screenshot({ path: 'Stealth.png' })*/
      
      const loginURL = 'https://www.instagram.com/accounts/login/'
      let postURL = _url
      const username = _username
      const password = _password
    
      if (postURL.slice(0,4) !== 'http') {        // INFO: Doesn't check, if :// is already there -!- //
        devLog('info', 'Adding https:// to URL')
        postURL = 'https://' + postURL
      }
  
  
      // Opening browser
      devLog('info', 'Opening instagram login page')
      try {
        await page.goto(loginURL, {
          waitUntil: 'networkidle0',
        })
        //browser.on('disconnected', alert('Test'))
      }
      catch (ProtocolError) {
        devLog('error', 'Failed to execute browser action')
      }
    
  
      // Check for cookie banner
      if (await page.$('.bIiDR') !== null) {         // INFO: Shouldn't use class detection -!- //
        devLog('info', 'Found cookie banner')
        await page.click('.bIiDR')
      }
    
    
      // Waiting for LogIn load
      await page.waitForSelector('input[name="username"]')
    
  
      // Entering LogIn data
      await page.type('input[name="username"]', username)
      await page.type('input[name="password"]', password)
    
  
      // Submit LogIn data
      await page.click('[type="submit"]')
  
  
      // TODO: Check alert message AFTER the submit button is clicked -!- //
  
      // Check if data is correct
      try {
        await page.waitForSelector('#slfErrorAlert')                              // INFO: Shouldn't use id detection -!- //
        devLog('warn', 'Wrong LogIn data')                                        // FIXME: Takes quite long -!- //
        devLog('warn', 'Instagram error message: "' + await page.$eval('#slfErrorAlert', element => element.innerHTML) + '"')     // FIXME: Eval is considered as unsafe -!- //
        noteMessage('Falsche LogIn Daten', 'Bitte überprüfe die eingegebenen LogIn Daten und probiere es erneut.', true)
        showBanner('error', 'Falsche Eingabe', 'Bitte überprüfe die angegebenen LogIn Daten.', 'wrong-login-data', true)
        document.getElementById('stop-btn').click()
        await browser.close()
      }
      catch(TimeoutError) {
        devLog('info', 'Correct LogIn data')
        devLog('info', `Opening ${postURL}`)
        await page.goto(postURL, {
          waitUntil: 'networkidle0',
        })
  
        getComments()
        commentLoop = false
        let comment;
        setTimeout(() => {
          comment = comData
        }, 75)
  
        // Comment loop
        if (commentLoop) {
          while (commentLoop) {
            const commInp = await page.$('[data-testid="post-comment-text-area"]')
            const commBut = await page.$('[data-testid="post-comment-input-button"]')
            try {
              await commInp.click()
              await commInp.type(comment)
              await commBut.click()
              devLog('info', `Posting comment: ${comment}`)
              await page.waitForTimeout(4000)
            }
            catch(TypeError) {
              devLog('warn', 'Wrong page link')
              noteMessage('Falsche URL?', 'Bitte überprüfe die URL und probiere es erneut.', true)
              showBanner('error', 'Falsche URL', 'Die eingegebene URL muss zu einem Instagram Post führen.', 'wrong-ig-url', true)
              document.getElementById('stop-btn').click()
              await browser.close()
            }
            // commentLoop = false
          }
        }
        else {
          await page.waitForTimeout(75)
          for (let i = 0; i < comment.length; i++) {
            const commInp = await page.$('[data-testid="post-comment-text-area"]')
            const commBut = await page.$('[data-testid="post-comment-input-button"]')
            let comment = comData
            try {
              await commInp.click()
              await commInp.type(comment[i])
              await commBut.click()
              devLog('info', `Posting comment: ${comment[i]}`)
              await page.waitForTimeout(4000)
            }
            catch(TypeError) {
              devLog('warn', 'Wrong page link')
              noteMessage('Falsche URL?', 'Bitte überprüfe die URL und probiere es erneut.', true)
              showBanner('error', 'Falsche URL', 'Die eingegebene URL muss zu einem Instagram Post führen.', 'wrong-ig-url', true)
              document.getElementById('stop-btn').click()
              await browser.close()
            }
          }
        }
  
        //commentLoop = false
        await page.close()
        devLog('info', 'Commenting fully completed')
        noteMessage('Kommentieren abgeschlossen', 'IAC 2.0 hat alle Kommentare erfolgreich gepostet.', true)
        showBanner('info', 'Kommentieren fertig', 'Das Kommentieren wurde erfolgreich abgeschlossen.', 'commenting-completed', true)
        document.getElementById('stop-btn').click()
        runMainLogic = false
      }
    }
  })
}