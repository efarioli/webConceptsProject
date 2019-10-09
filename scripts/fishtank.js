const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");
let canvasClickposition = { "xcannvas": 0, "ycannvas": 0 };//will change

const btnClear = document.getElementById('btnClear');
const selectSize = document.getElementById('size');
const selectedFigure = document.getElementById('figure');
const selectedMainColor = document.getElementById('main-color');
const selectedStrokeColor = document.getElementById('stroke-color');
const resetBtn = document.getElementById("reset-btn");
const savetBtn = document.getElementById("save-btn");

const functionObj = {
    "fish": drawFish,
    "star": drawStar,
    "bubble": drawBubble,
    "ornament": drawOrnament
};

const sizeObj = {
    "big": 1,
    "medium": 0.50,
    "small": 0.25
};

resetBtn.addEventListener("click", function (event) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

});

savetBtn.addEventListener("click", function(e) {
    e.preventDefault();
    download(canvas, "fishtank.png");
});

canvas.addEventListener('click', function (e) {
    canvasClickposition = { "xcannvas": e.x - canvas.offsetLeft, "ycannvas": e.y - canvas.offsetTop };
    let size = selectSize.options[selectSize.selectedIndex].value;
    let size2 = sizeObj[size];
    let figure = selectedFigure.options[selectedFigure.selectedIndex].value;
    let figure2 = functionObj[figure];
    let mainColor = selectedMainColor.value;
    let strokeColor = selectedStrokeColor.value;
    figure2(canvasClickposition.xcannvas, canvasClickposition.ycannvas, size2, mainColor, strokeColor);
});


function drawOrnament(x, y, size, _cFill, _cLine) {

    ctx.save();
    ctx.scale(size, size);
    x = x * (1 / size);
    y = y * (1 / size);

    canvasClickposition.xcannvas = canvasClickposition.xcannvas * (1 / size);
    canvasClickposition.ycannvas = canvasClickposition.ycannvas * (1 / size);

    //Already in position 0 , 0
    // x = x + 1;//leave in position 0,0
     y = y + 150;

    x = x - 75;
    y = y - 75;


    ctx.fillStyle = _cFill;
    ctx.strokeStyle = _cLine;
    ctx.lineWidth = 4;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 150, y);
    ctx.lineTo(x + 75, y - 150);
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    //checkCenterPoint(150, 150);
    ctx.restore();
}

