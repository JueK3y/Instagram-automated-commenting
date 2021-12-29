const keytar = require('keytar')

const service = 'IAC 2.0'

function setPassword(username, password) {
    keytar.setPassword(service, username, password)
}

function displayUsername() {
    const search = keytar.findCredentials(service)
    search.then((result) => {
        for (let i = 0; i < result.length; i++) {
            usrnme = Object.values(result[i])[0]
            $('.uid-profile-'+(i+1)).text(usrnme)
            $('.uid-profile-'+(i+1)).removeClass('uid-profile-'+(i+1)).addClass('uid-'+usrnme)
        }
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