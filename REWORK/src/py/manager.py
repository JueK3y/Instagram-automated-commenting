'''
DO NOT indicate used program sections as your own.
DO NOT sell the software to other people under your name.
Before further development and sale, a written agreement must be made with the manufacturer (JueK3y).
In the event of possible damage, the user alone is liable, the manufacturer (JueK3y) withdraws from any legal responsibility.
Copyright © 2020 - 2021 by JueK3y (www.github.com/JueK3y/)
'''
from login import Login

import sys

class Manager:
    def startLogic():                                           # -- startLogic will be executed when HTML Start Button is pushed --
        print("This is the start of IAC 2.0.")
        Manager.getURL()
        Manager.getLogIn()
        Manager.storeLogIn()
        Manager.getComments()
        Manager.searchElement()                                 # -- If not opened in Electron --

    def getURL():
        print("Get Instagram URL")
        # -- If not opened in Electron --

    def getLogIn():
        print("Get LogIn-Data")

    def storeLogIn():
        # saveLogin is an attribute form JS
        saveLogin = True
        if (saveLogin):
            Login.store()

    def getComments():
        print("Get comments which should be printed")

    # -- If not opened in Electron --
    def searchElement():
        print("Search for different Elements")


Manager.startLogic()

sys.stdout.flush()

