// ┌─────────────────────────────────────────────────────────────────────────┐
// │ Instagram Automated Commenting 2.0                                      │
// ├─────────────────────────────────────────────────────────────────────────┤
// │ DO NOT indicate used program sections as your own.                      │
// │ DO NOT sell the software to other people under your name.               │
// │ Before further development and sale,                                    │
// │ a written agreement must be made with the manufacturer (JueK3y).        │
// │ In the event of possible damage, the user alone is liable,              │
// │ the manufacturer (JueK3y) withdraws from any legal responsibility.      │
// ├─────────────────────────────────────────────────────────────────────────┤
// │ Copyright © 2020 - 2022 by JueK3y (Julian Kennedy)                      │
// │ https://github.com/JueK3y/Instagram-automated-commenting                │
// └─────────────────────────────────────────────────────────────────────────┘

let winOpen = false
let mfaButton = false

////// Change close image on hover
document.getElementById('closeBtn').addEventListener('mouseover', function() {
  document.getElementById('closeBtnIcon').src = 'src/img/icons/dark/win-close.svg'
})
document.getElementById('closeBtn').addEventListener('mouseout', function() {
  if (body.classList.contains('light')) {
    document.getElementById('closeBtnIcon').src = 'src/img/icons/light/win-close.svg'
  }
})


////// Active line change
function showContent(type, time) {                  
  if (type === 'comment') {
    setTimeout(() => {
      $('#profile-container').fadeOut(150)
      $('#help-container').fadeOut(150)
      $('#settings-container').fadeOut(150)
    }, time)
  }
  else if (type === 'profile') {
    setTimeout(() => {
      $('#profile-container').fadeIn(150)
      $('#help-container').fadeOut(150)
      $('#settings-container').fadeOut(150)
    }, time)
  }
  else if (type === 'helpNav') {
    setTimeout(() => {
      $('#profile-container').fadeOut(150)
      $('#help-container').fadeIn(150)
      $('#settings-container').fadeOut(150)
    }, time)
  }
  else if (type === 'settings') {
    setTimeout(() => {
      $('#profile-container').fadeOut(150)
      $('#help-container').fadeOut(150)
      $('#settings-container').fadeIn(150)
    }, time)
  }
}

// TODO: Functions for later improvement -!- //
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


////// ESC Button
$(document).ready(() => {
  let locked = false
  $(document).on('keyup', (e) => {
    if (e.key === 'Escape' && ! $('#active').hasClass('comment')) {
      if (locked) return
      locked = true
      $('.comment').click()
      setTimeout(() => { locked = false }, 4000)
    }
  })
})


$(document).ready(() => {                                               // TODO: Must be modified so that button click also has a timeout -!- //
  $('body').click(function(e) {
    if ($('#active').hasClass('profile')) {
      if (! $(e.target).closest('#profile-container').length && ! $(e.target).closest('#nav-bar').length) $('.comment').click()
    }
    if ($('#active').hasClass('helpNav')) {
      // TODO: Add click detection for Small Window
      if ((! $(e.target).closest('#help-container').length && ! $(e.target).closest('#nav-bar').length)) {
        $('.comment').click()
        if (winOpen) closeSmallWin()
      }
    }
    if ($('#active').hasClass('settings')) {
      if (! $(e.target).closest('#settings-container').length && ! $(e.target).closest('#nav-bar').length) $('.comment').click()
    }
  })
})

