let WIDTH = 400;
let HEIGHT = 400;
const X_CENTER = 0;
const Y_CENTER = 0;
const BACKGROUND_COLOR = '#fff';
let CANVAS = null;
const AXES_COLOR = '#000'
const AREA_COLOR = '#AF412D';
let scale = 0.035;
const scaleLastPoint = 10;
const pointsScale = 5;

let clearedAt = 0;
let lastElementNum = 0;
const DEFAULT_R = 2;

drawSvg = (pointList) => {
    console.log("Полученный массив точек: \"" + pointList + "\"");
    CANVAS = SVG()
        .addTo('#svg')
        .size('100%', '100%')
        .viewbox(0, 0, WIDTH, HEIGHT);
    document.getElementById("svg").addEventListener('click', function (e) {
        clickPointEvent(e);
    });

    if (pointList === undefined || pointList.length === 0) {
        initSvg();
    } else {
        drawPlotWithPoints(pointList);
    }
}

initSvg = () => {
    console.log('Init plot!');
    CANVAS.rect(WIDTH, HEIGHT).fill(BACKGROUND_COLOR);
    console.log("R value while init:" + DEFAULT_R);
    drawArea(DEFAULT_R);
    drawAxes();
    //drawGrid();
    drawAxesScaleLabels(DEFAULT_R);
    drawRValue(DEFAULT_R);
}

drawPlotWithPoints = (pointList) => {
    console.log('Ready to draw plot!');
    let pointsArray = [];
    pointList.forEach(point => {
        pointsArray.push({
            x: point.x,
            y: point.y,
            r: point.r,
            result: point.isHit,
        });
    });
    lastElementNum = pointsArray.length - 1;
    scale = countScale(pointsArray);
    let lastPoint = pointsArray[pointsArray.length - 1];
    const r = lastPoint.r;
    console.log('R = ' + r);
    drawArea(r);

    drawAxes();
    drawAxesScaleLabels(r);
    //drawGrid();

    for (let i = clearedAt; i <= lastElementNum - 1; i++) {
        let point = pointsArray[i];
        drawPoint(point.x, point.y, point.result, pointsScale);
    }
    drawPoint(lastPoint.x, lastPoint.y, lastPoint.result, scaleLastPoint);
    drawRValue(r);
}

convertX = (x) => {
    return (WIDTH / 2 + x / scale + X_CENTER/scale);
}

convertY = (y) => {
    return (HEIGHT / 2 - y / scale - Y_CENTER/scale)
}

convertToCoordinatesX = (xPoint) => {
    return (xPoint - WIDTH / 2) * scale - X_CENTER;
}

convertToCoordinatesY = (yPoint) => {
    return ( HEIGHT / 2 - yPoint) * scale - Y_CENTER;
}

countScale = (pointsArray) => {
    const scaleNum = 200;
    console.log(JSON.stringify(pointsArray));
    let max = Math.abs(pointsArray[0].x);
    let newScale;
    pointsArray.forEach(point => {
        newScale = max =
            (Math.abs(point.x) > max || (Math.abs(point.y) > max)) ?
                Math.max(Math.abs(point.x), (Math.abs(point.y))) / scaleNum :
                scale;
    });
    console.log('scale = ' + newScale)
    //return newScale;
    return 0.035;
}

drawAxes = () => {
    const arrowSize = 10
    //axis x
    CANVAS.line(0, (HEIGHT / 2), WIDTH, (HEIGHT / 2)).stroke({width: 2, color: AXES_COLOR});
    //axis arrow
    const triangleX = (WIDTH - arrowSize) + ',' + (HEIGHT / 2 - arrowSize / 2) + ' ' +
        (WIDTH - arrowSize) + ',' + (HEIGHT / 2 + arrowSize / 2) + ' ' +
        (WIDTH) + ',' + (HEIGHT / 2)
    console.log('x arrow coordinates ' + triangleX)
    CANVAS.polygon(triangleX).fill(AXES_COLOR)
    CANVAS.text('x').font({
        size: 16,
        family: 'Menlo, sans-serif',
        anchor: 'end',
        fill: AXES_COLOR
    }).move(WIDTH - 2 * arrowSize, HEIGHT / 2 - 2 * arrowSize)

    //axis y
    CANVAS.line(WIDTH / 2, 0, WIDTH / 2, HEIGHT).stroke({width: 2, color: AXES_COLOR});
    //axis arrow
    const triangleY = (WIDTH / 2 - arrowSize / 2) + ',' + (arrowSize) + ' ' +
        (WIDTH / 2 + arrowSize / 2) + ',' + (arrowSize) + ' ' +
        (WIDTH / 2) + ',' + (0);
    console.log('y arrow coordinates ' + triangleY)
    CANVAS.polygon(triangleY).fill(AXES_COLOR)
    CANVAS.text('y').font({
        size: 16,
        family: 'Menlo, sans-serif',
        anchor: 'end',
        fill: AXES_COLOR
    }).move(WIDTH / 2 - 1.5 * arrowSize, 1.7 * arrowSize)
}

function drawScaleLabel(xStart, xStop, yStart, yStop, labelX, labelY, label) {
    CANVAS.line(convertX(xStart), convertY(yStart), convertX(xStop), convertY(yStop))
        .stroke({width: 2, color: AXES_COLOR});
    CANVAS.text(label).font({
        size: 16,
        family: 'Menlo, sans-serif',
        anchor: 'end',
        fill: AXES_COLOR
    }).move(convertX(labelX), convertY(labelY));
}

