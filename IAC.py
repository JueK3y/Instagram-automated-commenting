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
            quit()
            return


def line_count():
    with open('Resource/JSON/settings.json', 'r') as settfi:
        data_json = settfi.read()
    obj_json = json.loads(data_json)

    # Time for commenting
    line_coun = 0
    for line in open(comments_path):
        li = line.strip()
        if not li.startswith("#"):
            line_coun += 1

    obj_json['Comment Lines'] = line_coun

    print(obj_json['Comment Lines'])

    with open('Resource/JSON/settings.json', 'w') as settfi:
        json.dump(obj_json, settfi)


def comment_time():
    with open('Resource/JSON/settings.json', 'r') as settfi:
        data_sett = settfi.read()
    obj_sett = json.loads(data_sett)

    ave_time = float(obj_sett['Max Y']) - 20
    print(ave_time)
    com_lines = obj_sett['Comment Lines']
    print(com_lines)

    obj_sett['Time'] = (com_lines * ave_time) / 60
    print(obj_sett['Time'])

    with open('Resource/JSON/settings.json', 'w') as settfi:
        json.dump(obj_sett, settfi)


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


def threading_run():
    t1 = Thread(target=run)
    t1.start()


def run():
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

        # Save user login
        login = {
            'Username': username_text.get(),
            'Password': password_text.get()
        }
        with open('Resource/JSON/LogIn.json', 'w') as lginfi:
            json.dump(login, lginfi)

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
                messagebox.showinfo("Duration", "The commenting will take an average of " +
                                    str(round(obj_sett['Time'], 2)) + " minutes.")
                check_comment()
        else:
            messagebox.showinfo("Duration", "The commenting will take an average of " +
                                str(round(obj_sett['Time'], 2)) + " minutes.")
            check_comment()


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
        print(Colors.BOLD, "First Run", Colors.ENDC)
        auto_comment()
    else:
        print(Colors.BOLD, "Another round", Colors.ENDC)
        auto_comment()


