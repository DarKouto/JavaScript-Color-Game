// ***** VARIABLES *****
var numSquares = 6;
var colors = generateRandomColors(6);
var pickedColor = pickColor();
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("message");
var title = document.querySelector("h1");
var resetBtn = document.querySelector("#reset");
var easyBtn = document.getElementById("easyBtn");
var hardBtn = document.getElementById("hardBtn");


// ***** FUNCTIONS *****
function randomColor() { 
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    return "rgb(" + red + ", " + green + ", " + blue + ")";
}

function generateRandomColors(num) { 
    var arr = [];
    for (var i=0; i<num; i++) {
        arr.push(randomColor());
    }
    return arr;
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function changeColors() {
    for (var i=0; i < squares.length; i++) {
        squares[i].style.backgroundColor = pickedColor;
    }
}

function resetDisplay() {
    title.style.backgroundColor = "steelblue";
    messageDisplay.textContent = "";
    reset.textContent = "New Colors";
}


// ***** CODE *****
colorDisplay.textContent = pickedColor;

for (var i=0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colors[i];

    squares[i].addEventListener("click", function() {
        var clickedColor = this.style.backgroundColor;
        if (clickedColor === pickedColor) {
            messageDisplay.textContent = "You win";
            title.style.backgroundColor = pickedColor;
            reset.textContent = "Play Again?";
            changeColors();
        }
        else {
            this.style.backgroundColor = "#232323";
            messageDisplay.textContent = "Try Again";
        } 
    });
}


// ***** RESET ****
resetBtn.addEventListener("click", function() {
    resetDisplay();
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    
    for (var i=0; i<squares.length; i++) {
        squares[i].style.backgroundColor = colors[i];
    }
   
});


// ***** EASY ****
easyBtn.addEventListener("click", function() {
    numSquares = 3;
    easyBtn.classList.add("selected");
    hardBtn.classList.remove("selected");
    
    resetDisplay();

    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;

    for (var i=0; i<squares.length; i++) {
        if (colors[i]) {
            squares[i].style.backgroundColor = colors[i];
        }
        else {
            squares[i].style.display = "none";
        }
    }
});


//***** HARD *****
hardBtn.addEventListener("click", function() {
    numSquares = 6;
    easyBtn.classList.remove("selected");
    hardBtn.classList.add("selected");

    resetDisplay();

    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    for (var i=0; i<squares.length; i++) {
        squares[i].style.backgroundColor = colors[i];
        squares[i].style.display = "block";
    }
});
