class Settings {
    constructor(obj) {
        this.asteroidSpwnRate = obj.asteroidSpwnRate ?? 10000;
        this.maxAsteroids = obj.maxAsteroids ?? 5;
        this.asteroidSpeed = obj.asteroidSpeed ?? 1;
        this.difficulty = obj.difficulty ?? 'easy'; // Default to easy
        this.health = obj.health ?? 100;
        this.asteroidDmg = obj.asteroidDmg ?? 10;
    }

    // Set up the difficulty slider
    createDifficultySlider() {
        let difficultySlider = createSlider(1, 4, 1); // 1: Easy, 2: Medium, 3: Hard, 4: Hurt Me Plenty
        difficultySlider.position(20, 20);
        difficultySlider.input(() => this.setDifficulty(difficultySlider.value()));
    }

    // Update difficulty based on slider value
    setDifficulty(value) {
        switch (value) {
            case 1: // Easy
                this.difficulty = 'easy';
                this.asteroidSpeed = 1;
                this.asteroidSpwnRate = 10000;
                this.asteroidDmg = 10;
                break;
            case 2: // Medium
                this.difficulty = 'medium';
                this.asteroidSpeed = 2;
                this.asteroidSpwnRate = 8000;
                this.asteroidDmg = 20;
                break;
            case 3: // Hard
                this.difficulty = 'hard';
                this.asteroidSpeed = 3;
                this.asteroidSpwnRate = 6000;
                this.asteroidDmg = 30;
                break;
            case 4: // Hurt Me Plenty
                this.difficulty = 'hurtMePlenty';
                this.asteroidSpeed = 4;
                this.asteroidSpwnRate = 4000;
                this.asteroidDmg = 50;
                break;
        }
    }

    // Set up the health slider
    createHealthSlider() {
        let healthSlider = createSlider(100, 400, this.health); // From 100 to 400 health
        healthSlider.position(20, 60);
        healthSlider.input(() => this.setHealth(healthSlider.value()));
    }

    // Update health based on slider value
    setHealth(value) {
        this.health = value;
    }

    // Set up the asteroid damage slider
    createAsteroidDamageSlider() {
        let dmgSlider = createSlider(10, 100, this.asteroidDmg); // From 10 to 100 damage
        dmgSlider.position(20, 100);
        dmgSlider.input(() => this.setAsteroidDamage(dmgSlider.value()));
    }

    // Update asteroid damage based on slider value
    setAsteroidDamage(value) {
        this.asteroidDmg = value;
    }

    // Set up the asteroid speed slider
    createAsteroidSpeedSlider() {
        let speedSlider = createSlider(1, 4, this.asteroidSpeed); // Speed from 1 to 4
        speedSlider.position(20, 140);
        speedSlider.input(() => this.setAsteroidSpeed(speedSlider.value()));
    }

    // Update asteroid speed based on slider value
    setAsteroidSpeed(value) {
        this.asteroidSpeed = value;
    }

    // Set up the max asteroids slider
    createMaxAsteroidsSlider() {
        let maxAsteroidsSlider = createSlider(1, 10, this.maxAsteroids); // From 1 to 10
        maxAsteroidsSlider.position(20, 180);
        maxAsteroidsSlider.input(() => this.setMaxAsteroids(maxAsteroidsSlider.value()));
    }

    // Update max asteroids based on slider value
    setMaxAsteroids(value) {
        this.maxAsteroids = value;
    }

    // Confirm button to save the settings
    createConfirmButton() {
        let confirmButton = createButton('Confirm Settings');
        confirmButton.position(20, 220);
        confirmButton.mousePressed(() => {
            console.log("Settings confirmed!");
            // Apply settings to the game (pass settings to relevant game classes)
            // For example, update asteroid behavior in the Asteroid class, Stats class, etc.
        });
    }
}
