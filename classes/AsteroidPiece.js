class AsteroidPiece {
    constructor(obj) {
        this.pos = createVector(obj.posx, obj.posy);
        this.size = obj.size ?? random(10, 20);  // Size of the small piece
        this.speed = obj.speed ?? random(1, 2); // Speed of the small piece
        this.angle = obj.angle ?? random(0, 360); // Random angle for movement
    }

    move() {
        this.pos.x += this.speed * cos(this.angle);
        this.pos.y += this.speed * sin(this.angle);
    }

    render() {
        push();
        translate(this.pos.x, this.pos.y);
        ellipse(0, 0, this.size, this.size);  // Render as a small circle
        pop();
    }
}
