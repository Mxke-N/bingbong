var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
console.log(canvas);

// Creates super object, passing methods and functions to use
// to draw on canvas. 
var context = canvas.getContext('2d');


// Rectangles
context.fillStyle = "rgba(255, 0, 0, 0.5)";
context.fillRect(100, 100, 100, 100);
context.fillStyle = "rgba(0, 255, 0, 0.5)";
context.fillRect(400, 100, 100, 100);
context.fillStyle = "rgba(0, 0, 255, 0.5)";
context.fillRect(300, 300, 100, 100);

// Line
context.beginPath();
context.moveTo(50, 300);
context.lineTo(300, 100);
context.lineTo(400, 300);
context.strokeStyle = "#fa34a3";
context.stroke();

// Arc / Circle
context.beginPath();
context.arc(300, 300, 30, 0, 2*Math.PI);
context.strokeStyle = "black";
context.stroke();

for (i = 0; i < 5; i++) {
    // Math.random returns value between 0 and 1
    var x = Math.random() * window.innerWidth;
    var y = Math.random() * window.innerHeight;

    context.beginPath();
    context.arc(x, y, 30, 0, 2*Math.PI);
    context.strokeStyle = "orange";
    context.stroke();
} 