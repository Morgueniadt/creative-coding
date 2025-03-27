class Particle {
    constructor(pos) {
      this.pos = pos.copy();
      this.vel = p5.Vector.random2D().mult(random(1, 3));
      this.lifetime = 255;
    }
  
    update() {
      this.pos.add(this.vel);
      this.lifetime -= 5;
    }
  
    render() {
      push();
      stroke(255, this.lifetime);
      point(this.pos.x, this.pos.y);
      pop();
    }
  
    isFinished() {
      return this.lifetime <= 0;
    }
  }
  