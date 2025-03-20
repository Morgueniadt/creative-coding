let airFields = [];
let currentAirCraft = 0;

function setup() {
    createCanvas(1000, 1000);
    angleMode(DEGREES);

    airFields.push(new Airfield({
        numAirCraft: 10,
        airFieldWidth: 1000,
        airFieldHeight: 1000,
        airFieldPosX: 0,
        airFieldPosY: 0
    }));
}

function draw() {
    background(100, 225, 100);

    // Loop through all airfields and render them
    for (let i = 0; i < airFields.length; i++) {
        airFields[i].renderAirfield();
        airFields[i].renderAirCraft();
        airFields[i].moveAirCraft();
        airFields[i].checkDist();
        airFields[i].renderLasers();

        // Check for laser collisions with asteroids
        for (let laser of airFields[i].lasers) {
            for (let asteroid of airFields[i].airCrafts) {
                if (asteroid instanceof Asteroid && asteroid.checkCollision(laser)) {
                    // Handle the laser-asteroid collision (like destroy asteroid)
                    asteroid.breakApart();  // Split asteroid into smaller pieces or remove it
                    // You might want to remove the laser after it hits an asteroid
                    let laserIndex = airFields[i].lasers.indexOf(laser);
                    if (laserIndex > -1) {
                        airFields[i].lasers.splice(laserIndex, 1);
                    }
                }
            }
        }

        // Display Lives and Alert Count in the top left corner
        displayStats();
    }

    // Handle user input for controlling the aircraft
    if (keyIsDown(65)) { // 'A' key for left turn
        airFields[0].airCrafts[0].turnLeft();
    }
    if (keyIsDown(68)) { // 'D' key for right turn
        airFields[0].airCrafts[0].turnRight();
    }
    if (keyIsDown(87)) { // 'W' key for increase speed
        airFields[0].airCrafts[0].increaseSpeed();
    }
    if (keyIsDown(83)) { // 'S' key for decrease speed
        airFields[0].airCrafts[0].decreaseSpeed();
    }

    // Fire laser when spacebar is pressed
    if (keyIsPressed && key === ' ') {
        airFields[0].airCrafts[0].fireLaser();
    }

    function displayStats() {
        fill(255);
        textSize(18);
        text("Lives: " + airFields[0].lives, 10, 30);
        text("Alert Count: " + airFields[0].alertCount, 10, 60);
    }
    
}
