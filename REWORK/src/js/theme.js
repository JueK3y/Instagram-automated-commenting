const IDs = ["minBtnIcon", "maxBtnIcon", "restoreBtnIcon", "closeBtnIcon", "idleIcon", "runIcon", "pauseIcon", "wifi-img", "settingsIcon", "help-bug", "help-info", "set-lang", "set-note-on", "set-note-urgent", "set-note-off", "set-up", "set-up-failed", "set-up-none", "set-dow", "set-dow-failed", "set-comm", "set-dev", "addIcon", "profileDropdownImage", "profileDropdownImageNoFocus", "deleteIcon-1", "deleteIcon-2", "deleteIcon-3"]

const themeToDark = document.getElementById("theme-to-dark")
const themeToLight = document.getElementById("theme-to-light")

const changeColorWIFI = document.getElementById("wifi")
const togglePw = document.getElementById("togglePwImage")
const checkboxToggle = document.getElementById("save-profile")
const infoIcon = document.getElementById("info-icon-img")
const warningIcon = document.getElementById("warning-icon-img")

const body = document.body

const theme = localStorage.getItem("theme")


function lightIcon() {
    for (let i = 0; i < IDs.length; i++) {
        document.getElementById(IDs[i]).src = document.getElementById(IDs[i]).currentSrc.replace("dark", "light")
    }

    $('.profileIcon').prop('src', 'src/img/icons/light/profile.svg')
    $('.deleteProfileIcon').prop('src', 'src/img/icons/light/delete.svg')
    $('.helpIcon').prop('src', 'src/img/icons/light/help.svg')

    themeToDark.style.display = "flex"
    themeToLight.style.display = "none"

    changeColorWIFI.style.color = '#000000'
    changeColorWIFI.style.background = "none"

    $('.openExternal').prop('src', 'src/img/icons/light/open-external.svg')

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
    }
    catch (err) { }
}

function darkIcon() {
    for (let i = 0; i < IDs.length; i++) {
        document.getElementById(IDs[i]).src = document.getElementById(IDs[i]).currentSrc.replace("light", "dark")
    }

    $('.profileIcon').prop('src', 'src/img/icons/dark/profile.svg')
    $('.deleteProfileIcon').prop('src', 'src/img/icons/dark/delete.svg')
    $('.helpIcon').prop('src', 'src/img/icons/dark/help.svg')

    themeToDark.style.display = "none"
    themeToLight.style.display = "flex"

    changeColorWIFI.style.color = '#FFFFFF'
    changeColorWIFI.style.background = "none"

    $('.openExternal').prop('src', 'src/img/icons/dark/open-external.svg')
    $('.moreIcon').prop('src', 'src/img/icons/dark/more.svg')

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
    }
    catch (err) { }
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