const btnPlayPause = document.querySelector("#btn-play-pause");
const logo = document.querySelector(".logo-animation");
const btnStop = document.getElementById("btn-stop");

btnPlayPause.addEventListener("click", clickBtnPlayPause);
btnStop.addEventListener("click", clickBtnStop);

function clickBtnPlayPause(){
    logo.classList.add("logo-animation");
    
    btnPlayPause.classList.toggle("pausedsymbol");
    
    logo.classList.toggle("animationmoving");

}
function clickBtnStop() {
    logo.classList.remove("animationmoving");

    logo.classList.remove("logo-animation");

    btnPlayPause.classList.remove("pausedsymbol");

}