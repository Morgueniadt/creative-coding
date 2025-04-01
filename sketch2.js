let starfield; // Declare the starfield instance

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Initialize the starfield object
  starfield = new Starfield({
    starFieldWidth: windowWidth,
    starFieldHeight: windowHeight,
    starFieldPosX: windowWidth / 2,
    starFieldPosY: windowHeight / 2,
  });

  // Set up the game
  starfield.setup();
}

function draw() {
  // Call the update function of the starfield to handle the game loop
  starfield.update();
}
function keyPressed() {
    if (keyCode == 70 && !gameOver) {
      lasers.push(new Laser(aircraft.pos, aircraft.heading));
      console.log("laser fired");
    } else if (keyCode == RIGHT_ARROW && !gameOver) {
      aircraft.setRotation(0.1);
    } else if (keyCode == LEFT_ARROW && !gameOver) {
      aircraft.setRotation(-0.1);
    } else if (keyCode == UP_ARROW && !gameOver) {
      aircraft.boosting(true);
      console.log("boosting");
    } else if (key === 'm' && !megaLaser.isActive && megaLaser.canFire()) {
      megaLaser = new MegaLaser(aircraft.pos, aircraft.heading); // Fire MegaLaser
      megaLaser.lastFiredTime = millis(); // Set last fired time
      megaLaser.isActive = true;
    }
     else if (keyCode === ENTER && gameOver) {
      startGame(); // Restart the game when ENTER is pressed
      loop(); // Restart the game loop
    }
  }
  
  
  function keyReleased() {
    if (keyCode == RIGHT_ARROW || keyCode == LEFT_ARROW) {
      aircraft.setRotation(0); // Stop rotation when no key is pressed
    } else if (keyCode == UP_ARROW) {
      aircraft.boosting(false); // Stop boosting when UP key is released
    }
  }
  