// INFO: Comment -!- //
$(document).ready(() => {
  let locked = false
  $('.comment').click(() => {
    if (! $('#active').hasClass('comment') && $('#active').hasClass('profile')) {
      if (locked) return
      locked = true
      $('.line').animate({marginTop: '-38px', height: '55px'}, 150)
      setTimeout(() => {
        $('#active').removeAttr('id')
        $('.comment').attr('id', 'active')
        $('.line').css('margin-top', '1.5px')   
        $('.line').animate({height: '16px'}, 150)
      }, 220)
      setTimeout(() => { locked = false }, 150)
    }
    else if (! $('#active').hasClass('comment') && ($('#active').hasClass('helpNav') || $('#active').hasClass('settings'))) {
      if (winOpen) closeSmallWin()
      if (locked) return
      locked = true
      lineAnimation1('comment', 300)
      setTimeout(() => { locked = false }, 300)
    }
    showContent('comment', 220)
  }) 
  
  // INFO: Profile -!- //
  $('.profile').click(() => {
    if (! $('#active').hasClass('profile') && $('#active').hasClass('comment')) {
      if (locked) return
      locked = true
      $('.line').animate({height: '55px', marginBottom: '-55px'}, 150)
      setTimeout(() => {
        $('#active').removeAttr('id')
        $('.profile').attr('id', 'active')
        $('.line').css('margin-top', '-38px')
        $('.line').animate({marginTop: '1.5px', height: '16px'}, 150)
      }, 1)
      setTimeout(() => { locked = false }, 350)
      showContent('profile', 375)
    }
    else if (! $('#active').hasClass('profile') && ($('#active').hasClass('helpNav')) || $('#active').hasClass('settings')) {
      if (winOpen) closeSmallWin()
      if (locked) return
      locked = true
      lineAnimation1('profile', 320)
      setTimeout(() => { locked = false }, 320)
    }
  }) 
  
  // INFO: Help -!- //
  $('.helpNav').click(() => {
    if (! $('#active').hasClass('helpNav') && ($('#active').hasClass('comment')) || $('#active').hasClass('profile')) {
      if (locked) return
      locked = true
      lineAnimation2('helpNav', 1.5, 16)
      setTimeout(() => { locked = false }, 500)
    }
    else if (! $('#active').hasClass('helpNav') && $('#active').hasClass('settings')) {
      if (locked) return
      locked = true
      $('.line').animate({marginTop: '-40px', height: '40px', opacity: '0'}, 300)
      setTimeout(() => {
        $('#active').removeAttr('id')
        $('.helpNav').attr('id', 'active')
        $('.line').css('margin-top', '1.5px')   
        $('.line').animate({height: '16px', opacity: '1'}, 250)
        setTimeout(() => { locked = false }, 270)
      }, 320)
      showContent('helpNav', 320)
    }
  }) 
  
  // INFO: Settings -!- //
  $('.settings').click(() => {
    if (! $('#active').hasClass('settings') && $('#active').hasClass('comment')) {
      if (locked) return
      locked = true
      $('.line').animate({height: '40px', marginBottom: '-40px', opacity: '0'}, 250)
      setTimeout(() => {
        $('#active').removeAttr('id')
        $('.settings').attr('id', 'active')
        $('.line').css('margin-top', '-38px')
        $('.line').animate({marginTop: '5px', height: '19px', opacity: '1'}, 300)
      }, 270)
      setTimeout(() => { locked = false }, 270)
      showContent('settings', 270)
    }
    else if (! $('#active').hasClass('settings') && ($('#active').hasClass('profile') || $('#active').hasClass('helpNav'))) {
      if (winOpen) closeSmallWin()
      if (locked) return
      locked = true
      lineAnimation2('settings', 5, 19)
      setTimeout(() => { locked = false }, 600)
      // INFO: Thats... a long time -!- //
    }
  })
})


////// Navigation Sliding Animation
let slideIn = false

const navPos = localStorage.getItem('navPos')

if (navPos) {
  $('main').css('left', '47px')
  $('#side-bar').css('width', '55px')
  $('#wifi').css('width', '45px')
  $('.settings').css('width', '45px')
  $('form').css('margin-left', '0px')
  $('.second-text').css('display', 'none')
  $('.navText').css('display', 'none')
  $('#win-title-text').text('IAC 2.0').fadeIn()
  slideIn = true
}


$(document).ready(() => {
  let locked = false

  $(document).on('keyup', (e) => {
    if (e.key === 'Escape' && ! $('#active').hasClass('comment')) {
      if (locked) return
      locked = true

      $('.comment').click()
      setTimeout(() => { locked = false }, 350)
    }
  })

})

