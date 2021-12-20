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
from datetime import date, datetime
from dataFiles import ID
from credentials import Login

class Profile:
    def show():
        print("This shows all profile data needed.")
    
    def editID(oldID, username):
        update = {
            "uid-003": {
                "name": username,
                "updated": {
                    "date": date.today().strftime("%d-%m-%Y"),
                    "time": datetime.now().strftime("%H:%M:%S")
                }
            }
        }

        ID.editFile(update)
    
    def editPw(username, password):
        Login.store(username, password)

    def create(username, pinned):
        user = {
            "uid-001": {
                "username": username,
                "nickname": username,
                "pinned": pinned,
                "created": {
                    "date": date.today().strftime("%d-%m-%Y"),
                    "time": datetime.now().strftime("%H:%M:%S")
                },
                "verified": {
                    "checked": False
                }
            }
        }

        ID.editFile(user)

    def delete(uID):        # -- Get Hash / Username from JS / GUI --
        Login.delete(uID)
        ID.deleteObject(uID)

sys.stdout.flush()