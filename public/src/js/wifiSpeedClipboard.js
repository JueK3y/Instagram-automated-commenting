const NetworkSpeed = require('network-speed')
const { clipboard } = require('electron')
const clipboardListener = require('clipboard-event')


async function getNetworkDownloadSpeed() {
  if (!!await require('dns').promises.resolve('google.com').catch(()=>{})) {        // TODO: Timeout way to long -!- //
    const testNetworkSpeed = new NetworkSpeed()
    const baseUrl = 'https://eu.httpbin.org/stream-bytes/500000'
    const fileSizeInBytes = 500000
    const speed = await testNetworkSpeed.checkDownloadSpeed(baseUrl, fileSizeInBytes)
    return speed
  }
  else {
    return false
  }
}


async function checkClipboard() {
  return clipboard.readText()
}

clipboardListener.startListening()
clipboardListener.on('change', () => {
  log.info('change detected')
  showClipboard()
})

