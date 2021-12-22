# ┌─────────────────────────────────────────────────────────────────────────┐
# │ Instagram Automated Commenting 2.0                                      │
# ├─────────────────────────────────────────────────────────────────────────┤
# │ DO NOT indicate used program sections as your own.                      │
# │ DO NOT sell the software to other people under your name.               │
# │ Before further development and sale,                                    │
# │ a written agreement must be made with the manufacturer (JueK3y).        │
# │ In the event of possible damage, the user alone is liable,              │
# │ the manufacturer (JueK3y) withdraws from any legal responsibility.      │
# ├─────────────────────────────────────────────────────────────────────────┤
# │ Copyright © 2020 - 2021 by JueK3y (Julian Kennedy)                      │
# | https://github.com/JueK3y/Instagram-automated-commenting                │
# └─────────────────────────────────────────────────────────────────────────┘

import os
import json
import subprocess
from datetime import date, datetime
from credentials import Login

commentPath = "./src/data/comments.txt"
idPath = "./src/data/id.json"

def checkFolder():
    if not os.path.isdir('./src/data'):
        os.mkdir('./src/data')

class Comment:
    def checkFile():
        if not os.path.exists(commentPath):
            checkFolder()
            Comment.makeFile()
            print("Pop-up warning that comment file is empty.")

    def openFile():
        if os.path.exists(commentPath):
            Comment.openEditor()
        else:
            checkFolder()
            Comment.makeFile()
            Comment.openEditor()

    def openEditor():
        programName = "notepad.exe"
        fileName = commentPath
        subprocess.Popen([programName, fileName])
    
    def makeFile():
            commentFile = open(commentPath, "a")
            commentFile.write("! Write only one comment per line. Comments with '!' at the beginning will be ignored.")
            commentFile.close()

class ID:    
    def checkFile():
        if not os.path.exists(idPath):
            checkFolder()
            ID.makeFile()
            print("Created file")
        
    def makeFile():
        data = {
            "uID": {

            }
        }
        with open(idPath, 'w') as f:
            json.dump(data, f)

    def getData():
        ID.checkFile()
        f = open(idPath)
        data = json.load(f)

        for i in data['uID']:
            uID = i
            username = data['uID'][i]['username']
            nickname = data['uID'][i]['nickname']
            pinned = data['uID'][i]['pinned']
            print("uID: " + uID, "Username: " + username, "Nickname: " + nickname, "Pinned: " + str(pinned))
            Login.get(username)

    def addUpdate(uID, username, nickname, pinned):
        ID.checkFile()
        if nickname == None:
            nickname = username

        user = {
            uID: {
                "username": username,
                "nickname": nickname,
                "pinned": pinned,
                "created": {
                    "date": date.today().strftime("%d-%m-%Y"),
                    "time": datetime.now().strftime("%H:%M:%S")
                },
                "verified": {
                    "checked": False,
                    "working": False,
                    # Checked: False = Color Grey
                    # Checked: True, Working: False = Color Red
                    # Checked: True, Working: True = Color Green
                }
            }
        }

        with open(idPath, 'r+') as addFile:
            j = json.load(addFile)

            for k, v in user.items():
                j['uID'][k] = v
            addFile.seek(0)

            json.dump(j, addFile, indent=4)
    

    def deleteObject(earse):
        with open(idPath, 'r+') as delObj:
            j = json.load(delObj)

            del j["uID"][earse]

        with open(idPath, "w") as jsonFile:
            json.dump(j, jsonFile, indent=4)