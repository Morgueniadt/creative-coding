// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/hacZU523FyM


class Asteroid {
  constructor(pos, r) {
    if (pos) {
      this.pos = pos.copy(); // Create a copy of the position so we don't modify the original
    } else {
      this.pos = createVector(random(width), random(height)); // Random position for asteroid 
    }

    if (r) {
      this.r = r * 0.5;
    } else {
      this.r = random(15, 50);
    }

    this.vel = p5.Vector.random2D(); // Random velocity vector for asteroid 
    this.total = floor(random(5, 15)); // Number of vertices for asteroid
    this.offset = []; 

    for (let i = 0; i < this.total; i++) { // Generate random offsets for asteroid vertices 
      this.offset[i] = random(-this.r * 0.5, this.r * 0.5);
    }

    this.particles = []; // Store particles
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

    // Draw asteroid shape
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

    // Generate particles when asteroid breaks
    for (let i = 0; i < 30; i++) {
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

