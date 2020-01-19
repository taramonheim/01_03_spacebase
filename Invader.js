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
  setCharsAt(str,index,chr) {
		if(index > str.length-1) return str;
		return str.substr(0,index) + chr + str.substr(index+chr.length);
  }
  
  static generateInvader(width, height) {
			let invader = []; //Speicherung im Array //y-Schleife läuft so oft durch wie der invader hoch ist 
			for (let y = 0; y < height; y++) { 
        invader[y] = " ".repeat(2 * width+1); //Spiegelung an der y-Achse //Speicherung als String //.repeat macht 2 mal die Breite des Invaders +1 (als Leerzeichen)
      for (let x = 0; x < width; x++) { //x Schleife läuft so oft wie breit 
        let randomNumber = Math.random(); //Nummer zwischen 0 - 1
				if (randomNumber >= 0.5) {  //range setzten damit die hälfte von random numbers in hastatgs umgesetzt wird
          invader[y] = setCharsAt(invader[y],x, '#') //überschreibt # an string 
          invader[y] = setCharsAt(invader[y],2 * width - x, '#') //Spiegelung des Invader //setzt das Hastag an eine bestimmte Stelle im String 
        }
      }
    }
    return invader;
  }
}
