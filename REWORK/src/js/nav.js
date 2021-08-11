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



const elem = document.getElementById("changeText")
const changeColor = document.getElementById("wifi")
const changeImg = document.getElementById("wifi-img")

window.setInterval(function() {
  const light = document.body.classList.contains("light")
  var text = Math.floor(Math.random() *25)
  if (text == 0) {
    changeColor.style.color = (light) ? '#C42B1C':'#FF99A4'
    changeColor.style.background = (light) ? '#FDE7E9':'#442726'
    changeImg.src = "src/img/icons/" + document.body.classList + "/wifi/wifi-zero-colored.svg"
  }
  else if (text <= 1) {
    changeColor.style.color = (light) ? '#C42B1C':'#FF99A4'
    changeColor.style.background = "none"
    changeImg.src = "src/img/icons/" + document.body.classList + "/wifi/wifi-one-colored.svg"
  }
  else if (text <= 5) {
    changeColor.style.color = (light) ? '#C42B1C':'#FF99A4'
    changeColor.style.background = "none"
    changeImg.src = "src/img/icons/" + document.body.classList + "/wifi/wifi-bad-colored.svg"
  }
  else if (text <= 15) {
    changeColor.style.color = (light) ? '#9D5D00':'#FCE100'
    changeColor.style.background = "none"
    changeImg.src = "src/img/icons/" + document.body.classList + "/wifi/wifi-okay-colored.svg"
  }
  else if (text > 15) {
    changeColor.style.color = (light) ? '#000000':'#FFFFFF'
    changeColor.style.background = "none"
    changeImg.src = "src/img/icons/" + document.body.classList + "/wifi/wifi-good.svg"
  }
  elem.innerHTML = text;
}, 1500);