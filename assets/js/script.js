function init(){

// Set up a single handler at a common ancestor of all the select elements
document.body.addEventListener("change", function(event){
  // event.target references the element that actually triggered the event
  // Check to see if the event was triggered by a DOM element you care to handle
  if(event.target.classList.contains("select")){
    // Access the <p> element that is the previous sibling to the 
    // select that triggered the event and update it
    event.target.previousElementSibling.textContent = event.target.value
  }
});


// Wait for the DOM to finish loading before taking values from the inputs
// Get the button elements and add event listeners to them

document.addEventListener("DOMContentLoaded", function() {
  let buttons = document.getElementsByTagName("button");

  for (let button of buttons) {
      button.addEventListener("click", function() {
          console.log(button);
           if (this.getAttribute("data-type") === "submit") {
              validateInputs();
              
          } else if (this.getAttribute("data-type") === "trade") {
            // block of code to be executed if the condition1 is false and condition2 is true
            trading();
            console.log(generateRandomDaily());
          } else if (this.getAttribute("data-type") === "save") {
            // block of code to be executed if the condition1 is false and condition2 is true
            console.log(" Save results! ");
          }
          else {
            console.log(" Info Popup! ");
              
          }
      });
  }

  

});


/**
* Checks the sum value of all the inputs and displays an alert to help with debuging
*/
function validateInputs() {
  
  let userAnswer = parseInt(document.getElementById("answer-box").value);
  let calculatedAnswer = calculateCorrectAnswer();
  let isCorrect = userAnswer === calculatedAnswer[0];

  if (isCorrect) {
      console.log("Selection Confirmed! ");
  } else {
    console.log('You have not entered any details!');
  }

}






// Define the variables as zero, then the users input can update these variables values
let tradesPerDay = 4;


let tradeOpen = true;
let stake = 0;
let takeProfit = 0;
let stopLoss = 0;
let avgTrueRange = 0;
let marketMommentum = 0;
let tradingFee = 0;
let tradeDuration = 10;
let days = 0;

/**
* tradesPerDay trades would be trade 24 hours / trade duration the would be a random amount from that range
* take 24hour / 1 day in minutes 1440 and divede by selected trade duration to produce the range
* from this generate a random number to similate a realife probability of trade oppotunities in any 1 given day
*/
function generateRandomDaily() {
  let chances = 1440 / tradeDuration; 
  return Math.floor(Math.random() * chances);

 }


 

/**
* Gets the values from the various input types and checks they add up
* Adding up the sum of each allows us to besure all are working as expected
*/
function calculateCorrectAnswer() {

  stake = parseInt(document.getElementById('stake').value);
  takeProfit = parseInt(document.getElementById('takeProfit').innerText);
  stopLoss = parseInt(document.getElementById('stopLoss').innerText);
  avgTrueRange = parseInt(document.getElementById('avgTrueRange').innerText);
  marketMommentum = parseInt(document.getElementById('marketMommentum').innerText);
  tradingFee = parseInt(document.getElementById('tradingFee').innerText);
  tradeDuration = parseInt(document.getElementById('tradeDuration').innerText);
  days = parseInt(document.getElementById('days').innerText);
  
  return [stake + takeProfit + stopLoss + avgTrueRange + marketMommentum + tradingFee + tradeDuration + days ];
 
}




 // info popover functionality

var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
})


function chooseVolatility() {

}

function exchangeRate(){

}

function takeProfit4(){

}

function stopLoss4(){

}

function timedOutMarketOrder() {

}
/**
 * 
 * @param {*} min 
 * @param {*} max 
 * @param {*} decimalPlaces 
 * @returns 
 */
// generate random market fluxtuations
function generateRandonMove(min, max, decimalPlaces) {
  return (Math.random() * (max - min) + min).toFixed(decimalPlaces) * 1;
}


generateRandonMove()
function timeIntoTrade() {

}

function checkVolatility() {

}

function winLossAnalysis() {

}

function strategyReport() {

}

function getDetails() {
  let 
}


  
  









function trading(){
/****************************************
 *      NUMBER OF DAYS - - - - - - - - - - FOR LOOP
 ****************************************/
 for (let eachDay = 0; eachDay < days; eachDay++) {
  console.log('Begining of trading day', eachDay + 1);
}

 /****************************************
 *     NUMBER OF TRADES - - - - - - - - - - FOR LOOP
 ****************************************/
  for (let frequency = 0; frequency < tradesPerDay; frequency++)
  // PRINT STATEMENT USED FOR DEBUGGING
  {
    console.log('*********************** THIS IS AN INSTANCES OF TRADING.  *************** TOTAL OF', frequency + 1, 'TRADING INSTANCE *********');
}

 /****************************************
        ##     TRADE DURATION - - - - - - - - - - FOR LOOP
 ****************************************/
        for (let eachSecond = 0; eachSecond < tradeDuration; eachSecond++)
        {
          console.log('seconds past', eachSecond + 1, ' --- Open to trade?', tradeOpen, 'move' , generateRandonMove(-5, 5, 1) );
        }
}




  
};

init();





 


/****************************************
  if (each_day == 7) {
    break;
  }
 ****************************************/