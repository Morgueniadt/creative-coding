class Debris {
  constructor(position, velocity) {
    this.pos = position.copy();
    this.vel = velocity;
    this.lifetime = 255;
    this.particles = []; // Create particles on breakup
    this.createParticles(); // Create particles immediately
  }

  update() {
    this.pos.add(this.vel);
    this.lifetime -= 2;

    // Update particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update();
      if (this.particles[i].isFinished()) {
        this.particles.splice(i, 1);
      }
    }
  }

  render() {
    fill(255, this.lifetime);
    noStroke();
    ellipse(this.pos.x, this.pos.y, 5, 5);

    // Render particles
    for (let particle of this.particles) {
      particle.render();
    }
  }

  isDead() {
    return this.lifetime <= 0;
  }

  // Create particles when debris is created
  createParticles() {
    for (let i = 0; i < 20; i++) {
      this.particles.push(new Particle(this.pos.copy(), false));
    }
  }
}
