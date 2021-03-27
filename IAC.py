"""
This programme is written and may only be used for educational purposes!
Using it for real purposes violates the Instagram guidelines!
Consequences are, for example, the blocking of the Instagram account.
Please read Instagram's guidelines for more information.
DO NOT indicate used program sections as your own. ©2020 - 2021 by www.github.com/JueK3y/
"""

import sys
import time
import json
import shutil
import random
import os.path
import pathlib
import datetime
import webbrowser

import requests
import tkinter as tk
import subprocess as sp

from tkinter import *
from threading import *
from zipfile import ZipFile
from selenium import webdriver
from tkinter import messagebox, ttk
from ttkthemes import ThemedTk
from tkinter.filedialog import askopenfilename
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import WebDriverException, NoSuchElementException, NoSuchWindowException, \
    InvalidSessionIdException, InvalidArgumentException
from urllib3 import HTTPConnectionPool
from urllib3.exceptions import MaxRetryError


class Colors:
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    BOLD = '\033[1m'
    ENDC = '\033[0m'


def connected():
    timeout = 10
    try:
        requests.get('https://instagram.com', timeout=timeout)
    except (requests.ConnectionError, requests.Timeout):
        try:
            requests.get('https://google.com', timeout=timeout)
        except (requests.ConnectionError, requests.Timeout):
            messagebox.showerror("Internet is gone", "You don't have a working internet connection.")
            try:
                web.close(), web.quit()
                return
            except NoSuchWindowException:
                print(Colors.WARNING, NoSuchWindowException, "for connected()", Colors.ENDC)
                return
            except NameError:
                print(Colors.WARNING, NoSuchWindowException, "for connected()", Colors.ENDC)
                sys.exit(1)


def line_count():
    with open('Resource/JSON/settings.json', 'r') as setfil:
        data_json = setfil.read()
    obj_json = json.loads(data_json)

    # Time for commenting
    line_coun = 0
    for line in open(str(obj_json['commentsPath'])):
        lin = line.strip()
        if not lin.startswith("#"):
            line_coun += 1

    obj_json['Comment Lines'] = line_coun

    with open('Resource/JSON/settings.json', 'w') as settfi:
        json.dump(obj_json, settfi)

    setfi.close()
    settfi.close()


def comment_time():
    with open('Resource/JSON/settings.json', 'r') as settfi:
        data_sett = settfi.read()
    obj_sett = json.loads(data_sett)

    ave_time = float(obj_sett['Max Y']) - 20
    com_lines = obj_sett['Comment Lines']

    obj_sett['Time'] = (com_lines * ave_time) / 60

    with open('Resource/JSON/settings.json', 'w') as settfile:
        json.dump(obj_sett, settfile)

    settfi.close()
    settfile.close()


def ask_file():
    comment = tk.messagebox.askyesno('No comments',
                                     "You don't have any sentences to comment on Instagram." + '\n' + "Do you "
                                                                                                      "want to "
                                                                                                      "create "
                                                                                                      "some now?",
                                     icon='warning')
    if comment and pathlib.Path("Resource/txt/comments.txt").exists():
        os.system("notepad Resource/txt/comments.txt")
        return
    elif comment:
        comment_txt = open("Resource/txt/comments.txt", "a")
        comment_txt.write(
            "! Write only one comment per line. Comments with '!' at the beginning will be ignored.")
        comment_txt.close()

        os.system("notepad Resource/txt/comments.txt")
        return
    else:
        return


def eula_file():
    disagree = False

    with open('Resource/txt/EULA.txt') as f:
        if not ('User ' + os.getenv('username') + ' agreed to the EULA on') in f.read():
            disagree = True

    with open('Resource/JSON/firstRun.json', 'r') as runfi:
        run_data = runfi.read()
    run_obj = json.loads(run_data)

    if str(run_obj['First Run?']) == "Yes" and str(run_obj['Agree to EULA?']) == "No":
        eula = messagebox.askokcancel("Agree EULA", "Do you agree to the end user license agreement (EULA)?" + '\n' +
                                      "You can find the EULA here: juek3y.com/en/code/download/terms-of-service")
        if eula:
            print(Colors.OKGREEN, "Agreed to EULA", Colors.ENDC)
            first_run = {
                'First Run?': "Yes",
                'Agree to EULA?': "Yes"
            }
            with open('Resource/JSON/firstRun.json', 'w') as runfi:
                json.dump(first_run, runfi)
            runfi.close()
            with open('Resource/txt/EULA.txt', 'a') as file:
                file.write(
                    '\n' + 'User ' + os.getenv('username') + ' agreed to the EULA on %s/%s/%s' % (
                        e.day, e.month, e.year) +
                    ' at %s:%s:%s.' % (e.hour, e.minute, e.second))
            file.close()

        else:
            print(Colors.FAIL, "Rejected the EULA", Colors.ENDC)
            sys.exit(1)
    elif str(run_obj['First Run?']) == "No" and str(run_obj['Agree to EULA?']) != "Yes":
        eula = messagebox.askokcancel("Agree EULA", "Do you agree to the end user license agreement (EULA)?" + '\n' +
                                      "You can find the EULA here: juek3y.com/en/code/download/terms-of-service")
        if eula:
            print(Colors.OKGREEN, "Agreed to EULA", Colors.ENDC)
            first_run = {
                'First Run?': "No",
                'Agree to EULA?': "Yes"
            }
            with open('Resource/JSON/firstRun.json', 'w') as runfi:
                json.dump(first_run, runfi)
            runfi.close()
            with open('Resource/txt/EULA.txt', 'a') as file:
                file.write(
                    'User ' + os.getenv('username') + ' agreed to the EULA on %s/%s/%s' % (e.day, e.month, e.year) +
                    ' at %s:%s:%s.' % (e.hour, e.minute, e.second))
            file.close()
        else:
            print(Colors.FAIL, "Rejected the EULA", Colors.ENDC)
            sys.exit(1)

    elif disagree:
        eula = messagebox.askokcancel("Agree EULA", "Do you agree to the end user license agreement (EULA)?" + '\n' +
                                      "You can find the EULA here: juek3y.com/en/code/download/terms-of-service")
        if eula:
            print(Colors.OKGREEN, "Agreed to EULA", Colors.ENDC)
            first_run = {
                'First Run?': "No",
                'Agree to EULA?': "Yes"
            }
            with open('Resource/JSON/firstRun.json', 'w') as runfi:
                json.dump(first_run, runfi)
            runfi.close()

            with open("Resource/txt/EULA.txt", "a+") as file_object:
                file_object.seek(0)
                data_f = file_object.read(118)
                if len(data_f) > 0:
                    file_object.write("\n")
                file_object.write('User ' + os.getenv('username') + ' agreed to the EULA on %s/%s/%s' % (e.day, e.month,
                                                                                                         e.year) +
                                  ' at %s:%s:%s.' % (e.hour, e.minute, e.second))
            file_object.close()

        else:
            print(Colors.FAIL, "Rejected the EULA", Colors.ENDC)
            sys.exit(1)

    f.close()
    runfi.close()


def threading_run():
    t1 = Thread(target=run)
    t1.start()


