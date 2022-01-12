// Run update check
checkForUpdate()

function checkForUpdate() {
    let update = false
    logging('info', 'Checking for Updates')
    if (update) {
        logging('info', 'Found update, installing it')
        setUpdateBoolean()
    }
}

