const NetworkSpeed = require('network-speed')
const { clipboard } = require('electron')


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
  // TODO: Can be done just once
}

/*getNetworkUploadSpeed();

async function getNetworkUploadSpeed() {
  const options = {
    hostname: 'www.google.com',
    port: 80,
    path: '/catchers/544b09b4599c1d0200000289',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const fileSizeInBytes = 2000000
  const speed = await testNetworkSpeed.checkUploadSpeed(options, fileSizeInBytes);
  console.log(speed);
}*/