
//jeder Invader unabhängige Id
//rowId und invaderId
//verschiedene Scopes (let class static)

class invaderRow {
  constructor(posX, posY, width, height, invaders, id) {
    this.invaders = invaders;
    this.id = id;
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
  }

  static generateInvaderRow(invaderWidth, invaderHeight) {
    let currentInvaders = [];
    for (i = 0; i < Math.floor((1 / 25 - 2 * invaderWidth / 25) * (8 * cols + 5)); i++) { //gerundet (x = breite-breite *0,2)/invaderWidth) + (x-1) * invaderWidth/2)
      //wie viele Invader passsen in eine Row einbezogen sind Zwischenabstände 
      let newInv = new Invader(Invader.generateInvader(invaderWidth, invaderHeight), i);
      currentInvaders[i].push(newInv);
      invId++;
    }
    return currentInvaders;
  }
}

class Invader {
  constructor(width, height, appearance, id) {
    this.width = width;
    this.height = height;
    //this.posX = posX;
    //this.posY =posY;
    this.appearance = appearance;
    this.id = id;
  }

  shootLaser() {
    console.log(`Invader ${this.id} Laser shot`)
  }

  explode() {
    console.log("Invader " + this.id + " exploded")
    
  }
  isHitByBullet(bulletX, bulletY) {
    //prüfen ob der Bullet den Invader trifft
  }
  setCharsAt(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substr(0, index) + chr + str.substr(index + chr.length);
  }


    static generateInvader(width, height) {
    let invader = []; //Speicherung im Array //y-Schleife läuft so oft durch wie der invader hoch ist 
    for (let y = 0; y < height; y++) {
      invader[y] = " ".repeat(2 * width + 1); //Spiegelung an der y-Achse //Speicherung als String //.repeat macht 2 mal die Breite des Invaders +1 (als Leerzeichen)
      for (let x = 0; x < width; x++) { //x Schleife läuft so oft wie breit 
        let randomNumber = Math.random(); //Nummer zwischen 0 - 1
        if (randomNumber >= 0.5) { //range setzten damit die hälfte von random numbers in hastatgs umgesetzt wird
          invader[y] = setCharsAt(invader[y], x, '□') //überschreibt # an string 
          invader[y] = setCharsAt(invader[y], 2 * width - x, '□') //Spiegelung des Invader //setzt das Hastag an eine bestimmte Stelle im String 
        }
      }
    }
    return invader;
  }
}