$(document).ready(function() {
  let locked = false
  $(document).on('click', '#active', function() {
    if (slideIn === false) {
      if (locked) return
      locked = true
      $('#side-bar').css('z-index', 0)
      setTimeout(function() {
        $('main').animate({left: '47px'})
        $('form').animate({marginLeft: '0px'})
        setTimeout(function() {
          $('#side-bar').css('width', '55px')
          $('#wifi').css('width', '45px')
          $('.settings').css('width', '45px')
        }, 180)
        setTimeout(function() {
          $('.second-text').css('display', 'none')
        }, 260)
        setTimeout(function() {
          $('.navText').css('display', 'none')
          $('#side-bar').css('z-index', 3)
        }, 370)
        $('#win-title-text').fadeOut(300, function() {
          $(this).text('IAC 2.0').fadeIn(150)
        })
      }, 70)
      localStorage.setItem('navPos', 'in')
      slideIn = true
      setTimeout(() => { locked = false }, 500)
    }
    else if (slideIn) {
      if (locked) return
      locked = true
      $('#side-bar').css('z-index', 0)
      setTimeout(function() {
        $('#side-bar').css('width', '320px')
        $('#wifi').css('width', '310px')
        $('.settings').css('width', '310px')
        $('.navText').css('display', 'block')
        setTimeout(function() {
          $('.second-text').css('display', 'contents')
        }, 80)
        $('main').animate({left: '312px'})
        $('form').animate({marginLeft: '-533px'})
        setTimeout(function() {
          $('#side-bar').css('z-index', 3)
        }, 400)
      }, 120)
      $('#win-title-text').fadeOut(300, function() {
        $(this).text('Instagram Automated Commenting').fadeIn(150)
      })
      localStorage.removeItem('navPos')
      slideIn = false
      setTimeout(() => { locked = false }, 500)
    }
  })
})


////// Profile content updatder
let fourOrMore
let userProfile = []

function profileUpdate() {
  displayUsername().then(result => {
    if (result.length === 0) {
      document.getElementById('profileDropdown').style.display = 'none'
    }
    else {
      document.getElementById('profileDropdown').style.display = 'block'
      if (result.length === 1 || result.length === 2) {
        $('.uid-profile-'+(result.length)).css('margin-bottom', '5px')
      }
      else if (result.length >= 4) {
        fourOrMore = true
      }
    }
    for (let i = 0; i < result.length; i++) {
      let usrnme = Object.values(result[i])[0]
      if (! document.getElementsByClassName('uid-'+usrnme).length > 0) {
        $('.uid-profile-'+(i+1)).css('display', 'flex').text(usrnme).removeClass().addClass('uid-'+usrnme)
        userProfile.push(usrnme)
      }
    }
  })
}

profileUpdate()

const profile1 = document.getElementById('profile-1-name')
const profile2 = document.getElementById('profile-2-name') 
const profile3 = document.getElementById('profile-3-name') 

const showMore = document.getElementById('more-profile').style
const addProfile = document.getElementById('add-profile').style


$(document).ready(function() {
  setTimeout(() => {
    // FIXME: Simplify? -!- //
    if (profile1.innerText !== '') {
      document.getElementById('profile-1').style.display = 'flex'
    }
    else {
      document.getElementById('profile-1').style.display = 'none'
      fourOrMore = false
    }
    if (profile2.innerText !== '') {
      document.getElementById('profile-2').style.display = 'flex'
    }
    else {
      document.getElementById('profile-2').style.display = 'none'
      fourOrMore = false
    }

    if (profile3.innerText !== '') {
      document.getElementById('profile-3').style.display = 'flex'
      showMore.display = ''
      addProfile.display = 'none'
    }
    else {
      document.getElementById('profile-3').style.display = 'none'
      fourOrMore = false
    }
    if (profile1.innerText === '' && profile2.innerText === '' && profile3.innerText === '') {
      document.getElementById('profile-container').style.top  = '27px'
    }
  }, 100)
  $(document).on('click', '#add-profile', function() {
    // TODO: Needs to be locked / fixed before release -!- //
    /*document.getElementById('profile-container').style.top  = '15px'
    if (profile1.innerText === '') {
      document.getElementById('profile-1').style.display = 'flex'
      profile1.innerText = 'Profil'
    }
    else if (profile2.innerText === '') {
      document.getElementById('profile-2').style.display = ''
      profile2.innerText = 'Profil'
    }
    else if (profile3.innerText === '') {
      document.getElementById('profile-3').style.display = ''
      profile3.innerText = 'Profil'
      showMore.display = ''
      addProfile.display = 'none'
    }*/
  })
  $(document).on('click', '#more-profile', function() {
    // TODO: Needs to be locked / added before release -!- //
    // INFO: Directs to profile page -!- //
  })
})

// TODO: Simplify -!- //
let profile1Name = ''                                                              // INFO: Get Name from JSON / API -!- //
let profile2Name = ''
let profile3Name = ''

// INFO: Set profile names -!- //
profile1.innerText = profile1Name
profile2.innerText = profile2Name
profile3.innerText = profile3Name

                                      
// INFO: Display more / add button -!- //
if (fourOrMore) {
  showMore.display = ''
  addProfile.display = 'none'
}
else {
  showMore.display = 'none'
  addProfile.display = ''
}

