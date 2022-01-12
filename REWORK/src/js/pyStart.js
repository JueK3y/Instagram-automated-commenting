function startPython(ID) {
    let {PythonShell} = require('python-shell')

    let options = {
        scriptPath: './src/py',
        args: [ID]
    }

    PythonShell.run('manager.py', options, function(err, results) {
        if(err) throw err
        console.log('Results: ', results)
        manager(ID, results)
    })
}

/*function mainLogic(ID, url, username, password, cSave) {
    let {PythonShell} = require('python-shell')

    let options = {
        scriptPath: './src/py',
        args: [ID, url, username, password, cSave]
    }

    PythonShell.run('manager.py', options, function(err, results) {
        if(err) throw err
        console.log('Results: ', results)
    })
}*/