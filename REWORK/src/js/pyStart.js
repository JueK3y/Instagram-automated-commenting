// Will be executed when the program is started
startPython(2)      // Check for update
startPython(3)      // Show all profiles

function startPython(ID) {
    let {PythonShell} = require('python-shell')

    let options = {
        scriptPath: './src/py',
        args: [ID]
    }

    PythonShell.run('manager.py', options, function(err, results) {
        if(err) throw err;
        console.log('results: %j', results)
    })
}

function mainLogic(ID, url, uID, pw, cSave) {
    let {PythonShell} = require('python-shell')

    let options = {
        scriptPath: './src/py',
        args: [ID, url, uID, pw, cSave]
    }

    PythonShell.run('manager.py', options, function(err, results) {
        if(err) throw err;
        console.log('results: %j', results)
    })
}