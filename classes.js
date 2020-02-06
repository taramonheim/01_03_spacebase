class Helper {
  static setCharsAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substr(0, index) + chr + str.substr(index + chr.length);
  }
}

class Invader {
  constructor(appearance, ischBinKaputt, explodeTime, id) {
    this.appearance = appearance;
    this.id = id;
    this.ischBinKaputt = ischBinKaputt;
    this.explodeTime = explodeTime;
  }
  //Die constructor Methode ist eine spezielle Methode für das erzeugen und initialisieren von Objekten, die mit dem Schlüsselwort class erzeugt wurden.
  //gibt dem Invader sein Aussehen, den Status, ob er kaputt ist oder nicht, eine explodeTime und eine id 
  shootLaser() {
    console.log("Invader " + this.id + " Laser shot")
  }

  explode() { 
  //hier definieren wir das Aussehen des Invaders, beim Abschießen/explodieren dessen. 
  /*wir müssen darauf achten, dass man in jede Zeile 16 Zeichen setzt und es 5 Spalten gibt,
  damit das Ganze symetrisch aussieht. (ganze Invader Breite: 16 und die Höhe beträgt 5)*/
    this.appearance = ["                ",
      "   \\   |   /    ",
      " -  p u f f  -  ",
      "   /   |   \\    ",
      "                "
    ];
  }
}


class InvaderRow {
  constructor(posX, posY, width, height, invaders, id) {
    //wir weisen der InvaderRow verschiedene Eigenschaften zu (Position, Größe, das leere Array invaders und wir weisen der InvaderRow eine id zu)
    //Die constructor Methode ist eine spezielle Methode für das erzeugen und initialisieren von Objekten, die mit dem Schlüsselwort class erzeugt wurden.
    this.id = id; //this ist der Aufrufer der Funktion
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.invaders = invaders;
  }
  step(direction) {
    if (direction == 1) {
      this.posX += 1;
    }
    if (direction == -1) {
      this.posX -=1;
    }
    if (direction == "down") {
      this.posY += 1;
    }
  }
  static generateInvader(width, height) {
    /*Das Schlüsselwort static definiert statische Methoden. 
    Statische Methoden werden ohne Instanzierung einer Klasse aufgerufen und sind über eine erzeugte Instanz nicht aufrufbar.*/
    //hier wird der current invader definiert 
    let currentInvader = [];
    for (let y = 0; y < height; y++) {
      currentInvader[y] = " ".repeat(width * 2 + 1); 
      for (let x = 0; x < width; x++) {
        let randomNumber = Math.random();
        if (randomNumber >= 0.5) { //Zahl ist größer oder gleich 0.5 dann wird an diese Stelle ein Hastag gesetzt 
          currentInvader[y] = (Helper.setCharsAt(currentInvader[y], x, '#'));
          currentInvader[y] = (Helper.setCharsAt(currentInvader[y], 2 * width - x, '#'));
        }
      }
    }
    return currentInvader;
  }


  static generateInvaderRow(invaderWidth, invaderHeight) {
    let currentInvaders = [];
    /*hier haben wir eine Formel erstellt, die berechnet wie viele Invaders in die Größe der cols (in unserem FAll 140) passen. 
    Die Formel ist so aufgestellt, dass man die cols Breite verändern kann und somit auch mehr Invader in die Viebox gerendert bekommt.
    */
    let rowWidth = Math.floor(cols * 0.8); //Die Reihe der Invader soll 80 % der Breite einnehmen.
    let wholeInvader = invaderWidth * 2; //ein Invader ist in unserem Fall (8 * 2) 16 groß (da der Invader in der Mitte gespiegelt wird)
    let spacerWidth = invaderWidth / 2; //Der Space zwischen den Invadern solll die Hälfte des Invaders betragen
    let numInvaders = Math.floor((rowWidth / ((wholeInvader + spacerWidth)))); //Hier wird die Anzahl der Invader berechnet
    let invaderAppearance = InvaderRow.generateInvader(invaderWidth, invaderHeight); /* hier wird auf die Klasse InvaderRow zugegriffen 
    und dann auf die innere Klasse generateInvader */

    //let numInvaders = Math.floor(spacing);
    for (let i = 0; i < numInvaders; i++) { // gerundet(x = ((breite - breite*0,2) / invaderbreite) + (x - 1) * invaderbreite/2 ))
      let newInv = new Invader(invaderAppearance, false, 0, i); //wenn der Invader getroffen wird 
      currentInvaders.push(newInv);
    }
    return currentInvaders;
  }
}