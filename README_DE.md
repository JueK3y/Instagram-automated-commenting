# IAC | Ein Bot für das automatische Kommentieren auf Instagram

###### _Wrong language? [Click here](README.md) for the english ReadMe_

## Über IAC
IAC ist ein Bot, welcher automatisch unter vorgegebenen Instagram Posts zufällig kommentiert.
<br>Dabei ist die Dauer des Kommentierens in der GUI frei einstellbar.
<br>Vorgefertigte Kommentare sind einfach importierbar und können jederzeit bearbeitet werden.
<br>Das Programm eignet sich besonders für Gewinnspiele, welche einen zum wiederholten kommentieren auffordern.


## Features
- Hauptfunktion: Automatisches Kommentieren in zufälliger Reihenfolge
- GUI: Visuell ansprechbare GUI mit Hell- und Dunkelmodus
- Große Auswahl: Angepasst auf 6 verschieden Browser und Versionen
- Importiere ganz einfach den Treiber für den Browser deiner Wahl
- Einmal alle Daten eingegeben ist es sofort und dauerhaft nutzbar
- Einfaches importieren und bearbeiten der eigenen Kommentare
- Entscheide selber, wie lange der Bot kommentieren soll (und ob er überhaupt aufhören soll)
- Umfangreiche Help-Seite, welche bei jedem Problem weiterhelfen soll

Technische Besonderheiten:
- Datensicherheit: Deine Daten werden unter keinen Umständen
  <br>hochgeladen und sind einzig und allein auf deinem Computer gespeichert
