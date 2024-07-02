const commentMode = localStorage.getItem('commentMode')

if (commentMode) {
  if (commentMode === 'once') {
    document.getElementById('mod-comm-once').style.display = 'block'
    document.getElementById('mod-comm-loop').style.display = 'none'
    document.getElementById('comm-text').innerText = 'Einmalig'
    onlyOnce = true
    repeat = false
  }
  else if (commentMode === 'loop') {
    document.getElementById('mod-comm-once').style.display = 'none'
    document.getElementById('mod-comm-loop').style.display = 'block'
    document.getElementById('comm-text').innerText = 'Dauerschleife'
    onlyOnce = false
    repeat = true
  }
}
else {
  onlyOnce = true
  repeat = false
}

$(document).ready(function() {                                                    // Send notification state to API
  $(document).on('click', '#comment-mode', function() {
    if (repeat) {
        document.getElementById('mod-comm-once').style.display = 'block'
        document.getElementById('mod-comm-loop').style.display = 'none'
        document.getElementById('comm-text').innerText = 'Einmalig'
        onlyOnce = true
        repeat = false
        localStorage.setItem('commentMode', 'once')
        log.info('Changing mode to Only-Once')
    }
    else if (onlyOnce) {
        document.getElementById('mod-comm-once').style.display = 'none'
        document.getElementById('mod-comm-loop').style.display = 'block'
        document.getElementById('comm-text').innerText = 'Dauerschleife'
        onlyOnce = false
        repeat = true
        localStorage.setItem('commentMode', 'loop')
        log.info('Changing mode to Repeat')
    }
  })
})