"""
This programme is written and may only be used for educational purposes!
Using it for real purposes violates the Instagram guidelines!
Consequences are, for example, the blocking of the Instagram account.
Please read Instagram's guidelines for more information.
DO NOT indicate used program sections as your own. ©2020 - 2021 by www.github.com/JueK3y/
"""

import time
import json
import shutil
import random
import os.path
import pathlib
import datetime

import requests
import tkinter as tk
from tkinter import *
from threading import *
from zipfile import ZipFile
from selenium import webdriver
from tkinter import messagebox
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import WebDriverException, NoSuchElementException, NoSuchWindowException, \
    InvalidSessionIdException

root = tk.Tk()
root.geometry('420x100')
root.title("Automated Commenting")
# root.configure(bg='#2D2C2C')
root.wm_attributes("-topmost", 1)
root.resizable(False, False)

e = datetime.datetime.now()


def threading():
    t1 = Thread(target=run)
    t1.start()


def auto_comment():
    global web
    if browser_text.get() == 'Internet Explorer':
        try:
            web = webdriver.Ie(executable_path=os.getcwd() + '/Resource/driver/IEDriverServer.exe')
            web.maximize_window()

            # Save preferred browser
            brwco = {
                'Browser': "IE",
            }
            with open('Resource/JSON/Browser.json', 'w') as BrwFi:
                json.dump(brwco, BrwFi)
        except WebDriverException:
            print(WebDriverException, " for auto_comment()")
            messagebox.showerror("Browser error", "An error occurred. Please try another browser.")
            return
            # messagebox.showerror("Wrong browser", "IE couldn't be found. Please select another browser.")

    elif browser_text.get() == 'Firefox':
        try:
            web = webdriver.Firefox(executable_path=os.getcwd() + '/Resource/driver/geckodriver.exe')
            web.maximize_window()

            # Save preferred browser
            brwco = {
                'Browser': "Firefox",
            }
            with open('Resource/JSON/Browser.json', 'w') as BrwFi:
                json.dump(brwco, BrwFi)

        except WebDriverException:
            print(WebDriverException, " for auto_comment()")
            messagebox.showerror("Wrong browser", "Firefox couldn't be found. Please select another browser.")
            return

    elif browser_text.get() == 'Chrome 87':
        try:
            chr_opt = webdriver.ChromeOptions()
            chr_opt.add_argument("--incognito")
            web = webdriver.Chrome(executable_path=os.getcwd() + '/Resource/driver/chromedriver_87.exe',
                                   options=chr_opt)
            web.maximize_window()

            # Save preferred browser
            brwco = {
                'Browser': "Chrome 87",
            }
            with open('Resource/JSON/Browser.json', 'w') as BrwFi:
                json.dump(brwco, BrwFi)
        except WebDriverException:
            print(WebDriverException, " for auto_comment()")
            messagebox.showerror("Wrong browser", "Chrome 87 couldn't be found. Please select another browser.")
            return

    elif browser_text.get() == 'Chrome 88':
        try:
            chr_opt = webdriver.ChromeOptions()
            chr_opt.add_argument("--incognito")
            web = webdriver.Chrome(executable_path=os.getcwd() + '/Resource/driver/chromedriver_88.exe',
                                   options=chr_opt)
            web.maximize_window()

            # Save preferred browser
            brwco = {
                'Browser': "Chrome 88",
            }
            with open('Resource/JSON/Browser.json', 'w') as BrwFi:
                json.dump(brwco, BrwFi)
        except WebDriverException:
            print(WebDriverException, " for auto_comment()")
            messagebox.showerror("Wrong browser", "Chrome 88 couldn't be found. Please select another browser.")
            return

    connected()

    web.get(url_text.get())

    try:
        cookies = web.find_element_by_xpath('/html/body/div[2]/div/div/div/div[2]/button[1]')
        cookies.click()
    except NoSuchElementException:
        print(NoSuchElementException, " for auto_comment()")
        messagebox.showerror("Wrong link", "The link does not lead (directly) to any Instagram post.")
        web.close()
        return
    except NoSuchWindowException:
        print(NoSuchWindowException, " for auto_comment()")
        messagebox.showerror("Browser closed", "Action cancelled by user.", icon='warning')
        return
    except InvalidSessionIdException:
        print(InvalidSessionIdException, " for auto_comment()")
        quit()

    try:
        comment = web.find_element_by_xpath('//*[@id="react-root"]/section/main/div/div[1]/article/div[3]/section['
                                            '1]/span[2]/button')
        comment.click()
    except NoSuchElementException:
        print(NoSuchElementException, " for auto_comment()")
        messagebox.showerror("Error", "Something went wrong. Does the link lead to a picture?")
        web.close()
        return
    except NoSuchWindowException:
        print(NoSuchWindowException, " for auto_comment()")
        messagebox.showerror("Browser closed", "Action cancelled by user.", icon='warning')
        return
    except InvalidSessionIdException:
        print(InvalidSessionIdException, " for auto_comment()")
        quit()

    try:
        alias = web.find_element_by_xpath('//*[@id="loginForm"]/div[1]/div[1]/div/label/input')
        alias.send_keys(username_text.get())

        pw = web.find_element_by_xpath('//*[@id="loginForm"]/div[1]/div[2]/div/label/input')
        pw.send_keys(password_text.get())

        connected()

        login = web.find_element_by_xpath('//*[@id="loginForm"]/div[1]/div[3]/button')
        login.click()

        time.sleep(5)

    except NoSuchWindowException:
        print(NoSuchWindowException, " for auto_comment()")
        messagebox.showerror("Browser closed", "Action cancelled by user.", icon='warning')
        return

    except NoSuchElementException:
        print(NoSuchElementException, " for auto_comment()")
        messagebox.showerror("Error", "Something went wrong. Please restart the program.")
        return
    except InvalidSessionIdException:
        print(InvalidSessionIdException, " for auto_comment()")
        quit()

    try:
        web.find_element_by_css_selector('#slfErrorAlert')
        messagebox.showerror("Wrong information", "Your username and / or your password was wrong.")
        web.close()
        return
    except InvalidSessionIdException:
        print(InvalidSessionIdException, " for auto_comment()")
        quit()
    except NoSuchElementException:
        print(NoSuchElementException, " for auto_comment()")
        web.find_element_by_css_selector('.sqdOP')
        svin = web.find_element_by_xpath('//*[@id="react-root"]/section/main/div/div/div/section/div/button')
        svin.click()

        time.sleep(10)

        comfi = open('Resource/txt/comments.txt').read().splitlines()

        def comment():
            # Major error?
            for line in comfi:
                hash = line.strip()
                if not hash.startswith("#"):
                    print(line.strip())

                    # It doesn't ignore # or ""
                    # myline = random.choice(comfi)
                    # print(myline)

                    # Does post a random letter from the sentence.
                    # myline = random.choice(line.strip())
                    zeit = random.randint(25, 90)
                    print(zeit)

                    select = web.find_element_by_xpath(
                        '//*[@id="react-root"]/section/main/div/div[1]/article/div[3]/section['
                        '3]/div/form/textarea')
                    select.click()

                    time.sleep(1)

                    text = web.find_element_by_css_selector('.Ypffh')
                    # text.send_keys(myline)
                    text.send_keys(line.strip())

                    connected()

                    text.send_keys(Keys.ENTER)

                    time.sleep(zeit)

        comment()
        comment()
        comment()

    except NoSuchWindowException:
        print(NoSuchWindowException, " for auto_comment()")
        messagebox.showerror("Browser closed", "Action cancelled by user.", icon='warning')
        return