// INFO: Length Check -!- //
setTimeout(() => {
  if (profile1.innerText.length > 7) {
    profile1.innerText = profile1.innerText.substring(0, 4) + '...'
  } 
  
  if (profile2.innerText.length > 7) {
    profile2.innerText = profile2.innerHTML.substring(0, 4) + '...'
  }
  
  if (profile3.innerText.length > 7) {
    profile3.innerText = profile3.innerHTML.substring(0, 4) + '...'
  }
}, 300)

for (let i = 1; i <= 3; i++) {
  document.getElementById('delete-'+(i)).onmouseover = () => { document.getElementById('deleteIcon-' + i).src = 'src/img/icons/' + document.body.classList + '/delete-red.svg' }
  document.getElementById('delete-'+(i)).onmouseleave = () => { document.getElementById('deleteIcon-' + i).src = 'src/img/icons/' + document.body.classList + '/delete.svg' }
}

////// WIFI Signal Updater

const elem = document.getElementById('changeText')
const changeColor = document.getElementById('wifi')
const changeImg = document.getElementById('wifi-img')

let counter = 0
let counterDisplay = 0
showMessage = true
showConnMessage = true
let notConnected
let internetSpeed

$('#error-hide').click(() => {
  showMessage = false
  $('#error-banner').fadeOut()
  $('#error-hide').fadeOut()
})
$('#error-button-hide').click(() => {
  showConnMessage = false
  $('.wifi-not-connected').fadeOut()
  $('#error-button-hide').fadeOut()
})


window.setInterval(() => {
  const light = document.body.classList.contains('light')
  getNetworkDownloadSpeed().then(result => {
    if (result === false) {
      notConnected = true
      noWiFi = true
      internetSpeed = '- -'
    }
    else {
      notConnected = false
      noWiFi = false
      internetSpeed = result['mbps']
    }
    if (notConnected) {
      changeColor.style.color = (light) ? '#C42B1C':'#FF99A4'
      changeColor.style.background = (light) ? '#FDE7E9':'#442726'
      changeImg.src = 'src/img/icons/' + document.body.classList + '/wifi/wifi-off-colored.svg'
      if (showConnMessage) {
        showBanner('error', 'WLAN deaktiviert', 'Du benötigst eine aktive Internetverbindung.', 'wifi-not-connected', false)
        counterDisplay += 1
        if (counterDisplay === 3) {
          // TODO: Add noteMessage -!- //
          document.getElementById('error-button-hide').style.display = 'block'
        }
      }
    }
    else {
      document.getElementById('error-button-hide').style.display = 'none'
      if ($('.wifi-not-connected')[0]) {
        hideBanner('wifi-not-connected')
        log.warn('wifi-not-connected banner exists. Removing it.')
      }
      if (internetSpeed === 0) {
        noWiFi = true
        counter += 1
        changeColor.style.color = (light) ? '#C42B1C':'#FF99A4'
        changeColor.style.background = (light) ? '#FDE7E9':'#442726'
        changeImg.src = 'src/img/icons/' + document.body.classList + '/wifi/wifi-zero-colored.svg'
        if (counter === 3 && showMessage) {
          $('#error-banner-wifi').fadeIn()
          counterDisplay += 1
          // noteMessage('Langsames Internet', 'Ein langsames Netzwerk könnte IAC beeinträchtigen.')  // INFO: Spams the note center -!- //
          if (counterDisplay === 3) {
            document.getElementById('error-hide').style.display = 'block'
          }
        }
      }
      else if (internetSpeed <= 1) {
        counter = 0
        $('#error-banner-wifi').fadeOut()
        changeColor.style.color = (light) ? '#C42B1C':'#FF99A4'
        changeColor.style.background = 'none'
        changeImg.src = 'src/img/icons/' + document.body.classList + '/wifi/wifi-one-colored.svg'
      }
      else if (internetSpeed <= 5) {
        counter = 0
        $('#error-banner-wifi').fadeOut()
        changeColor.style.color = (light) ? '#C42B1C':'#FF99A4'
        changeColor.style.background = 'none'
        changeImg.src = 'src/img/icons/' + document.body.classList + '/wifi/wifi-bad-colored.svg'
      }
      else if (internetSpeed <= 10) {
        counter = 0
        $('#error-banner-wifi').fadeOut()
        changeColor.style.color = (light) ? '#9D5D00':'#FCE150'
        changeColor.style.background = 'none'
        changeImg.src = 'src/img/icons/' + document.body.classList + '/wifi/wifi-okay-colored.svg'
      }
      else if (internetSpeed > 10) {
        counter = 0
        $('#error-banner-wifi').fadeOut()
        changeColor.style.color = (light) ? '#000000':'#FFFFFF'
        changeColor.style.background = 'none'
        changeImg.src = 'src/img/icons/' + document.body.classList + '/wifi/wifi-good.svg'
      }
    }
    elem.innerHTML = internetSpeed
  })
}, 1250)


