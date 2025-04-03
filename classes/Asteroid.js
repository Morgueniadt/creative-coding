class Asteroid {
  constructor(obj = {}) {
    // Default properties if not provided in obj
    this.pos = obj.pos || createVector(random(width), random(height));  // Position of the asteroid
    this.r = obj.r || random(15, 50);  // Radius of the asteroid
    this.vel = obj.vel || p5.Vector.random2D();  // Velocity of the asteroid
    this.total = obj.total || floor(random(5, 15));  // Number of points to make asteroid shape
    this.offset = [];  // Array for shape variation

    // Generate offsets for asteroid shape
    for (let i = 0; i < this.total; i++) {
      this.offset[i] = random(-this.r * 0.5, this.r * 0.5);
    }

    this.particles = [];  // Particles for explosion
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
      newA[0] = new Asteroid({ pos: this.pos, r: this.r });
      newA[1] = new Asteroid({ pos: this.pos, r: this.r });
    }

    // Add explosion particles
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
