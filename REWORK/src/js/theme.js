const themeToDark = document.getElementById("theme-to-dark");
const themeToLight = document.getElementById("theme-to-light");

const minBtnIcon = document.getElementById("minBtnIcon");
const maxBtnIcon = document.getElementById("maxBtnIcon");
const restoreBtnIcon = document.getElementById("restoreBtnIcon");
const closeBtnIcon = document.getElementById("closeBtnIcon");
const runIcon = document.getElementById("runIcon");
const stopIcon = document.getElementById("stopIcon");
const wifiIcon = document.getElementById("wifi-img");
const settingsIcon = document.getElementById("settingsIcon");
const changeColorWIFI = document.getElementById("wifi")

const body = document.body;

const theme = localStorage.getItem("theme");

// Index
const infoIcon = document.getElementById("info-icon-img")
const warningIcon = document.getElementById("warning-icon-img")
const togglePw = document.getElementById("togglePwImage")
const checkboxToggle = document.getElementById("save-profile")

const addIcon = document.getElementById('addIcon')

// Settings - Nav
const helpBug = document.getElementById("help-bug")
const helpInfo = document.getElementById("help-info")
const setLang = document.getElementById("set-lang")
const setNoteOn = document.getElementById("set-note-on")
const setNoteUrg = document.getElementById("set-note-urgent")
const setNoteOff = document.getElementById("set-note-off")
const setUp = document.getElementById("set-up")
const setDow = document.getElementById("set-dow")
const setComm = document.getElementById("set-comm")
const setDev = document.getElementById("set-dev")


function lightIcon() {
    minBtnIcon.src = "src/img/icons/light/win-min.svg";
    maxBtnIcon.src = "src/img/icons/light/win-max.svg";
    restoreBtnIcon.src = "src/img/icons/light/win-restore.svg";

    closeBtnIcon.src = "src/img/icons/light/win-close.svg";
    runIcon.src = "src/img/icons/light/run.svg";
    stopIcon.src = "src/img/icons/light/stop.svg";
    $('.profileIcon').prop('src', 'src/img/icons/light/profile.svg')
    $('.helpIcon').prop('src', 'src/img/icons/light/help.svg')
    wifiIcon.src = "src/img/icons/light/wifi/wifi-good.svg";
    settingsIcon.src = "src/img/icons/light/settings.svg";

    themeToDark.style.display = "flex"
    themeToLight.style.display = "none"

    changeColorWIFI.style.color = '#000000'
    changeColorWIFI.style.background = "none"
    
    helpBug.src = "src/img/icons/light/bug.svg"
    helpInfo.src = "src/img/icons/light/info.svg"
    $('.openExternal').prop('src', 'src/img/icons/light/open-external.svg')
    setLang.src = "src/img/icons/light/translate.svg"
    setNoteOn.src = "src/img/icons/light/alert.svg"
    setNoteUrg.src = "src/img/icons/light/alert-urgent.svg"
    setNoteOff.src = "src/img/icons/light/alert-off.svg"
    setComm.src = "src/img/icons/light/comment-settings.svg"
    setDev.src = "src/img/icons/light/code.svg"
    setUp.src = "src/img/icons/light/update.svg"
    setDow.src = "src/img/icons/light/download.svg"
    $('.moreIcon').prop('src', 'src/img/icons/light/more.svg')

    ////// Banner
    infoIcon.src = "src/img/icons/dark/note-info.svg"
    warningIcon.src = "src/img/icons/dark/note-important.svg"
    $('.error-icon-img').prop('src', 'src/img/icons/dark/clear.svg')
    $('.clearIcon').prop('src', 'src/img/icons/light/clear.svg')

    try {
        if (document.getElementById("toggle").checked) {
            togglePw.src = "src/img/icons/light/eye-hidden.svg"
        }
        else { togglePw.src = "src/img/icons/light/eye.svg" }
        if (checkboxToggle.classList.contains('save-profile-dark')) {
            checkboxToggle.classList.remove('save-profile-dark')
            checkboxToggle.classList.add('save-profile-light')
        }
        $('.info').prop('src', 'src/img/icons/light/info-small.svg')
        addIcon.src = "src/img/icons/light/add.svg"
    }
    catch(err) {}
}

function darkIcon() {
    minBtnIcon.src = "src/img/icons/dark/win-min.svg";
    maxBtnIcon.src = "src/img/icons/dark/win-max.svg";
    restoreBtnIcon.src = "src/img/icons/dark/win-restore.svg";

    closeBtnIcon.src = "src/img/icons/dark/win-close.svg";
    runIcon.src = "src/img/icons/dark/run.svg";
    stopIcon.src = "src/img/icons/dark/stop.svg";
    $('.profileIcon').prop('src', 'src/img/icons/dark/profile.svg')
    $('.helpIcon').prop('src', 'src/img/icons/dark/help.svg')
    wifiIcon.src = "src/img/icons/dark/wifi/wifi-good.svg";
    settingsIcon.src = "src/img/icons/dark/settings.svg";

    themeToDark.style.display = "none"
    themeToLight.style.display = "flex"

    changeColorWIFI.style.color = '#FFFFFF'
    changeColorWIFI.style.background = "none"

    helpBug.src = "src/img/icons/dark/bug.svg"
    helpInfo.src = "src/img/icons/dark/info.svg"
    $('.openExternal').prop('src', 'src/img/icons/dark/open-external.svg')
    setLang.src = "src/img/icons/dark/translate.svg"
    setNoteOn.src = "src/img/icons/dark/alert.svg"
    setNoteUrg.src = "src/img/icons/dark/alert-urgent.svg"
    setNoteOff.src = "src/img/icons/dark/alert-off.svg"
    setComm.src = "src/img/icons/dark/comment-settings.svg"
    setDev.src = "src/img/icons/dark/code.svg"
    setUp.src = "src/img/icons/dark/update.svg"
    setDow.src = "src/img/icons/dark/download.svg"
    $('.moreIcon').prop('src', 'src/img/icons/dark/more.svg')


    ////// Banner
    infoIcon.src = "src/img/icons/light/note-info.svg"
    warningIcon.src = "src/img/icons/light/note-important.svg"
    $('.error-icon-img').prop('src', 'src/img/icons/light/clear-dark.svg')
    $('.clearIcon').prop('src', 'src/img/icons/dark/clear.svg')

    try {
        if (document.getElementById("toggle").checked) {
            togglePw.src = "src/img/icons/dark/eye-hidden.svg"
        }
        else { togglePw.src = "src/img/icons/dark/eye.svg" }
        if (checkboxToggle.classList.contains('save-profile-light')) {
            checkboxToggle.classList.remove('save-profile-light')
            checkboxToggle.classList.add('save-profile-dark')
        }
        $('.info').prop('src', 'src/img/icons/dark/info-small.svg')
        addIcon.src = "src/img/icons/dark/add.svg"
    }
    catch(err) {}
}

if (theme) {
    body.classList.add(theme);
    if (body.classList.contains("dark")) {
        darkIcon()
    }
    else {
        lightIcon()
    }
}
else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    body.classList.add("dark")
    darkIcon()
}
else {
    body.classList.add("light")
    lightIcon()
}

// Button Event Handlers
themeToDark.onclick = () => {
    localStorage.setItem("theme", "dark")
    body.classList.replace("light", "dark")
    darkIcon()
}

themeToLight.onclick = () => {
    localStorage.setItem("theme", "light")
    body.classList.replace("dark", "light")
    lightIcon()
}