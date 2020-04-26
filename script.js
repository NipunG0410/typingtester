const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var timer = [0,0,0,0];
var interval;
var timerrunning=false;


// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingzero(time){
    if(time<=9){
        time="0"+ time;
    }
    return time;
}


// Run a standard minute/second/hundredths timer:
function runtimer(){
    let currenttime = leadingzero(timer[0]) + ":" + leadingzero(timer[1]) + ":" + leadingzero(timer[2]);
    theTimer.innerHTML = currenttime;
    timer[3]++;
    timer[0] = Math.floor( (timer[3]/100)/60);
    timer[1] = Math.floor( (timer[3]/100) -timer[0]*60);
    timer[2] = Math.floor( (timer[3]) - timer[1]*100 - timer[0]*6000);

}


// Match the text entered with the provided text on the page:
function spellcheck(){
    let textentered = testArea.value;
    let origintextmatch = originText.substring(0,textentered.length);
    if(textentered == originText){
       
        testWrapper.style.borderColor = "#429890";
        clearInterval(interval);
    }else{
        if(textentered == origintextmatch){
            testWrapper.style.borderColor = "#65CCf3";

        }else{
            testWrapper.style.borderColor = "#E95D0F";
        }
    }
    
}


// Start the timer:
function start(){
    let textarealength = testArea.value.length;
    
    if(textarealength === 0 && !timerrunning){
        timerrunning = true;
        interval = setInterval(runtimer,10);
    }
    console.log(textarealength);
    
}



// Reset everything:
function reset(){
  clearInterval(interval);
  interval=null;
  timer [0,0,0,0];

  testWrapper.style.borderColor= "grey";
  theTimer.innerHTML = "00:00:00"
  testArea.value="";

}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress",start,false);
testArea.addEventListener("keyup",spellcheck,false);
resetButton.addEventListener("click",reset,false);