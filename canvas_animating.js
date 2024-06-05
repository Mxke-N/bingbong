var canvas = document.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;

var c = canvas.getContext('2d');

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;

    this.draw = function() {
        c.strokeStyle = "blue";
        c.fillStyle = "pink";
        c.lineWidth = 10;

        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
        c.stroke();
        c.fill();
    }

    this.update = function() {
        if (this.x+this.radius > innerWidth || this.x-this.radius < 0) {
            this.dx = -this.dx;
        }
    
        if (this.y+this.radius > innerHeight || this.y-this.radius < 0) {
            this.dy = -this.dy;
        }
    
        this.x += this.dx;
        this.y += this.dy;
    }
}


var circleArray = [];

for (var i=0; i<10; i++) {
    var radius = 30;
    var x = Math.random() * (innerWidth - (2*radius)) + radius;
    var y = Math.random() * (innerHeight - (2*radius)) + radius;
    var dx = (Math.random() - 0.5) * 10;
    var dy = (Math.random() - 0.5) * 10;

    circleArray.push(new Circle(x, y, dx, dy, radius));
}


function animate() {
    // Creates animation loop/cycle
    requestAnimationFrame(animate);

    // Clears canvas
    c.clearRect(0,0,innerWidth,innerHeight);

    for (var i=0; i<circleArray.length; i++) {
        circleArray[i].update();
        circleArray[i].draw();
    }
}

animate();



/*
var x = Math.random() * innerWidth;
var y = Math.random() * innerHeight;
var dx = (Math.random() - 0.5) * 5;
var dy = (Math.random() - 0.5) * 5;
var radius = 30;

function animate() {
    // Creates animation loop/cycle
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);

    c.beginPath();
    c.arc(x, y, radius, 0, 2*Math.PI);
    c.strokeStyle = "blue";
    c.stroke();

    if (x+radius > innerWidth || x-radius < 0) {
        dx = -dx;
    }

    if (y+radius > innerHeight || y-radius < 0) {
        dy = -dy;
    }

    x += dx;
    y += dy;
}

// Start animation
animate();
*/