def run():
    with open('Resource/JSON/settings.json', 'r') as settingfile:
        data_sett = settingfile.read()
    obj_setti = json.loads(data_sett)

    if str(e1.get()) == "" or str(e2.get()) == "" or str(e4.get()) == "" or str(e2.get()) == "None":
        messagebox.showerror("Missing input", "All fields must be filled in.")
        settingfile.close()
    elif len(str(e4.get())) < 6:
        messagebox.showerror("Incorrect password", "Your password can't be that short.")
        settingfile.close()
    elif len(str(e1.get())) < 11:
        messagebox.showerror("Wrong link", "The link have to lead to an instagram post.")
        settingfile.close()
    elif not pathlib.Path(str(obj_setti['commentsPath'])).exists():
        ask_file()
        settingfile.close()
    else:
        if str(obj_setti['Looping comments?']):
            run.loop = True
        else:
            run.loop = False

        settingfile.close()

        # Save URL
        safe_url = {
            'Last URL': url_text.get(),
        }
        with open('Resource/JSON/URLhistory.json', 'w') as urlfi:
            json.dump(safe_url, urlfi)
        urlfi.close()

        # Save user login
        login = {
            'Username': username_text.get(),
            'Password': password_text.get()
        }
        with open('Resource/JSON/LogIn.json', 'w') as lginfi:
            json.dump(login, lginfi)

        lginfi.close()

        eula_file()
        line_count()
        comment_time()

        with open('Resource/JSON/settings.json', 'r') as settfi:
            data_json = settfi.read()
        obj_sett = json.loads(data_json)

        if obj_sett['Comment Lines'] == 0:
            comment = tk.messagebox.askyesno('No comments',
                                             "You don't have any sentences to comment on Instagram." + '\n' + "Do you "
                                                                                                              "want to "
                                                                                                              "create "
                                                                                                              "some "
                                                                                                              "now?",
                                             icon='warning')
            if comment and pathlib.Path("Resource/txt/comments.txt").exists():
                os.system("notepad Resource/txt/comments.txt")
                return
            elif comment:
                comment_txt = open("Resource/txt/comments.txt", "a")
                comment_txt.write(
                    "! Write only one comment per line. Comments with '!' at the beginning will be ignored.")
                comment_txt.close()

                os.system("notepad Resource/txt/comments.txt")
                return
            else:
                return
        if obj_sett['Comment Lines'] < 5:
            msg = messagebox.askokcancel("Very few comments",
                                         "There are less than 5 comments to post." + "\n" + "Do you want to "
                                                                                            "continue?", icon='warning')
            if msg:
                check_comment()
        else:
            if not run.loop:
                msg = messagebox.askokcancel("Duration", "The commenting will take an average of " +
                                             str(round(obj_sett['Time'], 2)) + " minutes.")
                if msg:
                    check_comment()
            else:
                check_comment()

        settfi.close()


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
        with open('Resource/JSON/firstRun.json', 'w') as runfile:
            json.dump(first__run, runfile)
        runfil.close()
        runfile.close()
        runfil.close()
        print(Colors.BOLD, "First Run", Colors.ENDC)
        auto_comment()
    else:
        print(Colors.OKGREEN, "Start commenting", Colors.ENDC)
        auto_comment()
    runfil.close()


