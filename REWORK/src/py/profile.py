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

from dataFiles import ID
from credentials import Login

class Profile:
    def get():
        ID.getData()
        print("Show all existing profiles")
    
    def create(uID, username, password, pinned):
        # -!- uID needs to be created -!-
        # -!- Check if username profile already exists -!-
        nickname = username
        ID.addUpdate(uID, username, nickname, pinned)
        Login.store(username, password)

    def editUN(oldUN, uID, newUN, pinned):
        # -!- Check if new username profile already exists -!-
        nickname = newUN
        ID.addUpdate(uID, newUN, nickname, pinned)
        Login.editID(oldUN, newUN)
    
    def editPW(username, password):
        Login.editPW(username, password)
        print("")

    def delete(uID, username):        # -- Get Hash / Username from JS / GUI --
        Login.delete(username)
        ID.deleteObject(uID)
