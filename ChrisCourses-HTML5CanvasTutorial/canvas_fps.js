var canvas, c, FPS=30;

window.onload = function() {
    canvas = document.querySelector('canvas');
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    c = canvas.getContext('2d');

    window.addEventListener('resize', function() {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
    })
    window.addEventListener("keydown", function(e) {
        if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    }, false);

    setInterval(mainloop, 1000/FPS);
}


var left = false;
var up = false;
var right = false;
var down = false;

var myPlayer = new Player(100,100,30,5,2);

var lastLoop = new Date();
function mainloop() {
    // FPS stuff
    var thisLoop = new Date();
    var fps = 1000 / (thisLoop - lastLoop);
    lastLoop = thisLoop;
   // console.log(fps);

    // Draw
    c.clearRect(0,0,innerWidth,innerHeight);
    myPlayer.draw();
}

function keyPressed(event) {
    if (event.key == 'ArrowLeft')
        myPlayer.x -= myPlayer.speed;
    if (event.key == 'ArrowUp')
        myPlayer.y -= myPlayer.speed;
    if (event.key == 'ArrowRight')
        myPlayer.x += myPlayer.speed;
    if (event.key == 'ArrowDown')
        myPlayer.y += myPlayer.speed;
}

function keyReleased(event) {
    console.log(event.key);
    if (event.key == 'ArrowLeft')
        left = false;
    if (event.key == 'ArrowUp')
        up = false;
    if (event.key == 'ArrowRight')
        right = false;
    if (event.key == 'ArrowDown')
        down = false;
}

window.addEventListener("keydown", keyPressed);
window.addEventListener("keydown", keyReleased);






/*
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

var lastLoop = new Date();
function gameLoop() { 
    var thisLoop = new Date();
    var fps = 1000 / (thisLoop - lastLoop);
    lastLoop = thisLoop;
    console.log(fps);
}

setInterval(gameLoop, 1000/30);
*/



/*
var fps, fpsInterval, startTime, now, then, elapsed;
function startAnimating(fps) {
    fpsInterval = 1000 / fps;
    then = Date.now();
    startTime = then;
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        // Put drawing code here
    }
}
*/


/*
var fps = 30;
var now;
var then = Date.now();
var interval = 1000/fps;
var delta;

function draw() {
    requestAnimationFrame(draw);
    now = Date.now();
    delta = now - then;
    if (delta > interval) {
        then = now - (delta % interval)
        // Drawing code here
    }
}
*/