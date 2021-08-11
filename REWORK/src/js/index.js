const password = document.getElementById("password-form")
const pwImage = document.getElementById("togglePwImage")


function passwordToggle() {
  if (document.getElementById("toggle").checked) {
    password.type = "text"
    pwImage.src = "src/img/icons/" + document.body.classList + "/eye-hidden.svg"
  }
  else {
    password.type = "password"
    pwImage.src = "src/img/icons/" + document.body.classList + "/eye.svg"
  }
}