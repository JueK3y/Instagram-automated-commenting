//const Store = require('electron-store')
const fs = require('fs')

let today = new Date()
//const store = new Store()

/* function getUser(username) {
    if (username !== null) {
        store.get(username)
    }
}

// INFO: Create new user with the getSaveState -!- //
function createUser(username) {
    store.set(
        username, {
            "username": username,
            "nickname": username,
            "pinned": false,
            "created": {
                "date": today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear(),
                "time": today.getHours()+':'+today.getMinutes()+':'+today.getSeconds()
            },
            "verified": {
                "checked": false,
                "working": false,
            }
        }
    )
}

// INFO: Update user data -!- //
function updateUser(username, nickname, pinned, checked, working) {
    if (store.get(username) === undefined) createUser(username)
    if (nickname !== null) store.set(username+'.nickname', nickname)
    if (pinned !== null) store.set(username+'.pinned', pinned)
    if (checked !== null) store.set(username+'.verified.checked', checked)
    if (working !== null) store.set(username+'.verified.working', working)
    if (nickname === null && pinned === null && checked === null && working === null) createUser(username)
}

// INFO: Deletes user data
function deleteUser(username) {
    store.delete(username)
} */

function checkFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.access(filePath, fs.constants.F_OK, error => {
            resolve(error)
        })
    })
}



////// Get comments & path
let dirLocation;
let fileLocation;
let comData;

// INFO: Button for opening comment file -!- //
document.getElementById('edit-button').addEventListener('click', () => {
    openComments()
    // getComments()
})

// INFO: Getter for dir & file location -!-
function returnCommentPath(_dirLocation, _fileLocation) {
    dirLocation = _dirLocation
    fileLocation = _fileLocation
}

// INFO: Function for checking file & folder -!- //
function checkCommentFile() {
    getCommentsPath()
    setTimeout(() => {
        log.info('Checking for comments file path')
        if (! fs.existsSync(fileLocation)) {
            if (! fs.existsSync(dirLocation)) {
                fs.mkdirSync(dirLocation)
            }
            fs.writeFileSync(fileLocation, '! Write only one comment per line. Comments with \'!\' at the beginning will be ignored.')
        }
    }, 50)
}

// Function for opening comment file
function openComments() {
    log.info('Opening comments file')
    checkCommentFile()
    setTimeout(() => {
        openCommentFile(fileLocation)
    }, 50)
}

function getComments() {
    let pureData = []
    comData = []
    checkCommentFile()
    log.info('Reading content from comment file')
    setTimeout(() => {
        fs.readFile(fileLocation, 'utf-8', (err, data) => {
            if (err) log.error(`The following error occured: ${err}`)
            pureData = data.split('\n')
            for (let i = 0; i < pureData.length; i++) {
                if (pureData[i].charAt(0) !== '!') {
                    if (pureData[i].length !== 0) comData.push(pureData[i])
                }
            }
        })
    }, 50)
}