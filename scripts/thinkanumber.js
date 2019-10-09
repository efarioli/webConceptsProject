document.getElementById("btn").addEventListener("click", function (event) {
    event.preventDefault();
    validate();
});
document.getElementById("btn-reset").addEventListener("click", function (event) {
    event.preventDefault();
    reset();
});
let numberGenerated = getRandomArbitrary(1, 100);
const btn = document.getElementById("number-inputed");
const outputArea = document.getElementById("message");

let count = 0;


function validate() {
    let numIn = Number(btn.value);
    if (numIn >= 1 && numIn <= 100) {
        checkResult(numIn);
    } else {
        alert("ERROR - Number not in range \nPlease enter a number between 1 and 100");
    }
}


function checkResult(numIn) {
    let txt = [
        `<p>You have choose the number %numIn%</p>`,
        `<p>Your number is %hiLow% than the number to guess</p>`,
        `<p>You guess is quite %accuracy%</p>`,
        `<p>%soFarTook% %count% guess/es to guess it</p>`
    ];

    outputArea.className = "";
    outputArea.innerHTML = "";
    count++;
    numIn = Number(btn.value);
    let diff2 = numberGenerated - numIn;
    let diff = Math.abs(diff2);
    txt[3] = txt[3].replace("%count%", count);


    if (diff2 > 0) {
        txt[1] = txt[1].replace("%hiLow%", "lower")
    } else if (diff2 < 0) {
        txt[1] = txt[1].replace("%hiLow%", "higher")
    }


    if (diff === 0) {
        txt[2] = "";
        txt[1] = "<p>YOU WON!!!<\p>";
        txt[3] = txt[3].replace("%soFarTook%", "It took you");
        txt[3] += `<p>To play again enter a new number and press the button Guess</p>`;
        outputArea.classList.add("win");
        reset();

    } else if (diff <= 10) {
        txt[2] = txt[2].replace("%accuracy%", `hot`);
        outputArea.classList.add("hot");
    } else if (diff > 30) {
        txt[2] = txt[2].replace("%accuracy%", `cold`);
        outputArea.classList.add("cold");

    } else {
        txt[2] = "";

    }
    txt[0] = txt[0].replace("%numIn%", numIn);
    txt[3] = txt[3].replace("%soFarTook%", "So far you have had");

    txt.forEach(function (el) {
        outputArea.innerHTML += el;
    });
    paragraphs = document.querySelectorAll("div p");

    btn.value = "";
}

function reset() {
    count = 0;
    numberGenerated = getRandomArbitrary(1, 100);
    outputArea.innerHTML = "";
    outputArea.className = "";


}

function getRandomArbitrary(min, max) {
    r = Math.floor(Math.random() * (max - min) + min);
    console.log(r);
    return r;
}

