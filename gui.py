import json
import sys
import os.path
import pathlib
import shutil
import time
import random
import tkinter as tk
from tkinter import *
from tkinter import messagebox

from pip._vendor import requests
from selenium import webdriver
from selenium.common.exceptions import WebDriverException, NoSuchElementException
from selenium.webdriver.common.keys import Keys

root = tk.Tk()
root.geometry('420x100')
root.title("Automated Commenting")
# root.configure(bg='#2D2C2C')
root.wm_attributes("-topmost", 1)
root.resizable(False, False)


def auto_comment():
    global web
    connected()
    if browser_text.get() == 'Internet Explorer':
        try:
            web = webdriver.Ie(executable_path=os.getcwd() + '/driver/IEDriverServer.exe')
            web.maximize_window()
        except WebDriverException:
            print("An error occurred.")
            return
            # messagebox.showerror("Wrong browser", "IE couldn't be found. Please select another browser.")

    elif browser_text.get() == 'Firefox':
        try:
            web = webdriver.Firefox(executable_path=os.getcwd() + '/driver/geckodriver.exe')
            web.maximize_window()

            # Save preferred browser
            brwco = {
                'Browser': "Firefox",
            }
            with open('JSON/Browser.json', 'w') as BrwFi:
                json.dump(brwco, BrwFi)

        except WebDriverException:
            messagebox.showerror("Wrong browser", "Firefox couldn't be found. Please select another browser.")
            return

    elif browser_text.get() == 'Chrome 87':
        try:
            chr_opt = webdriver.ChromeOptions()
            chr_opt.add_argument("--incognito")
            web = webdriver.Chrome(executable_path=os.getcwd() + '/driver/chromedriver-87.exe', options=chr_opt)
            web.maximize_window()
        except WebDriverException:
            messagebox.showerror("Wrong browser", "Chrome 87 couldn't be found. Please select another browser.")
            return

    elif browser_text.get() == 'Chrome 88':
        try:
            chr_opt = webdriver.ChromeOptions()
            chr_opt.add_argument("--incognito")
            web = webdriver.Chrome(executable_path=os.getcwd() + '/driver/chromedriver-88.exe', options=chr_opt)
            web.maximize_window()
        except WebDriverException:
            messagebox.showerror("Wrong browser", "Chrome 88 couldn't be found. Please select another browser.")
            return
    print("Browser found")

    connected()

    web.get(url_text.get())

    try:
        cookies = web.find_element_by_xpath('/html/body/div[2]/div/div/div/div[2]/button[1]')
        cookies.click()
    except NoSuchElementException:
        messagebox.showerror("Wrong link", "The link does not lead (directly) to any Instagram post.")
        web.close()
        return

    try:
        comment = web.find_element_by_xpath('//*[@id="react-root"]/section/main/div/div[1]/article/div[3]/section[1]/span['
                                            '2]/button')
        comment.click()
    except NoSuchElementException:
        messagebox.showerror("Error", "Something went wrong. Is the link wrong?.")

    alias = web.find_element_by_xpath('//*[@id="loginForm"]/div[1]/div[1]/div/label/input')
    alias.send_keys(username_text.get())

    pw = web.find_element_by_xpath('//*[@id="loginForm"]/div[1]/div[2]/div/label/input')
    pw.send_keys(password_text.get())

    connected()

    login = web.find_element_by_xpath('//*[@id="loginForm"]/div[1]/div[3]/button')
    login.click()

    time.sleep(5)

    try:
        web.find_element_by_css_selector('#slfErrorAlert')
        print("False LogIn data")

        messagebox.showerror("Wrong information", "Your username and / or your password was wrong.")
        return

    except NoSuchElementException:
        web.find_element_by_css_selector('.sqdOP')
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

                select = web.find_element_by_xpath(
                    '//*[@id="react-root"]/section/main/div/div[1]/article/div[3]/section['
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


def run():
    if str(e1.get()) == "" or str(e2.get()) == "" or str(e4.get()) == "" or str(e1.get()) == "None" or \
            str(e2.get()) == "None" or str(e4.get()) == "None":
        messagebox.showerror("Missing input", "All fields must be filled in.")
    elif len(str(e4.get())) < 6:
        messagebox.showerror("Incorrect password", "Your password can't be that short.")
    else:
        # Save URL
        safe_url = {
            'Last URL': url_text.get(),
        }
        with open('JSON/URLhistory.json', 'w') as urlfi:
            json.dump(safe_url, urlfi)

        # Save user login
        login = {
            'Username': username_text.get(),
            'Password': password_text.get()
        }
        with open('JSON/LogIn.json', 'w') as lginfi:
            json.dump(login, lginfi)

        print(url_text.get())
        print(browser_text.get())
        print(username_text.get())
        print(password_text.get())
        auto_comment()


def help_act():
    messagebox.showerror("Not available", "Help is currently not available.")


def close():
    msg_box = tk.messagebox.askquestion('Exit Application', 'Are you sure you want to exit the application?',
                                        icon='warning')
    if msg_box == 'yes':
        root.destroy()
        try:
            web.close()
        except:
            return


# Check for internet connection
def connected():
    timeout = 10
    try:
        requests.get('https://instagram.com', timeout=timeout)
    except (requests.ConnectionError, requests.Timeout):
        print("Missing Internet connection")
        messagebox.showerror("Internet is gone", "You don't have a working internet connection.")
        try:
            web.close()
            return
        except:
            sys.exit()


# Button hover
def on_enter(e):
    e.widget['background'] = '#BABABA'  # #484644


def on_leave(e):
    e.widget['background'] = 'SystemButtonFace'


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
    brwco = {
        'Browser': None
    }
    with open('JSON/Browser.json', 'w') as BrwFi:
        json.dump(brwco, BrwFi)
    # Generating LogIn.json
    login = {
        'Username': None,
        'Password': None
    }
    with open('JSON/LogIn.json', 'w') as lginfi:
        json.dump(login, lginfi)
    # Generating URLhistory.json
    safe_url = {
        'Last URL': None
    }
    with open('JSON/URLhistory.json', 'w') as urlfi:
        json.dump(safe_url, urlfi)
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

# Label
li = Label(root, text="Post URL")
li.grid(row=0, column=0)
li = Label(root, text="Username")
li.grid(row=0, column=2)
li = Label(root, text="Browser")
li.grid(row=1, column=0)
li = Label(root, text="Password")
li.grid(row=1, column=2)

# Read URL file

with open('JSON/URLhistory.json', 'r') as URLFi:
    data = URLFi.read()

obj = json.loads(data)

# Input
url_text = StringVar()
e1 = Entry(root, textvariable=url_text)
e1.insert(0, str(obj['Last URL']))
e1.grid(row=0, column=1)

# Dropdown Menu
OptionList = [
    "Firefox",
    "Chrome 87",
    "Chrome 88"
]
browser_text = StringVar()
browser_text.set(OptionList[0])
e3 = tk.OptionMenu(root, browser_text, *OptionList)
e3.config(width=12, font=('Helvetica', 9))
e3.grid(row=1, column=1)

# Read LogIn file
with open('JSON/LogIn.json', 'r') as LgInFi:
    data = LgInFi.read()

obj = json.loads(data)

username_text = StringVar()
e2 = Entry(root, textvariable=username_text)
e2.insert(0, str(obj['Username']))
e2.grid(row=0, column=3)

password_text = StringVar()
e4 = Entry(root, textvariable=password_text, show='*')
e4.insert(0, str(obj['Password']))
e4.grid(row=1, column=3)


def password():
    if var.get() == 1:
        e4.configure(show="")
    elif var.get() == 0:
        e4.configure(show="*")


# Buttons
var = IntVar()
bp = Checkbutton(root, command=password, offvalue=0, onvalue=1, variable=var)
bp.grid(row=1, column=4)

b1 = Button(root, text="Run", width=12, command=run)
b1.grid(row=2, column=1)
b1.bind("<Enter>", on_enter)
b1.bind("<Leave>", on_leave)

b2 = Button(root, text="Help", width=12, command=help_act)
b2.grid(row=2, column=2)
b2.bind("<Enter>", on_enter)
b2.bind("<Leave>", on_leave)

b3 = Button(root, text="Exit", width=12, command=close)
b3.grid(row=2, column=3, pady=(10, 10))
b3.bind("<Enter>", on_enter)
b3.bind("<Leave>", on_leave)

root.mainloop()