def auto_comment():
    global web

    try:
        b1_text.set("Stop")
        b1["command"] = stop
    except RuntimeError:
        quit()

    if browser_text.get() == 'Internet Explorer':
        try:
            web = webdriver.Ie(executable_path=os.getcwd() + '/Resource/driver/IEDriverServer.exe')
            web.maximize_window()
        except WebDriverException:
            print(Colors.WARNING, WebDriverException, "for auto_comment()", Colors.ENDC)
            messagebox.showerror("Browser error", "An error occurred. Please try another browser.")
            b1_text.set("Run")
            b1["command"] = threading_run
            return
            # messagebox.showerror("Wrong browser", "IE couldn't be found. Please select another browser.")

    elif browser_text.get() == 'Firefox':
        try:
            web = webdriver.Firefox(executable_path=os.getcwd() + '/Resource/driver/geckodriver.exe')
            web.maximize_window()
        except WebDriverException:
            print(Colors.WARNING, WebDriverException, "for auto_comment()", Colors.ENDC)
            messagebox.showerror("Wrong browser", "Firefox couldn't be found. Please select another browser." + '\n' +
                                 "It is also possible that Firefox was closed accidentally.")
            b1_text.set("Run")
            b1["command"] = threading_run
            return

    elif browser_text.get() == 'Chrome 87':
        try:
            chr_opt = webdriver.ChromeOptions()
            chr_opt.add_argument("--incognito")
            web = webdriver.Chrome(executable_path=os.getcwd() + '/Resource/driver/chromedriver_87.exe',
                                   options=chr_opt)
            web.maximize_window()
        except WebDriverException:
            print(Colors.WARNING, WebDriverException, "for auto_comment()", Colors.ENDC)
            messagebox.showerror("Wrong browser", "Chrome 87 couldn't be found. Please select another browser." + '\n' +
                                 "It is also possible that Chrome was closed accidentally.")
            b1_text.set("Run")
            b1["command"] = threading_run
            return

    elif browser_text.get() == 'Chrome 88':
        try:
            chr_opt = webdriver.ChromeOptions()
            chr_opt.add_argument("--incognito")
            web = webdriver.Chrome(executable_path=os.getcwd() + '/Resource/driver/chromedriver_88.exe',
                                   options=chr_opt)
            web.maximize_window()
        except WebDriverException:
            print(Colors.WARNING, WebDriverException, "for auto_comment()", Colors.ENDC)
            messagebox.showerror("Wrong browser", "Chrome 88 couldn't be found. Please select another browser." + '\n' +
                                 "It is also possible that Chrome was closed accidentally.")
            b1_text.set("Run")
            b1["command"] = threading_run
            return

    connected()

    try:
        web.get(url_text.get())
    except InvalidArgumentException:
        print(Colors.WARNING, InvalidArgumentException, "for auto_comment()", Colors.ENDC)
        messagebox.showerror("No valid URL", "The URL provided is not a real link." + '\n' + "Please copy the URL "
                                                                                             "from the post you want "
                                                                                             "to comment.")
        web.close()
        b1_text.set("Run")
        b1["command"] = threading_run
        return
    except WebDriverException:
        print(Colors.WARNING, WebDriverException, "for auto_comment()", Colors.ENDC)
        messagebox.showerror("Browser closed", "Action cancelled by user.", icon='warning')
        b1_text.set("Run")
        b1["command"] = threading_run
        return
    except RuntimeError:
        print(Colors.WARNING, RuntimeError, "for auto_comment()", Colors.ENDC)
        messagebox.showerror("Runtime error", "IAC was closed.", icon='warning')
        web.close()
        b1_text.set("Run")
        b1["command"] = threading_run
        return
    try:
        cookies = web.find_element_by_xpath('/html/body/div[2]/div/div/div/div[2]/button[1]')
        cookies.click()
    except NoSuchElementException:
        print(Colors.WARNING, NoSuchElementException, "for auto_comment()", Colors.ENDC)
        messagebox.showerror("Wrong link", "The link does not lead (directly) to any Instagram post.")
        web.close()
        b1_text.set("Run")
        b1["command"] = threading_run
        return
    except NoSuchWindowException or WebDriverException:
        print(Colors.WARNING, NoSuchWindowException, "or", WebDriverException, "for auto_comment()", Colors.ENDC)
        messagebox.showerror("Browser closed", "Action cancelled by user.", icon='warning')
        b1_text.set("Run")
        b1["command"] = threading_run
        return
    except InvalidSessionIdException:
        print(Colors.WARNING, InvalidSessionIdException, "for auto_comment()", Colors.ENDC)
        quit()

    try:
        comment = web.find_element_by_xpath('//*[@id="react-root"]/section/main/div/div[1]/article/div[3]/section['
                                            '1]/span[2]/button')
        comment.click()
    except NoSuchElementException:
        print(Colors.WARNING, NoSuchElementException, "for auto_comment()", Colors.ENDC)
        messagebox.showerror("Error", "Something went wrong. Does the link lead to a picture?")
        web.close()
        b1_text.set("Run")
        b1["command"] = threading_run
        return
    except NoSuchWindowException:
        print(Colors.WARNING, NoSuchWindowException, "for auto_comment()", Colors.ENDC)
        messagebox.showerror("Browser closed", "Action cancelled by user.", icon='warning')
        b1_text.set("Run")
        b1["command"] = threading_run
        return
    except InvalidSessionIdException:
        print(Colors.WARNING, InvalidSessionIdException, "for auto_comment()", Colors.ENDC)
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
        print(Colors.WARNING, NoSuchWindowException, "for auto_comment()", Colors.ENDC)
        messagebox.showerror("Browser closed", "Action cancelled by user.", icon='warning')
        b1_text.set("Run")
        b1["command"] = threading_run
        return
    except NoSuchElementException:
        print(Colors.WARNING, NoSuchElementException, "for auto_comment()", Colors.ENDC)
        messagebox.showerror("Error", "Something went wrong. Please restart the program.")
        b1_text.set("Run")
        b1["command"] = threading_run
        return
    except InvalidSessionIdException:
        print(Colors.WARNING, InvalidSessionIdException, "for auto_comment()", Colors.ENDC)
        quit()

    try:
        web.find_element_by_css_selector('#slfErrorAlert')
        messagebox.showerror("Wrong information", "Your username and / or your password was wrong.")
        web.close()
        b1_text.set("Run")
        b1["command"] = threading_run
        return
    except InvalidSessionIdException:
        print(Colors.WARNING, InvalidSessionIdException, "for auto_comment()", Colors.ENDC)
        quit()
    except NoSuchWindowException:
        print(Colors.WARNING, NoSuchWindowException, "for auto_comment()", Colors.ENDC)
        messagebox.showerror("Browser closed", "Action cancelled by user.", icon='warning')
        b1_text.set("Run")
        b1["command"] = threading_run
        return
    except NoSuchElementException:
        print(Colors.WARNING, NoSuchElementException, "for auto_comment()", Colors.ENDC)
        web.find_element_by_css_selector('.sqdOP')
        svin = web.find_element_by_xpath('//*[@id="react-root"]/section/main/div/div/div/section/div/button')
        svin.click()

        time.sleep(10)

        # Read LogIn file
        with open('Resource/JSON/settings.json', 'r') as setfil:
            data_set = setfil.read()
        obj_set = json.loads(data_set)

        comfi = open(str(obj_set['commentsPath'])).read().splitlines()
        print(comments_path)

        def comment():
            # Major error?
            for line in comfi:
                t = line.strip()
                if not t.startswith("#"):
                    print(Colors.BOLD, line.strip(), Colors.ENDC)
                    print(comments_path)

                    # It doesn't ignore # or ""
                    # myline = random.choice(comfi)
                    # print(myline)

                    # Does post a random letter from the sentence.
                    # myline = random.choice(line.strip())

                    with open('Resource/JSON/settings.json', 'r') as settfi:
                        data_json = settfi.read()
                    obj_sett = json.loads(data_json)

                    zeit = random.randint(20, obj_sett['Max Y'])
                    print(Colors.BOLD, zeit, Colors.ENDC)

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
                        quit()

        comment()
        comment()
        comment()


