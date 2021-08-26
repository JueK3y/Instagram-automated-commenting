////// URL Clear Buttton
$('#clearButton').click(function() {
  $('#url-input').val('')
  $('#url-input').focus()
});

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

errorCode = ['form-empty', 'url-empty', 'url-too-short', 'wrong-url', 'username-empty', 'wrong-username', 'password-empty', 'password-too-short',]


// ONLY FOR DEMO VERSION
validate = false

const urlInput = document.getElementById('url-input')
const username = document.getElementById('username-form')

$('#start-btn').click(function() {
  if (urlInput.value == "" && username.value == "" && password.value == "") {
    showBanner('error', 'Keine Eingabe', 'Bitte fülle die vorgegebenen Felder aus.', 'form-empty', true)
  }
  else if (urlInput.value == "") {
    showBanner('warning', 'Keine URL', 'Bitte gib eine passende URL ein.', 'url-empty', true)
    urlInput.focus()
  }
  else if (urlInput.value.length < 16) {
    showBanner('warning', 'Falsche Eingabe', 'Sicher, dass du eine URL angegeben hast?', 'url-too-short', true)
    urlInput.focus()
  }
  else if (! urlInput.value.includes('instagram.')) {                                                               // Change this value if needed
    showBanner('warning', 'Falsche URL', 'Sicher, dass es sich hierbei um einen Instagram Post handelt?', 'wrong-url', true)
    urlInput.focus()
  }
  else if (username.value == "") {
    showBanner('warning', 'Kein Benutzername', 'Bitte gib den Benutzername an.', 'username-empty', true)
    username.focus()
  }
  else if (username.value.includes('@') || username.value.includes(':') || username.value.includes('©') || username.value.includes('<') || username.value.includes('>') || username.value.includes('€') || username.value.includes('#') || username.value.includes('+') || username.value.includes("'") || username.value.includes('*') || username.value.includes('~')) {
    showBanner('warning', 'Falscher Eingabe', 'Dein Benutzername kann keine Sonderzeichen beinhalten.', 'wrong-username', true)
    username.focus()
  }
  else if (password.value == "") {
    showBanner('warning', 'Kein Passwort', 'Bitte gib das dazugehörige Password ein.', 'password-empty', true)
    password.focus()
  }
  else if (password.value.length < 5) {
    showBanner('warning', 'Passwort zu kurz', 'Bitte überprüfe das eingegebene Passwort.', 'password-too-short', true)
    password.focus()
  }
  else {
    validate = true
    for (let i = 0; i < errorCode.length; i++) {
      alert(errorCode[i])
      hideBanner(errorCode[i])
    }
  }
  if (validate) {
    $('#stop-btn').css('display', 'block')
  }
});

$('#stop-btn').click(function() {
  $('#stop-btn').css('display', 'none')
});

