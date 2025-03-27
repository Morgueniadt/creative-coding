class Stats {
  constructor() {
    this.health = 100;
    this.score = 0;
    this.startTime = millis(); // Track start time
    this.gameOverTime = 0;
  }

  update(score, health) {
    this.score = score;
    this.health = health;
  }

  render() {
    push();
    fill(255);
    textSize(20);
    textAlign(LEFT, TOP);
    text(`Health: ${this.health}`, 10, 10);
    text(`Score: ${this.score}`, 10, 30);
    
    if (gameOver) {
      textSize(64);
      fill(255, 0, 0);
      textAlign(CENTER, CENTER);
      text("GAME OVER", width / 2, height / 2 - 50);
      textSize(24);
      text(`Survived: ${((this.gameOverTime || millis()) - this.startTime) / 1000}s`, width / 2, height / 2);
      text("Press ENTER to Try Again", width / 2, height / 2 + 40);
    }
    pop();
  }
}
