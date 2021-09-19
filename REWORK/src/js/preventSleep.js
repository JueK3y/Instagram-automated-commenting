const enter = document.getElementById('start')

enter.addEventListener('click', () => {
    ipc.send('Test')
    console.log("ding gestartet")
})