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

    initialize: async (mode) => {
        instagram.browser = await puppeteer.launch({
            slowMo: 50,
            headless: mode,
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

        loginButton[0].click()
    },

    validation: async () => {
        await instagram.page.waitForTimeout(15000)


        /*await instagram.page.$('[data-testid="login-error-message"]')
        await instagram.page.waitForSelector('#slfErrorAlert')


        let p1 = (instagram.page.url() !== loginURL)
        let p2 = (instagram.page.waitForSelector('#slfErrorAlert'))


        const result = await Promise.race([p1,p2]) 

        log.info('Result: ' + result)
        log.info('P1: ' + p1)
        log.info('P2: ' + p2)*/


        // let promise1 = (instagram.page.url() !== loginURL);                     // Returns boolean, not promise answer (pr answer needed!)
        let promise1 = new Promise(function(resolve, reject) {
            log.info('Checking url promise')
            if (instagram.page.url() !== loginURL) {
                log.info('Promise resolved!')
                resolve();
            } else {
                log.info('Promise rejected, wrong LogIn Data?')
                reject();
            } 
        });
        let promise2 = instagram.page.$eval('#slfErrorAlert', element => element.innerHTML)
        // let promise2 = instagram.page.waitForSelector('#slfErrorAlert');        // Returns promise answer

        Promise.race([promise1, promise2]).then((result) => 
            log.info("result"),
            log.info(result),
            log.info("promise1"),
            log.info(promise1),
            log.info("promise2"),
            log.info(promise2)
        )

        /*Promise.race([promise1, promise2]).then((result) => {
            log.info(result)
            log.info(promise1)
            log.info(promise2)
            if (promise1) {
                log.info('LogIn successfull')
                log.info(instagram.page.url())
            }
            if (promise2) {
                let loginMessage = instagram.page.$eval('#slfErrorAlert', element => element.innerHTML)
                log.warn(`Client error - LogIn not possible: '${loginMessage}'`)
                // instagram.browser.close()
                return
            }
        })*/

        
        /*Promise.race([promise1, promise2]).then((result) => {
            if (result == promise1) {
                log.info("LogIn successfull")
                log.info(instagram.page.url())
            }
            else if (result == promise2) {
                let loginMessage = instagram.page.$eval('#slfErrorAlert', element => element.innerHTML)
                log.warn(`Client error - LogIn not possible: '${loginMessage}'`)
                instagram.browser.close()
                return
            }
        })*/


        /*if ((await instagram.page.url() !== loginURL) || (await instagram.page.waitForSelector('#slfErrorAlert'))) {
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
        }*/


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

    urlChange: async (postURL) => {
        log.info('Changing URL')
        if (postURL.slice(0,4) !== 'http') {        // INFO: Doesn't check, if :// is already there -!- //
            log.info('Adding https:// to URL')
            postURL = 'https://' + postURL
        }

        await instagram.page.goto(postURL, { waitUntil: 'networkidle2' })
    }
}

module.exports = instagram