def threading_settings():
    t1 = Thread(target=settings)
    t1.start()


def settings():
    settingsWin = Toplevel(root)
    settingsWin.title("Settings | Automated Commenting")
    settingsWin.geometry('350x170'), settingsWin.wm_attributes("-topmost", 1), settingsWin.resizable(False, False)
    try:
        settingsWin.iconbitmap('Resource/IAC-Icon.ico')
    except TclError:
        check_content()

    with open('Resource/JSON/settings.json', 'r') as setfile:
        data_set = setfile.read()
    obj_set = json.loads(data_set)

    if light:
        settingsWin['background'] = '#F5F6F7'
        setfi.close()
    elif dark:
        settingsWin['background'] = '#464646'
        setfi.close()
    else:
        print("Uhh, this wasn't supposed happen.")

    def app_light():
        if str(obj_set['lightMode']) == 'no':
            msg = messagebox.askokcancel("Light Mode", "In order to activate the light mode," + '\n' + "the program "
                                                                                                       "is restarted.")
            if msg:
                obj_set['lightMode'] = 'yes'
                obj_set['darkMode'] = 'no'
                print(Colors.OKGREEN, "Using light Mode", Colors.ENDC)
                with open('Resource/JSON/settings.json', 'w') as settfile:
                    json.dump(obj_set, settfile)
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

    def app_dark():
        if str(obj_set['darkMode']) == 'no':
            msg = messagebox.askokcancel("Dark Mode",
                                         "In order to activate the dark mode," + '\n' + "the program is restarted.")
            if msg:
                obj_set['lightMode'] = 'no'
                obj_set['darkMode'] = 'yes'
                print(Colors.OKGREEN, "Using Dark Mode", Colors.ENDC)
                with open('Resource/JSON/settings.json', 'w') as settfile:
                    json.dump(obj_set, settfile)
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

    def add_com():
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

    def sel_com():
        commentspath = askopenfilename(filetypes=(("* .txt", "*.txt"), ("All Files", "*.*")))

        if commentspath:
            messagebox.showinfo("Success", "Your .txt file has been added to the comments.")

            obj_set['commentsPath'] = commentspath

            with open('Resource/JSON/settings.json', 'w') as settfile:
                json.dump(obj_set, settfile)

    def not_av():
        messagebox.showwarning("In progress", "This feature is currently not available")

    def back():
        settingsWin.destroy()

    # Content
    ttk.Label(settingsWin, text="Appearance").place(x=65, y=5)
    if light:
        sw_appearance = tk.StringVar(value='lightMode')
    else:
        sw_appearance = tk.StringVar(value='darkMode')
    ttk.Radiobutton(settingsWin, text="Light", variable=sw_appearance, value="lightMode", command=app_light). \
        place(x=35, y=25, width=70)
    ttk.Radiobutton(settingsWin, text="Dark", variable=sw_appearance, value="darkMode", command=app_dark). \
        place(x=95, y=25, width=70)

    ttk.Label(settingsWin, text="Browser").place(x=245, y=5)
    ttk.Button(settingsWin, text="Import...", command=not_av).place(x=210, y=25, width=110)

    ttk.Label(settingsWin, text="Comments").place(x=65, y=63)
    ttk.Button(settingsWin, text="Edit", command=add_com).place(x=40, y=83, width=50)
    ttk.Button(settingsWin, text="Import", command=sel_com).place(x=90, y=83, width=60)

    la = ttk.Label(settingsWin, text="Average duration")
    la.place(x=220, y=65)

    def change_max_y(v):

        with open('Resource/JSON/settings.json', 'r') as settfi:
            data_json = settfi.read()
        obj_sett = json.loads(data_json)

        try:
            line_count()

            print(obj_sett['Comment Lines'])

            max_y = int(15 * (float(v) + 1) + 21)  # v = 3 standard

            obj_sett['Max Y'] = str(max_y + 20)
            print(obj_sett['Max Y'])

            average = (max_y / 60) * float(obj_sett['Comment Lines'])

            la.config(text='Average duration: ' + str(round(average, 2)) + 'min')
            la.place(x=205, y=65)

            with open('Resource/JSON/settings.json', 'w') as settfile:
                json.dump(obj_sett, settfile)

        except FileNotFoundError:
            ask_file()

    ttk.Scale(settingsWin, orient=tk.HORIZONTAL, from_=0, to=4, length=110, command=change_max_y). \
        place(x=210, y=90)

    ttk.Button(settingsWin, text="Help", command=not_av).place(x=40, y=130, width=110)
    ttk.Button(settingsWin, text="Back", command=back).place(x=210, y=130, width=110)


