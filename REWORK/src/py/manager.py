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
# -*- coding: utf-8 -*-

import sys
from get import Getter
from credentials import Login
from automation import Logic

class Manager:
    def startLogic():                                           # -- startLogic will be executed when HTML Start Button is pushed --
        print("\nThis is the start of IAC 2.0.")
        Getter.getURL()
        Getter.getLogIn()
        Getter.getSaveCredentials()
        Getter.getComments()
        if(Getter.saveLogin == "true"):
            Login.store(Getter.username, Getter.password)
        Logic.checkDriver()
        Logic.mainLogic()


Manager.startLogic()
print("\n--- End of Python Code ---\n")

sys.stdout.flush()

