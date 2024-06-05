var canvas = document.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;

var c = canvas.getContext('2d');


var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 40;
var minRadius = 2;

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
})

window.addEventListener('resize', function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
})

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

        if (mouse.x-this.x < 50 && mouse.x-this.x > -50 &&
            mouse.y-this.y < 50 && mouse.y-this.y > -50) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        } else if (this.radius > minRadius) {
            this.radius -= 1;
        }
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
const fps = 25;
function animate() {
  // perform some animation task here
  c.clearRect(0,0,innerWidth,innerHeight);
  for (var i=0; i<circleArray.length; i++) {
      circleArray[i].update();
      circleArray[i].draw();
  }


  setTimeout(() => {requestAnimationFrame(animate);}, 1000/fps);
}
animate();
*/

/*
// initialize the timer variables and start the animation
var myFPS=20, fpsInterval, startTime, now, then, elapsed;
function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}
function animate() {
    // request another frame
    requestAnimationFrame(animate);

    // calc elapsed time since last loop
    now = Date.now();
    elapsed = now - then;

    // if enough time has elapsed, draw the next frame
    if (elapsed > fpsInterval) {
        // Get ready for next frame by setting then=now, but also adjust for your
        // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
        then = now - (elapsed % fpsInterval);

        // Put your drawing code here
        c.clearRect(0,0,innerWidth,innerHeight);

        for (var i=0; i<circleArray.length; i++) {
            circleArray[i].update();
            circleArray[i].draw();
        }
    }
}

startAnimating(myFPS);
*/

/*
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
*/


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