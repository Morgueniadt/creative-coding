class Heli extends AirCraft {
    constructor(obj) {
        super(obj);
        this.height = obj.height ?? random(10, 20);
        this.width = obj.width ?? random(10, 20);
        this.speed = obj.speed ?? random(0.2, 2);

        // Randomly assign a shape type (rect, ellipse, or triangle)
        this.shapeType = obj.shapeType ?? floor(random(3)); // 0 = rect, 1 = ellipse, 2 = triangle
    }

    renderAirCraft(id) {
        push();
        translate(this.pos.x, this.pos.y);
        textSize(15);
        text(id, 20, -5);
        rotate(this.angle);

        // Render different shapes based on shapeType
        switch (this.shapeType) {
            case 0: // Rectangle
                rectMode(CENTER);
                rect(0, 0, this.width, this.height);
                break;
            case 1: // Ellipse
                ellipse(0, 0, this.width, this.height);
                break;
            case 2: // Triangle
                triangle(
                    -this.width / 2, this.height / 2,  // Left corner
                     this.width / 2, this.height / 2,  // Right corner
                     0, -this.height / 2               // Top corner
                );
                break;
        }

        pop();
    }
}
