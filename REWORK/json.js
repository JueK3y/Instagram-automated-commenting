const Store = require('electron-store')

const save = new Store()

save.set('color', {
    name: 'JSON Name',
    code: {
        rgb: [0, 1, 2],
        hex: '#test'
    }
})

save.get('color.name')
console.log(save.get('color.name'))