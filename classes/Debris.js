class Debris {
    constructor(position, velocity) {
      this.pos = position.copy();
      this.vel = velocity;
      this.lifetime = 255; // Lifetime of the debris (fade away over time)
    }
  
    update() {
      this.pos.add(this.vel); // Move debris
      this.lifetime -= 2; // Decrease lifetime
    }
  
    render() {
      fill(255, this.lifetime); // Make debris fade away
      noStroke();
      ellipse(this.pos.x, this.pos.y, 5, 5); // Render as small circles
    }
  
    isDead() {
      return this.lifetime <= 0; // Debris is dead when its lifetime is 0
    }
  }
  