const { systemPreferences } = require("electron")

////// URL Clear Buttton
$('#clearButton').click(function() {
  $('#url-input').val('')
  $('#url-input').focus()
})

////// Password Toggle Button
const password = document.getElementById("password-form")
const pwImage = document.getElementById("togglePwImage")

function passwordToggle() {
  if (document.getElementById("toggle").checked) {
    password.type = "text"
    password.focus()
    pwImage.src = "src/img/icons/" + document.body.classList + "/eye-hidden.svg"
  }
  else {
    password.type = "password"
    password.focus()
    pwImage.src = "src/img/icons/" + document.body.classList + "/eye.svg"
  }
}

////// Stop Button toggle

// De-activated for demonstrational purpose
/*
// Program starts
$('#start-btn').click(function() {
  pgStart = true                        // Sends action to API, value name needs to be replaced with backend check value
});

if (programStarted) {                   // 'programStarted' is an backend value, as a confirm from the backend
  $('#stop-btn').fadeIn()
}

// Program stops
$('#stop-btn').click(function() {
  pgStop = true                         // Same as above
});

if (programStopped) {                   // Same as above
  $('#stop-btn').fadeOut()
} */

const errorCode = ['form-empty', 'url-empty', 'url-too-short', 'wrong-url', 'username-empty', 'wrong-username', 'password-empty', 'password-too-short']
const specialChar = [' ', '!', '"', '#', '$', '%', '&', '"', '(', ')', '*', '+', ',', '/', ':', ';', '<', '=', '>', '?', '@', '[', ']', '^', '`', '{', '|', '}', '~', '§', '°', 'ß', 'ö', 'ä', 'ü']
function specialCharCheck(checkVar) {
  for (let i = 0; i < specialChar.length; i++) {
    if (checkVar.includes(specialChar[i])) {
      return true
    }
  }
}

function formError(type) {
  if (type == undefined) {
    urlInput.classList.add('wrong-form')
    username.classList.add('wrong-form')
    password.classList.add('wrong-form')
    urlInput.focus()
    setTimeout(() => {
      urlInput.classList.remove('wrong-form')
      username.classList.remove('wrong-form')
      password.classList.remove('wrong-form')
    }, 1300)
  }
  else {
    type.classList.add('wrong-form')
    type.focus()
    setTimeout(() => {
      type.classList.remove('wrong-form')
    }, 1300)
  }
}


// ONLY FOR DEMO VERSION
var validate = false

var checkClick = 0                                    // -- Is checkClick for de-activating display timeout? -- //

const urlInput = document.getElementById('url-input')
const username = document.getElementById('username-form')

urlInput.focus()

$(document).on('keyup', function(e) {
  if (e.key == "Enter" && ($(urlInput).is(':focus') || $(username).is(':focus') || $(password).is(':focus'))) $('#start-btn').click()
})


$('#start-btn').click(function() {
  hideBanner("error")                                                                                                            // -- Looks weird for the same error -- //
  if (urlInput.value == "" && username.value == "" && password.value == "") {
    showBanner('error', 'Keine Eingabe', 'Bitte fülle die vorgegebenen Felder aus.', errorCode[0], true)
    formError()
  }
  else if (urlInput.value == "") {
    showBanner('warning', 'Keine URL', 'Bitte gib eine passende URL ein.', errorCode[1], true)
    formError(urlInput)
  }
  else if (urlInput.value.length < 16) {
    showBanner('warning', 'Falsche Eingabe', 'Sicher, dass du eine URL angegeben hast?', errorCode[2], true)
    formError(urlInput)
  }
  else if (! urlInput.value.includes('instagram.')) {                                                                             // -- Change this value if needed -- //
    showBanner('warning', 'Falsche URL', 'Sicher, dass es sich hierbei um einen Instagram Post handelt?', errorCode[3], true)
    formError(urlInput)
  }
  else if (username.value == "") {
    showBanner('warning', 'Kein Benutzername', 'Bitte gib den Benutzername an.', errorCode[4], true)
    formError(username)
  }
  else if (specialCharCheck(username.value)) {
    showBanner('warning', 'Falsche Eingabe', 'Der Benutzername kann keine Sonderzeichen enthalten.', errorCode[5], true)
    formError(username)
  }
  else if (password.value == "") {
    showBanner('warning', 'Kein Passwort', 'Bitte gib das dazugehörige Password ein.', errorCode[6], true)
    formError(password)
  }
  else if (password.value.length < 5) {
    showBanner('warning', 'Passwort zu kurz', 'Bitte überprüfe das eingegebene Passwort.', errorCode[7], true)
    formError(password)
  }
  else {
    validate = true
    for (let i = 0; i < errorCode.length; i++) {
      if ($('.' + errorCode[i])[0]) {
        hideBanner(errorCode[i])
        console.warn(errorCode[i] + " banner exists. Removing it.")                                         // Only for DEV-Mode
      }
      else {
        console.log(errorCode[i] + " couldn't be found. Good!")                                             // Only for DEV-Mode
      }
    }
  }

  if (validate) {
    document.getElementById("stop-btn").style.display = "block"
    document.getElementById("stopIcon").style.display = "block"
    document.getElementById("runIcon").style.display = "none"
    // -!- Check if saveProfile is checked -!-
    // updateUser(username.value)
    setPassword(username.value, password.value)
  }
})

$('#stop-btn').click(function() {
  validate = false
  checkClick = 0
  document.getElementById("stop-btn").style.display = "none"
  document.getElementById("stopIcon").style.display = "none"
  document.getElementById("runIcon").style.display = "block"
})

////// Edit comments
$('#edit-button').click(function() {
  startPython(5)
})

////// Profile Dropdown
const prDdImage = document.getElementById('profileDropdownImage')
const prDdImgBlur = document.getElementById('profileDropdownImageNoFocus')

$(document).ready(function() {
  $(document).on('click', '#profileDropdownContent', function(e) {
    const clickedProfile = String(e.target.classList).slice(4)                                        // Pass ID to API and give username and password
    username.value = clickedProfile                                                                       // Get Name for ID from API
    getPassword(username.value).then(result => password.value = result)                                   // Get Password for ID from API
    prDdImage.style.display = 'block'
    prDdImgBlur.style.display = 'none'
  })
  $(document).on('click', '#profile-content', function(e) {
    if (! e.target.id == '') {
      const clickedProfile = String(e.target.classList).slice(4)                                        // Pass ID to API and give username and password
      username.value = clickedProfile                                                                       // Get Name for ID from API
      getPassword(username.value).then(result => password.value = result)                                   // Get Password for ID from API
      prDdImage.style.display = 'block'
      prDdImgBlur.style.display = 'none'
    }
  })
})

// Image color changer
username.addEventListener('focus', function() {
  prDdImage.style.display = 'block'
  prDdImgBlur.style.display = 'none'
}, false)

username.addEventListener('blur', function() {
  if (username.value == '') {
    prDdImage.style.display = 'none'
    prDdImgBlur.style.display = 'block'
  }
}, false)