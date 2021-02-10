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
        messagebox.showerror("Internet is gone", "You don't have a working internet connection.")
        try:
            web.close()
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
    for line in open(comments_path):
        lin = line.strip()
        if not lin.startswith("#"):
            line_coun += 1

    obj_json['Comment Lines'] = line_coun

    setfi.close()

    with open('Resource/JSON/settings.json', 'w') as settfi:
        json.dump(obj_json, settfi)

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
            "# Write only one comment per line. Comments with '#' at the beginning will be ignored.")
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
                    'User ' + os.getenv('username') + ' agreed to the EULA on %s/%s/%s' % (e.day, e.month, e.year) +
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
    run.loop = False
    if str(e1.get()) == "" or str(e2.get()) == "" or str(e4.get()) == "" or str(e2.get()) == "None":
        messagebox.showerror("Missing input", "All fields must be filled in.")
    elif len(str(e4.get())) < 6:
        messagebox.showerror("Incorrect password", "Your password can't be that short.")
    elif len(str(e1.get())) < 11:
        messagebox.showerror("Wrong link", "The link have to lead to an instagram post.")
    elif not pathlib.Path(comments_path).exists():
        ask_file()
    else:
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
                    "# Write only one comment per line. Comments with '#' at the beginning will be ignored.")
                comment_txt.close()

                os.system("notepad Resource/txt/comments.txt")
                return
            else:
                return
        if obj_sett['Comment Lines'] < 5:
            msg = messagebox.askokcancel("Very few comments",
                                         "There are less than 5 comments to post." + "\n" + "Do you want to "
                                                                                            "continue?",
                                         icon='warning')
            if msg:
                msg = messagebox.askyesno("Duration", "The commenting will take an average of " +
                                          str(round(obj_sett['Time'], 2)) + " minutes." + "\n" +
                                          "Do you want to loop the commenting?")
                if msg:
                    run.loop = True
                    print(Colors.OKGREEN, "Looping comments", Colors.ENDC)

                check_comment()
        else:
            msg = messagebox.askyesno("Duration", "The commenting will take an average of " +
                                      str(round(obj_sett['Time'], 2)) + " minutes." + "\n" +
                                      "Do you want to loop the commenting?")
            if msg:
                run.loop = True
                print(Colors.OKGREEN, "Looping comments", Colors.ENDC)

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
            BrwFi.close()
        except WebDriverException:
            print(Colors.WARNING, WebDriverException, "for auto_comment()", Colors.ENDC)
            messagebox.showerror("Browser error", "An error occurred. Please try another browser.")
            try:
                b1_text.set("Run")
                b1["command"] = threading_run
                return
            except RuntimeError:
                print(Colors.WARNING, RuntimeError, "for auto_comment()", Colors.ENDC)
            # messagebox.showerror("Wrong browser", "IE couldn't be found. Please select another browser.")

    elif browser_text.get() == 'Firefox':
        try:
            web = webdriver.Firefox(executable_path=os.getcwd() + '/Resource/driver/geckodriver.exe')
            time.sleep(5)
            web.maximize_window()

            # Save preferred browser
            brwco = {
                'Browser': "Firefox",
            }
            with open('Resource/JSON/Browser.json', 'w') as BrwFi:
                json.dump(brwco, BrwFi)
            BrwFi.close()
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
        try:
            chr_opt = webdriver.ChromeOptions()
            chr_opt.add_argument("--incognito")
            web = webdriver.Chrome(executable_path=os.getcwd() + '/Resource/driver/chromedriver_87.exe',
                                   options=chr_opt)
            time.sleep(5)
            web.maximize_window()

            # Save preferred browser
            brwco = {
                'Browser': "Chrome 87",
            }
            with open('Resource/JSON/Browser.json', 'w') as BrwFi:
                json.dump(brwco, BrwFi)
            BrwFi.close()
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
        try:
            chr_opt = webdriver.ChromeOptions()
            chr_opt.add_argument("--incognito")
            web = webdriver.Chrome(executable_path=os.getcwd() + '/Resource/driver/chromedriver_88.exe',
                                   options=chr_opt)
            time.sleep(5)
            web.maximize_window()

            # Save preferred browser
            brwco = {
                'Browser': "Chrome 87",
            }
            with open('Resource/JSON/Browser.json', 'w') as BrwFi:
                json.dump(brwco, BrwFi)
            BrwFi.close()
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
        try:
            web = webdriver.Edge(executable_path=os.getcwd() + '/Resource/driver/edgedriver-x64-88.exe')
            time.sleep(5)
            web.maximize_window()

            # Save preferred browser
            brwco = {
                'Browser': "Edge 88",
            }
            with open('Resource/JSON/Browser.json', 'w') as BrwFi:
                json.dump(brwco, BrwFi)
            BrwFi.close()
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
        try:
            web = webdriver.Edge(executable_path=os.getcwd() + '/Resource/driver/edgedriver-x64-89.exe')
            time.sleep(5)
            web.maximize_window()

            # Save preferred browser
            brwco = {
                'Browser': "Edge 89",
            }
            with open('Resource/JSON/Browser.json', 'w') as BrwFi:
                json.dump(brwco, BrwFi)
            BrwFi.close()
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
        try:
            web = webdriver.Edge(executable_path=os.getcwd() + '/Resource/driver/edgedriver-x64-90.exe')
            time.sleep(5)
            web.maximize_window()

            # Save preferred browser
            brwco = {
                'Browser': "Edge 90",
            }
            with open('Resource/JSON/Browser.json', 'w') as BrwFi:
                json.dump(brwco, BrwFi)
            BrwFi.close()
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

    connected()

    try:
        web.get(url_text.get())
    except InvalidArgumentException:
        print(Colors.WARNING, InvalidArgumentException, "for auto_comment()", Colors.ENDC)
        messagebox.showerror("No valid URL", "The URL provided is not a real link." + '\n' + "Please copy the URL "
                                                                                             "from the post you want "
                                                                                             "to comment.")
        web.close()
        try:
            b1_text.set("Run")
            b1["command"] = threading_run
            return
        except RuntimeError:
            print(Colors.WARNING, RuntimeError, "for auto_comment()", Colors.ENDC)
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
            web.close()
            b1_text.set("Run")
            b1["command"] = threading_run
            return
        except InvalidSessionIdException:
            print(Colors.WARNING, InvalidSessionIdException, "for auto_comment()", Colors.ENDC)
        except RuntimeError:
            print(Colors.WARNING, RuntimeError, "Nr. 2 for auto_comment()", Colors.ENDC)
            sys.exit(1)
    try:
        cookies = web.find_element_by_xpath('/html/body/div[2]/div/div/div/div[2]/button[1]')
        cookies.click()
    except NoSuchElementException:
        print(Colors.WARNING, NoSuchElementException, "for auto_comment()", Colors.ENDC)
        messagebox.showerror("Wrong link", "The link does not lead (directly) to any Instagram post.")
        web.close()
        try:
            b1_text.set("Run")
            b1["command"] = threading_run
            return
        except RuntimeError:
            print(Colors.WARNING, RuntimeError, "for auto_comment()", Colors.ENDC)
    except NoSuchWindowException or WebDriverException:
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
        web.close()
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
        web.close()
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
            svin = web.find_element_by_xpath('/html/body/div[1]/section/main/div/div[1]/article/div[3]/section[3]/div/form/textarea')
            svin.click()

            time.sleep(10)

            with open('Resource/JSON/settings.json', 'r') as setfil:
                data_set = setfil.read()
            obj_set = json.loads(data_set)

            comfi = open(str(obj_set['commentsPath'])).read().splitlines()

            setfil.close()

            def comment():
                # Major error?
                for line in comfi:
                    t = line.strip()
                    if not t.startswith("#"):
                        print(Colors.BOLD, "Posting comment: " + line.strip(), Colors.ENDC)

                        # It doesn't ignore # or ""
                        # myline = random.choice(comfi)
                        # print(myline)

                        # Does post a random letter from the sentence.
                        # myline = random.choice(line.strip())

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
                            # text.send_keys(myline)
                            text.send_keys(line.strip())
                            connected()
                            text.send_keys(Keys.ENTER)
                            time.sleep(zeit)
                        except InvalidSessionIdException:
                            print(Colors.WARNING, InvalidSessionIdException, "for auto_comment()", Colors.ENDC)
                            # messagebox.showerror("Browser closed", "Action cancelled by user.", icon='warning')
                            sys.exit(1)

            if run.loop:
                while True:
                    comment()
            else:
                comment()
                web.close()

                b1_text.set("Run")
                b1["command"] = threading_run
                messagebox.showinfo("Finished", "All comments are posted.")

        except NoSuchElementException:
            web.close()

            b1_text.set("Run")
            b1["command"] = threading_run
            messagebox.showerror("Slow internet connection", "Please retry! Make sure you have a good Internet "
                                                             "connection." + "\n" + "If the error occurs again, "
                                                                                    "please create an issue via "
                                                                                    "'Settings -> Help'.")


