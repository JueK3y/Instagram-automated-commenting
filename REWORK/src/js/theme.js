const themeToDark = document.getElementById("theme-to-dark");
const themeToLight = document.getElementById("theme-to-light");

const minBtnIcon = document.getElementById("minBtnIcon");
const maxBtnIcon = document.getElementById("maxBtnIcon");
const restoreBtnIcon = document.getElementById("restoreBtnIcon");
const closeBtnIcon = document.getElementById("closeBtnIcon");
const runIcon = document.getElementById("runIcon");
const profileIcon = document.getElementById("profileIcon");
const helpIcon = document.getElementById("helpIcon");
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


function lightIcon() {
    minBtnIcon.src = "src/img/icons/light/win-min.svg";
    maxBtnIcon.src = "src/img/icons/light/win-max.svg";
    restoreBtnIcon.src = "src/img/icons/light/win-restore.svg";

    closeBtnIcon.src = "src/img/icons/light/win-close.svg";
    runIcon.src = "src/img/icons/light/run.svg";
    profileIcon.src = "src/img/icons/light/profile.svg";
    helpIcon.src = "src/img/icons/light/help.svg";
    wifiIcon.src = "src/img/icons/light/wifi/wifi-good.svg";
    settingsIcon.src = "src/img/icons/light/settings.svg";

    themeToDark.style.display = "flex"
    themeToLight.style.display = "none"

    changeColorWIFI.style.color = '#000000'
    changeColorWIFI.style.background = "none"

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
    }
    catch(err) {}
}

function darkIcon() {
    minBtnIcon.src = "src/img/icons/dark/win-min.svg";
    maxBtnIcon.src = "src/img/icons/dark/win-max.svg";
    restoreBtnIcon.src = "src/img/icons/dark/win-restore.svg";

    closeBtnIcon.src = "src/img/icons/dark/win-close.svg";
    runIcon.src = "src/img/icons/dark/run.svg";
    profileIcon.src = "src/img/icons/dark/profile.svg";
    helpIcon.src = "src/img/icons/dark/help.svg";
    wifiIcon.src = "src/img/icons/dark/wifi/wifi-good.svg";
    settingsIcon.src = "src/img/icons/dark/settings.svg";

    themeToDark.style.display = "none"
    themeToLight.style.display = "flex"

    changeColorWIFI.style.color = '#FFFFFF'
    changeColorWIFI.style.background = "none"

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