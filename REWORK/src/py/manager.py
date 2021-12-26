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
from wifiSpeed import WiFi
from update import Update
from profile import Profile
from mainLogic import Manager
from dataFiles import Comment
from credentials import Login

if sys.argv[1] == "1":
    WiFi.checkConnection()
elif sys.argv[1] == "2":
    Update.checkUpdate()
elif sys.argv[1] == "3":
    Profile.get()
elif sys.argv[1] == "4":
    Manager.startLogic()
elif sys.argv[1] == "5":
    Comment.openFile()
elif sys.argv[1] == "6":
    Profile.create(sys.argv[2], sys.argv[3], sys.argv[4], sys.argv[5])
elif sys.argv[1] == "7":
    Profile.editUN(sys.argv[2], sys.argv[3], sys.argv[4])
elif sys.argv[1] == "8":
    Profile.editPW(sys.argv[2], sys.argv[3])
elif sys.argv[1] == "9":
    Profile.delete(sys.argv[2])
elif sys.argv[1] == "10":
    Login.get(sys.argv[2])
else:
    print("Huh, weird")

sys.stdout.flush()

