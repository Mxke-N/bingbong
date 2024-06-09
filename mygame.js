/*      WINDOW SETUP    */
var canvas, c
var C_WIDTH = 750;
var C_HEIGHT = 500;
var adj_x, adj_y;
window.onload = function() {
    canvas = document.querySelector('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    adj_x = (canvas.width - C_WIDTH) / 2;
    adj_y = (canvas.height - C_HEIGHT) / 2;

    c = canvas.getContext('2d');

    window.addEventListener('resize', function() {
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        adj_x = (canvas.width - C_WIDTH) / 2;
        adj_y = (canvas.height - C_HEIGHT) / 2;
    })

    window.addEventListener("keydown", function(e) {
        if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    }, false);
}


/*      MAIN CODE       */
var player1 = new Player("P1", 150, 250, 20, 1, .20, 45, 250, 1, "blue", "lightgreen");
var player2 = new Player("P2", 600, 250, 20, 3, .20, 45, 250, 2, "blue", "lightgreen");
var myBall = new Ball(0, 0, 8, .20);

var playerServing;

var FPS = 100;
var now;
var then = Date.now();
var interval = 1000/FPS;
var delta;

function drawBoard() {
    c.lineWidth = 1;
    c.strokeStyle = "gray";
    c.beginPath();
    c.moveTo(adj_x + (C_WIDTH/4), adj_y+35);
    c.lineTo(adj_x + (C_WIDTH/4), adj_y + (C_HEIGHT-35));
    c.stroke();
    c.beginPath();
    c.moveTo(adj_x + C_WIDTH - (C_WIDTH/4), adj_y+35);
    c.lineTo(adj_x + C_WIDTH - (C_WIDTH/4), adj_y + C_HEIGHT-35);
    c.stroke();

    c.strokeStyle = "black";
    c.beginPath();
    c.moveTo(adj_x, adj_y+35);
    c.lineTo(adj_x + C_WIDTH, adj_y+35);
    c.lineTo(adj_x + C_WIDTH, adj_y+C_HEIGHT-35)
    c.lineTo(adj_x, adj_y + C_HEIGHT-35);
    c.lineTo(adj_x, adj_y+35);
    c.stroke();

    c.beginPath();
    c.moveTo(adj_x + (C_WIDTH/2), adj_y+35);
    c.lineTo(adj_x + (C_WIDTH/2), adj_y + C_HEIGHT-35);
    c.strokeStyle = "black";
    c.lineWidth = 3;
    c.stroke();
}

function draw() {
    drawBoard();
    player1.draw();
    player2.draw();
    myBall.draw();
}

function input() {
    player1.update();
    player2.update();
}

function checkCollisions() {
    player1.checkCollisions();
    player2.checkCollisions();
    myBall.update();
    myBall.checkSwordCollisions();
    myBall.checkWallCollisions();
}

function gameLoop() {
    c.clearRect(0,0,canvas.width,canvas.height);
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

function initGame() {
    playerServing = player2;
    player2.isServing = true;
}

initGame();
animate();

window.addEventListener("keydown", keyPressed);
window.addEventListener("keyup", keyReleased);

