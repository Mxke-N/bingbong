class Player {
    constructor(x, y, r, speed, playerNum) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.speed = speed;
        this.myKeys = {};
        this.keyIndex = [];

        if (playerNum == 1) {
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

        console.log(this.keyIndex);

        for (var i=0; i<this.keyIndex.length; i++) {
            console.log(this.myKeys[this.keyIndex[i]]);
        }
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
        if (this.keys['ArrowLeft'] == true) 
            this.x -= this.speed;
        if (this.keys['ArrowRight'] == true) 
            this.x += this.speed;
        if (this.keys['ArrowUp'] == true) 
            this.y -= this.speed;
        if (this.keys['ArrowDown'] == true) 
            this.y += this.speed;
    }
}