const { ipcRenderer } = require("electron")

const maxBtn = document.getElementById('maxBtn')
const restoreBtn = document.getElementById('restoreBtn')
const preventStart = document.getElementById('start-btn')
const pauseButton = document.getElementById('pause-btn')
const stopPrevent = document.getElementById('stop-btn')
const ipc = ipcRenderer

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

// Close
closeBtn.addEventListener('click', () => {
    if (validate) {
        if (checkClick == 1) {
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

ipc.on('accColor', (evt, message) => {
    let color = message['Color']
    console.log('Using accent color: ' + color)
    const hex2rgb = (hex) => {
        const r = parseInt(hex.slice(1, 3), 16)
        const g = parseInt(hex.slice(3, 5), 16)
        const b = parseInt(hex.slice(5, 7), 16)
        // return {r, g, b} // return an object
        return [ r, g, b ]
    }
    let baseRGB = hex2rgb('#' + color)
    console.log(baseRGB)
    document.querySelector('body').style.setProperty('--accent-default-rgb', baseRGB)
    document.querySelector('body').style.setProperty('--accent-light-rgb', (baseRGB[0] + ',' + (baseRGB[1] + 20) + ',' + baseRGB[2]))
    document.querySelector('body').style.setProperty('--accent-dark-rgb', (baseRGB[0] + ',' + (baseRGB[1] - 35) + ',' + (baseRGB[2] - 35)))
})

// Minimize 
minBtn.addEventListener('click', () => {
    ipc.send('minApp')
})

// Maximize
ipc.on('isMaximized', () => {
    maxBtn.style.display = 'none'
    restoreBtn.style.display = 'block'
})

maxBtn.addEventListener('click', () => {
    ipc.send('maxApp')
})

// Restore
ipc.on('isRestored', () => {
    maxBtn.style.display = 'block'
    restoreBtn.style.display = 'none'
})

restoreBtn.addEventListener('click', () => {
    ipc.send('restoreApp')
})

// Blur password
ipc.on('blurPw', () => {
    document.getElementById('toggle').checked = false
    document.getElementById("password-form").type = "password"
    document.getElementById("togglePwImage").src = "src/img/icons/" + document.body.classList + "/eye.svg"
})