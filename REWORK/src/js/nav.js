slideIn = false

const navPos = localStorage.getItem("navPos");

if (navPos) {
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