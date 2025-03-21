class Airfield {
    constructor(obj) {
        this.numAirCraft = obj.numAirCraft ?? 10;
        this.airFieldWidth = obj.airFieldWidth ?? 500;
        this.airFieldHeight = obj.airFieldHeight ?? 500;
        this.airFieldPosX = obj.airFieldPosX ?? 250;
        this.airFieldPosY = obj.airFieldPosY ?? 250;
        this.airCrafts = [];
        this.lasers = [];
        this.lives = 3;
        this.alertCount = 0;
        this.score = 0;

        this.generateAirCraft();
    }

    renderAirfield() {
        push();
        translate(this.airFieldPosX, this.airFieldPosY);
        fill(100);
        rect(0, 0, this.airFieldWidth, this.airFieldHeight);
        pop();
    }

    renderAirCraft() {
        push();
        translate(this.airFieldPosX, this.airFieldPosY);
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

    generateAsteroids() {
        for (let i = 0; i < this.numAirCraft; i++) {
            this.airCrafts.push(new Asteroid({
                posx: random(0, this.airFieldWidth),
                posy: random(0, this.airFieldHeight),
                size: random(30, 60),
                speed: random(1, 3),
                angle: random(0, 360)
            }));
        }
    }

    generateAirCraft() {
        for (let i = 0; i < this.numAirCraft; i++) {
            this.airCrafts.push(new AirCraft({
                posx: random(0, this.airFieldWidth),
                posy: random(0, this.airFieldHeight),
                size: random(30, 60),
                speed: random(1, 3),
                angle: random(0, 360)
            }));
        }
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
        if (airCraft.pos.x > this.airFieldWidth) {
            airCraft.pos.x = 0;
        } else if (airCraft.pos.x < 0) {
            airCraft.pos.x = this.airFieldWidth;
        }

        if (airCraft.pos.y > this.airFieldHeight) {
            airCraft.pos.y = 0;
        } else if (airCraft.pos.y < 0) {
            airCraft.pos.y = this.airFieldHeight;
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
}
