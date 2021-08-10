slideIn = false
 
$(document).ready(function() {
    $("#active").click(function() {
      if (slideIn == false) {
        $("main").animate({left: '45px'})
        $("form").animate({marginLeft: '0px'})
        setTimeout(function() {
          $("#side-bar").css('width', '55px')
        }, 280)
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
        $("form").animate({marginLeft: '-533px'})
        slideIn = false
      }
    })
})


var elem = document.getElementById("changeText")
var changeColor = document.getElementById("wifi")
var changeImg = document.getElementById("wifi-img")

window.setInterval(function() {
  var text = Math.floor(Math.random() *25)
  if (text == 0) {
    changeColor.style.color = "#C42B1C"
    changeColor.style.background = "#FDE7E9"
    changeImg.src = "src/img/icons/light/wifi/wifi-zero-colored.svg"
  }
  else if (text <= 1) {
    changeColor.style.color = "#C42B1C"
    changeColor.style.background = "none"
    changeImg.src = "src/img/icons/light/wifi/wifi-one-colored.svg"
  }
  else if (text <= 5) {
    changeColor.style.color = "#C42B1C"
    changeColor.style.background = "none"
    changeImg.src = "src/img/icons/light/wifi/wifi-bad-colored.svg"
  }
  else if (text <= 15) {
    changeColor.style.color = "#9D5D00"
    changeColor.style.background = "none"
    changeImg.src = "src/img/icons/light/wifi/wifi-okay-colored.svg"
  }
  else if (text > 15) {
    changeColor.style.color = "black"
    changeColor.style.background = "none"
    changeImg.src = "src/img/icons/light/wifi/wifi-good.svg"
  }
  elem.innerHTML = text;
}, 1500);