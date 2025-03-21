class Asteroid extends AirCraft {
    constructor(obj) {
        super(obj);
        this.size = obj.size ?? random(30, 60);  // Initial size of the asteroid
        this.speed = obj.speed ?? random(1, 3); // Speed of asteroid
        this.pieces = [];  // Array to store pieces when asteroid breaks
        this.isDestroyed = false;  // Flag to check if asteroid is destroyed
        this.angle = obj.angle ?? random(0, 360); // Angle of movement
    }

    renderAirCraft(id) {
        if (this.isDestroyed) {
            // If destroyed, render its pieces instead
            this.renderPieces();
            return;
        }

        push();
        translate(this.pos.x, this.pos.y);
        textSize(15);
        text(id, 20, -5);
        rotate(this.angle);

        // Render as a simple ellipse (can change to any shape)
        ellipse(0, 0, this.size, this.size);
        pop();
    }

    renderPieces() {
        // Render the smaller pieces after the asteroid breaks
        for (let i = 0; i < this.pieces.length; i++) {
            let piece = this.pieces[i];
            piece.move();
            piece.render();
        }
    }



    move() {
        if (!this.isDestroyed) {
            this.pos.x += this.speed * cos(this.angle);
            this.pos.y += this.speed * sin(this.angle);
        }
    }

    // Check collision with lasers (or any other object)
    checkCollision(laser) {
        if (dist(this.pos.x, this.pos.y, laser.pos.x, laser.pos.y) < this.size / 2) {
            this.breakApart();
            return true;  // Collision detected
        }
        return false;
    }
}
