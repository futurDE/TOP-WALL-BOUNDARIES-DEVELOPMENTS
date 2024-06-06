let distanceFromWallsAboveBox = []; //Array to store the distances between box.top and wall.bottom
    let positiveDistancesFromWallsAboveBox = []; //Only positive distances from distanceFromWallsAboveBox
    for (let i = 0; i < conditionArrays.length; i++) {
        distanceFromWallsAboveBox.push(boxTop - wallDOMRects[`${conditionArrays[i]}`].bottom);
    } //*** */

    console.log(`This is distanceFromWallsAboveBox: ${distanceFromWallsAboveBox}`);

    for (let k = 0; k < distanceFromWallsAboveBox.length; k++) {
        if (distanceFromWallsAboveBox[k] >= 0) {
            positiveDistancesFromWallsAboveBox.push(distanceFromWallsAboveBox[k]);
        }
    } //*** */

    let minDistance = Math.min(...positiveDistancesFromWallsAboveBox);
    for (let y in wallDOMRects) {
        if (boxTop - wallDOMRects[y].bottom == minDistance) {
            topBarrier = wallDOMRects[y].bottom;
        }
    }

    console.log(`This is top barrier: ${topBarrier}`);