def close():
    msg_box = tk.messagebox.askquestion('Exit Application', 'Are you sure you want to exit the application?',
                                        icon='warning')
    if msg_box == 'yes':
        root.destroy()
        try:
            web.close()
            b1_text.set("Run")
            b1["command"] = threading_run
        except NameError:
            print(Colors.WARNING, NameError, "for close()", Colors.ENDC)
            quit()
        except InvalidSessionIdException:
            print(Colors.WARNING, InvalidSessionIdException, "for close()", Colors.ENDC)
            quit()
        except WebDriverException:
            print(Colors.WARNING, WebDriverException, "for close()", Colors.ENDC)
            quit()
    else:
        return


def stop():
    msg_box = tk.messagebox.askquestion('Stop Commenting', 'Are you sure you want to stop commenting?',
                                        icon='warning')
    if msg_box == 'yes':
        try:
            web.close()
            b1_text.set("Run")
            b1["command"] = threading_run
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
    root.destroy()
    os.system('python ' + str(os.path.basename(__file__)))


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
                    # Delete old folders
                    try:
                        shutil.rmtree("Resource")
                        mk_folder()
                        dow_driver()
                        exe_driver()
                        mk_files()
                        root.destroy()
                        os.system('python ' + str(os.path.basename(__file__)))
                    except PermissionError:
                        messagebox.showerror("Permission Error",
                                             "An error occurred. Restart the program with administrator rights.")
                else:
                    print(Colors.BOLD, "Download canceled by user", Colors.ENDC)
                    quit()
        else:
            root.update()
            msg_box = messagebox.askokcancel("Creating files",
                                             "Some files are being downloaded. This will take some time.")
            if msg_box:
                print(Colors.BOLD, "Downloading files...", Colors.ENDC)
                # Delete old folders
                try:
                    shutil.rmtree("Resource")
                    mk_folder()
                    dow_driver()
                    exe_driver()
                    mk_files()
                    root.destroy()
                    os.system('python ' + str(os.path.basename(__file__)))
                except PermissionError:
                    messagebox.showerror("Permission Error",
                                         "An error occurred. Restart the program with administrator rights.")

            else:
                print(Colors.BOLD, "Download canceled by user", Colors.ENDC)
                quit()
    else:
        root.update()
        msg_box = messagebox.askokcancel("Creating files", "Some files are being downloaded. This will take some time.")
        if msg_box:
            print(Colors.BOLD, "Downloading files...", Colors.ENDC)
            # Delete old folders
            mk_folder()
            dow_driver()
            exe_driver()
            mk_files()
            root.destroy()
            os.system('python ' + str(os.path.basename(__file__)))
        else:
            print(Colors.BOLD, "Download canceled by user", Colors.ENDC)
            quit()


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
    connected()
    gecko = "https://github.com/mozilla/geckodriver/releases/download/v0.28.0/geckodriver-v0.28.0-win64.zip"
    chr87 = "https://chromedriver.storage.googleapis.com/87.0.4280.88/chromedriver_win32.zip"
    chr88 = "https://chromedriver.storage.googleapis.com/88.0.4324.27/chromedriver_win32.zip"
    EULA = "https://juek3y.com/src/download/txt/End%20User%20License%20Agreement%20for%20IAC.txt"
    icon = "https://juek3y.com/src/download/img/IAC-Icon-Ver.-2.ico"

    try:
        a = requests.get(gecko)
        b = requests.get(chr87)
        c = requests.get(chr88)
        d = requests.get(EULA)
        g = requests.get(icon)

        with open("Resource/driver/geckodriver.zip", 'wb') as gec:
            gec.write(a.content)

        with open("Resource/driver/chromedriver-87.zip", 'wb') as c87:
            c87.write(b.content)

        with open("Resource/driver/chromedriver-88.zip", 'wb') as c88:
            c88.write(c.content)

        with open("Resource/txt/EULA.txt", 'wb') as eul:
            eul.write(d.content)

        with open("Resource/IAC-Icon.ico", "wb") as ico:
            ico.write(g.content)
        root.iconbitmap('Resource/IAC-Icon.ico')
        return

    except requests.exceptions.ConnectionError:
        print(Colors.FAIL, requests.exceptions.ConnectionError, "for dow_driver()", Colors.ENDC)
        print(Colors.FAIL, "This is an time-out error! Please restart the program and try it again.", Colors.ENDC)
        messagebox.showerror("Time out", "Something went wrong when downloading the files. Please restart the program.")


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
    # Generating LogIn.json
    login = {
        'Username': "",
        'Password': ""
    }
    with open('Resource/JSON/LogIn.json', 'w') as lginfi:
        json.dump(login, lginfi)

    # Generating URLhistory.json
    safe_url = {
        'Last URL': ""
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

    # Generating Settings.json
    sett = {
        'commentsPath': "Resource/txt/comments.txt",
        'lightMode': "yes",
        'darkMode': "no",
        'Max Y': 86
    }
    with open('Resource/JSON/settings.json', 'w') as setfil:
        json.dump(sett, setfil)
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
        print(Colors.OKGREEN, "Using Light Mode", Colors.ENDC)
        setfi.close()
    elif str(obj['darkMode']) == "yes":
        light = False
        dark = True
        root = ThemedTk(theme="equilux")
        root['background'] = '#464646'
        print(Colors.OKGREEN, "Using Dark Mode", Colors.ENDC)
        setfi.close()
    else:
        root = ThemedTk(theme="yaru")
        light = True
        dark = False
        root.title("Automated Commenting")
        check_content()
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
root.title("Automated Commenting"), root.wm_attributes("-topmost", 1), root.resizable(False, False)
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

disagree = False

with open('Resource/txt/EULA.txt') as f:
    if not ('User ' + os.getenv('username') + ' agreed to the EULA on') in f.read():
        disagree = True

with open('Resource/JSON/firstRun.json', 'r') as runfi:
    run_data = runfi.read()
run_obj = json.loads(run_data)

root.update()

# try:
#    root.update()
# except TclError:
#    print(Colors.WARNING, "This error occurs only during the first run. You can ignore it. Type 2", Colors.ENDC)

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
            file.write('User ' + os.getenv('username') + ' agreed to the EULA on %s/%s/%s' % (e.day, e.month, e.year) +
                       ' at %s:%s:%s.' % (e.hour, e.minute, e.second))
        file.close()

    else:
        print(Colors.FAIL, "Rejected the EULA", Colors.ENDC)
        quit()
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
            file.write('User ' + os.getenv('username') + ' agreed to the EULA on %s/%s/%s' % (e.day, e.month, e.year) +
                       ' at %s:%s:%s.' % (e.hour, e.minute, e.second))
        file.close()
    else:
        print(Colors.FAIL, "Rejected the EULA", Colors.ENDC)
        quit()

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
            data = file_object.read(118)
            if len(data) > 0:
                file_object.write("\n")
            file_object.write('User ' + os.getenv('username') + ' agreed to the EULA on %s/%s/%s' % (e.day, e.month,
                                                                                                     e.year) +
                              ' at %s:%s:%s.' % (e.hour, e.minute, e.second))
            file_object.close()

    else:
        print(Colors.FAIL, "Rejected the EULA", Colors.ENDC)
        quit()

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

# Dropdown Menu
OptionList = [
    "Firefox",
    "Chrome 87",
    "Chrome 88"
]
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