def auto_comment():
    global web
    try:
        b1_text.set("Stop")
        b1["command"] = stop
    except RuntimeError:
        sys.exit(1)

    if browser_text.get() == 'Firefox':
        print(Colors.BOLD, "Using Firefox")
        try:
            web = webdriver.Firefox(executable_path=os.getcwd() + '/Resource/driver/geckodriver.exe')
            time.sleep(5)
            web.maximize_window()

            with open('Resource/JSON/Browser.json', 'r') as DriFi:
                driv_data = DriFi.read()
            driv_obj = json.loads(driv_data)

            # Save preferred browser
            driv_obj['Browser'] = "Firefox"

            with open('Resource/JSON/Browser.json', 'w') as BrwFi:
                json.dump(driv_obj, BrwFi)
            BrwFi.close()
            DriFi.close()

        except WebDriverException:
            print(Colors.WARNING, WebDriverException, "for auto_comment()", Colors.ENDC)
            messagebox.showerror("Wrong browser", "Firefox couldn't be found. Please select another browser." + '\n' +
                                 "It is also possible that Firefox was closed accidentally.")
            try:
                b1_text.set("Run")
                b1["command"] = threading_run
                return
            except RuntimeError:
                print(Colors.WARNING, RuntimeError, "for auto_comment()", Colors.ENDC)

    elif browser_text.get() == 'Chrome 87':
        print(Colors.BOLD, "Using Chrome", Colors.ENDC)
        try:
            chr_opt = webdriver.ChromeOptions()
            chr_opt.add_argument("--incognito")
            web = webdriver.Chrome(executable_path=os.getcwd() + '/Resource/driver/chromedriver_87.exe',
                                   options=chr_opt)
            time.sleep(5)
            web.maximize_window()

            with open('Resource/JSON/Browser.json', 'r') as DriFi:
                driv_data = DriFi.read()
            driv_obj = json.loads(driv_data)

            # Save preferred browser
            driv_obj['Browser'] = "Chrome 87"

            with open('Resource/JSON/Browser.json', 'w') as BrwFi:
                json.dump(driv_obj, BrwFi)
            BrwFi.close()
            DriFi.close()
        except WebDriverException:
            print(Colors.WARNING, WebDriverException, "for auto_comment()", Colors.ENDC)
            messagebox.showerror("Wrong browser", "Chrome 87 couldn't be found. Please select another browser." + '\n' +
                                 "It is also possible that Chrome was closed accidentally.")
            try:
                b1_text.set("Run")
                b1["command"] = threading_run
                return
            except RuntimeError:
                print(Colors.WARNING, RuntimeError, "for auto_comment()", Colors.ENDC)

    elif browser_text.get() == 'Chrome 88':
        print(Colors.BOLD, "Using Chrome", Colors.ENDC)
        try:
            chr_opt = webdriver.ChromeOptions()
            chr_opt.add_argument("--incognito")
            web = webdriver.Chrome(executable_path=os.getcwd() + '/Resource/driver/chromedriver_88.exe',
                                   options=chr_opt)
            time.sleep(5)
            web.maximize_window()

            with open('Resource/JSON/Browser.json', 'r') as DriFi:
                driv_data = DriFi.read()
            driv_obj = json.loads(driv_data)

            # Save preferred browser
            driv_obj['Browser'] = "Chrome 88"

            with open('Resource/JSON/Browser.json', 'w') as BrwFi:
                json.dump(driv_obj, BrwFi)
            BrwFi.close()
            DriFi.close()

        except WebDriverException:
            print(Colors.WARNING, WebDriverException, "for auto_comment()", Colors.ENDC)
            messagebox.showerror("Wrong browser", "Chrome 88 couldn't be found. Please select another browser." + '\n' +
                                 "It is also possible that Chrome was closed accidentally.")
            try:
                b1_text.set("Run")
                b1["command"] = threading_run
                return
            except RuntimeError:
                print(Colors.WARNING, RuntimeError, "for auto_comment()", Colors.ENDC)

    elif browser_text.get() == 'Edge 88':
        print(Colors.BOLD, "Using Edge", Colors.ENDC)
        try:
            web = webdriver.Edge(executable_path=os.getcwd() + '/Resource/driver/edgedriver-x64-88.exe')
            time.sleep(5)
            web.maximize_window()

            with open('Resource/JSON/Browser.json', 'r') as DriFi:
                driv_data = DriFi.read()
            driv_obj = json.loads(driv_data)

            # Save preferred browser
            driv_obj['Browser'] = "Edge 88"

            with open('Resource/JSON/Browser.json', 'w') as BrwFi:
                json.dump(driv_obj, BrwFi)
            BrwFi.close()
            DriFi.close()

        except WebDriverException:
            print(Colors.WARNING, WebDriverException, "for auto_comment()", Colors.ENDC)
            messagebox.showerror("Wrong browser", "Edge 88 couldn't be found. Please select another browser." + '\n' +
                                 "It is also possible that Edge was closed accidentally.")
            try:
                b1_text.set("Run")
                b1["command"] = threading_run
                return
            except RuntimeError:
                print(Colors.WARNING, RuntimeError, "for auto_comment()", Colors.ENDC)

    elif browser_text.get() == 'Edge 89':
        print(Colors.BOLD, "Using Edge", Colors.ENDC)
        try:
            web = webdriver.Edge(executable_path=os.getcwd() + '/Resource/driver/edgedriver-x64-89.exe')
            time.sleep(5)
            web.maximize_window()

            with open('Resource/JSON/Browser.json', 'r') as DriFi:
                driv_data = DriFi.read()
            driv_obj = json.loads(driv_data)

            # Save preferred browser
            driv_obj['Browser'] = "Edge 89"

            with open('Resource/JSON/Browser.json', 'w') as BrwFi:
                json.dump(driv_obj, BrwFi)
            BrwFi.close()
            DriFi.close()

        except WebDriverException:
            print(Colors.WARNING, WebDriverException, "for auto_comment()", Colors.ENDC)
            messagebox.showerror("Wrong browser", "Edge 89 couldn't be found. Please select another browser." + '\n' +
                                 "It is also possible that Edge was closed accidentally.")
            try:
                b1_text.set("Run")
                b1["command"] = threading_run
                return
            except RuntimeError:
                print(Colors.WARNING, RuntimeError, "for auto_comment()", Colors.ENDC)

    elif browser_text.get() == 'Edge 90':
        print(Colors.BOLD, "Using Edge", Colors.ENDC)
        try:
            web = webdriver.Edge(executable_path=os.getcwd() + '/Resource/driver/edgedriver-x64-90.exe')
            time.sleep(5)
            web.maximize_window()

            with open('Resource/JSON/Browser.json', 'r') as DriFi:
                driv_data = DriFi.read()
            driv_obj = json.loads(driv_data)

            # Save preferred browser
            driv_obj['Browser'] = "Edge 90"

            with open('Resource/JSON/Browser.json', 'w') as BrwFi:
                json.dump(driv_obj, BrwFi)
            BrwFi.close()
            DriFi.close()

        except WebDriverException:
            print(Colors.WARNING, WebDriverException, "for auto_comment()", Colors.ENDC)
            messagebox.showerror("Wrong browser", "Edge 90 couldn't be found. Please select another browser." + '\n' +
                                 "It is also possible that Edge was closed accidentally.")
            try:
                b1_text.set("Run")
                b1["command"] = threading_run
                return
            except RuntimeError:
                print(Colors.WARNING, RuntimeError, "for auto_comment()", Colors.ENDC)

    elif browser_text.get() == 'Own Browser':
        try:
            with open('Resource/JSON/Browser.json', 'r') as DriFi:
                driv_data = DriFi.read()
            driv_obj = json.loads(driv_data)

            if str(driv_obj['Own Browser Name']) == "Chrome":
                web = webdriver.Chrome(executable_path=str(driv_obj['Driver Path']))
                time.sleep(5)
                web.maximize_window()

            elif str(driv_obj['Own Browser Name']) == "Edge":
                web = webdriver.Edge(executable_path=str(driv_obj['Driver Path']))
                time.sleep(5)
                web.maximize_window()

            elif str(driv_obj['Own Browser Name']) == "Firefox":
                web = webdriver.Firefox(executable_path=str(driv_obj['Driver Path']))
                time.sleep(5)
                web.maximize_window()

            elif str(driv_obj['Own Browser Name']) == "Internet Explorer":
                web = webdriver.Ie(executable_path=str(driv_obj['Driver Path']))
                time.sleep(5)
                web.maximize_window()

            elif str(driv_obj['Own Browser Name']) == "Opera":
                web = webdriver.Opera(executable_path=str(driv_obj['Driver Path']))
                time.sleep(5)
                web.maximize_window()

            elif str(driv_obj['Own Browser Name']) == "Safari":
                web = webdriver.Safari(executable_path=str(driv_obj['Driver Path']))
                time.sleep(5)
                web.maximize_window()

            DriFi.close()
        except WebDriverException:
            print(Colors.WARNING, WebDriverException, "for auto_comment() in 'own Browser'", Colors.ENDC)
            messagebox.showerror("Wrong browser", "The driver you selcted couldn't be found. Please select another "
                                                  "browser." + '\n' + "It is also possible that the Driver was closed "
                                                                      "accidentally.")
            try:
                b1_text.set("Run")
                b1["command"] = threading_run
                return
            except RuntimeError:
                print(Colors.WARNING, RuntimeError, "for auto_comment()", Colors.ENDC)
    else:
        messagebox.showerror("Error occurred", "An error occurred with the browser selection." + '\n' +
                             "Please report this issue with the title ACNBxMB and use another browser.")
        try:
            b1_text.set("Run")
            b1["command"] = threading_run
            return
        except RuntimeError:
            sys.exit(1)

    connected()

    try:
        web.get(url_text.get())
    except InvalidArgumentException:
        print(Colors.WARNING, InvalidArgumentException, "for auto_comment()", Colors.ENDC)
        messagebox.showerror("No valid URL", "The URL provided is not a real link." + '\n' + "Please copy the URL "
                                                                                             "from the post you want "
                                                                                             "to comment.")
        web.close(), web.quit()
        try:
            b1_text.set("Run")
            b1["command"] = threading_run
            return
        except RuntimeError:
            print(Colors.WARNING, RuntimeError, "for auto_comment()", Colors.ENDC)
    except NameError:
        messagebox.showerror("Browser not found", "The selected browser couldn't be found.", icon='error')
    except WebDriverException:
        print(Colors.WARNING, WebDriverException, "for auto_comment()", Colors.ENDC)
        messagebox.showerror("Browser closed", "Action cancelled by user.", icon='warning')
        try:
            b1_text.set("Run")
            b1["command"] = threading_run
            return
        except RuntimeError:
            print(Colors.WARNING, RuntimeError, "for auto_comment()", Colors.ENDC)
    except RuntimeError:
        print(Colors.WARNING, RuntimeError, "for auto_comment()", Colors.ENDC)
        try:
            web.close(), web.quit()
            b1_text.set("Run")
            b1["command"] = threading_run
            return
        except InvalidSessionIdException:
            print(Colors.WARNING, InvalidSessionIdException, "for auto_comment()", Colors.ENDC)
        except (RuntimeError, MaxRetryError):
            print(Colors.WARNING, RuntimeError, "Nr. 2 for auto_comment()", Colors.ENDC)
            sys.exit(1)
    try:
        cookies = web.find_element_by_xpath('/html/body/div[2]/div/div/div/div[2]/button[1]')
        cookies.click()
    except NoSuchElementException:
        print(Colors.WARNING, NoSuchElementException, "for auto_comment()", Colors.ENDC)
        messagebox.showerror("Wrong link", "The link does not lead (directly) to any Instagram post.")
        web.close(), web.quit()
        try:
            b1_text.set("Run")
            b1["command"] = threading_run
            return
        except RuntimeError:
            print(Colors.WARNING, RuntimeError, "for auto_comment()", Colors.ENDC)
    except (NoSuchWindowException, WebDriverException):
        print(Colors.WARNING, NoSuchWindowException, "or", WebDriverException, "for auto_comment()", Colors.ENDC)
        messagebox.showerror("Browser closed", "Action cancelled by user.", icon='warning')
        try:
            b1_text.set("Run")
            b1["command"] = threading_run
            return
        except RuntimeError:
            print(Colors.WARNING, RuntimeError, "for auto_comment()", Colors.ENDC)
    except InvalidSessionIdException:
        print(Colors.WARNING, InvalidSessionIdException, "for auto_comment()", Colors.ENDC)
        sys.exit(1)

    try:
        comment = web.find_element_by_xpath('//*[@id="react-root"]/section/main/div/div[1]/article/div[3]/section['
                                            '1]/span[2]/button')
        comment.click()
    except NoSuchElementException:
        print(Colors.WARNING, NoSuchElementException, "for auto_comment()", Colors.ENDC)
        messagebox.showerror("Error", "Something went wrong. Does the link lead to a picture?")
        web.close(), web.quit()
        try:
            b1_text.set("Run")
            b1["command"] = threading_run
            return
        except RuntimeError:
            print(Colors.WARNING, RuntimeError, "for auto_comment()", Colors.ENDC)
    except NoSuchWindowException:
        print(Colors.WARNING, NoSuchWindowException, "for auto_comment()", Colors.ENDC)
        messagebox.showerror("Browser closed", "Action cancelled by user.", icon='warning')
        try:
            b1_text.set("Run")
            b1["command"] = threading_run
            return
        except RuntimeError:
            print(Colors.WARNING, RuntimeError, "for auto_comment()", Colors.ENDC)
    except InvalidSessionIdException:
        print(Colors.WARNING, InvalidSessionIdException, "for auto_comment()", Colors.ENDC)
        sys.exit(1)

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
        print(Colors.WARNING, NoSuchWindowException, "for auto_comment()", Colors.ENDC)
        messagebox.showerror("Browser closed", "Action cancelled by user.", icon='warning')
        try:
            b1_text.set("Run")
            b1["command"] = threading_run
            return
        except RuntimeError:
            print(Colors.WARNING, RuntimeError, "for auto_comment()", Colors.ENDC)
    except NoSuchElementException:
        print(Colors.WARNING, NoSuchElementException, "for auto_comment()", Colors.ENDC)
        messagebox.showerror("Error", "Something went wrong. Please restart the program.")
        try:
            b1_text.set("Run")
            b1["command"] = threading_run
            return
        except RuntimeError:
            print(Colors.WARNING, RuntimeError, "for auto_comment()", Colors.ENDC)
    except InvalidSessionIdException:
        print(Colors.WARNING, InvalidSessionIdException, "for auto_comment()", Colors.ENDC)
        sys.exit(1)

    try:
        web.find_element_by_css_selector('#slfErrorAlert')
        messagebox.showerror("Wrong information", "Your username and / or your password was wrong.")
        web.close(), web.quit()
        try:
            b1_text.set("Run")
            b1["command"] = threading_run
            return
        except RuntimeError:
            print(Colors.WARNING, RuntimeError, "for auto_comment()", Colors.ENDC)
    except InvalidSessionIdException:
        print(Colors.WARNING, InvalidSessionIdException, "for auto_comment()", Colors.ENDC)
        sys.exit(1)
    except NoSuchWindowException:
        print(Colors.WARNING, NoSuchWindowException, "for auto_comment()", Colors.ENDC)
        messagebox.showerror("Browser closed", "Action cancelled by user.", icon='warning')
        try:
            b1_text.set("Run")
            b1["command"] = threading_run
            return
        except RuntimeError:
            print(Colors.WARNING, RuntimeError, "for auto_comment()", Colors.ENDC)
    except NoSuchElementException:
        print(Colors.WARNING, NoSuchElementException, "for auto_comment()", Colors.ENDC)
        web.find_element_by_css_selector('.sqdOP')

        try:
            svin = web.find_element_by_xpath('/html/body/div[1]/section/main/div/div/div/div/button')
            print(Colors.OKGREEN, "Found target", Colors.ENDC)
            svin.click()

            time.sleep(10)

            with open('Resource/JSON/settings.json', 'r') as setfil:
                data_set = setfil.read()
            obj_set = json.loads(data_set)

            comfi = open(str(obj_set['commentsPath'])).readlines()

            setfil.close()

            run.last_comment = 0

            def comment():
                try:
                    for _ in comfi:
                        line = random.choice(comfi)
                        if line.strip() == run.last_comment:
                            line = random.choice(comfi)
                        while line.startswith('!'):
                            line = random.choice(comfi)
                            if line.strip() == run.last_comment:
                                line = random.choice(comfi)

                        print(Colors.BOLD, "Posting comment: " + line.strip(), Colors.ENDC)

                        with open('Resource/JSON/settings.json', 'r') as settfi:
                            data_json = settfi.read()
                        obj_sett = json.loads(data_json)

                        zeit = random.randint(20, int(obj_sett['Max Y']))
                        print(Colors.BOLD, "Time for the next comment: " + str(zeit), Colors.ENDC)

                        try:
                            select = web.find_element_by_xpath(
                                '//*[@id="react-root"]/section/main/div/div[1]/article/div[3]/section['
                                '3]/div/form/textarea')
                            select.click()
                            time.sleep(1)
                            text = web.find_element_by_css_selector('.Ypffh')
                            text.send_keys(line.strip())
                            run.last_comment = line.strip()
                            connected()
                            text.send_keys(Keys.ENTER)
                            time.sleep(zeit)
                        except InvalidSessionIdException:
                            print(Colors.WARNING, InvalidSessionIdException, "for auto_comment()", Colors.ENDC)
                            sys.exit(1)
                except (HTTPConnectionPool, TypeError):
                    print(Colors.WARNING, " Exception in auto_comment()", Colors.ENDC)
                    sys.exit(1)

            if run.loop:
                while True:
                    comment()
            else:
                comment()
                web.close(), web.quit()

                b1_text.set("Run")
                b1["command"] = threading_run
                messagebox.showinfo("Finished", "All comments are posted.")

        except NoSuchElementException:
            # web.close(), web.quit()
            print(Colors.FAIL, NoSuchElementException, "for auto_comment()", Colors.ENDC)
            print(Colors.FAIL, "Please report this error here: "
                               "https://github.com/JueK3y/Instagram-automated-commenting/issues/new. Error Code: "
                               "ERR_IG_COM_ISS", Colors.ENDC)
            b1_text.set("Run")
            b1["command"] = threading_run
            messagebox.showerror("Slow internet connection", "Please retry! Make sure you have a good Internet "
                                                             "connection." + "\n" + "If the error occurs again, "
                                                                                    "please create an issue via "
                                                                                    "'Settings -> Help' with the title "
                                                                                    "ERR_IG_COM_ISS.")


