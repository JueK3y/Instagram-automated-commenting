import sys
import tkinter as tk
from tkinter import *
from tkinter import messagebox


def show_data():
    print(str(e1.get()))
    print(str(e2.get()))
    print(str(e3.get()))
    print(str(e4.get()))

def exit():
    messagebox.showerror("Program stopped", "The process was cancelled by the user!")
    sys.exit(0)

root = tk.Tk()
root.wm_attributes("-topmost", 1)

# Label
li = Label(root, text="IG URL")
li.grid(row=0, column=0)

li = Label(root, text="Username")
li.grid(row=0, column=2)

li = Label(root, text="Browser")
li.grid(row=1, column=0)

li = Label(root, text="Password")
li.grid(row=1, column=2)

# Input
url_text = StringVar()
e1 = Entry(root, textvariable=url_text)
e1.grid(row=0, column=1)

username_text = StringVar()
e2 = Entry(root, textvariable=username_text)
e2.grid(row=0, column=3)

browser_text = StringVar()
e3 = Entry(root, textvariable=browser_text)
e3.grid(row=1, column=1)

password_text = StringVar()
e4 = Entry(root, textvariable=password_text, show='*')
e4.grid(row=1, column=3)

#
list1 = Listbox(root, height=6, width=35)
list1.grid(row=2, column=0, rowspan=6, columnspan=2)

#
sb1 = Scrollbar(root)
sb1.grid(row=2, column=2, rowspan=6)

list1.configure(yscrollcommand=sb1.set)
sb1.configure(command=list1.yview)

# Buttons
b1 = Button(root, text="Run", width=12, command=show_data)
b1.grid(row=2, column=3)

b2 = Button(root, text="Help", width=12)
b2.grid(row=3, column=3)

b6 = Button(root, text="Exit", width=12, command=exit)
b6.grid(row=4, column=3)

root.mainloop()
