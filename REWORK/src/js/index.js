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


// ONLY FOR DEMO VERSION
$('#start-btn').click(function() {
  $('#stop-btn').css('display', 'block')
});

$('#stop-btn').click(function() {
  $('#stop-btn').css('display', 'none')
});