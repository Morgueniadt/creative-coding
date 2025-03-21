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

    for (let i = 0; i < airFields.length; i++) {
        airFields[i].renderAirfield();
        airFields[i].renderAirCraft();
        airFields[i].moveAirCraft();
        airFields[i].checkDist();
        airFields[i].renderLasers();

        for (let laser of airFields[i].lasers) {
            for (let asteroid of airFields[i].airCrafts) {
                if (asteroid instanceof Asteroid && asteroid.checkCollision(laser)) {
                    asteroid.breakApart();
                    let laserIndex = airFields[i].lasers.indexOf(laser);
                    if (laserIndex > -1) {
                        airFields[i].lasers.splice(laserIndex, 1);
                    }
                }
            }
        }

        displayStats();
    }    if (keyIsDown(65)) {
        airFields[0].airCrafts[0].turnLeft();
    }
    if (keyIsDown(68)) {
        airFields[0].airCrafts[0].turnRight();
    }
    if (keyIsDown(87)) {
        airFields[0].airCrafts[0].increaseSpeed();
    }
    if (keyIsDown(83)) {
        airFields[0].airCrafts[0].decreaseSpeed();
    }

}

function displayStats() {
    fill(255);
    textSize(18);
    text("Lives: " + airFields[0].lives, 10, 30);
    text("Alert Count: " + airFields[0].alertCount, 10, 60);
}

function keyPressed() {

    if (keyIsPressed && key === ' ') {
        airFields[0].airCrafts[0].fireLaser();
        console.log("Firing Laser!");
    }
}
