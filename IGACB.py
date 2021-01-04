import json
import os.path
import pathlib
import shutil
import sys
import time
import random
import tkinter as tk
# from doctest import master

from tkinter import simpledialog, messagebox

from pip._vendor import requests
from selenium import webdriver
from selenium.common.exceptions import WebDriverException
from selenium.webdriver.common.keys import Keys

# class MyDialog(simpledialog.Dialog):
#    def body(self, master):
#        self.geometry("300x100")
#        tk.Label(master, text="Enter your text").grid(row=0)
#
#        self.e1 = tk.Entry(master)
#        self.e1.grid(row=0, column=1)
#        return self.e1
#
#    def apply(self):
#        first = self.e1.get()
#        self.result = first
from selenium.webdriver.support.wait import WebDriverWait

root = tk.Tk()
root.wm_attributes("-topmost", 1)
root.withdraw()


# test = MyDialog(root, "tets")


# Check for internet connection
def connected():
    timeout = 10
    try:
        requests.get('https://google.com', timeout=timeout)
    except (requests.ConnectionError, requests.Timeout):
        print("Missing Internet connection")
        messagebox.showerror("Internet is gone", "You don't have a working internet connection.")
        web.close()
        sys.exit(0)


def browser():
    BRW = simpledialog.askstring(title="Wrong browser", prompt="Please use one of the 4 given options: Internet "
                                                               "Explorer, Firefox, Chrome 87, Chrome 88. Restart the "
                                                               "program afterwards.")
    if not BRW:
        messagebox.showerror("Missing browser", "You need to enter one of the four browser names.")
        # Save preferred browser
        BrwCo = {
            'Browser': None,
        }
        with open('JSON/Browser.json', 'w') as BrwFi:
            json.dump(BrwCo, BrwFi)
        sys.exit(0)
    else:
        # Save preferred browser
        BrwCo = {
            'Browser': BRW,
        }
        with open('JSON/Browser.json', 'w') as BrwFi:
            json.dump(BrwCo, BrwFi)
        print("Browser successful registered")


# Make JSON folder
def mk_folder():
    # Make JSON folder
    json_dir = os.getcwd()
    directory_name = "JSON"
    json_path = os.path.join(json_dir, directory_name)
    os.mkdir(json_path)


# Make files inside JSON folder
def mk_files():
    # Generating Browser.json
    BrwCo = {
        'Browser': None
    }
    with open('JSON/Browser.json', 'w') as BrwFi:
        json.dump(BrwCo, BrwFi)
    # Generating LogIn.json
    LogIn = {
        'Username': None,
        'Password': None
    }
    with open('JSON/LogIn.json', 'w') as LgInFi:
        json.dump(LogIn, LgInFi)
    # Generating URLhistory.json
    safeURL = {
        'Last URL': None
    }
    with open('JSON/URLhistory.json', 'w') as URLFi:
        json.dump(safeURL, URLFi)
    print("Files generated")


d_JSON = pathlib.Path("JSON")
f_browser = pathlib.Path("JSON/Browser.json")
f_login = pathlib.Path("JSON/LogIn.json")
f_url = pathlib.Path("JSON/URLhistory.json")
if d_JSON.exists():
    print("Folder exist")
    if f_browser.exists() & f_login.exists() & f_url.exists():
        print("Files exists")
    else:
        print("Files doesnt exists")
        # Deletes folder
        shutil.rmtree("JSON")
        mk_folder()
        mk_files()
else:
    print("Folder doesnt exist")
    mk_folder()
    mk_files()

# Read Browser.json
with open('JSON/Browser.json', 'r') as BrwFi:
    data = BrwFi.read()

obj = json.loads(data)

if str(obj['Browser']) == "None":
    BRW = simpledialog.askstring(title="Browser", prompt="Which Browser do you use? Firefox, Chrome 87 or Chrome 88?")
    if not BRW:
        messagebox.showerror("No Browser", "Please use one of the 3 given options.")
        sys.exit(0)
    # Save preferred browser
    BrwCo = {
        'Browser': BRW,
    }
    with open('JSON/Browser.json', 'w') as BrwFi:
        json.dump(BrwCo, BrwFi)
    print("Browser successful registered")

# Use Browser Data in JSON File
else:
    BRW = (obj['Browser'])
    print("Using preferred browser")

# Read LogIn file
with open('JSON/LogIn.json', 'r') as LgInFi:
    data = LgInFi.read()

obj = json.loads(data)

# Ask for LogIn if not in JSON file
if str(obj['Username']) == "None" or str(obj['Password']) == "None":
    NME = simpledialog.askstring(title="Name", prompt="IG Username:")
    if not NME:
        messagebox.showerror("No username", "You must enter a username!")
        sys.exit(0)
    PWD = simpledialog.askstring(title="Password", prompt="IG Password:", show='*')  # * not necessary
    if not PWD:
        messagebox.showerror("No password", "You need to enter a password!")
        sys.exit(0)
    # Save user login
    LogIn = {
        'Username': NME,
        'Password': PWD
    }
    with open('JSON/LogIn.json', 'w') as LgInFi:
        json.dump(LogIn, LgInFi)
    print("LogIn successful")

