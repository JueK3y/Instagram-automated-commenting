// Run update check
checkForUpdate()

function checkForUpdate() {
    let update = false
    devLog('info', 'Checking for Updates')
    if (update) {
        devLog('info', 'Found update, installing it')
        setUpdateBoolean()
    }
}

