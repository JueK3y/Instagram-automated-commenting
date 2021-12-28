const Store = require('electron-store')

var today = new Date()
const store = new Store()

function getUser() {
    const a = store.get('uID')
    console.log(a[0])
    console.log(a[2])
}

// getUser()

// Create new user with the getSaveState
function createUser(username) {
    a = store.get('uID')
    store.set('uID', a, [username])
    /*store.set(
        "uID."+username, {
            "username": username,
            "nickname": username,
            "pinned": false,
            "created": {
                "date": today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear(),
                "time": today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
            },
            "verified": {
                "checked": false,
                "working": false,
            }
        }
    )*/
}

createUser("TEST")

// Update user data
function updateUser(username, nickname, pinned, checked, working) {
    if (store.get(username) == undefined) createUser(username)
    if (nickname != null) store.set(username+'.nickname', nickname)
    if (pinned != null) store.set(username+'.pinned', pinned)
    if (checked != null) store.set(username+'.verified.checked', checked)
    if (working != null) store.set(username+'.verified.working', working)
    if (nickname == null && pinned == null && checked == null && working == null) createUser(username)
}

// Deletes user data
function deleteUser(username) {
    store.delete(username)
}