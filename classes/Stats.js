class Stats {
  constructor() {
    this.health = 100; // Starting health
    this.score = 0;    // The score starts at 0
  }

  // Update method to update stats (could be called during the game loop)
  update(accuracy, score, health) {
    this.score = score;
    this.health = health;
  }

  // Display the stats on the screen
  render() {
    push();
    fill(255);
    textSize(16);
    textAlign(LEFT, TOP);

    // Display health, accuracy, and score
    text("Health: " + this.health, 10, 10);
    text("Score: " + this.score, 10, 50);
    

    pop();
  }
}
