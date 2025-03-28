var aircraft;
var asteroids = [];
var lasers = [];
let debris = [];
var stats;
var gameOver = false; // Track if the game is over

function setup() {
  createCanvas(windowWidth, windowHeight);
  startGame(); // Start the game
}

function startGame() {
  aircraft = new AirCraft(); // Reset aircraft
  stats = new Stats(); // Create a new Stats instance
  asteroids = []; // Clear existing asteroids
  lasers = []; // Clear lasers
  debris = []; // Clear debris
  gameOver = false; // Reset the game-over flag
  stats.score = 0; // Reset score
  stats.health = 100; // Reset health

  // Add initial asteroids
  for (var i = 0; i < 5; i++) {
    asteroids.push(new Asteroid());
  }
}


function draw() {
  background(0);

  // If the game is over, stop the game loop and display the Game Over screen
  if (gameOver) {
    stats.render(); // This now handles displaying the Game Over screen
    return; // Stop the game loop
  }

  // Loop through all asteroids and check for collisions with the aircraft
  for (let i = asteroids.length - 1; i >= 0; i--) {
    if (aircraft.hits(asteroids[i])) {
      stats.health -= 10; // Decrease health if aircraft hits an asteroid
      console.log("asteroid hit, health is now: " + stats.health);

      // Add debris when the aircraft hits an asteroid
      for (let k = 0; k < 30; k++) {
        debris.push(
          new Debris(asteroids[i].pos.copy(), p5.Vector.random2D().mult(random(1, 3)))
        );
      }

      if (stats.health <= 0) {
        gameOver = true;
        stats.gameOverTime = millis() - stats.startTime; // Capture game over time
        noLoop(); // Stop the game loop
        break;
      }

      // Break the asteroid into smaller pieces
      let newAsteroids = asteroids[i].breakup();
      asteroids.splice(i, 1, ...newAsteroids);
    }

    // Update and render each asteroid
// Loop through all asteroids
for (let i = asteroids.length - 1; i >= 0; i--) {
  if (asteroids[i]) { // Ensure asteroid exists
    asteroids[i].update(); // Safe to call update()
    asteroids[i].render();
    asteroids[i].edges();
  }
}

// Loop through all lasers
for (let i = lasers.length - 1; i >= 0; i--) {
  if (lasers[i]) { // Ensure laser exists
    lasers[i].update(); // Safe to call update()
    lasers[i].render();
  }
}

// Loop through all debris
for (let i = debris.length - 1; i >= 0; i--) {
  if (debris[i]) { // Ensure debris exists
    debris[i].update(); // Safe to call update()
    debris[i].render();
  }
}
  }

  // Loop through all lasers
  for (let i = lasers.length - 1; i >= 0; i--) {
    if (lasers[i]) { // Check if laser exists
      lasers[i].render();
      lasers[i].update();

      // Remove laser if it goes offscreen
      if (lasers[i].offscreen()) {
        lasers.splice(i, 1);
      } else {
        // Check if laser hits an asteroid
        for (let j = asteroids.length - 1; j >= 0; j--) {
          if (lasers[i].hits(asteroids[j])) {
            // Add debris when laser hits an asteroid
            for (let k = 0; k < 20; k++) {
              debris.push(
                new Debris(asteroids[j].pos.copy(), p5.Vector.random2D().mult(random(1, 3)))
              );
            }

            if (asteroids[j].r > 10) {
              let newAsteroids = asteroids[j].breakup();
              asteroids = asteroids.concat(newAsteroids);
            }
            asteroids.splice(j, 1);
            lasers.splice(i, 1);
            stats.score += 10;
            break;
          }
        }
      }
    }
  }

  // Render and update the aircraft
  aircraft.render();
  aircraft.turn();
  aircraft.update();
  aircraft.edges();

  // Update stats with the current values
  stats.update(stats.score, stats.health);
  stats.render();
}

// Function to restart the game when ENTER is pressed
function keyPressed() {
  if (key == ' ' && !gameOver) {
    lasers.push(new Laser(aircraft.pos, aircraft.heading));
    console.log("laser fired");
  } else if (keyCode == RIGHT_ARROW && !gameOver) {
    aircraft.setRotation(0.1);
  } else if (keyCode == LEFT_ARROW && !gameOver) {
    aircraft.setRotation(-0.1);
  } else if (keyCode == UP_ARROW && !gameOver) {
    aircraft.boosting(true);
    console.log("boosting");
  } else if (keyCode === ENTER && gameOver) {
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
