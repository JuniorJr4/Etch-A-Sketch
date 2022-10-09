const DEFAULT_GRID_SIZE = 8;
const DEFAULT_COLOR = 'black';
const DEFAULT_COLOR_MODE = 'basic';

let activeColorMode = DEFAULT_COLOR_MODE;
let currentColor = DEFAULT_COLOR;

const gridContainer = document.querySelector('.grid-container');
const selectColor = document.querySelector('.select-color');
const basicBtn = document.querySelector('.basicBtn')
const rainbowBtn = document.querySelector('.rainbowBtn');
const opacityBtn = document.querySelector('.opacityBtn');
const eraserBtn = document.querySelector('.eraserBtn');
const resetBtn = document.querySelector('.resetBtn');
const slider = document.querySelector(".slider");
const gridSize = document.querySelector("#current-size");
gridSize.textContent = slider.value + ' X ' + slider.value;

selectColor.oninput = (e) => changeColor(e.target.value);
basicBtn.onclick = () => setActiveColorMode('basic');
opacityBtn.onclick = () => setActiveColorMode('opacity');
rainbowBtn.onclick = () => setActiveColorMode('rainbow');
eraserBtn.onclick = () => setActiveColorMode('eraser');
resetBtn.onclick = () => resetGrid();
slider.onmousemove = (e) => showSize(e.target.value);
slider.onchange = function () {
    removeGrid();
    makeGrid(this.value);
}

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

makeGrid(DEFAULT_GRID_SIZE);



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
