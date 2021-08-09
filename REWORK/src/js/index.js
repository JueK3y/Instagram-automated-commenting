slideIn = false
 
$(document).ready(function() {
    $("#active").click(function() {
      if (slideIn == false) {
        $("main").css('width', '100vw').css('width', '-=35px')
        $("main").animate({left: '45px'})
        setTimeout(function() {
          $(".navText").css('display', 'none');
        }, 500)
        slideIn = true
      }
      else if (slideIn) {
        $(".navText").css('display', 'block');
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

window.setInterval(function() {
  var text = Math.floor(Math.random() * 25)
  if (text <= 5) {
    changeColor.style.color = "red"
  }
  else if (text <= 15) {
    changeColor.style.color = "orange"
  }
  else if (text > 15) {
    changeColor.style.color = "green"
  }
  elem.innerHTML = text;
}, 2000);