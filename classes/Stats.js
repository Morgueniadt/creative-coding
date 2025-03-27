class Stats {
  constructor() {
    this.health = 100; // Starting health
    this.score = 0;    // The score starts at 0
    this.startTime = millis(); // Track when the game starts
    this.gameOverTime = 0; // Time when the game ends (used to show time survived)
  }

  // Update method to update stats (could be called during the game loop)
  update(score, health) {
    this.score = score;
    this.health = health;

    // If health reaches 0, we set the time when the game ends
    if (this.health <= 0) {
      this.gameOverTime = millis() - this.startTime; // Time survived
    }
  }

  // Display the stats on the screen
  render() {
    push();
    fill(255);
    textSize(16);
    textAlign(LEFT, TOP);

    // Display health, score, and the time survived
    text("Health: " + this.health, 10, 10);
    text("Score: " + this.score, 10, 50);

    // Show time survived if the game is not over
    if (this.gameOverTime === 0) {
      let timeSurvived = millis() - this.startTime;
      let seconds = Math.floor(timeSurvived / 1000);
      text("Time: " + seconds + "s", 10, 90);
    }

    // If game over, display the Game Over message and time survived
    if (this.gameOverTime > 0) {
      this.displayGameOver();
    }

    pop();
  }

  // Function to display the Game Over message and time survived
  displayGameOver() {
    push();
    fill(255, 0, 0); // Red color for Game Over text
    textSize(48);
    textAlign(CENTER, CENTER);
    text("GAME OVER", width / 2, height / 2 - 50);
    textSize(24);
    text("Time Survived: " + Math.floor(this.gameOverTime / 1000) + " seconds", width / 2, height / 2);
    text("Press ENTER to Try Again", width / 2, height / 2 + 50);
    pop();
  }
}