def threading_settings():
    t1 = Thread(target=settings)
    t1.start()


def settings():
    settingsWin = Toplevel(root)
    settingsWin.title("Settings | Automated Commenting")
    settingsWin.geometry('350x250'), settingsWin.wm_attributes("-topmost", 1), settingsWin.resizable(False, False)
    try:
        settingsWin.iconbitmap('Resource/IAC-Icon.ico')
    except TclError:
        check_content()

    if light:
        settingsWin['background'] = '#F5F6F7'
    elif dark:
        settingsWin['background'] = '#464646'
    else:
        print("Uhh, this wasn't supposed happen.")
        restart()

    def used():
        msg = messagebox.askyesno("Already selected", "The language is already set to english." + '\n' +
                                  "Do you want to reapply it?")
        if msg:
            with open('Resource/JSON/settings.json', 'r') as langfil:
                lang_data = langfil.read()
            lang_obj = json.loads(lang_data)

            lang_obj['Lang'] = "en"

            with open('Resource/JSON/settings.json', 'w') as langfi:
                json.dump(lang_obj, langfi)

            langfi.close()
            langfil.close()

            restart()

    def app_light():
        with open('Resource/JSON/settings.json', 'r') as setfile:
            data_set = setfile.read()
        obj_set = json.loads(data_set)

        if str(obj_set['lightMode']) == 'no':
            msg = messagebox.askokcancel("Light Mode", "In order to activate the light mode," + '\n' + "the program "
                                                                                                       "is restarted.")
            if msg:
                obj_set['lightMode'] = 'yes'
                obj_set['darkMode'] = 'no'
                print(Colors.OKGREEN, "Using light Mode", Colors.ENDC)
                with open('Resource/JSON/settings.json', 'w') as settfile:
                    json.dump(obj_set, settfile)
                setfile.close()
                settfile.close()
                settingsWin.destroy()
                restart()

        elif str(obj_set['lightMode']) == 'yes':
            msg = messagebox.askyesno("Light Mode", "The light mode has already been activated." + '\n' + "Do you want "
                                                                                                          "to reapply "
                                                                                                          "it?")
            if msg:
                msg = messagebox.askokcancel("Light Mode", "In order to activate the light mode," + '\n' + "the "
                                                                                                           "program "
                                                                                                           "is "
                                                                                                           "restarted.")
                if msg:
                    obj_set['lightMode'] = 'yes'
                    obj_set['darkMode'] = 'no'
                    print(Colors.OKGREEN, "Using light Mode", Colors.ENDC)
                    with open('Resource/JSON/settings.json', 'w') as settfile:
                        json.dump(obj_set, settfile)
                    setfile.close()
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

        setfile.close()

    def app_dark():
        with open('Resource/JSON/settings.json', 'r') as setfile:
            data_set = setfile.read()
        obj_set = json.loads(data_set)
        if str(obj_set['darkMode']) == 'no':
            msg = messagebox.askokcancel("Dark Mode",
                                         "In order to activate the dark mode," + '\n' + "the program is restarted.")
            if msg:
                obj_set['lightMode'] = 'no'
                obj_set['darkMode'] = 'yes'
                print(Colors.OKGREEN, "Using Dark Mode", Colors.ENDC)
                with open('Resource/JSON/settings.json', 'w') as settfile:
                    json.dump(obj_set, settfile)
                setfile.close()
                settfile.close()
                settingsWin.destroy()
                restart()

        elif str(obj_set['darkMode']) == 'yes':
            msg = messagebox.askyesno("Dark Mode", "The dark mode has already been activated." + '\n' + "Do you want "
                                                                                                        "to reapply "
                                                                                                        "it?")
            if msg:
                msg = messagebox.askokcancel("Dark Mode",
                                             "In order to activate the dark mode," + '\n' + "the program is restarted.")
                if msg:
                    obj_set['lightMode'] = 'no'
                    obj_set['darkMode'] = 'yes'
                    print(Colors.OKGREEN, "Using Dark Mode", Colors.ENDC)
                    with open('Resource/JSON/settings.json', 'w') as settfile:
                        json.dump(obj_set, settfile)
                    setfile.close()
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

        setfile.close()

    def hqm():
        with open('Resource/JSON/settings.json', 'r') as setfile:
            data_sett = setfile.read()
        obj_set = json.loads(data_sett)

        if hqm_var == 1:
            msg = messagebox.askokcancel("Activate HQ mode", "Use this function if the program is displayed blurred." +
                                         '\n' + "Activation may cause elements to be moved." +
                                         '\n' + "The program will restart itself.", icon="info")
            if msg:
                obj_set['HQM'] = "Activated"
                with open('Resource/JSON/settings.json', 'w') as settfil:
                    json.dump(obj_set, settfil)
                setfile.close()
                settfil.close()
                restart()

        elif hqm_var == 0:
            msg = messagebox.askokcancel("De-activate HQ mode", "The function will be de-activated." +
                                         '\n' + "The program will restart itself.", icon="info")
            if msg:
                obj_set['HQM'] = ""

                with open('Resource/JSON/settings.json', 'w') as settfil:
                    json.dump(obj_set, settfil)
                setfile.close()
                settfil.close()
                restart()

    def add_com():
        with open('Resource/JSON/settings.json', 'r') as setfile:
            data_sett = setfile.read()
        obj_set = json.loads(data_sett)

        f_comm = pathlib.Path(comments_path)

        if not f_comm.exists() or str(obj_set['commentsPath']) == "":
            if not pathlib.Path('Resource/txt/comments.txt').exists():
                comment = tk.messagebox.askyesno('No comments', "You don't have any comments to edit." + '\n' +
                                                 "Do you want to create some now?", icon='info')
                if comment:
                    obj_set['commentsPath'] = 'Resource/txt/comments.txt'

                    comment_txt = open("Resource/txt/comments.txt", "a")
                    comment_txt.write("# Write only one comment per line. Comments with '#' at the beginning will be "
                                      "ignored.")
                    comment_txt.close()

                    programName = "notepad.exe"
                    fileName = str(obj_set['commentsPath'])
                    sp.Popen([programName, fileName])

                    settingsWin.update()
                    root.update()
                    return
            else:
                obj_set['commentsPath'] = 'Resource/txt/comments.txt'

                programName = "notepad.exe"
                fileName = 'Resource/txt/comments.txt'
                sp.Popen([programName, fileName])

                settingsWin.update()
                root.update()
                return
        else:
            programName = "notepad.exe"
            fileName = str(obj_set['commentsPath'])
            sp.Popen([programName, fileName])

            settingsWin.update()
            root.update()
            return

        setfile.close()

    def sel_com():
        commentspath = askopenfilename(filetypes=(("* .txt", "*.txt"), ("All Files", "*.*")))

        if commentspath:
            messagebox.showinfo("Success", "Your .txt file has been added to the comments.")

            with open('Resource/JSON/settings.json', 'r') as setfile:
                data_set = setfile.read()
            obj_set = json.loads(data_set)

            obj_set['commentsPath'] = commentspath

            with open('Resource/JSON/settings.json', 'w') as settfile:
                json.dump(obj_set, settfile)

            setfile.close()
            settfile.close()

    def not_av():
        messagebox.showwarning("In progress", "This feature is currently not available.")

    def set_help():
        webbrowser.open_new(r"https://github.com/JueK3y/Instagram-automated-commenting/wiki/Help")

    def back():
        settingsWin.destroy()

    # Content
    # First line
    ttk.Label(settingsWin, text="Langauge").place(x=64, y=5)

    with open('Resource/JSON/settings.json', 'r') as setfile:
        data_set = setfile.read()
    obj_set = json.loads(data_set)

    if obj_set['commentsPath'] == "de":
        lang = tk.StringVar(value='de')
    else:
        lang = tk.StringVar(value='en')
    ttk.Radiobutton(settingsWin, text="EN", variable=lang, value="en", command=used). \
        place(x=44, y=29)
    ttk.Radiobutton(settingsWin, text="DE", variable=lang, value="de", command=not_av). \
        place(x=94, y=29)

    setfile.close()

    ttk.Label(settingsWin, text="More Browser").place(x=221, y=5)
    ttk.Button(settingsWin, text="Load", command=not_av).place(x=204, y=27, width=50)
    ttk.Button(settingsWin, text="Import", command=not_av).place(x=254, y=27, width=60)

    # Second line
    ttk.Label(settingsWin, text="Appearance").place(x=59, y=67)
    if light:
        sw_appearance = tk.StringVar(value='lightMode')
    else:
        sw_appearance = tk.StringVar(value='darkMode')
    ttk.Radiobutton(settingsWin, text="Light", variable=sw_appearance, value="lightMode", command=app_light). \
        place(x=34, y=91, width=70)
    ttk.Radiobutton(settingsWin, text="Dark", variable=sw_appearance, value="darkMode", command=app_dark). \
        place(x=94, y=91, width=70)

    ttk.Label(settingsWin, text="High quality mode").place(x=208, y=67)
    with open('Resource/JSON/settings.json', 'r') as setfil:
        data_json = setfil.read()
    obj_sett = json.loads(data_json)

    if str(obj_sett['HQM']) == "Activated":
        ttk.Checkbutton(settingsWin, text="Deactivate Mode", variable=IntVar(value=1), command=hqm).place(x=206, y=91)
        hqm_var = 0
    else:
        ttk.Checkbutton(settingsWin, text="Activate Mode", command=hqm).place(x=206, y=91)
        hqm_var = 1

    # Third line
    ttk.Label(settingsWin, text="Comments").place(x=61, y=129)
    ttk.Button(settingsWin, text="Edit", command=add_com).place(x=36, y=151, width=50)
    ttk.Button(settingsWin, text="Import", command=sel_com).place(x=86, y=151, width=60)

    try:
        with open('Resource/JSON/settings.json', 'r') as setfil:
            data_json = setfil.read()
        obj_sett = json.loads(data_json)

        if pathlib.Path(str(obj_sett['commentsPath'])).exists():
            la = ttk.Label(settingsWin, text='Average duration: ' + str(round((((int(obj_sett['Max Y']) - 20) / 60) *
                                                                               float(obj_sett['Comment Lines'])),
                                                                              2)) +
                                             'min')

            la.place(x=200, y=129)
        else:
            la = ttk.Label(settingsWin, text='Average duration')
            la.place(x=212, y=129)
        setfi.close()
    except KeyError:
        la = ttk.Label(settingsWin, text='Average duration')
        la.place(x=212, y=129)

    class ShowScale:
        scale = 0

    def change_max_y(v):
        try:
            line_count()

            with open('Resource/JSON/settings.json', 'r') as setfile:
                dat_json = setfile.read()
            obj_set = json.loads(dat_json)

            max_y = int(15 * (float(v) + 1) + 21)

            obj_set['Max Y'] = str(max_y + 20)

            average = (max_y / 60) * float(obj_set['Comment Lines'])

            la.config(text='Average duration: ' + str(round(average, 2)) + 'min')
            la.place(x=200, y=129)

            with open('Resource/JSON/settings.json', 'w') as settfile:
                json.dump(obj_set, settfile)

            setfile.close()
            settfile.close()
            return

        except FileNotFoundError:
            if not ShowScale.scale:
                ask_file()
                ShowScale.scale = 1

    ttk.Scale(settingsWin, orient=tk.HORIZONTAL, from_=0, to=4, length=110, command=change_max_y). \
        place(x=207, y=158, width=110)

    # 4. line
    ttk.Button(settingsWin, text="Help", command=set_help).place(x=36, y=200, width=110)
    ttk.Button(settingsWin, text="Back", command=back).place(x=204, y=200, width=110)


