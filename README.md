# IAC | A bot for automatic commenting on Instagram

###### _Falsche Sprache? [Klicke hier](README_DE.md) für das deutsche ReadMe._


## Announcement: New development of IAC
IAC 2.0 is a complete revision of IAC.
Although the basic functions remain the same, much has changed:
- Modern, fresh UI in Windows 11 style
- Creation of different profiles
- Revised help page
- Improved internet speed check
- Improved information, warning and error display
- Revised settings options
- Web demo (mainly for the UI)

Stay tuned for the release of IAC 2.0.

###### _Release date of IAC 2.0 is currently not known. As always, there will be some pre-releases before the final release, but these may not contain all the features mentioned._

## About IAC (the old one)
IAC is a bot which automatically comments randomly under given Instagram posts.
<br>The duration of the commenting is freely adjustable in the GUI.
<br>Pre-made comments are easy to import and can be edited at any time.
<br>The program is particularly suitable for giveaways, which invite you to comment repeatedly.


## Features
- Main function: Automatic commenting in random order
- GUI: Good looking GUI with light and dark mode
- Wide choice: Adapted to 6 different browsers and versions
- Simply import the driver for the browser of your choice
- Once all data is entered it is immediately and permanently usable
- Easily import and edit your own comments
- Decide for yourself how long the bot should comment<br>(and whether it should stop at all)
- Extensive help page, which is supposed to help with every problem

Technical features:
- Data security: Your data will not be uploaded under any circumstances
  <br>and will only be stored on your computer
- Frequent updates: On all problems from the
  <br>[Issue Tracker](https://github.com/JueK3y/Instagram-automated-commenting/issues) is currently being worked on
- Open Source: The authenticity and functionality of the code
<br>can be verified at any time.
- All in one file, which is under 15 MB in size
- Automatic download of all required files

...and all this for free


## How it works:
1. At the first start you enter your login data from Instagram _(*)_.
2. Then copy the post link you want to comment on and paste it into the text field "Post URL".
3. After that you choose the browser you use. You have several options:
    - Firefox
    - Chrome (version 87, 88)
    - Edge (x64 version 88 - 90)
    - Here's how to check your browser version:
      - Open your favorite browser
      - In the top right corner you will find 3 dots / dashes
      - Click on these dots / dashes and go to settings or info.
      - Next to the name of your browser you should see the version.
      - Under Chromium based browsers (like Chrome or Brave)
        <br>you can also enter "chrome://version" in the search field.
    - You can also use your own browser.<br>To do this, read the item _["Customization for your browser"](https://github.com/JueK3y/Instagram-automated-commenting/blob/main/README.md#customization-for-your-browser)_.
4. Now you can go to "Run".
5. You will then be prompted to enter sentences which you want to comment.
   <br>You also have the option to import an already existing .txt file with comments.
   <br>For this you go to "Settings" and import your comments under the label "Comments".

_(*) Your data will not be uploaded anywhere, they are stored only on your computer and are not visible to anyone._


## Customization for your browser
_Note: Only do this if you have experience with Selenium.
You can't break anything, but it might simply not work._
<br>It is possible to use the program with the following browsers:
- Chrome _(version 87 & 88 already installed)_
- Edge _(x64 version 88 - 90 already installed)_
- Firefox _(version 86 already installed)_
- Internet Explorer
- Opera
- Safari
- Browsers, which build on the technology<br>of the listed browsers (e.g. Chromium Browser).

To use these browsers, you need the respective driver.
<br>With a quick Google search for "Selenium Driver (your browser)" you should have found it.
<br>Safari already has the driver installed. So look for it in the file path of Safari.
<br>When the driver has been downloaded, you can start the program
<br>and import the driver via _"Settings -> More Browser"_.
<br>Please select the browser that belongs to the driver.
<br>After restarting the program, your own browser can be used as "Own Browser".


## Works for:
The program may not work for all hardware.
<br>It has been tested so far under the following system:
- Windows 8 (x64)
- Windows 10 (x64)

_Maybe it doesn't work for MacOS (OSX) and Linux,
<br>because there are differences in the encoding method.
<br>But I will work on getting the program to work for these systems._


## Problems and missing Features
If you encounter a problem while using IAC,
<br>I would be very grateful if you could create an [issue](https://github.com/JueK3y/Instagram-automated-commenting/issues) for it.
<br>This way I can keep track of all the issues that need to be fixed.
<br> If you want, you can also look into the already existing [Issues](https://github.com/JueK3y/Instagram-automated-commenting/issues).
<br>
<br>In addition, I have created a [wiki with a help page](https://github.com/JueK3y/Instagram-automated-commenting/wiki).
<br>If you have problems you can also look there.


## Technical data
The following tools were used to develop the program:

- Python 3.9
- Requests 2.25.1
- Selenium 3.141.0
- Tkinter (Tcl/Tk) 8.6
- ttkthemes 3.2.0
- urllib3 1.26.2

_The program was **not** built using the Instagram API._


## Continue this project
You are interested as a programmer to continue / further develop the project or add your own functions?
<br>In principle, editing and distribution of the code is prohibited in the [EULA](https://github.com/JueK3y/Instagram-automated-commenting/wiki/EULA).
<br>However, you can [send me a request](https://juek3y.com/de/contact/business) for the purpose of further development and
<br>I will grant you a modified editing and distribution permission (if the intended use does not violate certain guidelines).


## Leave a ⭐
If you liked this project, leave a star!
<br>It would mean a lot for me :)

<br>

## Legal notice
### (Official) for educational purposes only
_This program is written and may only be used for educational purposes!
<br>Using it for real purposes violates the Instagram guidelines!
<br>Consequences are, for example, the blocking of the Instagram account._

_Please read the [Instagram guidelines](https://help.instagram.com/477434105621119/Instagram) for more information._


### EULA & Copyright
_There is a [EULA](EULA.md) for IAC. Please read it carefully before using the program.
<br>By downloading and using the program you automatically accept the EULA.
<br>Violations of the EULA can and will be legally punished._


### Disclaimer
_The program has been carefully created and often tested. Nevertheless, damage may occur.
<br>I as the author am not responsible for any possible damage caused by the program.
<br>The respective user is liable for himself, even if the respective Instagram account is blocked due to the use of the program._


_@2020 - 2021 by [JueK3y](https://juek3y.com)_

###### _DO NOT modify and reupload the program.<br>DO NOT indicate used program sections as your own._
