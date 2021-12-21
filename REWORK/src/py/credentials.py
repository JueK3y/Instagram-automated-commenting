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

import keyring

service = 'IAC 2.0'
class Login:
    def store(username, password):
        keyring.set_password(service, username, password)
        print("\nSaving LogIn Data:\nBenutzername: " + username + "\nPasswort: " + password + "\n")
    
    def get(username):
        password = keyring.get_password(service, username)
        print("Passowrod: " + password)

    def editID(oldUsername, username):
        password = keyring.get_password(service, oldUsername)
        keyring.set_password(service, username, password)
        Login.delete(oldUsername)

    def editPW(username, password):
        Login.delete(username)
        Login.store(username, password)

    def delete(username):
        keyring.delete_password(service, username)