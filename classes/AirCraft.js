class AirCraft {
  constructor(obj) {
    this.pos = createVector(obj?.posx || width / 2, obj?.posy || height / 2);    this.r = 20;
    this.r = obj?.size || 20;
    this.heading = 0;
    this.rotation = 0;
    this.vel = createVector(0, 0);
    this.isBoosting = false;
    this.flashRed = false;  // New variable to handle flash effect
    this.flashTimer = 0;  // Timer to control flashing
  }

  boosting(b) {
    this.isBoosting = b;
  }

  update() {
    if (this.isBoosting) {
      this.boost();
    }
    this.pos.add(this.vel);
    this.vel.mult(0.99);
    
    // Handle flashing red effect when hitting an asteroid
    if (this.flashRed) {
      this.flashTimer++;
      if (this.flashTimer > 10) {
        this.flashRed = false;  // Stop flashing after a short time
        this.flashTimer = 0;
      }
    }
  }

  boost() {
    let force = p5.Vector.fromAngle(this.heading);
    force.mult(0.1);
    this.vel.add(force);
  }
  fireLaser() {
    let laser = new Laser(this.pos, this.heading); // Assuming laser fires in the direction the aircraft is heading
    airfield.lasers.push(laser); // Push the laser into the airfield's lasers array
}
  hits(asteroid) {
    let d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    if (d < this.r + asteroid.r) {
      this.flashRed = true; // Start flashing red when hit
    
      
    
      return true;
    }
    
    return false;
  }

  render() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.heading + PI / 2);

    // If flashing red, set the color to red
    if (this.flashRed) {
      fill(0);
      stroke(255 ,0 ,0);
    } else {
      fill(0);
      stroke(255);
    }
    
    // Draw the aircraft as a triangle
    triangle(-this.r, this.r, this.r, this.r, 0, -this.r);

    // Draw red line at the bottom if boosting
    if (this.isBoosting) {
      stroke(255, 0, 0);  // Red color for the line
      line(-this.r, this.r*1.5, this.r, this.r*1.5);  // Line at the bottom of the triangle
    }
    pop();
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

  setRotation(a) {
    this.rotation = a;
  }

  turn() {
    this.heading += this.rotation;
  }
}