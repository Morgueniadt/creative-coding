var aircraft;
var asteroids = [];
var lasers = [];
let debris = [];
let healthPacks = [];
let megaLaser;
var stats;
var gameOver = false;
let asteroidSpawnRate = 10000; // Spawn a new asteroid every 3 seconds
let lastAsteroidTime = 0;
let maxAsteroids = 5; // Prevent infinite asteroid spam
let healthSlider;
let isGameStarted = false;

// Setup the game environment
function setup() {
  createCanvas(windowWidth, windowHeight);
  // Create a health slider before starting the game
  healthSlider = createSlider(50, 200, 100, 1); // Min value 50, max value 200, default 100
  healthSlider.position(20, 100);
  healthSlider.style('width', '200px');
  
  // Create a button to start the game
  let startButton = createButton('Start Game');
  startButton.position(20, 140);
  startButton.mousePressed(startGame);
}

// Start the game
function startGame() {
  // Set game to started
  isGameStarted = true;
  
  // Get the health value from the slider
  let selectedHealth = healthSlider.value();
  
  // Initialize stats with the chosen health value
  stats = new Stats({ health: selectedHealth });
  aircraft = new AirCraft(); // Reset aircraft
  
  // Reset game state
  asteroids = []; // Clear existing asteroids
  lasers = []; // Clear lasers
  debris = []; // Clear debris
  gameOver = false; // Reset the game-over flag
  stats.score = 0; // Reset score

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

  // Loop through lasers
  for (let i = lasers.length - 1; i >= 0; i--) {
    if (lasers[i]) {
      lasers[i].update();
      lasers[i].render();

      if (lasers[i].offscreen()) {
        lasers.splice(i, 1);
        continue;
      }

      // Check if laser hits an asteroid
      for (let j = asteroids.length - 1; j >= 0; j--) {
        if (lasers[i] && lasers[i].hits(asteroids[j])) {
          // Create debris
          for (let k = 0; k < 20; k++) {
            debris.push(new Debris(asteroids[j].pos.copy(), p5.Vector.random2D().mult(random(1, 3)))); // Generate debris
          }

          if (asteroids[j].r > 10) {
            let newAsteroids = asteroids[j].breakup();
            asteroids = asteroids.concat(newAsteroids); // Split asteroid
          }

          asteroids.splice(j, 1); // Remove asteroid
          asteroids.push(new Asteroid()); // Replace asteroid
          lasers.splice(i, 1); // Remove laser
          stats.score += 10;
          break;
        }
      }
    }
  }

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

  // Update & render stats
  stats.update(stats.score, stats.health);
  stats.render();

  if (keyIsDown(70) && !gameOver) {
    lasers.push(new Laser(aircraft.pos, aircraft.heading));
    console.log("rapid fire");
  }
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
