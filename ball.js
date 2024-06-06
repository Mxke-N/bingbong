class Ball {
    constructor(x, y, r, speed) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.speed = speed;
    }

    draw() {
        c.beginPath();
        c.strokeStyle = "black"
        c.fillStyle = "gold";
        c.lineWidth = 1;
        c.arc(this.x, this.y, this.r, 0, 2*Math.PI);
        c.stroke();
        c.fill();
    }
}