class Starfield {
    constructor(obj) {
        this.starFieldWidth = obj.starFieldWidth ?? windowWidth;
        this.starFieldHeight = obj.starFieldHeight ?? windowHeight;
        this.starFieldPosX = obj.starFieldPosX ?? windowWidth / 2;
        this.starFieldPosY = obj.starFieldPosY ?? windowHeight / 2;
        this.aircraft = []; // Array to hold multiple aircraft
        this.lasers = [];
        this.debris = [];
        this.asteroids = [];
        this.stats = new Stats();
        this.gameOver = false;
        this.asteroidSpawnRate = 10000;
        this.lastAsteroidTime = 0;
        this.maxAsteroids = 5;
        this.asteroidGenerationPaused = false;
    }

    setup() {
        this.startGame();
    }

    startGame() {
        this.aircraft = []; // Reset aircraft array
        this.stats = new Stats(); // Create a new Stats instance
        this.asteroids = []; // Clear existing asteroids
        this.lasers = []; // Clear lasers
        this.debris = []; // Clear debris
        this.gameOver = false; // Reset the game-over flag
        this.stats.score = 0; // Reset score
        this.stats.health = 100; // Reset health

        // Add initial asteroids
        for (let i = 0; i < 5; i++) {
            this.asteroids.push(new Asteroid());
        }

        // Add multiple aircraft (for example, 3 aircraft)
        for (let i = 0; i < 3; i++) {
            this.aircraft.push(new AirCraft()); // Create multiple aircraft
        }
    }

    renderAirCrafts() {
        this.aircraft.forEach((aircraft, id) => {
            aircraft.renderAirCraft(id);
        });
    }

    boostAirCrafts() {
        this.aircraft.forEach(aircraft => {
            this.checkLimit(aircraft);
            aircraft.boost();
        });
    }

    checkLimit(aircraft) {
        if (aircraft.pos.x > this.starFieldWidth) {
            aircraft.pos.x = 0;
        } else if (aircraft.pos.x < 0) {
            aircraft.pos.x = this.starFieldWidth;
        }

        if (aircraft.pos.y > this.starFieldHeight) {
            aircraft.pos.y = 0;
        } else if (aircraft.pos.y < 0) {
            aircraft.pos.y = this.starFieldHeight;
        }
    }

    spawnAsteroids() {
        if (millis() - this.lastAsteroidTime > this.asteroidSpawnRate && this.asteroids.length < this.maxAsteroids) {
            this.asteroids.push(new Asteroid());
            this.lastAsteroidTime = millis(); // Reset spawn timer
        }
    }

    handleLasers() {
        for (let i = this.lasers.length - 1; i >= 0; i--) {
            if (this.lasers[i]) {
                this.lasers[i].update();
                this.lasers[i].render();

                if (this.lasers[i].offscreen()) {
                    this.lasers.splice(i, 1);
                    continue;
                }

                // Check if laser hits an asteroid
                for (let j = this.asteroids.length - 1; j >= 0; j--) {
                    if (this.lasers[i] && this.lasers[i].hits(this.asteroids[j])) {
                        // Create debris
                        for (let k = 0; k < 20; k++) {
                            this.debris.push(new Debris(this.asteroids[j].pos.copy(), p5.Vector.random2D().mult(random(1, 3)))); // Generate debris
                        }

                        if (this.asteroids[j].r > 10) {
                            let newAsteroids = this.asteroids[j].breakup();
                            this.asteroids = this.asteroids.concat(newAsteroids); // Split asteroid
                        }

                        this.asteroids.splice(j, 1); // Reboost asteroid
                        this.asteroids.push(new Asteroid()); // Replace asteroid
                        this.lasers.splice(i, 1); // Reboost laser
                        this.stats.score += 10;
                        break;
                    }
                }
            }
        }
    }

    renderLasers() {
        this.lasers.forEach(laser => {
            laser.render();  // Assuming each laser object has a render method
        });
    }

    handleAsteroids() {
        for (let i = this.asteroids.length - 1; i >= 0; i--) {
            if (this.aircraft.length > 0) {
                this.aircraft.forEach(aircraft => {
                    if (aircraft.hits(this.asteroids[i])) {
                        this.stats.health -= 10;

                        // Create debris when aircraft collides
                        for (let k = 0; k < 30; k++) {
                            this.debris.push(new Debris(this.asteroids[i].pos.copy(), p5.Vector.random2D().mult(random(1, 3)))); // Generate debris
                        }

                        if (this.stats.health <= 0) {
                            this.gameOver = true;
                            this.stats.gameOverTime = millis() - this.stats.startTime;
                            noLoop();
                            return;
                        }

                        let newAsteroids = this.asteroids[i].breakup();
                        this.asteroids.splice(i, 1, ...newAsteroids);  // Split asteroid into smaller ones
                    }
                });
            }

            if (this.asteroids[i]) {
                this.asteroids[i].update();
                this.asteroids[i].render();
                this.asteroids[i].edges();
            }
        }
    }

    handleDebris() {
        this.debris.forEach(deb => {
            deb.update();
            deb.render();
            if (deb.isDead()) {
                this.debris.splice(this.debris.indexOf(deb), 1);
            }
        });
    }

    handleStats() {
        this.stats.update(this.stats.score, this.stats.health);
        this.stats.render();
    }

    update() {
        if (this.gameOver) {
            this.stats.render();
            return;
        }

        // Spawn new asteroids over time
        this.spawnAsteroids();

        // Handle lasers
        this.handleLasers();

        // Handle asteroids
        this.handleAsteroids();

        // Render & update lasers
        this.renderLasers();

        // Render & update stats
        this.handleStats();

        // Handle debris
        this.handleDebris();

        // Render & update all aircraft
        this.renderAirCrafts();
        this.boostAirCrafts();
    }
}
