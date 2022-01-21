const { ipcRenderer } = require("electron")

/*async function fileSelected(e) {
    const loadedFilePath = e.target.files[0]?.path
    let data = await window.electron.ipcRenderer.invoke('read-file', loadedFilePath)
}*/

// console.warn("The window controls doesn't work in the WebDemo.")

const maxBtn = document.getElementById('maxBtn')
const restoreBtn = document.getElementById('restoreBtn')
const preventStart = document.getElementById('start-btn')
const pauseButton = document.getElementById('pause-btn')
const stopPrevent = document.getElementById('stop-btn')
const ipc = ipcRenderer

/* var win = BrowserWindow.getFocusedWindow()
if(win.isFullScreen()) {
    alert("Test1")
}
else if(win.isMaximized()) {
    alert("Test2")
} */


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