function drawBubble(x, y, size, _cFill, _cLine) {
    ctx.save();
    ctx.scale(size, size);
    x = x * (1 / size);
    y = y * (1 / size);

    canvasClickposition.xcannvas = canvasClickposition.xcannvas * (1 / size);
    canvasClickposition.ycannvas = canvasClickposition.ycannvas * (1 / size);

    ctx.fillStyle = _cFill;
    ctx.strokeStyle = _cLine;
    ctx.lineWidth = 4;

    ctx.beginPath();
    ctx.ellipse(x, y, 90, 90, Math.PI * 1, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(x, y, 75, 75, Math.PI * 1, Math.PI * 1.25, Math.PI * 1.75);
    ctx.stroke();

    //checkCenterPoint(180, 180);
    ctx.restore();
}

function drawFish(x, y, size, _cFill, _cLine) {
    ctx.save();
    ctx.scale(size, size);
    x = x * (1 / size);
    y = y * (1 / size);

    canvasClickposition.xcannvas = canvasClickposition.xcannvas * (1 / size);
    canvasClickposition.ycannvas = canvasClickposition.ycannvas * (1 / size);

    x = x + 30;//leave in position 0,0
    y = y + 80;

    x = x - 125;
    y = y - 75;

    // size is 250 width height 150;
    DrawfishDorsalFin(x + 20, y - 80, _cFill, _cLine);

    drawFishBody(x + 70, y + 10, _cFill, _cLine);

    drawFishTail(x + 170, y + 15, _cFill, _cLine);
    drawFishfin(x + 100, y + 15);
    // drawFishEye(230,135);
    drawFishEye(x, y, _cFill, _cLine);
    drawFishEye(x + 30, y, _cFill, _cLine);
    drawFishSmile(x, y + 25, _cFill, _cLine);


    checkCenterPoint(250, 150);
    ctx.restore();
}

function checkCenterPoint(width, height) {
    ctx.beginPath();
    ctx.strokeStyle = "#ff0000";
    ctx.lineWidth = 1;
    ctx.moveTo(canvasClickposition.xcannvas - (width / 2), canvasClickposition.ycannvas - (height / 2));
    ctx.lineTo(canvasClickposition.xcannvas + (width / 2), canvasClickposition.ycannvas + (height / 2));
    ctx.moveTo(canvasClickposition.xcannvas - (width / 2), canvasClickposition.ycannvas + (height / 2));
    ctx.lineTo(canvasClickposition.xcannvas + (width / 2), canvasClickposition.ycannvas - (height / 2));

    ctx.moveTo(canvasClickposition.xcannvas - (width / 2), canvasClickposition.ycannvas + (height / 2));
    ctx.lineTo(canvasClickposition.xcannvas + (width / 2), canvasClickposition.ycannvas + (height / 2));
    ctx.lineTo(canvasClickposition.xcannvas + (width / 2), canvasClickposition.ycannvas - (height / 2));
    ctx.lineTo(canvasClickposition.xcannvas - (width / 2), canvasClickposition.ycannvas - (height / 2));
    ctx.lineTo(canvasClickposition.xcannvas - (width / 2), canvasClickposition.ycannvas + (height / 2));
    //must stroke line or it will not be drawn
    ctx.stroke();
}

function drawRect() {
    ctx.fillStyle = "yellow"; //yellow rectangle that fills canvas
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    ctx.fillStyle = "rgba(0, 255, 0, 0.5)"; //semi-transparent green
    ctx.fillRect(25, 25, 100, 100);

    ctx.clearRect(45, 45, 60, 60); //clear rectangle

    ctx.strokeStyle = "blue"; //blue stroke
    ctx.lineWidth = 3;
    ctx.strokeRect(50, 50, 50, 50);
}

function clear() {
    if (ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
}

function drawFishBody(x, y, cfill, cline) {
    ctx.fillStyle = cfill;
    ctx.strokeStyle = cline;
    ctx.beginPath();
    ctx.ellipse(x, y, 100, 60, Math.PI * 1, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

}

function drawFishEye(x, y, _cFill, _cLine) {
    //eyes
    ctx.fillStyle = _cFill;
    ctx.strokeStyle = _cLine;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(x, y, 12, 18, Math.PI * 1, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = _cLine;
    ctx.strokeStyle = _cFill;
    ctx.lineWidth = 1;

    ctx.beginPath();
    //ctx.fillStyle = "" +_cFill;
    console.log("" + _cFill);

    ctx.ellipse(x - 2, y + 10, 8, 8, Math.PI * 1, 0, Math.PI * 2);
    ctx.fill();

}
function drawFishSmile(x, y, _cFill, _cLine) {
    //smile
    ctx.fillStyle = _cFill;
    ctx.strokeStyle = _cLine;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(x, y, 60, 30, Math.PI * 1, Math.PI * 1, Math.PI * 1.45);
    //ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = 1;

    ctx.moveTo(x + 65, y); //start at 5, 5
    ctx.lineTo(x + 55, y);

    //must stroke line or it will not be drawn
    ctx.stroke();


}

function DrawfishDorsalFin(x, y, cfill, cline) {
    ctx.strokeStyle = cline;
    ctx.fillStyle = cfill;
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(x + 100, y);
    ctx.lineTo(x, y + 50);
    ctx.lineTo(x + 100, y + 50);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}
function drawFishTail(x, y, cfill, cline) {
    ctx.strokeStyle = cline;
    ctx.fillStyle = cfill;
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 50, y - 50);
    ctx.lineTo(x + 50, y + 50);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
}

function drawFishfin(x, y, cfill, cline) {
    ctx.strokeStyle = cline;
    ctx.fillStyle = cfill;
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(x, y - 3);
    ctx.lineTo(x + 30, y - 30);
    ctx.lineTo(x + 30, y + 30);
    ctx.lineTo(x, y + 3);
    //ctx.closePath();
    //ctx.fill();
    ctx.stroke();
}


function drawStar(x, y, size, _cFill, _cLine) {
    //220 width 210 height

    ctx.save();
    ctx.scale(size, size);
    x = x * (1 / size);
    y = y * (1 / size);

    canvasClickposition.xcannvas = canvasClickposition.xcannvas * (1 / size);
    canvasClickposition.ycannvas = canvasClickposition.ycannvas * (1 / size);

    //Already in position 0 , 0
    // x = x + 1;//leave in position 0,0
    // y = y + 80;

    x = x - 110;
    y = y - 105;

    ctx.strokeStyle = _cLine;
    ctx.fillStyle = _cFill;
    ctx.lineWidth = 5;

    ctx.beginPath();
    ctx.moveTo(x + 108, y + 0.0);
    ctx.lineTo(x + 141, y + 70);
    ctx.lineTo(x + 218, y + 78.3);
    ctx.lineTo(x + 162, y + 131);
    ctx.lineTo(x + 175, y + 205);
    ctx.lineTo(x + 108, y + 170);
    ctx.lineTo(x + 41.2, y + 205);
    ctx.lineTo(x + 55, y + 131);
    ctx.lineTo(x + 1, y + 78);
    ctx.lineTo(x + 75, y + 68);
    ctx.lineTo(x + 108, y + 0);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

    //checkCenterPoint(220, 210);
    ctx.restore();

}



//refernce https://codepen.io/joseluisq/pen/mnkLu
function download(canvas, filename) {
    /// create an "off-screen" anchor tag
    var lnk = document.createElement('a'), e;
  
    /// the key here is to set the download attribute of the a tag
    lnk.download = filename;
  
    /// convert canvas content to data-uri for link. When download
    /// attribute is set the content pointed to by link will be
    /// pushed as "download" in HTML5 capable browsers
    lnk.href = canvas.toDataURL("image/png;base64");
  
    /// create a "fake" click-event to trigger the download
    if (document.createEvent) {
      e = document.createEvent("MouseEvents");
      e.initMouseEvent("click", true, true, window,
                       0, 0, 0, 0, 0, false, false, false,
                       false, 0, null);
  
      lnk.dispatchEvent(e);
    } else if (lnk.fireEvent) {
      lnk.fireEvent("onclick");
    }
  }