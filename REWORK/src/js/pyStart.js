function logicStart(url, uID, pw, cSave) {

    let {PythonShell} = require('python-shell')

    let options = {
        scriptPath: './src/py',
        args: [url, uID, pw, cSave]
    }

    PythonShell.run('manager.py', options, function(err, results) {
        if(err) throw err;
        console.log('results: %j', results)
    })
    
    /*var python = require("python-shell")
    var pythonShell = new python.PythonShell('./src/py/manager.py')

    pythonShell.on('message', function (message) {
        console.log(message)
    })

    pythonShell.end(function (err) {
        if (err) {
            throw err;
        }

        console.log('Finished')
    }) */
}