const target = require('./src/js/instagram');
// NOT PRODUCTION READY
// FIXME: NEEDS TO BE FIXED ASAP

log.info('Launching bot')

async function launchMainLogic(_url, _username, _password, _mode) {
    log.info('Bot launch successfull')

    await target.initialize(_mode)    
    await target.login(_username, _password)
    await target.validation()
    // await target.urlChange(_url)
}