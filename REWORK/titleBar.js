const { ipcRenderer } = require("electron")

// console.warn("The window controls doesn't work in the WebDemo.")

const maxBtn = document.getElementById('maxBtn')
const restoreBtn = document.getElementById('restoreBtn')
const preventStart = document.getElementById('start-btn')
const stopPrevent = document.getElementById('stop-btn')
const ipc = ipcRenderer

/* var win = BrowserWindow.getFocusedWindow()
if(win.isFullScreen()) {
    alert("Test1")
}
else if(win.isMaximized()) {
    alert("Test2")
} */

if (botStart) {                                                                             //////  NOT FUNCTIONAL
    preventStart.addEventListener('click', () => {
        console.log("Testj12391242141")
        ipc.send('preventSleep')
    })
}

stopPrevent.addEventListener('click', () => {
    ipc.send('stopPrevent')
})

minBtn.addEventListener('click', () => {
    ipc.send('minApp')
})


ipc.on('isMaximized', () => {
    maxBtn.style.display = 'none'
    restoreBtn.style.display = 'block'
})

maxBtn.addEventListener('click', () => {
    ipc.send('maxApp')
})


ipc.on('isRestored', () => {
    maxBtn.style.display = 'block'
    restoreBtn.style.display = 'none'
})

restoreBtn.addEventListener('click', () => {
    ipc.send('restoreApp')
})

closeBtn.addEventListener('click', () => {
    if (botStart) {
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