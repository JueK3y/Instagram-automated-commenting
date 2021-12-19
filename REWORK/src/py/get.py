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
class Getter:
    # -- Get data from the GUI --
    def getURL():
        Getter.URL = sys.argv[1]
        print("Get Instagram URL: " + Getter.URL)

    def getLogIn():
        Getter.username = sys.argv[2]
        Getter.password = sys.argv[3]
        print("\nGet Login Data:\nBenutzername: " + Getter.username + "\nPasswort: " + Getter.password + "\n")


    def getSaveCredentials():
        Getter.saveLogin = sys.argv[4]                               # -- saveLogin is an attribute from JS --
        print("Get saveProfile boolean: " + Getter.saveLogin)

    def getComments():
        print("Get comments")

