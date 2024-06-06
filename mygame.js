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
var player1 = new Player(150, 250, 25, 1, .20, 45, 250, 1, "blue", "lightgreen");
var player2 = new Player(600, 250, 25, 3, .20, 45, 250, 2, "blue", "lightgreen");
var myBall = new Ball(player1.x, player1.y, 8, .20);

var FPS = 30;
var now;
var then = Date.now();
var interval = 1000/FPS;
var delta;

function drawBoard() {
    c.beginPath();
    c.moveTo(canvas.width/2, 0);
    c.lineTo(canvas.width/2, canvas.height);
    c.strokeStyle = "black";
    c.lineWidth = 1;
    c.stroke();
}

function draw() {
    drawBoard();
    myBall.draw();
    player1.draw();
    player2.draw();
}

function input() {
    myBall.update();
    player1.update();
    player2.update();
}

function checkCollisions() {
    player1.checkCollisions();
    player2.checkCollisions();
    myBall.checkPlayerCollisions();
    myBall.checkWallCollisions();
}

function gameLoop() {
    c.clearRect(0,0,innerWidth,innerHeight);
    input();
    checkCollisions();
    draw();
}

function keyPressed(e) {
    player1.myKeys[e.key] = true;
    player2.myKeys[e.key] = true;
}

function keyReleased(e) {
    player1.myKeys[e.key] = false;
    player2.myKeys[e.key] = false;
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

