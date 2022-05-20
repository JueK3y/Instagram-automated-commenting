// Run update check
// checkForUpdate()

function checkForUpdate() {
    let update = false
    log.info('Checking for Updates')
    if (update) {
        log.info('Update found')
        setUpdateBoolean()
    }
    else {
        log.info('No update was found')
    } 
}

