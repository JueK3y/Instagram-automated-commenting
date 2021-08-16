slideIn = false

const navPos = localStorage.getItem("navPos");

if (navPos) {
  $("main").css('left', '47px')
  $("#side-bar").css('width', '55px')
  $("form").css('margin-left', '0px')
  $(".second-text").css('display', 'none');
  $(".navText").css('display', 'none');
  slideIn = true
}

 
$(document).ready(function() {
    $("#active").click(function() {
      if (slideIn == false) {
        $("#side-bar").css('z-index', 0);
        setTimeout(function() {
          $("main").animate({left: '47px'})
          $("form").animate({marginLeft: '0px'})
          setTimeout(function() {
            $("#side-bar").css('width', '55px')
          }, 180)
          setTimeout(function() {
            $(".second-text").css('display', 'none');
          }, 260)
          setTimeout(function() {
            $(".navText").css('display', 'none');
            $("#side-bar").css('z-index', 3);
          }, 370)
        }, 70)
        localStorage.setItem("navPos", "in")
        slideIn = true
      }
      else if (slideIn) {
        $("#side-bar").css('z-index', 0);
        setTimeout(function() {
          $("#side-bar").css('width', '320px')
          $(".navText").css('display', 'block');
          setTimeout(function() {
            $(".second-text").css('display', 'contents');
          }, 50)
          $("main").animate({left: '312px'})
          $("form").animate({marginLeft: '-533px'})
          setTimeout(function() {
            $("#side-bar").css('z-index', 3);
          }, 400)
        }, 120)
        localStorage.removeItem("navPos")
        slideIn = false
      }
    })
})




const elem = document.getElementById("changeText")
const changeColor = document.getElementById("wifi")
const changeImg = document.getElementById("wifi-img")


/* const randomNumber = 13

var min = randomNumber - 2
var max = randomNumber + 2

function getRandomNumber(min, max) { 
  var randomNumber = Math.floor(Math.random() * (max - min) + min)
  return randomNumber
} 

alert(getRandomNumber(11, 15)) */


var counter = 0
var counterDisplay = 0
showMessage = true

$("#error-hide").click(function() {
  showMessage = false
  $("#error-banner").fadeOut(170)
})

$("#error-close").click(function() {
  $("#error-banner").fadeOut(170)
})

window.setInterval(function() {
  const light = document.body.classList.contains("light")
  var randomNumber = Math.floor(Math.random() * 25)
  if (randomNumber == 0) {
    counter += 1
    changeColor.style.color = (light) ? '#C42B1C':'#FF99A4'
    changeColor.style.background = (light) ? '#FDE7E9':'#442726'
    changeImg.src = "src/img/icons/" + document.body.classList + "/wifi/wifi-zero-colored.svg"
    if (counter == 3 && showMessage) {
      $("#error-banner").fadeIn(350)
      counterDisplay += 1
      if (counterDisplay == 3) {
        $("#error-hide").css('display', 'block')
      }
    }
  }
  else if (randomNumber <= 1) {
    counter = 0
    $("#error-banner").fadeOut()
    changeColor.style.color = (light) ? '#C42B1C':'#FF99A4'
    changeColor.style.background = "none"
    changeImg.src = "src/img/icons/" + document.body.classList + "/wifi/wifi-one-colored.svg"
  }
  else if (randomNumber <= 5) {
    counter = 0
    $("#error-banner").fadeOut()
    changeColor.style.color = (light) ? '#C42B1C':'#FF99A4'
    changeColor.style.background = "none"
    changeImg.src = "src/img/icons/" + document.body.classList + "/wifi/wifi-bad-colored.svg"
  }
  else if (randomNumber <= 15) {
    counter = 0
    $("#error-banner").fadeOut()
    changeColor.style.color = (light) ? '#9D5D00':'#FCE100'
    changeColor.style.background = "none"
    changeImg.src = "src/img/icons/" + document.body.classList + "/wifi/wifi-okay-colored.svg"
  }
  else if (randomNumber > 15) {
    counter = 0
    $("#error-banner").fadeOut()
    changeColor.style.color = (light) ? '#000000':'#FFFFFF'
    changeColor.style.background = "none"
    changeImg.src = "src/img/icons/" + document.body.classList + "/wifi/wifi-good.svg"
  }
  elem.innerHTML = randomNumber;
}, 1250);