var aircraft;
var asteroids = [];
var lasers = [];
var stats;

function setup() {
  createCanvas(windowWidth, windowHeight);
  aircraft = new AirCraft();
  stats = new Stats(); // Create the Stats instance
  for (var i = 0; i < 5; i++) {
    asteroids.push(new Asteroid());
  }
}

function draw() {
  background(0);

  // Check if the game is over
  if (stats.health <= 0) {
    displayGameOver();
    noLoop(); // Stop the game loop
    return;
  }

  // Loop through all asteroids and check for collisions with the aircraft
  for (var i = 0; i < asteroids.length; i++) {
    // Check if the asteroid collides with the aircraft
    if (aircraft.hits(asteroids[i])) {
      stats.health -= 10; // Decrease health if aircraft hits an asteroid
      console.log('Ship hit an asteroid! Health:', stats.health);

      // If health is zero or below, stop the game
      if (stats.health <= 0) {
        console.log("Game Over");
        noLoop(); // Stop the game loop
      }

      // Break the asteroid into smaller pieces
      let newAsteroids = asteroids[i].breakup();
      asteroids.splice(i, 1, ...newAsteroids); // Replace the old asteroid with new smaller asteroids
    }
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edges();
  }

  // Loop through all lasers
  for (var i = lasers.length - 1; i >= 0; i--) {
    lasers[i].render();
    lasers[i].update();
    if (lasers[i].offscreen()) {
      lasers.splice(i, 1);
    } else {
      for (var j = asteroids.length - 1; j >= 0; j--) {
        if (lasers[i].hits(asteroids[j])) {
          if (asteroids[j].r > 10) {
            var newAsteroids = asteroids[j].breakup();
            asteroids = asteroids.concat(newAsteroids);
          }
          asteroids.splice(j, 1);
          lasers.splice(i, 1);
          stats.score += 10; // Increase score when asteroid is destroyed
          stats.accuracy = calculateAccuracy(lasers.length); // Update accuracy
          break;
        }
      }
    }
  }

  aircraft.render();
  aircraft.turn();
  aircraft.update();
  aircraft.edges();

  // Update stats with the current values
  stats.update(stats.accuracy, stats.score, stats.health);
  stats.render(); // Render stats on the screen
}

// Function to display a Game Over message
function displayGameOver() {
  push();
  fill(255, 0, 0); // Red color for Game Over text
  textSize(48);
  textAlign(CENTER, CENTER);
  text("GAME OVER", width / 2, height / 2 - 50);
  textSize(24);
  text("Press F5 to Restart", width / 2, height / 2 + 20);
  pop();
}

// Function to calculate accuracy based on laser shots fired and hits
function calculateAccuracy(totalShots) {
  let successfulHits = lasers.filter(laser => !laser.offscreen()).length;
  return (successfulHits / totalShots) * 100;
}

function keyReleased() {
  aircraft.setRotation(0);
  aircraft.boosting(false);
}

function keyPressed() {
  if (key == ' ') {
    lasers.push(new Laser(aircraft.pos, aircraft.heading));
  } else if (keyCode == RIGHT_ARROW) {
    aircraft.setRotation(0.1);
  } else if (keyCode == LEFT_ARROW) {
    aircraft.setRotation(-0.1);
  } else if (keyCode == UP_ARROW) {
    aircraft.boosting(true);
  }
}
