// ┌─────────────────────────────────────────────────────────────────────────┐
// │ Instagram Automated Commenting 2.0                                      │
// ├─────────────────────────────────────────────────────────────────────────┤
// │ DO NOT indicate used program sections as your own.                      │
// │ DO NOT sell the software to other people under your name.               │
// │ Before further development and sale,                                    │
// │ a written agreement must be made with the manufacturer (JueK3y).        │
// │ In the event of possible damage, the user alone is liable,              │
// │ the manufacturer (JueK3y) withdraws from any legal responsibility.      │
// ├─────────────────────────────────────────────────────────────────────────┤
// │ Copyright © 2020 - 202 by JueK3y (Julian Kennedy)                       │
// │ https://github.com/JueK3y/Instagram-automated-commenting                │
// └─────────────────────────────────────────────────────────────────────────┘

////// URL Clear Buttton
$('#clearButton').click(function() {
  $('#url-input').val('')
  $('#url-input').focus()
})

////// Password Toggle Button
const password = document.getElementById('password-form')
const pwImage = document.getElementById('togglePwImage')

$('#toggle').on('click', () => {
  if (document.getElementById('toggle').checked) {
    password.type = 'text'
    password.focus()
    pwImage.src = 'src/img/icons/' + document.body.classList + '/eye-hidden.svg'
  }
  else {
    password.type = 'password'
    password.focus()
    pwImage.src = 'src/img/icons/' + document.body.classList + '/eye.svg'
  }
})

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
const specialChar = [' ', '!', '"', '#', '$', '%', '&', '\'', '(', ')', '*', '+', ',', '/', ':', ';', '<', '=', '>', '?', '@', '[', ']', '^', '`', '´', '\\', '{', '|', '}', '~', '§', '°', 'ß', 'ö', 'ä', 'ü']
// TODO: Does \' work? -!- //
function specialCharCheck(checkVar) {
  for (let i = 0; i < specialChar.length; i++) {
    if (checkVar.includes(specialChar[i])) {
      return true
    }
  }
}

