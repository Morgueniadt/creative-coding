class Debris {
  constructor(obj = {}) {
    // Default properties if not provided in obj
    this.pos = obj.position || createVector(0, 0);  // Position of debris
    this.vel = obj.velocity || p5.Vector.random2D();  // Velocity of debris
    this.lifetime = obj.lifetime || 255;  // Lifetime of debris
    this.particles = [];  // Array for storing particles created during breakup
    this.createParticles();  // Create particles immediately upon creation
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
    ellipse(this.pos.x, this.pos.y, 5, 5);  // Render the debris

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
      this.particles.push(new Particle(this.pos.copy(), false));
    }
  }
}
