const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')

puppeteer.use(StealthPlugin())

const loginURL = 'https://www.instagram.com/accounts/login/'

function getChromiumExecPath() {
    return puppeteer.executablePath().replace('app.asar', 'app.asar.unpacked');
}

const instagram = {
    browser: null,
    page: null,

    initialize: async () => {
        instagram.browser = await puppeteer.launch({
            slowMo: 50,
            headless: false,
            executablePath: getChromiumExecPath()
        })

        instagram.page = (await instagram.browser.pages())[0]

        log.info('Instagram initialization successful')
    },

    login: async (username, password) => {
        await instagram.page.goto(loginURL, { waitUntil: 'networkidle2' })

        let cookieButton = await instagram.page.$x('/html/body/div[4]/div/div/button[1]')

        try {
            await cookieButton[0].click()
            log.info('Cookies accepted')
        }
        catch (error) {
            log.error(error)
            log.info('Cookie banner not found')
        }
        
        // LogIn process
        let loginButton = await instagram.page.$x('//*[@id="loginForm"]/div/div[3]')

        await instagram.page.type('input[name="username"]', username, { delay: 50 })
        await instagram.page.type('input[name="password"]', password, { delay: 50 })

        await Promise.all([
            loginButton[0].click(),
            instagram.page.waitForNavigation({waitUntil: 'networkidle2'})
        ])
    },

    validation: async () => {

    if ((await instagram.page.url() !== loginURL) || (await instagram.page.waitForSelector('#slfErrorAlert'))) {
        if (await instagram.page.url() !== loginURL) {
            log.info("LogIn successfull")
            log.info(instagram.page.url())
        }
        if (await instagram.page.waitForSelector('#slfErrorAlert')) {
            let loginMessage = await instagram.page.$eval('#slfErrorAlert', element => element.innerHTML)
            log.warn(`Client error - LogIn not possible: '${loginMessage}'`)
            await instagram.browser.close()
            return
        }
    }


        
        /* let loginFailed = await page.evaluate(() => {
            if (await instagram.page.url() === loginURL) {
                let loginMessage = await instagram.page.$eval('#slfErrorAlert', element => element.innerHTML)
                log.warn(`Client error - LogIn not possible: '${loginMessage}'`)
                return true;
            }
        })

        if (loginFailed) {
            await instagram.browser.close()
            return
        } */
    },

    urlChange: async () => {

    }
}

module.exports = instagram