function formError(type) {
  if (type === undefined) {
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
let validate = false

let checkClick = 0                                    // -- Is checkClick for de-activating display timeout? -- //

const urlInput = document.getElementById('url-input')
const username = document.getElementById('username-form')

urlInput.focus()

$(document).on('keyup', function(e) {
  if (e.key === 'Enter' && ($(urlInput).is(':focus') || $(username).is(':focus') || $(password).is(':focus'))) {
    if ($('#start-btn').is(':visible')) $('#start-btn').click()
    
  }
})

let pause = false
let mainLogicMode = true

$('#start-btn').click(function() {
  if (pause) {
    checkClick = 0
    pause = false
    document.getElementById('pause-btn').style.display = 'block'
    document.getElementById('runIcon').style.display = 'block'
    document.getElementById('pauseIcon').style.display = 'none'
    document.getElementById('stop-btn').style.display = 'none'
  }
  hideBanner('error')                                                                                                            // -- Looks weird for the same error -- //
  if (urlInput.value === '' && username.value === '' && password.value === '') {
    showBanner('error', 'Keine Eingabe', 'Bitte fülle die vorgegebenen Felder aus.', errorCode[0], true)
    devLog('warn', `Client error - Start of IAC 2.0 not possible: ${errorCode[0]}`)
    formError()
  }
  else if (urlInput.value === '') {
    showBanner('warning', 'Keine URL', 'Bitte gib eine passende URL ein.', errorCode[1], true)
    devLog('warn', `Client error - Start of IAC 2.0 not possible: ${errorCode[1]}`)
    formError(urlInput)
  }
  else if (urlInput.value.length < 16) {
    showBanner('warning', 'Falsche Eingabe', 'Sicher, dass du eine URL angegeben hast?', errorCode[2], true)
    devLog('warn', `Client error - Start of IAC 2.0 not possible: ${errorCode[2]}`)
    devLog('warn', `Client input was ${urlInput.value}`)
    formError(urlInput)
  }
  else if (! urlInput.value.includes('instagram.')) {                                                                             // -- Change this value if needed -- //
    showBanner('warning', 'Falsche URL', 'Sicher, dass es sich hierbei um einen Instagram Post handelt?', errorCode[3], true)
    devLog('warn', `Client error - Start of IAC 2.0 not possible: ${errorCode[3]}`)
    devLog('warn', `Client input was ${urlInput.value}`)
    formError(urlInput)
  }
  else if (username.value === '') {
    showBanner('warning', 'Kein Benutzername', 'Bitte gib den Benutzername an.', errorCode[4], true)
    devLog('warn', `Client error - Start of IAC 2.0 not possible: ${errorCode[4]}`)
    formError(username)
  }
  else if (specialCharCheck(username.value)) {
    showBanner('warning', 'Falsche Eingabe', 'Der Benutzername kann keine Sonderzeichen enthalten.', errorCode[5], true)
    devLog('warn', `Client error - Start of IAC 2.0 not possible: ${errorCode[5]}`)
    devLog('warn', `Client input was ${username.value}`)
    formError(username)
  }
  else if (password.value === '') {
    showBanner('warning', 'Kein Passwort', 'Bitte gib das dazugehörige Password ein.', errorCode[6], true)
    devLog('warn', `Client error - Start of IAC 2.0 not possible: ${errorCode[6]}`)
    formError(password)
  }
  else if (password.value.length < 5) {
    showBanner('warning', 'Passwort zu kurz', 'Bitte überprüfe das eingegebene Passwort.', errorCode[7], true)
    devLog('warn', `Client error - Start of IAC 2.0 not possible: ${errorCode[7]}`)
    formError(password)
  }
  else {
    validate = true
    for (let i = 0; i < errorCode.length; i++) {
      if ($('.' + errorCode[i])[0]) {
        hideBanner(errorCode[i])
        devLog('info', `${errorCode[i]} banner exists. Removing it`)
      }
    }
  }

  if (validate) {
    getComments()
    setTimeout(() => {
      if (comData[0] !== undefined) {
        devLog('info', 'All input is correct, launching main logic')
        document.getElementById('start-btn').style.display = 'none'
        document.getElementById('pause-btn').style.display = 'block'
        document.getElementById('stop-btn').style.display = 'block'
        document.getElementById('idleIcon').style.display = 'none'
        document.getElementById('runIcon').style.display = 'block'
        runMainLogic = true
        launchMainLogic(urlInput.value, username.value, password.value, mainLogicMode)
        if (document.getElementById('save-profile').checked) {
          devLog('info', 'Saving LogIn data')
          setPassword(username.value, password.value)
          setTimeout(() => {
            profileUpdate()
          }, 50)
          setTimeout(() => {
            // INFO: Does only work for adding one profile -!- //
            if (document.getElementById('profile-1-name').innerText !== '') {
              document.getElementById('profile-1').style.display = 'flex'
            }
            if (document.getElementById('profile-2-name').innerText !== '') {
              document.getElementById('profile-2').style.display = 'flex'
            }
            if (document.getElementById('profile-3-name').innerText !== '') {
              document.getElementById('profile-3').style.display = 'flex'
              showMore.display = ''
              addProfile.display = 'none'
            }
            // TODO: Show dropdown menu -!- //
          }, 150)
        }
        // updateUser(username.value)
        checkClick = 0
      }
      else {
        showBanner('error', 'Keine Kommentare', 'IAC 2.0 benötigt mindestens einen Kommentar.', 'zero-comments', true)
        devLog('warn', 'Client error - Start of IAC 2.0 not possible: Empty comment file')
        validate = false
        setTimeout(() => {
          openComments()
        }, 2500)
      }
    }, 100)
  }
})

$('#pause-btn').click(function() {
  checkClick = 0
  pause = true
  document.getElementById('start-btn').style.display = 'block'
  document.getElementById('pause-btn').style.display = 'none'
  document.getElementById('stop-btn').style.display = 'block'
  document.getElementById('runIcon').style.display = 'none'
  document.getElementById('pauseIcon').style.display = 'block'
  devLog('info', 'Pause button was pressed')
  // TODO: API pauses commenting -!- //
})

$('#stop-btn').click(function() {
  validate = false
  checkClick = 1
  runMainLogic = false
  hideBanner('close-while-commenting')
  document.getElementById('start-btn').style.display = 'block'
  document.getElementById('pause-btn').style.display = 'none'
  document.getElementById('stop-btn').style.display = 'none'
  document.getElementById('idleIcon').style.display = 'block'
  document.getElementById('runIcon').style.display = 'none'
  document.getElementById('pauseIcon').style.display = 'none'
  devLog('info', 'Stop button was pressed')
})

////// Profile Dropdown 
const prDdImage = document.getElementById('profileDropdownImage')
const prDdImgBlur = document.getElementById('profileDropdownImageNoFocus')

$(document).ready(() => {
  $(document).on('click', '#profileDropdownContent', function(e) {
    const clickedProfile = String(e.target.classList).slice(4)                                        // Pass ID to API and give username and password
    username.value = clickedProfile                                                                       // Get Name for ID from API
    getPassword(username.value).then(result => password.value = result)                                   // Get Password for ID from API
    prDdImage.style.display = 'block'
    prDdImgBlur.style.display = 'none'
  })
  $(document).on('click', '#profile-content', function(e) {
    let target = e.target.id
    for(let i = 0; i <= 3; i++) {
      if (target === 'profile-'+i+'-content') {
        const clickedProfile = String(document.getElementById(target).querySelector('p').classList).slice(4)
        username.value = clickedProfile                                                                       // Get Name for ID from API
        getPassword(username.value).then(result => password.value = result)                                   // Get Password for ID from API
        prDdImage.style.display = 'block'
        prDdImgBlur.style.display = 'none'
      }
      else if (target === 'profile-'+i+'-img') {
        const clickedProfile = String(document.getElementById(target).nextElementSibling.classList).slice(4)
        username.value = clickedProfile                                                                       // Get Name for ID from API
        getPassword(username.value).then(result => password.value = result)                                   // Get Password for ID from API
        prDdImage.style.display = 'block'
        prDdImgBlur.style.display = 'none'
      }
      else if (target === 'profile-'+i+'-name') {
        const clickedProfile = String(document.getElementById(target).classList).slice(4)
        username.value = clickedProfile                                                                       // Get Name for ID from API
        getPassword(username.value).then(result => password.value = result)                                   // Get Password for ID from API
        prDdImage.style.display = 'block'
        prDdImgBlur.style.display = 'none'
      }
      else if (target === 'delete-'+i) {
        const deleteUser = String(document.getElementById(target).previousElementSibling.querySelector('p').classList).slice(4)
        const deleteProfile = String(document.getElementById(target).previousElementSibling.parentElement.id)
        document.getElementById(deleteProfile).remove()
        $('.uid-'+deleteUser).remove()
        $('<a>', {
          class: 'uid-'+deleteProfile,
          text: deleteProfile.replace('profile-', 'Profil ')        // FIXME: Better fix needed -!- //
        }).appendTo('#profileDropdownContent')
        if ($('.uid-profile-1').length && $('.uid-profile-2').length && $('.uid-profile-3').length) {
          document.getElementById('profileDropdown').style.display = 'none'
        }
        document.getElementById('more-profile').style.display = 'none'
        document.getElementById('add-profile').style.display = 'block'
        index = userProfile.indexOf(deleteUser)
        userProfile.splice(index, 1)
        deletePassword(deleteUser)
      }
      else if (target === 'deleteIcon-'+i) {
        const deleteUser = String(document.getElementById(target).parentElement.previousElementSibling.querySelector('p').classList).slice(4)
        const deleteProfile = String(document.getElementById(target).parentElement.previousElementSibling.parentElement.id)
        document.getElementById(deleteProfile).remove()
        $('.uid-'+deleteUser).remove()
        $('<a>', {
          class: 'uid-'+deleteProfile,
          text: deleteProfile.replace('profile-', 'Profil ')        // FIXME: Better fix needed -!- //
        }).appendTo('#profileDropdownContent')
        if ($('.uid-profile-1').length && $('.uid-profile-2').length && $('.uid-profile-3').length) {
          document.getElementById('profileDropdown').style.display = 'none'
        }
        document.getElementById('more-profile').style.display = 'none'
        document.getElementById('add-profile').style.display = 'block'
        index = userProfile.indexOf(deleteUser)
        userProfile.splice(index, 1)
        deletePassword(deleteUser)
      }
    }
  })
})

// Image color changer
username.addEventListener('focus', function() {
  prDdImage.style.display = 'block'
  prDdImgBlur.style.display = 'none'
}, false)

username.addEventListener('blur', function() {
  if (username.value === '') {
    prDdImage.style.display = 'none'
    prDdImgBlur.style.display = 'block'
  }
}, false)

////// Serach function
$(document).on('focus', '#username-form', () => {
  $(document).on('keyup', '#username-form', () => {
    document.getElementById('searchProfileContent').style.display = 'block'
    let filter = document.getElementById('username-form').value.toUpperCase()
    for (let i = 0; i < userProfile.length; i++) {
      if (userProfile[i].toUpperCase().indexOf(filter) > -1 && filter != '') {
        if (document.getElementById('uid-'+userProfile[i]) != 0) {
          $('<a>', {
            id: 'uid-'+userProfile[i],
            text: userProfile[i]
          }).appendTo('#searchProfileContent')
        }
      }
      else {
        try {
          document.getElementById('uid-'+userProfile[i]).remove()
        }
        catch(TypeError) { }
      }
    }
  })
})

$(document).on('blur', '#username-form', () => {
  $(document).on('click', '#searchProfileContent', (e) => {
    let target = e.target.id
    if (target != 'searchProfileContent') {
      const clickedProfile = String(target).slice(4)
      username.value = clickedProfile                                                                       // Get Name for ID from API
      getPassword(username.value).then(result => password.value = result)                                   // Get Password for ID from API
      prDdImage.style.display = 'block'
      prDdImgBlur.style.display = 'none'
      document.getElementById('searchProfileContent').style.display = 'none'
    }
  })
  setTimeout(() => {
    document.getElementById('searchProfileContent').style.display = 'none'
  }, 250)
})