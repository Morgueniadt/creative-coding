class HealthPack {
    constructor(pos, asteroidRadius, asteroidVel) {
      this.pos = pos.copy();
      this.size = asteroidRadius / 2; // Health pack is half the size of the asteroid
      this.vel = asteroidVel.copy().mult(0.5); // Move in the same direction as the asteroid (scaled down)
  
      this.collected = false;
    }
  
    update() {
      if (!this.collected) {
        this.pos.add(this.vel); // Move health pack with velocity
      }
    }
  
    render() {
      if (!this.collected) {
        fill(0, 255, 0); // Green color for health pack
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.size, this.size);
      }
    }
  
    checkCollision(ship) {
      let d = dist(this.pos.x, this.pos.y, ship.pos.x, ship.pos.y);
      if (d < this.size + ship.r) {
        this.collected = true; // Health pack is collected
        return true;
      }
      return false;
    }
  }
  