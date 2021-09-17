try {
    const { ipcRenderer } = require("electron")
}
catch(err) {
    console.warn("The window controls doesn't work in the WebDemo.")
}

const maxBtn = document.getElementById('maxBtn')
const restoreBtn = document.getElementById('restoreBtn')
const ipc = ipcRenderer

/*var win = remote.BrowserWindow.getFocusedWindow()
if(win.isFullScreen()) {
    alert("Test1")
}
else if(win.isMaximized()) {
    alert("Test2")
}*/

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
    alert("Restore app")
})

restoreBtn.addEventListener('click', () => {
    ipc.send('restoreApp')
})


closeBtn.addEventListener('click', () => {
    ipc.send('closeApp')
})