function createBrowserWindow(URL) {
    const remote = require('electron').remote;
    const BrowserWindow = remote.BrowserWindow;
    const win = new BrowserWindow({
        height: 600,
        width: 800
    });

    win.loadURL(URL);
}