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

from get import GetterGUI
from credentials import Login
from automation import Logic
from profile import Profile

class Manager:
    def startLogic():                                           # -- startLogic will be executed when HTML Start Button is pushed --
        print("\nThis is the start of IAC 2.0.")
        GetterGUI.getURL()
        GetterGUI.getLogIn()
        GetterGUI.getSaveCredentials()
        GetterGUI.getComments()
        if GetterGUI.saveLogin == "true":
            Login.store(GetterGUI.username, GetterGUI.password)
            Profile.create(GetterGUI.username, False)
        Logic.checkDriver()
        Logic.mainLogic()
