class Laser {
    constructor(x, y, angle) {
        this.pos = createVector(x, y);
        this.vel = createVector(5 * cos(angle), 5 * sin(angle)); // Adjust speed if needed
        this.size = 10;
    }

    move() {
        this.pos.add(this.vel);
    }

    render() {
        push();
        translate(this.pos.x, this.pos.y);
        fill(255, 0, 0);
        noStroke();
        ellipse(0, 0, this.size);
        pop();
    }
}
