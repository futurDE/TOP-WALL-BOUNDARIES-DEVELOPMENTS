//Note: Work on barrier. Especially topBarrier.
//Select DOM elements
const outerSquare = document.querySelector(".outer-square");
const box = document.querySelector(".box");
const wall1 = document.querySelector(".wall1");
const wall2 = document.querySelector(".wall2");
const wall3 = document.querySelector(".wall3");
const wall4 = document.querySelector(".wall4");
const wall5 = document.querySelector(".wall5");
const wall6 = document.querySelector(".wall6");

//Global variables
let boxTop; //top position of box. will be updated each time the box moves
let boxRight; //right position of box. will be updated each time the box moves
let boxBottom; //bottom position of box. will be updated each time the box moves
let boxLeft; //left position of box. will be updated each time the box moves

//Get box DOMRect
function getBoxDOMRect() {
    let getBoxDOMRect = box.getBoundingClientRect();
    boxTop = getBoxDOMRect.top;
    boxRight = getBoxDOMRect.right;
    boxBottom = getBoxDOMRect.bottom;
    boxLeft = getBoxDOMRect.left;
    console.log(`This is box top: ${getBoxDOMRect.top}, This is box right: ${getBoxDOMRect.right}, This is box bottom: ${getBoxDOMRect.bottom}, This is box left: ${getBoxDOMRect.left}`);
}
getBoxDOMRect();

//Global variables    --------> Add more comments here to make code more understandable

let conditionArrays = [];
let topBarrier = NaN;
let bottomBarrier = NaN;

const wall1DOMRect = wall1.getBoundingClientRect(); //Get wall1 DOMRect
const wall2DOMRect = wall2.getBoundingClientRect(); //Get wall1 DOMRect
const wall3DOMRect = wall3.getBoundingClientRect();
const wall4DOMRect = wall4.getBoundingClientRect();
const wall5DOMRect = wall5.getBoundingClientRect();
const wall6DOMRect = wall6.getBoundingClientRect();

//All the wall DOMRects
const wallDOMRects = {
    wall1DOMRect: wall1DOMRect,
    wall2DOMRect: wall2DOMRect,
    wall3DOMRect: wall3DOMRect,
    wall4DOMRect: wall4DOMRect,
    wall5DOMRect: wall5DOMRect,
    wall6DOMRect: wall6DOMRect,
};

//Function to check if box is within the horizontal distance of the walls

function checkHorizontalDistanceCondition() {
    conditionArrays = [];
    for (let x in wallDOMRects) {
        if (boxLeft >= wallDOMRects[x].left && boxRight <= wallDOMRects[x].right) {
            conditionArrays.push(x);
        }
    }

//Make sure to revise the code to clean code

    let distanceFromWallsAboveBox = []; //Array to store the distances between box.top and wall.bottom
    let positiveDistancesFromWallsAboveBox = []; //Only positive distances from distanceFromWallsAboveBox
    for (let i = 0; i < conditionArrays.length; i++) {
        distanceFromWallsAboveBox.push(boxTop - wallDOMRects[`${conditionArrays[i]}`].bottom);
    }

    console.log(`This is distanceFromWallsAboveBox: ${distanceFromWallsAboveBox}`);

    for (let k = 0; k < distanceFromWallsAboveBox.length; k++) {
        if (distanceFromWallsAboveBox[k] >= 0) {
            positiveDistancesFromWallsAboveBox.push(distanceFromWallsAboveBox[k]);
        }
    }

    let minDistance = Math.min(...positiveDistancesFromWallsAboveBox);
    for (let y in wallDOMRects) {
        if (boxTop - wallDOMRects[y].bottom == minDistance) {
            topBarrier = wallDOMRects[y].bottom;
        }
    }

    let distanceFromWallsBelowBox = [];
    let positiveDistancesFromWallsBelowBox = [];
    for (let a = 0; a < conditionArrays.length; a++) {
        distanceFromWallsBelowBox.push(wallDOMRects[`${conditionArrays[a]}`].top - boxBottom);
    }

    console.log(`This is distanceFromWallsBelowBox: ${distanceFromWallsBelowBox}`);

    for (let b = 0; b < distanceFromWallsBelowBox.length; b++) {
        if (distanceFromWallsBelowBox[b] >= 0) {
            positiveDistancesFromWallsBelowBox.push(distanceFromWallsBelowBox[b]);
        }
    }
    console.log(`This is positiveDistancesFromWallsBelowBox: ${positiveDistancesFromWallsBelowBox}`);

    let minDistanceFromWallsBelowBox = Math.min(...positiveDistancesFromWallsBelowBox);
    console.log(`This is minDistanceFromWallsBelowBox: ${minDistanceFromWallsBelowBox}`);
    for (let c in wallDOMRects) {
        if (minDistanceFromWallsBelowBox == wallDOMRects[c].top - boxBottom) {
            bottomBarrier = wallDOMRects[c].top;
        }
    }

    console.log(`This is top barrier: ${topBarrier}`);
    console.log(`This is bottom barrier: ${bottomBarrier}`);
}

// Depending on the arrow key pressed, update the box's position:
// After each move, update the box's DOMRect and global position variables
document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            checkHorizontalDistanceCondition();
            moveBox();
            break;
        case "ArrowRight":
            moveBox();
            break;
        case "ArrowDown":
            checkHorizontalDistanceCondition();
            moveBox();
            break;
        case "ArrowLeft":
            moveBox();
            break;
        default:
    }
});

//Move box
function moveBox() {
    if (event.key == "ArrowUp") {
        if (boxTop > topBarrier) {
            console.log(`This is box top: ${boxTop}`);
            console.log(`Top barrier inside moveBox(): ${topBarrier}`);
            boxTop -= 2;
            box.style.top = `${boxTop}px`;
        }
        box.top = boxTop;
        getBoxDOMRect();
    } else if (event.key == "ArrowRight") {
        boxLeft += 2;
        box.style.left = `${boxLeft}px`;
        getBoxDOMRect();
    } else if (event.key == "ArrowDown") {
        if (boxBottom < bottomBarrier) {
            boxTop += 2;
            box.style.top = `${boxTop}px`;
        }
        box.top = boxTop;
        getBoxDOMRect();
    } else {
        boxLeft -= 2;
        box.style.left = `${boxLeft}px`;
        getBoxDOMRect();
    }
}