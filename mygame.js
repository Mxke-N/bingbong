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

var p1_score = 0;
var p2_score = 0;

var playerScored;
var playerServing;

var FPS = 200;
var now;
var then = performance.now();
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
    
    c.strokeStyle = "#39ff14";
    c.lineWidth = 30;
    c.beginPath();
    c.moveTo(adj_x-15, adj_y+35);
    c.lineTo(adj_x-15, adj_y+C_HEIGHT-35);
    c.moveTo(adj_x+C_WIDTH+15, adj_y+35);
    c.lineTo(adj_x+C_WIDTH+15, adj_y+C_HEIGHT-35);
    c.stroke();

    c.lineWidth = 1;
    c.strokeStyle = "black";
    c.beginPath();
    c.moveTo(adj_x, adj_y+35);
    c.lineTo(adj_x + C_WIDTH, adj_y+35);
    c.moveTo(adj_x + C_WIDTH, adj_y+C_HEIGHT-35)
    c.lineTo(adj_x, adj_y + C_HEIGHT-35);
    c.stroke();

    c.strokeStyle = "black";
    c.lineWidth = 3;
    c.beginPath();
    c.moveTo(adj_x + (C_WIDTH/2), adj_y+35);
    c.lineTo(adj_x + (C_WIDTH/2), adj_y + C_HEIGHT-35);
    c.stroke();
}

function drawScore() {
    c.fillStyle = "black";
    c.font = "50px Verdana";
    c.textAlign = "center";
    c.fillText(":", adj_x+(C_WIDTH/2), adj_y+17);
    c.textAlign = "right";
    c.fillText(p1_score, adj_x+(C_WIDTH/2)-20, adj_y+20);
    c.textAlign = "left";
    c.fillText(p2_score, adj_x+(C_WIDTH/2)+20, adj_y+20);
}

function draw() {
    drawBoard();
    drawScore();
    player1.draw();
    player2.draw();
    myBall.draw();
}

function input() {
    if (myBall.goal == true) {
        return;
    }
    player1.update();
    player2.update();
}

function checkCollisions() {
    player1.checkCollisions();
    player2.checkCollisions();
    myBall.update();
    myBall.checkGoal();
    ifGoal();
    myBall.checkSwordCollisions();
    myBall.checkWallCollisions();
}

function ifGoal() {
    if (myBall.goal == true) {
        if (myBall.goalTimeSet == false) {
            if (playerScored == 1) {
                p1_score += 1;
            } else {
                p2_score += 1;
            }
            myBall.goalTimeSet = true;
            myBall.nextServeTime = performance.now() + 500;
            return;
        }
        if (performance.now() > myBall.nextServeTime) {
            myBall.goalTimeSet = false;
            myBall.goal = false;
            nextServe();
        }
    } 
}

function gameLoop() {
    c.clearRect(0,0,canvas.width,canvas.height);
    input();
    checkCollisions();
    draw();
}

function keyPressed(e) {
    var myKey = e.key.toLowerCase();
    player1.myKeys[myKey] = true;
    player2.myKeys[myKey] = true;
}

function keyReleased(e) {
    var myKey = e.key.toLowerCase();
    player1.myKeys[myKey] = false;
    player2.myKeys[myKey] = false;
}

function animate() {
    requestAnimationFrame(animate);
    now = performance.now();
    delta = now - then;
    if (delta > interval) {
        then = now - (delta % interval);
        gameLoop();
    } 
}

function changeServer(nextServer) {
    playerServing = nextServer;
    nextServer.isServing = true;
    myBall.serving = true;
}

function nextServe() {
    if (playerScored == 1) {
        changeServer(player1);
    } else {
        changeServer(player2);
    }

    player1.x = 150;
    player1.y = 250;
    player2.x = 600;
    player2.y = 250;

    player1.swordColor = "red";
    player2.swordColor = "red";
}

changeServer(player1);
animate();

window.addEventListener("keydown", keyPressed);
window.addEventListener("keyup", keyReleased);

