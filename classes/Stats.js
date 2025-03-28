class Stats {
  constructor() {
    this.score = 0;
    this.health = 100;
    this.gameOverTime = 0;
    this.startTime = 0;
    this.survivalTime = 0;  // Initialize survivalTime
  }

  // Update method to track time survived
  update(score, health) {
    this.score = score;
    this.health = health;
    this.survivalTime = Math.floor((millis() - this.startTime) / 1000); // Update survival time in seconds
  }

  // Render method to display stats
  render() {
    fill(255);
    textSize(24);
    text("Score: " + this.score, 20, 30);
    text("Health: " + this.health, 20, 60);
    
    // Render survival time
    text("Survival Time: " + this.survivalTime + "s", 20, 90);

    if (this.health <= 0) {
      textSize(48);
      textAlign(CENTER, CENTER);
      text("GAME OVER", width / 2, height / 2);
      textSize(24);
      text("Press ENTER to Restart", width / 2, height / 2 + 40);
    }
  }
}
