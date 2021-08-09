slideIn = false
 
$(document).ready(function() {
    $("#active").click(function() {
      if (slideIn == false) {
        $("main").css('width', '100vw').css('width', '-=35px')
        $("main").animate({left: '45px'})
        setTimeout(function() {
          $("#side-bar").css('width', '55px')
        }, 300)
        setTimeout(function() {
          $(".navText").css('display', 'none');
        }, 500)
        slideIn = true
      }
      else if (slideIn) {
        $("#side-bar").css('width', '320px')
        setTimeout(function() {
          $(".navText").css('display', 'block');
        }, 50)
        $("main").animate({left: '312px'})
        setTimeout(function() {
          $("main").css('width', '100vw').css('width', '-=312px')
        }, 400)
        slideIn = false
      }
    })
})


var elem = document.getElementById("changeText")
var changeColor = document.getElementById("wifi")
var changeImg = document.getElementById("wifi-img")

window.setInterval(function() {
  var text = Math.floor(Math.random() * 25)
  if (text <= 5) {
    changeColor.style.background = "#FDE7E9"
    changeImg.src = "/src/img/icons/wifi/wifi-bad.svg"
  }
  else if (text <= 15) {
    changeColor.style.background = "#FFF4CE"
    changeImg.src = "/src/img/icons/wifi/wifi-okay.svg"
  }
  else if (text > 15) {
    changeColor.style.background = "none"
    changeImg.src = "/src/img/icons/wifi/wifi-good.svg"
  }
  elem.innerHTML = text;
}, 2000);