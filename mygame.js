/*      WINDOW SETUP    */
var canvas, c
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
}


/*      MAIN CODE       */
var myPlayer = new Player(100, 100, 30, 8, 1, "blue", "lightgreen");


var FPS = 60;
var now;
var then = Date.now();
var interval = 1000/FPS;
var delta;


function gameLoop() {
    c.clearRect(0,0,innerWidth,innerHeight);
    myPlayer.update();
    myPlayer.draw();
}

function keyPressed(e) {
    myPlayer.myKeys[e.key] = true;
}

function keyReleased(e) {
    myPlayer.myKeys[e.key] = false;
}

function animate() {
    requestAnimationFrame(animate);
    now = Date.now();
    delta = now - then;
    if (delta > interval) {
        then = now - (delta % interval);
        gameLoop();
    } 
}

animate();

window.addEventListener("keydown", keyPressed);
window.addEventListener("keyup", keyReleased);

