const target = require('C:/Users/julia/Documents/Projekte/IAC 2.0/Develop/Instagram-automated-commenting/public/src/js/instagram');
// NOT PRODUCTION READY
// FIXME: NEEDS TO BE FIXED ASAP

log.info('Launching bot')

async function launchMainLogic(_url, _username, _password, _mode) {
    log.info('Bot launch successfull')

    await target.initialize()    
    await target.login(_username, _password)
    await target.validation()



    // debugger
}