def sel_bro(value):
    driver_path = askopenfilename(filetypes=(("* .exe", "*.exe"), ("All Files", "*.*")))

    if driver_path:
        messagebox.showinfo("Success", "The Driver has been added." + "\n" + "The program will restart now.")

        with open('Resource/JSON/Browser.json', 'r') as DriFi:
            dri_data = DriFi.read()
        dri_obj = json.loads(dri_data)

        dri_obj['Own Browser Name'] = value
        print(value)
        dri_obj['Driver Path'] = driver_path
        print(driver_path)

        with open('Resource/JSON/Browser.json', 'w') as DrivFi:
            json.dump(dri_obj, DrivFi)

        DriFi.close()
        DrivFi.close()

        restart()


def threading_browser():
    t1 = Thread(target=import_browser)
    t1.start()


def import_browser():
    msg = messagebox.askokcancel("Import webdriver",
                                 "Here you can import the driver for your browser." + "\n" + "Use this only if you "
                                                                                             "have experience with "
                                                                                             "Selenium." + "\n" +
                                 "Google 'Selenium web driver' for more information.", icon='info')
    if msg:
        browserWin = Toplevel(root)
        browserWin.title("Browser selection | AC")
        browserWin.geometry('200x120'), browserWin.wm_attributes("-topmost", 1), browserWin.resizable(False, False)
        try:
            browserWin.iconbitmap('Resource/IAC-Icon.ico')
        except TclError:
            check_content()

        if light:
            browserWin['background'] = '#F5F6F7'
        elif dark:
            browserWin['background'] = '#464646'
        else:
            print(Colors.FAIL, "Uhh, this wasn't supposed happen.", Colors.ENDC)
            restart()

        ttk.Label(browserWin, text="Select the Browser to import").place(x=25, y=10)

        List = ["Choose...", "Chrome", "Edge", "Firefox", "IE", "Opera", "Safari"]

        txt = StringVar()
        ttk.OptionMenu(browserWin, txt, *List, command=sel_bro).place(x=45, y=40, width=110)

        ttk.Button(browserWin, text="Back", command=browserWin.destroy).place(x=45, y=80, width=110)


def threading_settings():
    t1 = Thread(target=settings)
    t1.start()


