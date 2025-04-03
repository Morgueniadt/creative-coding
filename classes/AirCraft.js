class AirCraft {
  constructor(obj = {}) {
    this.pos = obj.pos || createVector(width / 2, height / 2);
    this.r = obj.r || 20;
    this.heading = obj.heading || 0;
    this.rotation = obj.rotation || 0;
    this.vel = obj.vel || createVector(0, 0);
    this.isBoosting = false;
    this.flashRed = false;
    this.flashTimer = 0;
  }

  boosting(b) {
    this.isBoosting = b;
  }

  update() {
    if (this.isBoosting) {
      this.boost();
    }
    this.pos.add(this.vel);
    this.vel.mult(0.99);
  }

  boost() {
    let force = p5.Vector.fromAngle(this.heading);
    force.mult(0.1);
    this.vel.add(force);
  }

  hits(asteroid) {
    let d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    if (d < this.r + asteroid.r) {
      this.flashRed = true;

      for (let i = 0; i < 30; i++) {
        debris.push(
          new Debris(this.pos.copy(), p5.Vector.random2D().mult(random(1, 3)))
        );
      }

      return true;
    }
    return false;
  }

  renderAirCraft() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading + PI / 2);

    if (this.flashRed) {
      fill(255, 0, 0);
      stroke(255);
    } else {
      fill(0);
      stroke(255);
    }

    triangle(-this.r, this.r, this.r, this.r, 0, -this.r);

    if (this.isBoosting) {
      stroke(255, 0, 0);
      line(-this.r, this.r, this.r, this.r);
    }
    pop();
  }

  edges() {
    if (this.pos.x > width + this.r) {
      this.pos.x = -this.r;
    } else if (this.pos.x < -this.r) {
      this.pos.x = width + this.r;
    }
    if (this.pos.y > height + this.r) {
      this.pos.y = -this.r;
    } else if (this.pos.y < -this.r) {
      this.pos.y = height + this.r;
    }
  }

  setRotation(a) {
    this.rotation = a;
  }

  turn() {
    this.heading += this.rotation;
  }
}
