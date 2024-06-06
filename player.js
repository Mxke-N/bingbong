class Player {
    constructor(x, y, r, dir, speed, swordLen, swordDelay, playerNum, strokeColor, fillColor) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.dir = dir;
        this.speed = speed;
        this.swordLen = swordLen;
        this.swordDelay = swordDelay;
        this.playerNum = playerNum;
        this.strokeColor = strokeColor;
        this.fillColor = fillColor;

        this.myKeys = {};
        this.keyIndex = [];
        this.swordOut = 0;
        this.swordTime = 0;

        if (this.dir == 1) {
            this.xdir = 0;
            this.ydir = -1;
        } else {
            this.xdir = 0;
            this.ydir = 1;
        }

        if (this.playerNum == 1) {
            this.myKeys = {
                'w': false,
                's': false,
                'a': false,
                'd': false,
                ' ': false
            }
        } else {
            this.myKeys = {
                'ArrowUp': false,
                'ArrowDown': false,
                'ArrowLeft': false,
                'ArrowRight': false,
                'p': false
            }        
        }

        for (let key in this.myKeys) {
            this.keyIndex.push(key);
        }
    }

    draw() {
        // Circle
        c.beginPath();
        c.strokeStyle = this.strokeColor;
        c.fillStyle = this.fillColor;
        c.lineWidth = 10;
        c.arc(this.x, this.y, this.r, 0, 2*Math.PI);
        c.stroke();
        c.fill();

        // Sword
        c.beginPath();
        c.moveTo(this.x + (this.swordOut*this.r*this.xdir), this.y + (this.swordOut*this.r*this.ydir));
        c.lineTo(this.x + (this.swordOut*this.swordLen*this.xdir) + (this.r * this.xdir), this.y + (this.swordOut*this.swordLen*this.ydir) + (this.r * this.ydir));
        c.strokeStyle = "red";
        c.stroke();
    }

    update() {
        if (this.myKeys[this.keyIndex[4]]) {
            this.swordOut = true;
            this.swordTime = Date.now() + this.swordDelay;
        }

        if (this.swordTime > Date.now()) {
            return;
        }

        this.swordOut = false;

        if (this.myKeys[this.keyIndex[0]]) {
            this.y -= this.speed * delta;
            this.ydir = -1;
        }
        if (this.myKeys[this.keyIndex[2]]) {
            this.x -= this.speed * delta;
        }
        if (this.myKeys[this.keyIndex[1]]) {
            this.y += this.speed * delta;
            this.ydir = 1;
        }
        if (this.myKeys[this.keyIndex[3]]) {
            this.x += this.speed * delta;
        }
    }
}