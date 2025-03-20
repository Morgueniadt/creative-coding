class Airfield {
    constructor(obj) {
        this.numAirCraft = obj.numAirCraft ?? 10;
        this.airFieldWidth = obj.airFieldWidth ?? 500;
        this.airFieldHeight = obj.airFieldHeight ?? 500;
        this.airFieldPosX =  obj.airFieldPosX ?? 250;
        this.airFieldPosY = obj.airFieldPosY ?? 250;
        this.airCrafts = [];
        this.generateAirCraft();
        
    }
    
    renderAirfield() {
        push();
        translate(this.airFieldPosX, this.airFieldPosY);
        fill(100);
        rect(0,0,this.airFieldWidth, this.airFieldHeight)
        pop()
    }

    renderAirCraft() {
        push();
        translate(this.airFieldPosX, this.airFieldPosY);
        fill(0,255,255)
        this.airCrafts.forEach((airCraft,id) => {
            airCraft.renderAirCraft(id);
        })
        pop();
    }

    moveAirCraft() {
        this.airCrafts.forEach(airCraft => {
            this.checkLimit(airCraft);
            airCraft.move();
        });
    }

    generateAirCraft() {
        for(let i = 0; i < this.numAirCraft; i++) {
            let gen = random(0,1)
            if (gen < 0.5) {
                 this.airCrafts.push(new AirCraft({
            posx: random(0, this.airFieldWidth),
            posy: random(0, this.airFieldHeight)
        }));
            } else{
                this.airCrafts.push(new Heli({
                    posx: random(0, this.airFieldWidth),
                    posy: random(0, this.airFieldHeight)
                }));
            }
           
        }
    }
    
checkDist() {
    this.airCrafts.forEach(airCraft => airCraft.alert = 0); // Reset alerts before checking

    for (let i = 0; i < this.airCrafts.length; i++) {
        for (let j = i + 1; j < this.airCrafts.length; j++) {
            let AirCraftA = this.airCrafts[i];
            let AirCraftB = this.airCrafts[j];

            // Calculate the Euclidean distance between aircraft
            let distBetween = dist(AirCraftA.pos.x, AirCraftA.pos.y, AirCraftB.pos.x, AirCraftB.pos.y);

            // Collision alert threshold (adjustable)
            let minSafeDist = (AirCraftA.apWidth + AirCraftB.apWidth) / 2 + 10; // Buffer of 10

            if (distBetween < minSafeDist) {
                AirCraftA.alert = 1;
                AirCraftB.alert = 1;
            }
        }
    }
        //console.log(this.count)
        
    }

    checkLimit(airCraft) {
    if (airCraft.pos.x > this.airFieldWidth) {
        airCraft.pos.x = 0;
    } else if (airCraft.pos.x < 0) {
        airCraft.pos.x = this.airFieldWidth;
    }

    if (airCraft.pos.y > this.airFieldHeight) {
        airCraft.pos.y = 0;
    } else if (airCraft.pos.y < 0) {
        airCraft.pos.y = this.airFieldHeight;
    }
}

}