def check_comment():
    global web
    connected()

    with open('Resource/JSON/firstRun.json', 'r') as runfil:
        run__data = runfil.read()
    run__obj = json.loads(run__data)

    if str(run__obj['First Run?']) == "Yes":
        first__run = {
            'First Run?': "No",
            'Agree to EULA?': "Yes"
        }
        with open('Resource/JSON/firstRun.json', 'w') as runfil:
            json.dump(first__run, runfil)
        runfil.close()
        print("True")
        auto_comment()
    else:
        print("False")
        auto_comment()


def run():
    if str(e1.get()) == "" or str(e2.get()) == "" or str(e4.get()) == "" or str(e1.get()) == "None" or \
            str(e2.get()) == "None" or str(e4.get()) == "None":
        messagebox.showerror("Missing input", "All fields must be filled in.")
    elif len(str(e4.get())) < 6:
        messagebox.showerror("Incorrect password", "Your password can't be that short.")

    elif not f_comment.exists():
        comment = tk.messagebox.askyesno('No comments',
                                         "You don't have any sentences to comment on Instagram. Do you "
                                         "want to create some now?", icon='warning')
        if comment:
            comment_txt = open("Resource/txt/comments.txt", "a")
            comment_txt.write("# Write only one comment per line. Comments with '#' at the beginning will be ignored.")
            comment_txt.close()

            os.system("notepad Resource/txt/comments.txt")
            return
        else:
            exit()
    else:
        # Save URL
        safe_url = {
            'Last URL': url_text.get(),
        }
        with open('Resource/JSON/URLhistory.json', 'w') as urlfi:
            json.dump(safe_url, urlfi)

        # Save user login
        login = {
            'Username': username_text.get(),
            'Password': password_text.get()
        }
        with open('Resource/JSON/LogIn.json', 'w') as lginfi:
            json.dump(login, lginfi)
        # check_txt()

        check_comment()

        # Close the old window and starts a new one.
        # Does the user wants this?
        """
        try:
            web.close()
            check_comment()
            return
        except NameError:
            print(NameError, " for run()")
            check_comment()
            return
        except InvalidSessionIdException:
            print(InvalidSessionIdException, " for run()")
            check_comment()
            return
        """