def settings():
    settingsWin = Toplevel(root)
    settingsWin.title("Settings | AC")
    settingsWin.geometry('350x250'), settingsWin.wm_attributes("-topmost", 1), settingsWin.resizable(False, False)
    try:
        settingsWin.iconbitmap('Resource/IAC-Icon.ico')
    except TclError:
        check_content()

    settings.scale = 0

    if light:
        settingsWin['background'] = '#F5F6F7'
    elif dark:
        settingsWin['background'] = '#464646'
    else:
        print(Colors.FAIL, "Uhh, this wasn't supposed happen.", Colors.ENDC)
        restart()

    def app_light():
        with open('Resource/JSON/settings.json', 'r') as settingfile:
            data_sett = settingfile.read()
        obj_setti = json.loads(data_sett)

        if str(obj_setti['lightMode']) == 'no':
            msg = messagebox.askokcancel("Light Mode", "In order to activate the light mode," + '\n' + "the program "
                                                                                                       "is restarted.")
            if msg:
                obj_setti['lightMode'] = 'yes'
                obj_setti['darkMode'] = 'no'
                print(Colors.OKGREEN, "Using light Mode", Colors.ENDC)
                with open('Resource/JSON/settings.json', 'w') as settfile:
                    json.dump(obj_setti, settfile)
                settingfile.close()
                settfile.close()
                settingsWin.destroy()
                restart()

        elif str(obj_setti['lightMode']) == 'yes':
            msg = messagebox.askyesno("Light Mode", "The light mode has already been activated." + '\n' + "Do you want "
                                                                                                          "to reapply "
                                                                                                          "it?")
            if msg:
                msg = messagebox.askokcancel("Light Mode", "In order to activate the light mode," + '\n' + "the "
                                                                                                           "program "
                                                                                                           "is "
                                                                                                           "restarted.")
                if msg:
                    obj_setti['lightMode'] = 'yes'
                    obj_setti['darkMode'] = 'no'
                    print(Colors.OKGREEN, "Using light Mode", Colors.ENDC)
                    with open('Resource/JSON/settings.json', 'w') as settfile:
                        json.dump(obj_setti, settfile)
                    settingfile.close()
                    settfile.close()
                    settingsWin.destroy()
                    restart()
            elif not msg:
                return
        else:
            msg = messagebox.askyesno("File corrupted",
                                      "Hm, the file for the light mode seems to be corrupted." + '\n' +
                                      "Do you want to download it again?")
            if msg:
                shutil.rmtree("Resource/JSON")
                mk_files()

        settingfile.close()

    def app_dark():
        with open('Resource/JSON/settings.json', 'r') as settingfile:
            data_sett = settingfile.read()
        obj_setti = json.loads(data_sett)
        if str(obj_setti['darkMode']) == 'no':
            msg = messagebox.askokcancel("Dark Mode",
                                         "In order to activate the dark mode," + '\n' + "the program is restarted.")
            if msg:
                obj_setti['lightMode'] = 'no'
                obj_setti['darkMode'] = 'yes'
                print(Colors.OKGREEN, "Using Dark Mode", Colors.ENDC)
                with open('Resource/JSON/settings.json', 'w') as settfile:
                    json.dump(obj_setti, settfile)
                settingfile.close()
                settfile.close()
                settingsWin.destroy()
                restart()

        elif str(obj_setti['darkMode']) == 'yes':
            msg = messagebox.askyesno("Dark Mode", "The dark mode has already been activated." + '\n' + "Do you want "
                                                                                                        "to reapply "
                                                                                                        "it?")
            if msg:
                msg = messagebox.askokcancel("Dark Mode",
                                             "In order to activate the dark mode," + '\n' + "the program is restarted.")
                if msg:
                    obj_setti['lightMode'] = 'no'
                    obj_setti['darkMode'] = 'yes'
                    print(Colors.OKGREEN, "Using Dark Mode", Colors.ENDC)
                    with open('Resource/JSON/settings.json', 'w') as settfile:
                        json.dump(obj_setti, settfile)
                    settingfile.close()
                    settfile.close()
                    settingsWin.destroy()
                    restart()
            elif not msg:
                return
        else:
            msg = messagebox.askyesno("File corrupted", "Hm, the file for the dark mode seems to be corrupted." + '\n' +
                                      "Do you want to download it again?")
            if msg:
                shutil.rmtree("Resource/JSON")
                mk_files()

        settingfile.close()

    def hqm():
        with open('Resource/JSON/settings.json', 'r') as settingfile:
            data_sett = settingfile.read()
        obj_setti = json.loads(data_sett)

        if hqm_var == 1:
            msg = messagebox.askokcancel("Activate HQ mode", "Use this function if the program is displayed blurred." +
                                         '\n' + "Activation may cause elements to be moved." +
                                         '\n' + "The program will restart itself.", icon="info")
            if msg:
                obj_setti['HQM'] = "Activated"
                with open('Resource/JSON/settings.json', 'w') as settfil:
                    json.dump(obj_setti, settfil)
                settingfile.close()
                settfil.close()
                restart()

        elif hqm_var == 0:
            msg = messagebox.askokcancel("De-activate HQ mode", "The function will be de-activated." +
                                         '\n' + "The program will restart itself.", icon="info")
            if msg:
                obj_setti['HQM'] = ""

                with open('Resource/JSON/settings.json', 'w') as settfil:
                    json.dump(obj_setti, settfil)
                settingfile.close()
                settfil.close()
                restart()

    def change_max_y(v):
        try:
            line_count()

            with open('Resource/JSON/settings.json', 'r') as settingfile:
                dat_json = settingfile.read()
            obj_setting = json.loads(dat_json)

            if str(obj_setting['Looping comments?']):
                if not settings.scale:
                    messagebox.showinfo("", "The 'Looping Comments' mode has been activated." + "\n" +
                                        "You can only set the average time when this mode is deactivated.")
                    settings.scale = 1
            else:
                max_y = int(15 * (float(v) + 1) + 21)

                obj_setting['Max Y'] = str(max_y + 20)

                average = (max_y / 60) * float(obj_setting['Comment Lines'])

                la.config(text='Average duration: ' + str(round(average, 2)) + 'min')
                la.place(x=24, y=67)

                with open('Resource/JSON/settings.json', 'w') as settfile:
                    json.dump(obj_setting, settfile)

                settingfile.close()
                settfile.close()
            return

        except FileNotFoundError:
            if not settings.scale:
                ask_file()
                settings.scale = 1

    def loop_com():
        with open('Resource/JSON/settings.json', 'r') as settingfile:
            data_sett = settingfile.read()
        obj_setti = json.loads(data_sett)

        if loop_var == 1:
            msg = messagebox.askokcancel("Looping comments", "This function repeats your sentences when the program "
                                                             "reaches the end of the file." +
                                         '\n' + "You can stop commenting at any time by clicking 'Stop'." +
                                         '\n' + "The program restarts itself now.", icon="info")
            if msg:
                obj_setti['Looping comments?'] = True
                with open('Resource/JSON/settings.json', 'w') as settfil:
                    json.dump(obj_setti, settfil)
                settingfile.close()
                settfil.close()
                restart()

        elif loop_var == 0:
            msg = messagebox.askokcancel("De-activate Repeating", "Your comments will no longer be repeated." +
                                         '\n' + "The program restarts itself now.", icon="info")
            if msg:
                obj_setti['Looping comments?'] = ""

                with open('Resource/JSON/settings.json', 'w') as settfil:
                    json.dump(obj_setti, settfil)
                settingfile.close()
                settfil.close()
                restart()

    def edit_com():
        with open('Resource/JSON/settings.json', 'r') as settingfile:
            data_sett = settingfile.read()
        obj_setti = json.loads(data_sett)

        f_comm = pathlib.Path(str(obj_setti['commentsPath']))

        if not f_comm.exists():
            if not pathlib.Path('Resource/txt/comments.txt').exists():
                comment = tk.messagebox.askyesno('No comments', "You don't have any comments to edit." + '\n' +
                                                 "Do you want to create some now?", icon='info')
                if comment:
                    obj_setti['commentsPath'] = 'Resource/txt/comments.txt'

                    comment_txt = open("Resource/txt/comments.txt", "a")
                    comment_txt.write("! Write only one comment per line. Comments with '!' at the beginning will be "
                                      "ignored.")
                    comment_txt.close()

                    programName = "notepad.exe"
                    fileName = str(obj_setti['commentsPath'])
                    sp.Popen([programName, fileName])

                    settingsWin.update()
                    root.update()
                    return
            else:
                obj_setti['commentsPath'] = 'Resource/txt/comments.txt'

                programName = "notepad.exe"
                fileName = 'Resource/txt/comments.txt'
                sp.Popen([programName, fileName])

                settingsWin.update()
                root.update()
                return
        else:
            programName = "notepad.exe"
            fileName = str(obj_setti['commentsPath'])
            sp.Popen([programName, fileName])

            settingsWin.update()
            root.update()
            return

        settingfile.close()

    def import_com():
        commentspath = askopenfilename(filetypes=(("* .txt", "*.txt"), ("All Files", "*.*")))

        if commentspath:
            messagebox.showinfo("Success", "Your .txt file has been added to the comments.")

            with open('Resource/JSON/settings.json', 'r') as settingfile:
                data_sett = settingfile.read()
            obj_setti = json.loads(data_sett)

            obj_setti['commentsPath'] = commentspath

            with open('Resource/JSON/settings.json', 'w') as settfile:
                json.dump(obj_setti, settfile)

            settingfile.close()
            settfile.close()

    def set_help():
        webbrowser.open_new(r"https://github.com/JueK3y/Instagram-automated-commenting/wiki/Help")

    # Content
    # 1. line
    ttk.Label(settingsWin, text="Appearance").place(x=59, y=5)
    if light:
        sw_appearance = tk.StringVar(value='lightMode')
    else:
        sw_appearance = tk.StringVar(value='darkMode')
    ttk.Radiobutton(settingsWin, text="Light", variable=sw_appearance, value="lightMode", command=app_light). \
        place(x=34, y=29, width=70)
    ttk.Radiobutton(settingsWin, text="Dark", variable=sw_appearance, value="darkMode", command=app_dark). \
        place(x=94, y=29, width=70)

    ttk.Label(settingsWin, text="High quality mode").place(x=208, y=5)

    with open('Resource/JSON/settings.json', 'r') as setfil:
        data_json = setfil.read()
    obj_sett = json.loads(data_json)

    if str(obj_sett['HQM']) == "Activated":
        ttk.Checkbutton(settingsWin, text="HQ Mode activated", variable=IntVar(value=1), command=hqm).place(x=203, y=30)
        hqm_var = 0
    else:
        ttk.Checkbutton(settingsWin, text="Activate HQM", command=hqm).place(x=201, y=30)
        hqm_var = 1

    setfil.close()

    # 2. Lines
    try:
        with open('Resource/JSON/settings.json', 'r') as setfil:
            data_json = setfil.read()
        obj_sett = json.loads(data_json)

        if pathlib.Path(str(obj_sett['commentsPath'])).exists() and not str(obj_sett['Looping comments?']):
            la = ttk.Label(settingsWin, text='Average duration: ' + str(round((((int(obj_sett['Max Y']) - 20) / 60) *
                                                                               float(obj_sett['Comment Lines'])),
                                                                              2)) + 'min')

            la.place(x=24, y=67)
        else:
            la = ttk.Label(settingsWin, text='Average duration')
            la.place(x=45, y=67)
        setfi.close()
    except KeyError:
        la = ttk.Label(settingsWin, text='Average duration')
        la.place(x=45, y=67)

    ttk.Scale(settingsWin, orient=tk.HORIZONTAL, from_=0, to=4, length=110, command=change_max_y). \
        place(x=39, y=98, width=110)

    ttk.Label(settingsWin, text="Loop comments").place(x=214, y=67)

    with open('Resource/JSON/settings.json', 'r') as setfil:
        data_json = setfil.read()
    obj_sett = json.loads(data_json)

    if str(obj_sett['Looping comments?']):
        ttk.Checkbutton(settingsWin, text="Looping comments", variable=IntVar(value=1), command=loop_com).place(x=201,
                                                                                                                y=92)
        loop_var = 0
    else:
        ttk.Checkbutton(settingsWin, text="Repeat comments", command=loop_com).place(x=201, y=92)
        loop_var = 1

    # 3. Line
    ttk.Label(settingsWin, text="Comments").place(x=61, y=129)
    ttk.Button(settingsWin, text="Edit", command=edit_com).place(x=36, y=151, width=50)
    ttk.Button(settingsWin, text="Import", command=import_com).place(x=86, y=151, width=60)

    ttk.Label(settingsWin, text="More Browser").place(x=221, y=129)
    ttk.Button(settingsWin, text="Import", command=threading_browser).place(x=204, y=151, width=110)

    # 4. Line
    ttk.Button(settingsWin, text="Help", command=set_help).place(x=36, y=200, width=110)
    ttk.Button(settingsWin, text="Back", command=settingsWin.destroy).place(x=204, y=200, width=110)


