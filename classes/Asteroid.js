class Asteroid {
  constructor(pos, r) {
    if (pos) {
      this.pos = pos.copy();
    } else {
      // Generate asteroid at random edge of the screen
      let edge = floor(random(4)); // 0 = top, 1 = right, 2 = bottom, 3 = left
      if (edge === 0) {
        this.pos = createVector(random(width), 0); // Top edge
      } else if (edge === 1) {
        this.pos = createVector(width, random(height)); // Right edge
      } else if (edge === 2) {
        this.pos = createVector(random(width), height); // Bottom edge
      } else {
        this.pos = createVector(0, random(height)); // Left edge
      }
    }

    // Set the radius of the asteroid
    if (r) {
      this.r = r * 0.5;
    } else {
      this.r = random(15, 50); // Random size of the asteroid
    }

    // Random velocity
    this.vel = p5.Vector.random2D();
    this.total = floor(random(5, 15)); // Number of points to create an irregular shape
    this.offset = [];

    // Generate offsets for asteroid shape (making the asteroid irregular)
    for (let i = 0; i < this.total; i++) {
      this.offset[i] = random(-this.r * 0.5, this.r * 0.5);
    }

    this.particles = []; // Store particles generated when the asteroid breaks up
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
    let newDebris = [];
    if (this.r > 10) {
<<<<<<< HEAD
      newA[0] = new Asteroid({ pos: this.pos, r: this.r });
      newA[1] = new Asteroid({ pos: this.pos, r: this.r });
    }

    // Add explosion particles
=======
      // Create debris (instead of asteroids)
      newDebris.push(new Debris(this.pos, this.vel.copy().mult(0.5))); // Assign some velocity to debris
      newDebris.push(new Debris(this.pos, this.vel.copy().mult(0.5))); // Two pieces of debris
    }

>>>>>>> 25e849f1708d516d04ec22b60d879c4755065568
    for (let i = 0; i < this.total; i++) {
      this.particles.push(new Particle(this.pos.copy(), true)); // Add particle effect
    }
<<<<<<< HEAD

    return newA;
=======
    
    return newDebris; // Return debris instead of asteroids
>>>>>>> 25e849f1708d516d04ec22b60d879c4755065568
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
