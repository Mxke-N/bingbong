class Player {
    constructor(x, y, r, speed, playerNum, strokeColor, fillColor) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.speed = speed;
        this.playerNum = playerNum;
        this.strokeColor = strokeColor;
        this.fillColor = fillColor;
        this.myKeys = {};
        this.keyIndex = [];

        if (this.playerNum == 1) {
            this.myKeys = {
                'w': false,
                's': false,
                'a': false,
                'd': false
            }
        } else {
            this.myKeys = {
                'ArrowUp': false,
                'ArrowDown': false,
                'ArrowLeft': false,
                'ArrowRight': false
            }        
        }

        for (let key in this.myKeys) {
            this.keyIndex.push(key);
        }
    }

    draw() {
        c.beginPath();
        c.strokeStyle = this.strokeColor;
        c.fillStyle = this.fillColor;
        c.lineWidth = 10;
        c.arc(this.x, this.y, this.r, 0, 2*Math.PI);
        c.stroke();
        c.fill();
    }

    update() {
        console.log(this.myKeys);
        if (this.myKeys[this.keyIndex[0]])
            this.y -= this.speed * delta;
        if (this.myKeys[this.keyIndex[1]])
            this.y += this.speed * delta;
        if (this.myKeys[this.keyIndex[2]])
            this.x -= this.speed * delta;
        if (this.myKeys[this.keyIndex[3]])
            this.x += this.speed * delta;
    }
}