const gridContainer = document.querySelector('.grid-container');

function makeGrid(x) {
    
    gridContainer.style.gridTemplateColumns = `repeat(${x}, 1fr)`
    gridContainer.style.gridTemplateRows = `repeat(${x}, 1fr)`
    for (let rows = 0; rows < x * x; rows++) {
        const newDiv = document.createElement('div');
        newDiv.classList.add('square');
        gridContainer.appendChild(newDiv);
        const square = document.querySelectorAll('.square');
        square.forEach(sq => {
            sq.addEventListener("mouseenter", function (e) {
                e.target.style.backgroundColor = "black";
            });
        });

    }
}

makeGrid(4);


function reSizeGrid() {
    let newSize = prompt("How many squares per side do you want? Input a number less than 64.")
    const square = document.querySelectorAll('.square');
    gridContainer.innerHTML = '';
    makeGrid(newSize);
}