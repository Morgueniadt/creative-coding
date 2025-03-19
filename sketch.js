let airFields = [];
let currentAirCraft = 0

function setup () {
    createCanvas(1000,1000);
    angleMode(DEGREES)

    airFields.push(new Airfield({
        numAirCraft: 10,
        airFieldWidth: 1000,
        airFieldHeight: 1000,
        airFieldPosX: 0,
        airFieldPosY: 0
        
        
    }));


}
function draw() {
    background(100,225,100);
    for(let i = 0; i < airFields.length; i++) {
    airFields[i].renderAirfield();
    airFields[i].renderAirCraft();
    airFields[i].moveAirCraft();
    airFields[i].checkDist();
    }
    if (keyIsDown(65)){
        airFields[0].airCrafts[0].turnLeft()
    }
    if (keyIsDown(68)) {
        airFields[0].airCrafts[0].turnRight()
    }
    if (keyIsDown(87)) {
        airFields[0].airCrafts[0].increaseSpeed()
    }
    if (keyIsDown(83)) {
        airFields[0].airCrafts[0].decreaseSpeed()
    }


}

// function keyPressed() {

//     if (key === "A") {
//         airFields[0].airCrafts[0].turnLeft()
//     }
//     if (key === "D") {
//         airFields[0].airCrafts[0].turnRight()
//     }
//     if (key === "W") {
//         airFields[0].airCrafts[0].increaseSpeed()
//     }
//     if (key === "S") {
//         airFields[0].airCrafts[0].decreaseSpeed()
//     }




// }