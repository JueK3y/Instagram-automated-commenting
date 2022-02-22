const notifier = require('node-notifier')

// console.warn('The notification center can't be used in the WebDemo.')

const notification = localStorage.getItem('notification')

if (notification) {
  if (notification === 'noteOn') {
    document.getElementById('set-note-on').style.display = 'block'
    document.getElementById('set-note-urgent').style.display = 'none'
    document.getElementById('set-note-off').style.display = 'none'
    document.getElementById('notification-text').innerText = 'Alle'
    noteOn = true
    noteUrgent = false
    noteOff = false
  }
  else if (notification === 'noteUrgent') {
    document.getElementById('set-note-on').style.display = 'none'
    document.getElementById('set-note-urgent').style.display = 'block'
    document.getElementById('set-note-off').style.display = 'none'
    document.getElementById('notification-text').innerText = 'Wichtig'
    noteOn = false
    noteUrgent = true
    noteOff = false
  }
  else if (notification === 'noteOff') {
    document.getElementById('set-note-on').style.display = 'none'
    document.getElementById('set-note-urgent').style.display = 'none'
    document.getElementById('set-note-off').style.display = 'block'
    document.getElementById('notification-text').innerText = 'Aus'
    noteOn = false
    noteUrgent = false
    noteOff = true
  }
}
else {
  noteOn = true
  noteUrgent = false
  noteOff = false
}

$(document).ready(function() {                                                    // Send notification state to API
  $(document).on('click', '#notification', function() {
    if (noteOn) {
      document.getElementById('set-note-on').style.display = 'none'
      document.getElementById('set-note-urgent').style.display = 'block'
      document.getElementById('set-note-off').style.display = 'none'
      document.getElementById('notification-text').innerText = 'Wichtig'
      noteOn = false
      noteUrgent = true
      noteOff = false
      localStorage.setItem('notification', 'noteUrgent')
    }
    else if (noteUrgent) {
      document.getElementById('set-note-on').style.display = 'none'
      document.getElementById('set-note-urgent').style.display = 'none'
      document.getElementById('set-note-off').style.display = 'block'
      document.getElementById('notification-text').innerText = 'Aus'
      noteOn = false
      noteUrgent = false
      noteOff = true
      localStorage.setItem('notification', 'noteOff')
    }
    else if (noteOff) {
      document.getElementById('set-note-on').style.display = 'block'
      document.getElementById('set-note-urgent').style.display = 'none'
      document.getElementById('set-note-off').style.display = 'none'
      document.getElementById('notification-text').innerText = 'Alle'
      noteOn = true
      noteUrgent = false
      noteOff = false      
      localStorage.setItem('notification', 'noteOn')
    }
  })
})


function noteMessage(messageTitle, messageText, importantType) {
    if (noteOn) {
        notifier.notify({
          title: messageTitle,
          message: messageText,
          icon: 'src/img/IAC-Icon.ico',
          appID: 'Instagram Autoamted Commenting'
        },
        function (error) {
          devLog('err', error)
        })
    }
    else if (noteUrgent && importantType) {
        notifier.notify({
          title: messageTitle,
          message: messageText,
          icon: 'src/img/IAC-Icon.ico',
          appID: 'Instagram Autoamted Commenting'
        },
        function (error) {
          devLog('err', error)
        })
    }
}