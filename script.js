// Set initial conditions
let activeColorMode = 'basic';
let currentColor = 'black';

//Get DOM elements
const gridContainer = document.querySelector('.grid-container');
const selectColor = document.querySelector('.select-color');
const basicBtn = document.querySelector('.basicBtn')
const rainbowBtn = document.querySelector('.rainbowBtn');
const opacityBtn = document.querySelector('.opacityBtn');
const eraserBtn = document.querySelector('.eraserBtn');
const resetBtn = document.querySelector('.resetBtn');
const slider = document.querySelector(".slider");
const gridSize = document.querySelector('#current-size');

//Assign event listeners
selectColor.addEventListener('input', (e) => { changeColor(e.target.value); });
basicBtn.addEventListener('click', () => { setActiveColorMode('basic'); });
opacityBtn.addEventListener('click', () => { setActiveColorMode('opacity'); });
rainbowBtn.addEventListener('click', () => { setActiveColorMode('rainbow'); });
eraserBtn.addEventListener('click', () => { setActiveColorMode('eraser'); });
resetBtn.addEventListener('click', resetGrid);
slider.addEventListener('mousemove', (e) => { showSize(e.target.value); });
slider.addEventListener('change', (e) => {
    removeGrid();
    makeGrid(e.target.value);
});

//Create functions
function showSize(value) {
    gridSize.textContent = `${value} X ${value}`;
}

function changeColor(newColor) {
    currentColor = newColor;
}

function setActiveColorMode(newColorMode) {
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

function changeColorMode(newMode) {
    basicBtn.classList.remove('active');
    rainbowBtn.classList.remove('active');
    opacityBtn.classList.remove('active');
    eraserBtn.classList.remove('active');
    if (newMode == 'basic') {
        basicBtn.classList.add('active');
    } else if (newMode == 'rainbow') {
        rainbowBtn.classList.add('active');
    } else if (newMode == 'opacity') {
        opacityBtn.classList.add('active');
    } else if (newMode == 'eraser') {
        eraserBtn.classList.add('active');
    }
}

function changeSquareColor(e) {
    if (activeColorMode == 'rainbow') {
        var randomColor = Math.floor(Math.random() * 16777215).toString(16);
        e.target.style.backgroundColor = "#" + randomColor;
    } else if (activeColorMode == 'basic') {
        e.target.style.backgroundColor = currentColor;
    } else if (activeColorMode == 'eraser') {
        e.target.style.backgroundColor = '';
    } else if (activeColorMode == 'opacity') {
        if (e.target.style.backgroundColor == '') {
            e.target.style.backgroundColor = "rgb(230, 230, 230)";
        } else {
            //split rgb values by color value then reduce each color value by 23
            //so that any color will reach black by 11 passes of the mouse 
            var rgbColor = e.target.style.backgroundColor;
            let rgbArr = rgbColor.substring(4, rgbColor.length - 1).replace(/ /g, '').split(',');
            e.target.style.backgroundColor = `rgb(${parseInt(rgbArr[0]) - 23}, ${parseInt(rgbArr[1]) - 23}, ${parseInt(rgbArr[2]) - 23})`;
        }
    }
}

function resetGrid() {
    const square = document.querySelectorAll('.square');
    square.forEach((el) => { el.style.backgroundColor = '' });
}

//Load initial conditions on page startup
makeGrid(8);
showSize(8);