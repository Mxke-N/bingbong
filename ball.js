class Ball {
    constructor(x, y, r, speed) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.speed = speed;

        this.dx = 0;
        this.dy = 0;
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

    update() {
        this.x += this.dx * delta;
        this.y += this.dy * delta;
    }

    checkWallCollisions() {
        if (this.y - this.r < 0 || this.y + this.r > canvas.height) {
            this.dy = -this.dy;
        }
        if (this.x - this.r < 0 || this.x + this.r > canvas.width) {
            this.dx = -this.dx;
        }
    }

    checkPlayerCollisions() {
        if (this.x < canvas.width/2) {
            if (player1.swordOut == false) {
                return;
            }

            if (this.x - this.r < player1.x && this.x + this.r > player1.x) {
                if (this.y > player1.swordY && this.y < player1.swordY + player1.swordLen) {
                    this.dx = this.speed;
                    if (this.y > player1.y) {
                        this.dy = this.speed;
                    } else {
                        this.dy = -this.speed
                    }
                }
            }
        } else {
            if (player2.swordOut == false) {
                return;
            }

            if (this.x + this.r > player2.x && this.x - this.r < player2.x) {
                if (this.y > player2.swordY && this.y < player2.swordY + player2.swordLen) {
                    this.dx = -this.speed;
                    if (this.y > player2.y) {
                        this.dy = this.speed;
                    } else {
                        this.dy = -this.speed
                    }
                }
            }
        }
    }
}