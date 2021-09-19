const remote = require('electron').remote

const win = remote.getCurrentWindow()

document.onreadystatechange = (event) => {
    if (document.readyState == "complete") {
        handleWindowControls()
    }
}

window.onbeforeunload = (event) => {
    win.removeAllListeners()
}

function handleWindowControls() {
    document.getElementById('minBtn').addEventListener("click", event => {
        win.minimize()
    })

    document.getElementById('maxBtn').addEventListener("click", event => {
        win.maximize()
    })

    document.getElementById('restoreBtn').addEventListener("click", event => {
        win.unmaximize()
    })

    document.getElementById('closeBtn').addEventListener("click", event => {
        win.close()
    })

    toggleMaxRestoreButtons()
    win.on('maximize', toggleMaxRestoreButtons)
    win.on('unmaximize', toggleMaxRestoreButtons)

    function toggleMaxRestoreButtons() {
        if (win.isMaximized()) {
            document.body.classList.add('maximized')
        }
        else {
            document.body.classList.remove('maximized')
        }
    }
}