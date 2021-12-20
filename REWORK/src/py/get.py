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

import sys
import json
from dataFiles import Comment
class GetterGUI:
    # -- Get data from the GUI --
    def getURL():
        GetterGUI.URL = sys.argv[2]
        print("Get Instagram URL: " + GetterGUI.URL)

    def getLogIn():
        GetterGUI.username = sys.argv[3]
        GetterGUI.password = sys.argv[4]
        print("\nGet Login Data:\nBenutzername: " + GetterGUI.username + "\nPasswort: " + GetterGUI.password + "\n")

    def getSaveCredentials():
        GetterGUI.saveLogin = sys.argv[5]
        print("Get saveProfile boolean: " + GetterGUI.saveLogin)

    def getComments():
        Comment.checkFile()

class GetterJSON:
    def getID():
        f = open('./src/py/id.py', 'r')
        db = json.load(f)

        print(db['teacher_db'][0]['name'])
