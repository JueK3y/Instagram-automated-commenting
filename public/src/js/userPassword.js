const keytar = require('keytar')

const service = 'IAC 2.0'

function setPassword(username, password) {
    keytar.setPassword(service, username, password)
    log.info('LogIn data successfully saved')
}

function displayUsername() {
    const search = keytar.findCredentials(service)
    return search.then((result) => {
        return result
    })
}

function getPassword(username) {
    const password = keytar.getPassword(service, username)
    return password.then((result) => {
        return result
    })
}

function deletePassword(username) {
    keytar.deletePassword(service, username)
}