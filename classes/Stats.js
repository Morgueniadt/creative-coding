class Stats {
  constructor() {
    this.score = 0;
    this.health = 100;
    this.startTime = 0;
    this.survivalTime = 0;  // Initialize survivalTime
  }

  // Update method to track time survived
  update(score, health ) {	
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

    if (this.health <= 0) {
      textSize(48);
      textAlign(CENTER, CENTER);
      fill(255,0,0)
      text("GAME OVER", width / 2, height / 2);
      textSize(24);
      text("Score: " + this.score, width / 2, height / 2 + 30);
      text("Survival Time: " + this.survivalTime + "s", width / 2, height / 2 + 60);
      text("Press ENTER to Restart", width / 2, height / 2 + 90);
      
    }
  }
}
