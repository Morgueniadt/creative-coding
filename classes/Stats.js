class Stats {
  constructor() {
    this.score = 0;
    this.health = 100;
    this.startTime = millis();  // Initialize startTime to the current time
    this.survivalTime = 0;  // Initialize survivalTime
    this.transparency = 0;  // Initialize transparency for fade effect
    this.fade = false; // Whether fade effect is on or off https://editor.p5js.org/xinxin/sketches/dqotLWlKU fade tutorial
  }

  // Update method to track score, health, and survival time
  update(score, health) {
    this.score = score;
    this.health = health;
    this.survivalTime = Math.floor((millis() - this.startTime) / 1000); // Calculate survival time in seconds
  }

  // Render method to display stats
  render() {
    fill(255);
    textSize(24);
    text("Score: " + this.score, 20, 30);
    text("Health: " + this.health, 20, 60);
    text("Survival Time: " + this.survivalTime + "s", 20, 90);
    fill(255, this.transparency)
    text("Hold F for rapid fire", 20, 120);
    text("Press space for single fire", 20, 150);
    text("Arrow keys move the ship, good luck", 20, 180);

    // Fade effect every 10 seconds
    let currentSeconds = Math.floor(millis() / 10000);  // Get the current second
    if (currentSeconds % 10 === 0) {
      this.fade = true;
    } else {
      this.fade = false;
    }

    // Fade logic: increase transparency if fade is true, decrease if fade is false
    if (this.fade) {
      if (this.transparency < 255) {
        this.transparency += 3;  // Increase transparency
      }
    } else {
      if (this.transparency > 0) {
        this.transparency -= 3;  // Decrease transparency
      }
    }

    // Game over screen if health reaches 0
    if (this.health <= 0) {
      textSize(48);
      textAlign(CENTER, CENTER);
      fill(255, 0, 0);  // Red color for game over
      text("GAME OVER", width / 2, height / 2);
      textSize(24);
      text("Score: " + this.score, width / 2, height / 2 + 30);
      text("Survival Time: " + this.survivalTime + "s", width / 2, height / 2 + 60);
      text("Press ENTER to Restart", width / 2, height / 2 + 90);
    }
  }

  // Reset method to restart the game and reset the time
  reset() {
    this.startTime = millis();  // Reset the startTime to current time
    this.survivalTime = 0;  // Reset survival time to 0
    this.health = 100;  // Reset health to 100
    this.score = 0;  // Reset score to 0
    this.transparency = 0;  // Reset transparency
    this.fade = false;  // Reset fade effect
  }
}
