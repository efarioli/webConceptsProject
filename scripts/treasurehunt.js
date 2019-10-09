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
                removeClass(el, 'cover');
                gridClickByUser[row][col] = true;
                if (gridHide[row][col] == true) {
                    alert("You have discover the item " + arrImage[countSuccess].txt);
                    el.innerHTML = arrImage[countSuccess].img;
                    countSuccess++;

                    if (countSuccess === 4) {
                        alert(`CONGRATULARIONS!!!\nYou Have Won!!
                        \nYou only have ${count - 4} wrong guesses
                        \nTo Play Again Press Reset button`);
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

gridHide[getRandomArbitrary(0, 5)][getRandomArbitrary(0, 5)] = true;
gridHide[getRandomArbitrary(0, 5)][getRandomArbitrary(0, 5)] = true;
gridHide[getRandomArbitrary(0, 5)][getRandomArbitrary(0, 5)] = true;
gridHide[getRandomArbitrary(0, 5)][getRandomArbitrary(0, 5)] = true;

// gridHide[1][1] = true;
// gridHide [2][2] = true;
// gridHide [3] [3] = true;
// gridHide [4] [4] = true;




function removeClass(elements, myClass) {

    // if there are no elements, we're done
    if (!elements) { return; }

    // if we have a selector, get the chosen elements
    if (typeof (elements) === 'string') {
        elements = document.querySelectorAll(elements);
    }

    // if we have a single DOM element, make it an array to simplify behavior
    else if (elements.tagName) { elements = [elements]; }

    // create pattern to find class name
    var reg = new RegExp('(^| )' + myClass + '($| )', 'g');

    // remove class from all chosen elements
    for (var i = 0; i < elements.length; i++) {
        elements[i].className = elements[i].className.replace(reg, ' ');
    }
}
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

function reset () {
    
}