def check_alive():
    try:
        web.title
        return True
    except (InvalidSessionIdException, MaxRetryError, NameError):
        return False


def close():
    if check_alive():
        msg_box = tk.messagebox.askquestion('Exit Application', 'Are you sure you want to exit the application?',
                                            icon='warning')
        if msg_box == 'yes':
            root.destroy()
            try:
                web.close(), web.quit()
                sys.exit(1)
            except (NameError, InvalidSessionIdException, WebDriverException, TclError):
                print(Colors.WARNING, "An exception in close() occurred", Colors.ENDC)
                sys.exit(1)
        else:
            return
    else:
        root.destroy()
        sys.exit(1)


def stop():
    msg_box = tk.messagebox.askquestion('Stop Commenting', 'Are you sure you want to stop commenting?',
                                        icon='warning')
    if msg_box == 'yes':
        try:
            web.close(), web.quit()
            try:
                b1_text.set("Run")
                b1["command"] = threading_run
                return
            except RuntimeError:
                print(Colors.WARNING, RuntimeError, "for stop()", Colors.ENDC)
        except (NameError, InvalidSessionIdException, WebDriverException):
            print(Colors.WARNING, " An exception in stop() occurred", Colors.ENDC)
            return
    else:
        return


def restart():
    print(Colors.OKGREEN, "The program restarts now", Colors.ENDC)
    root.destroy()
    os.system('python ' + str(os.path.basename(__file__)))
    os.execl(sys.executable, os.path.abspath(__file__), *sys.argv)


def check_content():
    d_Resource = pathlib.Path("Resource")
    f_icon = pathlib.Path("Resource/IAC-Icon.ico")
    d_txt = pathlib.Path("Resource/txt")
    f_eula = pathlib.Path("Resource/txt/EULA.txt")
    d_driver = pathlib.Path("Resource/driver")
    f_gecko = pathlib.Path("Resource/driver/geckodriver.exe")
    f_chrome_87 = pathlib.Path("Resource/driver/chromedriver_87.exe")
    f_chrome_88 = pathlib.Path("Resource/driver/chromedriver_88.exe")
    d_JSON = pathlib.Path("Resource/JSON")
    f_login = pathlib.Path("Resource/JSON/LogIn.json")
    f_url = pathlib.Path("Resource/JSON/URLhistory.json")
    f_run = pathlib.Path("Resource/JSON/firstRun.json")
    f_set = pathlib.Path("Resource/JSON/settings.json")

    try:
        if d_Resource.exists():
            if d_driver.exists():
                if d_JSON.exists():
                    if d_txt.exists() & f_run.exists() & f_login.exists() & f_url.exists() & f_set.exists() & \
                            f_gecko.exists() & f_chrome_87.exists() & f_chrome_88.exists() & f_eula.exists() & f_icon. \
                            exists():
                        print(Colors.OKGREEN, "All files are downloaded", Colors.ENDC)
                    else:
                        msg_box = messagebox.askokcancel("Creating files", "Some files are being downloaded. This will "
                                                                           "take some time.")
                        if msg_box:
                            print(Colors.BOLD, "Downloading files...", Colors.ENDC)
                            shutil.rmtree("Resource")
                            mk_folder()
                            dow_driver()
                            exe_driver()
                            mk_files()
                            restart()
                            sys.exit(1)
                        else:
                            print(Colors.BOLD, "Download canceled by user", Colors.ENDC)
                            sys.exit()
                else:
                    if f_gecko.exists() & f_chrome_87.exists() & f_chrome_88.exists() & f_eula.exists() & f_icon. \
                            exists():
                        msg_box = messagebox.askokcancel("Creating files",
                                                         "Some files are being created. This will take some time.")
                        if msg_box:
                            print(Colors.BOLD, "Creating JSON files...", Colors.ENDC)
                            try:
                                shutil.rmtree("Resource/JSON")
                                mk_folder_2()
                                mk_files()
                                restart()
                                sys.exit(1)
                            except FileNotFoundError:
                                mk_folder_2()
                                mk_files()
                                restart()

                        else:
                            print(Colors.BOLD, "Download canceled by user", Colors.ENDC)
                            sys.exit(1)
                    else:
                        msg_box = messagebox.askokcancel("Creating files",
                                                         "Some files are being downloaded. This will take some time.")
                        if msg_box:
                            print(Colors.BOLD, "Downloading files...", Colors.ENDC)
                            shutil.rmtree("Resource")
                            mk_folder()
                            dow_driver()
                            exe_driver()
                            mk_files()
                            restart()
                            sys.exit(1)
                        else:
                            print(Colors.BOLD, "Download canceled by user", Colors.ENDC)
                            sys.exit(1)
            else:
                msg_box = messagebox.askokcancel("Creating files",
                                                 "Some files are being downloaded. This will take some time.")
                if msg_box:
                    print(Colors.BOLD, "Downloading files...", Colors.ENDC)
                    shutil.rmtree("Resource")
                    mk_folder()
                    dow_driver()
                    exe_driver()
                    mk_files()
                    restart()
                    sys.exit(1)
                else:
                    print(Colors.BOLD, "Download canceled by user", Colors.ENDC)
                    sys.exit(1)
        else:
            msg_box = messagebox.askokcancel("Creating files",
                                             "Some files are being downloaded. This will take some time.")
            if msg_box:
                print(Colors.BOLD, "Downloading files...", Colors.ENDC)
                mk_folder()
                dow_driver()
                exe_driver()
                mk_files()
                restart()
            else:
                print(Colors.BOLD, "Download canceled by user", Colors.ENDC)
                sys.exit(1)

    except PermissionError:
        messagebox.showerror("Permission Error",
                             "Restart the program with administrator rights." + "\n" +
                             "Reinstall the program if the error keeps occurring.")


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