////// Update checker

////// FIXME: Needs to be re-worked -!- //
let updateOnline

function setUpdateBoolean() {
  updateOnline = true
}

const update = document.getElementById('update')
const updateFailed = document.getElementById('update-failed')
const noUpdate = document.getElementById('update-none')
const download = document.getElementById('download')
const downloadFailed = document.getElementById('download-failed')
const updateIcon = document.getElementById('set-up')

$(document).ready(function() {
  $(document).on('click', '#update', function() {
    // INFO: Check for update here -!- //
    // TODO: Add this function - checkUpdateIPC() -!- //
    updateIcon.style.transition = '3s linear'
    updateIcon.style.transform = 'rotate(720deg)'
    setTimeout(() => {
      if (counterDisplay === 3 || notConnected) {
        update.style.display = 'none'
        updateFailed.style.display = 'inline-block'
        noteMessage('Überprüfung fehlgeschlagen', 'Es wird eine aktive Internetverbindung benötigt', true)
        setTimeout(() => {
          update.style.display = 'inline-block'
          updateFailed.style.display = 'none'
          updateIcon.style.transform = 'rotate(0deg)'
        }, 3000)
      }
      else {
        // INFO: Check for new version -!- //
        if (updateOnline) {
          // INFO: Get updateOnline value from main function -!- //
          download.style.display = 'inline-block'
          update.style.display = 'none'
          settingsIcon.style.display = 'none'
          settingsUpdateIcon.style.display = 'inline-block'
          updateIcon.style.transform = 'rotate(0deg)'
          showBanner('info', 'Update gefunden', 'Es gibt eine neue Version für IAC.', 'update-found-search', true)
          noteMessage('Update für IAC', 'Es wurde eine neue Version für IAC 2.0 gefunden. Jetzt installieren?')
        }
        else {
          noUpdate.style.display = 'inline-block'
          update.style.display = 'none'
          settingsIcon.style.display = 'inline-block'
          settingsUpdateIcon.style.display = 'none'
          updateIcon.style.transform = 'rotate(0deg)'
          showBanner('info', 'Aktuelleste Version', 'Kein Update gefunden. IAC ist auf dem neusten Stand.', 'no-update-found', true)
          setTimeout(() => {
            noUpdate.style.display = 'none '
            update.style.display = ''
            settingsIcon.style.display = 'inline-block'
            settingsUpdateIcon.style.display = 'none'
          }, 3000)
        }
      }
    }, 3001)
  })                                                                          
  $(document).on('click', '#download', function() {
    // INFO: Download and install update -!- //
    // TODO: Add this function - downloadUpdateIPC() -!- //
    if (counterDisplay === 3 || notConnected) {
      noteMessage('Download fehlgeschlagen', 'Es wird eine aktive Internetverbindung benötigt', true)
      download.style.display = 'none '
      downloadFailed.style.display = 'inline-block'
      setTimeout(() => {
        downloadFailed.style.display = 'none '
        update.style.display = ''
        settingsIcon.style.display = 'inline-block'
        settingsUpdateIcon.style.display = 'none'
      }, 3000)
    }
    else {
      // Install update
      downloadSuccess = true                                                     // TODO: API check if download was successfull -!- //
      if (downloadSuccess) {
        showBanner('info', 'Update heruntergeladen', 'IAC wird jetzt geupdatet und wird ggfl. neugestartet.', 'install-update', true)
        download.style.display = 'none '
        update.style.display = 'inline-block'
        settingsIcon.style.display = 'inline-block'
        settingsUpdateIcon.style.display = 'none'
      }
      else {
        showBanner('error', 'Fehlgeschlagen', 'Die neuste Version konnte nicht heruntergeladen werden.', 'install-update-failed', true)
        noteMessage('Herunterladen fehlgeschlagen', 'Die neuste Version konnte nicht heruntergeladen werden. Probiere es manuell.', true)
        download.style.display = 'none'
        downloadFailed.style.display = 'inline-block'
        setTimeout(() => {
          downloadFailed.style.display = 'none '
          update.style.display = ''
          settingsIcon.style.display = 'inline-block'
          settingsUpdateIcon.style.display = 'none'
        }, 3000)
      }
    }
  })
})

