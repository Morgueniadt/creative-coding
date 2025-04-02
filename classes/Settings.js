class Settings {
    constructor(obj) {
        this.asteroidSpwnRate = obj.asteroidSpwnRate ?? 10000;
        this.maxAsteroids = obj.maxAsteroids ?? 5;
        this.asteroidSpeed = obj.asteroidSpeed ?? 1;
        this.difficulty = obj.difficulty ?? 1; 
        this.health = obj.health ?? 100;
        this.asteroidDmg = obj.asteroidDmg ?? 10;
    }

    // Set up the difficulty slider
    createDifficultySlider() {
        let difficultySlider = createSlider(1, 4, 1, 1); // 1: Easy, 2: Medium, 3: Hard, 4: Hurt Me Plenty
        difficultySlider.position(20, 20); 
        difficultySlider.size(80)
        difficultySlider.input(() => {
            updateDifficultyText(difficultySlider.value());  
          });
          updateDifficultyText(difficultySlider.value());        if (difficultySlider.value() == 1){
            clear()
            text(diffText[0] ,20,40)
          }else if(difficultySlider.value() == 2){
            clear()
             text(diffText[1],20,40)
          }else if(difficultySlider.value() == 3){
            clear()
             text(diffText[2],20,40)
          }else if(difficultySlider.value() == 4){
            clear()
             text(diffText[3],20,40)
          }
    }

    // Update difficulty based on slider value
    setDifficulty(value) {
        
    }

    // Set up the health slider
    createHealthSlider() {
           }

    // Update health based on slider value
    setHealth(value) {
    }

    // Set up the asteroid damage slider
    createAsteroidDamageSlider() {
    }

    // Update asteroid damage based on slider value
    setAsteroidDamage(value) {
    }

    // Set up the asteroid speed slider
    createAsteroidSpeedSlider() {
    }

    // Update asteroid speed based on slider value
    setAsteroidSpeed(value) {
    }

    // Set up the max asteroids slider
    createMaxAsteroidsSlider() {
    }

    // Update max asteroids based on slider value
    setMaxAsteroids(value) {
        this.maxAsteroids = value;
    }

    // Confirm button to save the settings
    createConfirmButton() {
    }
}
