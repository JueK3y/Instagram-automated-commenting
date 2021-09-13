////// Active line change

function showContent(type, time) {                  
  if (type == 'comment') {
    setTimeout(() => {
      $('#profile-container').fadeOut(150)
      $('#help-container').fadeOut(150)
      $('#settings-container').fadeOut(150)
    }, time)
  }
  else if (type == 'profile') {
    setTimeout(() => {
      $('#profile-container').fadeIn(150)
      $('#help-container').fadeOut(150)
      $('#settings-container').fadeOut(150)
    }, time)
  }
  else if (type == 'helpNav') {
    setTimeout(() => {
      $('#profile-container').fadeOut(150)
      $('#help-container').fadeIn(150)
      $('#settings-container').fadeOut(150)
    }, time)
  }
  else if (type == 'settings') {
    setTimeout(() => {
      $('#profile-container').fadeOut(150)
      $('#help-container').fadeOut(150)
      $('#settings-container').fadeIn(150)
    }, time)
  }
}

// Functions for later improvement
function lineAnimation1(type, time) {
  $('.line').animate({marginTop: '-40px', height: '40px', opacity: '0'}, 300)
  setTimeout(() => {
    $('#active').removeAttr('id')
    $('.' + type).attr('id', 'active')
    $('.line').css('margin-top', '1.5px')   
    $('.line').animate({height: '16px', opacity: '1'}, 250)
  }, 320)
  showContent(type, time)
}

function lineAnimation2(type, marPx, heiPx) {
  $('.line').animate({ marginBottom: '-40px', height: '40px', opacity: '0'}, 250)
  setTimeout(() => {
    $('#active').removeAttr('id')
    $('.' + type).attr('id', 'active')
    $('.line').css('margin-top', '-38px')
    $('.line').animate({marginTop: marPx, height: heiPx, opacity: '1'}, 300)
  }, 270)
  showContent(type, 270)
}


// ESC Button
$(document).on('keyup', function(e) {
  if (e.key == "Escape" && ! $('#active').hasClass('comment')) $('.comment').click()
});

// Comment 
$('.comment').click(() => {
  if (! $('#active').hasClass('comment') && $('#active').hasClass('profile')) {
    $('.line').animate({marginTop: '-38px', height: '55px'}, 150)
    setTimeout(() => {
      $('#active').removeAttr('id')
      $('.comment').attr('id', 'active')
      $('.line').css('margin-top', '1.5px')   
      $('.line').animate({height: '16px'}, 150)
    }, 220)
  }
  else if (! $('#active').hasClass('comment') && ($('#active').hasClass('helpNav') || $('#active').hasClass('settings'))) {
    lineAnimation1('comment', 300)
  }
  showContent('comment', 220)
}) 

// Profile 
$('.profile').click(() => {
  if (! $('#active').hasClass('profile') && $('#active').hasClass('comment')) {
    $('.line').animate({height: '55px', marginBottom: '-55px'}, 150)
    setTimeout(() => {
      $('#active').removeAttr('id')
      $('.profile').attr('id', 'active')
      $('.line').css('margin-top', '-38px')
      $('.line').animate({marginTop: '1.5px', height: '16px'}, 150)
    }, 1)
    showContent('profile', 150)
  }
  else if (! $('#active').hasClass('profile') && ($('#active').hasClass('helpNav')) || $('#active').hasClass('settings')) {
    lineAnimation1('profile', 320)
  }
}) 

// Help 
$('.helpNav').click(() => {
  if (! $('#active').hasClass('helpNav') && ($('#active').hasClass('comment')) || $('#active').hasClass('profile')) {
    lineAnimation2('helpNav', 1.5, 16)
  }
  else if (! $('#active').hasClass('helpNav') && $('#active').hasClass('settings')) {
    $('.line').animate({marginTop: '-40px', height: '40px', opacity: '0'}, 300)
    setTimeout(() => {
      $('#active').removeAttr('id')
      $('.helpNav').attr('id', 'active')
      $('.line').css('margin-top', '1.5px')   
      $('.line').animate({height: '16px', opacity: '1'}, 250)
    }, 320)
    showContent('helpNav', 320)
  }
}) 