def settings():
    messagebox.showerror("Not available", "Settings are currently not available.")


def close():
    msg_box = tk.messagebox.askquestion('Exit Application', 'Are you sure you want to exit the application?',
                                        icon='warning')
    if msg_box == 'yes':
        root.destroy()
        try:
            web.close()
        except NameError:
            print(NameError, " for close()")
            quit()
        except InvalidSessionIdException:
            print(InvalidSessionIdException, " for close()")
            quit()
    else:
        return


# Check for internet connection
def connected():
    timeout = 10
    try:
        requests.get('https://instagram.com', timeout=timeout)
    except (requests.ConnectionError, requests.Timeout):
        messagebox.showerror("Internet is gone", "You don't have a working internet connection.")
        try:
            web.close()
            return
        except NoSuchWindowException:
            print(NoSuchWindowException, " for connected()")
            return


# Button hover
def on_enter(d):
    d.widget['background'] = '#BABABA'  # #484644


def on_leave(d):
    d.widget['background'] = 'SystemButtonFace'


# Make folder
def mk_folder():
    # Make Resource folder
    res_dir = os.getcwd()
    directory_name = "Resource"
    json_path = os.path.join(res_dir, directory_name)
    os.mkdir(json_path)

    # Make driver folder
    driver_dir = os.getcwd() + '/Resource'
    directory_name = "driver"
    json_path = os.path.join(driver_dir, directory_name)
    os.mkdir(json_path)

    # Make JSON folder
    json_dir = os.getcwd() + '/Resource'
    directory_name = "JSON"
    json_path = os.path.join(json_dir, directory_name)
    os.mkdir(json_path)

    # Make txt folder
    txt_dir = os.getcwd() + '/Resource'
    directory_name = "txt"
    txt_path = os.path.join(txt_dir, directory_name)
    os.mkdir(txt_path)
    return


