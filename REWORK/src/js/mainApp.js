const puppeteer = require('puppeteer-extra')

const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

commentLoop = false


function launchMainLogic(_url, _username, _password) {
  puppeteer.launch({ headless: false, slowMo: 100 }).then(async browser => {    // Without {} args in production
    devLog('info', 'Main logic launch successfull')
    const page = await browser.newPage()
    
    // Stealh mode checker
    /*await page.goto('https://arh.antoinevastel.com/bots/areyouheadless')
    await page.waitForTimeout(5000)
    await page.screenshot({ path: 'Stealth.png' })*/
    
    const loginURL = 'https://www.instagram.com/accounts/login/'
    let postURL = _url
    const username = _username
    const password = _password
  
    if (postURL.slice(0,4) !== 'http') {        // -!- Doesn't check, if :// is already there -!- //
      devLog('info', 'Adding https:// to URL')
      postURL = 'https://' + postURL
    }


    // Opening browser
    devLog('info', 'Opening instagram login page')
    try {
      await page.goto(loginURL, {
        waitUntil: 'networkidle0',
      })
      //browser.on('disconnected', alert("Test"))
    }
    catch (ProtocolError) {
      devLog('error', 'Failed to execute browser action')
    }
  

    // Check for cookie banner
    if (await page.$('.bIiDR') !== null) {         // -!- Shouldn't use class detection -!- //
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


    // -!- Check alert message AFTER the submit button is clicked -!- //

    // Check if data is correct
    try {
      await page.waitForSelector('#slfErrorAlert')                              // -!- Shouldn't use id detection -!- //
      devLog('warn', 'Wrong LogIn data')                                        // -!- Takes quite long -!- //
      devLog('warn', 'Instagram error message: "' + await page.$eval('#slfErrorAlert', element => element.innerHTML) + '"')     // -!- Eval is considered as unsafe -!- //
      showBanner('error', 'Falsche Eingabe', 'Bitte überprüfe die angegebenen LogIn Daten.', 'wrong-login-data', true)
      document.getElementById('stop-btn').click()
      await browser.close()
    }
    catch(TimeoutError) {
      devLog('info', 'Correct LogIn data')
      devLog('info', 'Opening ' + postURL)
      await page.goto(postURL, {
        waitUntil: 'networkidle0',
      })

      commentLoop = true
      
      // Comment loop
      while (commentLoop) {
        const commInp = await page.$('[data-testid="post-comment-text-area"]')
        const commBut = await page.$('[data-testid="post-comment-input-button"]')
        await commInp.click()
        await commInp.type('Wow 😍')
        await commBut.click()
        await page.waitForTimeout(4000)
        // commentLoop = false
      }

      await page.screenshot({ path: 'Instagram.png' })
      commentLoop = false
      await page.close()      // -!- Close twice? -!- //
    }
  })
}