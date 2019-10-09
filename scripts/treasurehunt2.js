let gridNode = document.querySelectorAll(".col");
let gridArr = Array.prototype.slice.call(gridNode);

let arrImage = [];
arrImage[0] = { "img": "<img src='./images/treasure/javascript.png' />", "txt": "Javascript" };
arrImage[1] = { "img": "<img src='./images/treasure/css.png' />", "txt": "CSS" };
arrImage[2] = { "img": "<img src='./images/treasure/html5c.png' />", "txt": "HTML5" };
arrImage[3] = { "img": "<img src='./images/treasure/google-chrome-icon.png' />", "txt": "Google Chrome" };
shuffle(arrImage);


let gridClickByUser = new Array(6);
let gridHide = new Array(6);
for (let i = 0; i < 6; i++) {
    gridClickByUser[i] = new Array(6);
    gridHide[i] = new Array(6);
    for (let j = 0; j < 6; j++) {
        gridClickByUser[i][j] = false;
        gridHide[i][j] = false;
    }
}
let count = 0;
let countSuccess = 0;
let flag = true;

for (let el of gridNode) {
    el.addEventListener("click", function _func() {
        if (flag == true) {
            count++;

            console.log(count);

            //index base 0
            let row = parseInt(el.parentNode.id.replace(/^\D+/g, '')) - 1;
            let col = parseInt(el.className.replace(/^\D+/g, ''), 10) - 1;

            if (gridClickByUser[row][col] == true) {
                alert("You have already choose this");
            } else {
                let el = document.querySelector('#row-' + (row + 1) + " .col-" + (col + 1));
                el.classList.remove("cover");
                gridClickByUser[row][col] = true;
                if (gridHide[row][col] == true) {
                    alert("You have discover the item " + arrImage[countSuccess].txt);
                    el.innerHTML = arrImage[countSuccess].img;
                    countSuccess++;

                    if (countSuccess === 4) {
                        alert(`CONGRATULARIONS!!!\nYou Have Won!!
                        You only have ${count - 4} wrong guesses
                        To Play Again Press Reset button`);
                        flag = false;
                    }
                }
            }
            if (count >= 15 && countSuccess !== 4) {
                alert(`SORRY, YOU HAVE LOSE
                You have reach the 15 attempts
                Please reset button to have another try
                `);
                flag = false;
            }
        }
    });
}


shuffleMultiArray(gridHide);


function getRandomArbitrary(min, max) {
    r = Math.floor(Math.random() * (max - min) + min);
    console.log(r);
    return r;
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

document.getElementById("btn-reset").addEventListener("click", function (event) {
    event.preventDefault();
    reset();
});

function reset() {
    shuffle(arrImage);
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            gridClickByUser[i][j] = false;
            gridHide[i][j] = false;
        }
    }
    count = 0;
    countSuccess = 0;
    flag = true;
   
    shuffleMultiArray(gridHide);

    
    for (let el of gridNode) {
        el.classList.add("cover");
        el.innerHTML="";
    }
}

function shuffleMultiArray(multArr) {
    for (let i = 0; i<4; i++){
        multArr[0][i] = true;
    }
    for (let i = 0; i < multArr.length; i++) {
        for (let j = 0; j < multArr[i].length; j++) {
            let i1 = Math.floor(Math.random() * (multArr.length));
            let j1 = Math.floor(Math.random() * (multArr.length));

            let temp = multArr[i][j];
            multArr[i][j] = multArr[i1][j1];
            multArr[i1][j1] = temp;
        }
    }

    //ONLy FOR TESTING
    console.log("Array hide: indices based on zero");

    for (let x = 0; x < multArr.length; x++) {
        for (let y = 0; y < multArr[x].length; y++) {
            if(multArr[x][y] === true){
                console.log(`row ${x} col ${y}`);
            }
        }
    }


}
