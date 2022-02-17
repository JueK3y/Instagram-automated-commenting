const puppeteer = require('puppeteer-extra')

const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())


function launchMainLogic(_url, _username, _password) {
  puppeteer.launch({ headless: false, slowMo: 100 }).then(async browser => {    // Without {} args in production
    devLog('info', 'Main logic launch successfull')
    const page = await browser.newPage()
    
    // Stealh mode checker
    /*await page.goto('https://arh.antoinevastel.com/bots/areyouheadless')
    await page.waitForTimeout(5000)
    await page.screenshot({ path: 'Stealth.png' })*/
    
    // const postURL = 'https://www.instagram.com/accounts/login/'
    let postURL = _url
    const username = _username
    const password = _password
  
    if (postURL.slice(0,4) != 'http') {        // -!- Doesn't check, if :// is already there -!- //
      devLog('info', 'Adding https:// to URL')
      postURL = 'https://' + postURL
    }


    // Opening browser
    devLog('info', 'Opening ' + postURL)
    try {
      await page.goto(postURL, {
        waitUntil: 'networkidle0',
      })
      //browser.on('disconnected', alert("Test"))
    }
    catch (ProtocolError) {
      devLog('error', 'Failed to execute browser action')
    }
  

    // Check for cookie banner
    if (await page.$('.bIiDR') != null) {         // -!- Shouldn't use class detection -!- //
      devLog('info', 'Found cookie banner')
      await page.click('.bIiDR')
      // if (page.evaluate(() => document.querySelector('#scrape').innerText) == "Test")
    }
  
  
    // Waiting for LogIn load
    await page.waitForSelector('input[name="username"]')
  

    // Entering LogIn data
    await page.type('input[name="username"]', username)
    await page.type('input[name="password"]', password)
  

    // Submit LogIn data
    await page.click('[type="submit"]')

    await page.waitFor(750)

    // Check if data is correct
    if (await page.$('#slfErrorAlert') != null) {         // -!- Shouldn't use class detection -!- //
      devLog('info', 'Wrong LogIn data')
      await browser.close()
      showBanner('error', 'Falsche Eingabe', 'Bitte überprüfe die angegebenen LogIn Daten.', 'wrong-login-data', true)
      // if (page.evaluate(() => document.querySelector('#scrape').innerText) == "Test")
    }
    else {
      await page.waitForNavigation({ waitUntil: 'networkidle0' }) // Execute when URL is changed
      await page.screenshot({ path: 'Instagram.png' })
    }
  })
}