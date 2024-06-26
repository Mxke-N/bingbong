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