def close():
    msg_box = tk.messagebox.askquestion('Exit Application', 'Are you sure you want to exit the application?',
                                        icon='warning')
    if msg_box == 'yes':
        root.destroy()
        exit_program = True
        try:
            web.close()
            try:
                b1_text.set("Run")
                b1["command"] = threading_run
                return
            except RuntimeError:
                print(Colors.WARNING, RuntimeError, "for close()", Colors.ENDC)
        except NameError:
            print(Colors.WARNING, NameError, "for close()", Colors.ENDC)
            sys.exit(1)
        except InvalidSessionIdException:
            print(Colors.WARNING, InvalidSessionIdException, "for close()", Colors.ENDC)
            sys.exit(1)
        except WebDriverException:
            print(Colors.WARNING, WebDriverException, "for close()", Colors.ENDC)
            sys.exit(1)
        except TclError:
            print(Colors.WARNING, TclError, "for close()", Colors.ENDC)
            sys.exit(1)
    else:
        return


def stop():
    msg_box = tk.messagebox.askquestion('Stop Commenting', 'Are you sure you want to stop commenting?',
                                        icon='warning')
    if msg_box == 'yes':
        try:
            web.close()
            try:
                b1_text.set("Run")
                b1["command"] = threading_run
                return
            except RuntimeError:
                print(Colors.WARNING, RuntimeError, "for stop()", Colors.ENDC)
        except NameError:
            print(Colors.WARNING, NameError, "for stop()", Colors.ENDC)
            return
        except InvalidSessionIdException:
            print(Colors.WARNING, InvalidSessionIdException, "for stop()", Colors.ENDC)
            return
        except WebDriverException:
            print(Colors.WARNING, WebDriverException, "for stop()", Colors.ENDC)
            return
    else:
        return