def dow_driver():
    gecko = "https://github.com/mozilla/geckodriver/releases/download/v0.28.0/geckodriver-v0.28.0-win64.zip"
    chr87 = "https://chromedriver.storage.googleapis.com/87.0.4280.88/chromedriver_win32.zip"
    chr88 = "https://chromedriver.storage.googleapis.com/88.0.4324.27/chromedriver_win32.zip"
    EULA = "https://juek3y.com/src/txt/End%20User%20License%20Agreement%20for%20IAC.txt"

    a = requests.get(gecko)
    b = requests.get(chr87)
    c = requests.get(chr88)
    d = requests.get(EULA)

    with open("Resource/driver/geckodriver.zip", 'wb') as gec:
        gec.write(a.content)

    with open("Resource/driver/chromedriver-87.zip", 'wb') as c87:
        c87.write(b.content)

    with open("Resource/driver/chromedriver-88.zip", 'wb') as c88:
        c88.write(c.content)

    with open("Resource/txt/EULA.txt", 'wb') as eul:
        eul.write(d.content)
    return


def exe_driver():
    with ZipFile('Resource/driver/geckodriver.zip', 'r') as zipObj:
        zipObj.extractall('Resource/driver')

    with ZipFile('Resource/driver/chromedriver-87.zip', 'r') as zipObj:
        zipObj.extractall('Resource/driver')

    old_file_name = "Resource/driver/chromedriver.exe"
    new_file_name = "Resource/driver/chromedriver_87.exe"

    os.rename(old_file_name, new_file_name)

    with ZipFile('Resource/driver/chromedriver-88.zip', 'r') as zipObj:
        zipObj.extractall('Resource/driver')

    old_file_name = "Resource/driver/chromedriver.exe"
    new_file_name = "Resource/driver/chromedriver_88.exe"

    os.rename(old_file_name, new_file_name)

    os.remove("Resource/driver/geckodriver.zip")
    os.remove("Resource/driver/chromedriver-87.zip")
    os.remove("Resource/driver/chromedriver-88.zip")
    return


# Make files inside JSON folder
def mk_files():
    # Generating Browser.json
    # Currently not used
    brwco = {
        'Browser': None
    }
    with open('Resource/JSON/Browser.json', 'w') as BrwFi:
        json.dump(brwco, BrwFi)

    # Generating LogIn.json
    login = {
        'Username': None,
        'Password': None
    }
    with open('Resource/JSON/LogIn.json', 'w') as lginfi:
        json.dump(login, lginfi)

    # Generating URLhistory.json
    safe_url = {
        'Last URL': None
    }
    with open('Resource/JSON/URLhistory.json', 'w') as urlfi:
        json.dump(safe_url, urlfi)

    # Generating firstRun.json
    first__run = {
        'First Run?': "Yes",
        'Agree to EULA?': "No"
    }
    with open('Resource/JSON/firstRun.json', 'w') as runfil:
        json.dump(first__run, runfil)
    return


d_Resource = pathlib.Path("Resource")
d_txt = pathlib.Path("Resource/txt")
f_comment = pathlib.Path("Resource/txt/comments.txt")
d_driver = pathlib.Path("Resource/driver")
f_gecko = pathlib.Path("Resource/driver/geckodriver.exe")
f_chrome_87 = pathlib.Path("Resource/driver/chromedriver_87.exe")
f_chrome_88 = pathlib.Path("Resource/driver/chromedriver_88.exe")
d_JSON = pathlib.Path("Resource/JSON")
f_browser = pathlib.Path("Resource/JSON/Browser.json")
f_login = pathlib.Path("Resource/JSON/LogIn.json")
f_url = pathlib.Path("Resource/JSON/URLhistory.json")
f_run = pathlib.Path("Resource/JSON/firstRun.json")

if d_Resource.exists():
    if d_driver.exists() & d_JSON.exists() & d_txt.exists():
        if f_browser.exists() & f_login.exists() & f_url.exists() & f_run.exists() & f_gecko.exists() & \
                f_chrome_87.exists() & f_chrome_88.exists():
            print("Looks good")
        else:
            # Delete old folders
            shutil.rmtree("Resource")
            shutil.rmtree("Resource/txt")
            shutil.rmtree("Resource/JSON")
            shutil.rmtree("Resource/driver")
            mk_folder()
            dow_driver()
            exe_driver()
            mk_files()
    else:
        # Delete old folders
        shutil.rmtree("Resource")
        shutil.rmtree("Resource/txt")
        shutil.rmtree("Resource/JSON")
        shutil.rmtree("Resource/driver")
        mk_folder()
        dow_driver()
        exe_driver()
        mk_files()
