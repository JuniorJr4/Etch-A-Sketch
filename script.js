const DEFAULT_GRID_SIZE = 8;
const DEFAULT_COLOR = 'black';
const DEFAULT_COLOR_MODE = 'basic'

let activeColorMode = DEFAULT_COLOR_MODE;
let activeColor = DEFAULT_COLOR;

const gridContainer = document.querySelector('.grid-container');
const basicBtn = document.querySelector('.basicBtn')
const rainbowBtn = document.querySelector('.rainbowBtn');
const opacityBtn = document.querySelector('.opacityBtn');

basicBtn.onclick = () => setActiveColorMode('basic');
opacityBtn.onclick = () => setActiveColorMode('opacity');
rainbowBtn.onclick = () => setActiveColorMode('rainbow');

function setActiveColorMode(newColorMode) {
    console.log(`act=${activeColorMode}`, `new=${newColorMode}`);
    changeColorMode(newColorMode);
    activeColorMode = newColorMode;
    
}

function removeGrid() {
    gridContainer.innerHTML = '';
}

function makeGrid(x) {
    gridContainer.style.gridTemplateColumns = `repeat(${x}, 1fr)`
    gridContainer.style.gridTemplateRows = `repeat(${x}, 1fr)`
    for (let rows = 0; rows < x * x; rows++) {
        const newDiv = document.createElement('div');
        newDiv.classList.add('square');
        newDiv.addEventListener("mouseenter", changeSquareColor);
        gridContainer.appendChild(newDiv);
    }
}

makeGrid(DEFAULT_GRID_SIZE);


function reSizeGrid() {
    let newSize = prompt("How many squares per side do you want? Input a number less than 64.");
    while (newSize > 64 || newSize == NaN || newSize % 1 != 0) {
        newSize = prompt("Please enter a whole number less than 64!")
    } if (newSize === null) {
        return;
    } else {
        removeGrid();
        makeGrid(newSize);
    }
}

function changeColorMode(newMode) {
    if (newMode == 'basic' && activeColorMode == 'rainbow') {
        basicBtn.classList.toggle('active');
        rainbowBtn.classList.toggle('active');
    } else if (newMode == 'basic' && activeColorMode == 'opacity') {
        basicBtn.classList.toggle('active');
        opacityBtn.classList.toggle('active');
    } else if (newMode == 'opacity' && activeColorMode == 'rainbow') {
        rainbowBtn.classList.toggle('active');
        opacityBtn.classList.toggle('active');
    } else {
        return;
    }
    
}
let opacityValue = 0.0;

function changeSquareColor(e) {
    if (activeColorMode == 'rainbow') {
        var randomColor = Math.floor(Math.random() * 16777215).toString(16);
        e.target.style.backgroundColor = "#" + randomColor;
    } else if (activeColorMode == 'basic') {
        e.target.style.backgroundColor = 'black';
    } else if (activeColorMode == 'opacity') {
        opacityValue += 0.1;
        e.target.style.backgroundColor = 'black'
        e.target.style.opacity = parseFloat(e.target.style.opacity) + 0.1;
        console.log(opacityValue);
    }
}