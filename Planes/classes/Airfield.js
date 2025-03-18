class Airfield {
    constructor(obj) {
        this.numPlanes = obj.numPlanes ?? 10;
        this.airFieldWidth = obj.airFieldWidth ?? 500;
        this.airFieldHeight = obj.airFieldHeight ?? 500;
        this.airFieldPosX =  obj.airFieldPosX ?? 250;
        this.airFieldPosY = obj.airFieldPosY ?? 250;
        this.planes = [];
        this.generatePlanes();
        
    }
    
    renderAirfield() {
        push();
        translate(this.airFieldPosX, this.airFieldPosY);
        fill(100);
        rect(0,0,this.airFieldWidth, this.airFieldHeight)
        pop()
    }

    renderPlanes() {
        push();
        translate(this.airFieldPosX, this.airFieldPosY);
        fill(0,255,255)
        this.planes.forEach((plane,id) => {
            plane.renderPlane(id);
        })
        pop();
    }

    checkPos() {
        if (this.posX > this.airFieldWidth/2) {plane.posX = -this.airFieldWidth/2, plane.posY = map(plane.posY, 0 ,this.airFieldWidth,this.airFieldWidth,0)}
        else if (plane.posX < -this.airFieldWidth/2) {plane.posX = this.airFieldWidth, plane.posY  = map(plane.posY,0,this.airFieldWidth,this.airFieldWidth,0)}
    }

    movePlanes() {
        this.planes.forEach(plane => {
            this.checkLimit(plane);
            plane.move();
            //plane.checkPos();
        });
    }

    generatePlanes() {
        for(let i = 0; i < this.numPlanes; i++) {
            this.planes.push(new Plane({
            posX: random(0, this.airFieldWidth),
            posY: random(0, this.airFieldHeight)
        }));
        }
    }
    
    checkDist() {
        this.planes.forEach(plane => plane.alert = 0)
        this.count = 0
        for( let i = 0; i < this.planes.length; i++) {
            for( let j = i+1; j < this.planes.length; j++) {
                let planeA = this.planes[i];
                let planeB = this.planes[j];
                let dist = sqrt((sq(planeA.posX - planeB.posX)) + (sq(planeA.posY - planeB.posY)));
                if (dist < 50) {
                    planeA.alert = 1;
                    planeB.alert = 1;
                }
                //console.log(dist);
                this.count++
            }
        }
        //console.log(this.count)
        
    }

    checkLimit(plane) {
        if (plane.posX > this.airFieldWidth) {
            plane.posX = 0;
            plane.posY = map(plane.posY, 0, this.airFieldHeight, this.airFieldHeight, 0)
        } else if (plane.posX < 0) {
            plane.posX = this.airFieldWidth
            plane.posY = map(plane.posY, 0, this.airFieldHeight, this.airFieldHeight, 0)
        }

        if (plane.posY > this.airFieldHeight) {
            plane.posY = 0;
            plane.posX = map(plane.posX, 0, this.airFieldWidth, this.airFieldWidth, 0)
        } else if (plane.posY < 0) {
            plane.posY = this.airFieldHeight
            plane.posX = map(plane.posX, 0, this.airFieldWidth, this.airFieldWidth, 0)
        }
    }
}

// function keyPressed() {
// airFields[0].planes[key].velX *= 0.5;
// console.log("Changed Velx of plane " + key)
// }