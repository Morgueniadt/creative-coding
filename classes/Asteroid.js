class Asteroid {
  constructor(pos, r) {
    if (pos) {
      this.pos = pos.copy();
    } else {
      // Generate asteroid at random edge of the screen
      let edge = floor(random(4)); // 0 = top, 1 = right, 2 = bottom, 3 = left
      if (edge === 0) {
        // Top edge
        this.pos = createVector(random(width), 0);
      } else if (edge === 1) {
        // Right edge
        this.pos = createVector(width, random(height));
      } else if (edge === 2) {
        // Bottom edge
        this.pos = createVector(random(width), height);
      } else {
        // Left edge
        this.pos = createVector(0, random(height));
      }
    }

    // Set the radius of the asteroid
    if (r) {
      this.r = r * 0.5;
    } else {
      this.r = random(15, 50);
    }

    // Random velocity
    this.vel = p5.Vector.random2D();
    this.total = floor(random(5, 15));
    this.offset = [];

    // Generate offsets for asteroid shape
    for (let i = 0; i < this.total; i++) {
      this.offset[i] = random(-this.r * 0.5, this.r * 0.5);
    }

    this.particles = [];
  }

  update() {
    this.pos.add(this.vel);

    // Update particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update();
      if (this.particles[i].isFinished()) {
        this.particles.splice(i, 1);
      }
    }
  }

  render() {
    push();
    stroke(255);
    noFill();
    translate(this.pos.x, this.pos.y);

    beginShape();
    for (let i = 0; i < this.total; i++) {
      let angle = map(i, 0, this.total, 0, TWO_PI);
      let r = this.r + this.offset[i];
      let x = r * cos(angle);
      let y = r * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();

    // Render particles
    for (let particle of this.particles) {
      particle.render();
    }
  }

  breakup() {
    let newA = [];
    if (this.r > 10) {
      newA[0] = new Asteroid(this.pos, this.r);
      newA[1] = new Asteroid(this.pos, this.r);
    }
    airfield.generateDebris(this.pos, this.vel);
    for (let i = 0; i < this.total; i++) {
      this.particles.push(new Particle(this.pos.copy(), true));
    }
    return newA;
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
}