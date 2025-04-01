class AirCraft {
  constructor() {
    this.pos = createVector(width / 2, height / 2);
    this.r = 20;
    this.heading = 0;
    this.rotation = 0;
    this.vel = createVector(0, 0);
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
      this.flashRed = true; // Start flashing red when hit

      // Add explosion debris when aircraft is hit
      for (let i = 0; i < 30; i++) {
        debris.push(
          new Debris(this.pos.copy(), p5.Vector.random2D().mult(random(1, 3)))
        );
      }

      return true;
    }

    return false;
  }

  render() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading + PI / 2);

    if (this.flashRed) {
      fill(255, 0, 0);  // Red flashing effect
      stroke(255);
    } else {
      fill(0);
      stroke(255);
    }

    // Draw the aircraft as a triangle
    triangle(-this.r, this.r, this.r, this.r, 0, -this.r);

    // Draw red line at the bottom if boosting
    if (this.isBoosting) {
      stroke(255, 0, 0);  // Red color for the line
      line(-this.r, this.r, this.r, this.r);  // Line at the bottom of the triangle
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