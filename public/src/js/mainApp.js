const target = require('./src/js/instagram');

async function launchMainLogic(_url, _username, _password, _mode) {
    log.info('Bot launch successfull')
    if (runMainLogic) await target.initialize(_mode)
    if (runMainLogic) await target.login(_username, _password)
    if (runMainLogic) await target.validation()
    if (runMainLogic) await target.urlReader(_url)
    if (runMainLogic) await target.comment(_mode, comData)
}