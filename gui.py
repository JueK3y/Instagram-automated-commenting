from tkinter import *

def show_data():
    print(str(e1.get()))
    print(str(e2.get()))
    print(str(e3.get()))
    print(str(e4.get()))


window = Tk()

# Label
li = Label(window, text="Title")
li.grid(row=0, column=0)

li = Label(window, text="Author")
li.grid(row=0, column=2)

li = Label(window, text="Year")
li.grid(row=1, column=0)

li = Label(window, text="ISBN")
li.grid(row=1, column=2)

# Input
title_text = StringVar()
e1 = Entry(window, textvariable=title_text)
e1.grid(row=0, column=1)

author_text = StringVar()
e2 = Entry(window, textvariable=author_text)
e2.grid(row=0, column=3)

year_text = StringVar()
e3 = Entry(window, textvariable=year_text)
e3.grid(row=1, column=1)

isbn_text = StringVar()
e4 = Entry(window, textvariable=isbn_text)
e4.grid(row=1, column=3)

#
list1 = Listbox(window, height=6, width=35)
list1.grid(row=2, column=0, rowspan=6, columnspan=2)

#
sb1 = Scrollbar(window)
sb1.grid(row=2, column=2, rowspan=6)

list1.configure(yscrollcommand=sb1.set)
sb1.configure(command=list1.yview)

# Buttons
b1 = Button(window, text="View All", width=12, command=show_data)
b1.grid(row=2, column=3)

b2 = Button(window, text="Search Entry", width=12)
b2.grid(row=3, column=3)

b3 = Button(window, text="Add Entry", width=12)
b3.grid(row=4, column=3)

b4 = Button(window, text="Update selected", width=12)
b4.grid(row=5, column=3)

b5 = Button(window, text="Delete selected", width=12)
b5.grid(row=6, column=3)

b6 = Button(window, text="Close", width=12)
b6.grid(row=6, column=3)

window.mainloop()
