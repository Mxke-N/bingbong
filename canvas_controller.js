var canvas = document.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;

window.addEventListener('resize', function() {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
})

window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

var c = canvas.getContext('2d');


class Circle {
    constructor(x, y, radius, speed) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.keys = [];
    }

    draw() {
        c.strokeStyle = "blue";
        c.fillStyle = "pink";
        c.lineWidth = 10;

        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        c.stroke();
        c.fill();
    }

    update() {
        // check the keys and do the movement.
        if (this.keys['s']) {
            // down
            this.y += this.speed;
        }
        if (this.keys['w']) {
            // up
            this.y += -this.speed;
        }
        if (this.keys['d']) {
            // right
            this.x += this.speed;
        }
        if (this.keys['a']) {
            //left
            this.x += -this.speed;
        }
    };
}


var myCircle = new Circle(100, 100, 30, 5);

function update() {
    requestAnimationFrame(update);

    // do the drawing
    c.clearRect(0,0,innerWidth,innerHeight);
    myCircle.update();
    myCircle.draw();
}

update();


// key events
addEventListener("keydown", function (e) {
    console.log(e.key);
    myCircle.keys[e.key] = true;
});
addEventListener("keyup", function (e) {
    myCircle.keys[e.key] = false;
});