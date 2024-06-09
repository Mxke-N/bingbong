class Ball {
    constructor(x, y, r, speed) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.speed = speed;

        this.dx = 0;
        this.dy = 0;
        this.ballTouched = false;
        this.serving = true;
    }

    draw() {
        c.beginPath();
        c.strokeStyle = "black";
        c.fillStyle = "gold";
        c.lineWidth = 1;
        c.arc(adj_x+this.x, adj_y+this.y, this.r, 0, 2*Math.PI);
        c.stroke();
        c.fill();
    }

    update() {
        if (this.serving == true) {
            this.x = playerServing.x + (playerServing.r*playerServing.xdir);
            this.y = playerServing.y + ((playerServing.r + 10)*playerServing.ydir);
            return;
        }
        this.x += this.dx * delta;
        this.y += this.dy * delta;
    }

    checkWallCollisions() {
        if (this.y - this.r < 35) {
            this.dy = Math.abs(this.dy);
        } else if (this.y + this.r > C_HEIGHT-35) {
            this.dy = -Math.abs(this.dy);
        } else if (this.x - this.r < 0) {
            this.dx = Math.abs(this.dx);
        } else if (this.x + this.r > C_WIDTH) {
            this.dx = -Math.abs(this.dx);
        }
    }

    getNewSpeed(myPlayer, timeNow) {
        var sword_dt = myPlayer.swordTime - timeNow;
        var new_speed = this.speed;

        if (sword_dt <= 250 && sword_dt > 200) {
            new_speed = .15;
            console.log(myPlayer.name + ": TOO LATE");
        }
        if (sword_dt <= 200 && sword_dt > 150) {
            new_speed = .17;
            console.log(myPlayer.name + ": LATE");
        }
        if (sword_dt <= 150 && sword_dt > 100) {
            new_speed = .28;
            console.log(myPlayer.name + ": PERFECT");
        }
        if (sword_dt <= 100 && sword_dt > 50) {
            new_speed = .25;
            console.log(myPlayer.name + ": EARLY");
        }
        if (sword_dt < 50) {
            new_speed = .2;
            console.log(myPlayer.name + ": TOO EARLY");
        }

        return new_speed;
    }

    checkSwordCollisions() {
        var timeNow = Date.now();
        if (this.x < C_WIDTH/2) {
            if (player1.swordOut == false) 
                return;
            if (this.x - this.r < player1.x && this.x + this.r > player1.x) {
                if (!(this.y > player1.swordY && this.y < player1.swordY + player1.swordLen)) 
                    return;
                if (this.ballTouched == true)
                    return;
                this.dx = this.speed;
                var new_speed = this.speed;
                if (this.serving == true) {
                    this.serving = false;
                } else {
                    new_speed = this.getNewSpeed(player1, timeNow);
                }
                if (this.y > player1.y) {
                    this.dy = new_speed;
                } else {
                    this.dy = -new_speed;
                }
                this.ballTouched = true;
                return;
            }
            this.ballTouched = false;
        } else {
            if (player2.swordOut == false)
                return;
            if (this.x + this.r > player2.x && this.x - this.r < player2.x) {
                if (!(this.y > player2.swordY && this.y < player2.swordY + player2.swordLen))
                    return;
                if (this.ballTouched == true)
                    return;
                this.dx = -this.speed;
                var new_speed = this.speed;
                if (this.serving == true) {
                    this.serving = false;
                } else {
                    new_speed = this.getNewSpeed(player2, timeNow);
                }
                if (this.y > player2.y) {
                    this.dy = new_speed;
                } else {
                    this.dy = -new_speed;
                }
                this.ballTouched = true;
                return;
            }
            this.ballTouched = false;
        }
    }
}