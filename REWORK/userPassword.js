const keytar = require('keytar')

const service = 'IAC 2.0'

function setPassword(username, password) {
    keytar.setPassword(service, username, password)
}

function getPassword(username) {
    const password = keytar.getPassword(service, username)
    return password
}

function deletePassword(username) {
    keytar.deletePassword(service, username)
}

a = getPassword("123")
console.log(a)