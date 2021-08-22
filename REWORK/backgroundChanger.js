const { nativeTheme, BrowserWindow } = require('electron')

const darkBgColor = '#202020'
const lightBgColor = '#F9F9F9'

const window = new BrowserWindow({
    backgroundColor: nativeTheme.shouldUseDarkColors
        ? darkBgColor
        : lightBgColor
})

nativeTheme.on('updated', () => {
    const backgroundColor = nativeTheme.shouldUseDarkColors
        ? darkBgColor
        : lightBgColor
    window.setBackgroundColor(backgroundColor)
})