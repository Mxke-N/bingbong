class Player {
    constructor(x, y, r, speed) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.speed = speed;
    }

    draw() {
        c.strokeStyle = "blue";
        c.fillStyle = "pink";
        c.lineWidth = 10;

        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, 2*Math.PI);
        c.stroke();
        c.fill();
    }

    move() {
        if (left == true) 
            this.x -= this.speed;
        if (right == true) 
            this.x += this.speed;
        if (up == true) 
            this.y -= this.speed;
        if (down == true) 
            this.y += this.speed;
    }
}