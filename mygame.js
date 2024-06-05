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

var fps = 20;
var now;
var then = Date.now();
var interval = 1000/fps;
var delta;
var frames = 0;

var endDate = Date.now() + 1000;

function animate() {
    requestAnimationFrame(animate);
    now = Date.now();
    delta = now - then;
    if (delta > interval) {
        then = now - (delta % interval);
        // Drawing code here
        frames += 1;
    } 
    if (now > endDate) {
        console.log(frames);
        frames = 0;
        endDate = now + 1000;
    }
}

function main() {
    animate();
}

main();
