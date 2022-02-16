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