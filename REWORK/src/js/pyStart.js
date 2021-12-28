// Will be executed when the program is started
startPython(2)      // Check for update
startPython(3)      // Show all profiles

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
    else if (ID == "3") {
        // Replace uid-profile-1 with uid-username
        for (let i = 0; i < results.length; i++) {
            console.log(results[i])
            $('.uid-profile-'+(i+1)).text(results[i])
            $('.uid-profile-'+(i+1)).removeClass('uid-profile-'+(i+1)).addClass('uid-'+results[i])
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