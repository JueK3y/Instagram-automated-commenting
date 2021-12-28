const Store = require('electron-store')

var today = new Date()
const store = new Store()

// Create new user with the getSaveState
function createUser(username) {
    store.set({
        uID: {
            "username": username,
            "nickname": username,
            "userID": "Test-User-ID",
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
    })
    // console.log(store.get('uID.created.time'))
}

// Update user data
function updateUser(username, nickname, pinned) {
    if (nickname == null) nickname = username
    if (pinned == null) pinned = false

    store.set({
        uID: {
            "username": username,
            "nickname": nickname,
            "userID": "Test-User-ID",
            "pinned": pinned,
            "created": {
                "date": today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear(),
                "time": today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
            },
            "verified": {
                "checked": false,
                "working": false,
            }
        }
    })
    // console.log(store.get('uID.nickname'))
}