const BACKGROUND_COLOUR = '#000000';
const LINE_COLOUR = '#FFFFFF';
const LINE_WIDTH = 15;

var currentX = 0;
var currentY = 0;
var previousX = 0;
var previousY = 0;

var canvas;
var context;

function prepareCanvas() {  // styling canvas
    console.log('Preparing Canvas');
    canvas = document.getElementById('my-canvas');
    context = canvas.getContext('2d');

    context.fillStyle = BACKGROUND_COLOUR;
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    context.strokeStyle = LINE_COLOUR;
    context.lineWidth = LINE_WIDTH;
    context.lineJoin = 'round'; // smoothens the line

    var isPainting = false;


    document.addEventListener('mousedown', function (event) {  // event listener that listen to mousedown(click) of canvas
        console.log('Mouse Pressed!');
        isPainting = true; // true if mouse clicking down
        currentX = event.clientX - canvas.offsetLeft; // gets current cord and sets them
        currentY = event.clientY - canvas.offsetTop;

    });

    document.addEventListener('mousemove', function (event) { // event detects move

        if (isPainting) { // if mouse is mousedown(clicking)
            previousX = currentX;
            currentX = event.clientX - canvas.offsetLeft;

            previousY = currentY;
            currentY = event.clientY - canvas.offsetTop;

            draw();
        }


    });

    document.addEventListener('mouseup', function (event) { // event listener that listen to mouseup(hovering) of canvas
        console.log('Mouse Released');
        isPainting = false; // false if mouse not clicking

    });

    canvas.addEventListener('mouseleave', function (event) { // if mouse leaves canvas it will not draw
        isPainting = false;

    });

    // Touch Events(for mobile)
    canvas.addEventListener('touchstart', function (event) {
        console.log('Touchdown!');
        isPainting = true;
        currentX = event.touches[0].clientX - canvas.offsetLeft; // touch[0] to get first touch cz phone might have multitouch
        currentY = event.touches[0].clientY - canvas.offsetTop;

    });

    canvas.addEventListener('touchend', function (event) {
        isPainting = false;

    });

    canvas.addEventListener('touchcancel', function (event) {
        isPainting = false;

    });

    canvas.addEventListener('touchmove', function (event) {

        if (isPainting) {
            previousX = currentX;
            currentX = event.touches[0].clientX - canvas.offsetLeft;

            previousY = currentY;
            currentY = event.touches[0].clientY - canvas.offsetTop;

            draw();
        }


    });

}

function draw() {
    context.beginPath(); // creates a path
    context.moveTo(previousX, previousY); // set starting point
    context.lineTo(currentX, currentY); // creates invisible line
    context.closePath(); // closes path
    context.stroke(); // draws the line
}

function clearCanvas() {  // cleans canvas after clicking button
    currentX = 0;
    currentY = 0;
    previousX = 0;    // resets coordinates
    previousY = 0;
    context.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);  // cleaning canvas(make black)

}