def mk_folder_2():
    # Make JSON folder
    json_dir = os.getcwd() + '/Resource'
    directory_name = "JSON"
    json_path = os.path.join(json_dir, directory_name)
    os.mkdir(json_path)


def dow_driver():
    connected()
    gecko = "https://github.com/mozilla/geckodriver/releases/download/v0.28.0/geckodriver-v0.28.0-win64.zip"
    chr87 = "https://chromedriver.storage.googleapis.com/87.0.4280.88/chromedriver_win32.zip"
    chr88 = "https://chromedriver.storage.googleapis.com/88.0.4324.27/chromedriver_win32.zip"
    edg88 = "https://msedgedriver.azureedge.net/88.0.705.56/edgedriver_win64.zip"
    edg89 = "https://msedgedriver.azureedge.net/89.0.774.18/edgedriver_win64.zip"
    edg90 = "https://msedgedriver.azureedge.net/90.0.787.0/edgedriver_win64.zip"
    EULA = "https://juek3y.com/src/download/txt/End%20User%20License%20Agreement%20for%20IAC.txt"
    icon = "https://juek3y.com/src/download/img/IAC-Icon-Ver.-2.ico"

    try:
        tk.Label(root, text="Downloading files...").place(x=160, y=35)
        root.update()
        a = requests.get(gecko)
        root.update()
        b = requests.get(chr87)
        root.update()
        c = requests.get(chr88)
        root.update()
        d = requests.get(edg88)
        root.update()
        ea = requests.get(edg89)
        root.update()
        f = requests.get(edg90)
        root.update()
        g = requests.get(EULA)
        root.update()
        h = requests.get(icon)
        root.update()

        with open("Resource/driver/geckodriver.zip", 'wb') as gec:
            gec.write(a.content)

        gec.close()

        with open("Resource/driver/chromedriver-87.zip", 'wb') as c87:
            c87.write(b.content)

        c87.close()

        with open("Resource/driver/chromedriver-88.zip", 'wb') as c88:
            c88.write(c.content)

        c88.close()

        with open("Resource/driver/edgedriver-x64-88.zip", 'wb') as edg88:
            edg88.write(d.content)

        edg88.close()

        with open("Resource/driver/edgedriver-x64-89.zip", 'wb') as edg89:
            edg89.write(ea.content)

        edg89.close()

        with open("Resource/driver/edgedriver-x64-90.zip", 'wb') as edg90:
            edg90.write(f.content)

        edg90.close()

        with open("Resource/txt/EULA.txt", 'wb') as eul:
            eul.write(g.content)

        eul.close()

        with open("Resource/IAC-Icon.ico", "wb") as ico:
            ico.write(h.content)
        root.iconbitmap('Resource/IAC-Icon.ico')

        ico.close()

        return

    except (requests.exceptions.ConnectionError, requests.exceptions.ChunkedEncodingError):
        print(Colors.FAIL, "An exception in dow_driver() occurred", Colors.ENDC)
        print(Colors.FAIL, "This is an time-out error! Please restart the program and try it again.", Colors.ENDC)
        messagebox.showerror("Time out", "Something went wrong when downloading the files. Please restart the program.")


def exe_driver():
    # Firefox
    with ZipFile('Resource/driver/geckodriver.zip', 'r') as zipObj:
        zipObj.extractall('Resource/driver')

    zipObj.close()

    # Chrome
    with ZipFile('Resource/driver/chromedriver-87.zip', 'r') as zipObj:
        zipObj.extractall('Resource/driver')

    old_file_name = "Resource/driver/chromedriver.exe"
    new_file_name = "Resource/driver/chromedriver_87.exe"

    os.rename(old_file_name, new_file_name)

    zipObj.close()

    with ZipFile('Resource/driver/chromedriver-88.zip', 'r') as zipObj:
        zipObj.extractall('Resource/driver')

    old_file_name = "Resource/driver/chromedriver.exe"
    new_file_name = "Resource/driver/chromedriver_88.exe"

    os.rename(old_file_name, new_file_name)

    zipObj.close()

    # Edge
    with ZipFile('Resource/driver/edgedriver-x64-88.zip', 'r') as zipObj:
        zipObj.extractall('Resource/driver')

    old_file_name = "Resource/driver/msedgedriver.exe"
    new_file_name = "Resource/driver/edgedriver-x64-88.exe"

    os.rename(old_file_name, new_file_name)

    zipObj.close()

    with ZipFile('Resource/driver/edgedriver-x64-89.zip', 'r') as zipObj:
        zipObj.extractall('Resource/driver')

    old_file_name = "Resource/driver/msedgedriver.exe"
    new_file_name = "Resource/driver/edgedriver-x64-89.exe"

    os.rename(old_file_name, new_file_name)

    zipObj.close()

    with ZipFile('Resource/driver/edgedriver-x64-90.zip', 'r') as zipObj:
        zipObj.extractall('Resource/driver')

    old_file_name = "Resource/driver/msedgedriver.exe"
    new_file_name = "Resource/driver/edgedriver-x64-90.exe"

    os.rename(old_file_name, new_file_name)

    zipObj.close()

    os.remove("Resource/driver/geckodriver.zip")
    os.remove("Resource/driver/chromedriver-87.zip")
    os.remove("Resource/driver/chromedriver-88.zip")
    os.remove("Resource/driver/edgedriver-x64-88.zip")
    os.remove("Resource/driver/edgedriver-x64-89.zip")
    os.remove("Resource/driver/edgedriver-x64-90.zip")
    shutil.rmtree("Resource/driver/Driver_Notes")
    return


# Make files inside JSON folder
def mk_files():
    # Generating LogIn.json
    login = {
        'Username': "",
        'Password': ""
    }
    with open('Resource/JSON/LogIn.json', 'w') as lginfi:
        json.dump(login, lginfi)

    lginfi.close()

    # Generating URLhistory.json
    safe_url = {
        'Last URL': ""
    }
    with open('Resource/JSON/URLhistory.json', 'w') as urlfi:
        json.dump(safe_url, urlfi)

    urlfi.close()

    # Generating firstRun.json
    first__run = {
        'First Run?': "Yes",
        'Agree to EULA?': "No"
    }
    with open('Resource/JSON/firstRun.json', 'w') as runfil:
        json.dump(first__run, runfil)

    runfil.close()

    # Generating Browser.json
    browser = {
        'Browser': "",
        'Driver Path': "",
        "Own Browser Name": ""
    }
    with open('Resource/JSON/Browser.json', 'w') as brofil:
        json.dump(browser, brofil)

    brofil.close()

    # Generating Settings.json
    sett = {
        'commentsPath': "Resource/txt/comments.txt",
        'lightMode': "yes",
        'darkMode': "no",
        'Max Y': 86,
        'HQM': "",
        "Looping comments?": ""
    }
    with open('Resource/JSON/settings.json', 'w') as setfil:
        json.dump(sett, setfil)

    setfil.close()

    return


