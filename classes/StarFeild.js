class Starfield {
    constructor(obj) {
        this.starFieldWidth = obj.starFieldWidth ?? windowWidth;
        this.starFieldHeight = obj.starFieldHeight ?? windowHeight;
        this.starFieldPosX = obj.starFieldPosX ?? windowWidth / 2;
        this.starFieldPosY = obj.starFieldPosY ?? windowHeight / 2;
        this.airCrafts = [];
        this.lasers = [];
        this.debris = [];
        this.healthPacks = [];
        this.asteroids = [];
        this.stats = new Stats();
        this.gameOver = false;
        this.asteroidSpawnRate = 10000;
        this.lastAsteroidTime = 0;
        this.maxAsteroids = 5;
        this.asteroidGenerationPaused = false;
        this.lastAsteroidTime = 0;
    }

    setup() {
        this.startGame();
    }

    startGame() {
        this.aircraft = new AirCraft(); // Reset aircraft
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
    }

    renderAirfield() {
        push();
        translate(this.starFieldPosX, this.starFieldPosY);
        fill(100);
        rect(0, 0, this.starFieldWidth, this.starFieldHeight);
        pop();
    }

    renderAirCraft() {
        push();
        translate(this.starFieldPosX, this.starFieldPosY);
        fill(0, 255, 255);
        this.airCrafts.forEach((airCraft, id) => {
            airCraft.renderAirCraft(id);
        });
        pop();
    }

    moveAirCraft() {
        this.airCrafts.forEach(airCraft => {
            this.checkLimit(airCraft);
            airCraft.move();
        });
    }

   

    checkDist() {
        this.airCrafts.forEach(airCraft => airCraft.alert = 0);
        let alertTriggered = false;

        for (let i = 0; i < this.airCrafts.length; i++) {
            for (let j = i + 1; j < this.airCrafts.length; j++) {
                let AirCraftA = this.airCrafts[i];
                let AirCraftB = this.airCrafts[j];
                let dist = sqrt((sq(AirCraftA.pos.x - AirCraftB.pos.x)) + (sq(AirCraftA.pos.y - AirCraftB.pos.y)));

                if (dist < 50) {
                    AirCraftA.alert = 1;
                    AirCraftB.alert = 1;
                    alertTriggered = true;
                }
            }
        }

        if (alertTriggered) {
            this.alertCount++;
        }
    }

    checkLimit(airCraft) {
        if (airCraft.pos.x > this.starFieldWidth) {
            airCraft.pos.x = 0;
        } else if (airCraft.pos.x < 0) {
            airCraft.pos.x = this.starFieldWidth;
        }

        if (airCraft.pos.y > this.starFieldHeight) {
            airCraft.pos.y = 0;
        } else if (airCraft.pos.y < 0) {
            airCraft.pos.y = this.starFieldHeight;
        }
    }

    createLaser(airCraft) {
        let laser = new Laser({
            posx: airCraft.pos.x,
            posy: airCraft.pos.y,
            angle: airCraft.angle
        });
        this.lasers.push(laser);
    }

    renderLasers() {
        for (let i = this.lasers.length - 1; i >= 0; i--) {
            let laser = this.lasers[i];
            laser.move();
            laser.render();

            for (let j = this.airCrafts.length - 1; j >= 0; j--) {
                let aircraft = this.airCrafts[j];
                let dist = sqrt(sq(laser.pos.x - aircraft.pos.x) + sq(laser.pos.y - aircraft.pos.y));

                if (dist < aircraft.size / 2) {
                    if (aircraft instanceof Asteroid) {
                        aircraft.breakApart();
                        this.score++;
                    }

                    this.airCrafts.splice(j, 1);
                    this.lasers.splice(i, 1);
                    break;
                }
            }
        }
    }

    update() {
        if (this.gameOver) {
            this.stats.render();
            return;
        }

        // Spawn new asteroids over time (capped at maxAsteroids)
        if (millis() - this.lastAsteroidTime > this.asteroidSpawnRate && this.asteroids.length < this.maxAsteroids) {
            this.asteroids.push(new Asteroid());
            this.lastAsteroidTime = millis(); // Reset spawn timer
        }

        // Loop through asteroids
        for (let i = this.asteroids.length - 1; i >= 0; i--) {
            if (this.aircraft.hits(this.asteroids[i])) {
                this.stats.health -= 10;

                // Create debris when aircraft collides
                for (let k = 0; k < 30; k++) {
                    this.debris.push(new Debris(this.asteroids[i].pos.copy(), p5.Vector.random2D().mult(random(1, 3)))); // Generate debris
                }

                if (this.stats.health <= 0) {
                    this.gameOver = true;
                    this.stats.gameOverTime = millis() - this.stats.startTime;
                    noLoop();
                    break;
                }

                let newAsteroids = this.asteroids[i].breakup();
                this.asteroids.splice(i, 1, ...newAsteroids);   //splice removes one element from the array of asteroids and then the spread operatoris then used in the new array called newAsteroids which then handle the array of smaller asteroids and then brings them into the array of asteroids so they then follow the logic of asteroids
            }

            if (this.asteroids[i]) {
                this.asteroids[i].update();
                this.asteroids[i].render();
                this.asteroids[i].edges();
            }
        }

        // Render & update lasers
        this.renderLasers();

        // Render & update stats
        this.stats.update(this.stats.score, this.stats.health, this.megaLaser);
        this.stats.render();

        // Render & update debris
        this.debris.forEach(deb => {
            deb.update();
            deb.render();
            if (deb.isDead()) {
                this.debris.splice(this.debris.indexOf(deb), 1);
            }
        });

        // Render & update aircraft
        this.aircraft.render();
        this.aircraft.turn();
        this.aircraft.update();
        this.aircraft.edges();
    }
}