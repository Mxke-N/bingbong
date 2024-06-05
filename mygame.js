/*      WINDOW SETUP    */
var canvas, c
window.onload = function() {
    canvas = document.querySelector('canvas');
    canvas.width = 750;
    canvas.height = 500;

    c = canvas.getContext('2d');

    window.addEventListener("keydown", function(e) {
        if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    }, false);
}


/*      MAIN CODE       */
var myPlayer = new Player(100, 100, 30, .4, 1, "blue", "lightgreen");
var otherPlayer = new Player(300, 100, 30, .4, 2, "red", "purple");

var FPS = 30;
var now;
var then = Date.now();
var interval = 1000/FPS;
var delta;


function gameLoop() {
    c.clearRect(0,0,innerWidth,innerHeight);
    myPlayer.update();
    otherPlayer.update();
    myPlayer.draw();
    otherPlayer.draw();
}

function keyPressed(e) {
    myPlayer.myKeys[e.key] = true;
    otherPlayer.myKeys[e.key] = true;
}

function keyReleased(e) {
    myPlayer.myKeys[e.key] = false;
    otherPlayer.myKeys[e.key] = false;
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

