// Will be executed when the program is started
startPython(2)      // Check for update

function manager(ID, results) {
    if (ID == "1") {
        console.log(results)
        // Display updated wifi speed
    }
    else if (ID == "2") {
        if (results == "True") {
            setUpdateBoolean()
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
        console.log('Results: ', results)
        manager(ID, results)
    })
}

/*function getPassword(ID, username) {
    let {PythonShell} = require('python-shell')

    let options = {
        scriptPath: './src/py',
        args: [ID, username]
    }

    PythonShell.run('manager.py', options, function(err, results) {
        if(err) throw err;
        document.getElementById("password-form").value = results
    })
}*/

/*function mainLogic(ID, url, username, password, cSave) {
    let {PythonShell} = require('python-shell')

    let options = {
        scriptPath: './src/py',
        args: [ID, url, username, password, cSave]
    }

    PythonShell.run('manager.py', options, function(err, results) {
        if(err) throw err;
        console.log('results: %j', results)
    })
}*/