def restart():
    print(Colors.OKGREEN, "The program will restart itself", Colors.ENDC)
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

    if d_Resource.exists():
        if d_driver.exists() & d_JSON.exists() & d_txt.exists() & f_set.exists():
            if f_run.exists() & f_login.exists() & f_url.exists() & f_set.exists() & \
                    f_gecko.exists() & f_chrome_87.exists() & f_chrome_88.exists() & f_eula.exists() & f_icon.exists():
                print(Colors.OKGREEN, "All files are downloaded", Colors.ENDC)
            else:
                root.update()
                msg_box = messagebox.askokcancel("Creating files", "Some files are being downloaded. This will take "
                                                                   "some time.")
                if msg_box:
                    print(Colors.BOLD, "Downloading files...", Colors.ENDC)
                    try:
                        shutil.rmtree("Resource")
                        mk_folder()
                        dow_driver()
                        exe_driver()
                        mk_files()
                        restart()
                    except PermissionError:
                        messagebox.showerror("Permission Error",
                                             "An error occurred. Restart the program with administrator rights.")
                else:
                    print(Colors.BOLD, "Download canceled by user", Colors.ENDC)
                    sys.exit()
        else:
            root.update()
            msg_box = messagebox.askokcancel("Creating files",
                                             "Some files are being downloaded. This will take some time.")
            if msg_box:
                print(Colors.BOLD, "Downloading files...", Colors.ENDC)
                try:
                    shutil.rmtree("Resource")
                    mk_folder()
                    dow_driver()
                    exe_driver()
                    mk_files()
                    restart()
                except PermissionError:
                    messagebox.showerror("Permission Error",
                                         "An error occurred. Restart the program with administrator rights.")

            else:
                print(Colors.BOLD, "Download canceled by user", Colors.ENDC)
                sys.exit(1)
    else:
        root.update()
        msg_box = messagebox.askokcancel("Creating files", "Some files are being downloaded. This will take some time.")
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
    connected()
    gecko = "https://github.com/mozilla/geckodriver/releases/download/v0.28.0/geckodriver-v0.28.0-win64.zip"
    chr87 = "https://chromedriver.storage.googleapis.com/87.0.4280.88/chromedriver_win32.zip"
    chr88 = "https://chromedriver.storage.googleapis.com/88.0.4324.27/chromedriver_win32.zip"
    edg88 = "https://msedgedriver.azureedge.net/88.0.705.56/edgedriver_win64.zip"  # x64
    edg89 = "https://msedgedriver.azureedge.net/89.0.774.18/edgedriver_win64.zip"  # x64
    edg90 = "https://msedgedriver.azureedge.net/90.0.787.0/edgedriver_win64.zip"  # x64
    EULA = "https://juek3y.com/src/download/txt/End%20User%20License%20Agreement%20for%20IAC.txt"
    icon = "https://juek3y.com/src/download/img/IAC-Icon-Ver.-2.ico"

    try:
        a = requests.get(gecko)
        b = requests.get(chr87)
        c = requests.get(chr88)
        d = requests.get(edg88)
        ea = requests.get(edg89)
        f = requests.get(edg90)
        g = requests.get(EULA)
        h = requests.get(icon)

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

    except requests.exceptions.ConnectionError:
        print(Colors.FAIL, requests.exceptions.ConnectionError, "for dow_driver()", Colors.ENDC)
        print(Colors.FAIL, "This is an time-out error! Please restart the program and try it again.", Colors.ENDC)
        messagebox.showerror("Time out", "Something went wrong when downloading the files. Please restart the program.")

    except requests.exceptions.ChunkedEncodingError:
        print(Colors.FAIL, requests.exceptions.ChunkedEncodingError, "for dow_driver()", Colors.ENDC)
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

    # Generating Settings.json
    sett = {
        'commentsPath': "Resource/txt/comments.txt",
        'lightMode': "yes",
        'darkMode': "no",
        'Max Y': 86,
        'HQM': "",
        "Lang": "en"
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
        shutil.rmtree("Resource/JSON")
        check_content()

    try:
        with open('Resource/JSON/LogIn.json', 'r') as json_file:
            data_json = json_file.read()
        obj_json = json.loads(data_json)
        str(obj_json['Username'])
        str(obj_json['Password'])
        json_file.close()
    except KeyError:
        shutil.rmtree("Resource/JSON")
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
        str(obj_json['Lang'])
        json_file.close()
    except KeyError:
        shutil.rmtree("Resource/JSON")
        check_content()

    try:
        with open('Resource/JSON/URLhistory.json', 'r') as json_file:
            data_json = json_file.read()
        obj_json = json.loads(data_json)
        str(obj_json['Last URL'])
        json_file.close()
    except KeyError:
        shutil.rmtree("Resource/JSON")
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

e = datetime.datetime.now()

with open('Resource/JSON/settings.json', 'r') as setfi:
    data = setfi.read()
obj = json.loads(data)

comments_path = str(obj['commentsPath'])

setfi.close()

eula_file()

root.update()

messagebox.showwarning("Educational purpose only", "This program was written for educational purposes only." + '\n' +
                       "Please use it accordingly!" + '\n' + '\n' + "@2020 - %s" % e.year + " by JueK3y")

# Label
li = ttk.Label(root, text="Post URL")
li.grid(row=0, column=0)
li = ttk.Label(root, text="Username")
li.grid(row=0, column=2)
li = ttk.Label(root, text="Browser")
li.grid(row=1, column=0)
li = ttk.Label(root, text="Password")
li.grid(row=1, column=2)

# Read URL file
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
    # Read Browser file
    with open('Resource/JSON/Browser.json', 'r') as BroFi:
        data = BroFi.read()
    obj_b = json.loads(data)

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

# Read LogIn file
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