drawRValue = (r) => {
    CANVAS.text('R = ' + r).font({
        size: 16,
        family: 'Menlo, sans-serif',
        anchor: 'end',
        fill: AXES_COLOR
    }).move(WIDTH - 50, HEIGHT - 50);
}

drawAxesScaleLabels = (r) => {
    console.log('Start drawing axes labels')
    const hatchLen = 0.1;
    console.log("R value while drawing labels: " + r);
    //x axis labels
    drawScaleLabel(-r, -r, hatchLen, -hatchLen, -r, -2 * hatchLen, "-R");
    drawScaleLabel(-r / 2, -r / 2, hatchLen, -hatchLen, -r / 2, -2 * hatchLen, "-R/2");
    drawScaleLabel(r / 2, r / 2, hatchLen, -hatchLen, r / 2, -2 * hatchLen, "R/2");
    drawScaleLabel(r, r, hatchLen, -hatchLen, r, -2 * hatchLen, "R");

    //y axis labels
    drawScaleLabel(hatchLen, -hatchLen, -r, -r, -4 * hatchLen, -r, "-R");
    drawScaleLabel(hatchLen, -hatchLen, -r / 2, -r / 2, -4 * hatchLen, -r / 2, "-R/2");
    drawScaleLabel(hatchLen, -hatchLen, r / 2, r / 2, -4 * hatchLen, r / 2, "R/2");
    drawScaleLabel(hatchLen, -hatchLen, r, r, -4 * hatchLen, r, "R");
}

drawGrid = () => {
    let numOfLines = WIDTH * scale / 2;
    for (let i = 1; i < numOfLines; i++) {
        let lineLeft = CANVAS.line(convertX(i), 0, convertX(i), HEIGHT);
        let lineRight = CANVAS.line(convertX(-i), 0, convertX(-i), HEIGHT);
        lineLeft.stroke({width: 0.5, color: AXES_COLOR, dasharray: '5,5'});
        lineRight.stroke({width: 0.5, color: AXES_COLOR, dasharray: '5,5'});
    }
}


drawArea = (r) => { //TODO переделать на свою
    CANVAS.rect(WIDTH, HEIGHT).fill(BACKGROUND_COLOR);
    //here diameter needed
    CANVAS.circle(r / scale * 2).fill(AREA_COLOR).move(convertX(-r), convertY(r))
    const fillUnusedCircle = (convertX(0)) + ',' + (convertY(0)) + ' ' +
        (convertX(-r)) + ',' + (convertY(0)) + ' ' +
        (convertX(-r)) + ',' + (convertY(r)) + ' ' +
        (convertX(r)) + ',' + (convertY(r)) + ' ' +
        (convertX(r)) + ',' + (convertY(-r)) + ' ' +
        (convertX(0)) + ',' + (convertY(-r));

    CANVAS.polygon(fillUnusedCircle).fill(BACKGROUND_COLOR)
    const area = (convertX(0)) + ',' + (convertY(0)) + ' ' +
        (convertX(r)) + ',' + (convertY(0)) + ' ' +
        (convertX(r)) + ',' + (convertY(r)) + ' ' +
        (convertX(0)) + ',' + (convertY(r)) + ' ' +
        (convertX(0)) + ',' + (convertY(r / 2)) + ' ' +
        (convertX(-r)) + ',' + (convertY(0));
    console.log('area coordinates ' + area)
    CANVAS.polygon(area).fill(AREA_COLOR)
}

drawPoint = (x, y, result, pointScale) => {
    let color = result === "Попали" ? '#0f0' : '#f00';
    CANVAS.circle(pointScale).fill(color).move(convertX(x) - pointScale / 2, convertY(y) - pointScale / 2);
}

function clickPointEvent(event) {
    console.log('Start drawing point after click! Received coords: ' + event.clientX + ', ' + event.clientY);
    let svg = document.getElementById('svg');
    let coordinates = getCoords(event, svg);
    if (!isNaN(coordinates.r)) {
        console.log('Try to draw point after click. Coordinates: x: ' + coordinates.x + ', y: ' + coordinates.y + ', r: ' + coordinates.r);
        document.getElementById('x').value = coordinates.x;
        document.getElementById('y').value = coordinates.y;
        document.getElementById('y').checked = true;
        document.getElementById('input-data').submit();
    } else {
        document.getElementById("r-error").classList.remove("hide");
    }
}

function getCoords(event, element) {
    let coordinates = {};
    let xPosition = element.getBoundingClientRect().left;
    let yPosition = element.getBoundingClientRect().top;
    console.log('xPosition: ' + xPosition + ' X: ' + (event.clientX - xPosition));
    console.log('yPosition: ' + yPosition + ' Y: ' + (event.clientY - yPosition));

    let svg = document.getElementById("svg");
    WIDTH = svg.getBoundingClientRect().width;
    HEIGHT = svg.getBoundingClientRect().height;
    coordinates.x = Math.floor(convertToCoordinatesX(event.clientX - xPosition));
    coordinates.y = Math.floor(convertToCoordinatesY(event.clientY - yPosition));
    coordinates.r = parseInt(getR());
    console.log('X: ' + coordinates.x);
    console.log('Y: ' + coordinates.y);
    console.log('R: ' + coordinates.r);
    return coordinates;
}

function getR() {
    let rCheckboxes = document.getElementsByName("r[]");
    let result = NaN;
    for (const r of rCheckboxes) {
        if (r.checked) {
            result = r.value;
        }
    }
    return result;
}
