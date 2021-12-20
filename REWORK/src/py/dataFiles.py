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

commentPath = "./src/data/comments.txt"
idPath = "./src/data/id.json"
fileEmpty = None


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
    def editFile(data):
        if not os.path.exists(idPath):
            checkFolder()
        with open(idPath, 'w', encoding='utf-8') as eF:                                          # -!- Overwrites all existing content -!-
            json.dump(data, eF, ensure_ascii=False, indent=4)
        eF.close()

    def deleteObject(earse):                # -!- Doesn't work yet -!-
        json_file = json.load(open(idPath))

        for json_dict in json_file:
            json_dict.pop("name", None)
        print(json.dumps(json_file, indent=4))
