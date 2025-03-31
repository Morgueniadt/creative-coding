class Asteroid {
  constructor(pos, r) {
    if (pos) {
      this.pos = pos.copy();
    } else {
      this.pos = createVector(random(width), random(height));
    }

    if (r) {
      this.r = r * 0.5;
    } else {
      this.r = random(15, 50);
    }

    this.vel = p5.Vector.random2D();
    this.total = floor(random(5, 15));
    this.offset = [];

    for (let i = 0; i < this.total; i++) {
      this.offset[i] = random(-this.r * 0.5, this.r * 0.5);
    }

    this.particles = [];
  }

  update() {
    this.pos.add(this.vel);

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
  
    // Add health pack drop
    if (random(1) < 0.1) { // 10% chance to drop a health pack
      healthPacks.push(new HealthPack(this.pos, this.r, this.vel)); // Pass velocity along with position and size
    }
  
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