def check_json():
    try:
        with open('Resource/JSON/firstRun.json', 'r') as json_file:
            data_json = json_file.read()
        obj_json = json.loads(data_json)
        str(obj_json['First Run?'])
        str(obj_json['Agree to EULA?'])
        json_file.close()
    except KeyError:
        print(Colors.WARNING, "firstRun file error", Colors.ENDC)
        shutil.rmtree("Resource/JSON")
        check_content()
    except FileNotFoundError:
        check_content()

    try:
        with open('Resource/JSON/LogIn.json', 'r') as json_file:
            data_json = json_file.read()
        obj_json = json.loads(data_json)
        str(obj_json['Username'])
        str(obj_json['Password'])
        json_file.close()
    except KeyError:
        print(Colors.WARNING, "LogIn file error", Colors.ENDC)
        shutil.rmtree("Resource/JSON")
        check_content()
    except FileNotFoundError:
        check_content()

    try:
        with open('Resource/JSON/Browser.json', 'r') as json_file:
            data_json = json_file.read()
        obj_json = json.loads(data_json)
        str(obj_json['Browser'])
        str(obj_json['Driver Path'])
        str(obj_json['Own Browser Name'])
        json_file.close()
    except KeyError:
        print(Colors.WARNING, "Browser file error", Colors.ENDC)
        shutil.rmtree("Resource/JSON")
        check_content()
    except FileNotFoundError:
        check_content()

    try:
        with open('Resource/JSON/settings.json', 'r') as json_file:
            data_json = json_file.read()
        obj_json = json.loads(data_json)
        str(obj_json['commentsPath'])
        str(obj_json['lightMode'])
        str(obj_json['darkMode'])
        str(obj_json['Max Y'])
        str(obj_json['HQM'])
        str(obj_json['Looping comments?'])
        json_file.close()
    except KeyError:
        print(Colors.WARNING, "settings file error", Colors.ENDC)
        shutil.rmtree("Resource/JSON")
        check_content()
    except FileNotFoundError:
        check_content()

    try:
        with open('Resource/JSON/URLhistory.json', 'r') as json_file:
            data_json = json_file.read()
        obj_json = json.loads(data_json)
        str(obj_json['Last URL'])
        json_file.close()
    except KeyError:
        print(Colors.WARNING, "URLhistory file error", Colors.ENDC)
        shutil.rmtree("Resource/JSON")
        check_content()
    except FileNotFoundError:
        check_content()


# Start of the actual program
try:
    with open('Resource/JSON/settings.json', 'r') as setfi:
        data = setfi.read()
    obj = json.loads(data)
    if str(obj['lightMode']) == "yes":
        light = True
        dark = False
        root = ThemedTk(theme="arc")
        root['background'] = '#F5F6F7'
        print(Colors.BOLD, "Using Light Mode", Colors.ENDC)
        setfi.close()
    elif str(obj['darkMode']) == "yes":
        light = False
        dark = True
        root = ThemedTk(theme="equilux")
        root['background'] = '#464646'
        print(Colors.BOLD, "Using Dark Mode", Colors.ENDC)
        setfi.close()
    else:
        root = ThemedTk(theme="yaru")
        light = True
        dark = False
        root.title("Automated Commenting")
        check_content()

    if str(obj['HQM']) == "Activated":
        import ctypes

        ctypes.windll.shcore.SetProcessDpiAwareness(1)
        print(Colors.OKGREEN, "Using HQ Mode", Colors.ENDC)
    setfi.close()
except FileNotFoundError:
    root = ThemedTk(theme="yaru")
    root.geometry("440x105")
    light = True
    dark = False
    root.title("Automated Commenting")
    check_content()
except KeyError:
    root = tk.Tk()
    root.geometry("440x105")
    light = True
    dark = False
    root.title("Automated Commenting")
    shutil.rmtree("Resource/JSON")
    check_content()

screen_width, screen_height = 440, 105
try:
    root.geometry(str(screen_width) + "x" + str(screen_height))
except TclError:
    print(Colors.WARNING, "This error occurs only during the first run. You can ignore it.", Colors.ENDC)
x_Left = int(root.winfo_screenwidth() / 2 - screen_width / 2)
y_Top = int(root.winfo_screenheight() / 2 - screen_height / 2)
root.geometry("+{}+{}".format(x_Left, y_Top))
root.title("Automated Commenting"), root.resizable(False, False)
try:
    root.iconbitmap('Resource/IAC-Icon.ico')
except TclError:
    check_content()

check_content()
check_json()
exit_program = False
e = datetime.datetime.now()

eula_file()

root.update()

add_msg = "\nIf something is not working correctly for you, please report it under Settings --> Help.\n"

messagebox.showwarning("Educational purpose only", "This program was written for educational purposes only.\nPlease "
                                                   "use it accordingly!" + '\n' + add_msg + "\n\n@2020 - %s" % e.year +
                                                   " by JueK3y")

# Label
li = ttk.Label(root, text="Post URL")
li.grid(row=0, column=0)
li = ttk.Label(root, text="Username")
li.grid(row=0, column=2)
li = ttk.Label(root, text="Browser")
li.grid(row=1, column=0)
li = ttk.Label(root, text="Password")
li.grid(row=1, column=2)

with open('Resource/JSON/URLhistory.json', 'r') as URLFi:
    data = URLFi.read()
obj = json.loads(data)

# Input
url_text = StringVar()
e1 = ttk.Entry(root, textvariable=url_text)
e1.insert(0, str(obj['Last URL']))
e1.grid(row=0, column=1)

URLFi.close()

try:
    with open('Resource/JSON/Browser.json', 'r') as BroFi:
        data = BroFi.read()
    obj_b = json.loads(data)

    if str(obj_b['Own Browser Name']) != "":
        OptionList = [str(obj_b['Own Browser Name'] + " (Own)"), str(obj_b['Own Browser Name'] + " (Own)"), "Firefox",
                      "Chrome 87", "Chrome 88", "Edge 88", "Edge 89", "Edge 90"]
    else:
        if str(obj_b['Browser']) == "Chrome 87":
            OptionList = ["Chrome 87", "Chrome 87", "Chrome 88", "Edge 88", "Edge 89", "Edge 90", "Firefox"]
        elif str(obj_b['Browser']) == "Chrome 87":
            OptionList = ["Chrome 88", "Chrome 88", "Chrome 87", "Edge 90", "Edge 89", "Edge 88", "Firefox"]
        elif str(obj_b['Browser']) == "Edge 88":
            OptionList = ["Edge 88", "Edge 88", "Edge 89", "Edge 90", "Chrome 87", "Chrome 88", "Firefox"]
        elif str(obj_b['Browser']) == "Edge 89":
            OptionList = ["Edge 89", "Edge 89", "Edge 88", "Edge 90", "Chrome 87", "Chrome 88", "Firefox"]
        elif str(obj_b['Browser']) == "Edge 90":
            OptionList = ["Edge 90", "Edge 90", "Edge 89", "Edge 80", "Chrome 88", "Chrome 87", "Firefox"]
        else:
            OptionList = ["Firefox", "Firefox", "Chrome 87", "Chrome 88", "Edge 88", "Edge 89", "Edge 90"]

    BroFi.close()
except FileNotFoundError:
    OptionList = ["Firefox", "Firefox", "Chrome 87", "Chrome 88", "Edge 88", "Edge 89", "Edge 90"]

browser_text = StringVar()
e3 = ttk.OptionMenu(root, browser_text, *OptionList).place(x=48, y=23.5, width=110)  # height=25

with open('Resource/JSON/LogIn.json', 'r') as LgInFi:
    data = LgInFi.read()
obj = json.loads(data)

username_text = StringVar()
e2 = ttk.Entry(root, textvariable=username_text)
e2.insert(0, str(obj['Username']))
e2.grid(row=0, column=3)

password_text = StringVar()
e4 = ttk.Entry(root, textvariable=password_text, show='*')
e4.insert(0, str(obj['Password']))
e4.grid(row=1, column=3)

LgInFi.close()


def password():
    if var.get() == 1:
        e4.configure(show="")
    elif var.get() == 0:
        e4.configure(show="*")


# Buttons
var = IntVar()
bp = ttk.Checkbutton(root, command=password, offvalue=0, onvalue=1, variable=var)
bp.grid(row=1, column=4)

b1_text = tk.StringVar()
b1 = ttk.Button(root, textvariable=b1_text, width=12,
                command=threading_run)  # .place(x=57.5, y=60, width=100) # height=25
b1_text.set("Run")
b1.grid(row=2, column=1, pady=(15, 10))

b2 = ttk.Button(root, text="Settings", width=12,
                command=threading_settings)  # .place(x=170, y=60, width=100) # height=25
b2.grid(row=2, column=2, pady=(15, 10))

b3 = ttk.Button(root, text="Exit", width=12, command=close)
b3.grid(row=2, column=3, pady=(15, 10))

root.mainloop()
