var aircraft;
var asteroids = [];
let debris = [];
var stats;
var gameOver = false;
let asteroidGenerationPaused = false;
let asteroidSpawnRate = 3000; // Spawn a new asteroid every 3 seconds
let lastAsteroidTime = 0;
let maxAsteroids = 5; // Prevent infinite asteroid spam

// Setup the game environment
function setup() {
  createCanvas(windowWidth, windowHeight);
  startGame();
}

// Function to start the game
function startGame() {
  aircraft = new AirCraft(); // Reset aircraft
  stats = new Stats(); // Create a new Stats instance
  asteroids = []; // Clear existing asteroids
  debris = []; // Clear debris
  gameOver = false; // Reset the game-over flag
  stats.score = 0; // Reset score
  stats.health = 100; // Reset health

  // Add initial asteroids
  for (var i = 0; i < 5; i++) {
    asteroids.push(new Asteroid());
  }
}

// Main game loop
function draw() {
  background(0);

  if (gameOver) {
    stats.render();
    return;
  }

  // Spawn new asteroids over time (capped at maxAsteroids)
  if (millis() - lastAsteroidTime > asteroidSpawnRate && asteroids.length < maxAsteroids) {
    asteroids.push(new Asteroid());
    lastAsteroidTime = millis(); // Reset spawn timer
  }

  // Loop through asteroids
  for (let i = asteroids.length - 1; i >= 0; i--) {
    if (aircraft.hits(asteroids[i])) {
      stats.health -= 10;
      console.log("Asteroid hit! Health: " + stats.health);

      // Create debris when aircraft collides
      for (let k = 0; k < 30; k++) {
        debris.push(new Debris(asteroids[i].pos.copy(), p5.Vector.random2D().mult(random(1, 3)))); // Generate debris
      }

      if (stats.health <= 0) {
        gameOver = true;
        stats.gameOverTime = millis() - stats.startTime;
        noLoop();
        break;
      }

      let newAsteroids = asteroids[i].breakup();
      asteroids.splice(i, 1, ...newAsteroids);
    }

    if (asteroids[i]) {
      asteroids[i].update();
      asteroids[i].render();
      asteroids[i].edges();
    }
  }

  // Update & render stats
  stats.update(stats.score, stats.health);  
  stats.render();

  // Loop through debris
  for (let i = debris.length - 1; i >= 0; i--) {
    if (debris[i]) {
      debris[i].update();
      debris[i].render();
      if (debris[i].isDead()) {
        debris.splice(i, 1);
      }
    }
  }

  // Render & update aircraft
  aircraft.render();
  aircraft.turn();
  aircraft.update();
  aircraft.edges();
}

// Function to restart the game when ENTER is pressed
function keyPressed() {
  if (keyCode == RIGHT_ARROW && !gameOver) {
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