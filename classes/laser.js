// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/hacZU523FyM

class Laser {
  constructor(spos, angle) {
    this.pos = createVector(spos.x, spos.y);
    this.vel = p5.Vector.fromAngle(angle);
    this.vel.mult(30);
    
  }

  update() {
    this.pos.add(this.vel);
  }

  render() {
    push();
    stroke(255);
    strokeWeight(4);
    point(this.pos.x, this.pos.y);
    pop();
  }

  // Check if laser hits asteroid
  hits(asteroid) {
    let d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    return d < asteroid.r * 1.5;
  }

  // Check if laser hits debris
  hitsDebris(debris) {
    let d = dist(this.pos.x,debris.pos.x, this.pos.y,  debris.pos.y);
    return d < debris.r *1.5; // Assuming debris is small, adjust if needed
  }

  offscreen() {
    return (this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0);
  }
}