const colorPixel = (event) => {
    let r = 0;
    let g = 0;
    let b = 0;
    let a = 0.0;

    let currentBG = event.target.style.backgroundColor;
    if (currentBG !== "") {
        currentBG = currentBG.replace("rgba(", "");
        currentBG = currentBG.replace(")", "");

        let split = currentBG.split(",");
        r = split[0];
        g = split[1];
        b = split[2];
        a = split[3];
    }

    if (rgbMode) {
        r = Math.floor(Math.random() * 256);
        g = Math.floor(Math.random() * 256);
        b = Math.floor(Math.random() * 256);
        a = 1.0;
    }

    let alpha = +a + 0.1;
    let bgColor = `rgba(${r}, ${g}, ${b}, ${alpha})`;
    event.target.style.backgroundColor = bgColor;
}

const toggleRGB = () => {
    rgbMode = !rgbMode;
}

const resizeGrid = () => {
    console.log("resizeGrid() called");
    let size =  gridSizeInput.value;
    console.log(`size = ${size}`);

    if (isNaN(size) || size > 100 || size < 8) {
        size = defaultGridSize;
        gridSizeInput.value = defaultGridSize;
        console.log(`size changed to ${size}`);
    }

    createGrid(size);
}

const createGrid = (size = defaultGridSize) => {
    console.log(`createGrid(${size}) called`);
    grid.innerHTML = '';
    grid.style.gridTemplateColumns = `repeat(${size}, minmax(0, 1fr))`;
    grid.style.gridTemplateRows = `repeat(${size}, minmax(0, 1fr))`;

    for (let i = 1; i <= size ** 2; i++) {
        let pixel = document.createElement("div");
        pixel.addEventListener('mouseover', colorPixel);
        grid.appendChild(pixel);
    }

}

const defaultGridSize = 16;
let rgbMode = false;

const resetButton = document.querySelector("#resetbutton");
const gridSizeInput = document.querySelector("#gridsizeinput");
const resizeGridButton = document.querySelector("#resizegrid");
const rgbToggle = document.querySelector("#rgbtoggle");
const grid = document.querySelector("#grid");

resetButton.addEventListener('click', resizeGrid, false);
resizeGridButton.addEventListener('click', resizeGrid, false);
rgbToggle.addEventListener('click', toggleRGB);

resizeGrid();
