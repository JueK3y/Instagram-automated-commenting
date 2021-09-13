const notifier = require('node-notifier')

const notification = localStorage.getItem("notification");

if (notification) {
  if (notification == "noteOn") {
    document.getElementById('set-note-on').style.display = 'block'
    document.getElementById('set-note-urgent').style.display = 'none'
    document.getElementById('set-note-off').style.display = 'none'
    document.getElementById('notification-text').innerText = 'Alle'
    noteOn = true
    noteUrgent = false
    noteOff = false
  }
  else if (notification == "noteUrgent") {
    document.getElementById('set-note-on').style.display = 'none'
    document.getElementById('set-note-urgent').style.display = 'block'
    document.getElementById('set-note-off').style.display = 'none'
    document.getElementById('notification-text').innerText = "Wichtig"
    noteOn = false
    noteUrgent = true
    noteOff = false
  }
  else if (notification == "noteOff") {
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
      document.getElementById('notification-text').innerText = "Wichtig"
      noteOn = false
      noteUrgent = true
      noteOff = false
      localStorage.setItem("notification", "noteUrgent")
    }
    else if (noteUrgent) {
      document.getElementById('set-note-on').style.display = 'none'
      document.getElementById('set-note-urgent').style.display = 'none'
      document.getElementById('set-note-off').style.display = 'block'
      document.getElementById('notification-text').innerText = 'Aus'
      noteOn = false
      noteUrgent = false
      noteOff = true
      localStorage.setItem("notification", "noteOff")
    }
    else if (noteOff) {
      document.getElementById('set-note-on').style.display = 'block'
      document.getElementById('set-note-urgent').style.display = 'none'
      document.getElementById('set-note-off').style.display = 'none'
      document.getElementById('notification-text').innerText = 'Alle'
      noteOn = true
      noteUrgent = false
      noteOff = false      
      localStorage.setItem("notification", "noteOn")
    }
  })
})



function noteMessage(titleMsg, messageMsg, importantType) {
    if (noteOn) {
        notifier.notify({
          title: titleMsg,
          message: messageMsg,
          icon: 'src/img/IAC-Icon.ico',
          appID: 'Instagram Autoamted Commenting'
        })
    }
    else if (noteUrgent && importantType) {
        notifier.notify({
          title: titleMsg,
          message: messageMsg,
          icon: 'src/img/IAC-Icon.ico',
          appID: 'Instagram Autoamted Commenting'
        })
    }
}