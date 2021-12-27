// Will be executed when the program is started
startPython(2)      // Check for update
startPython(3)      // Show all profiles

function checkArg(ID, results) {
    if (ID == "1") {
        // Display updated wifi speed
    }
    else if (ID == "2") {
        if (results == "True") {
            setBoolean()
        }
    }
}

function startPython(ID) {
    let {PythonShell} = require('python-shell')

    let options = {
        scriptPath: './src/py',
        args: [ID]
    }

    PythonShell.run('manager.py', options, function(err, results) {
        if(err) throw err;
        console.log('results: %j', results)
        checkArg(ID, results)
    })
}

function getPassword(ID, username) {
    let {PythonShell} = require('python-shell')

    let options = {
        scriptPath: './src/py',
        args: [ID, username]
    }

    PythonShell.run('manager.py', options, function(err, results) {
        if(err) throw err;
        document.getElementById("password-form").value = results
    })
}

function mainLogic(ID, url, username, password, cSave) {
    let {PythonShell} = require('python-shell')

    let options = {
        scriptPath: './src/py',
        args: [ID, url, username, password, cSave]
    }

    PythonShell.run('manager.py', options, function(err, results) {
        if(err) throw err;
        console.log('results: %j', results)
    })
}