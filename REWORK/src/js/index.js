$('#clearButton').click(function() {
  $('#url-input').val('')
  $('#url-input').focus()
});

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