// Settings 
$('.settings').click(() => {
  if (! $('#active').hasClass('settings') && $('#active').hasClass('comment')) {
    $('.line').animate({height: '40px', marginBottom: '-40px', opacity: '0'}, 250)
    setTimeout(() => {
      $('#active').removeAttr('id')
      $('.settings').attr('id', 'active')
      $('.line').css('margin-top', '-38px')
      $('.line').animate({marginTop: '5px', height: '19px', opacity: '1'}, 300)
    }, 270)
    showContent('settings', 270)
  }
  else if (! $('#active').hasClass('settings') && ($('#active').hasClass('profile') || $('#active').hasClass('helpNav'))) {
    lineAnimation2('settings', 5, 19)
  }
}) 


////// Navigation Sliding Animation

slideIn = false

const navPos = localStorage.getItem("navPos");

if (navPos) {
  $("main").css('left', '47px')
  $("#side-bar").css('width', '55px')
  $("#wifi").css('width', '45px')
  $(".settings").css('width', '45px')
  $("form").css('margin-left', '0px')
  $(".second-text").css('display', 'none');
  $(".navText").css('display', 'none');
  $('#win-title-text').text('IAC 2.0').fadeIn()
  slideIn = true
}

$(document).ready(function() {
  $(document).on('click', '#active', function() {
    if (slideIn == false) {
      $("#side-bar").css('z-index', 0);
      setTimeout(function() {
        $("main").animate({left: '47px'})
        $("form").animate({marginLeft: '0px'})
        setTimeout(function() {
          $("#side-bar").css('width', '55px')
          $("#wifi").css('width', '45px')
          $(".settings").css('width', '45px')
        }, 180)
        setTimeout(function() {
          $(".second-text").css('display', 'none');
        }, 260)
        setTimeout(function() {
          $(".navText").css('display', 'none');
          $("#side-bar").css('z-index', 3);
        }, 370)
        $('#win-title-text').fadeOut(300, function() {
          $(this).text('IAC 2.0').fadeIn(150);
        });
      }, 70)
      localStorage.setItem("navPos", "in")
      slideIn = true
    }
    else if (slideIn) {
      $("#side-bar").css('z-index', 0);
      setTimeout(function() {
        $("#side-bar").css('width', '320px')
        $("#wifi").css('width', '310px')
        $(".settings").css('width', '310px')
        $(".navText").css('display', 'block');
        setTimeout(function() {
          $(".second-text").css('display', 'contents');
        }, 80)
        $("main").animate({left: '312px'})
        $("form").animate({marginLeft: '-533px'})
        setTimeout(function() {
          $("#side-bar").css('z-index', 3);
        }, 400)
      }, 120)
      $('#win-title-text').fadeOut(300, function() {
        $(this).text('Instagram Automated Commenting').fadeIn(150);
      });
      localStorage.removeItem("navPos")
      slideIn = false
    }
  })
})



////// Profile content updatder

threeOrMore = true                                                            // API checks if there are more than 3 profiles

if (threeOrMore) {
  document.getElementById('more-profile').style.display = ''
  document.getElementById('add-profile').style.display = 'none'
}
else {
  document.getElementById('more-profile').style.display = 'none'
  document.getElementById('add-profile').style.display = ''
}

const profileOne = document.getElementById('profile-1-name')
const profileTwo = document.getElementById('profile-2-name') 
const profileThree = document.getElementById('profile-3-name') 

if (profileOne.innerText.length > 16) {
  profileOne.innerText = profileOne.innerText.substring(0, 14) + " ..."
} 

if (profileTwo.innerText.length > 16) {
  profileTwo.innerText = profileTwo.innerHTML.substring(0, 14) + " ..."
} 

if (profileThree.innerText.length > 16) {
  profileThree.innerText = profileThree.innerHTML.substring(0, 14) + " ..."
} 



////// WIFI Signal Updater

const elem = document.getElementById("changeText")
const changeColor = document.getElementById("wifi")
const changeImg = document.getElementById("wifi-img")

var counter = 0
var counterDisplay = 0
showMessage = true
notConnected = false                                                       // notConnected check from API


$("#error-hide").click(() => {
  showMessage = false
  $("#error-banner").fadeOut()
})