setTimeout(() => {
  if (updateOnline) {
    download.style.display = 'inline-block'
    update.style.display = 'none'
    settingsIcon.style.display = 'none'
    settingsUpdateIcon.style.display = 'inline-block'
    showBanner('info', 'Update gefunden', 'Es gibt eine neue Version für IAC.', 'update-found-auto', true)
    noteMessage('Update für IAC', 'Es wurde eine neue Version für IAC 2.0 gefunden. Jetzt installieren?')
  }
  else {
    download.style.display = 'none'       // FIXME: Needed? -!- //
    update.style.display = ''
    settingsIcon.style.display = 'inline-block'
    settingsUpdateIcon.style.display = 'none'
  }
}, 3500)


////// Developer mode
$(document).on('click', '#developer-mode', () => {
  log.info('Opening DevTools')
  $('#developer-mode').css('display', 'none')
  $('#developer-settings').css('display', 'inline-block')
  mainLogicMode = false
  openDevConsoleIPC()
})


////// Small window
$(document).on('click', '#report-bug', () => {
  openSmallWin('template', 'src/img/icons/dark/bug.svg', 'Fehler melden', 'Falls dir ein Fehler, wie zum Beispiel ein Übersetzungs-, Anzeige oder Logikfehler aufgefallen ist, kannst du diesen hier melden. Bei Klick auf Melden wirst du auf GitHub weitergeleitet.', 'Melden', 'https://github.com/JueK3y/Instagram-automated-commenting/issues/new/choose')
})

$(document).on('click', '#info', () => {
  openSmallWin('version', 'src/img/icons/dark/info.svg', 'Instagram Automated Commenting 2.0')
})

$(document).on('click', '.small-window-close-button', () => {
  closeSmallWin()
})

$(document).on('click', '#s-w-c-b-multi-fa', () => {
  $('#small-window').css('display', 'none')
  $('#small-window-multi-fa').css('display', 'none')
  $('#stop-btn').click()
  showBanner('error', 'Fehlender 2FA Code', 'IAC 2.0 kann ohne den 2FA Code nicht kommentieren.', 'no-mfa-code', true)
  log.warn('Client error - LogIn not possible: 2FA window was closed')
})

$(document).on('click', '#s-w-m-b-multi-fa', () => {
  const mfaCode = document.getElementById('mfa-input').value
  if (mfaCode.length >= 6) {
    if (mfaCode.includes(' ')) mfaCode.replace(' ', '')
    mfaButton = true
  }
  else {
    showBanner('warning', 'Fehlender 2FA Code', 'Es wird der 6-stellige 2FA Code benötigt.', 'empty-mfa-input', true)
    log.warn('2FA Button was pressed without input')
  }
})


function closeSmallWin() {
  if (document.getElementById('small-window-multi-fa').style.display !== 'block') {
    log.info('Closing SmallWindow')
    $('#small-window').css('display', 'none')
    $('#small-window-template').css('display', 'none')
    $('#small-window-version').css('display', 'none')
    $('#small-window-multi-fa').css('display', 'none')
    winOpen = false
  }
}

function openSmallWin(type, icon, title, content, mainBtn, hyperlink) {
  log.info(`Opening SmallWindow with following values: ${type}, ${icon}, ${title}, ${content}, ${mainBtn}, ${hyperlink} `)
  $('#small-window').css('display', 'block')
  $('#small-window-template').css('display', 'none')
  $('#small-window-version').css('display', 'none')
  $('#small-window-multi-fa').css('display', 'none')
  $('#small-window-'+type).css('display', 'block')

  if (icon.contains !== 'dark' && document.body.classList.contains('dark')) {
    icon = icon.replace('light', 'dark')
  }
  else if (icon.contains !== 'light' && document.body.classList.contains('light')) {
    icon = icon.replace('dark', 'light')
  }
  $('#small-window-icon-img').prop('src', icon)
  $('#small-window-title').text(title)

  if (type === 'template') {
    $('#s-w-d-template').text(content)
      $('#s-w-m-b-template').css('display', 'block')
      $('#s-w-c-b-template').css('display', 'block')
      $('#small-window-main-href').text(mainBtn)
      if (hyperlink.length !== 0) $('#small-window-main-href').attr('href', hyperlink)
  }
  winOpen = true
}