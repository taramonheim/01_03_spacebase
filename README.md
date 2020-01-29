# 01_03_spacebase

## <u>Dokumentation Space Invader</u>
##### Maximilian Becht und Tara Monheim
>Maximilian Becht auf [Github](https://github.com/maxicozy).

>Tara Monheim auf [Github](https://github.com/taramonheim).

Unser Space Invader Projekt wurde im Laufe des ersten Semesters im Fach Programmiersprachen 1 gecoded. Das Space Invader Projekt soll es dem Spieler ermöglichen mit dem Spaceship die Invaders zu treffen und sie zum explodieren zu bringen. Die Invader Reihe kommt langsam immer weiter runter. Die Invader selber schießen das Spaceship random ab. Also ran an die Tasten und probier es aus! 

Den Code haben wir mithilfe unseres Dozenten[ Florian Geiselhart](https://github.com/fg-uulm) 
geschrieben. Das Internet hilft natürlich immer, aber da es sehr viele Space Invader Games gibt, die programmiert wurden, verliert man schnell den Überblick. Also setzen, denken und verzweifeln! Was immer hilft: Die Klassen und Eigenschaften einfach mal aufzuschreiben mit Papier und Stift. Ganz Old School. 

Eigenschaften des Spiels, an denen wir gearbeitet haben: 
1. Die Invader werden radom gerendert.
2. Die Invader werden in einer Reihe generiert. 
3. Wenn die Invader Reihe an den Rand des cols kommt bewegt sie sich eine Spalte runter und in die andere Richtung,
4. Das Spaceship schießt auf die Invader, trifft ein bullet den Invader explodiert dieser. 


<img src = "coder2.JPG"/>
<img src = "Coder.JPG"/>


## Usage / Benutzung

Unser Space Invader Game kann man mithilfe dem Chrome Browser öffnen. Hierzu kann man den Code entweder einfach downloaden und in einen Code Editor öffnen, um ihn zu individualisieren oder man öffnet ihn direkt. Hierzu brauchen wir die [classes.js](classes.js) und die [index.html](index.html).
Das Spaceship kann man mit den <kbd>key left</kbd> und <kbd>key right</kbd> Tasten bewegen. Durch die <kbd>Leertaste</kbd> schießt das Spaceship auf die Invader.
Was (noch) nicht richtig funktioniert und weshalb.

## Structure / Aufbau

Wir haben das Spiel anhand von Klassen aufgebaut,
deren Eigenschaften wir in der Javascript Datei angegeben haben. In der Html Datei greifen wir auf diese Klassen zu. 

* **Invader**: Hier ruft die Klasse Invader durch den constructor ihre `Appaerance` und `id` auf. 

<pre>class Invader {
  constructor(appearance, id) {
    this.appearance = appearance;
    this.id = id;
  } </pre>

* **Invader Row** Eine Klasse, die die Invader in einer Reihe generiert. Mit den Eigenschaften Position der Reihe, der Breite und Höhe, zudem greift sie auf unsere erzeugten invaders zu und hat selber eine id.  

<pre>class InvaderRow {
  constructor(posX, posY, width, height, invaders, id) {
    this.id = id;
    this.posX = posX;
    this.posY = posY; 
    this.width = width;
    this.height = height;
    this.invaders = invaders;
  } 
  //hier werden noch die beiden static        Variablen eingefügt
  </pre>




* **static generateInvader** Eine Variable, um den Invader in Code abzubilden. Enthält typische Eigenschaften des Invaders:

 >Mit Static deklariert man solche Variablen, die bei jedem Objekt einer Klasse gleich sein sollen und sobald die Variable in einem der Objekte verändert wurden, auch bei allen anderen Objekten der Klasse verändert werden

<pre>static generateInvader(width, height) {
    let currentInvader = [];
    for (let y = 0; y < height; y++) {
      currentInvader[y] = " ".repeat(width*2+1);
      for (let x = 0; x < width; x++) {
        let randomNumber = Math.random();
        if (randomNumber >= 0.5) {
          currentInvader[y] = (Helper.setCharsAt(currentInvader[y], x,'#'));
          currentInvader[y] = (Helper.setCharsAt(currentInvader[y], 2 * width - x,'#'));
        }
      }
    }
    return currentInvader;
  }
  </pre>

  * `width, height`: Invadergröße (Property)
  * `currentInvader`: Hier wird ein currentInvader generiert. 

* **static generateInvaderRow:** Eine Variable um eine Person in Code abzubilden. Enthält typische Eigenschaften und Methoden von Menschen, um mit Bier zu interagieren:
<pre> static generateInvaderRow(invaderWidth, invaderHeight) {
    let currentInvaders = [];
    let rowWidth = Math.floor(cols*0.8);
    let wholeInvader = invaderWidth * 2;
    let spacerWidth = invaderWidth/2; 
    let numInvaders = Math.floor((rowWidth / ((wholeInvader+spacerWidth))));
    let invaderAppearance = InvaderRow.generateInvader(invaderWidth, invaderHeight);
    //let numInvaders = Math.floor(spacing);
			for(let i = 0; i < numInvaders ; i++) { // gerundet(x = ((breite - breite*0,2) / invaderbreite) + (x - 1) * invaderbreite/2 ))
        let newInv = new Invader(invaderAppearance, i);
        currentInvaders.push(newInv);
			}
		return currentInvaders;
  } </pre>

Hier rechnen wir aus wie viele Invaders in einer 

  * `drinkBeer(beer)`: trinkt ein Bier, welches als Parameter übergeben wird und vom Typ / Klasse "Beer" sein muss (Funktion)
  * `isDrunk`: gibt an ob eine Person betrunken ist (Property, Boolean)

_Zentrale Funktionen (die nicht zu Klassen gehören) folgen dem selben Muster, werden aber meist etwas ausführlicher beschrieben:_

`haveParty(persons[], interval)`: Eine Funktion die ein Array von Personen entgegennimmt, und diese dann im angegebenen Intervall Bier trinken lässt. Nach jedem Durchlauf durch das Biertrinken (durch Aufruf von drinkBeer mit einem neu erzeugten Bier-Objekt) wird überprüft, ob die Anzahl der betrunkenen Personen größer 0 ist. Wenn dies eintritt, wird das Intervall bei jedem Durchlauf auf die doppelte Länge verlängert. Die Funktion endet in ihrer Ausführung dann wenn alle Personen isDrunk = true zurückgeben, oder wenn das Interval größer als 1 Stunde wird. Wird die Funktion mit nur einer Person im Array aufgerufen, wird eine Warnmeldung ausgegeben, um versehentliches Trinken alleine zu vermeiden. 

_(Achtung: Hier werden nur Funktionen beschrieben, die eine zentrale Rolle einnehmen.)_

Nach der Beschreibung der elementaren Bestandteile wird aus der Vogelperspektive nochmals beschrieben, welche Gesamtzustände euer System durchlaufen kann. In diesem Fall würde der User zunächst 0 bis n Personen erzeugen, und diese mit haveParty() zum Bier trinken bringen.  Dabei wird innerhalb von haveParty nacheinander für jede Person drinkBeer() aufgerufen, unter Benutzung von neuen Bier-Objekten. Nach Ende der Party muss das Programm neu gestartet werden um die Zustände zurückzusetzen.

_(Achtung, dieser Teil liest sich jetzt sehr ähnlich zur Funktionsbeschreibung von haveParty - das liegt daran dass es im Beispiel nur eine zentrale Funktion gibt. Ihr habt aber mehrere die zusammenspielen!)._