window.setInterval(() => {
  const light = document.body.classList.contains("light")
  var internetSpeed = Math.floor(Math.random() * 25)                      // Is replaced with the API output
  if (notConnected) {                                                     // notConnected check from API
    changeColor.style.color = (light) ? '#C42B1C':'#FF99A4'
    changeColor.style.background = (light) ? '#FDE7E9':'#442726'
    changeImg.src = "src/img/icons/" + document.body.classList + "/wifi/wifi-off-colored.svg"
    showBanner('error', 'WLAN deaktiviert', 'Du benötigst eine aktive Internetverbindung.', 'wifi-not-connected', false)
    // noteMessage("WLAN deaktiviert", "Für IAC 2.0 brauchst du eine aktive Internetverbindung")  // Spams the note center
  }
  else if ($('.wifi-not-connected')[0]) {
    hideBanner('wifi-not-connected')
    console.warn("wifi-not-connected banner exists. Removing it.")
  }
  if (internetSpeed == 0) {
    counter += 1
    changeColor.style.color = (light) ? '#C42B1C':'#FF99A4'
    changeColor.style.background = (light) ? '#FDE7E9':'#442726'
    changeImg.src = "src/img/icons/" + document.body.classList + "/wifi/wifi-zero-colored.svg"
    if (counter == 3 && showMessage) {
      $("#error-banner-wifi").fadeIn()
      counterDisplay += 1
      if (counterDisplay == 3) {
        document.getElementById("error-hide").style.display = "block"
      }
    }
  }
  else if (internetSpeed <= 1) {
    counter = 0
    $("#error-banner-wifi").fadeOut()
    changeColor.style.color = (light) ? '#C42B1C':'#FF99A4'
    changeColor.style.background = "none"
    changeImg.src = "src/img/icons/" + document.body.classList + "/wifi/wifi-one-colored.svg"
  }
  else if (internetSpeed <= 5) {
    counter = 0
    $("#error-banner-wifi").fadeOut()
    changeColor.style.color = (light) ? '#C42B1C':'#FF99A4'
    changeColor.style.background = "none"
    changeImg.src = "src/img/icons/" + document.body.classList + "/wifi/wifi-bad-colored.svg"
  }
  else if (internetSpeed <= 15) {
    counter = 0
    $("#error-banner-wifi").fadeOut()
    changeColor.style.color = (light) ? '#9D5D00':'#FCE150'
    changeColor.style.background = "none"
    changeImg.src = "src/img/icons/" + document.body.classList + "/wifi/wifi-okay-colored.svg"
  }
  else if (internetSpeed > 15) {
    counter = 0
    $("#error-banner-wifi").fadeOut()
    changeColor.style.color = (light) ? '#000000':'#FFFFFF'
    changeColor.style.background = "none"
    changeImg.src = "src/img/icons/" + document.body.classList + "/wifi/wifi-good.svg"
  }
  elem.innerHTML = internetSpeed;
}, 1250);




////// Update checker

updateOnline = false                                                          // API checks for an update

const update = document.getElementById('update')
const updateFailed = document.getElementById('update-failed')
const download = document.getElementById('download')
const updateIcon = document.getElementById('set-up')
const updateInfo = document.getElementById('updateInfo')

newVersion = true                                                             // Check from API

$(document).ready(function() {                                                // Check for update
  $(document).on('click', '#update', function() {
    updateIcon.style.transition = '3s linear'
    updateIcon.style.transform = 'rotate(720deg)'
    setTimeout(() => {
      if (counterDisplay == 3 || notConnected) {
        update.style.display = 'none'
        updateFailed.style.display = 'inherit'
        noteMessage("Aktualisierung fehlgeschlagen", "Es wird eine aktive Internetverbindung benötigt", true)
        setTimeout(() => {
          update.style.display = 'inherit'
          updateFailed.style.display = 'none'
        }, 3000)
      }
      else {
        // Check for new version
        if (newVersion) {
          download.style.display = ''
          update.style.display = 'none'
          updateInfo.style.display = 'block'
          updateIcon.style.transform = 'rotate(0deg)'
          noteMessage("Update für IAC", "Es wurde eine neue Version für IAC 2.0 gefunden. Jetzt installieren?")
        }
      }
    }, 3001)
  })                                                                          
  $(document).on('click', '#download', function() {                             // Download and install update
    if (counterDisplay == 3 || notConnected) {
      noteMessage("Aktualisierung fehlgeschlagen", "Es wird eine aktive Internetverbindung benötigt", true)
    }
    else {
      // Install update
      downloadSuccess = true                                                     // API check if download was successfull
      if (downloadSuccess) {
        showBanner('info', 'Update heruntergeladen', 'IAC wird jetzt geupdatet und wird ggfl. neugestartet.', 'install-update', true)
        download.style.display = 'none '
        update.style.display = ''
        updateInfo.style.display = 'none'
      }
    }
  })
})

if (updateOnline) {
  download.style.display = ''
  update.style.display = 'none'
  updateInfo.style.display = 'block'
}
else {
  download.style.display = 'none'
  update.style.display = ''
  updateInfo.style.display = 'none'
}