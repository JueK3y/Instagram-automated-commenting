const { ipcRenderer } = require('electron')

const maxBtn = document.getElementById('maxBtn')
const restoreBtn = document.getElementById('restoreBtn')
const preventStart = document.getElementById('start-btn')
const pauseButton = document.getElementById('pause-btn')
const stopPrevent = document.getElementById('stop-btn')
const ipc = ipcRenderer

// INFO: Get current version -!- //
ipc.on('getCurVer', (event, text) => {
    document.getElementById('currentVersion').innerText = text
    if (text.includes('alpha')) document.getElementById('verType').innerText = 'Alpha release'
    else if (text.includes('beta')) document.getElementById('verType').innerText = 'Beta release'
    else document.getElementById('verType').innerText = 'Public release'
})

// INFO: Prevent Start -!- //
preventStart.addEventListener('click', () => {
    setTimeout(() => {
        if (validate) {
            ipc.send('preventSleep')
        }
    }, 10)
})

pauseButton.addEventListener('click', () => {
    ipc.send('stopPrevent')
})

stopPrevent.addEventListener('click', () => {
    ipc.send('stopPrevent')
})


// INFO: Blur password -!- //
ipc.on('blurPw', () => {
    document.getElementById('toggle').checked = false
    document.getElementById('password-form').type = 'password'
    document.getElementById('togglePwImage').src = 'src/img/icons/' + document.body.classList + '/eye.svg'
})

////// Color theme
// INFO: Accent color -!- //
ipc.on('accColor', (evt, message) => {
    localStorage.setItem('accColor', message)
})

ipc.on('accColorChanged', (evt, message) => {
    localStorage.setItem('accColor', message)
    if (body.classList.contains('dark')) {
        darkIcon()
    }
    else {
        lightIcon()
    }
})

// INFO: System light / dark mode -!- //
ipc.on('changedToDark', () => {
    localStorage.setItem('system-theme', 'dark')
    localStorage.setItem('use-sys-theme', 'true')
    detectTheme()
})
ipc.on('changedToLight', () => {
    localStorage.setItem('system-theme', 'light')
    localStorage.setItem('use-sys-theme', 'true')
    detectTheme()
})

////// Window Action
// INFO: Close -!- //
closeBtn.addEventListener('click', () => {
    if (validate) {
        if (checkClick === 1) {
            ipc.send('closeApp')
        }
        else {
            showBanner('warning', 'IAC kommentiert', 'Sicher, dass du das Kommentieren abbrechen willst?', 'close-while-commenting', true)
            checkClick++
        }
    }
    else {
        ipc.send('closeApp')
    }
})

// INFO: Minimize -!- //
minBtn.addEventListener('click', () => {
    ipc.send('minApp')
})

// INFO: Maximize -!- //
ipc.on('isMaximized', () => {
    maxBtn.style.display = 'none'
    restoreBtn.style.display = 'block'
})

maxBtn.addEventListener('click', () => {
    ipc.send('maxApp')
})

// INFO: Restore -!- //
ipc.on('isRestored', () => {
    maxBtn.style.display = 'block'
    restoreBtn.style.display = 'none'
})

restoreBtn.addEventListener('click', () => {
    ipc.send('restoreApp')
})

// INFO: Change Min-Max Icon -!- //
ipc.on('changeWinIcon', () => {
    maxBtn.style.display = 'none'
    restoreBtn.style.display = 'block'
})


////// Open comment file
function getCommentsPath() {
    log.info('Getting comments file path')
    ipc.send('checkFile', ['dirLoc', 'fileLoc'])
    ipc.on('getFilePath', (evt, args) => {
        returnCommentPath(args[0], args[1])
    })
}

function openCommentFile(fileLocation) {
    ipc.send('openCommentFile', fileLocation)
}


////// Dev Button
function openDevConsoleIPC() {
    ipc.send('openDevConsole')
}


////// Update
ipc.on('update', (event, text) => {
    log.info('Message from updater:', text);
    if (text === 'Update available.') {
        setUpdateBoolean()
        // TODO: Add update functionallity -!- //
    }
})