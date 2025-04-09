class Stats {
<<<<<<< HEAD
  constructor(obj = {}) {
    this.score = obj.score || 0; // Set score to obj.score or default to 0
    this.health = obj.health || 100; // Set health to obj.health or default to 100
    this.startTime = obj.startTime || millis(); // Initialize startTime to current time or use obj.startTime
    this.survivalTime = obj.survivalTime || 0; // Initialize survivalTime to 0 if not provided
    this.transparency = obj.transparency || 0; // Initialize transparency for fade effect
    this.fade = obj.fade || false; // Whether fade effect is on or off
=======
  constructor(obj) {
    this.score = obj.score ?? 0;
    this.health = obj.health ?? 100;
    this.startTime = millis();  // Ini tialize startTime to the current time
    this.survivalTime = 0;  // Initialize survivalTime
    this.transparency = 0;  // Initialize transparency for fade effect
    this.fade = false; // Whether fade effect is on or off https://editor.p5js.org/xinxin/sketches/dqotLWlKU fade tutorial
>>>>>>> 25e849f1708d516d04ec22b60d879c4755065568
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
<<<<<<< HEAD
    
    // Render the extra instructions with fading transparency
    fill(255, this.transparency);
=======
    fill(255, this.transparency)
>>>>>>> 25e849f1708d516d04ec22b60d879c4755065568
    text("Hold F for rapid fire", 20, 120);
    text("Press space for single fire", 20, 150);
    text("Arrow keys move the ship, good luck", 20, 180);

    // Fade effect every 10 seconds
<<<<<<< HEAD
    let currentSeconds = Math.floor(millis() / 10000); // Get the current second
=======
    let currentSeconds = Math.floor(millis() / 10000);  // Get the current second
>>>>>>> 25e849f1708d516d04ec22b60d879c4755065568
    if (currentSeconds % 10 === 0) {
      this.fade = true;
    } else {
      this.fade = false;
    }

    // Fade logic: increase transparency if fade is true, decrease if fade is false
    if (this.fade) {
      if (this.transparency < 255) {
<<<<<<< HEAD
        this.transparency += 3; // Increase transparency
      }
    } else {
      if (this.transparency > 0) {
        this.transparency -= 3; // Decrease transparency
=======
        this.transparency += 3;  // Increase transparency
      }
    } else {
      if (this.transparency > 0) {
        this.transparency -= 3;  // Decrease transparency
>>>>>>> 25e849f1708d516d04ec22b60d879c4755065568
      }
    }

    // Game over screen if health reaches 0
    if (this.health <= 0) {
      textSize(48);
      textAlign(CENTER, CENTER);
<<<<<<< HEAD
      fill(255, 0, 0); // Red color for game over
=======
      fill(255, 0, 0);  // Red color for game over
>>>>>>> 25e849f1708d516d04ec22b60d879c4755065568
      text("GAME OVER", width / 2, height / 2);
      textSize(24);
      text("Score: " + this.score, width / 2, height / 2 + 30);
      text("Survival Time: " + this.survivalTime + "s", width / 2, height / 2 + 60);
      text("Press ENTER to Restart", width / 2, height / 2 + 90);
    }
  }

  // Reset method to restart the game and reset the time
  reset() {
<<<<<<< HEAD
    this.startTime = millis(); // Reset the startTime to current time
    this.survivalTime = 0; // Reset survival time to 0
    this.health = 100; // Reset health to 100
    this.score = 0; // Reset score to 0
    this.transparency = 0; // Reset transparency
    this.fade = false; // Reset fade effect
=======
    this.startTime = millis();  // Reset the startTime to current time
    this.survivalTime = 0;  // Reset survival time to 0
    this.health = 100;  // Reset health to 100
    this.score = 0;  // Reset score to 0
    this.transparency = 0;  // Reset transparency
    this.fade = false;  // Reset fade effect
>>>>>>> 25e849f1708d516d04ec22b60d879c4755065568
  }
}