- Regelmäßige Updates: An allen Problemen aus dem
  <br>[IssueTracker](https://github.com/JueK3y/Instagram-automated-commenting/issues) wird aktuell gearbeitet
- Open Source: Die Echtheit und Funktionsweiße des Codes
  <br>kann jederzeit selber überprüft werden
- Alles in einer Datei, welche unter 15 MB groß ist
- Automatischer Download aller benötigten Dateien

...und das alles kostenlos


## So funktioniert es
1. Du gibst beim ersten Start deine Login-Daten von Instagram ein _(*)_
2. Danach kopierst den Post Link, welchen du kommentieren willst und fügst ihn in das Textfeld "Post URL" ein
3. Danach wählst du den Browser aus, welchen du benutzt. Du hast dafür mehrere Möglichkeiten:
    - Firefox
    - Chrome (Version 87, 88)
    - Edge (x64-Version 88 - 90)
   - So überprüfst du die Version deines Browsers:
      - Öffne deinen bevorzugten Browser
      - Oben rechts in der Ecke findest du 3 Punkte / Striche
      - Diese Punkte / Striche klickst du an und gehst auf Einstellungen oder Infos.
      - Dort sollte neben dem Namen deines Browsers die jeweilige Version stehen.
      - Unter auf Chromium basierend Browser (so wie Chrome oder Brave)
        <br>kannst du auch "chrome://version" in das Suchfeld eingeben
    - Du kannst auch deinen eigenen Browser benutzen. Lies dir dazu den Punkt _"Anpassung für deinen Browser"_ durch.
4. Jetzt kannst du auf "Run" gehen.
5. Du wirst dann aufgefordert, Sätze einzugeben, welche du kommentieren willst.
   <br>Du hast auch die Möglichkeit, eine bereits vorhanden .txt Datei mit Kommentaren zu importieren.
   <br>Dafür gehst du auf "Settings" und importierst unter dem Punkt "Comments" deine Kommentare.

_(*) Deine Daten werden nirgends hochgeladen, sie werden nur auf deinem Computer gespeichert und sind für niemanden einsehbar._


## Anpassung für deinen Browser
_Anmerkung: Mache das nur, wenn du Erfahrung mit Selenium hast.
<br>Du kannst zwar nichts kaputt machen, aber es könnte ganz simpel nicht funktionieren._
<br>Es ist möglich das Progamm mit den folgende Browsern zu benutzen:
- Chrome _(Version 87 & 88 bereits mit installiert)_
- Edge _(x64-Version 88 - 90 bereits mit installiert)_
- Firefox _(Version 86 bereits mit installiert)_
- Internet Explorer
- Opera
- Safari
- Browser, welche auf die Technologie<br>der aufgezählten Browser aufbauen (z.B. Chromium Browser)

Um diese Browser zu benutzen, brauchst den jeweiligen Treiber.
<br>Mit einer schnellen Google Suche nach "Selenium Driver (dein Browser)" solltest du ihn gefunden haben.
<br>Bei Safari ist der Treiber bereits mitinstalliert. Suche ihn also in dem Dateipfad von Safari.
<br>Wenn der Treiber heruntergeladen wurde, kannst du das Programm starten
<br>und über _"Settings -> More Browser"_ den Treiber importieren.
<br>Bitte wähle den zum Treiber dazugehörigen Browser aus.
<br>Nach einem Neustart des Programmes kann der eigene Browser als "Own Browser" benutzt werden.


## Funktioniert für:
Das Programm wird unter Umständen nicht für jede Hardware funktionieren.
<br>Es wurde bisher unter den folgenden Systemen getestet:
- Windows 8 (x64)
- Windows 10 (x64)


_Eventuell funktioniert es nicht für MacOS (OSX) und Linux,
<br>da es unterschiede in der Kodierungsweise gibt. Ich werde aber daran arbeiten,
<br>das Programm für diese Systeme zum laufen zu bekommen._


## Probleme und fehlende Features
Falls dir ein Problem während der Benutzung von IAC auffällt,
<br>wäre ich dir sehr verbunden, wenn du dafür ein [Issue](https://github.com/JueK3y/Instagram-automated-commenting/issues) erstellen könntest.
<br>Damit kann ich nachverfolgen, welche Probleme noch alle behoben werden müssen.
<br>Wenn du willst, kannst auch in die bereits vorhandenen Issues #1 und #2 gucken.
<br>
<br>Außerdem habe ich ein [Wiki mit einer Hilfe-Seite](https://github.com/JueK3y/Instagram-automated-commenting/wiki) erstellt.
<br>Bei Problemen kannst du auch dort nachgucken.


## Technische Daten
Für die Entwicklung des Programmes wurden folgende Tools benutzt:

- Python 3.9
- Requests 2.25.1
- Selenium 3.141.0
- Tkinter (Tcl/Tk) 8.6
- ttkthemes 3.2.0
- urllib3 1.26.2

_Das Programm wurde **nicht** mit der Instagram API gebaut._

## Setze das Projekt fort
Du bist als Programmierer interessiert, das Projekt weiterzuführen / weiter zu entwickeln oder eigene Funktionen hinzuzufügen?
<br>Grundsätzliche ist die Bearbeitung und Verteilung des Codes in der [EULA](https://github.com/JueK3y/Instagram-automated-commenting/wiki/EULA) untersagt.
<br>Du kannst mir aber [eine Anfrage](https://juek3y.com/de/contact/business) für den Zweck der Weiterentwicklung schicken und
<br>ich werde dir eine abgeänderte Bearbeitungs- und Verteilungserlaubnis zuteilen
<br>(falls der Verwendungszweck nicht gegen bestimmte Richtlinien verstößt).

## Leave a ⭐
Wenn dir dieses Projekt gefällt, lass einen Stern da :)
<br>Das würde mir sehr viel bedeuten.

<br>

## Rechtliche Hinweiße
### (Offiziel) nur für Bildungszwecke
_Dieses Programm wurde für Bildungszwecke geschrieben und dafür verwendet werden!
<br>Die Verwendung für reale Zwecke verstößt gegen die Instagram-Richtlinien!
<br>Folgen sind z.B. die Sperrung des Instagram-Accounts._

_Bitte ließ dir für mehr Informationen die [Richtlinien von Instagram](https://help.instagram.com/477434105621119/Instagram) durch._


### EULA & Urheberrecht
_Für IAC liegt eine [EULA](EULA.md) vor. Bitte ließ sie dir vor der Benutzung des Programmes genau durch.
<br>Mit dem Herunterladen und der Benutzung des Programmes akzeptierst du automatisch die EULA.
<br>Verstöße gegen die EULA können und werden rechtlich geahndet._


### Haftungsausschschluss
_Das Programm wurde sorgfältig erstellt und oft getestet. Trotzdem kann es zu schäden kommen.
<br>Ich als Autor trage keine Schuld an möglichen Schäden, die das Programm verursacht.
<br>Der jeweilige Benutzer haftet für sich selber, auch bei Sperrung des jeweiligen Instagram Accounts aufgrund der Nutzung des Programmes._


_@2020 - 2021 by [JueK3y](https://juek3y.com)_

###### _DO NOT modify and reupload the program.<br>DO NOT indicate used program sections as your own._
