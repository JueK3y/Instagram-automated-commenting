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

class Getter:
    # -- Get data from the GUI --
    def getURL():
        Getter.URL = "https://instagram.com/test"
        print("Get Instagram URL: " + Getter.URL)

    def getLogIn():
        Getter.username = "test"
        Getter.password = "foo"
        print("\nGet Login Data:\nBenutzername: " + Getter.username + "\nPasswort: " + Getter.password + "\n")


    def getSaveCredentials():
        print("Get saveProfile boolean")
        Getter.saveLogin = True                                        # -- saveLogin is an attribute form JS --

    def getComments():
        print("Get comments")

