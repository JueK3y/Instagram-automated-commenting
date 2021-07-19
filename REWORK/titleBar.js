const { ipcRenderer } = require("electron");
const maxBtn = document.getElementById('maxBtn')
const restoreBtn = document.getElementById('restoreBtn')
const ipc = ipcRenderer

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
    ipc.send('closeApp')
})