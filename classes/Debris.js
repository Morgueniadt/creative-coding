class Debris extends Asteroid {
  constructor(position, velocity) {
    super(position);  // Inherit from Asteroid class
    this.vel = velocity; // Set custom velocity for debris
    this.lifetime = 255;  // Set a lifetime for the debris
    this.splitCount = 0;  // Debris shouldn't split again, so we track this
    this.particles = [];  // Create particles on breakup
    this.createParticles();  // Create particles immediately
  }

  update() {
    this.pos.add(this.vel);
    this.lifetime -= 2;

    // Update particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update();
      if (this.particles[i].isFinished()) { 
        this.particles.splice(i, 1);  // Remove finished particles
      }
    }
  }

  render() {
    fill(255, this.lifetime);  // Set fill color with fading lifetime
    noStroke();
    ellipse(this.pos.x, this.pos.y, 5, 5); // Small debris pieces

    // Render particles
    for (let particle of this.particles) {
      particle.render();
    }
  }

  isDead() {
    return this.lifetime <= 0;  // Check if the debris is no longer alive
  }

  // Create particles when debris is created
  createParticles() {
    for (let i = 0; i < 20; i++) {
      this.particles.push(new Particle(this.pos.copy(), false)); // Particle generation
    }
  }
}
