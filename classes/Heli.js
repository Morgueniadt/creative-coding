class Heli extends AirCraft {
    constructor(obj) {
        super(obj)
        this.height = obj.height ?? random(5,10);
        this.width = obj.width ?? random(5,10);

        this.speed = obj.speed ?? random(0.2,2)


    }
    renderAirCraft(id) {
        push();
        translate(this.pos.x,this.pos.y);
        textSize(15)
        text(id, 20, -5)
        rotate(this.angle)
        rect(0,0,this.width,this.height)

        pop()
    }

}