class Plane {
    constructor(obj) {
        this.posX = obj.posX ?? random(0,500);
        this.posY = obj.posY ?? random(0,500);
        this.apHeight = obj.apHeight ?? 15;
        this.apWidth = obj.apWidth ?? 20;
        this.apTail = obj.apTail ?? 4;
        this.alert = 0;

        this.speed = obj.speed ?? random(0.2,2)
        this.angle = obj.angle ?? random(0,360);
        
        this.velX = this.speed * cos(this.angle);
        this.velY = this.speed * sin(this.angle);
        

    }
    renderPlane(id) {
        push();
        translate(this.posX,this.posY);
        textSize(15)
        text(id, 20, -5)
        rotate(this.angle)
        beginShape();
        
            vertex(0,0)
            vertex(-this.apTail, -this.apWidth/2);
            vertex(this.apHeight +this.apTail, 0)
            vertex(-this.apTail, this.apWidth/2);
        endShape(CLOSE);

        if (this.alert === 1) {

        
        noFill();
        stroke(255,0,0)
        strokeWeight(2)
        ellipse(this.apHeight * 0.25,0, this.apHeight * 2)
        
        }
        pop()
    }

    
    move() {
        
        // if(this.posX < 0 ) {this.posX = 500} else if (this.posX > 500) {this.posX = 0}
        // if(this.posY < 0 ) {this.posY = 500} else if (this.posY > 500) {this.posY = this.posY = map(this.posY, 0,500,500,0)}
        this.posX = this.posX + this.velX;
        this.posY = this.posY + this.velY;
    }

    updateVel() {
        this.velX = this.speed * cos(this.angle);
        this.velY = this.speed * sin(this.angle);
    }

    increaseSpeed() {
        this.speed += 0.3;
        this.updateVel();
    }

    decreaseSpeed() {
        this.speed -= 0.3;
        this.updateVel();
    }

    turnLeft() {
        this.angle -= 2;
        this.updateVel();
    }

    turnRight() {
        this.angle += 2;
        this.updateVel();
    }
    
}