# Use LogIn Data in JSON File
else:
    NME = (obj['Username'])
    PWD = (obj['Password'])
    print("Automatically logged in")

# Read URL file

with open('JSON/URLhistory.json', 'r') as URLFi:
    data = URLFi.read()

obj = json.loads(data)

# Check URL in JSON file

if str(obj['Last URL']) != "None":
    lastURL = messagebox.askyesno("Last URL", "Do you want to use the last URL?")
    if lastURL:
        # Use URL in JSON File
        URL = (obj['Last URL'])
        print("Using last URL")
    else:
        URL = simpledialog.askstring(title="URL", prompt="IG Post URL:")
        if not URL:
            messagebox.showerror("Missing URL", "You must enter a URL.")
            sys.exit(0)
        # Save URL
        safeURL = {
            'Last URL': URL,
        }
        with open('JSON/URLhistory.json', 'w') as URLFi:
            json.dump(safeURL, URLFi)
        print("Using new URL")
else:
    URL = simpledialog.askstring(title="URL", prompt="IG Post URL:")
    if not URL:
        messagebox.showerror("Missing URL", "You must enter a URL.")
        sys.exit(0)
    # Save URL
    safeURL = {
        'Last URL': URL,
    }
    with open('JSON/URLhistory.json', 'w') as URLFi:
        json.dump(safeURL, URLFi)
    print("Successful added URL")

web = 0

# Read Browser.json
with open('JSON/Browser.json', 'r') as BrwFi:
    data = BrwFi.read()

obj = json.loads(data)

BrNa = str(obj['Browser']).lower()

if BrNa == 'internet explorer' or BrNa == 'ie':
    try:
        print('Using IE')
        web = webdriver.Ie(executable_path=os.getcwd() + '/driver/IEDriverServer.exe')
        web.maximize_window()
    except WebDriverException:
        print("Looks like Internet Explorer isn't accessible.")
        browser()
        sys.exit(0)

elif BrNa == 'firefox':
    try:
        print('Using Firefox')
        web = webdriver.Firefox(executable_path=os.getcwd() + '/driver/geckodriver.exe')
        web.maximize_window()
    except WebDriverException:
        print("Looks like Firefox isn't accessible.")
        browser()
        sys.exit(0)


elif BrNa == 'chrome 87':
    try:
        print('Using Chrome 87')
        chrOpt = webdriver.ChromeOptions()
        chrOpt.add_argument("--incognito")
        web = webdriver.Chrome(executable_path=os.getcwd() + '/driver/chromedriver-87.exe', options=chrOpt)
        web.maximize_window()
    except WebDriverException:
        print("Looks like Chrome 87 isn't accessible.")
        browser()

elif BrNa == 'chrome 88':
    try:
        print('Using Chrome 88')
        chrOpt = webdriver.ChromeOptions()
        chrOpt.add_argument("--incognito")
        web = webdriver.Chrome(executable_path=os.getcwd() + '/driver/chromedriver-88.exe', options=chrOpt)
        web.maximize_window()
    except WebDriverException:
        print("Looks like Chrome 88 isn't accessible.")
        browser()

else:
    browser()

connected()

web.get(URL)

cookies = web.find_element_by_xpath('/html/body/div[2]/div/div/div/div[2]/button[1]')
cookies.click()

comment = web.find_element_by_xpath('//*[@id="react-root"]/section/main/div/div[1]/article/div[3]/section[1]/span['
                                    '2]/button')
comment.click()

alias = web.find_element_by_xpath('//*[@id="loginForm"]/div[1]/div[1]/div/label/input')
alias.send_keys(NME)

pw = web.find_element_by_xpath('//*[@id="loginForm"]/div[1]/div[2]/div/label/input')
pw.send_keys(PWD)

connected()

login = web.find_element_by_xpath('//*[@id="loginForm"]/div[1]/div[3]/button')
login.click()

time.sleep(5)

if web.find_element_by_css_selector('.sqdOP'):
    print("LogIn to IG successful")

    svin = web.find_element_by_xpath('//*[@id="react-root"]/section/main/div/div/div/section/div/button')
    svin.click()


    time.sleep(10)

    lines = open('soco').read().splitlines()

    def comment():
        for word in lines:
            myline = random.choice(lines)
            print(myline)
            zeit = random.randint(25, 90)
            print(zeit)

            select = web.find_element_by_xpath('//*[@id="react-root"]/section/main/div/div[1]/article/div[3]/section['
                                               '3]/div/form/textarea')
            select.click()

            time.sleep(1)

            text = web.find_element_by_css_selector('.Ypffh')
            text.send_keys(myline)

            connected()

            text.send_keys(Keys.ENTER)

            time.sleep(zeit)


    comment()
    comment()
    comment()

# Doesn't work rn
elif web.find_element_by_css_selector('#slfErrorAlert'):
    print("False LogIn data")
    LogIn = {
        'Username': None,
        'Password': None
    }
    with open('JSON/LogIn.json', 'w') as LgInFi:
        json.dump(LogIn, LgInFi)

    messagebox.showerror("Wrong information", "Your username and / or your password was wrong. Please restart the "
                                              "program.")
    sys.exit(0)
