// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/hacZU523FyM

class Laser {
  constructor(obj = {}) {
    // Default properties if not provided in obj
    this.pos = obj.spos || createVector(0, 0);  // Starting position of the laser
    this.angle = obj.angle || 0;  // Angle of laser movement
    this.vel = p5.Vector.fromAngle(this.angle);  // Velocity based on angle
    this.vel.mult(30);  // Speed of the laser
  }

  update() {
    this.pos.add(this.vel);  // Update laser position based on its velocity
  }

  render() {
    push();
    stroke(255);  // Set the laser color to white
    strokeWeight(4);  // Set the stroke thickness
    point(this.pos.x, this.pos.y);  // Render the laser as a point
    pop();
  }

  // Check if laser hits asteroid
  hits(asteroid) {
    let d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    return d < asteroid.r;  // Check if distance from laser to asteroid is less than asteroid radius
  }

  // Check if laser hits debris
  hitsDebris(debris) {
    let d = dist(this.pos.x, this.pos.y, debris.pos.x, debris.pos.y);
    return d < 5;  // Check if laser is close enough to debris (small radius, adjust if necessary)
  }

  // Check if the laser is off the screen
  offscreen() {
    return (this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0);
  }
}
