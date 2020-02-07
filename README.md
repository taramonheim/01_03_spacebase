# 01_03_spacebase

# <u>Dokumentation Space Invader</u>
##### Maximilian Becht und Tara Monheim
>Maximilian Becht auf [Github](https://github.com/maxicozy).

>Tara Monheim auf [Github](https://github.com/taramonheim).

Unser Space Invader Projekt wurde im Laufe des ersten Semesters im Fach Programmiersprachen 1 gecoded. Das Space Invader
Projekt soll es dem Spieler ermöglichen mit dem Spaceship die Invaders zu treffen und sie zum explodieren zu bringen.
Die Invader Reihe kommt langsam immer weiter runter. Also ran an die Tasten und probier es aus!

Den Code haben wir mithilfe unseres Dozenten[ Florian Geiselhart](https://github.com/fg-uulm) (das bist du)
geschrieben. Er basiert auf dem Basis Code von unserem Dozenten und wurde von uns erweitert. Den Basis Code findet man
[hier](https://github.com/hfgcoding/01_03_spacebase).
Auch das Internet hilft in der Regel, aber da es sehr viele Space Invader Games gibt, die programmiert wurden,verliert
man schnell den Überblick.
Also ransetzen, denken und coden! Was immer hilft:
Die Klassen und Eigenschaften einfach mal aufzuschreiben. Mit Papier und Stift. Ganz Old School.

Eigenschaften des Spiels, an denen wir gearbeitet haben:

1. Die Invader werden radom gerendert.

2. Die Invader werden in einer Reihe generiert.
3. Es werden so viele Invader generiert, wie in das Feld passen.
4. Wenn die Invader Reihe an den Rand des Felds kommt bewegt sie sich eine Zeile runter und in die andere Richtung.
5. Das Spaceship schießt auf die Invader, trifft ein Bullet den Invader, explodiert dieser.
6. Ein Score am Rand zählt hoch, wenn man einen Invader trifft.
7. Unser Code baut auf Klassen auf, die wir in der Javascript Datei definiert haben.

<img src="coder2.JPG" />
<img src="Coder.JPG" />


# Usage / Benutzung

Um das Spiel selbst zu erleben, kann man den Code entweder einfach von Github downloaden und in einen Code Editor
öffnen, um ihn zu individualisieren oder man öffnet ihn mit einem Browser.
Im Code Editor braucht man
die [classes.js](classes.js) und die [index.html](index.html), die auf Github zu finden sind.
Um das ganze in einem belibiegen Browser öffnen zu können, muss man das Repository auf Github forken und clonen und dann
die Html Datei mit einem Browser öffnen.
Sobald die Seite geladen ist startet auch das Spiel. Die Invader bewegen sich in ihrer Reihe von links nach rechts,
treffen sie an den Rand, rücken sie eine Zeile nach unten und ändern ihre BEwegungsrichtung nun nach links.Das Spaceship
kann man mit den <kbd>key left</kbd> und <kbd>key right</kbd> Tasten bewegen. Durch die
<kbd>Leertaste</kbd> schießt das Spaceship auf die Invader. Diese explodieren, sobald sie getroffen werden. Durch die
Barriere, die das Spaceship schützen soll, kann man nicht durchschießen.
Die Invaders selber können zur Zeit noch nicht auf das Spaceship schießen.
Würde das funktionieren, müsste auch die Barriere, bei Abschuss derer, Stück für Stück verschwinden.
Durch den Reload Button des Fensters kann man das Spiel neu starten.

# Structure / Aufbau

Wir haben das Spiel anhand von Klassen aufgebaut,
deren Eigenschaften wir in der Javascript Datei angegeben haben. In der Html Datei greifen wir auf diese Klassen zu.

### **class Invader**:

<pre>
class Invader {
  constructor(appearance, ischBinKaputt, explodeTime, id) {
    this.appearance = appearance;
    this.id = id;
    this.ischBinKaputt = ischBinKaputt;
    this.explodeTime = explodeTime;
  }
  shootLaser() {
    console.log("Invader " + this.id + " Laser shot")
  }
  explode() { 
    this.appearance = ["                ",
      "   \\   |   /    ",
      " -  p u f f  -  ",
      "   /   |   \\    ",
      "                "
    ];
  }
}
 </pre>

* hier haben wir der Klasse Invader die Eigenschaften `appearance`, `ischBinKaputt`, `explodeTime` und `id` zugeorndet.
Außerdem haben wir ihm die Methode `explode()` gegeben,um sein Aussehen nach dem Explodieren zu bestimmen.

### **class InvaderRow**
<pre>
class InvaderRow {
  constructor(posX, posY, width, height, invaders, id) {
    this.id = id; 
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.invaders = invaders;
  }
  </pre>

* Die Klasse `InvaderRow` beinhaltet ihre eigene Position und invader.

### **static generateInvader:**

>Das <kbd>static</kbd> Schüsselwort definiert statische Methoden für eine Klasse.

<pre> static generateInvader(width, height) {
    let currentInvader = [];
    for (let y = 0; y < height; y++) {
      currentInvader[y] = " ".repeat(width * 2 + 1); 
      for (let x = 0; x < width; x++) {
        let randomNumber = Math.random();
        if (randomNumber >= 0.5) {  
          currentInvader[y] = (Helper.setCharsAt(currentInvader[y], x, '#'));
          currentInvader[y] = (Helper.setCharsAt(currentInvader[y], 2 * width - x, '#'));
        }
      }
    }
    return currentInvader;
  }
  </pre>

* `width, height`: Invadergröße (Property)
* `currentInvader`: ist ein Array, in das so viele Strings generiert werden, wie der Invader hoch ist
* eine zufällige Zahl wird generiert ist diese größer oder gleich `0.5`, so wird ein `"#"` an diese Stelle des
currentInvaders Arrays geschrieben. Somit hat man die Hälfte dieses Invaders. Diese wird anschließend gespiegelt.

### **static generateInvaderRow:**

<pre>  static generateInvaderRow(invaderWidth, invaderHeight) {
    let currentInvaders = [];
    let rowWidth = Math.floor(cols * 0.8); 
    let wholeInvader = invaderWidth * 2; 
    let spacerWidth = invaderWidth / 2; 
    let numInvaders = Math.floor((rowWidth / ((wholeInvader + spacerWidth)))); 
    let invaderAppearance = InvaderRow.generateInvader(invaderWidth, invaderHeight); 
    for (let i = 0; i < numInvaders; i++) { 
      let newInv = new Invader(invaderAppearance, false, 0, i); 
      currentInvaders.push(newInv);
    }
    return currentInvaders;
  }
}</pre>

* hier wird ausgerechnet wie viele Invader in 80 % der Spielfeldbreite passen. Anschließend werden so viele Invader in ein Array gepusht.


### function renderBullets

<pre>	
function renderBullets() {
currentSpaceshipBullets = currentSpaceshipBullets.filter(bullet => bullet.y > 1);
currentSpaceshipBullets.forEach((bullet) => {
bullet.y -= 1;if (renderStr[xyToStringPos(bullet.x, bullet.y - 1)'#') {
let currentId = 0;
for (let invaderPos = invaders[rowId].posX; invade<= invaders[rowId].posX + 5 * (invaderWidth * 2 +
		invaderWidth / 2); invaderPos = invaderPinvaderWidth * 2 + invaderWidth / 2) {
if (bullet.x > invaderPos && bullet.x < invaderPinvaderWidth *2) { 
invaders[rowId].invaders[currentId].ischBinKaputrue; 
invaders[rowId].invaders[currentId].explode();

invaderPoints++; 
loop
break; 
}
currentId++;
}
currentSpaceshipBullets = currentSpaceshipBullets.f(currentBullet => currentBullet != bullet);}if (renderStr[xyToStringPos(bullet.x, bullet.y - 1)'=') {
currentSpaceshipBullets = currentSpaceshipBullets.f(currentBullet => currentBullet != bullet);}renderStr = Helper.setCharsAt(renderStr, xyToStri(bullet.x, bullet.y), "|")}</pre>

* 

### function renderInvaderrow




### Zusammenfassung








## ToDos

1. Man muss die Invaders selber schießen lassen. Dies muss random passieren.  

2. Es sollen mehrere Reihen von Invaders aufeinander folgen.
3. Das Hindernis muss bei Abschuss der Invader kaputt gehen.
4. Wenn die Invader eine gewissen Punkt auf der y-Achse erreichen, sollte der Spieler verloren haben.
5. Man kann noch eine Game Over/ Win Schrift einbauen.
6. Wenn die Invader getroffen werden, erhöhen sie auch die Geschwindigkeit, damit es schwieriger wird sie Abzuschießen.
7. Einen New Game Button, um das Spiel mit dem Button neu zu starten.
8. Das Spaceship hat mehrere Leben und eine Lebensanzeige, die bei Treffer durch Invader weniger werden.
9. Ein Invader Boss, der auftaucht und mehr Punkte bringt.
10. Hintergrundmusik und Soundeffekte
13. Verschiedene Level mit unterschiedlichen Schwierigkeitsstufen.



















* `drinkBeer(beer)`: trinkt ein Bier, welches als Parameter übergeben wird und vom Typ / Klasse "Beer" sein muss
(Funktion)
* `isDrunk`: gibt an ob eine Person betrunken ist (Property, Boolean)

_Zentrale Funktionen (die nicht zu Klassen gehören) folgen dem selben Muster, werden aber meist etwas ausführlicher
beschrieben:_

`haveParty(persons[], interval)`: Eine Funktion die ein Array von Personen entgegennimmt, und diese dann im angegebenen
Intervall Bier trinken lässt. Nach jedem Durchlauf durch das Biertrinken (durch Aufruf von drinkBeer mit einem neu
erzeugten Bier-Objekt) wird überprüft, ob die Anzahl der betrunkenen Personen größer 0 ist. Wenn dies eintritt, wird das
Intervall bei jedem Durchlauf auf die doppelte Länge verlängert. Die Funktion endet in ihrer Ausführung dann wenn alle
Personen isDrunk = true zurückgeben, oder wenn das Interval größer als 1 Stunde wird. Wird die Funktion mit nur einer
Person im Array aufgerufen, wird eine Warnmeldung ausgegeben, um versehentliches Trinken alleine zu vermeiden.

_(Achtung: Hier werden nur Funktionen beschrieben, die eine zentrale Rolle einnehmen.)_

Nach der Beschreibung der elementaren Bestandteile wird aus der Vogelperspektive nochmals beschrieben, welche
Gesamtzustände euer System durchlaufen kann. In diesem Fall würde der User zunächst 0 bis n Personen erzeugen, und diese
mit haveParty() zum Bier trinken bringen. Dabei wird innerhalb von haveParty nacheinander für jede Person drinkBeer()
aufgerufen, unter Benutzung von neuen Bier-Objekten. Nach Ende der Party muss das Programm neu gestartet werden um die
Zustände zurückzusetzen.

_(Achtung, dieser Teil liest sich jetzt sehr ähnlich zur Funktionsbeschreibung von haveParty - das liegt daran dass es
im Beispiel nur eine zentrale Funktion gibt. Ihr habt aber mehrere die zusammenspielen!)._Eine Variable um eine Person
in Code abzubilden. Enthält typische Eigenschaften und
Methoden von Menschen, um mit Bier zu interagieren: