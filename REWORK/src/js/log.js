const log = require('electron-log')

logging('info', '--- This is the start of IAC 2.0 ---')

function logging(type, message) {
    type = type.toLowerCase()
    if (type == 'info') {
        log.info(message)
    }
    else if (type == 'warning' || type == 'warn') {
        log.warn(message)
    }
    else if (type == 'error' || type == 'err') {
        log.error(message)
    }
    else if (message == "" || message == NaN || message == null) {
        log.info(type)
    }
}