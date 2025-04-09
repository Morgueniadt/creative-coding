//Tutorial used for particles https://youtu.be/QlpadcXok8U
class Particle {
    constructor(pos) {
      this.pos = pos.copy(); // Create a copy of the position so we don't modify the original
      this.vel = p5.Vector.random2D().mult(random(0.1, 2)); // Random velocity vector with magnitude between 1 and 3
      this.lifetime = 10; 
    }
  
    update() {
      this.pos.add(this.vel); // Update position based on velocity vector 
      this.lifetime -= 2;
      console.log(this.lifetime) ;
    }
  
    render() {
      push();
      stroke(255, this.lifetime);  // Set stroke color with alpha value based on lifetime
      point(this.pos.x, this.pos.y); // Draw a point at the particle's position
      pop();   
    }
  
    isFinished() {
      return this.lifetime <= 0; // Return true if lifetime is less than or equal to 0
    }
  }
  