else:
    mk_folder()
    dow_driver()
    exe_driver()
    mk_files()

# check_txt()

disagree = False

with open('Resource/txt/EULA.txt') as f:
    if not ('User ' + os.getenv('username') + ' agreed to the EULA on') in f.read():
        disagree = True

with open('Resource/JSON/firstRun.json', 'r') as runfi:
    run_data = runfi.read()
run_obj = json.loads(run_data)

root.update()

if str(run_obj['First Run?']) == "Yes" and str(run_obj['Agree to EULA?']) == "No":
    eula = messagebox.askokcancel("Agree EULA", "Do you agree to the end user license agreement (EULA)?")
    if eula:
        first_run = {
            'First Run?': "Yes",
            'Agree to EULA?': "Yes"
        }
        with open('Resource/JSON/firstRun.json', 'w') as runfi:
            json.dump(first_run, runfi)
        runfi.close()
        with open('Resource/txt/EULA.txt', 'a') as file:
            file.write('User ' + os.getenv('username') + ' agreed to the EULA on %s/%s/%s' % (e.day, e.month, e.year) +
                       ' at %s:%s:%s.' % (e.hour, e.minute, e.second))
        file.close()

    else:
        quit()
elif str(run_obj['First Run?']) == "No" and str(run_obj['Agree to EULA?']) != "Yes":
    eula = messagebox.askokcancel("Agree EULA", "Do you agree to the end user license agreement (EULA)?")
    if eula:
        first_run = {
            'First Run?': "No",
            'Agree to EULA?': "Yes"
        }
        with open('Resource/JSON/firstRun.json', 'w') as runfi:
            json.dump(first_run, runfi)
        runfi.close()
        with open('Resource/txt/EULA.txt', 'a') as file:
            file.write('User ' + os.getenv('username') + ' agreed to the EULA on %s/%s/%s' % (e.day, e.month, e.year) +
                       ' at %s:%s:%s.' % (e.hour, e.minute, e.second))
        file.close()
    else:
        quit()

elif disagree:
    eula = messagebox.askokcancel("Agree EULA", "Do you agree to the end user license agreement (EULA)?")
    if eula:
        first_run = {
            'First Run?': "No",
            'Agree to EULA?': "Yes"
        }
        with open('Resource/JSON/firstRun.json', 'w') as runfi:
            json.dump(first_run, runfi)
        runfi.close()

        with open("Resource/txt/EULA.txt", "a+") as file_object:
            file_object.seek(0)
            data = file_object.read(118)
            if len(data) > 0:
                file_object.write("\n")
            file_object.write('User ' + os.getenv('username') + ' agreed to the EULA on %s/%s/%s' % (e.day, e.month,
                                                                                                     e.year) +
                              ' at %s:%s:%s.' % (e.hour, e.minute, e.second))
            file_object.close()

    else:
        quit()

messagebox.showwarning("Educational purpose only", "This program was written for educational purposes only. "
                                                   "Please use it accordingly!")

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
with open('Resource/JSON/URLhistory.json', 'r') as URLFi:
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
with open('Resource/JSON/LogIn.json', 'r') as LgInFi:
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

b1 = Button(root, text="Run", width=12, command=threading)
b1.grid(row=2, column=1)
b1.bind("<Enter>", on_enter)
b1.bind("<Leave>", on_leave)

b2 = Button(root, text="Settings", width=12, command=settings)
b2.grid(row=2, column=2)
b2.bind("<Enter>", on_enter)
b2.bind("<Leave>", on_leave)

b3 = Button(root, text="Exit", width=12, command=close)
b3.grid(row=2, column=3, pady=(10, 10))
b3.bind("<Enter>", on_enter)
b3.bind("<Leave>", on_leave)

root.mainloop()
