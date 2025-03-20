class AirCraft {
    constructor(obj) {
        this.pos = createVector(obj.posx ?? random(0, 500), obj.posy ?? random(0, 500));
        this.apHeight = obj.apHeight ?? 15;
        this.apWidth = obj.apWidth ?? 20;
        this.alert = 1;
        this.speed = obj.speed ?? random(0.2, 2);
        this.angle = obj.angle ?? random(0, 360);
        this.vel = createVector(this.speed * cos(this.angle), this.speed * sin(this.angle));
    }

    renderAirCraft(id) {
        push();
        translate(this.pos.x, this.pos.y);
        textSize(15);
        text(id, 20, -5);
        rotate(this.angle);
        noFill();
        stroke(255);
        beginShape();
        vertex(0, -this.apHeight / 2);
        vertex(-this.apWidth / 2, this.apHeight / 2);
        vertex(this.apWidth / 2, this.apHeight / 2);
        endShape(CLOSE);

        if (this.alert === 1) {
            noFill();
            stroke(255, 0, 0);
            strokeWeight(2);
            ellipse(0, 0, this.apHeight * 2);
        }
        pop();
    }

    move() {
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }

    updateVel() {
        this.vel.x = this.speed * cos(this.angle);
        this.vel.y = this.speed * sin(this.angle);
    }

    increaseSpeed() {
        this.speed += 0.3;
        this.updateVel();
    }

    decreaseSpeed() {
        this.speed -= 0.3;
        this.updateVel();
        if (this.speed < 0.2) this.speed = 0;
    }

    turnLeft() {
        this.angle -= 2;
        this.updateVel();
    }

    turnRight() {
        this.angle += 2;
        this.updateVel();
    }
}