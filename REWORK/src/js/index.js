////// Active line change

// Functions for later improvement
function commentAnimation() {
  $('.line').animate({marginTop: '-40px', height: '40px', opacity: '0'}, 300)
  setTimeout(() => {
    $('#active').removeAttr('id')
    $('.comment').attr('id', 'active')
    $('.line').css('margin-top', '1.5px')   
    $('.line').animate({height: '16px', opacity: '1'}, 250)
  }, 320)
}

function profileAnimation() {
  $('.line').animate({marginTop: '-40px', height: '40px', opacity: '0'}, 300)
  setTimeout(() => {
    $('#active').removeAttr('id')
    $('.profile').attr('id', 'active')
    $('.line').css('margin-top', '1.5px')   
    $('.line').animate({height: '16px', opacity: '1'}, 250)
  }, 320)
}

function helpAnimation() {
  $('.line').animate({height: '40px', marginBottom: '-40px', opacity: '0'}, 250)
  setTimeout(() => {
    $('#active').removeAttr('id')
    $('.help-tab').attr('id', 'active')
    $('.line').css('margin-top', '-38px')
    $('.line').animate({marginTop: '1.5px', height: '16px', opacity: '1'}, 300)
  }, 270)
}

function settingsAnimation() {
  $('.line').animate({height: '40px', marginBottom: '-40px', opacity: '0'}, 250)
  setTimeout(() => {
    $('#active').removeAttr('id')
    $('.settings').attr('id', 'active')
    $('.line').css('margin-top', '-38px')
    $('.line').animate({marginTop: '5px', height: '19px', opacity: '1'}, 300)
  }, 270)
}

// Comment 
$('.comment').click(() => {
  if (! $('#active').hasClass('comment') && $('#active').hasClass('profile')) {
    $('.line').animate({marginTop: '-38px', height: '55px'}, 200)
    setTimeout(() => {
      $('#active').removeAttr('id')
      $('.comment').attr('id', 'active')
      $('.line').css('margin-top', '1.5px')   
      $('.line').animate({height: '16px'}, 200)
    }, 220)
  }
  else if (! $('#active').hasClass('comment') && ($('#active').hasClass('help-tab') || $('#active').hasClass('settings'))) {
    commentAnimation()
  }
}) 

// Profile 
$('.profile').click(() => {
  if (! $('#active').hasClass('profile') && $('#active').hasClass('comment')) {
    $('.line').animate({height: '55px', marginBottom: '-55px'}, 200)
    setTimeout(() => {
      $('#active').removeAttr('id')
      $('.profile').attr('id', 'active')
      $('.line').css('margin-top', '-38px')
      $('.line').animate({marginTop: '1.5px', height: '16px'}, 200)
    }, 1)
  }
  else if (! $('#active').hasClass('profile') && ($('#active').hasClass('help-tab')) || $('#active').hasClass('settings')) {
    profileAnimation()
  }
}) 

// Help 
$('.help-tab').click(() => {
  if (! $('#active').hasClass('help-tab') && ($('#active').hasClass('comment')) || $('#active').hasClass('profile')) {
    helpAnimation()
  }
  else if (! $('#active').hasClass('help-tab') && $('#active').hasClass('settings')) {
    $('.line').animate({marginTop: '-40px', height: '40px', opacity: '0'}, 300)
    setTimeout(() => {
      $('#active').removeAttr('id')
      $('.help-tab').attr('id', 'active')
      $('.line').css('margin-top', '1.5px')   
      $('.line').animate({height: '16px', opacity: '1'}, 250)
    }, 320)
  }
}) 

// Settings 
$('.settings').click(() => {
  if (! $('#active').hasClass('settings') && $('#active').hasClass('comment')) {
    $('.line').animate({height: '40px', marginBottom: '-40px', opacity: '0'}, 250)
    setTimeout(() => {
      $('#active').removeAttr('id')
      $('.settings').attr('id', 'active')
      $('.line').css('margin-top', '-38px')
      $('.line').animate({marginTop: '5px', height: '19px', opacity: '1'}, 300)
    }, 270)
  }
  else if (! $('#active').hasClass('settings') && ($('#active').hasClass('profile') || $('#active').hasClass('help-tab'))) {
    settingsAnimation()
  }
}) 



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

errorCode = ['form-empty', 'url-empty', 'url-too-short', 'wrong-url', 'username-empty', 'wrong-username', 'password-empty', 'password-too-short']
specialChar = [' ', '!', '"', '#', '$', '%', '&', '"', '(', ')', '*', '+', ',', '/', ':', ';', '<', '=', '>', '?', '@', '[', ']', '^', '`', '{', '|', '}', '~', '§', '°', 'ß']
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
validate = false

const urlInput = document.getElementById('url-input')
const username = document.getElementById('username-form')

$('#start-btn').click(function() {
  hideBanner("error")                                                                                                            // Looks weird for the same error
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
  else if (! urlInput.value.includes('instagram.')) {                                                                       // Change this value if needed
    showBanner('warning', 'Falsche URL', 'Sicher, dass es sich hierbei um einen Instagram Post handelt?', errorCode[3], true)
    formError(urlInput)
  }
  else if (username.value == "") {
    showBanner('warning', 'Kein Benutzername', 'Bitte gib den Benutzername an.', errorCode[4], true)
    formError(username)
  }
  else if (specialCharCheck(username.value)) {
    showBanner('warning', 'Falscher Eingabe', 'Dein Benutzername kann keine Sonderzeichen beinhalten.', errorCode[5], true)
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
    $('#stop-btn').css('display', 'block')
  }
});

$('#stop-btn').click(function() {
  $('#stop-btn').css('display', 'none')
});