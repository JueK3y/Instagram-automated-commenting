const { autoUpdater } = require("electron-updater")

// Run update check
checkForUpdate()

function checkForUpdate() {
    autoUpdater.checkForUpdatesAndNotify()
    /* let update = false
    devLog('info', 'Checking for Updates')
    if (update) {
        devLog('info', 'Update found')
        setUpdateBoolean()
    }
    else {
        devLog('info', 'No update was found')
    } */
}

