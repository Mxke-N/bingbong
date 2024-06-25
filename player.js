class Player {
    constructor(name, x, y, r, dir, speed, swordLen, swordDelay, playerNum, strokeColor, fillColor) {
        this.name = name;
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
        this.swordTime = 0;
        this.swordOut = false;
        this.swordKeyPressed = false;
        this.swordY;
        this.isServing = false;
        this.swordColor = "red";

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
                'arrowup': false,
                'arrowdown': false,
                'arrowleft': false,
                'arrowright': false,
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
        c.arc(adj_x+this.x, adj_y+this.y, this.r, 0, 2*Math.PI);
        c.stroke();
        c.fill();

        // Sword
        c.beginPath();
        c.moveTo(adj_x+this.x + (this.swordOut*this.r*this.xdir), adj_y+this.y + (this.swordOut*this.r*this.ydir));
        c.lineTo(adj_x+this.x + (this.swordOut*this.swordLen*this.xdir) + (this.r * this.xdir), adj_y+this.y + (this.swordOut*this.swordLen*this.ydir) + (this.r * this.ydir));
        c.strokeStyle = this.swordColor;
        c.lineWidth = 5;
        c.stroke();
    }

    update() {
        if (this.myKeys[this.keyIndex[4]]) {
            if (this.swordKeyPressed == false && this.swordOut == false) {
                this.swordKeyPressed = true;
                this.swordOut = true;
                this.swordY = Math.min(this.y + (this.swordOut*this.r*this.ydir), this.y + (this.swordOut*this.swordLen*this.ydir) + (this.r * this.ydir))
                this.swordTime = performance.now() + this.swordDelay;
            }
        } else {
            this.swordKeyPressed = false;
        }

        if (this.swordTime > performance.now()) {
            return;
        }

        this.swordOut = false;
        this.swordColor = "red"

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

    checkCollisions() {
        var myWidth = (C_WIDTH/2); 

        if (this.playerNum == 1) {
            if (this.x + this.r > myWidth) {
                this.x = myWidth - this.r;
            }
        } else {
            if (this.x - this.r < myWidth) {
                this.x = myWidth + this.r;
            }
        }
    }
}